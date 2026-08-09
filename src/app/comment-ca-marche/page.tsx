import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "LuxeFinder étape par étape : préparer la photo, fixer un budget, lire les pistes vendeurs, vérifier avant de payer. Parcours occasion luxe.",
  alternates: { canonical: "https://luxefinder.app/comment-ca-marche" },
  openGraph: {
    title: "Comment ça marche — LuxeFinder",
    description: "Photo + budget → pistes vendeurs. Méthode simple, sans catalogue interminable.",
    url: "https://luxefinder.app/comment-ca-marche",
    images: [{ url: "https://luxefinder.app/og-default.jpg" }],
  },
};

const STEPS = [
  {
    n: "1",
    title: "Préparez une photo nette",
    body: "Fond neutre, bonne lumière, pièce entière visible. Ajoutez un gros plan hardware si possible. Évitez filtres agressifs et photos floues : elles ralentissent l’identification et faussent la comparaison d’offres.",
  },
  {
    n: "2",
    title: "Envoyez la photo dans l’app",
    body: "Sur la page d’accueil LuxeFinder, déposez l’image. L’objectif est de cadrer le modèle (marque / ligne / indices) pour ne pas chercher à côté. Ce cadrage n’est pas un certificat d’authenticité.",
  },
  {
    n: "3",
    title: "Indiquez votre budget",
    body: "Une fourchette claire (avec livraison) filtre les pistes hors cible. Commencez large si vous explorez, puis resserrez une fois le modèle confirmé. Incluez une marge pour frais imprévus.",
  },
  {
    n: "4",
    title: "Recevez des pistes vendeurs",
    body: "LuxeFinder oriente vers des offres / vendeurs à étudier. Ce n’est pas un panier d’achat automatique : vous gardez la main sur la sélection et sur la négociation.",
  },
  {
    n: "5",
    title: "Vérifiez avant de payer",
    body: "Demandez photos du lot, total rendu, délai, conditions. Appliquez la grille anti-arnaque. Pour les montants élevés, faites expertiser avant paiement définitif.",
  },
];

const NOTES = [
  {
    h2: "Ce que LuxeFinder est",
    body: "Une app de recherche par photo + budget pour sacs et accessoires de luxe. Elle aide à nommer la pièce et à explorer des pistes de vendeurs, puis vous laisse décider.",
  },
  {
    h2: "Ce que LuxeFinder n’est pas",
    body: "Pas une marketplace avec stock, pas un dépôt-vente, pas un certificateur automatique, et distinct de luxfinder.com (aggregator fashion) ou luxefinder.ae (immobilier Dubaï).",
  },
  {
    h2: "Quand utiliser les guides",
    body: "Avant de payer, lisez les guides « trouver un vendeur », « budget », « comparer les offres » et « éviter les arnaques ». Ils structurent la short-list que l’app vous aide à démarrer.",
  },
  {
    h2: "Bonnes pratiques",
    body: "Échanges écrits, preuves photos datées, pas de pression, budget réaliste ancré sur des comparables. Plus le montant est élevé, plus l’expertise externe devient rationnelle.",
  },
];

export default function CommentCaMarchePage() {
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment utiliser LuxeFinder",
    description: "Photo, budget, pistes vendeurs, vérifications.",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <SeoShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Comment ça marche</h1>
      <p className="mt-4 max-w-xl text-base text-black/60">
        Parcours minimal : vous partez de votre pièce et de votre budget, pas d’un catalogue à scroller
        pendant des heures. L’ordre compte autant que l’outil.
      </p>
      <div className="mt-8">
        <SeoTryCta source="comment-ca-marche" />
      </div>
      <ol className="mt-14 space-y-8">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
              {s.n}
            </span>
            <div>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-black/65 md:text-base">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-14 space-y-8">
        {NOTES.map((n) => (
          <section key={n.h2}>
            <h2 className="text-xl font-semibold">{n.h2}</h2>
            <p className="mt-2 text-sm leading-relaxed text-black/65 md:text-base">{n.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-black/45">
        Voir aussi{" "}
        <Link href="/faq" className="underline underline-offset-2">
          FAQ
        </Link>
        ,{" "}
        <Link href="/guide/trouver-vendeur-sac-luxe" className="underline underline-offset-2">
          trouver un vendeur
        </Link>{" "}
        et{" "}
        <Link href="/a-propos" className="underline underline-offset-2">
          à propos
        </Link>
        .
      </p>
    </SeoShell>
  );
}
