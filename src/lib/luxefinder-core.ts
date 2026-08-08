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
import { fetchGoogleLensByUrl, hasSerpApiKey, rankMatchLinks, bestLensTitle, parseTitleBrandModel } from "./google-lens";
import { fetchGoogleShoppingProducts, fetchProductThumbnail } from "./google-text-search";
import { searchGlobalOffers } from "./global-offers";
import { significantQueryTokens, normalizeText, isStrongModelName, findKnownModelInTitle } from "./luxury-kb";
import {
  suggestAllModels,
  upsertCatalogProduct,
  matchCatalogProduct,
} from "./product-catalog";
import { getCachedAnalyzeSmart, setCachedAnalyzeSmart, contentFingerprint, getCachedLens, setCachedLens } from "./analyze-cache";
import { makeRoiCrops } from "./image-crops";
import { hasProductSearchConfig, searchLuxuryCatalog } from "./product-search";

function productLine(rfq: Rfq): string {
  const id = resolveOfferIdentity(rfq);
  return id.query;
}

/** Strict brand + model for offer search — never glue color placeholders. */
function resolveOfferIdentity(rfq: Rfq): {
  query: string;
  brand?: string;
  model?: string;
} {
  const ai = (rfq.ai_description || {}) as Record<string, unknown>;
  const userEdit = String(rfq.user_edit || "").trim();
  const productName = String(
    ai.product_name || ai.lens_title || ai.best_guess || ai.summary || ""
  ).trim();
  const source = userEdit || productName;

  let brand = String(ai.brand || "").trim();
  let model = String(ai.model || "").trim();
  if (/^inconnue$/i.test(brand)) brand = "";
  if (!isStrongModelName(model)) model = "";

  if (source) {
    const known = findKnownModelInTitle(source);
    if (known) {
      brand = known.brand;
      model = known.model;
    } else {
      const parsed = parseTitleBrandModel(source);
      if (parsed.brand) brand = parsed.brand;
      if (isStrongModelName(parsed.model)) model = String(parsed.model);
    }
  }

  if (brand && isStrongModelName(model)) {
    return { query: `${brand} ${model}`.slice(0, 160), brand, model };
  }
  if (source) return { query: source.slice(0, 160), brand: brand || undefined, model: model || undefined };
  return { query: "article demandé", brand: brand || undefined, model: model || undefined };
}

/** Persist a confident identity into the living catalogue (fire-and-forget safe). */
async function rememberProduct(ai: Record<string, unknown>, thumbnail?: string) {
  const brand = String(ai.brand || "").trim();
  const model = String(ai.model || "").trim();
  const confidence = Number(ai.confidence || 0);
  if (confidence > 0 && confidence < 0.65) return;
  if (!isStrongModelName(model)) return;
  await upsertCatalogProduct({
    brand,
    model,
    aliases: [
      typeof ai.lens_title === "string" ? ai.lens_title : null,
      typeof ai.product_name === "string" ? ai.product_name : null,
      typeof ai.best_guess === "string" ? ai.best_guess : null,
    ],
    thumbnail:
      thumbnail ||
      (typeof ai.product_image === "string" ? ai.product_image : undefined),
  });
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

/** Full luxury pipeline: Lens (primary links) + Vision + KB + LLM. */
export async function analyzeImage(
  bytes: ArrayBuffer,
  contentType: string,
  opts?: { publicPhotoUrl?: string; cacheKey?: string }
): Promise<Record<string, unknown>> {
  // Lens-first when we have a public URL + SerpAPI (exact model + shopping links)
  let lensProducts: Awaited<ReturnType<typeof fetchGoogleLensByUrl>> = [];
  if (hasSerpApiKey() && opts?.publicPhotoUrl) {
    const lensKey = opts.cacheKey || (await contentFingerprint(bytes));
    const cachedLens = await getCachedLens(lensKey);
    if (cachedLens?.length) {
      lensProducts = cachedLens as Awaited<ReturnType<typeof fetchGoogleLensByUrl>>;
      console.log("[analyze] Lens cache HIT", lensKey.slice(0, 12));
    } else {
      lensProducts = await fetchGoogleLensByUrl(opts.publicPhotoUrl, { timeoutMs: 20_000 });
      if (lensProducts.length) {
        await setCachedLens(lensKey, lensProducts);
        console.log("[analyze] Lens cache MISS → stored", lensKey.slice(0, 12));
      }
    }
  }
  const match_links = rankMatchLinks(lensProducts, 10);
  const lensTitle = bestLensTitle(lensProducts);
  const parsedLens = parseTitleBrandModel(lensTitle);

  if (!hasGoogleVisionKey() && !lensProducts.length) {
    return openaiVisionFallback(bytes, contentType);
  }

  try {
    const signalParts: VisionSignals[] = [];

    if (hasGoogleVisionKey()) {
      const full = await extractVisionSignals(bytes);
      signalParts.push(full);

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
    }

    let signals: VisionSignals =
      signalParts.length > 0
        ? mergeVisionSignals(signalParts)
        : {
            logos: [],
            labels: [],
            ocr: "",
            bestGuess: "",
            webEntities: [],
            pages: [],
          };

    if (lensProducts.length) {
      signals = {
        ...signals,
        lensProducts: [...(signals.lensProducts || []), ...lensProducts],
        pages: [
          ...signals.pages,
          ...match_links.map((m) => ({
            url: m.link,
            title: m.title,
            score: m.kind === "official" ? 0.95 : m.kind === "resale" ? 0.8 : 0.6,
          })),
        ],
      };
    }

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
    // Prefer Lens title for exact model when available
    if (parsedLens.brand && resolved.brand === "inconnue") resolved.brand = parsedLens.brand;
    if (parsedLens.model && (!resolved.model || /^(tote|bag|handbag)/i.test(resolved.model))) {
      resolved.model = parsedLens.model;
      resolved.candidates = [
        {
          brand: parsedLens.brand || resolved.brand,
          model: parsedLens.model,
          score: 0.92,
          source: "google_lens",
        },
        ...resolved.candidates.filter((c) => c.model !== parsedLens.model).slice(0, 2),
      ];
      resolved.confidence = Math.max(resolved.confidence, 0.9);
    }

    const synth =
      (await synthesizeLuxuryProduct(signals, resolved, {
        imageBytes: bytes,
        contentType,
      })) || fromResolvedOnly(signals, resolved);

    // Final override: Lens title wins for display model if stronger
    if (lensTitle && (!synth.model || /^(tote|bag|handbag|sac)/i.test(synth.model))) {
      const p = parseTitleBrandModel(lensTitle);
      if (p.brand) synth.brand = p.brand;
      if (p.model) synth.model = p.model;
      synth.summary = `Identifié via Google Lens : ${lensTitle}`;
      synth.provider = `${synth.provider}+lens`;
      synth.confidence = Math.max(synth.confidence, 0.92);
    }

    return {
      ...synth,
      product_name: [synth.brand, synth.model].filter(Boolean).join(" ").trim() || lensTitle,
      match_links,
      lens_title: lensTitle || undefined,
      provider: lensProducts.length ? `lens+${synth.provider}` : synth.provider,
    };
  } catch (err) {
    console.error("luxury pipeline failed", err);
    if (lensProducts.length) {
      const p = parseTitleBrandModel(lensTitle);
      return {
        brand: p.brand || "inconnue",
        model: p.model || lensTitle,
        category: "sac / accessoire",
        color: "non déterminée",
        material: "non déterminée",
        summary: `Identifié via Google Lens : ${lensTitle}`,
        confidence: 0.9,
        mock: false,
        provider: "google_lens",
        product_name: lensTitle,
        match_links,
        candidates: [
          { brand: p.brand || "inconnue", model: p.model || lensTitle, score: 0.9, source: "google_lens" },
        ],
      };
    }
    return openaiVisionFallback(bytes, contentType);
  }
}

export async function handleAnalyze(file: File) {
  const buf = await file.arrayBuffer();
  if (buf.byteLength < 100) throw new Error("empty image");
  if (buf.byteLength > 12_000_000) throw new Error("image too large (max 12MB)");

  const hit = await getCachedAnalyzeSmart(buf);
  const cached = hit?.result;
  const cacheOk =
    cached &&
    cached.brand &&
    (!hasSerpApiKey() || (Array.isArray(cached.match_links) && (cached.match_links as unknown[]).length > 0));
  if (cacheOk && cached) {
    console.log("[analyze] full cache HIT via", hit!.via);
    const photoUrl = await uploadPhoto(buf, file.name || "photo.jpg", file.type || "image/jpeg");
    const row = createDraft(photoUrl, { ...cached, cached: true, cache_via: hit!.via });
    await saveRfq(row);
    void rememberProduct(cached as Record<string, unknown>, photoUrl).catch(() => {});
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
  const fp = await contentFingerprint(buf);
  const ai = await analyzeImage(buf, file.type || "image/jpeg", {
    publicPhotoUrl: photoUrl,
    cacheKey: fp,
  });
  await setCachedAnalyzeSmart(buf, ai);
  console.log("[analyze] full cache MISS → stored");
  const row = createDraft(photoUrl, ai);
  await saveRfq(row);
  void rememberProduct(ai, photoUrl).catch(() => {});
  return {
    ok: true,
    request_id: row.id,
    client_token: row.client_token,
    photo_url: row.photo_url,
    ai_description: row.ai_description,
    status: row.status,
  };
}

/** Typeahead: seed KB + living catalogue (no Google on every keystroke). */
export async function handleSuggest(query: string) {
  const q = String(query || "").trim().slice(0, 120);
  if (q.length < 2) return { ok: true, query: q, suggestions: [] as Array<Record<string, unknown>> };

  const hits = await suggestAllModels(q, 8);
  return {
    ok: true,
    query: q,
    suggestions: hits.map((s) => ({
      label: s.label,
      brand: s.brand,
      model: s.model,
      source: "catalog",
    })),
  };
}

/**
 * Text path: catalogue hit when possible, otherwise live Shopping resolve.
 * Any successful identity is written into the living catalogue.
 */
export async function handleTextSearch(query: string) {
  const q = String(query || "").trim().slice(0, 200);
  if (q.length < 2) {
    throw Object.assign(new Error("Requête trop courte"), { status: 400 });
  }

  const suggestions = await suggestAllModels(q, 8);
  const top = suggestions[0];
  const catalogHit = top && top.score >= 40 ? top : null;
  const livingHit = catalogHit ? null : await matchCatalogProduct(q);

  let brand = "";
  let model = "";
  let title = "";
  let confidence = 0.75;
  let provider = "shopping_live";
  let category = "sac";
  let candidates: Array<{ brand: string; model: string; score: number; source: string }> = [];

  if (catalogHit) {
    brand = catalogHit.brand;
    model = catalogHit.model;
    title = `${brand} ${model}`;
    confidence = 0.92;
    provider = "catalog";
    category = catalogHit.category || "sac";
    candidates = suggestions.slice(0, 5).map((s, i) => ({
      brand: s.brand,
      model: s.model,
      score: Math.max(0.4, 1 - i * 0.08),
      source: "catalog",
    }));
  } else if (livingHit) {
    brand = livingHit.brand;
    model = livingHit.model;
    title = `${brand} ${model}`;
    confidence = 0.9;
    provider = "living_catalog";
    candidates = [{ brand, model, score: 0.9, source: "living_catalog" }];
  } else {
    if (!hasSerpApiKey()) {
      throw Object.assign(
        new Error("Indiquez une marque et un modèle (ex. Gucci Ophidia)"),
        { status: 400 }
      );
    }
    const live = await fetchGoogleShoppingProducts(q, 12);
    if (!live.length) {
      throw Object.assign(
        new Error("Aucun modèle trouvé — essayez « Marque + modèle » (ex. Gucci Ophidia)"),
        { status: 404 }
      );
    }
    const best = live[0];
    const parsed = parseTitleBrandModel(best.title);
    brand = (parsed.brand || "").trim();
    model = (parsed.model || best.title).trim();
    title = brand ? `${brand} ${model}` : best.title.slice(0, 160);
    confidence = brand ? 0.8 : 0.68;
    provider = "shopping_live";
    candidates = live.slice(0, 5).map((p, i) => {
      const pr = parseTitleBrandModel(p.title);
      return {
        brand: pr.brand || brand || "inconnue",
        model: pr.model || p.title.slice(0, 80),
        score: Math.max(0.35, 0.85 - i * 0.08),
        source: "shopping",
      };
    });

    // Soft check: at least one significant query token in the winning title
    const tokens = significantQueryTokens(q);
    const titleN = normalizeText(best.title);
    if (tokens.length >= 1 && !tokens.some((t) => titleN.includes(t))) {
      throw Object.assign(
        new Error("Résultat trop éloigné — précisez la marque et le modèle"),
        { status: 404 }
      );
    }
  }

  const searchTitle = brand ? `${brand} ${model}` : title;
  const products = hasSerpApiKey() ? await fetchGoogleShoppingProducts(searchTitle, 8) : [];
  let thumbnail = products.find((p) => p.thumbnail)?.thumbnail || "";
  if (!thumbnail && hasSerpApiKey()) {
    thumbnail = await fetchProductThumbnail(searchTitle);
  }
  const match_links = products.map(({ thumbnail: _t, ...rest }) => rest);

  const ai: Record<string, unknown> = {
    brand: brand || "inconnue",
    model,
    product_name: title,
    lens_title: title,
    best_guess: title,
    summary: title,
    confidence,
    provider,
    category,
    candidates,
    match_links,
    product_image: thumbnail || undefined,
  };

  const row = createDraft(thumbnail, ai);
  await saveRfq(row);
  void rememberProduct(ai, thumbnail).catch(() => {});

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
  client_budget?: number;
  client_budget_currency?: string;
  contact_email?: string;
  contact_telegram?: string;
  start_blast?: boolean;
}) {
  const row = await getRfq(body.request_id);
  if (!row) throw Object.assign(new Error("request not found"), { status: 404 });

  if (body.user_edit != null) row.user_edit = body.user_edit.trim().slice(0, 4000);
  if (body.client_budget != null && !Number.isNaN(body.client_budget)) {
    row.client_budget = Math.max(0, Number(body.client_budget));
  }
  if (body.client_budget_currency) {
    row.client_budget_currency = body.client_budget_currency.trim().slice(0, 8).toUpperCase();
  }
  if (body.contact_email) row.contact_email = body.contact_email.trim().slice(0, 255);
  if (body.contact_telegram) {
    row.contact_telegram = body.contact_telegram.trim().replace(/^@/, "").slice(0, 128);
  }

  const base = (
    process.env.LUXEFINDER_PUBLIC_URL ||
    "https://luxefinder.app"
  ).replace(/\/$/, "");

  if (body.start_blast) {
    row.outreaches = makeSupplierSlots(10);
    row.status = "blasted";
    row.blast_error =
      "WhatsApp blast tourne en local (WAREACH). Les liens vendeurs sont prêts — partagez-les ou connectez le worker WA.";
    for (const o of row.outreaches) o.wa_status = "link_ready";
  } else {
    row.status = "confirmed";
    row.blast_error = null;
  }

  await saveRfq(row);

  return {
    ok: true,
    request_id: row.id,
    client_token: row.client_token,
    status: row.status,
    blast_error: row.blast_error,
    client_url: `${base}/offres/${row.client_token}`,
    outreach_queued: row.outreaches.length,
    supplier_urls: row.outreaches.map((o) => `${base}/s/${o.supplier_token}`),
  };
}

/** Deep web seller search for a client RFQ (part 2 — choix 1). */
export async function handleWebOffers(clientToken: string) {
  const req = await getRfqByClientToken(clientToken);
  if (!req) throw Object.assign(new Error("request not found"), { status: 404 });

  const id = resolveOfferIdentity(req);
  const result = await searchGlobalOffers(id.query, {
    perMarket: 12,
    maxOffers: 60,
    brand: id.brand,
    model: id.model,
  });

  return {
    ok: true,
    request_id: req.id,
    client_token: req.client_token,
    product: id.query,
    photo_url: req.photo_url,
    client_budget: req.client_budget,
    client_budget_currency: req.client_budget_currency,
    ...result,
  };
}

export async function clientView(token: string) {
  const req = await getRfqByClientToken(token);
  if (!req) return null;
  const base = (
    process.env.LUXEFINDER_PUBLIC_URL ||
    "https://luxefinder.app"
  ).replace(/\/$/, "");
  return {
    id: req.id,
    status: req.status,
    photo_url: req.photo_url,
    ai_description: req.ai_description,
    user_edit: req.user_edit,
    client_budget: req.client_budget,
    client_budget_currency: req.client_budget_currency,
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
    client_budget: rfq.client_budget,
    client_budget_currency: rfq.client_budget_currency,
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
