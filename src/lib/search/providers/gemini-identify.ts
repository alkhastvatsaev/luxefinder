/**
 * Gemini identify — cheap by default:
 * - images downscaled (see gemini-prep)
 * - thinkingBudget=0 (2.5 Flash otherwise burns reasoning tokens)
 * - grounding OFF unless GEMINI_GROUNDING=auto|always
 *
 * Env: GEMINI_GROUNDING=never|auto|always  (default never)
 *      GEMINI_IDENTIFY_MODEL (default gemini-2.5-flash)
 */

import {
  geminiCheapGenerationConfig,
  geminiModel,
  prepareImageForGemini,
} from "@/lib/gemini-prep";
import { isStrongModelName } from "@/lib/luxury-kb";
import { parseCanonicalJson, toCanonicalProduct } from "../schemas";
import { logExternalCall } from "../telemetry";
import type {
  IdentifyInput,
  IdentifyResult,
  SearchProvider,
} from "../types";

function geminiKey(): string {
  return (process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "").trim();
}

function groundingMode(): "auto" | "always" | "never" {
  // never = 1 cheap call; auto = 2nd grounded call when weak ($$)
  const v = (process.env.GEMINI_GROUNDING || "never").toLowerCase().trim();
  if (v === "always" || v === "auto") return v;
  return "never";
}

const SYSTEM = `Tu identifies des articles de luxe (sacs, accessoires).
Réponds UNIQUEMENT avec un JSON valide, sans markdown, schéma:
{"brand":"string","model":"string","reference":"string|null","variant":"string|null","material":"string|null","year":"string|null","category":"string|null","display_name":"string","confidence":0.0}
Sois précis sur marque + modèle. Si incertain, confidence basse.`;

class GeminiHttpError extends Error {
  status: number;
  constructor(status: number, body: string) {
    super(`gemini http ${status}: ${body}`);
    this.status = status;
  }
}

function isTransientHttp(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

function isNetworkError(e: unknown): boolean {
  if (!(e instanceof Error)) return false;
  const m = e.message.toLowerCase();
  return (
    m.includes("fetch failed") ||
    m.includes("network") ||
    m.includes("econnreset") ||
    m.includes("etimedout") ||
    m.includes("abort")
  );
}

/** Best-effort local JSON repair — avoids a second paid Gemini call. */
function repairAndParse(raw: string) {
  try {
    return parseCanonicalJson(raw);
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return parseCanonicalJson(raw.slice(start, end + 1));
    }
    throw new Error("invalid_json");
  }
}

function identityStrong(result: IdentifyResult): boolean {
  const p = result.product;
  return (
    p.confidence >= 0.7 &&
    Boolean(p.brand) &&
    p.brand !== "inconnue" &&
    isStrongModelName(p.model)
  );
}

async function callGemini(
  parts: unknown[],
  withGrounding: boolean
): Promise<{
  text: string;
  grounding?: Array<{ title: string; url?: string }>;
}> {
  const key = geminiKey();
  const model = geminiModel();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

  const body: Record<string, unknown> = {
    contents: [{ role: "user", parts }],
    generationConfig: geminiCheapGenerationConfig(),
    systemInstruction: { parts: [{ text: SYSTEM }] },
  };
  if (withGrounding) {
    body.tools = [{ google_search: {} }];
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    // Older models may reject thinkingConfig — one fallback without it.
    if (res.status === 400 && /thinkingConfig|Unknown name|Invalid JSON/i.test(err)) {
      const fallbackBody = {
        ...body,
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
          maxOutputTokens: Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 256),
        },
      };
      const res2 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fallbackBody),
      });
      if (!res2.ok) {
        const err2 = await res2.text().catch(() => "");
        throw new GeminiHttpError(res2.status, err2.slice(0, 200));
      }
      return parseGeminiResponse(await res2.json());
    }
    throw new GeminiHttpError(res.status, err.slice(0, 200));
  }
  return parseGeminiResponse(await res.json());
}

function parseGeminiResponse(data: {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    groundingMetadata?: {
      groundingChunks?: Array<{ web?: { title?: string; uri?: string } }>;
      webSearchQueries?: string[];
    };
  }>;
}): {
  text: string;
  grounding?: Array<{ title: string; url?: string }>;
} {
  const cand = data.candidates?.[0];
  const text = cand?.content?.parts?.map((p) => p.text || "").join("") || "";
  const grounding =
    cand?.groundingMetadata?.groundingChunks
      ?.map((c) => ({
        title: c.web?.title || "Source",
        url: c.web?.uri,
      }))
      .filter((g) => g.title) || [];
  const queries = cand?.groundingMetadata?.webSearchQueries || [];
  for (const q of queries) {
    grounding.push({ title: `Recherche : ${q}`, url: undefined });
  }
  return { text, grounding };
}

async function partsFor(input: IdentifyInput): Promise<unknown[]> {
  if (input.kind === "text") {
    return [
      {
        text: `Identifie ce produit de luxe à partir de la requête utilisateur: "${input.query}"`,
      },
    ];
  }
  const prepared = await prepareImageForGemini(input.bytes, input.contentType);
  console.log(
    `[gemini] image ${prepared.originalBytes}→${prepared.preparedBytes}B`
  );
  return [
    {
      text: "Identifie l'article de luxe sur cette photo (marque, modèle, variante).",
    },
    {
      inline_data: {
        mime_type: prepared.mimeType,
        data: prepared.bytes.toString("base64"),
      },
    },
  ];
}

async function identifyOnce(
  input: IdentifyInput,
  withGrounding: boolean
): Promise<IdentifyResult> {
  const { text, grounding } = await callGemini(await partsFor(input), withGrounding);
  const parsed = repairAndParse(text);
  const product = toCanonicalProduct(
    parsed,
    withGrounding ? "gemini+grounded" : "gemini",
    withGrounding ? grounding : undefined
  );
  return { product, provider: "gemini", match_links: [] };
}

/** One HTTP attempt; retry only on transient network/5xx (not parse errors). */
async function identifyWithOptionalRetry(
  input: IdentifyInput,
  withGrounding: boolean
): Promise<{ result: IdentifyResult; httpCalls: number }> {
  try {
    const result = await identifyOnce(input, withGrounding);
    return { result, httpCalls: 1 };
  } catch (e1) {
    const transient =
      isNetworkError(e1) ||
      (e1 instanceof GeminiHttpError && isTransientHttp(e1.status));
    if (!transient) throw e1;
    console.warn("[gemini] transient retry", e1 instanceof Error ? e1.message : e1);
    const result = await identifyOnce(input, withGrounding);
    return { result, httpCalls: 2 };
  }
}

export const geminiIdentifyProvider: SearchProvider = {
  id: "gemini",

  async identifyProduct(input: IdentifyInput): Promise<IdentifyResult | null> {
    if (!geminiKey()) return null;
    const t0 = Date.now();
    const mode = groundingMode();
    let httpCalls = 0;
    let groundedCalls = 0;

    try {
      const wantGroundFirst = mode === "always";
      const first = await identifyWithOptionalRetry(input, wantGroundFirst);
      httpCalls += first.httpCalls;
      if (wantGroundFirst) groundedCalls += first.httpCalls;

      let result = first.result;

      // Auto: second call WITH grounding only when identity is weak
      if (mode === "auto" && !wantGroundFirst && !identityStrong(result)) {
        console.log("[gemini] weak identity → one grounded call");
        const second = await identifyWithOptionalRetry(input, true);
        httpCalls += second.httpCalls;
        groundedCalls += second.httpCalls;
        if (
          second.result.product.confidence >= result.product.confidence ||
          identityStrong(second.result)
        ) {
          result = second.result;
        }
      }

      await logExternalCall({
        ts: new Date().toISOString(),
        provider: "gemini",
        action: "identify",
        credits: Math.max(1, httpCalls),
        latency_ms: Date.now() - t0,
        cache: "miss",
        ok: true,
        detail: `grounding=${mode};http=${httpCalls};grounded=${groundedCalls}`,
      });
      return result;
    } catch (e) {
      await logExternalCall({
        ts: new Date().toISOString(),
        provider: "gemini",
        action: "identify",
        credits: Math.max(1, httpCalls || 1),
        latency_ms: Date.now() - t0,
        cache: "miss",
        ok: false,
        detail: e instanceof Error ? e.message : "error",
      });
      return null;
    }
  },
};
