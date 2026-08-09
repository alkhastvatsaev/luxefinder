/**
 * Cost controls for Gemini identify/synthesize.
 * Biggest burns historically: full-res phone photos + 2.5 Flash dynamic thinking.
 */

import sharp from "sharp";

/** Max long edge sent to Gemini (tiles = $). */
const MAX_EDGE = Number(process.env.GEMINI_IMAGE_MAX_EDGE || 768);
const JPEG_QUALITY = Number(process.env.GEMINI_IMAGE_JPEG_QUALITY || 72);

export type PreparedGeminiImage = {
  bytes: Buffer;
  mimeType: "image/jpeg";
  originalBytes: number;
  preparedBytes: number;
};

/** Downscale + JPEG — keeps ID quality, cuts image tokens hard. */
export async function prepareImageForGemini(
  bytes: ArrayBuffer | Buffer,
  _contentType?: string
): Promise<PreparedGeminiImage> {
  const input = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  const edge = Number.isFinite(MAX_EDGE) && MAX_EDGE >= 256 ? Math.min(MAX_EDGE, 1280) : 768;
  const q = Number.isFinite(JPEG_QUALITY) && JPEG_QUALITY >= 40 ? Math.min(JPEG_QUALITY, 85) : 72;
  const out = await sharp(input)
    .rotate()
    .resize({
      width: edge,
      height: edge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: q, mozjpeg: true })
    .toBuffer();
  return {
    bytes: out,
    mimeType: "image/jpeg",
    originalBytes: input.byteLength,
    preparedBytes: out.byteLength,
  };
}

/** Shared generationConfig: no thinking, short JSON, optional low media res. */
export function geminiCheapGenerationConfig(extra?: Record<string, unknown>): Record<string, unknown> {
  const cfg: Record<string, unknown> = {
    temperature: 0.1,
    responseMimeType: "application/json",
    maxOutputTokens: Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 256),
    // 2.5 Flash defaults to dynamic thinking — billed as output. Kill it.
    thinkingConfig: {
      thinkingBudget: Number(process.env.GEMINI_THINKING_BUDGET ?? 0),
    },
    ...extra,
  };
  const media = (process.env.GEMINI_MEDIA_RESOLUTION || "").trim();
  if (media) cfg.mediaResolution = media;
  return cfg;
}

export function geminiModel(): string {
  return (
    process.env.GEMINI_IDENTIFY_MODEL ||
    process.env.GEMINI_MODEL ||
    "gemini-2.5-flash"
  ).trim();
}
