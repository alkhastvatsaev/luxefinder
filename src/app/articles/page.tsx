import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import {
  ARTICLE_CATALOG,
  ARTICLE_CATEGORY_LABEL,
  articlesByCategory,
  type ArticleCategory,
} from "@/lib/article-catalog";

export const metadata: Metadata = {
  title: "LuxeFinder — Articles & photos icônes luxe",
  description:
    "26 fiches photo LuxeFinder : sacs, bijoux et lunettes iconiques — histoire, origines et images optimisées Google. Identifiez-les avec l’app.",
  alternates: { canonical: "https://luxefinder.app/articles" },
  openGraph: {
    title: "LuxeFinder — Articles & photos icônes luxe",
    description: "Histoires et photos studio des pièces du catalogue LuxeFinder.",
    url: "https://luxefinder.app/articles",
    type: "website",
    locale: "fr_FR",
  },
};

const ORDER: ArticleCategory[] = ["sac", "bijou", "lunettes"];

export default function ArticlesHubPage() {
  return (
    <SeoShell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40">
        Articles · {ARTICLE_CATALOG.length} photos
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
        LuxeFinder — histoires & images
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-black/60">
        Chaque photo du catalogue a sa page : marque, modèle, récit d’origine. Les images sont
        titrées et légendées « LuxeFinder » pour le référencement Google Images.
      </p>
      <div className="mt-8">
        <SeoTryCta source="articles-hub" />
      </div>

      {ORDER.map((cat) => {
        const items = articlesByCategory(cat);
        return (
          <section key={cat} className="mt-14">
            <h2 className="text-lg font-semibold">{ARTICLE_CATEGORY_LABEL[cat]}</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {items.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.015] transition hover:border-black/15 hover:bg-black/[0.03]"
                  >
                    <div className="relative aspect-[4/3] bg-[#f5f5f5]">
                      <Image
                        src={a.imagePath}
                        alt={a.imageAlt}
                        title={a.imageAlt}
                        fill
                        className="object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 360px"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                        {a.brand}
                      </p>
                      <p className="mt-1 text-sm font-medium text-black/85">{a.shortName}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </SeoShell>
  );
}
