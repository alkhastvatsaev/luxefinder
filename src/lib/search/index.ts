/**
 * Search facade — sole entry for identify + offers.
 * Provider order (default):
 *   identify: gemini → serp
 *   offers:   ebay → serper → serp → deeplink
 */

import { canonicalKey, productFromParts, searchQueryFromProduct } from "./canonical";
import { getIdentifyCache, setIdentifyCache, getOffersCache, setOffersCache } from "./cache";
import { coalesce } from "./coalesce";
import { buildDeepLinkOffers } from "./providers/deeplink-fallback";
import { geminiIdentifyProvider } from "./providers/gemini-identify";
import { ebayBrowseProvider } from "./providers/ebay-browse";
import { serperOffersProvider } from "./providers/serper-offers";
import { serpProvider } from "./providers/serp-adapter";
import { suggestAllModels, matchCatalogProduct } from "@/lib/product-catalog";
import { isStrongModelName } from "@/lib/luxury-kb";
import type {
  CanonicalProduct,
  FindOffersResult,
  IdentifyInput,
  IdentifyResult,
  OfferFilters,
  SearchOffer,
} from "./types";

function serpFallbackEnabled(): boolean {
  return (process.env.SEARCH_SERP_FALLBACK || "true").toLowerCase() !== "false";
}

function dedupeOffers(offers: SearchOffer[]): SearchOffer[] {
  const seen = new Set<string>();
  const out: SearchOffer[] = [];
  for (const o of offers) {
    const k = `${o.link.split("?")[0].toLowerCase()}|${o.title.slice(0, 60).toLowerCase()}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(o);
  }
  return out;
}

async function identifyFromCatalog(query: string): Promise<IdentifyResult | null> {
  const suggestions = await suggestAllModels(query, 5);
  const top = suggestions[0];
  if (top && top.score >= 40 && isStrongModelName(top.model)) {
    const product = productFromParts(top.brand, top.model, "catalog", {
      confidence: 0.92,
      category: top.category,
    });
    return { product, provider: "catalog", match_links: [], cached: true };
  }
  const living = await matchCatalogProduct(query);
  if (living && isStrongModelName(living.model)) {
    const product = productFromParts(living.brand, living.model, "living_catalog", {
      confidence: 0.9,
    });
    return { product, provider: "living_catalog", match_links: [], cached: true };
  }
  return null;
}

export async function identifyProduct(
  input: IdentifyInput,
  opts?: { forceFallback?: boolean }
): Promise<IdentifyResult> {
  if (input.kind === "text") {
    const catalog = await identifyFromCatalog(input.query);
    if (catalog) return catalog;
  }

  const cacheKey =
    input.kind === "text"
      ? canonicalKey({ display_name: input.query })
      : input.cacheKey || canonicalKey({ display_name: input.publicPhotoUrl || "image" });

  return coalesce(`identify:${cacheKey}`, async () => {
    const cached = await getIdentifyCache(cacheKey);
    if (cached?.product) return { ...cached, cached: true };

    if (!opts?.forceFallback) {
      const gemini = await geminiIdentifyProvider.identifyProduct?.(input);
      if (gemini?.product?.brand && gemini.product.model) {
        await setIdentifyCache(cacheKey, gemini);
        return gemini;
      }

      if (serpFallbackEnabled()) {
        const serp = await serpProvider.identifyProduct?.(input);
        if (serp?.product) {
          await setIdentifyCache(cacheKey, serp);
          return serp;
        }
      }
    }

    // Last resort structured stub from text query
    if (input.kind === "text") {
      const product = productFromParts("inconnue", input.query.slice(0, 80), "none", {
        confidence: 0.2,
        display_name: input.query.slice(0, 120),
      });
      return { product, provider: "none", match_links: [] };
    }

    const product = productFromParts("inconnue", "article luxe", "none", {
      confidence: 0.15,
    });
    return { product, provider: "none", match_links: [] };
  });
}

export async function findOffers(
  product: CanonicalProduct,
  filters?: OfferFilters,
  opts?: { mode?: "live" | "fallback" }
): Promise<FindOffersResult> {
  const key = canonicalKey(product);

  if (opts?.mode === "fallback") {
    return buildDeepLinkOffers(product);
  }

  return coalesce(`offers:${key}`, async () => {
    const cached = await getOffersCache(key);
    if (cached?.offers?.length) return { ...cached, cached: true };

    const merged: SearchOffer[] = [];
    const providers_used: string[] = [];
    let by_region: Record<string, number> = {};

    const ebay = await ebayBrowseProvider.findOffers?.(product, filters);
    if (ebay?.offers?.length) {
      merged.push(...ebay.offers);
      providers_used.push("ebay");
      by_region = { ...by_region, ...ebay.by_region };
    }

    const serper = await serperOffersProvider.findOffers?.(product, filters);
    if (serper?.offers?.length) {
      merged.push(...serper.offers);
      providers_used.push("serper");
    }

    if (merged.length < 8 && serpFallbackEnabled()) {
      const serp = await serpProvider.findOffers?.(product, filters);
      if (serp?.offers?.length) {
        merged.push(...serp.offers);
        providers_used.push("serp");
        by_region = { ...by_region, ...(serp.by_region || {}) };
      }
    }

    const offers = dedupeOffers(merged).slice(0, 80);
    if (!offers.length) {
      return buildDeepLinkOffers(product);
    }

    const result: FindOffersResult = {
      product,
      offers,
      provider: providers_used[0] || "mixed",
      providers_used,
      by_region,
      markets_ok: providers_used.length,
      markets_total: providers_used.length,
      fallback: false,
      cached: false,
    };
    await setOffersCache(key, result);
    return result;
  });
}

export function toAiDescription(
  identified: IdentifyResult,
  extra?: Record<string, unknown>
): Record<string, unknown> {
  const p = identified.product;
  return {
    brand: p.brand,
    model: p.model,
    product_name: p.display_name,
    lens_title: p.display_name,
    best_guess: p.display_name,
    summary: p.display_name,
    confidence: p.confidence,
    provider: identified.provider,
    category: p.category || "sac",
    material: p.material,
    reference: p.reference,
    variant: p.variant,
    grounding_sources: p.grounding_sources,
    match_links: (identified.match_links || []).map((m, i) => ({
      title: m.title,
      link: m.link,
      source: m.source,
      kind: m.kind === "official" || m.kind === "resale" ? m.kind : "shopping",
      rank: i + 1,
      price: m.price,
    })),
    ...extra,
  };
}

export function canonicalFromRfqAi(ai: Record<string, unknown>, userEdit?: string | null): CanonicalProduct {
  const brand = String(ai.brand || "").trim();
  const model = String(ai.model || "").trim();
  const display =
    (userEdit || "").trim() ||
    String(ai.product_name || ai.lens_title || ai.best_guess || "").trim() ||
    [brand, model].filter(Boolean).join(" ");
  return productFromParts(
    brand && brand !== "inconnue" ? brand : "inconnue",
    isStrongModelName(model) ? model : display.slice(0, 80) || "article",
    String(ai.provider || "rfq"),
    {
      display_name: display,
      confidence: Number(ai.confidence || 0.7),
      material: typeof ai.material === "string" ? ai.material : undefined,
      category: typeof ai.category === "string" ? ai.category : undefined,
      grounding_sources: Array.isArray(ai.grounding_sources)
        ? (ai.grounding_sources as CanonicalProduct["grounding_sources"])
        : undefined,
    }
  );
}

export { searchQueryFromProduct, buildDeepLinkOffers };
