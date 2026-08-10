import type { Metadata } from "next";
import Link from "next/link";
import { listPicsSlides, listSunglassesSlides, listJewelrySlides } from "@/lib/pics";
import { HOME_APP_JSON_LD } from "@/lib/brand-schema";
import HomeCoverflow from "@/components/home-coverflow";

export const metadata: Metadata = {
  title: {
    absolute: "LuxeFinder (Luxe Finder) — photo, budget, vendeurs de luxe",
  },
  description:
    "LuxeFinder (Luxe Finder) sur luxefinder.app : photo + budget → vendeurs de sacs et accessoires de luxe. App gratuite.",
  alternates: { canonical: "https://luxefinder.app" },
  openGraph: {
    title: "LuxeFinder (Luxe Finder) — photo, budget, vendeurs de luxe",
    description:
      "LuxeFinder (Luxe Finder) sur luxefinder.app — photo + budget → pistes vendeurs pour sacs et accessoires de luxe.",
    url: "https://luxefinder.app",
    images: [{ url: "https://luxefinder.app/og-default.jpg" }],
  },
};

const SEO_LINKS = [
  { href: "/guide", label: "Guides" },
  { href: "/articles", label: "Articles" },
  { href: "/marques", label: "Marques" },
  { href: "/faq", label: "FAQ" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/a-propos", label: "À propos" },
  { href: "/a-propos#luxe-finder", label: "Luxe Finder" },
  { href: "/guide/trouver-vendeur-sac-luxe", label: "Trouver un vendeur" },
  { href: "/guide/budget-sac-luxe", label: "Budget" },
  { href: "/guide/identifier-modele-sac", label: "Identifier un modèle" },
  { href: "/guide/eviter-arnaques-vendeurs", label: "Éviter les arnaques" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
] as const;

export default function HomePage() {
  const bagSlides = listPicsSlides();
  const sunglassesSlides = listSunglassesSlides();
  const jewelrySlides = listJewelrySlides();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_APP_JSON_LD) }}
      />
      <h1 className="sr-only">
        LuxeFinder (Luxe Finder) — envoyez une photo, indiquez votre budget, on trouve les vendeurs
        de sacs et accessoires de luxe sur luxefinder.app
      </h1>
      <p className="sr-only">
        Application gratuite Luxe Finder : identifiez un modèle à partir d’une photo, fixez un budget,
        comparez des pistes de vendeurs d’occasion et de luxe. Consultez aussi nos guides, articles
        et pages marques.
      </p>
      <HomeCoverflow
        bagSlides={bagSlides}
        sunglassesSlides={sunglassesSlides}
        jewelrySlides={jewelrySlides}
      />
      {/* Crawlable SEO footer — does not alter the fullscreen app chrome */}
      <nav
        aria-label="Liens utiles LuxeFinder"
        className="pointer-events-auto fixed inset-x-0 bottom-0 z-40 flex max-h-12 flex-col items-center justify-center gap-0.5 overflow-hidden bg-white/90 px-3 py-1 text-[10px] font-medium tracking-wide text-black/45 backdrop-blur-md"
      >
        <p className="shrink-0 text-[9px] text-black/35">
          LuxeFinder ·{" "}
          <Link href="/a-propos#luxe-finder" className="hover:text-black/60">
            Luxe Finder
          </Link>
          {" · "}
          luxefinder.app
        </p>
        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-0.5">
          {SEO_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="shrink-0 hover:text-black/75">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
