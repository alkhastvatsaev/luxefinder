/**
 * Deep multi-region seller search for a confirmed product.
 * Uses SerpAPI Google Shopping across USA / Europe / Asia / Africa
 * (production equivalent of agent-reach deep web research).
 */

import { hasSerpApiKey } from "./google-lens";
import { normalizeText, REPLICA_PATTERNS, TRUSTED_DOMAINS } from "./luxury-kb";

export type OfferRegion = "usa" | "europe" | "asia" | "africa";

export type GlobalOffer = {
  title: string;
  link: string;
  source: string;
  price?: string;
  thumbnail?: string;
  region: OfferRegion;
  country: string;
  kind: "official" | "resale" | "shopping" | "other";
};

type Market = {
  region: OfferRegion;
  country: string;
  gl: string;
  hl: string;
};

/** Representative markets per continent — parallel SerpAPI shopping lookups. */
const MARKETS: Market[] = [
  { region: "usa", country: "États-Unis", gl: "us", hl: "en" },
  { region: "europe", country: "France", gl: "fr", hl: "fr" },
  { region: "europe", country: "Allemagne", gl: "de", hl: "de" },
  { region: "europe", country: "Royaume-Uni", gl: "gb", hl: "en" },
  { region: "europe", country: "Italie", gl: "it", hl: "it" },
  { region: "asia", country: "Japon", gl: "jp", hl: "ja" },
  { region: "asia", country: "Hong Kong", gl: "hk", hl: "en" },
  { region: "asia", country: "Singapour", gl: "sg", hl: "en" },
  { region: "asia", country: "Corée", gl: "kr", hl: "ko" },
  { region: "africa", country: "Afrique du Sud", gl: "za", hl: "en" },
  { region: "africa", country: "Maroc", gl: "ma", hl: "fr" },
  { region: "africa", country: "Égypte", gl: "eg", hl: "en" },
];

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

function classifyKind(host: string): GlobalOffer["kind"] {
  if (!host) return "shopping";
  if (
    /vestiaire|therealreal|fashionphile|rebag|farfetch|ssense|mytheresa|net-a-porter|chron24|collector|hardlyeverwornit/i.test(
      host
    )
  ) {
    return "resale";
  }
  if (TRUSTED_DOMAINS.some((d) => host.endsWith(d))) return "official";
  return "shopping";
}

async function shoppingInMarket(
  query: string,
  market: Market,
  limit: number
): Promise<GlobalOffer[]> {
  const key = serpKey();
  if (!key || !hasSerpApiKey()) return [];

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_shopping");
  url.searchParams.set("q", query);
  url.searchParams.set("hl", market.hl);
  url.searchParams.set("gl", market.gl);
  url.searchParams.set("num", "20");
  url.searchParams.set("api_key", key);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
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
        extracted_price?: number;
        thumbnail?: string;
      }>;
    };

    const qNorm = normalizeText(query);
    const tokens = qNorm.split(" ").filter((t) => t.length > 2);
    const out: GlobalOffer[] = [];
    const seen = new Set<string>();

    for (const r of data.shopping_results || []) {
      const link = (r.link || r.product_link || "").trim();
      const title = (r.title || "").trim();
      if (!link || !title || !/^https?:\/\//i.test(link)) continue;
      if (REPLICA_PATTERNS.test(title) || REPLICA_PATTERNS.test(link)) continue;

      const titleN = normalizeText(title);
      const relevance = tokens.filter((t) => titleN.includes(t)).length;
      if (tokens.length >= 2 && relevance < 1) continue;

      const k = link.split("?")[0].toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);

      const h = hostOf(link);
      const thumb = (r.thumbnail || "").trim();
      out.push({
        title: title.slice(0, 180),
        link,
        source: (r.source || h || market.country).slice(0, 80),
        price: r.price || (r.extracted_price != null ? String(r.extracted_price) : undefined),
        thumbnail: /^https?:\/\//i.test(thumb) ? thumb : undefined,
        region: market.region,
        country: market.country,
        kind: classifyKind(h),
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

function dedupeOffers(offers: GlobalOffer[]): GlobalOffer[] {
  const byKey = new Map<string, GlobalOffer>();
  for (const o of offers) {
    const key = `${hostOf(o.link)}|${normalizeText(o.title).slice(0, 80)}`;
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, o);
      continue;
    }
    // Prefer entry with price / thumbnail
    const score = (x: GlobalOffer) => (x.price ? 2 : 0) + (x.thumbnail ? 1 : 0);
    if (score(o) > score(prev)) byKey.set(key, o);
  }
  return Array.from(byKey.values());
}

export type GlobalOffersResult = {
  query: string;
  offers: GlobalOffer[];
  by_region: Record<OfferRegion, number>;
  markets_ok: number;
  markets_total: number;
};

/** Parallel deep shopping search across 4 continents. */
export async function searchGlobalOffers(
  productQuery: string,
  opts?: { perMarket?: number; maxOffers?: number }
): Promise<GlobalOffersResult> {
  const q = productQuery.trim().slice(0, 160);
  const perMarket = opts?.perMarket ?? 8;
  const maxOffers = opts?.maxOffers ?? 60;

  if (!q || !serpKey() || !hasSerpApiKey()) {
    return {
      query: q,
      offers: [],
      by_region: { usa: 0, europe: 0, asia: 0, africa: 0 },
      markets_ok: 0,
      markets_total: MARKETS.length,
    };
  }

  // Avoid appending "bag" blindly — query already names the article.
  const shoppingQuery = q;

  const settled = await Promise.allSettled(
    MARKETS.map((m) => shoppingInMarket(shoppingQuery, m, perMarket))
  );

  let marketsOk = 0;
  const merged: GlobalOffer[] = [];
  for (const s of settled) {
    if (s.status === "fulfilled") {
      if (s.value.length) marketsOk += 1;
      merged.push(...s.value);
    }
  }

  const offers = dedupeOffers(merged).slice(0, maxOffers);
  const by_region: Record<OfferRegion, number> = {
    usa: 0,
    europe: 0,
    asia: 0,
    africa: 0,
  };
  for (const o of offers) by_region[o.region] += 1;

  // Stable sort: resale/official first, then by region order
  const regionOrder: OfferRegion[] = ["europe", "usa", "asia", "africa"];
  const kindOrder = { official: 0, resale: 1, shopping: 2, other: 3 } as const;
  offers.sort((a, b) => {
    const kd = kindOrder[a.kind] - kindOrder[b.kind];
    if (kd !== 0) return kd;
    return regionOrder.indexOf(a.region) - regionOrder.indexOf(b.region);
  });

  return {
    query: q,
    offers,
    by_region,
    markets_ok: marketsOk,
    markets_total: MARKETS.length,
  };
}
