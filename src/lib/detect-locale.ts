import {
  HOME_HERO_LOCALES,
  type HomeHeroLocale,
  isHomeHeroLocale,
} from "@/lib/home-hero-copy";

/** ISO 3166-1 alpha-2 country → primary UI locale for European visitors. */
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
  UA: "pl",
  VA: "it",
  XK: "en",
};

/** Multi-language countries: prefer Accept-Language when it matches a supported locale. */
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
 * Resolve hero locale from request headers.
 * Priority: Vercel IP country (with Accept-Language tie-break for BE/CH/LU/IE/CY),
 * then Accept-Language, then French default.
 */
export function detectLocaleFromHeaders(headers: Headers): HomeHeroLocale {
  const country =
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry") ??
    null;
  const acceptLang = headers.get("accept-language");

  if (country && MULTI_LANG_COUNTRIES.has(country.toUpperCase())) {
    const fromLang = parseAcceptLanguage(acceptLang);
    if (fromLang) return fromLang;
  }

  const fromCountry = localeFromCountry(country);
  if (fromCountry) return fromCountry;

  const fromLang = parseAcceptLanguage(acceptLang);
  if (fromLang) return fromLang;

  return "fr";
}

/** Exported for tests — all supported hero locales. */
export const SUPPORTED_HERO_LOCALES = HOME_HERO_LOCALES;
