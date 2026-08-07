import { listPicsSlides } from "@/lib/pics";
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
      logo: "https://luxefinder.app/pics/item-01.jpg",
      description:
        "LuxeFinder (Luxe Finder) aide à identifier un sac de luxe à partir d’une photo et à trouver des vendeurs selon un budget.",
    },
    {
      "@type": "WebSite",
      "@id": "https://luxefinder.app/#website",
      name: "LuxeFinder",
      alternateName: "Luxe Finder",
      url: "https://luxefinder.app",
      publisher: { "@id": "https://luxefinder.app/#organization" },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://luxefinder.app/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
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
        "LuxeFinder (Luxe Finder) : photo d’un sac ou accessoire de luxe + budget → offres et vendeurs.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      publisher: { "@id": "https://luxefinder.app/#organization" },
    },
  ],
};

export default function HomePage() {
  const bagSlides = listPicsSlides();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* SSR H1 for SEO — visually hidden, UX unchanged */}
      <h1 className="sr-only">
        LuxeFinder (Luxe Finder) — envoyez une photo, indiquez votre budget, on trouve les vendeurs
        de sacs et accessoires de luxe sur luxefinder.app
      </h1>
      <HomeCoverflow bagSlides={bagSlides} />
    </>
  );
}
