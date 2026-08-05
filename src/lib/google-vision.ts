/**
 * Google Cloud Vision — closest official API to Google Lens for product ID.
 * Uses WEB_DETECTION (similar images / best guess) + LOGO + OCR + labels.
 */

type VisionEntity = { description?: string; score?: number; mid?: string };
type WebEntity = { description?: string; score?: number; entityId?: string };
type WebPage = { url?: string; pageTitle?: string; score?: number };
type WebLabel = { label?: string; languageCode?: string };

type AnnotateResponse = {
  responses?: Array<{
    error?: { message?: string; code?: number };
    logoAnnotations?: VisionEntity[];
    labelAnnotations?: VisionEntity[];
    textAnnotations?: VisionEntity[];
    webDetection?: {
      bestGuessLabels?: WebLabel[];
      webEntities?: WebEntity[];
      pagesWithMatchingImages?: WebPage[];
      visuallySimilarImages?: Array<{ url?: string }>;
      fullMatchingImages?: Array<{ url?: string }>;
    };
  }>;
};

const LUXURY_BRANDS = [
  "louis vuitton",
  "louisvuitton",
  "lv",
  "hermès",
  "hermes",
  "chanel",
  "dior",
  "gucci",
  "prada",
  "fendi",
  "céline",
  "celine",
  "saint laurent",
  "ysl",
  "balenciaga",
  "bottega veneta",
  "bottega",
  "loewe",
  "burberry",
  "tiffany",
  "cartier",
  "rolex",
  "bulgari",
  "bvlgari",
  "van cleef",
  "piaget",
  "chaumet",
  "valentino",
  "givenchy",
  "balmain",
  "versace",
  "michael kors",
  "coach",
  "tory burch",
];

function visionKey(): string {
  return (
    process.env.GOOGLE_VISION_API_KEY ||
    process.env.GOOGLE_CLOUD_VISION_API_KEY ||
    process.env.GCP_VISION_API_KEY ||
    ""
  ).trim();
}

function normalizeBrand(raw: string): string {
  const s = raw.trim();
  if (!s) return "";
  const low = s.toLowerCase();
  if (low.includes("louis vuitton") || low === "lv") return "Louis Vuitton";
  if (low.includes("herm")) return "Hermès";
  if (low.includes("saint laurent") || low === "ysl") return "Saint Laurent";
  if (low.includes("bottega")) return "Bottega Veneta";
  if (low.includes("van cleef")) return "Van Cleef & Arpels";
  if (low.includes("bulgari") || low.includes("bvlgari")) return "Bulgari";
  // Title-case simple names
  return s
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function findBrandInText(text: string): string | null {
  const low = text.toLowerCase();
  for (const b of LUXURY_BRANDS) {
    if (low.includes(b)) return normalizeBrand(b === "lv" ? "louis vuitton" : b);
  }
  return null;
}

function stripBrandFromModel(brand: string, guess: string): string {
  if (!guess) return "";
  let m = guess;
  if (brand) {
    const re = new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
    m = m.replace(re, "").replace(/^[ \-–—|,]+|[ \-–—|,]+$/g, "").trim();
  }
  return m.slice(0, 120);
}

function pickColor(labels: VisionEntity[]): string {
  const colors = [
    "black",
    "noir",
    "white",
    "blanc",
    "beige",
    "brown",
    "marron",
    "red",
    "rouge",
    "blue",
    "bleu",
    "green",
    "vert",
    "pink",
    "rose",
    "gold",
    "or",
    "silver",
    "argent",
    "grey",
    "gray",
    "gris",
  ];
  const map: Record<string, string> = {
    black: "noir",
    white: "blanc",
    brown: "marron",
    red: "rouge",
    blue: "bleu",
    green: "vert",
    pink: "rose",
    gold: "or",
    silver: "argent",
    grey: "gris",
    gray: "gris",
  };
  for (const l of labels) {
    const d = (l.description || "").toLowerCase();
    for (const c of colors) {
      if (d === c || d.includes(c)) return map[c] || c;
    }
  }
  return "";
}

function pickCategory(labels: VisionEntity[], text: string): string {
  const blob = `${labels.map((l) => l.description).join(" ")} ${text}`.toLowerCase();
  if (/bag|handbag|purse|tote|sac|wallet|portefeuille/.test(blob)) return "sac / maroquinerie";
  if (/shoe|sneaker|boot|chaussure/.test(blob)) return "chaussures";
  if (/watch|montre/.test(blob)) return "montre";
  if (/jewelry|jewellery|ring|necklace|bracelet|bijou/.test(blob)) return "bijoux";
  if (/scarf|foulard|belt|ceinture/.test(blob)) return "accessoire";
  return labels[0]?.description || "article luxe";
}

function pickMaterial(labels: VisionEntity[], text: string): string {
  const blob = `${labels.map((l) => l.description).join(" ")} ${text}`.toLowerCase();
  if (/taurillon|grained|graine/.test(blob)) return "cuir grainé";
  if (/canvas|toile|monogram/.test(blob)) return "toile / canvas";
  if (/leather|cuir/.test(blob)) return "cuir";
  if (/suede|daim/.test(blob)) return "daim";
  if (/patent|vernis/.test(blob)) return "cuir verni";
  return "";
}

export type VisionProduct = {
  brand: string;
  model: string;
  category: string;
  color: string;
  material: string;
  summary: string;
  confidence: number;
  mock: boolean;
  provider: "google_vision";
  best_guess?: string;
  web_entities?: string[];
  matching_pages?: string[];
};

export async function analyzeWithGoogleVision(
  bytes: ArrayBuffer
): Promise<VisionProduct | null> {
  const key = visionKey();
  if (!key) return null;

  const b64 = Buffer.from(bytes).toString("base64");
  const r = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [
        {
          image: { content: b64 },
          features: [
            { type: "WEB_DETECTION", maxResults: 15 },
            { type: "LOGO_DETECTION", maxResults: 5 },
            { type: "TEXT_DETECTION", maxResults: 5 },
            { type: "LABEL_DETECTION", maxResults: 15 },
          ],
        },
      ],
    }),
  });

  if (!r.ok) {
    const errText = await r.text().catch(() => "");
    throw new Error(`google_vision ${r.status}: ${errText.slice(0, 200)}`);
  }

  const data = (await r.json()) as AnnotateResponse;
  const resp = data.responses?.[0];
  if (!resp) throw new Error("google_vision empty response");
  if (resp.error) throw new Error(resp.error.message || "google_vision error");

  const web = resp.webDetection || {};
  const logos = resp.logoAnnotations || [];
  const labels = resp.labelAnnotations || [];
  const ocr = (resp.textAnnotations?.[0]?.description || "").replace(/\s+/g, " ").trim();
  const bestGuess = (web.bestGuessLabels?.[0]?.label || "").trim();
  const entities = (web.webEntities || [])
    .filter((e) => e.description && (e.score ?? 0) > 0.3)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const pages = web.pagesWithMatchingImages || [];

  // Brand: logo > OCR > best guess > web entities
  let brand =
    (logos[0]?.description && normalizeBrand(logos[0].description)) ||
    findBrandInText(ocr) ||
    findBrandInText(bestGuess) ||
    "";

  if (!brand) {
    for (const e of entities) {
      const hit = findBrandInText(e.description || "");
      if (hit) {
        brand = hit;
        break;
      }
      // entity itself may be the brand name
      const d = (e.description || "").toLowerCase();
      if (LUXURY_BRANDS.some((b) => d === b || d.includes(b))) {
        brand = normalizeBrand(e.description || "");
        break;
      }
    }
  }
  if (!brand) brand = "inconnue";

  // Model: best guess minus brand, else page titles, else top entity
  let model = stripBrandFromModel(brand, bestGuess);
  if (!model || model.length < 2) {
    for (const p of pages) {
      const title = (p.pageTitle || "").trim();
      if (!title) continue;
      const cleaned = stripBrandFromModel(brand, title)
        .replace(/\s*[|\-–].*$/, "")
        .replace(/\b(acheter|buy|replica|réplique|fake|copie)\b/gi, "")
        .trim();
      if (cleaned.length > 2) {
        model = cleaned.slice(0, 120);
        break;
      }
    }
  }
  if (!model) {
    const ent = entities.find((e) => {
      const d = (e.description || "").toLowerCase();
      return d && !findBrandInText(d) && d !== brand.toLowerCase();
    });
    if (ent?.description) model = ent.description.slice(0, 120);
  }

  const category = pickCategory(labels, `${ocr} ${bestGuess}`);
  const color = pickColor(labels);
  const material = pickMaterial(labels, `${ocr} ${bestGuess}`);

  const logoScore = logos[0]?.score ?? 0;
  const entityScore = entities[0]?.score ?? 0;
  const confidence = Math.min(
    0.98,
    Math.max(
      bestGuess ? 0.75 : 0.35,
      logoScore,
      entityScore,
      brand !== "inconnue" ? 0.65 : 0.3
    )
  );

  const parts = [
    brand !== "inconnue" ? brand : null,
    model || null,
    color || null,
    material || null,
  ].filter(Boolean);
  const summary = bestGuess
    ? `Identifié via Google Vision (proche Lens) : « ${bestGuess} ». ${
        pages[0]?.pageTitle ? `Correspondance web : ${pages[0].pageTitle}.` : ""
      }`.trim()
    : parts.length
      ? `Produit détecté : ${parts.join(" · ")}.${ocr ? ` Texte lu : ${ocr.slice(0, 80)}.` : ""}`
      : "Peu de correspondances web. Précisez marque et modèle manuellement.";

  return {
    brand,
    model: model || "",
    category,
    color: color || "non déterminée",
    material: material || "non déterminée",
    summary,
    confidence: Number(confidence.toFixed(2)),
    mock: false,
    provider: "google_vision",
    best_guess: bestGuess || undefined,
    web_entities: entities.slice(0, 8).map((e) => String(e.description)),
    matching_pages: pages
      .slice(0, 5)
      .map((p) => p.pageTitle || p.url || "")
      .filter(Boolean),
  };
}

export function hasGoogleVisionKey(): boolean {
  return Boolean(visionKey());
}
