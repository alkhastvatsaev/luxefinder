/**
 * Serper.dev — generic SERP complement for markets beyond eBay.
 */

import { searchQueryFromProduct } from "../canonical";
import { logExternalCall } from "../telemetry";
import { normalizeText, REPLICA_PATTERNS } from "@/lib/luxury-kb";
import type {
  CanonicalProduct,
  FindOffersResult,
  OfferFilters,
  SearchOffer,
  SearchProvider,
} from "../types";

function serperKey(): string {
  return (process.env.SERPER_API_KEY || "").trim();
}

export const serperOffersProvider: SearchProvider = {
  id: "serper",

  async findOffers(
    product: CanonicalProduct,
    _filters?: OfferFilters
  ): Promise<FindOffersResult | null> {
    const key = serperKey();
    if (!key) return null;
    const t0 = Date.now();
    const q = `${searchQueryFromProduct(product)} bag buy`;

    try {
      const res = await fetch("https://google.serper.dev/shopping", {
        method: "POST",
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q, gl: "fr", hl: "fr", num: 20 }),
      });
      await logExternalCall({
        ts: new Date().toISOString(),
        provider: "serper",
        action: "offers",
        credits: 1,
        latency_ms: Date.now() - t0,
        cache: "miss",
        ok: res.ok,
      });
      if (!res.ok) return null;
      const data = (await res.json()) as {
        shopping?: Array<{
          title?: string;
          link?: string;
          source?: string;
          price?: string;
          imageUrl?: string;
        }>;
      };

      const brandN = normalizeText(product.brand);
      const modelN = normalizeText(product.model);
      const offers: SearchOffer[] = [];
      for (const r of data.shopping || []) {
        const title = (r.title || "").trim();
        const link = (r.link || "").trim();
        if (!title || !link || !/^https?:\/\//i.test(link)) continue;
        if (REPLICA_PATTERNS.test(title) || REPLICA_PATTERNS.test(link)) continue;
        const titleN = normalizeText(title);
        if (modelN.length >= 4 && !titleN.includes(modelN)) continue;
        if (brandN.length >= 3 && !brandN.split(" ").every((p) => p.length < 3 || titleN.includes(p))) {
          continue;
        }
        offers.push({
          title: title.slice(0, 180),
          link,
          source: r.source || "Google Shopping",
          price: r.price,
          thumbnail: r.imageUrl,
          region: "europe",
          country: "France",
          kind: "shopping",
          provider: "serper",
        });
      }
      if (!offers.length) return null;
      return {
        product,
        offers,
        provider: "serper",
        providers_used: ["serper"],
        by_region: { europe: offers.length },
        markets_ok: 1,
        markets_total: 1,
      };
    } catch (e) {
      await logExternalCall({
        ts: new Date().toISOString(),
        provider: "serper",
        action: "offers",
        credits: 1,
        latency_ms: Date.now() - t0,
        cache: "miss",
        ok: false,
        detail: e instanceof Error ? e.message : "error",
      });
      return null;
    }
  },
};
