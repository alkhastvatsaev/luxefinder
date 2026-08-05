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
import { analyzeWithGoogleVision, hasGoogleVisionKey } from "./google-vision";

function productLine(rfq: Rfq): string {
  if (rfq.user_edit?.trim()) return rfq.user_edit.trim().slice(0, 180);
  const ai = rfq.ai_description || {};
  const parts = [ai.brand, ai.model, ai.color];
  const line = parts.filter((p) => p && String(p) !== "inconnue").join(" ");
  if (line) return line.slice(0, 180);
  return String(ai.summary || "article demandé").slice(0, 180);
}

/** Primary: Google Vision (Lens-like). Fallback: OpenAI. Else mock. */
export async function analyzeImage(
  bytes: ArrayBuffer,
  contentType: string
): Promise<Record<string, unknown>> {
  if (hasGoogleVisionKey()) {
    try {
      const vision = await analyzeWithGoogleVision(bytes);
      if (vision) return vision;
    } catch (err) {
      console.error("google_vision failed", err);
      // fall through to OpenAI / mock
    }
  }

  const key = (process.env.OPENAI_API_KEY || "").trim();
  if (!key) {
    return {
      brand: "inconnue",
      model: "article luxe",
      category: "sac / accessoire",
      color: "non déterminée",
      material: "non déterminée",
      summary: hasGoogleVisionKey()
        ? "Google Vision a échoué. Décrivez le produit manuellement, ou vérifiez GOOGLE_VISION_API_KEY."
        : "Ajoute GOOGLE_VISION_API_KEY (Google Cloud Vision — proche de Lens) pour une ID précise.",
      confidence: 0.15,
      mock: true,
      provider: "none",
    };
  }

  const b64 = Buffer.from(bytes).toString("base64");
  const mime = contentType.startsWith("image/") ? contentType : "image/jpeg";
  const prompt =
    "Tu analyses une photo produit (mode / luxe). " +
    "Réponds UNIQUEMENT en JSON valide avec les clés: " +
    "brand, model, category, color, material, summary (2-3 phrases FR précises), confidence (0-1). " +
    "Si incertain, brand='inconnue' et explique dans summary.";

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
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: `data:${mime};base64,${b64}` } },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });
    if (!r.ok) throw new Error(`openai ${r.status}`);
    const data = await r.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    return {
      brand: String(parsed.brand || "inconnue"),
      model: String(parsed.model || ""),
      category: String(parsed.category || ""),
      color: String(parsed.color || ""),
      material: String(parsed.material || ""),
      summary: String(parsed.summary || ""),
      confidence: Number(parsed.confidence || 0.5),
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
      summary: `Analyse IA indisponible. Décrivez le produit manuellement. (${err instanceof Error ? err.message : "err"})`,
      confidence: 0,
      mock: true,
      provider: "none",
    };
  }
}


export async function handleAnalyze(file: File) {
  const buf = await file.arrayBuffer();
  if (buf.byteLength < 100) throw new Error("empty image");
  if (buf.byteLength > 12_000_000) throw new Error("image too large (max 12MB)");
  const photoUrl = await uploadPhoto(buf, file.name || "photo.jpg", file.type || "image/jpeg");
  const ai = await analyzeImage(buf, file.type || "image/jpeg");
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
