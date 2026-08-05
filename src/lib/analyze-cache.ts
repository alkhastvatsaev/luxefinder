import { createHash } from "crypto";
import { list, put } from "@vercel/blob";

export function imageHash(bytes: ArrayBuffer): string {
  return createHash("sha256").update(Buffer.from(bytes)).digest("hex");
}

export async function getCachedAnalyze(
  hash: string
): Promise<Record<string, unknown> | null> {
  try {
    const pathname = `cache/analyze/${hash}.json`;
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const hit = blobs.find((b) => b.pathname === pathname);
    if (!hit) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    // expire after 7 days if timestamp present
    const ts = Number(data._cached_at || 0);
    if (ts && Date.now() - ts > 7 * 24 * 3600 * 1000) return null;
    return data.result as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function setCachedAnalyze(
  hash: string,
  result: Record<string, unknown>
): Promise<void> {
  try {
    await put(
      `cache/analyze/${hash}.json`,
      JSON.stringify({ _cached_at: Date.now(), result }),
      {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      }
    );
  } catch (e) {
    console.error("analyze cache write failed", e);
  }
}
