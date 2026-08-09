import type { ResolvedLuxury, VisionSignals } from "./luxury-resolve";

export type ProductCandidate = {
  brand: string;
  model: string;
  score: number;
  source?: string;
};

export type SynthesizedProduct = {
  brand: string;
  model: string;
  category: string;
  color: string;
  material: string;
  summary: string;
  confidence: number;
  candidates: ProductCandidate[];
  authenticity_uncertain?: boolean;
  provider: string;
  mock: boolean;
  best_guess?: string;
  matching_pages?: string[];
  web_entities?: string[];
};

function openaiKey(): string {
  return (process.env.OPENAI_API_KEY || "").trim();
}

function geminiKey(): string {
  return (process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "").trim();
}

/**
 * LLM synthesizer: turn Vision/Lens/KB signals into precise luxury product JSON.
 * When web page titles are thin, send the image itself (multimodal) for model ID.
 */
export async function synthesizeLuxuryProduct(
  signals: VisionSignals,
  resolved: ResolvedLuxury,
  opts?: {
    imageBytes?: ArrayBuffer;
    contentType?: string;
    /** When false, skip Gemini path (cap/fallback). Default true. */
    allowGemini?: boolean;
  }
): Promise<SynthesizedProduct | null> {
  const pageTitles = signals.pages
    .slice(0, 12)
    .map((p) => `- ${p.title} (${p.url})`)
    .join("\n");
  const lensTitles = (signals.lensProducts || [])
    .slice(0, 8)
    .map((p) => `- ${p.title}`)
    .join("\n");
  const kbCands = resolved.candidates
    .map((c) => `${c.brand} ${c.model} (score ${c.score.toFixed(2)}, ${c.source})`)
    .join("; ");

  const thinWeb = signals.pages.length < 2 && !(signals.lensProducts || []).length;

  const prompt = `Tu es un expert maroquinerie / joaillerie de luxe.
Identifie le produit le plus probable (marque + modèle précis).

SIGNAUX:
- Logos: ${signals.logos.map((l) => l.description).join(", ") || "aucun"}
- Best guess Vision: ${signals.bestGuess || "—"}
- OCR: ${signals.ocr.slice(0, 200) || "—"}
- Web entities: ${signals.webEntities
    .slice(0, 10)
    .map((e) => e.description)
    .join(", ")}
- Candidats KB: ${kbCands || "aucun"}
- Pages matching:
${pageTitles || "aucune (utilise la photo + logo + OCR)"}
- Google Lens products:
${lensTitles || "aucun"}
- Couleur estimée: ${resolved.color}
- Matière estimée: ${resolved.material}
- Images similaires trouvées: ${(signals.similarImageUrls || []).length}

Règles:
- Préfère un modèle précis (Lockme, Lock Go PM, Speedy 30, Classic Flap) plutôt qu'un générique (tote bag, handbag).
- Si logo LV + fermeture twist lock centrale + stamp LOUIS VUITTON PARIS → souvent ligne Lockme / Lock Go.
- Réponds UNIQUEMENT en JSON: brand, model, category, color, material, summary (FR 1-2 phrases), confidence (0-1), candidates (array de 3 max {brand, model, score}).`;

  const oai = openaiKey();
  if (oai) {
    try {
      const userContent: Array<Record<string, unknown>> = [{ type: "text", text: prompt }];
      if (thinWeb && opts?.imageBytes) {
        const mime = opts.contentType?.startsWith("image/") ? opts.contentType : "image/jpeg";
        const b64 = Buffer.from(opts.imageBytes).toString("base64");
        userContent.push({
          type: "image_url",
          image_url: { url: `data:${mime};base64,${b64}` },
        });
      }
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${oai}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: thinWeb && opts?.imageBytes ? "gpt-4o" : "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: "Expert identification produits de luxe. JSON only." },
            { role: "user", content: userContent },
          ],
          max_tokens: 600,
          temperature: 0.2,
        }),
      });
      if (r.ok) {
        const data = await r.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return normalizeSynth(parsed, signals, resolved, thinWeb ? "vision+kb+openai-vision" : "vision+kb+openai");
      }
    } catch (e) {
      console.error("openai synthesize failed", e);
    }
  }

  const allowGemini = opts?.allowGemini !== false;
  const gk = allowGemini ? geminiKey() : "";
  if (gk) {
    const t0 = Date.now();
    try {
      const parts: Array<Record<string, unknown>> = [{ text: prompt }];
      if (thinWeb && opts?.imageBytes) {
        parts.push({
          inline_data: {
            mime_type: opts.contentType?.startsWith("image/") ? opts.contentType : "image/jpeg",
            data: Buffer.from(opts.imageBytes).toString("base64"),
          },
        });
      }
      const model = process.env.GEMINI_IDENTIFY_MODEL || "gemini-2.5-flash";
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(gk)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
          }),
        }
      );
      if (r.ok) {
        const data = await r.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          const { logExternalCall } = await import("./search/telemetry");
          await logExternalCall({
            ts: new Date().toISOString(),
            provider: "gemini",
            action: "identify",
            credits: 1,
            latency_ms: Date.now() - t0,
            cache: "miss",
            ok: true,
            detail: "synthesize",
          });
          return normalizeSynth(
            parsed,
            signals,
            resolved,
            thinWeb ? "vision+kb+gemini-vision" : "vision+kb+gemini"
          );
        }
      }
      const { logExternalCall } = await import("./search/telemetry");
      await logExternalCall({
        ts: new Date().toISOString(),
        provider: "gemini",
        action: "identify",
        credits: 1,
        latency_ms: Date.now() - t0,
        cache: "miss",
        ok: false,
        detail: `synthesize http ${r.status}`,
      });
    } catch (e) {
      console.error("gemini synthesize failed", e);
      try {
        const { logExternalCall } = await import("./search/telemetry");
        await logExternalCall({
          ts: new Date().toISOString(),
          provider: "gemini",
          action: "identify",
          credits: 1,
          latency_ms: Date.now() - t0,
          cache: "miss",
          ok: false,
          detail: e instanceof Error ? e.message : "synthesize error",
        });
      } catch {
        /* ignore */
      }
    }
  }

  return null;
}

function normalizeSynth(
  parsed: Record<string, unknown>,
  signals: VisionSignals,
  resolved: ResolvedLuxury,
  provider: string
): SynthesizedProduct {
  const candidatesRaw = Array.isArray(parsed.candidates) ? parsed.candidates : resolved.candidates;
  const candidates: ProductCandidate[] = candidatesRaw.slice(0, 3).map((c: unknown, i: number) => {
    const x = c as Record<string, unknown>;
    return {
      brand: String(x.brand || resolved.brand || "inconnue"),
      model: String(x.model || ""),
      score: Number(x.score ?? 0.8 - i * 0.1),
      source: String(x.source || "llm"),
    };
  });
  if (candidates.length === 0 && resolved.candidates.length) {
    candidates.push(...resolved.candidates.slice(0, 3));
  }

  let model = String(parsed.model || resolved.model || "");
  if (/^(tote|bag|handbag|purse|sac)(\s+bag)?$/i.test(model.trim())) {
    model = candidates.find((c) => !/^(tote|bag)/i.test(c.model))?.model || resolved.model || model;
  }

  return {
    brand: String(parsed.brand || resolved.brand || "inconnue"),
    model,
    category: String(parsed.category || resolved.category),
    color: String(parsed.color || resolved.color),
    material: String(parsed.material || resolved.material),
    summary: String(
      parsed.summary ||
        `${parsed.brand || resolved.brand} ${model}`.trim() ||
        "Produit luxe détecté — vérifiez le modèle."
    ),
    confidence: Number(parsed.confidence ?? resolved.confidence),
    candidates,
    authenticity_uncertain: resolved.authenticity_uncertain,
    provider,
    mock: false,
    best_guess: signals.bestGuess || undefined,
    matching_pages: signals.pages.slice(0, 5).map((p) => p.title || p.url).filter(Boolean),
    web_entities: signals.webEntities.slice(0, 8).map((e) => e.description),
  };
}

/** Build product from resolve only (no LLM). */
export function fromResolvedOnly(
  signals: VisionSignals,
  resolved: ResolvedLuxury
): SynthesizedProduct {
  const label = [resolved.brand !== "inconnue" ? resolved.brand : null, resolved.model || null]
    .filter(Boolean)
    .join(" ");
  return {
    brand: resolved.brand,
    model: resolved.model,
    category: resolved.category,
    color: resolved.color,
    material: resolved.material,
    summary: resolved.authenticity_uncertain
      ? `${label || "Article"} — beaucoup de pages réplique détectées, vérifiez l'authenticité.`
      : label
        ? `Identifié : ${label}${resolved.color !== "non déterminée" ? `, ${resolved.color}` : ""}${
            resolved.material !== "non déterminée" ? `, ${resolved.material}` : ""
          }.`
        : `Signaux Vision : « ${signals.bestGuess || "indetermine"} ». Précisez le modèle.`,
    confidence: resolved.confidence,
    candidates: resolved.candidates,
    authenticity_uncertain: resolved.authenticity_uncertain,
    provider: "vision+kb",
    mock: false,
    best_guess: signals.bestGuess || undefined,
    matching_pages: signals.pages.slice(0, 5).map((p) => p.title || p.url).filter(Boolean),
    web_entities: signals.webEntities.slice(0, 8).map((e) => e.description),
  };
}
