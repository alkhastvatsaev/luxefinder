import {
  createDraft,
  getRfq,
  getRfqByClientToken,
  getRfqBySupplierToken,
  makeSupplierSlots,
  newId,
  saveRfq,
  uploadPhoto,
  type Quote,
  type Rfq,
} from "./store";
import {
  extractVisionSignals,
  extractVisionSignalsFromB64,
  hasGoogleVisionKey,
  mergeVisionSignals,
} from "./google-vision";
import { resolveLuxuryProduct, type VisionSignals } from "./luxury-resolve";
import { fromResolvedOnly, synthesizeLuxuryProduct } from "./synthesize-product";
import { fetchGoogleLensByUrl, hasSerpApiKey } from "./google-lens";
import { getCachedAnalyze, imageHash, setCachedAnalyze } from "./analyze-cache";
import { makeRoiCrops } from "./image-crops";
import { hasProductSearchConfig, searchLuxuryCatalog } from "./product-search";

function productLine(rfq: Rfq): string {
  if (rfq.user_edit?.trim()) return rfq.user_edit.trim().slice(0, 180);
  const ai = rfq.ai_description || {};
  const parts = [ai.brand, ai.model, ai.color];
  const line = parts.filter((p) => p && String(p) !== "inconnue").join(" ");
  if (line) return line.slice(0, 180);
  return String(ai.summary || "article demandé").slice(0, 180);
}

async function openaiVisionFallback(
  bytes: ArrayBuffer,
  contentType: string
): Promise<Record<string, unknown>> {
  const key = (process.env.OPENAI_API_KEY || "").trim();
  if (!key) {
    return {
      brand: "inconnue",
      model: "article luxe",
      category: "sac / accessoire",
      color: "non déterminée",
      material: "non déterminée",
      summary: hasGoogleVisionKey()
        ? "Pipeline Vision a échoué. Décrivez le produit manuellement."
        : "Ajoute GOOGLE_VISION_API_KEY pour une ID précise (proche Lens).",
      confidence: 0.15,
      mock: true,
      provider: "none",
      candidates: [],
    };
  }
  const b64 = Buffer.from(bytes).toString("base64");
  const mime = contentType.startsWith("image/") ? contentType : "image/jpeg";
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text:
                  "Tu analyses une photo produit luxe. JSON: brand, model, category, color, material, summary, confidence, candidates (max 3 {brand,model,score}).",
              },
              { type: "image_url", image_url: { url: `data:${mime};base64,${b64}` } },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });
    if (!r.ok) throw new Error(`openai ${r.status}`);
    const data = await r.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return {
      brand: String(parsed.brand || "inconnue"),
      model: String(parsed.model || ""),
      category: String(parsed.category || ""),
      color: String(parsed.color || ""),
      material: String(parsed.material || ""),
      summary: String(parsed.summary || ""),
      confidence: Number(parsed.confidence || 0.5),
      candidates: Array.isArray(parsed.candidates) ? parsed.candidates.slice(0, 3) : [],
      mock: false,
      provider: "openai",
    };
  } catch (err) {
    return {
      brand: "inconnue",
      model: "",
      category: "",
      color: "",
      material: "",
      summary: `Analyse indisponible (${err instanceof Error ? err.message : "err"})`,
      confidence: 0,
      mock: true,
      provider: "none",
      candidates: [],
    };
  }
}

/** Full luxury pipeline: Vision (+crops) + Lens + Product Search + KB + LLM. */
export async function analyzeImage(
  bytes: ArrayBuffer,
  contentType: string,
  opts?: { publicPhotoUrl?: string }
): Promise<Record<string, unknown>> {
  if (!hasGoogleVisionKey()) {
    return openaiVisionFallback(bytes, contentType);
  }

  try {
    const signalParts: VisionSignals[] = [];

    // Full frame Vision
    const full = await extractVisionSignals(bytes);
    signalParts.push(full);

    // ROI crops (sharp) — parallel secondary Vision
    const crops = await makeRoiCrops(bytes);
    if (crops.length) {
      const cropSignals = await Promise.all(
        crops.slice(0, 2).map(async (c) => {
          try {
            const b64 = Buffer.from(c.bytes).toString("base64");
            return await extractVisionSignalsFromB64(b64);
          } catch {
            return null;
          }
        })
      );
      for (const s of cropSignals) if (s) signalParts.push(s);
    }

    let signals = mergeVisionSignals(signalParts);

    // Google Lens (SerpAPI) via public URL when available
    if (hasSerpApiKey() && opts?.publicPhotoUrl) {
      const lens = await fetchGoogleLensByUrl(opts.publicPhotoUrl, { timeoutMs: 14_000 });
      if (lens.length) {
        signals = {
          ...signals,
          lensProducts: [...(signals.lensProducts || []), ...lens],
        };
      }
    }

    // Own Product Search catalog
    if (hasProductSearchConfig()) {
      const hits = await searchLuxuryCatalog(bytes);
      if (hits.length) {
        signals = {
          ...signals,
          lensProducts: [
            ...(signals.lensProducts || []),
            ...hits.map((h) => ({ title: h.title, score: h.score, source: "product_search" })),
          ],
        };
      }
    }

    const resolved = resolveLuxuryProduct(signals);
    const synth =
      (await synthesizeLuxuryProduct(signals, resolved, {
        imageBytes: bytes,
        contentType,
      })) || fromResolvedOnly(signals, resolved);

    return { ...synth };
  } catch (err) {
    console.error("luxury pipeline failed", err);
    return openaiVisionFallback(bytes, contentType);
  }
}

export async function handleAnalyze(file: File) {
  const buf = await file.arrayBuffer();
  if (buf.byteLength < 100) throw new Error("empty image");
  if (buf.byteLength > 12_000_000) throw new Error("image too large (max 12MB)");

  const hash = imageHash(buf);
  const cached = await getCachedAnalyze(hash);
  if (cached && cached.brand) {
    const photoUrl = await uploadPhoto(buf, file.name || "photo.jpg", file.type || "image/jpeg");
    const row = createDraft(photoUrl, { ...cached, cached: true });
    await saveRfq(row);
    return {
      ok: true,
      request_id: row.id,
      client_token: row.client_token,
      photo_url: row.photo_url,
      ai_description: row.ai_description,
      status: row.status,
      cached: true,
    };
  }

  const photoUrl = await uploadPhoto(buf, file.name || "photo.jpg", file.type || "image/jpeg");
  const ai = await analyzeImage(buf, file.type || "image/jpeg", { publicPhotoUrl: photoUrl });
  await setCachedAnalyze(hash, ai);
  const row = createDraft(photoUrl, ai);
  await saveRfq(row);
  return {
    ok: true,
    request_id: row.id,
    client_token: row.client_token,
    photo_url: row.photo_url,
    ai_description: row.ai_description,
    status: row.status,
  };
}


export async function handleConfirm(body: {
  request_id: number;
  user_edit?: string;
  contact_email?: string;
  contact_telegram?: string;
  start_blast?: boolean;
}) {
  const row = await getRfq(body.request_id);
  if (!row) throw Object.assign(new Error("request not found"), { status: 404 });

  if (body.user_edit != null) row.user_edit = body.user_edit.trim().slice(0, 4000);
  if (body.contact_email) row.contact_email = body.contact_email.trim().slice(0, 255);
  if (body.contact_telegram) {
    row.contact_telegram = body.contact_telegram.trim().replace(/^@/, "").slice(0, 128);
  }

  row.outreaches = makeSupplierSlots(10);
  row.status = "blasted";
  row.blast_error =
    "WhatsApp blast tourne en local (WAREACH). Les liens vendeurs sont prêts — partagez-les ou connectez le worker WA.";
  for (const o of row.outreaches) o.wa_status = "link_ready";
  await saveRfq(row);

  const base = (process.env.LUXMATCH_PUBLIC_URL || "https://luxmatch-six.vercel.app").replace(/\/$/, "");
  return {
    ok: true,
    request_id: row.id,
    client_token: row.client_token,
    status: row.status,
    blast_error: row.blast_error,
    client_url: `${base}/r/${row.client_token}`,
    outreach_queued: row.outreaches.length,
    supplier_urls: row.outreaches.map((o) => `${base}/s/${o.supplier_token}`),
  };
}

export async function clientView(token: string) {
  const req = await getRfqByClientToken(token);
  if (!req) return null;
  const base = (process.env.LUXMATCH_PUBLIC_URL || "https://luxmatch-six.vercel.app").replace(/\/$/, "");
  return {
    id: req.id,
    status: req.status,
    photo_url: req.photo_url,
    ai_description: req.ai_description,
    user_edit: req.user_edit,
    blast_error: req.blast_error,
    selected_quote_id: req.selected_quote_id,
    outreach: req.outreaches.map((o) => ({
      id: o.id,
      wa_status: o.wa_status,
      phone_masked: "***",
      supplier_url: `${base}/s/${o.supplier_token}`,
    })),
    quotes: req.quotes
      .slice()
      .sort((a, b) => a.price - b.price)
      .map((q) => ({
        id: q.id,
        price: q.price,
        currency: q.currency,
        description: q.description,
        shipping: q.shipping,
        payment_methods: q.payment_methods,
        status: q.status,
        created_at: q.created_at,
      })),
    sent_count: req.outreaches.filter((o) => o.wa_status === "sent" || o.wa_status === "link_ready")
      .length,
    quote_count: req.quotes.length,
  };
}

export async function supplierView(token: string) {
  const hit = await getRfqBySupplierToken(token);
  if (!hit) return null;
  const { rfq, outreach } = hit;
  const existing = rfq.quotes.find((q) => q.outreach_id === outreach.id) || null;
  return {
    outreach_id: outreach.id,
    request_id: rfq.id,
    product: productLine(rfq),
    ai_description: rfq.ai_description,
    photo_url: rfq.photo_url,
    already_quoted: Boolean(existing),
    quote: existing
      ? {
          price: existing.price,
          currency: existing.currency,
          description: existing.description,
          shipping: existing.shipping,
          payment_methods: existing.payment_methods,
        }
      : null,
  };
}

export async function submitQuote(
  token: string,
  body: {
    price: number;
    currency?: string;
    description?: string;
    shipping?: string;
    payment_methods?: string[];
  }
) {
  const hit = await getRfqBySupplierToken(token);
  if (!hit) throw Object.assign(new Error("invalid token"), { status: 400 });
  const { rfq, outreach } = hit;
  const existing = rfq.quotes.find((q) => q.outreach_id === outreach.id);
  if (existing) {
    existing.price = Number(body.price);
    existing.currency = (body.currency || "USD").slice(0, 8);
    existing.description = (body.description || "").slice(0, 4000) || null;
    existing.shipping = (body.shipping || "").slice(0, 2000) || null;
    existing.payment_methods = body.payment_methods || [];
  } else {
    const q: Quote = {
      id: newId(),
      outreach_id: outreach.id,
      price: Number(body.price),
      currency: (body.currency || "USD").slice(0, 8),
      description: (body.description || "").slice(0, 4000) || null,
      shipping: (body.shipping || "").slice(0, 2000) || null,
      payment_methods: body.payment_methods || [],
      status: "submitted",
      created_at: new Date().toISOString(),
    };
    rfq.quotes.push(q);
  }
  if (rfq.status === "blasted" || rfq.status === "pending_blast") {
    rfq.status = "quoting";
  }
  await saveRfq(rfq);
  const q = rfq.quotes.find((x) => x.outreach_id === outreach.id)!;
  return { ok: true, quote_id: q.id, price: q.price, currency: q.currency };
}

export async function selectQuote(clientToken: string, quoteId: number) {
  const req = await getRfqByClientToken(clientToken);
  if (!req) throw Object.assign(new Error("invalid client token"), { status: 400 });
  const q = req.quotes.find((x) => x.id === quoteId);
  if (!q) throw Object.assign(new Error("invalid quote"), { status: 400 });
  for (const other of req.quotes) {
    other.status = other.id === quoteId ? "selected" : "rejected";
  }
  req.selected_quote_id = quoteId;
  req.status = "selected";
  await saveRfq(req);
  return { ok: true, status: req.status, selected_quote_id: req.selected_quote_id };
}

export async function addReview(clientToken: string, rating: number, comment?: string) {
  const req = await getRfqByClientToken(clientToken);
  if (!req) throw Object.assign(new Error("invalid client token"), { status: 400 });
  if (!req.selected_quote_id) throw Object.assign(new Error("no selected quote"), { status: 400 });
  req.reviews.push({
    id: newId(),
    quote_id: req.selected_quote_id,
    rating: Math.max(1, Math.min(5, Math.round(rating))),
    comment: (comment || "").slice(0, 2000) || null,
    created_at: new Date().toISOString(),
  });
  req.status = "completed";
  await saveRfq(req);
  const rev = req.reviews[req.reviews.length - 1];
  return { ok: true, review_id: rev.id, rating: rev.rating };
}
