/**
 * Google Cloud Vision — rich signal extraction for luxury product ID.
 */

import type { VisionSignals } from "./luxury-resolve";

type VisionEntity = { description?: string; score?: number };
type WebEntity = { description?: string; score?: number };
type WebPage = { url?: string; pageTitle?: string; score?: number };
type WebLabel = { label?: string };
type ColorInfo = { color?: { red?: number; green?: number; blue?: number }; score?: number; pixelFraction?: number };
type LocalizedObject = { name?: string; score?: number };

type AnnotateResponse = {
  responses?: Array<{
    error?: { message?: string };
    logoAnnotations?: VisionEntity[];
    labelAnnotations?: VisionEntity[];
    textAnnotations?: VisionEntity[];
    localizedObjectAnnotations?: LocalizedObject[];
    imagePropertiesAnnotation?: { dominantColors?: { colors?: ColorInfo[] } };
    webDetection?: {
      bestGuessLabels?: WebLabel[];
      webEntities?: WebEntity[];
      pagesWithMatchingImages?: WebPage[];
      visuallySimilarImages?: Array<{ url?: string }>;
      fullMatchingImages?: Array<{ url?: string }>;
      partialMatchingImages?: Array<{ url?: string }>;
    };
  }>;
};

export function visionKey(): string {
  return (
    process.env.GOOGLE_VISION_API_KEY ||
    process.env.GOOGLE_CLOUD_VISION_API_KEY ||
    process.env.GCP_VISION_API_KEY ||
    ""
  ).trim();
}

export function hasGoogleVisionKey(): boolean {
  return Boolean(visionKey());
}

async function annotate(b64: string, features: Array<{ type: string; maxResults?: number }>) {
  const key = visionKey();
  if (!key) throw new Error("no vision key");
  const r = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{ image: { content: b64 }, features }],
      }),
    }
  );
  if (!r.ok) {
    const errText = await r.text().catch(() => "");
    throw new Error(`google_vision ${r.status}: ${errText.slice(0, 240)}`);
  }
  const data = (await r.json()) as AnnotateResponse;
  const resp = data.responses?.[0];
  if (!resp) throw new Error("google_vision empty");
  if (resp.error) throw new Error(resp.error.message || "google_vision error");
  return resp;
}

function toSignals(resp: NonNullable<AnnotateResponse["responses"]>[0]): VisionSignals {
  const web = resp.webDetection || {};
  const colors = resp.imagePropertiesAnnotation?.dominantColors?.colors || [];
  const mappedColors = colors.map((c) => ({
    r: c.color?.red ?? 0,
    g: c.color?.green ?? 0,
    b: c.color?.blue ?? 0,
    score: c.score,
    fraction: c.pixelFraction,
  }));
  const topByScore = [...mappedColors].sort((a, b) => (b.score || 0) - (a.score || 0))[0];

  const similar = [
    ...(web.visuallySimilarImages || []),
    ...(web.fullMatchingImages || []),
    ...(web.partialMatchingImages || []),
  ]
    .map((x) => x.url || "")
    .filter(Boolean);

  return {
    logos: (resp.logoAnnotations || [])
      .filter((l) => l.description)
      .map((l) => ({ description: String(l.description), score: l.score ?? 0.5 })),
    labels: (resp.labelAnnotations || [])
      .filter((l) => l.description)
      .map((l) => ({ description: String(l.description), score: l.score ?? 0.5 })),
    ocr: (resp.textAnnotations?.[0]?.description || "").replace(/\s+/g, " ").trim(),
    bestGuess: (web.bestGuessLabels?.[0]?.label || "").trim(),
    webEntities: (web.webEntities || [])
      .filter((e) => e.description)
      .map((e) => ({ description: String(e.description), score: e.score ?? 0.4 }))
      .sort((a, b) => b.score - a.score),
    pages: (web.pagesWithMatchingImages || [])
      .map((p) => ({
        url: p.url || "",
        title: (p.pageTitle || "").trim(),
        score: p.score ?? 0.5,
      }))
      .filter((p) => p.title || p.url),
    dominantColors: mappedColors,
    dominantColor: topByScore
      ? { r: topByScore.r, g: topByScore.g, b: topByScore.b }
      : undefined,
    objects: (resp.localizedObjectAnnotations || [])
      .filter((o) => o.name)
      .map((o) => ({ name: String(o.name), score: o.score ?? 0.5 })),
    similarImageUrls: similar.slice(0, 20),
  };
}

const FULL_FEATURES = [
  { type: "WEB_DETECTION", maxResults: 20 },
  { type: "LOGO_DETECTION", maxResults: 5 },
  { type: "TEXT_DETECTION", maxResults: 5 },
  { type: "LABEL_DETECTION", maxResults: 15 },
  { type: "IMAGE_PROPERTIES", maxResults: 5 },
  { type: "OBJECT_LOCALIZATION", maxResults: 5 },
];

/** Primary full-frame Vision pass. */
export async function extractVisionSignals(bytes: ArrayBuffer): Promise<VisionSignals> {
  const b64 = Buffer.from(bytes).toString("base64");
  const resp = await annotate(b64, FULL_FEATURES);
  return toSignals(resp);
}

/** Secondary pass on a cropped JPEG/PNG buffer (ROI). */
export async function extractVisionSignalsFromB64(b64: string): Promise<VisionSignals> {
  const resp = await annotate(b64, [
    { type: "WEB_DETECTION", maxResults: 12 },
    { type: "LOGO_DETECTION", maxResults: 3 },
    { type: "TEXT_DETECTION", maxResults: 3 },
    { type: "LABEL_DETECTION", maxResults: 8 },
  ]);
  return toSignals(resp);
}

/** Merge multiple VisionSignals (full + crops). */
export function mergeVisionSignals(parts: VisionSignals[]): VisionSignals {
  if (parts.length === 0) {
    return {
      logos: [],
      labels: [],
      ocr: "",
      bestGuess: "",
      webEntities: [],
      pages: [],
    };
  }
  const base = { ...parts[0], pages: [...parts[0].pages], webEntities: [...parts[0].webEntities], logos: [...parts[0].logos] };
  for (const p of parts.slice(1)) {
    base.logos.push(...p.logos);
    base.labels.push(...p.labels);
    base.webEntities.push(...p.webEntities);
    base.pages.push(...p.pages);
    if (p.ocr && p.ocr.length > base.ocr.length) base.ocr = p.ocr;
    if (p.bestGuess && !base.bestGuess) base.bestGuess = p.bestGuess;
    if (p.lensProducts) base.lensProducts = [...(base.lensProducts || []), ...p.lensProducts];
    if (p.objects) base.objects = [...(base.objects || []), ...p.objects];
    if (!base.dominantColor && p.dominantColor) base.dominantColor = p.dominantColor;
  }
  // dedupe pages by url
  const seen = new Set<string>();
  base.pages = base.pages.filter((pg) => {
    const k = pg.url || pg.title;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  return base;
}

/** @deprecated thin wrapper — prefer extractVisionSignals + resolve pipeline */
export async function analyzeWithGoogleVision(bytes: ArrayBuffer) {
  return extractVisionSignals(bytes);
}
