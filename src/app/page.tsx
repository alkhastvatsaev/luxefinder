import Link from "next/link";
import { listPicsSlides, listSunglassesSlides, listJewelrySlides } from "@/lib/pics";
import HomeCoverflow from "@/components/home-coverflow";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://luxefinder.app/#organization",
      name: "LuxeFinder",
      alternateName: ["Luxe Finder", "luxefinder", "LuxeFinder.app"],
      url: "https://luxefinder.app",
      logo: "https://luxefinder.app/brand/logo.svg",
      description:
        "LuxeFinder aide à identifier un sac ou accessoire de luxe à partir d’une photo et à trouver des vendeurs selon un budget.",
    },
    {
      "@type": "WebSite",
      "@id": "https://luxefinder.app/#website",
      name: "LuxeFinder",
      alternateName: "Luxe Finder",
      url: "https://luxefinder.app",
      publisher: { "@id": "https://luxefinder.app/#organization" },
      inLanguage: "fr-FR",
    },
    {
      "@type": "WebApplication",
      name: "LuxeFinder",
      alternateName: "Luxe Finder",
      url: "https://luxefinder.app",
      applicationCategory: "ShoppingApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      description:
        "Photo d’un sac ou accessoire de luxe + budget → offres et vendeurs.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      publisher: { "@id": "https://luxefinder.app/#organization" },
    },
  ],
};

const SEO_LINKS = [
  { href: "/guide", label: "Guides" },
  { href: "/articles", label: "Articles" },
  { href: "/marques", label: "Marques" },
  { href: "/faq", label: "FAQ" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/a-propos", label: "À propos" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">
        LuxeFinder — envoyez une photo, indiquez votre budget, on trouve les vendeurs de sacs et
        accessoires de luxe
      </h1>
      <p className="sr-only">
        Application gratuite : identifiez un modèle à partir d’une photo, fixez un budget, comparez
        des pistes de vendeurs d’occasion et de luxe. Consultez aussi nos guides, articles et pages
        marques.
      </p>
      <HomeCoverflow
        bagSlides={bagSlides}
        sunglassesSlides={sunglassesSlides}
        jewelrySlides={jewelrySlides}
      />
      {/* Crawlable SEO footer — does not alter the fullscreen app chrome */}
      <nav
        aria-label="Liens utiles LuxeFinder"
        className="pointer-events-auto fixed inset-x-0 bottom-0 z-40 flex max-h-10 items-center justify-center gap-x-3 gap-y-1 overflow-hidden bg-white/90 px-3 py-1.5 text-[10px] font-medium tracking-wide text-black/45 backdrop-blur-md"
      >
        {SEO_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="shrink-0 hover:text-black/75">
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
