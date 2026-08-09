import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import { SEO_EU_LOCALES } from "@/lib/seo-eu-batch";
import { SEO_PAGES, pagesByIntent, pagesGreyZone, pagesIdeas50 } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Guides sacs & luxe — Europe",
  description:
    "Guides LuxeFinder multi-pays UE : budget, alternative, pas cher, trouver un vendeur, occasion — puis lancez l’app photo.",
  alternates: { canonical: "https://luxefinder.app/guide" },
};

export default function GuideHubPage() {
  const ideas50 = pagesIdeas50();
  const ideasSlugs = new Set(ideas50.map((p) => p.slug));
  const core = SEO_PAGES.filter((p) => !p.locale && !ideasSlugs.has(p.slug));
  const howto = core.filter((p) => p.intent === "howto");
  const brands = pagesByIntent("brand");
  const models = core.filter((p) => p.intent === "model");
  const buy = core.filter((p) => p.intent === "buy");
  const grey = pagesGreyZone();
  const greyFr = grey.filter((p) => p.locale === "fr");

  const groups: { label: string; items: typeof SEO_PAGES }[] = [
    { label: "Parcours & méthode", items: howto },
    { label: "Maisons", items: brands },
    { label: "Modèles", items: models },
    { label: "Recherche d’offres", items: buy },
  ];

  return (
    <SeoShell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40">Guides</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
        Guides pour trouver le bon vendeur
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-black/60">
        Contenu informatif multi-pays Europe. Quand vous êtes prêt, ouvrez l’app : photo + budget →
        offres. LuxeFinder ne vend pas et n’authentifie pas automatiquement.
      </p>
      <div className="mt-8">
        <SeoTryCta source="guide-hub" />
      </div>

      <section className="mt-14">
        <h2 className="text-lg font-semibold">Nouveaux guides — comparatifs, cotes, ID photo</h2>
        <p className="mt-2 max-w-xl text-sm text-black/55">
          {ideas50.length} pages FR : vs modèles, prix occasion 2026, authentification photo,
          bijoux/lunettes, Paris/Lyon/BE/CH.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {ideas50.slice(0, 20).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/guide/${p.slug}`}
                className="block rounded-2xl border border-black/[0.06] bg-black/[0.015] px-4 py-3 text-sm transition hover:border-black/15 hover:bg-black/[0.03]"
              >
                <span className="font-medium text-black/85">{p.h1}</span>
                <span className="mt-1 block line-clamp-2 text-xs text-black/45">{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        {ideas50.length > 20 ? (
          <p className="mt-3 text-xs text-black/40">+{ideas50.length - 20} autres guides indexés.</p>
        ) : null}
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold">Budget · alternative · pas cher · occasion</h2>
        <p className="mt-2 max-w-xl text-sm text-black/55">
          {grey.length} pages EU (FR/DE/IT/ES/EN) pour chercher une offre plus accessible — sans
          tutoriel d’achat illicite. Exemples FR :
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {greyFr.slice(0, 16).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/guide/${p.slug}`}
                className="block rounded-2xl border border-black/[0.06] bg-black/[0.015] px-4 py-3 text-sm transition hover:border-black/15 hover:bg-black/[0.03]"
              >
                <span className="font-medium text-black/85">{p.h1}</span>
                <span className="mt-1 block line-clamp-2 text-xs text-black/45">{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        {grey.length > 16 ? (
          <p className="mt-3 text-xs text-black/40">
            +{grey.length - 16} pages indexées (slugs{" "}
            <code className="text-black/50">gz-*</code>).
          </p>
        ) : null}
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold">Europe — guides par pays / langue</h2>
        <p className="mt-2 max-w-xl text-sm text-black/55">
          Hubs pays (vendeur, photo, budget, offres, occasion, authenticité, tailles, arnaques) ×
          maisons.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {SEO_EU_LOCALES.map((loc) => (
            <li key={loc.code}>
              <Link
                href={`/guide/eu/${loc.code}`}
                className="block rounded-2xl border border-black/[0.06] bg-black/[0.015] px-4 py-3 text-sm transition hover:border-black/15 hover:bg-black/[0.03]"
              >
                <span className="font-medium text-black/85">
                  {loc.country} <span className="text-black/40">({loc.label})</span>
                </span>
                <span className="mt-1 block text-xs text-black/45">/guide/eu/{loc.code}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 space-y-12">
        {groups.map((g) =>
          g.items.length === 0 ? null : (
            <section key={g.label}>
              <h2 className="text-lg font-semibold">{g.label}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {g.items.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.intent === "brand" ? `/marques/${p.slug}` : `/guide/${p.slug}`}
                      className="block rounded-2xl border border-black/[0.06] bg-black/[0.015] px-4 py-3 text-sm transition hover:border-black/15 hover:bg-black/[0.03]"
                    >
                      <span className="font-medium text-black/85">{p.h1}</span>
                      <span className="mt-1 block line-clamp-2 text-xs text-black/45">
                        {p.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        )}
      </div>
    </SeoShell>
  );
}
