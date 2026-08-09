import type { CanonicalProduct, FindOffersResult, SearchOffer } from "../types";
import { searchQueryFromProduct } from "../canonical";

const BRAND_OFFICIAL: Record<string, string> = {
  gucci: "https://www.gucci.com/search?search-cat=header-search&text=",
  "louis vuitton": "https://us.louisvuitton.com/eng-us/search/",
  chanel: "https://www.chanel.com/us/search/?q=",
  dior: "https://www.dior.com/en_us/search/",
  hermes: "https://www.hermes.com/us/en/search/?s=",
  "hermès": "https://www.hermes.com/us/en/search/?s=",
  prada: "https://www.prada.com/us/en/search.html?q=",
  fendi: "https://www.fendi.com/us-en/search?q=",
  celine: "https://www.celine.com/en-us/search?q=",
  "saint laurent": "https://www.ysl.com/en-us/search?q=",
  "bottega veneta": "https://www.bottegaveneta.com/en-us/search?q=",
  loewe: "https://www.loewe.com/usa/en/search?q=",
  balenciaga: "https://www.balenciaga.com/en-us/search?q=",
};

function enc(q: string): string {
  return encodeURIComponent(q);
}

function offer(
  title: string,
  link: string,
  source: string,
  country: string
): SearchOffer {
  return {
    title,
    link,
    source,
    country,
    region: "europe",
    kind: "deeplink",
    provider: "deeplink",
  };
}

/** Cost-zero deep-links — app must never show an empty offers list. */
export function buildDeepLinkOffers(product: CanonicalProduct): FindOffersResult {
  const q = searchQueryFromProduct(product);
  const offers: SearchOffer[] = [
    offer(`eBay — ${q}`, `https://www.ebay.com/sch/i.html?_nkw=${enc(q)}`, "eBay", "Monde"),
    offer(
      `Vestiaire Collective — ${q}`,
      `https://www.vestiairecollective.com/search/?q=${enc(q)}`,
      "Vestiaire Collective",
      "Europe"
    ),
    offer(
      `The RealReal — ${q}`,
      `https://www.therealreal.com/search?q=${enc(q)}`,
      "The RealReal",
      "USA"
    ),
    offer(
      `Farfetch — ${q}`,
      `https://www.farfetch.com/shopping/search/items.aspx?q=${enc(q)}`,
      "Farfetch",
      "Monde"
    ),
    offer(
      `Grailed — ${q}`,
      `https://www.grailed.com/shop?query=${enc(q)}`,
      "Grailed",
      "USA"
    ),
    offer(
      `Chrono24 — ${q}`,
      `https://www.chrono24.com/search/index.htm?query=${enc(q)}`,
      "Chrono24",
      "Monde"
    ),
  ];

  const brandKey = product.brand.toLowerCase();
  const official = BRAND_OFFICIAL[brandKey];
  if (official) {
    offers.unshift(
      offer(
        `${product.brand} officiel — ${q}`,
        `${official}${enc(q)}`,
        product.brand,
        "Officiel"
      )
    );
  }

  return {
    product,
    offers,
    provider: "deeplink",
    providers_used: ["deeplink"],
    fallback: true,
    by_region: { europe: offers.length, usa: 0, asia: 0, africa: 0 },
    markets_ok: 1,
    markets_total: 1,
  };
}
