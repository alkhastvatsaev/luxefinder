import { createHash } from "crypto";
import { normalizeText } from "@/lib/luxury-kb";
import type { CanonicalProduct } from "./types";

/** Stable cache / coalesce key for a product identity. */
export function canonicalKey(product: {
  brand?: string;
  model?: string;
  reference?: string;
  variant?: string;
  display_name?: string;
}): string {
  const brand = normalizeText(product.brand || "");
  const model = normalizeText(product.model || "");
  const reference = normalizeText(product.reference || "");
  const variant = normalizeText(product.variant || "");
  const base =
    brand && model
      ? [brand, model, reference, variant].filter(Boolean).join("|")
      : normalizeText(product.display_name || "");
  return createHash("sha256").update(base || "unknown").digest("hex").slice(0, 40);
}

export function productFromParts(
  brand: string,
  model: string,
  provider: string,
  extra?: Partial<CanonicalProduct>
): CanonicalProduct {
  const b = (brand || extra?.brand || "inconnue").trim() || "inconnue";
  const m = (model || extra?.model || "article").trim() || "article";
  return {
    ...extra,
    brand: b,
    model: m,
    display_name:
      (extra?.display_name || "").trim() || `${b} ${m}`.trim() || "article",
    confidence: extra?.confidence ?? 0.8,
    provider,
  };
}

export function searchQueryFromProduct(product: CanonicalProduct): string {
  return (
    product.display_name ||
    [product.brand, product.model, product.variant, product.reference]
      .filter(Boolean)
      .join(" ")
  ).slice(0, 160);
}
