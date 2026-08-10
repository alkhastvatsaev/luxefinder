import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import {
  ARTICLE_CATALOG,
  ARTICLE_CATEGORY_LABEL,
  articleAbsoluteImageUrl,
  articleUrl,
  getArticle,
} from "@/lib/article-catalog";

type Props = { params: Promise<{ slug: string }> };
const SITE = "https://luxefinder.app";

export async function generateStaticParams() {
  return ARTICLE_CATALOG.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article" };
  const url = articleUrl(slug);
  const img = articleAbsoluteImageUrl(a);
  return {
    title: { absolute: a.h1 },
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      title: a.h1,
      description: a.description,
      url,
      type: "article",
      locale: "fr_FR",
      siteName: "LuxeFinder",
      images: [
        {
          url: img,
          alt: a.imageAlt,
          width: 1200,
          height: 1200,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: a.h1,
      description: a.description,
      images: [img],
    },
    other: {
      "og:image:alt": a.imageAlt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const pageUrl = articleUrl(slug);
  const imgUrl = articleAbsoluteImageUrl(a);
  const related = ARTICLE_CATALOG.filter(
    (x) => x.category === a.category && x.slug !== a.slug,
  ).slice(0, 4);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.h1,
    description: a.description,
    inLanguage: "fr-FR",
    datePublished: "2026-08-09",
    dateModified: "2026-08-09",
    author: { "@type": "Organization", name: "LuxeFinder", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "LuxeFinder",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/brand/logo.svg` },
    },
    mainEntityOfPage: pageUrl,
    image: {
      "@type": "ImageObject",
      contentUrl: imgUrl,
      url: imgUrl,
      name: a.imageAlt,
      caption: a.imageCaption,
      description: a.imageAlt,
      creditText: "LuxeFinder",
      acquireLicensePage: pageUrl,
      creator: { "@type": "Organization", name: "LuxeFinder" },
    },
    about: {
      "@type": "Product",
      name: a.name,
      brand: { "@type": "Brand", name: a.brand },
      category: ARTICLE_CATEGORY_LABEL[a.category],
      image: imgUrl,
      description: a.intro,
    },
  };

  const imageLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: imgUrl,
    url: imgUrl,
    name: `LuxeFinder — ${a.name}`,
    caption: a.imageCaption,
    description: a.imageAlt,
    creditText: "LuxeFinder",
    copyrightNotice: "LuxeFinder",
    creator: { "@type": "Organization", name: "LuxeFinder", url: SITE },
    isPartOf: pageUrl,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "LuxeFinder", item: SITE },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE}/articles` },
      { "@type": "ListItem", position: 3, name: a.shortName, item: pageUrl },
    ],
  };

  return (
    <SeoShell crumb={{ href: "/articles", label: "Articles" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
        {ARTICLE_CATEGORY_LABEL[a.category]} · {a.brand}
        {a.year ? ` · ${a.year}` : ""}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{a.h1}</h1>
      <p className="mt-4 text-base text-black/60">{a.intro}</p>

      <figure className="mt-8 overflow-hidden rounded-2xl border border-black/[0.06] bg-[#f7f7f7]">
        <div className="relative mx-auto aspect-square max-w-lg">
          <Image
            src={a.imagePath}
            alt={a.imageAlt}
            title={a.imageAlt}
            fill
            priority
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>
        <figcaption className="border-t border-black/[0.06] bg-white px-4 py-3 text-xs leading-relaxed text-black/55">
          {a.imageCaption}
        </figcaption>
      </figure>

      <div className="mt-8">
        <SeoTryCta source={`article:${a.slug}`} />
      </div>

      {(a.designer || a.year) && (
        <dl className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
          {a.designer ? (
            <div className="rounded-xl border border-black/[0.06] px-4 py-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                Création / design
              </dt>
              <dd className="mt-1 text-black/80">{a.designer}</dd>
            </div>
          ) : null}
          {a.year ? (
            <div className="rounded-xl border border-black/[0.06] px-4 py-3">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                Repère chronologique
              </dt>
              <dd className="mt-1 text-black/80">{a.year}</dd>
            </div>
          ) : null}
        </dl>
      )}

      <div className="mt-12 space-y-8">
        {a.sections.map((s) => (
          <section key={s.h2}>
            <h2 className="text-xl font-semibold">{s.h2}</h2>
            <p className="mt-3 text-sm leading-relaxed text-black/65 md:text-base">{s.body}</p>
          </section>
        ))}
      </div>

      {a.sources.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Sources</h2>
          <ul className="mt-3 space-y-2 text-sm text-black/55">
            {a.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-black/20 underline-offset-2 hover:text-black/80"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Dans la même catégorie</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/articles/${r.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-black/[0.06] px-3 py-2 transition hover:border-black/15"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5]">
                  <Image src={r.imagePath} alt={r.imageAlt} fill className="object-contain p-1" sizes="56px" />
                </div>
                <span className="text-sm font-medium text-black/80">{r.shortName}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SeoShell>
  );
}
