import { put, get, list } from "@vercel/blob";

/**
 * Le store Vercel Blob du projet est aujourd’hui **public**
 * (`*.public.blob.vercel-storage.com`). `access: "private"` y échoue avec :
 * "Cannot use private access on a public store".
 *
 * Pour activer le mode privé (ADR-0001) : créer un store Blob privé dans Vercel
 * et définir `BLOB_ACCESS_MODE=private` (+ token du store privé).
 */
type BlobAccess = "public" | "private";
function blobAccess(): BlobAccess {
  return process.env.BLOB_ACCESS_MODE === "private" ? "private" : "public";
}

export type Outreach = {
  id: number;
  phone: string;
  supplier_token: string;
  wa_status: string;
  wa_error?: string | null;
};

export type Quote = {
  id: number;
  outreach_id: number;
  price: number;
  currency: string;
  description?: string | null;
  shipping?: string | null;
  payment_methods: string[];
  status: string;
  created_at: string;
};

export type Review = {
  id: number;
  quote_id: number;
  rating: number;
  comment?: string | null;
  created_at: string;
};

export type Rfq = {
  id: number;
  client_token: string;
  photo_url: string;
  ai_description: Record<string, unknown>;
  user_edit?: string | null;
  client_budget?: number | null;
  client_budget_currency?: string | null;
  contact_email?: string | null;
  contact_telegram?: string | null;
  status: string;
  blast_error?: string | null;
  selected_quote_id?: number | null;
  outreaches: Outreach[];
  quotes: Quote[];
  reviews: Review[];
  created_at: string;
  updated_at: string;
};

function token(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(21));
  return Buffer.from(bytes).toString("base64url");
}

/**
 * Identifiant non devinable (52 bits d'entropie, sous Number.MAX_SAFE_INTEGER).
 * L'ancienne version (`Date.now() * 1000 + Math.random() * 1000`) ne laissait que
 * 1000 candidats par milliseconde et rendait les enregistrements énumérables.
 */
function newId(): number {
  const parts = crypto.getRandomValues(new Uint32Array(2));
  return parts[0] * 0x100000 + (parts[1] >>> 12);
}

async function putJson(pathname: string, data: unknown) {
  await put(pathname, JSON.stringify(data), {
    access: blobAccess(),
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function getJson<T>(pathname: string): Promise<T | null> {
  try {
    if (blobAccess() === "private") {
      const res = await get(pathname, { access: "private", useCache: false });
      if (!res || res.statusCode !== 200) return null;
      return (await new Response(res.stream).json()) as T;
    }
    // Store public : lecture via URL listée (pas d’API get privée).
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    const hit = blobs.find((b) => b.pathname === pathname);
    if (!hit) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function saveRfq(rfq: Rfq): Promise<void> {
  rfq.updated_at = new Date().toISOString();
  await putJson(`rfq/${rfq.id}.json`, rfq);
  await putJson(`idx/client/${rfq.client_token}.json`, { id: rfq.id });
  for (const o of rfq.outreaches) {
    await putJson(`idx/supplier/${o.supplier_token}.json`, {
      id: rfq.id,
      outreach_id: o.id,
    });
  }
}

export async function getRfq(id: number): Promise<Rfq | null> {
  return getJson<Rfq>(`rfq/${id}.json`);
}

export async function getRfqByClientToken(clientToken: string): Promise<Rfq | null> {
  const idx = await getJson<{ id: number }>(`idx/client/${clientToken}.json`);
  if (!idx?.id) return null;
  return getRfq(idx.id);
}

export async function getRfqBySupplierToken(
  supplierToken: string
): Promise<{ rfq: Rfq; outreach: Outreach } | null> {
  const idx = await getJson<{ id: number; outreach_id: number }>(
    `idx/supplier/${supplierToken}.json`
  );
  if (!idx?.id) return null;
  const rfq = await getRfq(idx.id);
  if (!rfq) return null;
  const outreach = rfq.outreaches.find((o) => o.id === idx.outreach_id);
  if (!outreach) return null;
  return { rfq, outreach };
}

export async function uploadPhoto(
  data: ArrayBuffer,
  filename: string,
  contentType: string
): Promise<string> {
  const ext = (filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const name = `photos/${crypto.randomUUID()}.${ext}`;
  const blob = await put(name, data, {
    access: "public",
    contentType: contentType || "image/jpeg",
    addRandomSuffix: false,
  });
  return blob.url;
}

export function createDraft(photoUrl: string, ai: Record<string, unknown>): Rfq {
  const now = new Date().toISOString();
  return {
    id: newId(),
    client_token: token(),
    photo_url: photoUrl,
    ai_description: ai,
    status: "draft",
    outreaches: [],
    quotes: [],
    reviews: [],
    created_at: now,
    updated_at: now,
  };
}

export function makeSupplierSlots(count = 10): Outreach[] {
  return Array.from({ length: count }, (_, i) => ({
    id: newId(),
    phone: `pending-${i + 1}`,
    supplier_token: token(),
    wa_status: "queued",
  }));
}

export { token, newId };
