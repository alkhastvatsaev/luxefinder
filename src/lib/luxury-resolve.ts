import {
  LUXURY_MODELS,
  REPLICA_PATTERNS,
  TRUSTED_DOMAINS,
  normalizeText,
  type LuxuryModel,
} from "./luxury-kb";

export type VisionSignals = {
  logos: Array<{ description: string; score: number }>;
  labels: Array<{ description: string; score: number }>;
  ocr: string;
  bestGuess: string;
  webEntities: Array<{ description: string; score: number }>;
  pages: Array<{ url: string; title: string; score: number }>;
  dominantColors?: Array<{ r: number; g: number; b: number; score?: number; fraction?: number }>;
  dominantColor?: { r: number; g: number; b: number };
  objects?: Array<{ name: string; score: number }>;
  lensProducts?: Array<{ title: string; source?: string; link?: string; score?: number }>;
  similarImageUrls?: string[];
};

export type Candidate = {
  brand: string;
  model: string;
  score: number;
  source: string;
};

export type ResolvedLuxury = {
  brand: string;
  model: string;
  category: string;
  color: string;
  material: string;
  confidence: number;
  authenticity_uncertain: boolean;
  candidates: Candidate[];
  summaryHints: string[];
  trustedHits: number;
  replicaHits: number;
};

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function isTrusted(url: string): boolean {
  const d = domainOf(url);
  return TRUSTED_DOMAINS.some((t) => d === t || d.endsWith(`.${t}`));
}

function colorFromRgb(r: number, g: number, b: number): string {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2 / 255;
  if (l < 0.22) return "noir";
  if (l > 0.85) return "blanc";
  // brown / cognac / beige heuristics
  if (r > 100 && g > 60 && b < 80 && r > b + 30) {
    if (l < 0.35) return "marron";
    if (l < 0.55) return "cognac";
    return "beige";
  }
  if (r > 150 && g < 100 && b < 100) return "rouge";
  if (b > r && b > g) return "bleu";
  if (g > r && g > b) return "vert";
  if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
    if (l < 0.45) return "gris";
    return "beige";
  }
  return "";
}

/** Prefer high-score non-background colors (ignore studio white). */
export function pickDominantColor(
  colors: Array<{ r: number; g: number; b: number; score?: number; fraction?: number }>
): string {
  const ranked = [...colors].sort((a, b) => (b.score || 0) - (a.score || 0));
  for (const c of ranked) {
    const l = (Math.max(c.r, c.g, c.b) + Math.min(c.r, c.g, c.b)) / 2 / 255;
    // skip near-white studio background even if huge pixelFraction
    if (l > 0.82) continue;
    const name = colorFromRgb(c.r, c.g, c.b);
    if (name && name !== "blanc") return name;
  }
  for (const c of ranked) {
    const name = colorFromRgb(c.r, c.g, c.b);
    if (name) return name;
  }
  return "";
}

function matchKb(text: string, brandHint?: string): { hit: LuxuryModel; score: number } | null {
  const n = normalizeText(text);
  if (!n) return null;
  let best: { hit: LuxuryModel; score: number } | null = null;
  for (const m of LUXURY_MODELS) {
    if (brandHint && normalizeText(m.brand) !== normalizeText(brandHint) && !n.includes(normalizeText(m.brand))) {
      // allow if brand in text elsewhere; skip hard mismatch when brandHint set and neither matches
      const brandInText = n.includes(normalizeText(m.brand).split(" ")[0] || "");
      if (!brandInText && normalizeText(brandHint).split(" ")[0] !== normalizeText(m.brand).split(" ")[0]) {
        continue;
      }
    }
    for (const alias of [m.model, ...m.aliases]) {
      const a = normalizeText(alias);
      if (a.length < 3) continue;
      if (n.includes(a)) {
        const score = 0.55 + Math.min(0.35, a.length / 40) + (alias === m.model ? 0.05 : 0);
        if (!best || score > best.score) best = { hit: m, score };
      }
    }
  }
  return best;
}

function brandFromSignals(s: VisionSignals): string {
  if (s.logos[0]?.description) return normalizeBrandName(s.logos[0].description);
  const blob = [s.ocr, s.bestGuess, ...s.webEntities.map((e) => e.description), ...s.pages.map((p) => p.title)]
    .join(" ");
  const brands = [
    "louis vuitton",
    "hermès",
    "hermes",
    "chanel",
    "dior",
    "gucci",
    "prada",
    "fendi",
    "celine",
    "céline",
    "saint laurent",
    "ysl",
    "bottega veneta",
    "loewe",
    "balenciaga",
    "burberry",
    "cartier",
    "rolex",
    "tiffany",
  ];
  const low = blob.toLowerCase();
  for (const b of brands) {
    if (low.includes(b)) return normalizeBrandName(b);
  }
  return "inconnue";
}

function normalizeBrandName(raw: string): string {
  const low = raw.toLowerCase();
  if (low.includes("louis") || low === "lv") return "Louis Vuitton";
  if (low.includes("herm")) return "Hermès";
  if (low.includes("saint laurent") || low === "ysl") return "Saint Laurent";
  if (low.includes("bottega")) return "Bottega Veneta";
  if (low.includes("cél") || low.includes("cel")) return "Celine";
  return raw
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function pickMaterial(s: VisionSignals): string {
  const blob = `${s.ocr} ${s.bestGuess} ${s.labels.map((l) => l.description).join(" ")} ${s.pages.map((p) => p.title).join(" ")}`.toLowerCase();
  if (/taurillon|grained|graine|grainé/.test(blob)) return "cuir grainé";
  if (/epi|épi/.test(blob)) return "cuir épi";
  if (/monogram|canvas|toile/.test(blob)) return "toile monogram";
  if (/damier/.test(blob)) return "toile damier";
  if (/suede|daim|nubuck/.test(blob)) return "daim";
  if (/patent|vernis/.test(blob)) return "cuir verni";
  if (/leather|cuir/.test(blob)) return "cuir";
  return "non déterminée";
}

function pickCategory(s: VisionSignals): string {
  const blob = `${s.labels.map((l) => l.description).join(" ")} ${s.bestGuess} ${s.objects?.map((o) => o.name).join(" ") || ""}`.toLowerCase();
  if (/bag|handbag|purse|tote|sac|wallet/.test(blob)) return "sac / maroquinerie";
  if (/shoe|sneaker|boot|chaussure/.test(blob)) return "chaussures";
  if (/watch|montre/.test(blob)) return "montre";
  if (/jewelry|ring|necklace|bracelet|bijou/.test(blob)) return "bijoux";
  return "article luxe";
}

/**
 * Score page titles + KB + Lens products against luxury domain knowledge.
 */
export function resolveLuxuryProduct(signals: VisionSignals): ResolvedLuxury {
  const brand = brandFromSignals(signals);
  const candidates: Candidate[] = [];
  let trustedHits = 0;
  let replicaHits = 0;
  const summaryHints: string[] = [];

  const texts: Array<{ text: string; weight: number; source: string; url?: string }> = [];

  if (signals.bestGuess) {
    texts.push({ text: signals.bestGuess, weight: 0.35, source: "best_guess" });
  }
  for (const e of signals.webEntities.slice(0, 12)) {
    texts.push({ text: e.description, weight: 0.25 * (e.score || 0.5), source: "web_entity" });
  }
  for (const p of signals.pages.slice(0, 20)) {
    const replica = REPLICA_PATTERNS.test(p.title) || REPLICA_PATTERNS.test(p.url);
    if (replica) {
      replicaHits += 1;
      continue;
    }
    const trusted = isTrusted(p.url);
    if (trusted) trustedHits += 1;
    texts.push({
      text: p.title,
      weight: (trusted ? 0.9 : 0.45) * Math.max(0.3, p.score || 0.5),
      source: trusted ? "trusted_page" : "web_page",
      url: p.url,
    });
  }
  for (const lp of signals.lensProducts || []) {
    const replica = REPLICA_PATTERNS.test(lp.title);
    if (replica) {
      replicaHits += 1;
      continue;
    }
    texts.push({
      text: lp.title,
      weight: 1.1 * (lp.score ?? 0.8),
      source: "google_lens",
    });
  }
  if (signals.ocr) {
    texts.push({ text: signals.ocr, weight: 0.4, source: "ocr" });
  }

  // Hardware heuristic: LV + tote + stamp → Lockme / Lock Go line
  if (
    /louis vuitton/i.test(brand) &&
    /tote|handbag|bag/i.test(signals.bestGuess || "") &&
    /louis\s*vuitton/i.test(signals.ocr)
  ) {
    candidates.push(
      { brand: "Louis Vuitton", model: "Lock Go PM", score: 0.52, source: "hardware_heuristic" },
      { brand: "Louis Vuitton", model: "Lockme", score: 0.5, source: "hardware_heuristic" }
    );
    summaryHints.push("LV tote + stamp → Lockme/Lock Go heuristique");
  }

  for (const t of texts) {
    const kb = matchKb(t.text, brand !== "inconnue" ? brand : undefined);
    if (kb) {
      candidates.push({
        brand: kb.hit.brand,
        model: kb.hit.model,
        score: Math.min(0.99, kb.score * t.weight + (t.source === "google_lens" ? 0.1 : 0)),
        source: t.source,
      });
      summaryHints.push(`${kb.hit.brand} ${kb.hit.model} ← ${t.source}`);
    } else if (t.source === "google_lens" || t.source === "trusted_page") {
      // keep raw title as soft candidate
      const cleaned = t.text
        .replace(REPLICA_PATTERNS, "")
        .replace(/\s*[|\-–].*$/, "")
        .trim()
        .slice(0, 80);
      if (cleaned.length > 4) {
        candidates.push({
          brand: brand !== "inconnue" ? brand : "inconnue",
          model: cleaned,
          score: 0.35 * t.weight,
          source: t.source + "_raw",
        });
      }
    }
  }

  // Deduplicate by brand+model
  const byKey = new Map<string, Candidate>();
  for (const c of candidates) {
    const key = `${normalizeText(c.brand)}|${normalizeText(c.model)}`;
    const prev = byKey.get(key);
    if (!prev || c.score > prev.score) byKey.set(key, c);
  }
  const ranked = [...byKey.values()].sort((a, b) => b.score - a.score).slice(0, 5);

  const top = ranked[0];
  let model = top?.model || "";
  // Avoid generic models
  if (/^(tote|bag|handbag|purse|sac|leather|cuir|noir|black)(\s+bag)?$/i.test(model.trim())) {
    model = ranked.find((c) => !/^(tote|bag|handbag|purse|sac)/i.test(c.model))?.model || "";
  }

  const color =
    (signals.dominantColors?.length
      ? pickDominantColor(signals.dominantColors)
      : signals.dominantColor
        ? colorFromRgb(signals.dominantColor.r, signals.dominantColor.g, signals.dominantColor.b)
        : "") || "non déterminée";

  const authenticity_uncertain = replicaHits >= 3 && trustedHits === 0;
  const confidence = Math.min(
    0.97,
    Math.max(
      top?.score || 0.25,
      signals.logos[0]?.score || 0,
      brand !== "inconnue" ? 0.55 : 0.2
    ) * (authenticity_uncertain ? 0.7 : 1)
  );

  return {
    brand: top?.brand || brand,
    model,
    category: pickCategory(signals),
    color,
    material: pickMaterial(signals),
    confidence: Number(confidence.toFixed(2)),
    authenticity_uncertain,
    candidates: ranked.slice(0, 3),
    summaryHints: summaryHints.slice(0, 6),
    trustedHits,
    replicaHits,
  };
}
