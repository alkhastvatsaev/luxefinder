import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "LuxeFinder (luxefinder.app) : app photo + budget pour trouver des vendeurs de sacs de luxe. Distinct de luxfinder.com et luxefinder.ae.",
  alternates: { canonical: "https://luxefinder.app/a-propos" },
  openGraph: {
    title: "À propos — LuxeFinder",
    description: "Qui nous sommes, ce que fait l’app, et en quoi nous différons des homonymes.",
    url: "https://luxefinder.app/a-propos",
    images: [{ url: "https://luxefinder.app/og-default.jpg" }],
  },
};

export default function AProposPage() {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de LuxeFinder",
    url: "https://luxefinder.app/a-propos",
    mainEntity: {
      "@type": "Organization",
      name: "LuxeFinder",
      url: "https://luxefinder.app",
      logo: "https://luxefinder.app/brand/logo.svg",
      description:
        "Application web : photo d’un article de luxe + budget → pistes de vendeurs.",
    },
  };

  return (
    <SeoShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">À propos de LuxeFinder</h1>
      <p className="mt-4 max-w-xl text-base text-black/60">
        LuxeFinder (luxefinder.app) aide à identifier un sac ou accessoire de luxe à partir d’une
        photo, puis à explorer des pistes de vendeurs selon un budget.
      </p>
      <div className="mt-8">
        <SeoTryCta source="a-propos" />
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Ce que nous faisons</h2>
        <p className="text-sm leading-relaxed text-black/65 md:text-base">
          Vous savez ce que vous voulez (souvent via une photo). Nous aidons à cadrer le modèle et à
          remonter des offres / vendeurs à étudier. La décision d’achat, la négociation et la
          vérification d’authenticité restent les vôtres. L’app accélère le début du parcours ; elle
          ne le remplace pas.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Ce que nous ne sommes pas</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-black/65 md:text-base">
          <li>Pas une marketplace avec stock propre.</li>
          <li>Pas un service de dépôt-vente classique.</li>
          <li>Pas un certificateur d’authenticité automatique.</li>
          <li>
            Pas <span className="font-medium text-black/80">luxfinder.com</span> (aggregator fashion
            tiers).
          </li>
          <li>
            Pas <span className="font-medium text-black/80">luxefinder.ae</span> (immobilier luxe à
            Dubaï).
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
