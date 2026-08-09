import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import { SEO_PAGES, getPage, relatedPages } from "@/lib/seo-pages";

type Props = { params: Promise<{ slug: string }> };
const SITE = "https://luxefinder.app";
const OG = {
  url: `${SITE}/og-default.jpg`,
  width: 1200,
  height: 1200,
  alt: "LuxeFinder — guides sacs de luxe",
};

export async function generateStaticParams() {
  return SEO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getPage(slug);
  if (!g) return { title: "Guide" };
  const url = `${SITE}/guide/${g.slug}`;
  const absoluteTitle = /luxefinder/i.test(g.title) ? { absolute: g.title } : g.title;
  return {
    title: absoluteTitle,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      title: g.h1,
      description: g.description,
      url,
      locale: "fr_FR",
      type: "article",
      images: [OG],
    },
    twitter: {
      card: "summary_large_image",
      title: g.h1,
      description: g.description,
      images: [OG.url],
    },
  };
}

export default async function GuideSlugPage({ params }: Props) {
  const { slug } = await params;
  const g = getPage(slug);
  if (!g) notFound();

  const related = relatedPages(g);
  const url = `${SITE}/guide/${g.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.description,
    inLanguage: "fr-FR",
    author: { "@type": "Organization", name: "LuxeFinder", url: SITE },
    mainEntityOfPage: url,
    image: OG.url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guide` },
      { "@type": "ListItem", position: 3, name: g.h1, item: url },
    ],
  };

  const intentLabel =
    g.intent === "howto"
      ? "Guide pratique"
      : g.intent === "brand"
        ? "Maison"
        : g.intent === "buy"
          ? "Offres"
          : "Modèle";

  return (
    <SeoShell crumb={{ href: "/guide", label: "Tous les guides" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
        {intentLabel}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{g.h1}</h1>
      <p className="mt-4 text-base leading-relaxed text-black/60">{g.intro}</p>

      <div className="mt-8">
        <SeoTryCta source={`guide:${g.slug}`} />
      </div>

      <div className="mt-12 space-y-8">
        {g.sections.map((s) => (
          <section key={s.h2}>
            <h2 className="text-xl font-semibold tracking-tight">{s.h2}</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/65 md:text-base">{s.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-3xl border border-black/[0.06] bg-black/[0.02] p-6 md:p-8">
        <h2 className="text-lg font-semibold">Prêt à chercher des offres ?</h2>
        <p className="mt-2 text-sm text-black/55">
          Ouvrez LuxeFinder, envoyez une photo et votre budget — on trouve des vendeurs pour vous.
        </p>
        <div className="mt-5">
          <SeoTryCta source={`guide-cta:${g.slug}`} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Continuer</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/guide/${r.slug}`}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-black/55 transition hover:border-black/25 hover:text-black/85"
              >
                {r.h1.length > 42 ? `${r.h1.slice(0, 40)}…` : r.h1}
              </Link>
            ))}
          </div>
        </section>
      )}
    </SeoShell>
  );
}
