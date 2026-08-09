/**
 * LuxeFinder client → same-origin `/api/luxefinder/*`
 */

const API = "/api/luxefinder";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, { ...init, cache: "no-store" });
  if (!res.ok) {
    let detail = `${res.status}`;
    try {
      const j = await res.json();
      detail = j?.detail || j?.error || detail;
    } catch {
      /* ignore */
    }
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
  return res.json() as Promise<T>;
}

export type ProductCandidate = {
  brand: string;
  model: string;
  score: number;
  source?: string;
};

export type MatchLink = {
  title: string;
  link: string;
  source: string;
  kind: "official" | "resale" | "shopping" | "other";
  rank: number;
  price?: string;
};

export type AiDescription = {
  brand?: string;
  model?: string;
  category?: string;
  color?: string;
  material?: string;
  summary?: string;
  confidence?: number;
  mock?: boolean;
  provider?: string;
  best_guess?: string;
  candidates?: ProductCandidate[];
  authenticity_uncertain?: boolean;
  matching_pages?: string[];
  product_name?: string;
  match_links?: MatchLink[];
  lens_title?: string;
  grounding_sources?: Array<{ title: string; url?: string }>;
  product_image?: string;
};

export const luxefinderApi = {
  analyze: async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API}/analyze`, { method: "POST", body: fd, cache: "no-store" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({} as Record<string, unknown>));
      const msg =
        (typeof j?.detail === "string" && j.detail) ||
        (typeof j?.error === "string" && j.error) ||
        (res.status === 502 ? "Backend indisponible" : `Erreur ${res.status}`);
      throw new Error(msg);
    }
    return res.json() as Promise<{
      ok: boolean;
      request_id: number;
      client_token: string;
      photo_url: string;
      ai_description: AiDescription;
    }>;
  },
  suggest: (q: string) =>
    api<{
      ok: boolean;
      query: string;
      suggestions: Array<{
        label: string;
        brand?: string;
        model?: string;
        source: string;
      }>;
    }>(`/suggest?q=${encodeURIComponent(q)}`),
  search: (query: string) =>
    api<{
      ok: boolean;
      request_id: number;
      client_token: string;
      photo_url: string;
      ai_description: AiDescription;
    }>("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    }),
  confirm: (body: {
    request_id: number;
    user_edit?: string;
    client_budget?: number;
    client_budget_currency?: string;
    contact_email?: string;
    contact_telegram?: string;
    start_blast?: boolean;
  }) =>
    api<{
      ok: boolean;
      client_token: string;
      client_url: string;
      status: string;
      blast_error?: string | null;
      outreach_queued: number;
    }>("/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start_blast: false, ...body }),
    }),
  webOffers: (token: string) =>
    api<{
      ok: boolean;
      request_id: number;
      client_token: string;
      product: string;
      photo_url: string;
      client_budget?: number | null;
      client_budget_currency?: string | null;
      query: string;
      offers: Array<{
        title: string;
        link: string;
        source: string;
        price?: string;
        thumbnail?: string;
        region: "usa" | "europe" | "asia" | "africa";
        country: string;
        kind: "official" | "resale" | "shopping" | "deeplink" | "marketplace" | "other";
        provider?: string;
      }>;
      by_region: Record<"usa" | "europe" | "asia" | "africa", number>;
      markets_ok: number;
      markets_total: number;
      cached?: boolean;
      fallback?: boolean;
      provider?: string;
      providers_used?: string[];
    }>(`/r/${token}/offers`, { method: "POST" }),
  client: (token: string) => api<Record<string, unknown>>(`/r/${token}`),
  supplier: (token: string) => api<Record<string, unknown>>(`/s/${token}`),
  quote: (
    token: string,
    body: {
      price: number;
      currency?: string;
      description?: string;
      shipping?: string;
      payment_methods?: string[];
    }
  ) =>
    api(`/s/${token}/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  select: (token: string, quote_id: number) =>
    api(`/r/${token}/select`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote_id }),
    }),
  review: (token: string, rating: number, comment?: string) =>
    api(`/r/${token}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    }),
  photoUrl: (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/api/luxefinder")) return path;
    return `${API}${path.replace(/^\/api\/luxefinder/, "")}`;
  },
};
