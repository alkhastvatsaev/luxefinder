import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import { getPage, pagesByIntent } from "@/lib/seo-pages";
import { modelsByBrand } from "@/lib/seo-models";

type Props = { params: Promise<{ brand: string }> };
const SITE = "https://luxefinder.app";

export async function generateStaticParams() {
  return pagesByIntent("brand").map((p) => ({ brand: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const g = getPage(brand);
  if (!g) return { title: "Marque" };
  const url = `${SITE}/marques/${brand}`;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: { title: g.h1, description: g.description, url, type: "article", locale: "fr_FR" },
  };
}

export default async function MarquePage({ params }: Props) {
  const { brand } = await params;
  const g = getPage(brand);
  if (!g || g.intent !== "brand") notFound();
  const models = modelsByBrand(brand);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.description,
    inLanguage: "fr-FR",
    author: { "@type": "Organization", name: "LuxeFinder" },
    mainEntityOfPage: `${SITE}/marques/${brand}`,
  };

  return (
    <SeoShell crumb={{ href: "/marques", label: "Toutes les marques" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{g.h1}</h1>
      <p className="mt-4 text-base text-black/60">{g.intro}</p>
      <div className="mt-8">
        <SeoTryCta source={`marque:${brand}`} />
      </div>

      <div className="mt-12 space-y-8">
        {g.sections.map((s) => (
          <section key={s.h2}>
            <h2 className="text-xl font-semibold">{s.h2}</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/65 md:text-base">{s.body}</p>
          </section>
        ))}
      </div>

      {models.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Modèles populaires</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {models.map((m) => (
              <li key={m.model}>
                <Link
                  href={`/sacs/${m.brand}/${m.model}`}
                  className="block rounded-2xl border border-black/[0.06] px-4 py-3 text-sm font-medium hover:border-black/15"
                >
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-sm text-black/45">
        Guide détaillé aussi sur{" "}
        <Link href={`/guide/${brand}`} className="underline underline-offset-2">
          /guide/{brand}
        </Link>
        .
      </p>
    </SeoShell>
  );
}
