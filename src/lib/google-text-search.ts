/**
 * Google Shopping lookup via SerpAPI — concrete product hits + thumbnails.
 */

import { hasSerpApiKey } from "./google-lens";
import type { RankedMatch } from "./google-lens";
import { normalizeText, REPLICA_PATTERNS, TRUSTED_DOMAINS } from "./luxury-kb";

function serpKey(): string {
  return (process.env.SERPAPI_KEY || process.env.SERP_API_KEY || "").trim();
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export type ShoppingProduct = RankedMatch & {
  thumbnail?: string;
};

/** Concrete shopping products for a known luxury model query. */
export async function fetchGoogleShoppingProducts(
  query: string,
  limit = 8
): Promise<ShoppingProduct[]> {
  const key = serpKey();
  const q = query.trim();
  if (!key || !hasSerpApiKey() || q.length < 2) return [];

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_shopping");
  url.searchParams.set("q", `${q} bag`);
  url.searchParams.set("hl", "fr");
  url.searchParams.set("gl", "fr");
  url.searchParams.set("num", "16");
  url.searchParams.set("api_key", key);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 7000);
  try {
    const res = await fetch(url.toString(), { signal: ctrl.signal, cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      shopping_results?: Array<{
        title?: string;
        link?: string;
        product_link?: string;
        source?: string;
        price?: string;
        thumbnail?: string;
      }>;
    };

    const qNorm = normalizeText(q);
    const tokens = qNorm.split(" ").filter((t) => t.length > 2);
    const out: ShoppingProduct[] = [];
    const seen = new Set<string>();

    for (const r of data.shopping_results || []) {
      const link = (r.link || r.product_link || "").trim();
      const title = (r.title || "").trim();
      if (!link || !title || !/^https?:\/\//i.test(link)) continue;
      if (REPLICA_PATTERNS.test(title) || REPLICA_PATTERNS.test(link)) continue;

      const titleN = normalizeText(title);
      const relevance = tokens.filter((t) => titleN.includes(t)).length;
      // Skip vague / unrelated shopping noise
      if (tokens.length >= 2 && relevance < 1) continue;

      const k = link.split("?")[0].toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);

      const h = hostOf(link);
      let kind: RankedMatch["kind"] = "shopping";
      if (TRUSTED_DOMAINS.some((d) => h.endsWith(d))) {
        kind = /vestiaire|therealreal|fashionphile|rebag|farfetch|ssense|mytheresa|net-a-porter/i.test(
          h
        )
          ? "resale"
          : "official";
      }

      const thumb = (r.thumbnail || "").trim();
      out.push({
        title: title.slice(0, 160),
        link,
        source: r.source || h,
        kind,
        rank: out.length + 1,
        price: r.price,
        thumbnail: /^https?:\/\//i.test(thumb) ? thumb : undefined,
      });
      if (out.length >= limit) break;
    }
    return out;
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/** @deprecated Prefer fetchGoogleShoppingProducts */
export async function fetchGoogleShoppingLinks(
  query: string,
  limit = 6
): Promise<RankedMatch[]> {
  const products = await fetchGoogleShoppingProducts(query, limit);
  return products.map(({ thumbnail: _t, ...rest }) => rest);
}

/** First usable product thumbnail for center-card preview. */
export async function fetchProductThumbnail(query: string): Promise<string> {
  const products = await fetchGoogleShoppingProducts(query, 8);
  const fromShop = products.find((p) => p.thumbnail)?.thumbnail;
  if (fromShop) return fromShop;

  const key = serpKey();
  const q = query.trim();
  if (!key || q.length < 2) return "";

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_images");
  url.searchParams.set("q", `${q} handbag`);
  url.searchParams.set("hl", "fr");
  url.searchParams.set("gl", "fr");
  url.searchParams.set("api_key", key);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(url.toString(), { signal: ctrl.signal, cache: "no-store" });
    if (!res.ok) return "";
    const data = (await res.json()) as {
      images_results?: Array<{ original?: string; thumbnail?: string }>;
    };
    for (const img of data.images_results || []) {
      const src = (img.thumbnail || img.original || "").trim();
      if (/^https?:\/\//i.test(src)) return src;
    }
    return "";
  } catch {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

