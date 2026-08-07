import type { Metadata } from "next";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes LuxeFinder : photo, budget, vendeurs, sécurité, délais.",
  alternates: { canonical: "https://luxefinder.app/faq" },
};

const FAQ = [
  {
    q: "LuxeFinder vend-il des sacs ?",
    a: "Non. LuxeFinder est une app de recherche : vous envoyez une photo et un budget, on aide à trouver des pistes de vendeurs / offres. La transaction se discute ensuite avec le vendeur.",
  },
  {
    q: "Quelles photos marchent le mieux ?",
    a: "Fond neutre, bonne lumière, pièce entière visible, éventuellement un détail hardware. Évitez les photos floues ou trop stylisées.",
  },
  {
    q: "Pourquoi indiquer un budget ?",
    a: "Le budget filtre les offres hors cible et clarifie la discussion avec les vendeurs. Commencez large, puis resserrez.",
  },
  {
    q: "Est-ce gratuit ?",
    a: "L’usage de l’app web est conçu pour démarrer sans friction. Les conditions commerciales éventuelles seront toujours affichées clairement.",
  },
  {
    q: "Comment éviter les arnaques ?",
    a: "Demandez des photos du lot, gardez les échanges écrits, méfiez-vous de la pression et des paiements non traçables. Lisez nos guides sécurité.",
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
      <p className="mt-4 text-base text-black/60">Réponses courtes. Pour le détail, voir les guides.</p>
      <div className="mt-8">
        <SeoTryCta source="faq" />
      </div>
      <div className="mt-12 space-y-8">
        {FAQ.map((f) => (
          <section key={f.q}>
            <h2 className="text-lg font-semibold">{f.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-black/65 md:text-base">{f.a}</p>
          </section>
        ))}
      </div>
    </SeoShell>
  );
}
