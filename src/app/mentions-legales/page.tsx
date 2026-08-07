import type { Metadata } from "next";
import { SeoShell } from "@/components/seo/seo-shell";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://luxefinder.app/mentions-legales" },
};

export default function MentionsPage() {
  return (
    <SeoShell>
      <h1 className="text-4xl font-semibold tracking-tight">Mentions légales</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-black/65">
        <p>
          <strong className="text-black/85">Éditeur :</strong> LuxeFinder — site accessible à l’adresse
          luxefinder.app.
        </p>
        <p>
          <strong className="text-black/85">Hébergement :</strong> Vercel Inc., plateformes cloud
          (détails disponibles sur vercel.com).
        </p>
        <p>
          <strong className="text-black/85">Contact :</strong> via les canaux indiqués sur le site /
          formulaire de contact lorsque disponible.
        </p>
        <p>
          Les contenus des guides sont informatifs. LuxeFinder n’est pas affilié aux maisons de luxe
          citées (Louis Vuitton, Hermès, Chanel, etc.), marques déposées de leurs titulaires.
        </p>
        <p>Complétez cette page avec raison sociale, RCS, et responsable de publication avant mise en conformité finale.</p>
      </div>
    </SeoShell>
  );
}
