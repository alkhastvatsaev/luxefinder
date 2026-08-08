/**
 * Living product catalogue — grows from successful photo/text identifications.
 * Stored as a single JSON blob for fast typeahead merges with the seed KB.
 */

import { put, list } from "@vercel/blob";
import {
  normalizeText,
  significantQueryTokens,
  isStrongModelName,
  type LuxuryModel,
  type LuxurySuggestion,
  suggestLuxuryModels,
} from "./luxury-kb";

export type CatalogProduct = {
  id: string;
  brand: string;
  model: string;
  aliases: string[];
  thumbnail?: string;
  hits: number;
  created_at: string;
  updated_at: string;
};

const CATALOG_PATH = "catalog/products.json";

function productId(brand: string, model: string): string {
  return normalizeText(`${brand} ${model}`).replace(/\s+/g, "-").slice(0, 120);
}

async function readCatalog(): Promise<CatalogProduct[]> {
  try {
    const { blobs } = await list({ prefix: CATALOG_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === CATALOG_PATH);
    if (!hit) return [];
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as { products?: CatalogProduct[] } | CatalogProduct[];
    if (Array.isArray(data)) return data;
    return Array.isArray(data.products) ? data.products : [];
  } catch {
    return [];
  }
}

async function writeCatalog(products: CatalogProduct[]): Promise<void> {
  await put(CATALOG_PATH, JSON.stringify({ products, updated_at: new Date().toISOString() }), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function cleanAlias(s: string | undefined | null): string | null {
  const t = String(s || "").trim().slice(0, 160);
  if (t.length < 3) return null;
  return t;
}

/** Remember a resolved product so future typeahead finds it. */
export async function upsertCatalogProduct(input: {
  brand: string;
  model: string;
  aliases?: Array<string | undefined | null>;
  thumbnail?: string;
}): Promise<CatalogProduct | null> {
  const brand = String(input.brand || "").trim().slice(0, 80);
  const model = String(input.model || "").trim().slice(0, 120);
  if (!brand || !model) return null;
  if (/^inconnue$/i.test(brand)) return null;
  if (!isStrongModelName(model)) return null;

  const id = productId(brand, model);
  const now = new Date().toISOString();
  const products = await readCatalog();
  const idx = products.findIndex((p) => p.id === id);
  const incomingAliases = (input.aliases || [])
    .map(cleanAlias)
    .filter((a): a is string => Boolean(a));

  if (idx >= 0) {
    const prev = products[idx];
    const aliasSet = new Set(
      [...prev.aliases, ...incomingAliases, `${brand} ${model}`].map((a) => a.trim()).filter(Boolean)
    );
    const next: CatalogProduct = {
      ...prev,
      aliases: Array.from(aliasSet).slice(0, 24),
      thumbnail: input.thumbnail || prev.thumbnail,
      hits: (prev.hits || 0) + 1,
      updated_at: now,
    };
    products[idx] = next;
    // Keep hottest first
    products.sort((a, b) => b.hits - a.hits || b.updated_at.localeCompare(a.updated_at));
    await writeCatalog(products.slice(0, 2000));
    return next;
  }

  const entry: CatalogProduct = {
    id,
    brand,
    model,
    aliases: Array.from(
      new Set([...incomingAliases, `${brand} ${model}`, model].map((a) => a.trim()).filter(Boolean))
    ).slice(0, 24),
    thumbnail: input.thumbnail,
    hits: 1,
    created_at: now,
    updated_at: now,
  };
  products.unshift(entry);
  await writeCatalog(products.slice(0, 2000));
  return entry;
}

export async function catalogAsLuxuryModels(): Promise<LuxuryModel[]> {
  const products = await readCatalog();
  return products.map((p) => ({
    brand: p.brand,
    model: p.model,
    aliases: p.aliases,
    category: "sac",
  }));
}

/** Seed KB + living catalogue suggestions. */
export async function suggestAllModels(query: string, limit = 8): Promise<LuxurySuggestion[]> {
  const living = await catalogAsLuxuryModels();
  return suggestLuxuryModels(query, limit, living);
}

/** Best living-catalog hit for a free query (alias / model contains). */
export async function matchCatalogProduct(query: string): Promise<CatalogProduct | null> {
  const q = normalizeText(query);
  const tokens = significantQueryTokens(query);
  if (q.length < 2) return null;
  const products = await readCatalog();
  let best: { p: CatalogProduct; score: number } | null = null;

  for (const p of products) {
    const brandN = normalizeText(p.brand);
    const modelN = normalizeText(p.model);
    const hay = [brandN, modelN, ...p.aliases.map(normalizeText)].join(" ");
    let score = 0;
    if (modelN === q || hay === q) score += 200;
    if (hay.includes(q) && q.length >= 4) score += 80;
    for (const t of tokens) {
      if (modelN.includes(t)) score += 90;
      if (brandN.includes(t)) score += 40;
      if (p.aliases.some((a) => normalizeText(a).includes(t))) score += 50;
    }
    if (score < 90) continue;
    if (!best || score > best.score) best = { p, score };
  }
  return best?.p || null;
}
