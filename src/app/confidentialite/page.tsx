import type { Metadata } from "next";
import { SeoShell } from "@/components/seo/seo-shell";

export const metadata: Metadata = {
  title: "Confidentialité",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://luxefinder.app/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <SeoShell>
      <h1 className="text-4xl font-semibold tracking-tight">Politique de confidentialité</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-black/65">
        <p>
          LuxeFinder traite les données nécessaires au fonctionnement de l’app (ex. image uploadée
          pour analyse, budget saisi, logs techniques).
        </p>
        <p>
          <strong className="text-black/85">Finalités :</strong> fournir le service de recherche
          d’offres / vendeurs, sécuriser la plateforme, améliorer la qualité.
        </p>
        <p>
          <strong className="text-black/85">Durée :</strong> conservation limitée au besoin
          opérationnel et obligations légales. Les images peuvent être traitées par des prestataires
          d’analyse (ex. vision) selon configuration.
        </p>
        <p>
          <strong className="text-black/85">Droits :</strong> accès, rectification, suppression —
          contactez l’éditeur. Complétez cette page avec DPO / base légale RGPD avant go-live
          conformité.
        </p>
      </div>
    </SeoShell>
  );
}
