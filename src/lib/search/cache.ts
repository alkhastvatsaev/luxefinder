import { list, put } from "@vercel/blob";
import type { FindOffersResult, IdentifyResult } from "./types";

const IDENTIFY_TTL_MS =
  Number(process.env.IDENTIFY_CACHE_TTL_DAYS || 30) * 24 * 3600 * 1000;
const OFFERS_TTL_MS =
  Number(process.env.OFFERS_CACHE_TTL_HOURS || 6) * 3600 * 1000;

async function readJson<T>(pathname: string, ttlMs: number): Promise<T | null> {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const hit = blobs.find((b) => b.pathname === pathname);
    if (!hit) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { _cached_at?: number; result?: T };
    const ts = Number(data._cached_at || 0);
    if (!ts || Date.now() - ts > ttlMs) return null;
    return data.result ?? null;
  } catch {
    return null;
  }
}

async function writeJson(pathname: string, result: unknown): Promise<void> {
  try {
    await put(pathname, JSON.stringify({ _cached_at: Date.now(), result }), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (e) {
    console.error("[search-cache] write failed", pathname, e);
  }
}

export async function getIdentifyCache(key: string): Promise<IdentifyResult | null> {
  return readJson<IdentifyResult>(`cache/identify/${key}.json`, IDENTIFY_TTL_MS);
}

export async function setIdentifyCache(key: string, result: IdentifyResult): Promise<void> {
  await writeJson(`cache/identify/${key}.json`, { ...result, cached: true });
}

export async function getOffersCache(key: string): Promise<FindOffersResult | null> {
  return readJson<FindOffersResult>(`cache/offers-v2/${key}.json`, OFFERS_TTL_MS);
}

export async function setOffersCache(key: string, result: FindOffersResult): Promise<void> {
  await writeJson(`cache/offers-v2/${key}.json`, { ...result, cached: true });
}
