/**
 * Gemini identify with Google Search grounding (default identify path).
 * Free tier: grounded prompts quota on Google AI — see env GEMINI_API_KEY.
 */

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

const SYSTEM = `Tu identifies des articles de luxe (sacs, accessoires).
Réponds UNIQUEMENT avec un JSON valide, sans markdown, schéma:
{"brand":"string","model":"string","reference":"string|null","variant":"string|null","material":"string|null","year":"string|null","category":"string|null","display_name":"string","confidence":0.0}
Sois précis sur marque + modèle. Si incertain, confidence basse.`;

async function callGemini(parts: unknown[]): Promise<{
  text: string;
  grounding?: Array<{ title: string; url?: string }>;
}> {
  const key = geminiKey();
  const model = process.env.GEMINI_IDENTIFY_MODEL || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

  const body = {
    contents: [{ role: "user", parts }],
    tools: [{ google_search: {} }],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
    },
    systemInstruction: { parts: [{ text: SYSTEM }] },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`gemini http ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = (await res.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
      groundingMetadata?: {
        groundingChunks?: Array<{ web?: { title?: string; uri?: string } }>;
        webSearchQueries?: string[];
      };
    }>;
  };
  const cand = data.candidates?.[0];
  const text = cand?.content?.parts?.map((p) => p.text || "").join("") || "";
  const grounding =
    cand?.groundingMetadata?.groundingChunks
      ?.map((c) => ({
        title: c.web?.title || "Source",
        url: c.web?.uri,
      }))
      .filter((g) => g.title) || [];
  // Ensure search suggestions / queries are available for UI compliance
  const queries = cand?.groundingMetadata?.webSearchQueries || [];
  for (const q of queries) {
    grounding.push({ title: `Recherche : ${q}`, url: undefined });
  }
  return { text, grounding };
}

async function identifyOnce(input: IdentifyInput): Promise<IdentifyResult> {
  if (input.kind === "text") {
    const { text, grounding } = await callGemini([
      {
        text: `Identifie ce produit de luxe à partir de la requête utilisateur: "${input.query}"`,
      },
    ]);
    const parsed = parseCanonicalJson(text);
    const product = toCanonicalProduct(parsed, "gemini", grounding);
    return { product, provider: "gemini", match_links: [] };
  }

  const b64 = Buffer.from(input.bytes).toString("base64");
  const mime = input.contentType.startsWith("image/")
    ? input.contentType
    : "image/jpeg";
  const { text, grounding } = await callGemini([
    {
      text: "Identifie l'article de luxe sur cette photo (marque, modèle, variante).",
    },
    { inline_data: { mime_type: mime, data: b64 } },
  ]);
  const parsed = parseCanonicalJson(text);
  const product = toCanonicalProduct(parsed, "gemini", grounding);
  return { product, provider: "gemini", match_links: [] };
}

export const geminiIdentifyProvider: SearchProvider = {
  id: "gemini",

  async identifyProduct(input: IdentifyInput): Promise<IdentifyResult | null> {
    if (!geminiKey()) return null;
    const t0 = Date.now();
    try {
      let result: IdentifyResult;
      try {
        result = await identifyOnce(input);
      } catch (e1) {
        // One retry on invalid JSON / transient failure
        console.warn("[gemini] identify retry", e1);
        result = await identifyOnce(input);
      }
      await logExternalCall({
        ts: new Date().toISOString(),
        provider: "gemini",
        action: "identify",
        credits: 1,
        latency_ms: Date.now() - t0,
        cache: "miss",
        ok: true,
      });
      return result;
    } catch (e) {
      await logExternalCall({
        ts: new Date().toISOString(),
        provider: "gemini",
        action: "identify",
        credits: 1,
        latency_ms: Date.now() - t0,
        cache: "miss",
        ok: false,
        detail: e instanceof Error ? e.message : "error",
      });
      return null;
    }
  },
};
