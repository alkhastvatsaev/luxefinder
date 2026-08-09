import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import { SEO_EU_LOCALES } from "@/lib/seo-eu-batch";
import { pagesByLocale } from "@/lib/seo-pages";

type Props = { params: Promise<{ lang: string }> };
const SITE = "https://luxefinder.app";

export function generateStaticParams() {
  return SEO_EU_LOCALES.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const loc = SEO_EU_LOCALES.find((l) => l.code === lang);
  if (!loc) return { title: "Guides EU" };
  const url = `${SITE}/guide/eu/${lang}`;
  return {
    title: `Guides LuxeFinder — ${loc.country} (${loc.label})`,
    description: `Guides ${loc.country} : trouver un vendeur, identifier un modèle, budget, occasion, authenticité. Photo + budget → offres.`,
    alternates: { canonical: url },
    openGraph: {
      title: `LuxeFinder guides — ${loc.country}`,
      description: `40 guides locaux (${loc.label}) pour cadrer votre recherche.`,
      url,
      locale: lang === "en" ? "en_GB" : `${lang}_${lang.toUpperCase()}`,
      type: "website",
    },
  };
}

export default async function GuideEuLangPage({ params }: Props) {
  const { lang } = await params;
  const loc = SEO_EU_LOCALES.find((l) => l.code === lang);
  if (!loc) notFound();

  const pages = pagesByLocale(lang);
  if (pages.length === 0) notFound();

  const byIntent: Record<string, typeof pages> = {};
  for (const p of pages) {
    (byIntent[p.intent] ??= []).push(p);
  }

  const order: { key: string; label: string }[] = [
    { key: "buy", label: "Recherche d’offres / vendeurs" },
    { key: "howto", label: "Méthode & confiance" },
  ];

  return (
    <SeoShell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40">
        Europe · {loc.label}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
        Guides — {loc.country}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-black/60">
        {pages.length} pages locales ({loc.label}). Contenu informatif — puis LuxeFinder : photo +
        budget → offres.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/guide" className="text-black/50 underline-offset-2 hover:underline">
          ← Tous les guides
        </Link>
        {SEO_EU_LOCALES.filter((l) => l.code !== lang).slice(0, 6).map((l) => (
          <Link
            key={l.code}
            href={`/guide/eu/${l.code}`}
            className="text-black/40 underline-offset-2 hover:underline"
          >
            {l.code}
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <SeoTryCta source={`guide-eu-${lang}`} />
      </div>

      <div className="mt-14 space-y-12">
        {order.map(({ key, label }) => {
          const items = byIntent[key] ?? [];
          if (!items.length) return null;
          return (
            <section key={key}>
              <h2 className="text-lg font-semibold">{label}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {items.map((p) => (
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
          );
        })}
      </div>
    </SeoShell>
  );
}
