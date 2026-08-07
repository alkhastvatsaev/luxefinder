import { createHash } from "crypto";
import { list, put } from "@vercel/blob";
import sharp from "sharp";

/** Exact file hash (byte-identical uploads). */
export function imageHash(bytes: ArrayBuffer): string {
  return createHash("sha256").update(Buffer.from(bytes)).digest("hex");
}

/**
 * Visual fingerprint: EXIF-rotate → 256px greyscale → hash.
 * Same photo re-exported as JPEG/WebP/HEIC often shares this key → saves SerpAPI.
 */
export async function contentFingerprint(bytes: ArrayBuffer): Promise<string> {
  try {
    const raw = await sharp(Buffer.from(bytes))
      .rotate()
      .resize(256, 256, { fit: "inside", withoutEnlargement: false })
      .greyscale()
      .raw()
      .toBuffer();
    return createHash("sha256").update(raw).digest("hex").slice(0, 40);
  } catch {
    return imageHash(bytes).slice(0, 40);
  }
}

const TTL_MS = 365 * 24 * 3600 * 1000; // 1 year — exact product ID rarely changes

async function readCache(pathname: string): Promise<Record<string, unknown> | null> {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const hit = blobs.find((b) => b.pathname === pathname);
    if (!hit) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    const ts = Number(data._cached_at || 0);
    if (ts && Date.now() - ts > TTL_MS) return null;
    return data.result as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function writeCache(pathname: string, result: Record<string, unknown>): Promise<void> {
  try {
    await put(pathname, JSON.stringify({ _cached_at: Date.now(), result }), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (e) {
    console.error("cache write failed", pathname, e);
  }
}

export async function getCachedAnalyze(
  hash: string
): Promise<Record<string, unknown> | null> {
  return readCache(`cache/analyze/${hash}.json`);
}

export async function setCachedAnalyze(
  hash: string,
  result: Record<string, unknown>
): Promise<void> {
  await writeCache(`cache/analyze/${hash}.json`, result);
}

/** Lookup by exact bytes, then by visual fingerprint. */
export async function getCachedAnalyzeSmart(
  bytes: ArrayBuffer
): Promise<{ result: Record<string, unknown>; key: string; via: "exact" | "fingerprint" } | null> {
  const exact = imageHash(bytes);
  const byExact = await getCachedAnalyze(exact);
  if (byExact) return { result: byExact, key: exact, via: "exact" };

  const fp = await contentFingerprint(bytes);
  const byFp = await getCachedAnalyze(`fp-${fp}`);
  if (byFp) return { result: byFp, key: `fp-${fp}`, via: "fingerprint" };

  return null;
}

/** Persist under exact hash + fingerprint so either lookup hits next time. */
export async function setCachedAnalyzeSmart(
  bytes: ArrayBuffer,
  result: Record<string, unknown>
): Promise<void> {
  const exact = imageHash(bytes);
  const fp = await contentFingerprint(bytes);
  await Promise.all([
    setCachedAnalyze(exact, result),
    setCachedAnalyze(`fp-${fp}`, result),
  ]);
}

/** Dedicated Lens payload cache (avoids SerpAPI if only Lens needs reuse). */
export async function getCachedLens(
  key: string
): Promise<unknown[] | null> {
  const data = await readCache(`cache/lens/${key}.json`);
  if (!data || !Array.isArray(data.products)) return null;
  return data.products as unknown[];
}

export async function setCachedLens(key: string, products: unknown[]): Promise<void> {
  await writeCache(`cache/lens/${key}.json`, { products });
}
