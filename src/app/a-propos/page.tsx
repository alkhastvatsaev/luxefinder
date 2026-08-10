import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";

export const metadata: Metadata = {
  title: {
    absolute: "LuxeFinder — Luxe Finder | À propos",
  },
  description:
    "LuxeFinder (Luxe Finder) sur luxefinder.app : app photo + budget pour trouver des vendeurs de sacs de luxe. Distinct de luxfinder.com et luxefinder.ae.",
  alternates: { canonical: "https://luxefinder.app/a-propos" },
  openGraph: {
    title: "LuxeFinder — Luxe Finder | À propos",
    description: "Qui nous sommes, ce que fait l’app, et en quoi nous différons des homonymes.",
    url: "https://luxefinder.app/a-propos",
    images: [{ url: "https://luxefinder.app/og-default.jpg" }],
  },
};

const BRAND_FAQ = [
  {
    q: "C’est LuxeFinder ou Luxe Finder ?",
    a: "Les deux désignent la même app sur luxefinder.app. « LuxeFinder » est le nom officiel ; « Luxe Finder » (avec espace) est une orthographe courante que les utilisateurs tapent dans Google.",
  },
  {
    q: "Pourquoi luxefinder.app et pas .com ou .ae ?",
    a: "luxefinder.app est le site officiel de l’app photo + budget pour sacs et accessoires de luxe. luxfinder.com est un aggregator fashion distinct ; luxefinder.ae est une agence immobilière à Dubaï — aucun lien avec nous.",
  },
  {
    q: "LuxeFinder vend-il des sacs ?",
    a: "Non. LuxeFinder (Luxe Finder) oriente la recherche : photo + budget → pistes de vendeurs à étudier. L’achat et la vérification d’authenticité restent entre vous et le vendeur.",
  },
];

export default function AProposPage() {
  const aboutLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "À propos de LuxeFinder (Luxe Finder)",
        url: "https://luxefinder.app/a-propos",
        mainEntity: { "@id": "https://luxefinder.app/#organization" },
      },
      {
        "@type": "FAQPage",
        mainEntity: BRAND_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <SeoShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }} />
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">LuxeFinder (Luxe Finder)</h1>
      <p className="mt-4 max-w-xl text-base text-black/60">
        LuxeFinder (Luxe Finder) sur luxefinder.app aide à identifier un sac ou accessoire de luxe à
        partir d’une photo, puis à explorer des pistes de vendeurs selon un budget.
      </p>
      <div className="mt-8">
        <SeoTryCta source="a-propos" />
      </div>

      <section id="luxe-finder" className="mt-12 scroll-mt-20 space-y-4">
        <h2 className="text-xl font-semibold">Luxe Finder ou LuxeFinder ?</h2>
        <p className="text-sm leading-relaxed text-black/65 md:text-base">
          <strong>LuxeFinder</strong> est le nom officiel de l’app. <strong>Luxe Finder</strong> (avec
          espace) est la même entité — orthographe fréquente dans les recherches Google. Les deux
          renvoient à <strong>luxefinder.app</strong>, l’application photo + budget pour trouver des
          vendeurs de sacs et accessoires de luxe.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Ce que nous faisons</h2>
        <p className="text-sm leading-relaxed text-black/65 md:text-base">
          Vous savez ce que vous voulez (souvent via une photo). Nous aidons à cadrer le modèle et à
          remonter des offres / vendeurs à étudier. La décision d’achat, la négociation et la
          vérification d’authenticité restent les vôtres. L’app accélère le début du parcours ; elle
          ne le remplace pas.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">LuxeFinder n’est pas…</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-black/65 md:text-base">
          <li>Pas une marketplace avec stock propre.</li>
          <li>Pas un service de dépôt-vente classique.</li>
          <li>Pas un certificateur d’authenticité automatique.</li>
          <li>
            Pas{" "}
            <a
              href="https://luxfinder.com"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="font-medium text-black/80 underline underline-offset-2"
            >
              luxfinder.com
            </a>{" "}
            (aggregator fashion tiers).
          </li>
          <li>
            Pas{" "}
            <a
              href="https://luxefinder.ae"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="font-medium text-black/80 underline underline-offset-2"
            >
              luxefinder.ae
            </a>{" "}
            (immobilier luxe à Dubaï — homonyme « Luxe Finder » sans lien avec nous).
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Pour qui</h2>
        <p className="text-sm leading-relaxed text-black/65 md:text-base">
          Acheteurs qui cherchent une pièce précise en occasion ou via vendeurs, avec un budget
          clair, et qui veulent gagner du temps sur l’identification et le premier filtrage. Si vous
          explorez encore « n’importe quel sac joli », commencez plutôt par clarifier le modèle.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Contenu éditorial</h2>
        <p className="text-sm leading-relaxed text-black/65 md:text-base">
          Guides, articles et pages marques sont informatifs. Ils ne facilitent pas l’achat de
          contrefaçons. En cas de doute sur une offre, arrêtez-vous et faites expertiser. Nous
          privilégions les parcours d’occasion légitimes et les réflexes anti-arnaque.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Comment démarrer</h2>
        <p className="text-sm leading-relaxed text-black/65 md:text-base">
          Ouvrez l’app, envoyez une photo, indiquez un budget, puis lisez les pistes avec les guides
          « comparer les offres » et « éviter les arnaques ». Pour le détail du parcours, voir{" "}
          <Link href="/comment-ca-marche" className="underline underline-offset-2">
            comment ça marche
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="text-xl font-semibold">Questions fréquentes sur la marque</h2>
        {BRAND_FAQ.map((f) => (
          <div key={f.q}>
            <h3 className="text-base font-semibold">{f.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/65 md:text-base">{f.a}</p>
          </div>
        ))}
      </section>

      <p className="mt-10 text-sm text-black/45">
        <Link href="/comment-ca-marche" className="underline underline-offset-2">
          Comment ça marche
        </Link>
        {" · "}
        <Link href="/faq" className="underline underline-offset-2">
          FAQ
        </Link>
        {" · "}
        <Link href="/mentions-legales" className="underline underline-offset-2">
          Mentions légales
        </Link>
      </p>
    </SeoShell>
  );
}
