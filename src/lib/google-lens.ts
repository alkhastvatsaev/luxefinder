/**
 * Google Lens via SerpAPI — exact product name + ranked web/shopping links.
 */

import {
  TRUSTED_DOMAINS,
  REPLICA_PATTERNS,
  normalizeText,
  findKnownModelInTitle,
  cleanModelFromTitleRemainder,
  isStrongModelName,
} from "./luxury-kb";

export type LensProduct = {
  title: string;
  source?: string;
  link?: string;
  score?: number;
  price?: string;
  thumbnail?: string;
  kind?: "shopping" | "visual" | "exact" | "organic";
};

export type RankedMatch = {
  title: string;
  link: string;
  source: string;
  kind: "official" | "resale" | "shopping" | "other";
  rank: number;
  price?: string;
};

const OFFICIAL_DOMAINS = [
  "louisvuitton.com",
  "hermes.com",
  "chanel.com",
  "dior.com",
  "gucci.com",
  "ysl.com",
  "saintlaurent.com",
  "bottegaveneta.com",
  "fendi.com",
  "celine.com",
  "prada.com",
  "loewe.com",
  "balenciaga.com",
  "burberry.com",
  "cartier.com",
  "rolex.com",
  "tiffany.com",
];

const RESALE_DOMAINS = [
  "vestiairecollective.com",
  "therealreal.com",
  "fashionphile.com",
  "rebag.com",
  "farfetch.com",
  "ssense.com",
  "mytheresa.com",
  "net-a-porter.com",
  "matchesfashion.com",
  "saksfifthavenue.com",
  "neimanmarcus.com",
  "chronext.com",
  "chrono24.com",
  "stockx.com",
];

function serpKey(): string {
  return (process.env.SERPAPI_KEY || process.env.SERP_API_KEY || "").trim();
}

export function hasSerpApiKey(): boolean {
  return Boolean(serpKey());
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function isOfficial(url: string, source?: string): boolean {
  const h = hostOf(url);
  const blob = `${h} ${source || ""}`.toLowerCase();
  return OFFICIAL_DOMAINS.some((d) => h === d || h.endsWith(`.${d}`) || blob.includes(d.replace(".com", "")));
}

function isResale(url: string, source?: string): boolean {
  const h = hostOf(url);
  const blob = `${h} ${source || ""}`.toLowerCase();
  return RESALE_DOMAINS.some((d) => h === d || h.endsWith(`.${d}`) || blob.includes(d.replace(".com", "")));
}

export async function fetchGoogleLensByUrl(
  imageUrl: string,
  opts?: { timeoutMs?: number }
): Promise<LensProduct[]> {
  const key = serpKey();
  if (!key || !imageUrl) return [];
  const timeoutMs = opts?.timeoutMs ?? 20_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const params = new URLSearchParams({
      engine: "google_lens",
      api_key: key,
      url: imageUrl,
      hl: "fr",
      country: "fr",
    });
    const r = await fetch(`https://serpapi.com/search.json?${params}`, {
      signal: controller.signal,
    });
    if (!r.ok) {
      console.error("serpapi lens url http", r.status, await r.text().catch(() => ""));
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

function formatPrice(price: unknown): string | undefined {
  if (price == null) return undefined;
  if (typeof price === "string" || typeof price === "number") return String(price);
  if (typeof price === "object") {
    const p = price as Record<string, unknown>;
    if (p.value != null) return String(p.value);
    if (p.extracted_value != null) return String(p.extracted_value);
    if (p.raw != null) return String(p.raw);
  }
  return undefined;
}

function parseLensResponse(data: Record<string, unknown>): LensProduct[] {
  const out: LensProduct[] = [];

  const exact = (data.exact_matches as Array<Record<string, unknown>>) || [];
  for (const v of exact.slice(0, 8)) {
    const title = String(v.title || "");
    const link = String(v.link || "");
    if (!title && !link) continue;
    out.push({
      title: title || link,
      source: String(v.source || hostOf(link)),
      link,
      score: 0.98,
      kind: "exact",
      thumbnail: String(v.thumbnail || ""),
    });
  }

  const shopping =
    (data.shopping_results as Array<Record<string, unknown>>) ||
    (data.products as Array<Record<string, unknown>>) ||
    [];
  for (const s of shopping.slice(0, 12)) {
    const title = String(s.title || s.name || "");
    const link = String(s.link || s.product_link || "");
    if (!title) continue;
    out.push({
      title,
      source: String(s.source || s.store || hostOf(link)),
      link,
      score: 0.95,
      kind: "shopping",
      price: formatPrice(s.price),
      thumbnail: String(s.thumbnail || ""),
    });
  }

  const visual = (data.visual_matches as Array<Record<string, unknown>>) || [];
  for (const v of visual.slice(0, 15)) {
    const title = String(v.title || "");
    const link = String(v.link || "");
    if (!title && !link) continue;
    out.push({
      title: title || link,
      source: String(v.source || hostOf(link)),
      link,
      score: Number(v.position ? Math.max(0.5, 1 - Number(v.position) / 40) : 0.85),
      kind: "visual",
      price: formatPrice(v.price),
      thumbnail: String(v.thumbnail || ""),
    });
  }

  // knowledge graph / about this image sometimes has title
  const kg = data.knowledge_graph as Record<string, unknown> | undefined;
  if (kg?.title) {
    out.unshift({
      title: String(kg.title),
      source: String(kg.source || "knowledge_graph"),
      link: String(kg.link || ""),
      score: 0.99,
      kind: "exact",
    });
  }

  return out;
}

/** Rank up to 10 links: prefer title match to product, then official, then resale. */
export function rankMatchLinks(products: LensProduct[], limit = 10): RankedMatch[] {
  const best = bestLensTitle(products);
  const bestNorm = normalizeText(best);
  // tokens from best title excluding brand noise
  const tokens = bestNorm
    .split(" ")
    .filter((t) => t.length > 2 && !["louis", "vuitton", "chanel", "hermes", "sac", "bag", "handbag", "tote", "leather", "cuir", "noir", "black", "pre", "owned"].includes(t));

  const seen = new Set<string>();
  const scored: Array<RankedMatch & { _w: number }> = [];

  for (const p of products) {
    const link = p.link;
    if (!link || !/^https?:\/\//i.test(link)) continue;
    if (REPLICA_PATTERNS.test(p.title) || REPLICA_PATTERNS.test(link)) continue;
    // skip low-value social noise
    if (/\b(tiktok|instagram|pinterest|facebook)\b/i.test(hostOf(link))) continue;
    const key = link.split("?")[0].toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const titleNorm = normalizeText(p.title);
    let relevance = 0;
    for (const t of tokens) {
      if (titleNorm.includes(t)) relevance += 25;
    }
    // strong boost if model phrase present
    if (tokens.length && tokens.filter((t) => titleNorm.includes(t)).length >= Math.min(2, tokens.length)) {
      relevance += 40;
    }

    let kind: RankedMatch["kind"] = "other";
    let w = (p.score || 0.5) * 10 + relevance;
    if (isOfficial(link, p.source)) {
      kind = "official";
      // official only wins if title is relevant; otherwise soft boost
      w += relevance >= 25 ? 80 : 5;
    } else if (isResale(link, p.source) || TRUSTED_DOMAINS.some((d) => hostOf(link).endsWith(d))) {
      kind = "resale";
      w += 35 + (relevance >= 25 ? 20 : 0);
    } else if (p.kind === "shopping") {
      kind = "shopping";
      w += 20;
    }

    scored.push({
      title: p.title.slice(0, 160),
      link,
      source: p.source || hostOf(link),
      kind,
      rank: 0,
      price: p.price,
      _w: w,
    });
  }

  scored.sort((a, b) => b._w - a._w);
  // Prefer: among top, put best official relevant first if any
  const officialHit = scored.find((s) => s.kind === "official" && s._w > 50);
  if (officialHit) {
    const rest = scored.filter((s) => s !== officialHit);
    scored.splice(0, scored.length, officialHit, ...rest);
  }

  return scored.slice(0, limit).map((m, i) => {
    const { _w, ...rest } = m;
    return { ...rest, rank: i + 1 };
  });
}

/** Best product title from Lens (prefer shopping/exact over generic). */
export function bestLensTitle(products: LensProduct[]): string {
  const preferred = products.filter(
    (p) =>
      p.title &&
      !/^(tote|bag|handbag|purse|sac|leather|cuir)\b/i.test(p.title.trim()) &&
      p.title.length > 8
  );
  const pool = preferred.length ? preferred : products;
  const sorted = [...pool].sort((a, b) => (b.score || 0) - (a.score || 0));
  return sorted[0]?.title || "";
}

/** Parse brand/model hints from a Lens / shopping title. */
export function parseTitleBrandModel(title: string): { brand?: string; model?: string } {
  const t = title.trim();
  if (!t) return {};

  // Prefer known catalogue models when present in the title
  const known = findKnownModelInTitle(t);
  if (known) return known;

  const brands = [
    "Louis Vuitton",
    "Hermès",
    "Hermes",
    "Chanel",
    "Dior",
    "Gucci",
    "Prada",
    "Fendi",
    "Celine",
    "Céline",
    "Saint Laurent",
    "Yves Saint Laurent",
    "Bottega Veneta",
    "Loewe",
    "Balenciaga",
    "Burberry",
  ];
  for (const b of brands) {
    if (normalizeText(t).includes(normalizeText(b))) {
      const re = new RegExp(b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      let model = t.replace(re, "").replace(/^[\s\-–—|:]+/, "").trim();
      model = model.replace(/\s*[|\-–].*$/, "").slice(0, 120);
      model = cleanModelFromTitleRemainder(model) || model;
      const brand =
        b === "Hermes"
          ? "Hermès"
          : b === "Céline"
            ? "Celine"
            : b === "Yves Saint Laurent"
              ? "Saint Laurent"
              : b;
      if (!isStrongModelName(model)) {
        return { brand };
      }
      return { brand, model };
    }
  }
  const cleaned = cleanModelFromTitleRemainder(t);
  return cleaned ? { model: cleaned.slice(0, 100) } : { model: t.slice(0, 100) };
}
