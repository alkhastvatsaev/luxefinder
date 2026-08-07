import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import { SEO_PAGES, getPage, relatedPages } from "@/lib/seo-pages";

type Props = { params: Promise<{ slug: string }> };
const SITE = "https://luxefinder.app";

export async function generateStaticParams() {
  return SEO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getPage(slug);
  if (!g) return { title: "Guide" };
  const url = `${SITE}/guide/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      title: g.h1,
      description: g.description,
      url,
      locale: "fr_FR",
      type: "article",
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
    author: { "@type": "Organization", name: "LuxeFinder" },
    mainEntityOfPage: url,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.sections.map((s) => ({
      "@type": "Question",
      name: s.h2,
      acceptedAnswer: { "@type": "Answer", text: s.body },
    })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

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
