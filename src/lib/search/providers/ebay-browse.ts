/**
 * eBay Browse API — structured prices (source of truth for live offers).
 */

import { searchQueryFromProduct } from "../canonical";
import { logExternalCall } from "../telemetry";
import type {
  CanonicalProduct,
  FindOffersResult,
  OfferFilters,
  SearchOffer,
  SearchProvider,
} from "../types";

function ebayCreds(): { id: string; secret: string } | null {
  const id = (process.env.EBAY_CLIENT_ID || "").trim();
  const secret = (process.env.EBAY_CLIENT_SECRET || "").trim();
  if (!id || !secret) return null;
  return { id, secret };
}

function ebayBase(): string {
  return (process.env.EBAY_ENV || "PRODUCTION").toUpperCase() === "SANDBOX"
    ? "https://api.sandbox.ebay.com"
    : "https://api.ebay.com";
}

let cachedToken: { token: string; exp: number } | null = null;

async function ebayToken(): Promise<string | null> {
  const creds = ebayCreds();
  if (!creds) return null;
  if (cachedToken && Date.now() < cachedToken.exp - 60_000) return cachedToken.token;

  const t0 = Date.now();
  const basic = Buffer.from(`${creds.id}:${creds.secret}`).toString("base64");
  const res = await fetch(`${ebayBase()}/identity/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
  });
  if (!res.ok) {
    await logExternalCall({
      ts: new Date().toISOString(),
      provider: "ebay",
      action: "token",
      credits: 0,
      latency_ms: Date.now() - t0,
      cache: "n/a",
      ok: false,
      detail: `token ${res.status}`,
    });
    return null;
  }
  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) return null;
  cachedToken = {
    token: data.access_token,
    exp: Date.now() + (data.expires_in || 7200) * 1000,
  };
  return data.access_token;
}

function marketplaces(): string[] {
  const raw = process.env.EBAY_MARKETPLACE_IDS || "EBAY_FR,EBAY_US,EBAY_DE,EBAY_GB";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export const ebayBrowseProvider: SearchProvider = {
  id: "ebay",

  async findOffers(
    product: CanonicalProduct,
    filters?: OfferFilters
  ): Promise<FindOffersResult | null> {
    if (!ebayCreds()) return null;
    const token = await ebayToken();
    if (!token) return null;

    const q = searchQueryFromProduct(product);
    const offers: SearchOffer[] = [];
    const providers_used = ["ebay"];
    let credits = 0;
    const t0 = Date.now();

    for (const mp of marketplaces()) {
      const url = new URL(`${ebayBase()}/buy/browse/v1/item_summary/search`);
      url.searchParams.set("q", q);
      url.searchParams.set("limit", "20");
      if (filters?.budget && filters.budget > 0) {
        const cur = filters.currency || "EUR";
        url.searchParams.set("filter", `price:[..${filters.budget}],priceCurrency:${cur}`);
      }

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-EBAY-C-MARKETPLACE-ID": mp,
        },
      });
      credits += 1;
      if (!res.ok) continue;
      const data = (await res.json()) as {
        itemSummaries?: Array<{
          title?: string;
          itemWebUrl?: string;
          price?: { value?: string; currency?: string };
          image?: { imageUrl?: string };
          condition?: string;
          seller?: { username?: string };
        }>;
      };
      for (const it of data.itemSummaries || []) {
        const link = (it.itemWebUrl || "").trim();
        const title = (it.title || "").trim();
        if (!link || !title) continue;
        offers.push({
          title: title.slice(0, 180),
          link,
          source: it.seller?.username || "eBay",
          price: it.price?.value
            ? `${it.price.value} ${it.price.currency || ""}`.trim()
            : undefined,
          currency: it.price?.currency,
          thumbnail: it.image?.imageUrl,
          country: mp.replace("EBAY_", ""),
          region:
            mp.includes("US") ? "usa" : mp.includes("FR") || mp.includes("DE") || mp.includes("GB") ? "europe" : "other",
          kind: "marketplace",
          condition: it.condition,
          provider: "ebay",
        });
      }
    }

    await logExternalCall({
      ts: new Date().toISOString(),
      provider: "ebay",
      action: "offers",
      credits,
      latency_ms: Date.now() - t0,
      cache: "miss",
      ok: offers.length > 0,
    });

    if (!offers.length) return null;

    const by_region: Record<string, number> = {};
    for (const o of offers) {
      const r = o.region || "other";
      by_region[r] = (by_region[r] || 0) + 1;
    }

    return {
      product,
      offers,
      provider: "ebay",
      providers_used,
      by_region,
      markets_ok: marketplaces().length,
      markets_total: marketplaces().length,
    };
  },
};
