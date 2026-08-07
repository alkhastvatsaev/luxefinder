import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";
import { pagesByIntent } from "@/lib/seo-pages";
import { modelsByBrand } from "@/lib/seo-models";

export const metadata: Metadata = {
  title: "Marques de luxe",
  description:
    "Guides marques LuxeFinder : Louis Vuitton, Hermès, Chanel, Dior, Gucci… Identifiez le modèle puis trouvez des vendeurs.",
  alternates: { canonical: "https://luxefinder.app/marques" },
};

export default function MarquesHubPage() {
  const brands = pagesByIntent("brand");

  return (
    <SeoShell>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40">Marques</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Maisons & modèles</h1>
      <p className="mt-4 max-w-xl text-base text-black/60">
        Choisissez une maison pour lire les repères, puis lancez une recherche photo dans l’app.
      </p>
      <div className="mt-8">
        <SeoTryCta source="marques-hub" />
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2">
        {brands.map((b) => {
          const models = modelsByBrand(b.slug);
          return (
            <li key={b.slug} className="rounded-2xl border border-black/[0.06] p-5">
              <Link href={`/marques/${b.slug}`} className="text-lg font-semibold hover:underline">
                {b.h1.replace(/^Guide( discret)?\s+/i, "")}
              </Link>
              <p className="mt-2 line-clamp-2 text-sm text-black/50">{b.description}</p>
              {models.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {models.map((m) => (
                    <Link
                      key={m.model}
                      href={`/sacs/${m.brand}/${m.model}`}
                      className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-black/55 hover:bg-black/[0.07]"
                    >
                      {m.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </SeoShell>
  );
}
