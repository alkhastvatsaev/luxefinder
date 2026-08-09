import { z } from "zod";
import type { CanonicalProduct } from "./types";

export const CanonicalProductSchema = z.object({
  brand: z.string().min(1).max(80),
  model: z.string().min(1).max(120),
  reference: z.string().max(80).optional().nullable(),
  variant: z.string().max(120).optional().nullable(),
  material: z.string().max(80).optional().nullable(),
  year: z.string().max(20).optional().nullable(),
  category: z.string().max(80).optional().nullable(),
  display_name: z.string().min(1).max(200).optional().nullable(),
  confidence: z.number().min(0).max(1).optional().nullable(),
});

export type CanonicalProductParsed = z.infer<typeof CanonicalProductSchema>;

export function toCanonicalProduct(
  parsed: CanonicalProductParsed,
  provider: string,
  grounding_sources?: CanonicalProduct["grounding_sources"]
): CanonicalProduct {
  const brand = parsed.brand.trim();
  const model = parsed.model.trim();
  return {
    brand,
    model,
    reference: parsed.reference?.trim() || undefined,
    variant: parsed.variant?.trim() || undefined,
    material: parsed.material?.trim() || undefined,
    year: parsed.year?.trim() || undefined,
    category: parsed.category?.trim() || undefined,
    display_name:
      (parsed.display_name || "").trim() || `${brand} ${model}`.trim(),
    confidence:
      typeof parsed.confidence === "number" ? parsed.confidence : 0.75,
    provider,
    grounding_sources,
  };
}

export function parseCanonicalJson(raw: string): CanonicalProductParsed {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const data = JSON.parse(cleaned) as unknown;
  return CanonicalProductSchema.parse(data);
}
