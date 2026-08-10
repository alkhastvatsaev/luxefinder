import {
  HOME_HERO_LOCALES,
  type HomeHeroLocale,
  isHomeHeroLocale,
} from "@/lib/home-hero-copy";

/** ISO 3166-1 alpha-2 country → primary UI locale. */
const COUNTRY_TO_LOCALE: Record<string, HomeHeroLocale> = {
  AD: "es",
  AL: "en",
  AT: "de",
  BA: "hr",
  BE: "nl",
  BG: "bg",
  BY: "en",
  CH: "de",
  CY: "el",
  CZ: "cs",
  DE: "de",
  DK: "da",
  EE: "et",
  ES: "es",
  FI: "fi",
  FR: "fr",
  GB: "en",
  GR: "el",
  HR: "hr",
  HU: "hu",
  IE: "en",
  IS: "is",
  IT: "it",
  LI: "de",
  LT: "lt",
  LU: "fr",
  LV: "lv",
  MC: "fr",
  MD: "ro",
  ME: "hr",
  MK: "en",
  MT: "mt",
  NL: "nl",
  NO: "no",
  PL: "pl",
  PT: "pt",
  RO: "ro",
  RS: "hr",
  SE: "sv",
  SI: "sl",
  SK: "sk",
  SM: "it",
  TR: "tr",
  UA: "pl",
  VA: "it",
  XK: "en",
};

/** Multi-language countries: Accept-Language can override when it matches a supported locale. */
const MULTI_LANG_COUNTRIES = new Set(["BE", "CH", "LU", "IE", "CY"]);

function parseAcceptLanguage(header: string | null): HomeHeroLocale | null {
  if (!header) return null;
  for (const part of header.split(",")) {
    const tag = part.trim().split(";")[0]?.toLowerCase();
    if (!tag) continue;
    const base = tag.split("-")[0];
    if (isHomeHeroLocale(base)) return base;
  }
  return null;
}

function localeFromCountry(country: string | null): HomeHeroLocale | null {
  if (!country) return null;
  return COUNTRY_TO_LOCALE[country.toUpperCase()] ?? null;
}

/**
 * Resolve hero locale from geo country + Accept-Language.
 * IP country wins (except BE/CH/LU/IE/CY). Unknown country → English.
 */
export function resolveLocale(
  country: string | null,
  acceptLanguage: string | null
): HomeHeroLocale {
  const cc = country?.toUpperCase() ?? null;

  if (cc && MULTI_LANG_COUNTRIES.has(cc)) {
    const fromLang = parseAcceptLanguage(acceptLanguage);
    if (fromLang) return fromLang;
  }

  const fromCountry = localeFromCountry(cc);
  if (fromCountry) return fromCountry;

  // Geo detected but unmapped (e.g. US, JP) → international English, not browser French
  if (cc) return "en";

  const fromLang = parseAcceptLanguage(acceptLanguage);
  if (fromLang) return fromLang;

  return "fr";
}

/** Read locale set by middleware, or resolve from raw request headers. */
export function detectLocaleFromHeaders(headers: Headers): HomeHeroLocale {
  const preset = headers.get("x-luxefinder-locale");
  if (preset && isHomeHeroLocale(preset)) return preset;

  const country =
    headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry") ?? null;
  return resolveLocale(country, headers.get("accept-language"));
}

/** Exported for tests — all supported hero locales. */
export const SUPPORTED_HERO_LOCALES = HOME_HERO_LOCALES;
