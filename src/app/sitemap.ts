import type { MetadataRoute } from "next";
import { ARTICLE_CATALOG, articleAbsoluteImageUrl } from "@/lib/article-catalog";
import { SEO_EU_LOCALES } from "@/lib/seo-eu-batch";
import { SEO_PAGES, pagesByIntent } from "@/lib/seo-pages";
import { SAC_MODEL_PAGES } from "@/lib/seo-models";

const SITE = "https://luxefinder.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE}/marques`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/comment-ca-marche`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const euHubs = SEO_EU_LOCALES.map((l) => ({
    url: `${SITE}/guide/eu/${l.code}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.92,
  }));

  const guides = SEO_PAGES.map((p) => ({
    url: `${SITE}/guide/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.locale ? 0.82 : p.intent === "buy" ? 0.9 : p.intent === "howto" ? 0.88 : 0.75,
  }));

  const brands = pagesByIntent("brand").map((p) => ({
    url: `${SITE}/marques/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const models = SAC_MODEL_PAGES.map((m) => ({
    url: `${SITE}/sacs/${m.brand}/${m.model}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const articles = ARTICLE_CATALOG.map((a) => ({
    url: `${SITE}/articles/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: [articleAbsoluteImageUrl(a)],
  }));

  return [...staticRoutes, ...euHubs, ...guides, ...brands, ...models, ...articles];
}
