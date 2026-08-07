import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import { SEO_PAGES, pagesByIntent } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Guides sacs & luxe",
  description:
    "Guides LuxeFinder : trouver un vendeur, budget, identifier un modèle, éviter les arnaques — puis lancez l’app photo.",
  alternates: { canonical: "https://luxefinder.app/guide" },
};

export default function GuideHubPage() {
  const howto = pagesByIntent("howto");
  const brands = pagesByIntent("brand");
  const models = pagesByIntent("model");
  const buy = pagesByIntent("buy");

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
        Contenu informatif pour cadrer votre recherche. Quand vous êtes prêt, ouvrez l’app : photo +
        budget → offres.
      </p>
      <div className="mt-8">
        <SeoTryCta source="guide-hub" />
      </div>

      <div className="mt-14 space-y-12">
        {groups.map((g) =>
          g.items.length === 0 ? null : (
            <section key={g.label}>
              <h2 className="text-lg font-semibold">{g.label}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {g.items.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/guide/${p.slug}`}
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
