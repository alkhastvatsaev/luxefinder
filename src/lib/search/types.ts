/**
 * Search domain types — all product search flows go through SearchProvider.
 */

export type CanonicalProduct = {
  brand: string;
  model: string;
  reference?: string;
  variant?: string;
  material?: string;
  year?: string;
  category?: string;
  display_name: string;
  confidence: number;
  provider: string;
  /** Grounding / source chips to show in UI (Google requirement when grounded). */
  grounding_sources?: Array<{ title: string; url?: string }>;
  raw?: Record<string, unknown>;
};

export type OfferKind = "marketplace" | "resale" | "official" | "shopping" | "deeplink" | "other";

export type SearchOffer = {
  title: string;
  link: string;
  source: string;
  price?: string;
  currency?: string;
  thumbnail?: string;
  region?: string;
  country?: string;
  kind: OfferKind;
  condition?: string;
  provider: string;
};

export type IdentifyImageInput = {
  kind: "image";
  bytes: ArrayBuffer;
  contentType: string;
  publicPhotoUrl?: string;
  cacheKey?: string;
};

export type IdentifyTextInput = {
  kind: "text";
  query: string;
};

export type IdentifyInput = IdentifyImageInput | IdentifyTextInput;

export type OfferFilters = {
  budget?: number;
  currency?: string;
  regions?: string[];
};

export type IdentifyResult = {
  product: CanonicalProduct;
  match_links?: SearchOffer[];
  provider: string;
  cached?: boolean;
};

export type FindOffersResult = {
  product: CanonicalProduct;
  offers: SearchOffer[];
  provider: string;
  providers_used: string[];
  cached?: boolean;
  fallback?: boolean;
  by_region?: Record<string, number>;
  markets_ok?: number;
  markets_total?: number;
};

export interface SearchProvider {
  readonly id: string;
  identifyProduct?(input: IdentifyInput): Promise<IdentifyResult | null>;
  findOffers?(
    product: CanonicalProduct,
    filters?: OfferFilters
  ): Promise<FindOffersResult | null>;
}

export type ExternalCallLog = {
  ts: string;
  provider: string;
  action: "identify" | "offers" | "token" | "other";
  credits: number;
  latency_ms: number;
  cache: "hit" | "miss" | "bypass" | "n/a";
  session_id?: string;
  ip?: string;
  ok: boolean;
  detail?: string;
};
