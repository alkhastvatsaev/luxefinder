import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "FAQ LuxeFinder : photo, budget, vendeurs, authenticité, gratuité, différences avec luxfinder.com et luxefinder.ae.",
  alternates: { canonical: "https://luxefinder.app/faq" },
  openGraph: {
    title: "FAQ — LuxeFinder",
    description: "Réponses claires sur l’app photo + budget pour sacs de luxe.",
    url: "https://luxefinder.app/faq",
    images: [{ url: "https://luxefinder.app/og-default.jpg" }],
  },
};

const FAQ = [
  {
    q: "LuxeFinder vend-il des sacs ?",
    a: "Non. LuxeFinder est une app de recherche : vous envoyez une photo et un budget, on aide à trouver des pistes de vendeurs / offres. La transaction se discute ensuite avec le vendeur.",
  },
  {
    q: "Quelles photos marchent le mieux ?",
    a: "Fond neutre, bonne lumière, pièce entière visible, éventuellement un détail hardware. Évitez les photos floues, trop stylisées, ou avec plusieurs objets qui parasitent l’identification.",
  },
  {
    q: "Pourquoi indiquer un budget ?",
    a: "Le budget filtre les offres hors cible et clarifie la discussion avec les vendeurs. Incluez livraison si possible. Commencez large, puis resserrez une fois le modèle confirmé.",
  },
  {
    q: "Est-ce gratuit ?",
    a: "L’usage de l’app web est conçu pour démarrer sans friction. Toute condition commerciale éventuelle sera affichée clairement avant engagement.",
  },
  {
    q: "LuxeFinder garantit-il l’authenticité ?",
    a: "Non. L’app aide à identifier un modèle et à explorer des pistes. Pour les montants élevés, faites expertiser la pièce (plateforme d’auth ou expert) avant paiement définitif.",
  },
  {
    q: "Comment éviter les arnaques ?",
    a: "Demandez des photos du lot réel, gardez les échanges écrits, méfiez-vous de la pression et des paiements non traçables. Lisez le guide « éviter les arnaques » et appliquez une grille de comparaison d’offres.",
  },
  {
    q: "Êtes-vous liés à luxfinder.com ou luxefinder.ae ?",
    a: "Non. luxefinder.app (LuxeFinder) est une app photo + budget pour trouver des vendeurs de sacs/accessoires. luxfinder.com est un aggregator fashion distinct ; luxefinder.ae est une agence immobilière à Dubaï.",
  },
  {
    q: "Puis-je chercher autre chose que des sacs ?",
    a: "L’app est orientée sacs et accessoires de luxe (ex. lunettes, bijoux selon les cas). Plus la photo est claire, meilleur est le cadrage du modèle.",
  },
  {
    q: "Que faire après avoir reçu des pistes ?",
    a: "Traitez-les comme une short-list. Demandez preuves photos, total rendu, délai, conditions. Comparez avec votre budget. Ne payez jamais sous urgence artificielle.",
  },
  {
    q: "LuxeFinder stocke-t-il mon paiement ?",
    a: "L’app oriente la recherche ; le paiement éventuel se fait selon le canal vendeur / plateforme choisi. Restez dans les circuits protégés quand ils existent.",
  },
];

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SeoShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">FAQ</h1>
      <p className="mt-4 text-base text-black/60">
        Réponses courtes aux questions les plus fréquentes. Pour la méthode détaillée, voir les guides.
      </p>
      <div className="mt-8">
        <SeoTryCta source="faq" />
      </div>
      <div className="mt-12 space-y-8">
        {FAQ.map((f) => (
          <section key={f.q}>
            <h2 className="text-lg font-semibold tracking-tight">{f.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-black/65 md:text-base">{f.a}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-black/45">
        <Link href="/comment-ca-marche" className="underline underline-offset-2">
          Comment ça marche
        </Link>
        {" · "}
        <Link href="/guide/eviter-arnaques-vendeurs" className="underline underline-offset-2">
          Éviter les arnaques
        </Link>
        {" · "}
        <Link href="/a-propos" className="underline underline-offset-2">
          À propos
        </Link>
      </p>
    </SeoShell>
  );
}
