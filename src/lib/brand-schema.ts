const SITE = "https://luxefinder.app";

/** Sitewide Organization + WebSite JSON-LD (@id stable for all pages). */
export const BRAND_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "LuxeFinder",
      alternateName: ["Luxe Finder", "luxefinder", "LuxeFinder.app", "luxe finder"],
      url: SITE,
      logo: `${SITE}/brand/logo.svg`,
      description:
        "LuxeFinder (Luxe Finder) — app photo + budget pour trouver des vendeurs de sacs et accessoires de luxe sur luxefinder.app.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+33-745-999-118",
        url: "https://wa.me/33745999118",
        availableLanguage: ["French", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "LuxeFinder",
      alternateName: ["Luxe Finder", "luxefinder", "luxe finder"],
      url: SITE,
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: ["fr-FR", "en", "de", "es", "it", "nl", "pt"],
    },
  ],
};

/** Home-only WebApplication entity (references sitewide Organization). */
export const HOME_APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LuxeFinder",
  alternateName: ["Luxe Finder", "luxefinder", "luxe finder"],
  url: SITE,
  applicationCategory: "ShoppingApplication",
  operatingSystem: "Web",
  inLanguage: ["fr-FR", "en"],
  description: "Photo d’un sac ou accessoire de luxe + budget → offres et vendeurs.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  publisher: { "@id": `${SITE}/#organization` },
};
