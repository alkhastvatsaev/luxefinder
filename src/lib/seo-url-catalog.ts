/** Collect all public SEO URLs for sitemap / IndexNow / GSC export. */

import { ARTICLE_CATALOG } from "@/lib/article-catalog";
import { SEO_EU_LOCALES } from "@/lib/seo-eu-batch";
import { SEO_PAGES, pagesByIntent } from "@/lib/seo-pages";
import { SAC_MODEL_PAGES } from "@/lib/seo-models";

export const SITE = "https://luxefinder.app";

const STATIC = [
  "/",
  "/guide",
  "/articles",
  "/marques",
  "/comment-ca-marche",
  "/faq",
  "/mentions-legales",
  "/confidentialite",
] as const;

export function allSeoPaths(): string[] {
  const paths = new Set<string>(STATIC);

  for (const l of SEO_EU_LOCALES) {
    paths.add(`/guide/eu/${l.code}`);
  }
  for (const p of SEO_PAGES) {
    paths.add(`/guide/${p.slug}`);
  }
  for (const b of pagesByIntent("brand")) {
    paths.add(`/marques/${b.slug}`);
  }
  for (const m of SAC_MODEL_PAGES) {
    paths.add(`/sacs/${m.brand}/${m.model}`);
  }
  for (const a of ARTICLE_CATALOG) {
    paths.add(`/articles/${a.slug}`);
  }

  return [...paths].sort();
}

export function allSeoUrls(): string[] {
  return allSeoPaths().map((p) => (p === "/" ? `${SITE}/` : `${SITE}${p}`));
}

/** Priority URLs for manual Google Search Console Inspection. */
export function gscPriorityUrls(): string[] {
  // Mid-tail P0 from plan-seo-50-pages (trafic réel) + hubs
  const p0Slugs = [
    "code-date-louis-vuitton",
    "speedy-25-30-35-quelle-taille",
    "taille-neverfull-pm-mm-gm",
    "augmentation-prix-chanel",
    "numero-serie-chanel",
    "prix-chanel-timeless-occasion",
    "prix-neverfull-occasion",
    "reconnaitre-vrai-louis-vuitton",
    "premier-sac-de-luxe",
    "sac-de-luxe-moins-1000-euros",
    "meilleurs-sites-sac-luxe-occasion",
    "sac-de-luxe-vinted",
    "kelly-vs-birkin",
    "faire-authentifier-un-sac",
    "identifier-sac-photo",
    "louis-vuitton-occasion",
    "chanel-occasion",
  ];

  return [
    `${SITE}/`,
    `${SITE}/guide`,
    `${SITE}/articles`,
    `${SITE}/marques`,
    `${SITE}/comment-ca-marche`,
    `${SITE}/guide/eu/fr`,
    `${SITE}/guide/eu/de`,
    `${SITE}/guide/eu/en`,
    ...p0Slugs.map((s) => `${SITE}/guide/${s}`),
    `${SITE}/guide/eu-fr-trouver-vendeur-louis-vuitton`,
    `${SITE}/guide/eu-de-trouver-vendeur-louis-vuitton`,
    `${SITE}/guide/eu-en-trouver-vendeur-louis-vuitton`,
    `${SITE}/sacs/louis-vuitton/neverfull`,
    `${SITE}/sacs/louis-vuitton/pochette-metis`,
    `${SITE}/sacs/louis-vuitton/keepall`,
    `${SITE}/sacs/chanel/classic-flap`,
    `${SITE}/sacs/chanel/woc`,
    `${SITE}/sacs/dior/lady-dior`,
    `${SITE}/marques/louis-vuitton`,
    `${SITE}/marques/chanel`,
    `${SITE}/articles/louis-vuitton-neverfull-mm`,
    `${SITE}/articles/chanel-classic-flap`,
    `${SITE}/articles/hermes-birkin-cargo`,
    `${SITE}/articles/cartier-love-bracelet`,
    `${SITE}/guide/neverfull-vs-onthego`,
    `${SITE}/guide/estimer-prix-sac-photo`,
    `${SITE}/guide/love-vs-juste-un-clou`,
    `${SITE}/guide/sac-luxe-occasion-paris`,
    `${SITE}/guide/cote-revente-sac-luxe-2026`,
  ];
}
