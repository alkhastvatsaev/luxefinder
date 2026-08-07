import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import { SAC_MODEL_PAGES, getSacModel } from "@/lib/seo-models";
import { getPage } from "@/lib/seo-pages";

type Props = { params: Promise<{ brand: string; model: string }> };
const SITE = "https://luxefinder.app";

export async function generateStaticParams() {
  return SAC_MODEL_PAGES.map((p) => ({ brand: p.brand, model: p.model }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, model } = await params;
  const m = getSacModel(brand, model);
  if (!m) return { title: "Modèle" };
  const url = `${SITE}/sacs/${brand}/${model}`;
  return {
    title: m.h1,
    description: m.description,
    alternates: { canonical: url },
    openGraph: { title: m.h1, description: m.description, url, type: "article", locale: "fr_FR" },
  };
}

export default async function SacModelPage({ params }: Props) {
  const { brand, model } = await params;
  const m = getSacModel(brand, model);
  if (!m) notFound();

  const brandGuide = getPage(brand);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: m.h1,
    description: m.description,
    inLanguage: "fr-FR",
    author: { "@type": "Organization", name: "LuxeFinder" },
    mainEntityOfPage: `${SITE}/sacs/${brand}/${model}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: m.sections.map((s) => ({
      "@type": "Question",
      name: s.h2,
      acceptedAnswer: { "@type": "Answer", text: s.body },
    })),
  };

  return (
    <SeoShell crumb={{ href: `/marques/${brand}`, label: brandGuide?.h1 || brand }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
        Modèle · {m.name}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{m.h1}</h1>
      <p className="mt-4 text-base text-black/60">{m.intro}</p>
      <div className="mt-8">
        <SeoTryCta source={`sac:${brand}/${model}`} />
      </div>

      <div className="mt-12 space-y-8">
        {m.sections.map((s) => (
          <section key={s.h2}>
            <h2 className="text-xl font-semibold">{s.h2}</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/65 md:text-base">{s.body}</p>
          </section>
        ))}
      </div>

      {m.relatedGuideSlugs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Guides liés</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {m.relatedGuideSlugs.map((slug) => {
              const g = getPage(slug);
              return (
                <Link
                  key={slug}
                  href={`/guide/${slug}`}
                  className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-black/55 hover:border-black/25"
                >
                  {g?.h1 || slug}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </SeoShell>
  );
}
