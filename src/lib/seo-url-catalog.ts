/** Collect all public SEO URLs for sitemap / IndexNow / GSC export. */

import { SEO_PAGES, pagesByIntent } from "@/lib/seo-pages";
import { SAC_MODEL_PAGES } from "@/lib/seo-models";

export const SITE = "https://luxefinder.app";

const STATIC = [
  "/",
  "/guide",
  "/marques",
  "/comment-ca-marche",
  "/faq",
  "/mentions-legales",
  "/confidentialite",
] as const;

export function allSeoPaths(): string[] {
  const paths = new Set<string>(STATIC);

  for (const p of SEO_PAGES) {
    paths.add(`/guide/${p.slug}`);
  }
  for (const b of pagesByIntent("brand")) {
    paths.add(`/marques/${b.slug}`);
  }
  for (const m of SAC_MODEL_PAGES) {
    paths.add(`/sacs/${m.brand}/${m.model}`);
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
    `${SITE}/marques`,
    `${SITE}/comment-ca-marche`,
    ...p0Slugs.map((s) => `${SITE}/guide/${s}`),
    `${SITE}/sacs/louis-vuitton/neverfull`,
    `${SITE}/sacs/louis-vuitton/pochette-metis`,
    `${SITE}/sacs/louis-vuitton/keepall`,
    `${SITE}/sacs/chanel/classic-flap`,
    `${SITE}/sacs/chanel/woc`,
    `${SITE}/sacs/dior/lady-dior`,
    `${SITE}/marques/louis-vuitton`,
    `${SITE}/marques/chanel`,
  ];
}
