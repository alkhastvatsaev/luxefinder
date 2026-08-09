/**
 * SerpAPI adapter — kept as non-default fallback behind SearchProvider.
 */

import { fetchGoogleLensByUrl, hasSerpApiKey, rankMatchLinks, bestLensTitle, parseTitleBrandModel, type LensProduct } from "@/lib/google-lens";
import { fetchGoogleShoppingProducts, fetchProductThumbnail } from "@/lib/google-text-search";
import { searchGlobalOffers } from "@/lib/global-offers";
import { getCachedLens, setCachedLens, contentFingerprint } from "@/lib/analyze-cache";
import { productFromParts, searchQueryFromProduct } from "../canonical";
import { logExternalCall } from "../telemetry";
import type {
  CanonicalProduct,
  FindOffersResult,
  IdentifyInput,
  IdentifyResult,
  OfferFilters,
  SearchOffer,
  SearchProvider,
} from "../types";

function mapSerpOffer(o: {
  title: string;
  link: string;
  source: string;
  price?: string;
  thumbnail?: string;
  region?: string;
  country?: string;
  kind?: string;
}): SearchOffer {
  return {
    title: o.title,
    link: o.link,
    source: o.source,
    price: o.price,
    thumbnail: o.thumbnail,
    region: o.region,
    country: o.country,
    kind:
      o.kind === "official" || o.kind === "resale" || o.kind === "shopping"
        ? o.kind
        : "shopping",
    provider: "serp",
  };
}

export const serpProvider: SearchProvider = {
  id: "serp",

  async identifyProduct(input: IdentifyInput): Promise<IdentifyResult | null> {
    if (!hasSerpApiKey()) return null;
    const t0 = Date.now();

    if (input.kind === "image") {
      if (!input.publicPhotoUrl) return null;
      const lensKey = input.cacheKey || (await contentFingerprint(input.bytes));
      const cached = await getCachedLens(lensKey);
      let lensProducts: LensProduct[] = (cached as LensProduct[] | null) || [];
      let cache: "hit" | "miss" = "hit";
      if (!lensProducts.length) {
        cache = "miss";
        lensProducts = await fetchGoogleLensByUrl(input.publicPhotoUrl, {
          timeoutMs: 20_000,
        });
        if (lensProducts.length) await setCachedLens(lensKey, lensProducts);
        await logExternalCall({
          ts: new Date().toISOString(),
          provider: "serp",
          action: "identify",
          credits: 1,
          latency_ms: Date.now() - t0,
          cache,
          ok: lensProducts.length > 0,
          detail: "google_lens",
        });
      }
      if (!lensProducts.length) return null;
      const title = bestLensTitle(lensProducts);
      const parsed = parseTitleBrandModel(title);
      const product = productFromParts(
        parsed.brand || "inconnue",
        parsed.model || title,
        "serp",
        { confidence: 0.9, display_name: title }
      );
      const match_links = rankMatchLinks(lensProducts, 10).map((m) =>
        mapSerpOffer(m)
      );
      return { product, match_links, provider: "serp", cached: cache === "hit" };
    }

    // text
    const products = await fetchGoogleShoppingProducts(input.query, 12);
    await logExternalCall({
      ts: new Date().toISOString(),
      provider: "serp",
      action: "identify",
      credits: 1,
      latency_ms: Date.now() - t0,
      cache: "miss",
      ok: products.length > 0,
      detail: "google_shopping",
    });
    if (!products.length) return null;
    const best = products[0];
    const parsed = parseTitleBrandModel(best.title);
    const product = productFromParts(
      parsed.brand || "inconnue",
      parsed.model || best.title,
      "serp",
      { confidence: parsed.brand ? 0.8 : 0.68, display_name: best.title }
    );
    return {
      product,
      match_links: products.map(mapSerpOffer),
      provider: "serp",
    };
  },

  async findOffers(
    product: CanonicalProduct,
    _filters?: OfferFilters
  ): Promise<FindOffersResult | null> {
    if (!hasSerpApiKey()) return null;
    const t0 = Date.now();
    const q = searchQueryFromProduct(product);
    const result = await searchGlobalOffers(q, {
      brand: product.brand !== "inconnue" ? product.brand : undefined,
      model: product.model,
      perMarket: 12,
      maxOffers: 60,
    });
    const credits = result.cached ? 0 : Math.max(1, result.markets_ok || 4);
    await logExternalCall({
      ts: new Date().toISOString(),
      provider: "serp",
      action: "offers",
      credits,
      latency_ms: Date.now() - t0,
      cache: result.cached ? "hit" : "miss",
      ok: true,
      detail: "global_offers",
    });
    return {
      product,
      offers: result.offers.map(mapSerpOffer),
      provider: "serp",
      providers_used: ["serp"],
      cached: result.cached,
      by_region: result.by_region,
      markets_ok: result.markets_ok,
      markets_total: result.markets_total,
    };
  },
};

export async function serpThumbnail(query: string): Promise<string> {
  if (!hasSerpApiKey()) return "";
  return fetchProductThumbnail(query);
}
