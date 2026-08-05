/**
 * Google Lens via SerpAPI — closest consumer Lens results available to apps.
 * Requires SERPAPI_KEY. Soft-fails if missing/timeout.
 * Prefer fetchGoogleLensByUrl with a public Blob URL.
 */

export type LensProduct = {
  title: string;
  source?: string;
  link?: string;
  score?: number;
};

function serpKey(): string {
  return (process.env.SERPAPI_KEY || process.env.SERP_API_KEY || "").trim();
}

export function hasSerpApiKey(): boolean {
  return Boolean(serpKey());
}

export async function fetchGoogleLensByUrl(
  imageUrl: string,
  opts?: { timeoutMs?: number }
): Promise<LensProduct[]> {
  const key = serpKey();
  if (!key || !imageUrl) return [];
  const timeoutMs = opts?.timeoutMs ?? 12_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const params = new URLSearchParams({
      engine: "google_lens",
      api_key: key,
      url: imageUrl,
      hl: "fr",
    });
    const r = await fetch(`https://serpapi.com/search.json?${params}`, {
      signal: controller.signal,
    });
    if (!r.ok) {
      console.error("serpapi lens url http", r.status);
      return [];
    }
    return parseLensResponse(await r.json());
  } catch (e) {
    console.error("google_lens url failed", e);
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/** Bytes upload not used — prefer public URL after Blob upload. */
export async function fetchGoogleLensProducts(): Promise<LensProduct[]> {
  return [];
}

function parseLensResponse(data: Record<string, unknown>): LensProduct[] {
  const out: LensProduct[] = [];
  const visual = (data.visual_matches as Array<Record<string, unknown>>) || [];
  for (const v of visual.slice(0, 12)) {
    const title = String(v.title || "");
    if (!title) continue;
    out.push({
      title,
      source: String(v.source || ""),
      link: String(v.link || ""),
      score: 0.85,
    });
  }
  const shopping =
    (data.shopping_results as Array<Record<string, unknown>>) ||
    (data.products as Array<Record<string, unknown>>) ||
    [];
  for (const s of shopping.slice(0, 8)) {
    const title = String(s.title || s.name || "");
    if (!title) continue;
    out.push({
      title,
      source: String(s.source || s.store || ""),
      link: String(s.link || ""),
      score: 0.95,
    });
  }
  return out;
}
