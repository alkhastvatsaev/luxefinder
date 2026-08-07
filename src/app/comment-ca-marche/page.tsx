import type { Metadata } from "next";
import { SeoShell, SeoTryCta } from "@/components/seo/seo-shell";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "LuxeFinder en 3 étapes : photo du sac, budget, offres vendeurs. Simple, rapide, sur luxefinder.app.",
  alternates: { canonical: "https://luxefinder.app/comment-ca-marche" },
};

const STEPS = [
  {
    n: "1",
    title: "Envoyez une photo",
    body: "Cadrez le sac ou l’accessoire sur fond clair. Une photo nette aide à reconnaître le modèle.",
  },
  {
    n: "2",
    title: "Indiquez votre budget",
    body: "Une fourchette claire filtre les offres irréalistes et accélère les réponses vendeurs.",
  },
  {
    n: "3",
    title: "Recevez des pistes vendeurs",
    body: "LuxeFinder oriente la recherche d’offres. Comparez, posez vos questions, gardez les preuves écrites.",
  },
];

export default function CommentCaMarchePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: STEPS.map((s) => ({
      "@type": "Question",
      name: s.title,
      acceptedAnswer: { "@type": "Answer", text: s.body },
    })),
  };

  return (
    <SeoShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Comment ça marche</h1>
      <p className="mt-4 max-w-xl text-base text-black/60">
        LuxeFinder reste minimaliste : pas de catalogue à scroller pendant des heures. Vous partez de
        votre pièce et de votre budget.
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
    </SeoShell>
  );
}
