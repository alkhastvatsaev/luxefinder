/** LuxeFinder — grey-zone LEGAL SEO batch (2026-08-09).
 *  Lexicon: budget / alternative / pas cher / trouver vendeur / occasion.
 *  FORBIDDEN: réplique, contrefaçon, fake, 1:1, Yupoo-buy tutorials.
 *  5 locales × 5 intents × 8 brands = 200 pages.
 */

type PageSection = { h2: string; body: string };
type SeoPage = {
  slug: string; title: string; h1: string; description: string;
  intent: "howto" | "brand" | "model" | "buy";
  intro: string; sections: PageSection[]; brands?: string[]; related: string[];
  locale?: string;
};

export const SEO_GREY_BATCH: SeoPage[] = [
  {
    slug: "gz-fr-budget-louis-vuitton",
    title: "Budget Louis Vuitton en France — cadrer le prix",
    h1: "Budget Louis Vuitton : chercher une offre réaliste",
    description: "Définir un budget Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) en France. Photo + fourchette → offres vendeurs avec LuxeFinder.",
    intent: "howto",
    intro: "En boutique, Louis Vuitton dépasse souvent le budget. En France, beaucoup cherchent une offre plus accessible : occasion, reprise, vendeurs. Partez d’un plafond clair et d’une photo du modèle (Neverfull, Speedy, Alma, Pochette Métis).",
    locale: "fr",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Fixer le plafond",
        body: "Incluez article + port + marge. Sans chiffre, chaque offre paraît « intéressante ».",
      },
      {
        h2: "Cadrer le modèle",
        body: "Nommez précisément Neverfull, Speedy, Alma, Pochette Métis. Une photo évite de comparer des pièces différentes.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez la photo, indiquez le budget : l’app remonte des pistes de vendeurs à comparer. LuxeFinder ne vend pas et n’authentifie pas.",
      },
    ],
    related: ["gz-fr-pas-cher-louis-vuitton", "gz-fr-trouver-vendeur-louis-vuitton", "gz-fr-occasion-louis-vuitton"],
  },
  {
    slug: "gz-fr-budget-hermes",
    title: "Budget Hermès en France — cadrer le prix",
    h1: "Budget Hermès : chercher une offre réaliste",
    description: "Définir un budget Hermès (Birkin, Kelly, Evelyne, Picotin) en France. Photo + fourchette → offres vendeurs avec LuxeFinder.",
    intent: "howto",
    intro: "En boutique, Hermès dépasse souvent le budget. En France, beaucoup cherchent une offre plus accessible : occasion, reprise, vendeurs. Partez d’un plafond clair et d’une photo du modèle (Birkin, Kelly, Evelyne, Picotin).",
    locale: "fr",
    brands: ["hermes"],
    sections: [
      {
        h2: "Fixer le plafond",
        body: "Incluez article + port + marge. Sans chiffre, chaque offre paraît « intéressante ».",
      },
      {
        h2: "Cadrer le modèle",
        body: "Nommez précisément Birkin, Kelly, Evelyne, Picotin. Une photo évite de comparer des pièces différentes.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez la photo, indiquez le budget : l’app remonte des pistes de vendeurs à comparer. LuxeFinder ne vend pas et n’authentifie pas.",
      },
    ],
    related: ["gz-fr-pas-cher-hermes", "gz-fr-trouver-vendeur-hermes", "gz-fr-occasion-hermes"],
  },
  {
    slug: "gz-fr-budget-chanel",
    title: "Budget Chanel en France — cadrer le prix",
    h1: "Budget Chanel : chercher une offre réaliste",
    description: "Définir un budget Chanel (Classic Flap, Boy, 19, WOC) en France. Photo + fourchette → offres vendeurs avec LuxeFinder.",
    intent: "howto",
    intro: "En boutique, Chanel dépasse souvent le budget. En France, beaucoup cherchent une offre plus accessible : occasion, reprise, vendeurs. Partez d’un plafond clair et d’une photo du modèle (Classic Flap, Boy, 19, WOC).",
    locale: "fr",
    brands: ["chanel"],
    sections: [
      {
        h2: "Fixer le plafond",
        body: "Incluez article + port + marge. Sans chiffre, chaque offre paraît « intéressante ».",
      },
      {
        h2: "Cadrer le modèle",
        body: "Nommez précisément Classic Flap, Boy, 19, WOC. Une photo évite de comparer des pièces différentes.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez la photo, indiquez le budget : l’app remonte des pistes de vendeurs à comparer. LuxeFinder ne vend pas et n’authentifie pas.",
      },
    ],
    related: ["gz-fr-pas-cher-chanel", "gz-fr-trouver-vendeur-chanel", "gz-fr-occasion-chanel"],
  },
  {
    slug: "gz-fr-budget-dior",
    title: "Budget Dior en France — cadrer le prix",
    h1: "Budget Dior : chercher une offre réaliste",
    description: "Définir un budget Dior (Book Tote, Saddle, Lady Dior) en France. Photo + fourchette → offres vendeurs avec LuxeFinder.",
    intent: "howto",
    intro: "En boutique, Dior dépasse souvent le budget. En France, beaucoup cherchent une offre plus accessible : occasion, reprise, vendeurs. Partez d’un plafond clair et d’une photo du modèle (Book Tote, Saddle, Lady Dior).",
    locale: "fr",
    brands: ["dior"],
    sections: [
      {
        h2: "Fixer le plafond",
        body: "Incluez article + port + marge. Sans chiffre, chaque offre paraît « intéressante ».",
      },
      {
        h2: "Cadrer le modèle",
        body: "Nommez précisément Book Tote, Saddle, Lady Dior. Une photo évite de comparer des pièces différentes.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez la photo, indiquez le budget : l’app remonte des pistes de vendeurs à comparer. LuxeFinder ne vend pas et n’authentifie pas.",
      },
    ],
    related: ["gz-fr-pas-cher-dior", "gz-fr-trouver-vendeur-dior", "gz-fr-occasion-dior"],
  },
  {
    slug: "gz-fr-budget-gucci",
    title: "Budget Gucci en France — cadrer le prix",
    h1: "Budget Gucci : chercher une offre réaliste",
    description: "Définir un budget Gucci (Jackie, Marmont, Ophidia) en France. Photo + fourchette → offres vendeurs avec LuxeFinder.",
    intent: "howto",
    intro: "En boutique, Gucci dépasse souvent le budget. En France, beaucoup cherchent une offre plus accessible : occasion, reprise, vendeurs. Partez d’un plafond clair et d’une photo du modèle (Jackie, Marmont, Ophidia).",
    locale: "fr",
    brands: ["gucci"],
    sections: [
      {
        h2: "Fixer le plafond",
        body: "Incluez article + port + marge. Sans chiffre, chaque offre paraît « intéressante ».",
      },
      {
        h2: "Cadrer le modèle",
        body: "Nommez précisément Jackie, Marmont, Ophidia. Une photo évite de comparer des pièces différentes.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez la photo, indiquez le budget : l’app remonte des pistes de vendeurs à comparer. LuxeFinder ne vend pas et n’authentifie pas.",
      },
    ],
    related: ["gz-fr-pas-cher-gucci", "gz-fr-trouver-vendeur-gucci", "gz-fr-occasion-gucci"],
  },
  {
    slug: "gz-fr-budget-saint-laurent",
    title: "Budget Saint Laurent en France — cadrer le prix",
    h1: "Budget Saint Laurent : chercher une offre réaliste",
    description: "Définir un budget Saint Laurent (Loulou, Niki, Sunset) en France. Photo + fourchette → offres vendeurs avec LuxeFinder.",
    intent: "howto",
    intro: "En boutique, Saint Laurent dépasse souvent le budget. En France, beaucoup cherchent une offre plus accessible : occasion, reprise, vendeurs. Partez d’un plafond clair et d’une photo du modèle (Loulou, Niki, Sunset).",
    locale: "fr",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Fixer le plafond",
        body: "Incluez article + port + marge. Sans chiffre, chaque offre paraît « intéressante ».",
      },
      {
        h2: "Cadrer le modèle",
        body: "Nommez précisément Loulou, Niki, Sunset. Une photo évite de comparer des pièces différentes.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez la photo, indiquez le budget : l’app remonte des pistes de vendeurs à comparer. LuxeFinder ne vend pas et n’authentifie pas.",
      },
    ],
    related: ["gz-fr-pas-cher-saint-laurent", "gz-fr-trouver-vendeur-saint-laurent", "gz-fr-occasion-saint-laurent"],
  },
  {
    slug: "gz-fr-budget-bottega-veneta",
    title: "Budget Bottega Veneta en France — cadrer le prix",
    h1: "Budget Bottega Veneta : chercher une offre réaliste",
    description: "Définir un budget Bottega Veneta (Jodie, Cassette) en France. Photo + fourchette → offres vendeurs avec LuxeFinder.",
    intent: "howto",
    intro: "En boutique, Bottega Veneta dépasse souvent le budget. En France, beaucoup cherchent une offre plus accessible : occasion, reprise, vendeurs. Partez d’un plafond clair et d’une photo du modèle (Jodie, Cassette).",
    locale: "fr",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Fixer le plafond",
        body: "Incluez article + port + marge. Sans chiffre, chaque offre paraît « intéressante ».",
      },
      {
        h2: "Cadrer le modèle",
        body: "Nommez précisément Jodie, Cassette. Une photo évite de comparer des pièces différentes.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez la photo, indiquez le budget : l’app remonte des pistes de vendeurs à comparer. LuxeFinder ne vend pas et n’authentifie pas.",
      },
    ],
    related: ["gz-fr-pas-cher-bottega-veneta", "gz-fr-trouver-vendeur-bottega-veneta", "gz-fr-occasion-bottega-veneta"],
  },
  {
    slug: "gz-fr-budget-cartier",
    title: "Budget Cartier en France — cadrer le prix",
    h1: "Budget Cartier : chercher une offre réaliste",
    description: "Définir un budget Cartier (Love, Juste un Clou) en France. Photo + fourchette → offres vendeurs avec LuxeFinder.",
    intent: "howto",
    intro: "En boutique, Cartier dépasse souvent le budget. En France, beaucoup cherchent une offre plus accessible : occasion, reprise, vendeurs. Partez d’un plafond clair et d’une photo du modèle (Love, Juste un Clou).",
    locale: "fr",
    brands: ["cartier"],
    sections: [
      {
        h2: "Fixer le plafond",
        body: "Incluez article + port + marge. Sans chiffre, chaque offre paraît « intéressante ».",
      },
      {
        h2: "Cadrer le modèle",
        body: "Nommez précisément Love, Juste un Clou. Une photo évite de comparer des pièces différentes.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez la photo, indiquez le budget : l’app remonte des pistes de vendeurs à comparer. LuxeFinder ne vend pas et n’authentifie pas.",
      },
    ],
    related: ["gz-fr-pas-cher-cartier", "gz-fr-trouver-vendeur-cartier", "gz-fr-occasion-cartier"],
  },
  {
    slug: "gz-fr-alternative-louis-vuitton",
    title: "Alternative Louis Vuitton — options à moindre coût (France)",
    h1: "Chercher une alternative à Louis Vuitton",
    description: "Alternative Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) en France : occasion, vendeurs, budgets. Méthode photo LuxeFinder.",
    intent: "howto",
    intro: "« Alternative Louis Vuitton » signifie souvent : même silhouette / usage pour moins cher — surtout en occasion ou via vendeurs. Pas un substitut officiel de la maison.",
    locale: "fr",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Ce que vous comparez",
        body: "Usage (quotidien, soirée), taille, état, prix total. Listez 2–3 options dont Neverfull, Speedy, Alma, Pochette Métis.",
      },
      {
        h2: "Preuves",
        body: "Photos récentes du lot, historique vendeur, conditions. Refusez la pression.",
      },
      {
        h2: "Passer à l’app",
        body: "Photo + budget sur LuxeFinder pour short-lister des offres. Aucune garantie d’authenticité automatique.",
      },
    ],
    related: ["gz-fr-budget-louis-vuitton", "gz-fr-occasion-louis-vuitton", "gz-fr-pas-cher-louis-vuitton"],
  },
  {
    slug: "gz-fr-alternative-hermes",
    title: "Alternative Hermès — options à moindre coût (France)",
    h1: "Chercher une alternative à Hermès",
    description: "Alternative Hermès (Birkin, Kelly, Evelyne, Picotin) en France : occasion, vendeurs, budgets. Méthode photo LuxeFinder.",
    intent: "howto",
    intro: "« Alternative Hermès » signifie souvent : même silhouette / usage pour moins cher — surtout en occasion ou via vendeurs. Pas un substitut officiel de la maison.",
    locale: "fr",
    brands: ["hermes"],
    sections: [
      {
        h2: "Ce que vous comparez",
        body: "Usage (quotidien, soirée), taille, état, prix total. Listez 2–3 options dont Birkin, Kelly, Evelyne, Picotin.",
      },
      {
        h2: "Preuves",
        body: "Photos récentes du lot, historique vendeur, conditions. Refusez la pression.",
      },
      {
        h2: "Passer à l’app",
        body: "Photo + budget sur LuxeFinder pour short-lister des offres. Aucune garantie d’authenticité automatique.",
      },
    ],
    related: ["gz-fr-budget-hermes", "gz-fr-occasion-hermes", "gz-fr-pas-cher-hermes"],
  },
  {
    slug: "gz-fr-alternative-chanel",
    title: "Alternative Chanel — options à moindre coût (France)",
    h1: "Chercher une alternative à Chanel",
    description: "Alternative Chanel (Classic Flap, Boy, 19, WOC) en France : occasion, vendeurs, budgets. Méthode photo LuxeFinder.",
    intent: "howto",
    intro: "« Alternative Chanel » signifie souvent : même silhouette / usage pour moins cher — surtout en occasion ou via vendeurs. Pas un substitut officiel de la maison.",
    locale: "fr",
    brands: ["chanel"],
    sections: [
      {
        h2: "Ce que vous comparez",
        body: "Usage (quotidien, soirée), taille, état, prix total. Listez 2–3 options dont Classic Flap, Boy, 19, WOC.",
      },
      {
        h2: "Preuves",
        body: "Photos récentes du lot, historique vendeur, conditions. Refusez la pression.",
      },
      {
        h2: "Passer à l’app",
        body: "Photo + budget sur LuxeFinder pour short-lister des offres. Aucune garantie d’authenticité automatique.",
      },
    ],
    related: ["gz-fr-budget-chanel", "gz-fr-occasion-chanel", "gz-fr-pas-cher-chanel"],
  },
  {
    slug: "gz-fr-alternative-dior",
    title: "Alternative Dior — options à moindre coût (France)",
    h1: "Chercher une alternative à Dior",
    description: "Alternative Dior (Book Tote, Saddle, Lady Dior) en France : occasion, vendeurs, budgets. Méthode photo LuxeFinder.",
    intent: "howto",
    intro: "« Alternative Dior » signifie souvent : même silhouette / usage pour moins cher — surtout en occasion ou via vendeurs. Pas un substitut officiel de la maison.",
    locale: "fr",
    brands: ["dior"],
    sections: [
      {
        h2: "Ce que vous comparez",
        body: "Usage (quotidien, soirée), taille, état, prix total. Listez 2–3 options dont Book Tote, Saddle, Lady Dior.",
      },
      {
        h2: "Preuves",
        body: "Photos récentes du lot, historique vendeur, conditions. Refusez la pression.",
      },
      {
        h2: "Passer à l’app",
        body: "Photo + budget sur LuxeFinder pour short-lister des offres. Aucune garantie d’authenticité automatique.",
      },
    ],
    related: ["gz-fr-budget-dior", "gz-fr-occasion-dior", "gz-fr-pas-cher-dior"],
  },
  {
    slug: "gz-fr-alternative-gucci",
    title: "Alternative Gucci — options à moindre coût (France)",
    h1: "Chercher une alternative à Gucci",
    description: "Alternative Gucci (Jackie, Marmont, Ophidia) en France : occasion, vendeurs, budgets. Méthode photo LuxeFinder.",
    intent: "howto",
    intro: "« Alternative Gucci » signifie souvent : même silhouette / usage pour moins cher — surtout en occasion ou via vendeurs. Pas un substitut officiel de la maison.",
    locale: "fr",
    brands: ["gucci"],
    sections: [
      {
        h2: "Ce que vous comparez",
        body: "Usage (quotidien, soirée), taille, état, prix total. Listez 2–3 options dont Jackie, Marmont, Ophidia.",
      },
      {
        h2: "Preuves",
        body: "Photos récentes du lot, historique vendeur, conditions. Refusez la pression.",
      },
      {
        h2: "Passer à l’app",
        body: "Photo + budget sur LuxeFinder pour short-lister des offres. Aucune garantie d’authenticité automatique.",
      },
    ],
    related: ["gz-fr-budget-gucci", "gz-fr-occasion-gucci", "gz-fr-pas-cher-gucci"],
  },
  {
    slug: "gz-fr-alternative-saint-laurent",
    title: "Alternative Saint Laurent — options à moindre coût (France)",
    h1: "Chercher une alternative à Saint Laurent",
    description: "Alternative Saint Laurent (Loulou, Niki, Sunset) en France : occasion, vendeurs, budgets. Méthode photo LuxeFinder.",
    intent: "howto",
    intro: "« Alternative Saint Laurent » signifie souvent : même silhouette / usage pour moins cher — surtout en occasion ou via vendeurs. Pas un substitut officiel de la maison.",
    locale: "fr",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Ce que vous comparez",
        body: "Usage (quotidien, soirée), taille, état, prix total. Listez 2–3 options dont Loulou, Niki, Sunset.",
      },
      {
        h2: "Preuves",
        body: "Photos récentes du lot, historique vendeur, conditions. Refusez la pression.",
      },
      {
        h2: "Passer à l’app",
        body: "Photo + budget sur LuxeFinder pour short-lister des offres. Aucune garantie d’authenticité automatique.",
      },
    ],
    related: ["gz-fr-budget-saint-laurent", "gz-fr-occasion-saint-laurent", "gz-fr-pas-cher-saint-laurent"],
  },
  {
    slug: "gz-fr-alternative-bottega-veneta",
    title: "Alternative Bottega Veneta — options à moindre coût (France)",
    h1: "Chercher une alternative à Bottega Veneta",
    description: "Alternative Bottega Veneta (Jodie, Cassette) en France : occasion, vendeurs, budgets. Méthode photo LuxeFinder.",
    intent: "howto",
    intro: "« Alternative Bottega Veneta » signifie souvent : même silhouette / usage pour moins cher — surtout en occasion ou via vendeurs. Pas un substitut officiel de la maison.",
    locale: "fr",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Ce que vous comparez",
        body: "Usage (quotidien, soirée), taille, état, prix total. Listez 2–3 options dont Jodie, Cassette.",
      },
      {
        h2: "Preuves",
        body: "Photos récentes du lot, historique vendeur, conditions. Refusez la pression.",
      },
      {
        h2: "Passer à l’app",
        body: "Photo + budget sur LuxeFinder pour short-lister des offres. Aucune garantie d’authenticité automatique.",
      },
    ],
    related: ["gz-fr-budget-bottega-veneta", "gz-fr-occasion-bottega-veneta", "gz-fr-pas-cher-bottega-veneta"],
  },
  {
    slug: "gz-fr-alternative-cartier",
    title: "Alternative Cartier — options à moindre coût (France)",
    h1: "Chercher une alternative à Cartier",
    description: "Alternative Cartier (Love, Juste un Clou) en France : occasion, vendeurs, budgets. Méthode photo LuxeFinder.",
    intent: "howto",
    intro: "« Alternative Cartier » signifie souvent : même silhouette / usage pour moins cher — surtout en occasion ou via vendeurs. Pas un substitut officiel de la maison.",
    locale: "fr",
    brands: ["cartier"],
    sections: [
      {
        h2: "Ce que vous comparez",
        body: "Usage (quotidien, soirée), taille, état, prix total. Listez 2–3 options dont Love, Juste un Clou.",
      },
      {
        h2: "Preuves",
        body: "Photos récentes du lot, historique vendeur, conditions. Refusez la pression.",
      },
      {
        h2: "Passer à l’app",
        body: "Photo + budget sur LuxeFinder pour short-lister des offres. Aucune garantie d’authenticité automatique.",
      },
    ],
    related: ["gz-fr-budget-cartier", "gz-fr-occasion-cartier", "gz-fr-pas-cher-cartier"],
  },
  {
    slug: "gz-fr-pas-cher-louis-vuitton",
    title: "Louis Vuitton pas cher en France — comment chercher",
    h1: "Louis Vuitton moins cher : méthode de recherche",
    description: "Louis Vuitton pas cher / moins cher (Neverfull, Speedy, Alma, Pochette Métis) en France : budget, occasion, vendeurs. Guide LuxeFinder.",
    intent: "buy",
    intro: "Les requêtes « Louis Vuitton pas cher » sont massives en France. Le piège : confondre prix bas et bonne affaire. Cadrez modèle, état et vendeur avant de payer.",
    locale: "fr",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Prix bas ≠ bonne affaire",
        body: "Vérifiez l’état, les frais, et la cohérence du catalogue. Un écart irréaliste mérite plus de preuves.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Photo du modèle (Neverfull, Speedy, Alma, Pochette Métis) 2) Budget 3) Comparer 2–3 offres 4) Échanges écrits.",
      },
      {
        h2: "LuxeFinder",
        body: "L’app oriente la chasse aux offres. LuxeFinder n’est pas une marketplace de stock et ne vend aucun article.",
      },
    ],
    related: ["gz-fr-budget-louis-vuitton", "gz-fr-alternative-louis-vuitton", "gz-fr-trouver-vendeur-louis-vuitton"],
  },
  {
    slug: "gz-fr-pas-cher-hermes",
    title: "Hermès pas cher en France — comment chercher",
    h1: "Hermès moins cher : méthode de recherche",
    description: "Hermès pas cher / moins cher (Birkin, Kelly, Evelyne, Picotin) en France : budget, occasion, vendeurs. Guide LuxeFinder.",
    intent: "buy",
    intro: "Les requêtes « Hermès pas cher » sont massives en France. Le piège : confondre prix bas et bonne affaire. Cadrez modèle, état et vendeur avant de payer.",
    locale: "fr",
    brands: ["hermes"],
    sections: [
      {
        h2: "Prix bas ≠ bonne affaire",
        body: "Vérifiez l’état, les frais, et la cohérence du catalogue. Un écart irréaliste mérite plus de preuves.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Photo du modèle (Birkin, Kelly, Evelyne, Picotin) 2) Budget 3) Comparer 2–3 offres 4) Échanges écrits.",
      },
      {
        h2: "LuxeFinder",
        body: "L’app oriente la chasse aux offres. LuxeFinder n’est pas une marketplace de stock et ne vend aucun article.",
      },
    ],
    related: ["gz-fr-budget-hermes", "gz-fr-alternative-hermes", "gz-fr-trouver-vendeur-hermes"],
  },
  {
    slug: "gz-fr-pas-cher-chanel",
    title: "Chanel pas cher en France — comment chercher",
    h1: "Chanel moins cher : méthode de recherche",
    description: "Chanel pas cher / moins cher (Classic Flap, Boy, 19, WOC) en France : budget, occasion, vendeurs. Guide LuxeFinder.",
    intent: "buy",
    intro: "Les requêtes « Chanel pas cher » sont massives en France. Le piège : confondre prix bas et bonne affaire. Cadrez modèle, état et vendeur avant de payer.",
    locale: "fr",
    brands: ["chanel"],
    sections: [
      {
        h2: "Prix bas ≠ bonne affaire",
        body: "Vérifiez l’état, les frais, et la cohérence du catalogue. Un écart irréaliste mérite plus de preuves.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Photo du modèle (Classic Flap, Boy, 19, WOC) 2) Budget 3) Comparer 2–3 offres 4) Échanges écrits.",
      },
      {
        h2: "LuxeFinder",
        body: "L’app oriente la chasse aux offres. LuxeFinder n’est pas une marketplace de stock et ne vend aucun article.",
      },
    ],
    related: ["gz-fr-budget-chanel", "gz-fr-alternative-chanel", "gz-fr-trouver-vendeur-chanel"],
  },
  {
    slug: "gz-fr-pas-cher-dior",
    title: "Dior pas cher en France — comment chercher",
    h1: "Dior moins cher : méthode de recherche",
    description: "Dior pas cher / moins cher (Book Tote, Saddle, Lady Dior) en France : budget, occasion, vendeurs. Guide LuxeFinder.",
    intent: "buy",
    intro: "Les requêtes « Dior pas cher » sont massives en France. Le piège : confondre prix bas et bonne affaire. Cadrez modèle, état et vendeur avant de payer.",
    locale: "fr",
    brands: ["dior"],
    sections: [
      {
        h2: "Prix bas ≠ bonne affaire",
        body: "Vérifiez l’état, les frais, et la cohérence du catalogue. Un écart irréaliste mérite plus de preuves.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Photo du modèle (Book Tote, Saddle, Lady Dior) 2) Budget 3) Comparer 2–3 offres 4) Échanges écrits.",
      },
      {
        h2: "LuxeFinder",
        body: "L’app oriente la chasse aux offres. LuxeFinder n’est pas une marketplace de stock et ne vend aucun article.",
      },
    ],
    related: ["gz-fr-budget-dior", "gz-fr-alternative-dior", "gz-fr-trouver-vendeur-dior"],
  },
  {
    slug: "gz-fr-pas-cher-gucci",
    title: "Gucci pas cher en France — comment chercher",
    h1: "Gucci moins cher : méthode de recherche",
    description: "Gucci pas cher / moins cher (Jackie, Marmont, Ophidia) en France : budget, occasion, vendeurs. Guide LuxeFinder.",
    intent: "buy",
    intro: "Les requêtes « Gucci pas cher » sont massives en France. Le piège : confondre prix bas et bonne affaire. Cadrez modèle, état et vendeur avant de payer.",
    locale: "fr",
    brands: ["gucci"],
    sections: [
      {
        h2: "Prix bas ≠ bonne affaire",
        body: "Vérifiez l’état, les frais, et la cohérence du catalogue. Un écart irréaliste mérite plus de preuves.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Photo du modèle (Jackie, Marmont, Ophidia) 2) Budget 3) Comparer 2–3 offres 4) Échanges écrits.",
      },
      {
        h2: "LuxeFinder",
        body: "L’app oriente la chasse aux offres. LuxeFinder n’est pas une marketplace de stock et ne vend aucun article.",
      },
    ],
    related: ["gz-fr-budget-gucci", "gz-fr-alternative-gucci", "gz-fr-trouver-vendeur-gucci"],
  },
  {
    slug: "gz-fr-pas-cher-saint-laurent",
    title: "Saint Laurent pas cher en France — comment chercher",
    h1: "Saint Laurent moins cher : méthode de recherche",
    description: "Saint Laurent pas cher / moins cher (Loulou, Niki, Sunset) en France : budget, occasion, vendeurs. Guide LuxeFinder.",
    intent: "buy",
    intro: "Les requêtes « Saint Laurent pas cher » sont massives en France. Le piège : confondre prix bas et bonne affaire. Cadrez modèle, état et vendeur avant de payer.",
    locale: "fr",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Prix bas ≠ bonne affaire",
        body: "Vérifiez l’état, les frais, et la cohérence du catalogue. Un écart irréaliste mérite plus de preuves.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Photo du modèle (Loulou, Niki, Sunset) 2) Budget 3) Comparer 2–3 offres 4) Échanges écrits.",
      },
      {
        h2: "LuxeFinder",
        body: "L’app oriente la chasse aux offres. LuxeFinder n’est pas une marketplace de stock et ne vend aucun article.",
      },
    ],
    related: ["gz-fr-budget-saint-laurent", "gz-fr-alternative-saint-laurent", "gz-fr-trouver-vendeur-saint-laurent"],
  },
  {
    slug: "gz-fr-pas-cher-bottega-veneta",
    title: "Bottega Veneta pas cher en France — comment chercher",
    h1: "Bottega Veneta moins cher : méthode de recherche",
    description: "Bottega Veneta pas cher / moins cher (Jodie, Cassette) en France : budget, occasion, vendeurs. Guide LuxeFinder.",
    intent: "buy",
    intro: "Les requêtes « Bottega Veneta pas cher » sont massives en France. Le piège : confondre prix bas et bonne affaire. Cadrez modèle, état et vendeur avant de payer.",
    locale: "fr",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Prix bas ≠ bonne affaire",
        body: "Vérifiez l’état, les frais, et la cohérence du catalogue. Un écart irréaliste mérite plus de preuves.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Photo du modèle (Jodie, Cassette) 2) Budget 3) Comparer 2–3 offres 4) Échanges écrits.",
      },
      {
        h2: "LuxeFinder",
        body: "L’app oriente la chasse aux offres. LuxeFinder n’est pas une marketplace de stock et ne vend aucun article.",
      },
    ],
    related: ["gz-fr-budget-bottega-veneta", "gz-fr-alternative-bottega-veneta", "gz-fr-trouver-vendeur-bottega-veneta"],
  },
  {
    slug: "gz-fr-pas-cher-cartier",
    title: "Cartier pas cher en France — comment chercher",
    h1: "Cartier moins cher : méthode de recherche",
    description: "Cartier pas cher / moins cher (Love, Juste un Clou) en France : budget, occasion, vendeurs. Guide LuxeFinder.",
    intent: "buy",
    intro: "Les requêtes « Cartier pas cher » sont massives en France. Le piège : confondre prix bas et bonne affaire. Cadrez modèle, état et vendeur avant de payer.",
    locale: "fr",
    brands: ["cartier"],
    sections: [
      {
        h2: "Prix bas ≠ bonne affaire",
        body: "Vérifiez l’état, les frais, et la cohérence du catalogue. Un écart irréaliste mérite plus de preuves.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Photo du modèle (Love, Juste un Clou) 2) Budget 3) Comparer 2–3 offres 4) Échanges écrits.",
      },
      {
        h2: "LuxeFinder",
        body: "L’app oriente la chasse aux offres. LuxeFinder n’est pas une marketplace de stock et ne vend aucun article.",
      },
    ],
    related: ["gz-fr-budget-cartier", "gz-fr-alternative-cartier", "gz-fr-trouver-vendeur-cartier"],
  },
  {
    slug: "gz-fr-trouver-vendeur-louis-vuitton",
    title: "Trouver un vendeur Louis Vuitton en France",
    h1: "Trouver un vendeur pour Louis Vuitton",
    description: "Trouver un vendeur Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) en France : photo, budget, comparaison d’offres avec LuxeFinder.",
    intent: "buy",
    intro: "Trouver un vendeur Louis Vuitton sérieux prend du temps. En France, partez du modèle (Neverfull, Speedy, Alma, Pochette Métis), d’un budget, puis d’une short-list d’offres — pas d’un seul contact.",
    locale: "fr",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Photo face + détails. Sans nom clair, les vendeurs proposent à côté.",
      },
      {
        h2: "Filtrer",
        body: "Prix total, photos du lot, délai, mode de paiement. Red flags : urgence, refus de preuves.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → pistes. Vous restez responsable du choix final du vendeur.",
      },
    ],
    related: ["gz-fr-budget-louis-vuitton", "gz-fr-pas-cher-louis-vuitton", "gz-fr-occasion-louis-vuitton"],
  },
  {
    slug: "gz-fr-trouver-vendeur-hermes",
    title: "Trouver un vendeur Hermès en France",
    h1: "Trouver un vendeur pour Hermès",
    description: "Trouver un vendeur Hermès (Birkin, Kelly, Evelyne, Picotin) en France : photo, budget, comparaison d’offres avec LuxeFinder.",
    intent: "buy",
    intro: "Trouver un vendeur Hermès sérieux prend du temps. En France, partez du modèle (Birkin, Kelly, Evelyne, Picotin), d’un budget, puis d’une short-list d’offres — pas d’un seul contact.",
    locale: "fr",
    brands: ["hermes"],
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Photo face + détails. Sans nom clair, les vendeurs proposent à côté.",
      },
      {
        h2: "Filtrer",
        body: "Prix total, photos du lot, délai, mode de paiement. Red flags : urgence, refus de preuves.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → pistes. Vous restez responsable du choix final du vendeur.",
      },
    ],
    related: ["gz-fr-budget-hermes", "gz-fr-pas-cher-hermes", "gz-fr-occasion-hermes"],
  },
  {
    slug: "gz-fr-trouver-vendeur-chanel",
    title: "Trouver un vendeur Chanel en France",
    h1: "Trouver un vendeur pour Chanel",
    description: "Trouver un vendeur Chanel (Classic Flap, Boy, 19, WOC) en France : photo, budget, comparaison d’offres avec LuxeFinder.",
    intent: "buy",
    intro: "Trouver un vendeur Chanel sérieux prend du temps. En France, partez du modèle (Classic Flap, Boy, 19, WOC), d’un budget, puis d’une short-list d’offres — pas d’un seul contact.",
    locale: "fr",
    brands: ["chanel"],
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Photo face + détails. Sans nom clair, les vendeurs proposent à côté.",
      },
      {
        h2: "Filtrer",
        body: "Prix total, photos du lot, délai, mode de paiement. Red flags : urgence, refus de preuves.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → pistes. Vous restez responsable du choix final du vendeur.",
      },
    ],
    related: ["gz-fr-budget-chanel", "gz-fr-pas-cher-chanel", "gz-fr-occasion-chanel"],
  },
  {
    slug: "gz-fr-trouver-vendeur-dior",
    title: "Trouver un vendeur Dior en France",
    h1: "Trouver un vendeur pour Dior",
    description: "Trouver un vendeur Dior (Book Tote, Saddle, Lady Dior) en France : photo, budget, comparaison d’offres avec LuxeFinder.",
    intent: "buy",
    intro: "Trouver un vendeur Dior sérieux prend du temps. En France, partez du modèle (Book Tote, Saddle, Lady Dior), d’un budget, puis d’une short-list d’offres — pas d’un seul contact.",
    locale: "fr",
    brands: ["dior"],
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Photo face + détails. Sans nom clair, les vendeurs proposent à côté.",
      },
      {
        h2: "Filtrer",
        body: "Prix total, photos du lot, délai, mode de paiement. Red flags : urgence, refus de preuves.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → pistes. Vous restez responsable du choix final du vendeur.",
      },
    ],
    related: ["gz-fr-budget-dior", "gz-fr-pas-cher-dior", "gz-fr-occasion-dior"],
  },
  {
    slug: "gz-fr-trouver-vendeur-gucci",
    title: "Trouver un vendeur Gucci en France",
    h1: "Trouver un vendeur pour Gucci",
    description: "Trouver un vendeur Gucci (Jackie, Marmont, Ophidia) en France : photo, budget, comparaison d’offres avec LuxeFinder.",
    intent: "buy",
    intro: "Trouver un vendeur Gucci sérieux prend du temps. En France, partez du modèle (Jackie, Marmont, Ophidia), d’un budget, puis d’une short-list d’offres — pas d’un seul contact.",
    locale: "fr",
    brands: ["gucci"],
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Photo face + détails. Sans nom clair, les vendeurs proposent à côté.",
      },
      {
        h2: "Filtrer",
        body: "Prix total, photos du lot, délai, mode de paiement. Red flags : urgence, refus de preuves.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → pistes. Vous restez responsable du choix final du vendeur.",
      },
    ],
    related: ["gz-fr-budget-gucci", "gz-fr-pas-cher-gucci", "gz-fr-occasion-gucci"],
  },
  {
    slug: "gz-fr-trouver-vendeur-saint-laurent",
    title: "Trouver un vendeur Saint Laurent en France",
    h1: "Trouver un vendeur pour Saint Laurent",
    description: "Trouver un vendeur Saint Laurent (Loulou, Niki, Sunset) en France : photo, budget, comparaison d’offres avec LuxeFinder.",
    intent: "buy",
    intro: "Trouver un vendeur Saint Laurent sérieux prend du temps. En France, partez du modèle (Loulou, Niki, Sunset), d’un budget, puis d’une short-list d’offres — pas d’un seul contact.",
    locale: "fr",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Photo face + détails. Sans nom clair, les vendeurs proposent à côté.",
      },
      {
        h2: "Filtrer",
        body: "Prix total, photos du lot, délai, mode de paiement. Red flags : urgence, refus de preuves.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → pistes. Vous restez responsable du choix final du vendeur.",
      },
    ],
    related: ["gz-fr-budget-saint-laurent", "gz-fr-pas-cher-saint-laurent", "gz-fr-occasion-saint-laurent"],
  },
  {
    slug: "gz-fr-trouver-vendeur-bottega-veneta",
    title: "Trouver un vendeur Bottega Veneta en France",
    h1: "Trouver un vendeur pour Bottega Veneta",
    description: "Trouver un vendeur Bottega Veneta (Jodie, Cassette) en France : photo, budget, comparaison d’offres avec LuxeFinder.",
    intent: "buy",
    intro: "Trouver un vendeur Bottega Veneta sérieux prend du temps. En France, partez du modèle (Jodie, Cassette), d’un budget, puis d’une short-list d’offres — pas d’un seul contact.",
    locale: "fr",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Photo face + détails. Sans nom clair, les vendeurs proposent à côté.",
      },
      {
        h2: "Filtrer",
        body: "Prix total, photos du lot, délai, mode de paiement. Red flags : urgence, refus de preuves.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → pistes. Vous restez responsable du choix final du vendeur.",
      },
    ],
    related: ["gz-fr-budget-bottega-veneta", "gz-fr-pas-cher-bottega-veneta", "gz-fr-occasion-bottega-veneta"],
  },
  {
    slug: "gz-fr-trouver-vendeur-cartier",
    title: "Trouver un vendeur Cartier en France",
    h1: "Trouver un vendeur pour Cartier",
    description: "Trouver un vendeur Cartier (Love, Juste un Clou) en France : photo, budget, comparaison d’offres avec LuxeFinder.",
    intent: "buy",
    intro: "Trouver un vendeur Cartier sérieux prend du temps. En France, partez du modèle (Love, Juste un Clou), d’un budget, puis d’une short-list d’offres — pas d’un seul contact.",
    locale: "fr",
    brands: ["cartier"],
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Photo face + détails. Sans nom clair, les vendeurs proposent à côté.",
      },
      {
        h2: "Filtrer",
        body: "Prix total, photos du lot, délai, mode de paiement. Red flags : urgence, refus de preuves.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → pistes. Vous restez responsable du choix final du vendeur.",
      },
    ],
    related: ["gz-fr-budget-cartier", "gz-fr-pas-cher-cartier", "gz-fr-occasion-cartier"],
  },
  {
    slug: "gz-fr-occasion-louis-vuitton",
    title: "Louis Vuitton occasion France — guide acheteur",
    h1: "Louis Vuitton d’occasion : chercher la bonne offre",
    description: "Louis Vuitton occasion (Neverfull, Speedy, Alma, Pochette Métis) en France : état, prix, vendeurs. Puis LuxeFinder photo + budget.",
    intent: "buy",
    intro: "L’occasion Louis Vuitton est le levier n°1 pour un prix plus bas en France. Cadrez l’état et le modèle (Neverfull, Speedy, Alma, Pochette Métis) avant de négocier.",
    locale: "fr",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "État",
        body: "Coins, anses, intérieur, hardware. Demandez des macros du lot réel.",
      },
      {
        h2: "Prix",
        body: "Comparez plusieurs annonces pour le même format avant d’accepter.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour confirmer le modèle, puis comparez les pistes d’offres.",
      },
    ],
    related: ["gz-fr-budget-louis-vuitton", "gz-fr-alternative-louis-vuitton", "gz-fr-trouver-vendeur-louis-vuitton"],
  },
  {
    slug: "gz-fr-occasion-hermes",
    title: "Hermès occasion France — guide acheteur",
    h1: "Hermès d’occasion : chercher la bonne offre",
    description: "Hermès occasion (Birkin, Kelly, Evelyne, Picotin) en France : état, prix, vendeurs. Puis LuxeFinder photo + budget.",
    intent: "buy",
    intro: "L’occasion Hermès est le levier n°1 pour un prix plus bas en France. Cadrez l’état et le modèle (Birkin, Kelly, Evelyne, Picotin) avant de négocier.",
    locale: "fr",
    brands: ["hermes"],
    sections: [
      {
        h2: "État",
        body: "Coins, anses, intérieur, hardware. Demandez des macros du lot réel.",
      },
      {
        h2: "Prix",
        body: "Comparez plusieurs annonces pour le même format avant d’accepter.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour confirmer le modèle, puis comparez les pistes d’offres.",
      },
    ],
    related: ["gz-fr-budget-hermes", "gz-fr-alternative-hermes", "gz-fr-trouver-vendeur-hermes"],
  },
  {
    slug: "gz-fr-occasion-chanel",
    title: "Chanel occasion France — guide acheteur",
    h1: "Chanel d’occasion : chercher la bonne offre",
    description: "Chanel occasion (Classic Flap, Boy, 19, WOC) en France : état, prix, vendeurs. Puis LuxeFinder photo + budget.",
    intent: "buy",
    intro: "L’occasion Chanel est le levier n°1 pour un prix plus bas en France. Cadrez l’état et le modèle (Classic Flap, Boy, 19, WOC) avant de négocier.",
    locale: "fr",
    brands: ["chanel"],
    sections: [
      {
        h2: "État",
        body: "Coins, anses, intérieur, hardware. Demandez des macros du lot réel.",
      },
      {
        h2: "Prix",
        body: "Comparez plusieurs annonces pour le même format avant d’accepter.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour confirmer le modèle, puis comparez les pistes d’offres.",
      },
    ],
    related: ["gz-fr-budget-chanel", "gz-fr-alternative-chanel", "gz-fr-trouver-vendeur-chanel"],
  },
  {
    slug: "gz-fr-occasion-dior",
    title: "Dior occasion France — guide acheteur",
    h1: "Dior d’occasion : chercher la bonne offre",
    description: "Dior occasion (Book Tote, Saddle, Lady Dior) en France : état, prix, vendeurs. Puis LuxeFinder photo + budget.",
    intent: "buy",
    intro: "L’occasion Dior est le levier n°1 pour un prix plus bas en France. Cadrez l’état et le modèle (Book Tote, Saddle, Lady Dior) avant de négocier.",
    locale: "fr",
    brands: ["dior"],
    sections: [
      {
        h2: "État",
        body: "Coins, anses, intérieur, hardware. Demandez des macros du lot réel.",
      },
      {
        h2: "Prix",
        body: "Comparez plusieurs annonces pour le même format avant d’accepter.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour confirmer le modèle, puis comparez les pistes d’offres.",
      },
    ],
    related: ["gz-fr-budget-dior", "gz-fr-alternative-dior", "gz-fr-trouver-vendeur-dior"],
  },
  {
    slug: "gz-fr-occasion-gucci",
    title: "Gucci occasion France — guide acheteur",
    h1: "Gucci d’occasion : chercher la bonne offre",
    description: "Gucci occasion (Jackie, Marmont, Ophidia) en France : état, prix, vendeurs. Puis LuxeFinder photo + budget.",
    intent: "buy",
    intro: "L’occasion Gucci est le levier n°1 pour un prix plus bas en France. Cadrez l’état et le modèle (Jackie, Marmont, Ophidia) avant de négocier.",
    locale: "fr",
    brands: ["gucci"],
    sections: [
      {
        h2: "État",
        body: "Coins, anses, intérieur, hardware. Demandez des macros du lot réel.",
      },
      {
        h2: "Prix",
        body: "Comparez plusieurs annonces pour le même format avant d’accepter.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour confirmer le modèle, puis comparez les pistes d’offres.",
      },
    ],
    related: ["gz-fr-budget-gucci", "gz-fr-alternative-gucci", "gz-fr-trouver-vendeur-gucci"],
  },
  {
    slug: "gz-fr-occasion-saint-laurent",
    title: "Saint Laurent occasion France — guide acheteur",
    h1: "Saint Laurent d’occasion : chercher la bonne offre",
    description: "Saint Laurent occasion (Loulou, Niki, Sunset) en France : état, prix, vendeurs. Puis LuxeFinder photo + budget.",
    intent: "buy",
    intro: "L’occasion Saint Laurent est le levier n°1 pour un prix plus bas en France. Cadrez l’état et le modèle (Loulou, Niki, Sunset) avant de négocier.",
    locale: "fr",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "État",
        body: "Coins, anses, intérieur, hardware. Demandez des macros du lot réel.",
      },
      {
        h2: "Prix",
        body: "Comparez plusieurs annonces pour le même format avant d’accepter.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour confirmer le modèle, puis comparez les pistes d’offres.",
      },
    ],
    related: ["gz-fr-budget-saint-laurent", "gz-fr-alternative-saint-laurent", "gz-fr-trouver-vendeur-saint-laurent"],
  },
  {
    slug: "gz-fr-occasion-bottega-veneta",
    title: "Bottega Veneta occasion France — guide acheteur",
    h1: "Bottega Veneta d’occasion : chercher la bonne offre",
    description: "Bottega Veneta occasion (Jodie, Cassette) en France : état, prix, vendeurs. Puis LuxeFinder photo + budget.",
    intent: "buy",
    intro: "L’occasion Bottega Veneta est le levier n°1 pour un prix plus bas en France. Cadrez l’état et le modèle (Jodie, Cassette) avant de négocier.",
    locale: "fr",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "État",
        body: "Coins, anses, intérieur, hardware. Demandez des macros du lot réel.",
      },
      {
        h2: "Prix",
        body: "Comparez plusieurs annonces pour le même format avant d’accepter.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour confirmer le modèle, puis comparez les pistes d’offres.",
      },
    ],
    related: ["gz-fr-budget-bottega-veneta", "gz-fr-alternative-bottega-veneta", "gz-fr-trouver-vendeur-bottega-veneta"],
  },
  {
    slug: "gz-fr-occasion-cartier",
    title: "Cartier occasion France — guide acheteur",
    h1: "Cartier d’occasion : chercher la bonne offre",
    description: "Cartier occasion (Love, Juste un Clou) en France : état, prix, vendeurs. Puis LuxeFinder photo + budget.",
    intent: "buy",
    intro: "L’occasion Cartier est le levier n°1 pour un prix plus bas en France. Cadrez l’état et le modèle (Love, Juste un Clou) avant de négocier.",
    locale: "fr",
    brands: ["cartier"],
    sections: [
      {
        h2: "État",
        body: "Coins, anses, intérieur, hardware. Demandez des macros du lot réel.",
      },
      {
        h2: "Prix",
        body: "Comparez plusieurs annonces pour le même format avant d’accepter.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour confirmer le modèle, puis comparez les pistes d’offres.",
      },
    ],
    related: ["gz-fr-budget-cartier", "gz-fr-alternative-cartier", "gz-fr-trouver-vendeur-cartier"],
  },
  {
    slug: "gz-de-budget-louis-vuitton",
    title: "Louis Vuitton Budget Deutschland",
    h1: "Louis Vuitton-Budget realistisch setzen",
    description: "Budget für Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in Deutschland. Foto + Preisrahmen → Anbieter-Spuren mit LuxeFinder.",
    intent: "howto",
    intro: "Neu ist Louis Vuitton oft zu teuer. In Deutschland suchen viele günstigere Angebote (Second Hand, Händler). Starten Sie mit Budget und Foto (Neverfull, Speedy, Alma, Pochette Métis).",
    locale: "de",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Deckel festlegen",
        body: "Artikel + Versand + Puffer.",
      },
      {
        h2: "Modell klären",
        body: "Genau Neverfull, Speedy, Alma, Pochette Métis benennen — Foto hilft.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget hochladen. LuxeFinder verkauft nicht und authentifiziert nicht automatisch.",
      },
    ],
    related: ["gz-de-pas-cher-louis-vuitton", "gz-de-trouver-vendeur-louis-vuitton", "gz-fr-budget-louis-vuitton"],
  },
  {
    slug: "gz-de-budget-hermes",
    title: "Hermès Budget Deutschland",
    h1: "Hermès-Budget realistisch setzen",
    description: "Budget für Hermès (Birkin, Kelly, Evelyne, Picotin) in Deutschland. Foto + Preisrahmen → Anbieter-Spuren mit LuxeFinder.",
    intent: "howto",
    intro: "Neu ist Hermès oft zu teuer. In Deutschland suchen viele günstigere Angebote (Second Hand, Händler). Starten Sie mit Budget und Foto (Birkin, Kelly, Evelyne, Picotin).",
    locale: "de",
    brands: ["hermes"],
    sections: [
      {
        h2: "Deckel festlegen",
        body: "Artikel + Versand + Puffer.",
      },
      {
        h2: "Modell klären",
        body: "Genau Birkin, Kelly, Evelyne, Picotin benennen — Foto hilft.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget hochladen. LuxeFinder verkauft nicht und authentifiziert nicht automatisch.",
      },
    ],
    related: ["gz-de-pas-cher-hermes", "gz-de-trouver-vendeur-hermes", "gz-fr-budget-hermes"],
  },
  {
    slug: "gz-de-budget-chanel",
    title: "Chanel Budget Deutschland",
    h1: "Chanel-Budget realistisch setzen",
    description: "Budget für Chanel (Classic Flap, Boy, 19, WOC) in Deutschland. Foto + Preisrahmen → Anbieter-Spuren mit LuxeFinder.",
    intent: "howto",
    intro: "Neu ist Chanel oft zu teuer. In Deutschland suchen viele günstigere Angebote (Second Hand, Händler). Starten Sie mit Budget und Foto (Classic Flap, Boy, 19, WOC).",
    locale: "de",
    brands: ["chanel"],
    sections: [
      {
        h2: "Deckel festlegen",
        body: "Artikel + Versand + Puffer.",
      },
      {
        h2: "Modell klären",
        body: "Genau Classic Flap, Boy, 19, WOC benennen — Foto hilft.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget hochladen. LuxeFinder verkauft nicht und authentifiziert nicht automatisch.",
      },
    ],
    related: ["gz-de-pas-cher-chanel", "gz-de-trouver-vendeur-chanel", "gz-fr-budget-chanel"],
  },
  {
    slug: "gz-de-budget-dior",
    title: "Dior Budget Deutschland",
    h1: "Dior-Budget realistisch setzen",
    description: "Budget für Dior (Book Tote, Saddle, Lady Dior) in Deutschland. Foto + Preisrahmen → Anbieter-Spuren mit LuxeFinder.",
    intent: "howto",
    intro: "Neu ist Dior oft zu teuer. In Deutschland suchen viele günstigere Angebote (Second Hand, Händler). Starten Sie mit Budget und Foto (Book Tote, Saddle, Lady Dior).",
    locale: "de",
    brands: ["dior"],
    sections: [
      {
        h2: "Deckel festlegen",
        body: "Artikel + Versand + Puffer.",
      },
      {
        h2: "Modell klären",
        body: "Genau Book Tote, Saddle, Lady Dior benennen — Foto hilft.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget hochladen. LuxeFinder verkauft nicht und authentifiziert nicht automatisch.",
      },
    ],
    related: ["gz-de-pas-cher-dior", "gz-de-trouver-vendeur-dior", "gz-fr-budget-dior"],
  },
  {
    slug: "gz-de-budget-gucci",
    title: "Gucci Budget Deutschland",
    h1: "Gucci-Budget realistisch setzen",
    description: "Budget für Gucci (Jackie, Marmont, Ophidia) in Deutschland. Foto + Preisrahmen → Anbieter-Spuren mit LuxeFinder.",
    intent: "howto",
    intro: "Neu ist Gucci oft zu teuer. In Deutschland suchen viele günstigere Angebote (Second Hand, Händler). Starten Sie mit Budget und Foto (Jackie, Marmont, Ophidia).",
    locale: "de",
    brands: ["gucci"],
    sections: [
      {
        h2: "Deckel festlegen",
        body: "Artikel + Versand + Puffer.",
      },
      {
        h2: "Modell klären",
        body: "Genau Jackie, Marmont, Ophidia benennen — Foto hilft.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget hochladen. LuxeFinder verkauft nicht und authentifiziert nicht automatisch.",
      },
    ],
    related: ["gz-de-pas-cher-gucci", "gz-de-trouver-vendeur-gucci", "gz-fr-budget-gucci"],
  },
  {
    slug: "gz-de-budget-saint-laurent",
    title: "Saint Laurent Budget Deutschland",
    h1: "Saint Laurent-Budget realistisch setzen",
    description: "Budget für Saint Laurent (Loulou, Niki, Sunset) in Deutschland. Foto + Preisrahmen → Anbieter-Spuren mit LuxeFinder.",
    intent: "howto",
    intro: "Neu ist Saint Laurent oft zu teuer. In Deutschland suchen viele günstigere Angebote (Second Hand, Händler). Starten Sie mit Budget und Foto (Loulou, Niki, Sunset).",
    locale: "de",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Deckel festlegen",
        body: "Artikel + Versand + Puffer.",
      },
      {
        h2: "Modell klären",
        body: "Genau Loulou, Niki, Sunset benennen — Foto hilft.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget hochladen. LuxeFinder verkauft nicht und authentifiziert nicht automatisch.",
      },
    ],
    related: ["gz-de-pas-cher-saint-laurent", "gz-de-trouver-vendeur-saint-laurent", "gz-fr-budget-saint-laurent"],
  },
  {
    slug: "gz-de-budget-bottega-veneta",
    title: "Bottega Veneta Budget Deutschland",
    h1: "Bottega Veneta-Budget realistisch setzen",
    description: "Budget für Bottega Veneta (Jodie, Cassette) in Deutschland. Foto + Preisrahmen → Anbieter-Spuren mit LuxeFinder.",
    intent: "howto",
    intro: "Neu ist Bottega Veneta oft zu teuer. In Deutschland suchen viele günstigere Angebote (Second Hand, Händler). Starten Sie mit Budget und Foto (Jodie, Cassette).",
    locale: "de",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Deckel festlegen",
        body: "Artikel + Versand + Puffer.",
      },
      {
        h2: "Modell klären",
        body: "Genau Jodie, Cassette benennen — Foto hilft.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget hochladen. LuxeFinder verkauft nicht und authentifiziert nicht automatisch.",
      },
    ],
    related: ["gz-de-pas-cher-bottega-veneta", "gz-de-trouver-vendeur-bottega-veneta", "gz-fr-budget-bottega-veneta"],
  },
  {
    slug: "gz-de-budget-cartier",
    title: "Cartier Budget Deutschland",
    h1: "Cartier-Budget realistisch setzen",
    description: "Budget für Cartier (Love, Juste un Clou) in Deutschland. Foto + Preisrahmen → Anbieter-Spuren mit LuxeFinder.",
    intent: "howto",
    intro: "Neu ist Cartier oft zu teuer. In Deutschland suchen viele günstigere Angebote (Second Hand, Händler). Starten Sie mit Budget und Foto (Love, Juste un Clou).",
    locale: "de",
    brands: ["cartier"],
    sections: [
      {
        h2: "Deckel festlegen",
        body: "Artikel + Versand + Puffer.",
      },
      {
        h2: "Modell klären",
        body: "Genau Love, Juste un Clou benennen — Foto hilft.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget hochladen. LuxeFinder verkauft nicht und authentifiziert nicht automatisch.",
      },
    ],
    related: ["gz-de-pas-cher-cartier", "gz-de-trouver-vendeur-cartier", "gz-fr-budget-cartier"],
  },
  {
    slug: "gz-de-alternative-louis-vuitton",
    title: "Alternative zu Louis Vuitton (Deutschland)",
    h1: "Alternative zu Louis Vuitton finden",
    description: "Alternative zu Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in Deutschland: Second Hand, Budgets, Verkäufer. LuxeFinder.",
    intent: "howto",
    intro: "„Alternative zu Louis Vuitton“ heißt oft: ähnlicher Nutzen/Look für weniger — z. B. Occasion. Kein offizieller Haus-Ersatz.",
    locale: "de",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Vergleichen",
        body: "Nutzung, Größe, Zustand, Gesamtpreis.",
      },
      {
        h2: "Belege",
        body: "Aktuelle Fotos, Verkäuferhistorie.",
      },
      {
        h2: "App",
        body: "Foto + Budget in LuxeFinder — Shortlist, keine Authentizitätsgarantie.",
      },
    ],
    related: ["gz-de-budget-louis-vuitton", "gz-de-occasion-louis-vuitton", "gz-fr-alternative-louis-vuitton"],
  },
  {
    slug: "gz-de-alternative-hermes",
    title: "Alternative zu Hermès (Deutschland)",
    h1: "Alternative zu Hermès finden",
    description: "Alternative zu Hermès (Birkin, Kelly, Evelyne, Picotin) in Deutschland: Second Hand, Budgets, Verkäufer. LuxeFinder.",
    intent: "howto",
    intro: "„Alternative zu Hermès“ heißt oft: ähnlicher Nutzen/Look für weniger — z. B. Occasion. Kein offizieller Haus-Ersatz.",
    locale: "de",
    brands: ["hermes"],
    sections: [
      {
        h2: "Vergleichen",
        body: "Nutzung, Größe, Zustand, Gesamtpreis.",
      },
      {
        h2: "Belege",
        body: "Aktuelle Fotos, Verkäuferhistorie.",
      },
      {
        h2: "App",
        body: "Foto + Budget in LuxeFinder — Shortlist, keine Authentizitätsgarantie.",
      },
    ],
    related: ["gz-de-budget-hermes", "gz-de-occasion-hermes", "gz-fr-alternative-hermes"],
  },
  {
    slug: "gz-de-alternative-chanel",
    title: "Alternative zu Chanel (Deutschland)",
    h1: "Alternative zu Chanel finden",
    description: "Alternative zu Chanel (Classic Flap, Boy, 19, WOC) in Deutschland: Second Hand, Budgets, Verkäufer. LuxeFinder.",
    intent: "howto",
    intro: "„Alternative zu Chanel“ heißt oft: ähnlicher Nutzen/Look für weniger — z. B. Occasion. Kein offizieller Haus-Ersatz.",
    locale: "de",
    brands: ["chanel"],
    sections: [
      {
        h2: "Vergleichen",
        body: "Nutzung, Größe, Zustand, Gesamtpreis.",
      },
      {
        h2: "Belege",
        body: "Aktuelle Fotos, Verkäuferhistorie.",
      },
      {
        h2: "App",
        body: "Foto + Budget in LuxeFinder — Shortlist, keine Authentizitätsgarantie.",
      },
    ],
    related: ["gz-de-budget-chanel", "gz-de-occasion-chanel", "gz-fr-alternative-chanel"],
  },
  {
    slug: "gz-de-alternative-dior",
    title: "Alternative zu Dior (Deutschland)",
    h1: "Alternative zu Dior finden",
    description: "Alternative zu Dior (Book Tote, Saddle, Lady Dior) in Deutschland: Second Hand, Budgets, Verkäufer. LuxeFinder.",
    intent: "howto",
    intro: "„Alternative zu Dior“ heißt oft: ähnlicher Nutzen/Look für weniger — z. B. Occasion. Kein offizieller Haus-Ersatz.",
    locale: "de",
    brands: ["dior"],
    sections: [
      {
        h2: "Vergleichen",
        body: "Nutzung, Größe, Zustand, Gesamtpreis.",
      },
      {
        h2: "Belege",
        body: "Aktuelle Fotos, Verkäuferhistorie.",
      },
      {
        h2: "App",
        body: "Foto + Budget in LuxeFinder — Shortlist, keine Authentizitätsgarantie.",
      },
    ],
    related: ["gz-de-budget-dior", "gz-de-occasion-dior", "gz-fr-alternative-dior"],
  },
  {
    slug: "gz-de-alternative-gucci",
    title: "Alternative zu Gucci (Deutschland)",
    h1: "Alternative zu Gucci finden",
    description: "Alternative zu Gucci (Jackie, Marmont, Ophidia) in Deutschland: Second Hand, Budgets, Verkäufer. LuxeFinder.",
    intent: "howto",
    intro: "„Alternative zu Gucci“ heißt oft: ähnlicher Nutzen/Look für weniger — z. B. Occasion. Kein offizieller Haus-Ersatz.",
    locale: "de",
    brands: ["gucci"],
    sections: [
      {
        h2: "Vergleichen",
        body: "Nutzung, Größe, Zustand, Gesamtpreis.",
      },
      {
        h2: "Belege",
        body: "Aktuelle Fotos, Verkäuferhistorie.",
      },
      {
        h2: "App",
        body: "Foto + Budget in LuxeFinder — Shortlist, keine Authentizitätsgarantie.",
      },
    ],
    related: ["gz-de-budget-gucci", "gz-de-occasion-gucci", "gz-fr-alternative-gucci"],
  },
  {
    slug: "gz-de-alternative-saint-laurent",
    title: "Alternative zu Saint Laurent (Deutschland)",
    h1: "Alternative zu Saint Laurent finden",
    description: "Alternative zu Saint Laurent (Loulou, Niki, Sunset) in Deutschland: Second Hand, Budgets, Verkäufer. LuxeFinder.",
    intent: "howto",
    intro: "„Alternative zu Saint Laurent“ heißt oft: ähnlicher Nutzen/Look für weniger — z. B. Occasion. Kein offizieller Haus-Ersatz.",
    locale: "de",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Vergleichen",
        body: "Nutzung, Größe, Zustand, Gesamtpreis.",
      },
      {
        h2: "Belege",
        body: "Aktuelle Fotos, Verkäuferhistorie.",
      },
      {
        h2: "App",
        body: "Foto + Budget in LuxeFinder — Shortlist, keine Authentizitätsgarantie.",
      },
    ],
    related: ["gz-de-budget-saint-laurent", "gz-de-occasion-saint-laurent", "gz-fr-alternative-saint-laurent"],
  },
  {
    slug: "gz-de-alternative-bottega-veneta",
    title: "Alternative zu Bottega Veneta (Deutschland)",
    h1: "Alternative zu Bottega Veneta finden",
    description: "Alternative zu Bottega Veneta (Jodie, Cassette) in Deutschland: Second Hand, Budgets, Verkäufer. LuxeFinder.",
    intent: "howto",
    intro: "„Alternative zu Bottega Veneta“ heißt oft: ähnlicher Nutzen/Look für weniger — z. B. Occasion. Kein offizieller Haus-Ersatz.",
    locale: "de",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Vergleichen",
        body: "Nutzung, Größe, Zustand, Gesamtpreis.",
      },
      {
        h2: "Belege",
        body: "Aktuelle Fotos, Verkäuferhistorie.",
      },
      {
        h2: "App",
        body: "Foto + Budget in LuxeFinder — Shortlist, keine Authentizitätsgarantie.",
      },
    ],
    related: ["gz-de-budget-bottega-veneta", "gz-de-occasion-bottega-veneta", "gz-fr-alternative-bottega-veneta"],
  },
  {
    slug: "gz-de-alternative-cartier",
    title: "Alternative zu Cartier (Deutschland)",
    h1: "Alternative zu Cartier finden",
    description: "Alternative zu Cartier (Love, Juste un Clou) in Deutschland: Second Hand, Budgets, Verkäufer. LuxeFinder.",
    intent: "howto",
    intro: "„Alternative zu Cartier“ heißt oft: ähnlicher Nutzen/Look für weniger — z. B. Occasion. Kein offizieller Haus-Ersatz.",
    locale: "de",
    brands: ["cartier"],
    sections: [
      {
        h2: "Vergleichen",
        body: "Nutzung, Größe, Zustand, Gesamtpreis.",
      },
      {
        h2: "Belege",
        body: "Aktuelle Fotos, Verkäuferhistorie.",
      },
      {
        h2: "App",
        body: "Foto + Budget in LuxeFinder — Shortlist, keine Authentizitätsgarantie.",
      },
    ],
    related: ["gz-de-budget-cartier", "gz-de-occasion-cartier", "gz-fr-alternative-cartier"],
  },
  {
    slug: "gz-de-pas-cher-louis-vuitton",
    title: "Louis Vuitton günstig Deutschland",
    h1: "Louis Vuitton günstiger suchen",
    description: "Louis Vuitton günstig (Neverfull, Speedy, Alma, Pochette Métis) in Deutschland: Budget, Occasion, Verkäufer. LuxeFinder-Methode.",
    intent: "buy",
    intro: "Suchen nach „Louis Vuitton günstig“ sind häufig. Niedriger Preis ≠ gutes Geschäft — prüfen Sie Zustand und Anbieter.",
    locale: "de",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Vorsicht",
        body: "Unrealistische Preise brauchen mehr Belege.",
      },
      {
        h2: "Ablauf",
        body: "Foto → Budget → 2–3 Angebote vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Hilft bei der Angebotssuche; verkauft keine Ware.",
      },
    ],
    related: ["gz-de-budget-louis-vuitton", "gz-de-alternative-louis-vuitton", "gz-fr-pas-cher-louis-vuitton"],
  },
  {
    slug: "gz-de-pas-cher-hermes",
    title: "Hermès günstig Deutschland",
    h1: "Hermès günstiger suchen",
    description: "Hermès günstig (Birkin, Kelly, Evelyne, Picotin) in Deutschland: Budget, Occasion, Verkäufer. LuxeFinder-Methode.",
    intent: "buy",
    intro: "Suchen nach „Hermès günstig“ sind häufig. Niedriger Preis ≠ gutes Geschäft — prüfen Sie Zustand und Anbieter.",
    locale: "de",
    brands: ["hermes"],
    sections: [
      {
        h2: "Vorsicht",
        body: "Unrealistische Preise brauchen mehr Belege.",
      },
      {
        h2: "Ablauf",
        body: "Foto → Budget → 2–3 Angebote vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Hilft bei der Angebotssuche; verkauft keine Ware.",
      },
    ],
    related: ["gz-de-budget-hermes", "gz-de-alternative-hermes", "gz-fr-pas-cher-hermes"],
  },
  {
    slug: "gz-de-pas-cher-chanel",
    title: "Chanel günstig Deutschland",
    h1: "Chanel günstiger suchen",
    description: "Chanel günstig (Classic Flap, Boy, 19, WOC) in Deutschland: Budget, Occasion, Verkäufer. LuxeFinder-Methode.",
    intent: "buy",
    intro: "Suchen nach „Chanel günstig“ sind häufig. Niedriger Preis ≠ gutes Geschäft — prüfen Sie Zustand und Anbieter.",
    locale: "de",
    brands: ["chanel"],
    sections: [
      {
        h2: "Vorsicht",
        body: "Unrealistische Preise brauchen mehr Belege.",
      },
      {
        h2: "Ablauf",
        body: "Foto → Budget → 2–3 Angebote vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Hilft bei der Angebotssuche; verkauft keine Ware.",
      },
    ],
    related: ["gz-de-budget-chanel", "gz-de-alternative-chanel", "gz-fr-pas-cher-chanel"],
  },
  {
    slug: "gz-de-pas-cher-dior",
    title: "Dior günstig Deutschland",
    h1: "Dior günstiger suchen",
    description: "Dior günstig (Book Tote, Saddle, Lady Dior) in Deutschland: Budget, Occasion, Verkäufer. LuxeFinder-Methode.",
    intent: "buy",
    intro: "Suchen nach „Dior günstig“ sind häufig. Niedriger Preis ≠ gutes Geschäft — prüfen Sie Zustand und Anbieter.",
    locale: "de",
    brands: ["dior"],
    sections: [
      {
        h2: "Vorsicht",
        body: "Unrealistische Preise brauchen mehr Belege.",
      },
      {
        h2: "Ablauf",
        body: "Foto → Budget → 2–3 Angebote vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Hilft bei der Angebotssuche; verkauft keine Ware.",
      },
    ],
    related: ["gz-de-budget-dior", "gz-de-alternative-dior", "gz-fr-pas-cher-dior"],
  },
  {
    slug: "gz-de-pas-cher-gucci",
    title: "Gucci günstig Deutschland",
    h1: "Gucci günstiger suchen",
    description: "Gucci günstig (Jackie, Marmont, Ophidia) in Deutschland: Budget, Occasion, Verkäufer. LuxeFinder-Methode.",
    intent: "buy",
    intro: "Suchen nach „Gucci günstig“ sind häufig. Niedriger Preis ≠ gutes Geschäft — prüfen Sie Zustand und Anbieter.",
    locale: "de",
    brands: ["gucci"],
    sections: [
      {
        h2: "Vorsicht",
        body: "Unrealistische Preise brauchen mehr Belege.",
      },
      {
        h2: "Ablauf",
        body: "Foto → Budget → 2–3 Angebote vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Hilft bei der Angebotssuche; verkauft keine Ware.",
      },
    ],
    related: ["gz-de-budget-gucci", "gz-de-alternative-gucci", "gz-fr-pas-cher-gucci"],
  },
  {
    slug: "gz-de-pas-cher-saint-laurent",
    title: "Saint Laurent günstig Deutschland",
    h1: "Saint Laurent günstiger suchen",
    description: "Saint Laurent günstig (Loulou, Niki, Sunset) in Deutschland: Budget, Occasion, Verkäufer. LuxeFinder-Methode.",
    intent: "buy",
    intro: "Suchen nach „Saint Laurent günstig“ sind häufig. Niedriger Preis ≠ gutes Geschäft — prüfen Sie Zustand und Anbieter.",
    locale: "de",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Vorsicht",
        body: "Unrealistische Preise brauchen mehr Belege.",
      },
      {
        h2: "Ablauf",
        body: "Foto → Budget → 2–3 Angebote vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Hilft bei der Angebotssuche; verkauft keine Ware.",
      },
    ],
    related: ["gz-de-budget-saint-laurent", "gz-de-alternative-saint-laurent", "gz-fr-pas-cher-saint-laurent"],
  },
  {
    slug: "gz-de-pas-cher-bottega-veneta",
    title: "Bottega Veneta günstig Deutschland",
    h1: "Bottega Veneta günstiger suchen",
    description: "Bottega Veneta günstig (Jodie, Cassette) in Deutschland: Budget, Occasion, Verkäufer. LuxeFinder-Methode.",
    intent: "buy",
    intro: "Suchen nach „Bottega Veneta günstig“ sind häufig. Niedriger Preis ≠ gutes Geschäft — prüfen Sie Zustand und Anbieter.",
    locale: "de",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Vorsicht",
        body: "Unrealistische Preise brauchen mehr Belege.",
      },
      {
        h2: "Ablauf",
        body: "Foto → Budget → 2–3 Angebote vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Hilft bei der Angebotssuche; verkauft keine Ware.",
      },
    ],
    related: ["gz-de-budget-bottega-veneta", "gz-de-alternative-bottega-veneta", "gz-fr-pas-cher-bottega-veneta"],
  },
  {
    slug: "gz-de-pas-cher-cartier",
    title: "Cartier günstig Deutschland",
    h1: "Cartier günstiger suchen",
    description: "Cartier günstig (Love, Juste un Clou) in Deutschland: Budget, Occasion, Verkäufer. LuxeFinder-Methode.",
    intent: "buy",
    intro: "Suchen nach „Cartier günstig“ sind häufig. Niedriger Preis ≠ gutes Geschäft — prüfen Sie Zustand und Anbieter.",
    locale: "de",
    brands: ["cartier"],
    sections: [
      {
        h2: "Vorsicht",
        body: "Unrealistische Preise brauchen mehr Belege.",
      },
      {
        h2: "Ablauf",
        body: "Foto → Budget → 2–3 Angebote vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Hilft bei der Angebotssuche; verkauft keine Ware.",
      },
    ],
    related: ["gz-de-budget-cartier", "gz-de-alternative-cartier", "gz-fr-pas-cher-cartier"],
  },
  {
    slug: "gz-de-trouver-vendeur-louis-vuitton",
    title: "Louis Vuitton Verkäufer finden Deutschland",
    h1: "Verkäufer für Louis Vuitton finden",
    description: "Louis Vuitton-Verkäufer (Neverfull, Speedy, Alma, Pochette Métis) in Deutschland finden: Foto, Budget, Vergleich mit LuxeFinder.",
    intent: "buy",
    intro: "Einen seriösen Louis Vuitton-Anbieter zu finden braucht Methode: Modell, Budget, Shortlist.",
    locale: "de",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Modell",
        body: "Foto + klare Bezeichnung (Neverfull, Speedy, Alma, Pochette Métis).",
      },
      {
        h2: "Filter",
        body: "Gesamtpreis, Fotos, Lieferzeit, Zahlung.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget → Spuren. Finale Wahl liegt bei Ihnen.",
      },
    ],
    related: ["gz-de-budget-louis-vuitton", "gz-de-pas-cher-louis-vuitton", "gz-fr-trouver-vendeur-louis-vuitton"],
  },
  {
    slug: "gz-de-trouver-vendeur-hermes",
    title: "Hermès Verkäufer finden Deutschland",
    h1: "Verkäufer für Hermès finden",
    description: "Hermès-Verkäufer (Birkin, Kelly, Evelyne, Picotin) in Deutschland finden: Foto, Budget, Vergleich mit LuxeFinder.",
    intent: "buy",
    intro: "Einen seriösen Hermès-Anbieter zu finden braucht Methode: Modell, Budget, Shortlist.",
    locale: "de",
    brands: ["hermes"],
    sections: [
      {
        h2: "Modell",
        body: "Foto + klare Bezeichnung (Birkin, Kelly, Evelyne, Picotin).",
      },
      {
        h2: "Filter",
        body: "Gesamtpreis, Fotos, Lieferzeit, Zahlung.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget → Spuren. Finale Wahl liegt bei Ihnen.",
      },
    ],
    related: ["gz-de-budget-hermes", "gz-de-pas-cher-hermes", "gz-fr-trouver-vendeur-hermes"],
  },
  {
    slug: "gz-de-trouver-vendeur-chanel",
    title: "Chanel Verkäufer finden Deutschland",
    h1: "Verkäufer für Chanel finden",
    description: "Chanel-Verkäufer (Classic Flap, Boy, 19, WOC) in Deutschland finden: Foto, Budget, Vergleich mit LuxeFinder.",
    intent: "buy",
    intro: "Einen seriösen Chanel-Anbieter zu finden braucht Methode: Modell, Budget, Shortlist.",
    locale: "de",
    brands: ["chanel"],
    sections: [
      {
        h2: "Modell",
        body: "Foto + klare Bezeichnung (Classic Flap, Boy, 19, WOC).",
      },
      {
        h2: "Filter",
        body: "Gesamtpreis, Fotos, Lieferzeit, Zahlung.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget → Spuren. Finale Wahl liegt bei Ihnen.",
      },
    ],
    related: ["gz-de-budget-chanel", "gz-de-pas-cher-chanel", "gz-fr-trouver-vendeur-chanel"],
  },
  {
    slug: "gz-de-trouver-vendeur-dior",
    title: "Dior Verkäufer finden Deutschland",
    h1: "Verkäufer für Dior finden",
    description: "Dior-Verkäufer (Book Tote, Saddle, Lady Dior) in Deutschland finden: Foto, Budget, Vergleich mit LuxeFinder.",
    intent: "buy",
    intro: "Einen seriösen Dior-Anbieter zu finden braucht Methode: Modell, Budget, Shortlist.",
    locale: "de",
    brands: ["dior"],
    sections: [
      {
        h2: "Modell",
        body: "Foto + klare Bezeichnung (Book Tote, Saddle, Lady Dior).",
      },
      {
        h2: "Filter",
        body: "Gesamtpreis, Fotos, Lieferzeit, Zahlung.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget → Spuren. Finale Wahl liegt bei Ihnen.",
      },
    ],
    related: ["gz-de-budget-dior", "gz-de-pas-cher-dior", "gz-fr-trouver-vendeur-dior"],
  },
  {
    slug: "gz-de-trouver-vendeur-gucci",
    title: "Gucci Verkäufer finden Deutschland",
    h1: "Verkäufer für Gucci finden",
    description: "Gucci-Verkäufer (Jackie, Marmont, Ophidia) in Deutschland finden: Foto, Budget, Vergleich mit LuxeFinder.",
    intent: "buy",
    intro: "Einen seriösen Gucci-Anbieter zu finden braucht Methode: Modell, Budget, Shortlist.",
    locale: "de",
    brands: ["gucci"],
    sections: [
      {
        h2: "Modell",
        body: "Foto + klare Bezeichnung (Jackie, Marmont, Ophidia).",
      },
      {
        h2: "Filter",
        body: "Gesamtpreis, Fotos, Lieferzeit, Zahlung.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget → Spuren. Finale Wahl liegt bei Ihnen.",
      },
    ],
    related: ["gz-de-budget-gucci", "gz-de-pas-cher-gucci", "gz-fr-trouver-vendeur-gucci"],
  },
  {
    slug: "gz-de-trouver-vendeur-saint-laurent",
    title: "Saint Laurent Verkäufer finden Deutschland",
    h1: "Verkäufer für Saint Laurent finden",
    description: "Saint Laurent-Verkäufer (Loulou, Niki, Sunset) in Deutschland finden: Foto, Budget, Vergleich mit LuxeFinder.",
    intent: "buy",
    intro: "Einen seriösen Saint Laurent-Anbieter zu finden braucht Methode: Modell, Budget, Shortlist.",
    locale: "de",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Modell",
        body: "Foto + klare Bezeichnung (Loulou, Niki, Sunset).",
      },
      {
        h2: "Filter",
        body: "Gesamtpreis, Fotos, Lieferzeit, Zahlung.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget → Spuren. Finale Wahl liegt bei Ihnen.",
      },
    ],
    related: ["gz-de-budget-saint-laurent", "gz-de-pas-cher-saint-laurent", "gz-fr-trouver-vendeur-saint-laurent"],
  },
  {
    slug: "gz-de-trouver-vendeur-bottega-veneta",
    title: "Bottega Veneta Verkäufer finden Deutschland",
    h1: "Verkäufer für Bottega Veneta finden",
    description: "Bottega Veneta-Verkäufer (Jodie, Cassette) in Deutschland finden: Foto, Budget, Vergleich mit LuxeFinder.",
    intent: "buy",
    intro: "Einen seriösen Bottega Veneta-Anbieter zu finden braucht Methode: Modell, Budget, Shortlist.",
    locale: "de",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Modell",
        body: "Foto + klare Bezeichnung (Jodie, Cassette).",
      },
      {
        h2: "Filter",
        body: "Gesamtpreis, Fotos, Lieferzeit, Zahlung.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget → Spuren. Finale Wahl liegt bei Ihnen.",
      },
    ],
    related: ["gz-de-budget-bottega-veneta", "gz-de-pas-cher-bottega-veneta", "gz-fr-trouver-vendeur-bottega-veneta"],
  },
  {
    slug: "gz-de-trouver-vendeur-cartier",
    title: "Cartier Verkäufer finden Deutschland",
    h1: "Verkäufer für Cartier finden",
    description: "Cartier-Verkäufer (Love, Juste un Clou) in Deutschland finden: Foto, Budget, Vergleich mit LuxeFinder.",
    intent: "buy",
    intro: "Einen seriösen Cartier-Anbieter zu finden braucht Methode: Modell, Budget, Shortlist.",
    locale: "de",
    brands: ["cartier"],
    sections: [
      {
        h2: "Modell",
        body: "Foto + klare Bezeichnung (Love, Juste un Clou).",
      },
      {
        h2: "Filter",
        body: "Gesamtpreis, Fotos, Lieferzeit, Zahlung.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + Budget → Spuren. Finale Wahl liegt bei Ihnen.",
      },
    ],
    related: ["gz-de-budget-cartier", "gz-de-pas-cher-cartier", "gz-fr-trouver-vendeur-cartier"],
  },
  {
    slug: "gz-de-occasion-louis-vuitton",
    title: "Louis Vuitton Second Hand Deutschland",
    h1: "Louis Vuitton gebraucht kaufen",
    description: "Louis Vuitton Occasion (Neverfull, Speedy, Alma, Pochette Métis) in Deutschland: Zustand, Preis, Anbieter. LuxeFinder.",
    intent: "buy",
    intro: "Second Hand ist der häufigste Weg zu einem niedrigeren Louis Vuitton-Preis in Deutschland.",
    locale: "de",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Zustand",
        body: "Ecken, Griffe, Innenleben, Hardware.",
      },
      {
        h2: "Preis",
        body: "Mehrere Anzeigen vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto zur Modellklärung, dann Angebote vergleichen.",
      },
    ],
    related: ["gz-de-budget-louis-vuitton", "gz-de-alternative-louis-vuitton", "gz-fr-occasion-louis-vuitton"],
  },
  {
    slug: "gz-de-occasion-hermes",
    title: "Hermès Second Hand Deutschland",
    h1: "Hermès gebraucht kaufen",
    description: "Hermès Occasion (Birkin, Kelly, Evelyne, Picotin) in Deutschland: Zustand, Preis, Anbieter. LuxeFinder.",
    intent: "buy",
    intro: "Second Hand ist der häufigste Weg zu einem niedrigeren Hermès-Preis in Deutschland.",
    locale: "de",
    brands: ["hermes"],
    sections: [
      {
        h2: "Zustand",
        body: "Ecken, Griffe, Innenleben, Hardware.",
      },
      {
        h2: "Preis",
        body: "Mehrere Anzeigen vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto zur Modellklärung, dann Angebote vergleichen.",
      },
    ],
    related: ["gz-de-budget-hermes", "gz-de-alternative-hermes", "gz-fr-occasion-hermes"],
  },
  {
    slug: "gz-de-occasion-chanel",
    title: "Chanel Second Hand Deutschland",
    h1: "Chanel gebraucht kaufen",
    description: "Chanel Occasion (Classic Flap, Boy, 19, WOC) in Deutschland: Zustand, Preis, Anbieter. LuxeFinder.",
    intent: "buy",
    intro: "Second Hand ist der häufigste Weg zu einem niedrigeren Chanel-Preis in Deutschland.",
    locale: "de",
    brands: ["chanel"],
    sections: [
      {
        h2: "Zustand",
        body: "Ecken, Griffe, Innenleben, Hardware.",
      },
      {
        h2: "Preis",
        body: "Mehrere Anzeigen vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto zur Modellklärung, dann Angebote vergleichen.",
      },
    ],
    related: ["gz-de-budget-chanel", "gz-de-alternative-chanel", "gz-fr-occasion-chanel"],
  },
  {
    slug: "gz-de-occasion-dior",
    title: "Dior Second Hand Deutschland",
    h1: "Dior gebraucht kaufen",
    description: "Dior Occasion (Book Tote, Saddle, Lady Dior) in Deutschland: Zustand, Preis, Anbieter. LuxeFinder.",
    intent: "buy",
    intro: "Second Hand ist der häufigste Weg zu einem niedrigeren Dior-Preis in Deutschland.",
    locale: "de",
    brands: ["dior"],
    sections: [
      {
        h2: "Zustand",
        body: "Ecken, Griffe, Innenleben, Hardware.",
      },
      {
        h2: "Preis",
        body: "Mehrere Anzeigen vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto zur Modellklärung, dann Angebote vergleichen.",
      },
    ],
    related: ["gz-de-budget-dior", "gz-de-alternative-dior", "gz-fr-occasion-dior"],
  },
  {
    slug: "gz-de-occasion-gucci",
    title: "Gucci Second Hand Deutschland",
    h1: "Gucci gebraucht kaufen",
    description: "Gucci Occasion (Jackie, Marmont, Ophidia) in Deutschland: Zustand, Preis, Anbieter. LuxeFinder.",
    intent: "buy",
    intro: "Second Hand ist der häufigste Weg zu einem niedrigeren Gucci-Preis in Deutschland.",
    locale: "de",
    brands: ["gucci"],
    sections: [
      {
        h2: "Zustand",
        body: "Ecken, Griffe, Innenleben, Hardware.",
      },
      {
        h2: "Preis",
        body: "Mehrere Anzeigen vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto zur Modellklärung, dann Angebote vergleichen.",
      },
    ],
    related: ["gz-de-budget-gucci", "gz-de-alternative-gucci", "gz-fr-occasion-gucci"],
  },
  {
    slug: "gz-de-occasion-saint-laurent",
    title: "Saint Laurent Second Hand Deutschland",
    h1: "Saint Laurent gebraucht kaufen",
    description: "Saint Laurent Occasion (Loulou, Niki, Sunset) in Deutschland: Zustand, Preis, Anbieter. LuxeFinder.",
    intent: "buy",
    intro: "Second Hand ist der häufigste Weg zu einem niedrigeren Saint Laurent-Preis in Deutschland.",
    locale: "de",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Zustand",
        body: "Ecken, Griffe, Innenleben, Hardware.",
      },
      {
        h2: "Preis",
        body: "Mehrere Anzeigen vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto zur Modellklärung, dann Angebote vergleichen.",
      },
    ],
    related: ["gz-de-budget-saint-laurent", "gz-de-alternative-saint-laurent", "gz-fr-occasion-saint-laurent"],
  },
  {
    slug: "gz-de-occasion-bottega-veneta",
    title: "Bottega Veneta Second Hand Deutschland",
    h1: "Bottega Veneta gebraucht kaufen",
    description: "Bottega Veneta Occasion (Jodie, Cassette) in Deutschland: Zustand, Preis, Anbieter. LuxeFinder.",
    intent: "buy",
    intro: "Second Hand ist der häufigste Weg zu einem niedrigeren Bottega Veneta-Preis in Deutschland.",
    locale: "de",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Zustand",
        body: "Ecken, Griffe, Innenleben, Hardware.",
      },
      {
        h2: "Preis",
        body: "Mehrere Anzeigen vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto zur Modellklärung, dann Angebote vergleichen.",
      },
    ],
    related: ["gz-de-budget-bottega-veneta", "gz-de-alternative-bottega-veneta", "gz-fr-occasion-bottega-veneta"],
  },
  {
    slug: "gz-de-occasion-cartier",
    title: "Cartier Second Hand Deutschland",
    h1: "Cartier gebraucht kaufen",
    description: "Cartier Occasion (Love, Juste un Clou) in Deutschland: Zustand, Preis, Anbieter. LuxeFinder.",
    intent: "buy",
    intro: "Second Hand ist der häufigste Weg zu einem niedrigeren Cartier-Preis in Deutschland.",
    locale: "de",
    brands: ["cartier"],
    sections: [
      {
        h2: "Zustand",
        body: "Ecken, Griffe, Innenleben, Hardware.",
      },
      {
        h2: "Preis",
        body: "Mehrere Anzeigen vergleichen.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto zur Modellklärung, dann Angebote vergleichen.",
      },
    ],
    related: ["gz-de-budget-cartier", "gz-de-alternative-cartier", "gz-fr-occasion-cartier"],
  },
  {
    slug: "gz-it-budget-louis-vuitton",
    title: "Budget Louis Vuitton in Italia",
    h1: "Definire un budget Louis Vuitton",
    description: "Budget Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in Italia. Foto + fascia → piste venditori con LuxeFinder.",
    intent: "howto",
    intro: "Il nuovo Louis Vuitton supera spesso il budget. In Italia si cerca un’offerta più accessibile (usato, rivenditori). Partite da un tetto e da una foto (Neverfull, Speedy, Alma, Pochette Métis).",
    locale: "it",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Tetto",
        body: "Articolo + spedizione + margine.",
      },
      {
        h2: "Modello",
        body: "Indicate Neverfull, Speedy, Alma, Pochette Métis con precisione + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Caricate foto e budget. LuxeFinder non vende e non autentica automaticamente.",
      },
    ],
    related: ["gz-it-pas-cher-louis-vuitton", "gz-it-trouver-vendeur-louis-vuitton", "gz-fr-budget-louis-vuitton"],
  },
  {
    slug: "gz-it-budget-hermes",
    title: "Budget Hermès in Italia",
    h1: "Definire un budget Hermès",
    description: "Budget Hermès (Birkin, Kelly, Evelyne, Picotin) in Italia. Foto + fascia → piste venditori con LuxeFinder.",
    intent: "howto",
    intro: "Il nuovo Hermès supera spesso il budget. In Italia si cerca un’offerta più accessibile (usato, rivenditori). Partite da un tetto e da una foto (Birkin, Kelly, Evelyne, Picotin).",
    locale: "it",
    brands: ["hermes"],
    sections: [
      {
        h2: "Tetto",
        body: "Articolo + spedizione + margine.",
      },
      {
        h2: "Modello",
        body: "Indicate Birkin, Kelly, Evelyne, Picotin con precisione + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Caricate foto e budget. LuxeFinder non vende e non autentica automaticamente.",
      },
    ],
    related: ["gz-it-pas-cher-hermes", "gz-it-trouver-vendeur-hermes", "gz-fr-budget-hermes"],
  },
  {
    slug: "gz-it-budget-chanel",
    title: "Budget Chanel in Italia",
    h1: "Definire un budget Chanel",
    description: "Budget Chanel (Classic Flap, Boy, 19, WOC) in Italia. Foto + fascia → piste venditori con LuxeFinder.",
    intent: "howto",
    intro: "Il nuovo Chanel supera spesso il budget. In Italia si cerca un’offerta più accessibile (usato, rivenditori). Partite da un tetto e da una foto (Classic Flap, Boy, 19, WOC).",
    locale: "it",
    brands: ["chanel"],
    sections: [
      {
        h2: "Tetto",
        body: "Articolo + spedizione + margine.",
      },
      {
        h2: "Modello",
        body: "Indicate Classic Flap, Boy, 19, WOC con precisione + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Caricate foto e budget. LuxeFinder non vende e non autentica automaticamente.",
      },
    ],
    related: ["gz-it-pas-cher-chanel", "gz-it-trouver-vendeur-chanel", "gz-fr-budget-chanel"],
  },
  {
    slug: "gz-it-budget-dior",
    title: "Budget Dior in Italia",
    h1: "Definire un budget Dior",
    description: "Budget Dior (Book Tote, Saddle, Lady Dior) in Italia. Foto + fascia → piste venditori con LuxeFinder.",
    intent: "howto",
    intro: "Il nuovo Dior supera spesso il budget. In Italia si cerca un’offerta più accessibile (usato, rivenditori). Partite da un tetto e da una foto (Book Tote, Saddle, Lady Dior).",
    locale: "it",
    brands: ["dior"],
    sections: [
      {
        h2: "Tetto",
        body: "Articolo + spedizione + margine.",
      },
      {
        h2: "Modello",
        body: "Indicate Book Tote, Saddle, Lady Dior con precisione + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Caricate foto e budget. LuxeFinder non vende e non autentica automaticamente.",
      },
    ],
    related: ["gz-it-pas-cher-dior", "gz-it-trouver-vendeur-dior", "gz-fr-budget-dior"],
  },
  {
    slug: "gz-it-budget-gucci",
    title: "Budget Gucci in Italia",
    h1: "Definire un budget Gucci",
    description: "Budget Gucci (Jackie, Marmont, Ophidia) in Italia. Foto + fascia → piste venditori con LuxeFinder.",
    intent: "howto",
    intro: "Il nuovo Gucci supera spesso il budget. In Italia si cerca un’offerta più accessibile (usato, rivenditori). Partite da un tetto e da una foto (Jackie, Marmont, Ophidia).",
    locale: "it",
    brands: ["gucci"],
    sections: [
      {
        h2: "Tetto",
        body: "Articolo + spedizione + margine.",
      },
      {
        h2: "Modello",
        body: "Indicate Jackie, Marmont, Ophidia con precisione + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Caricate foto e budget. LuxeFinder non vende e non autentica automaticamente.",
      },
    ],
    related: ["gz-it-pas-cher-gucci", "gz-it-trouver-vendeur-gucci", "gz-fr-budget-gucci"],
  },
  {
    slug: "gz-it-budget-saint-laurent",
    title: "Budget Saint Laurent in Italia",
    h1: "Definire un budget Saint Laurent",
    description: "Budget Saint Laurent (Loulou, Niki, Sunset) in Italia. Foto + fascia → piste venditori con LuxeFinder.",
    intent: "howto",
    intro: "Il nuovo Saint Laurent supera spesso il budget. In Italia si cerca un’offerta più accessibile (usato, rivenditori). Partite da un tetto e da una foto (Loulou, Niki, Sunset).",
    locale: "it",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Tetto",
        body: "Articolo + spedizione + margine.",
      },
      {
        h2: "Modello",
        body: "Indicate Loulou, Niki, Sunset con precisione + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Caricate foto e budget. LuxeFinder non vende e non autentica automaticamente.",
      },
    ],
    related: ["gz-it-pas-cher-saint-laurent", "gz-it-trouver-vendeur-saint-laurent", "gz-fr-budget-saint-laurent"],
  },
  {
    slug: "gz-it-budget-bottega-veneta",
    title: "Budget Bottega Veneta in Italia",
    h1: "Definire un budget Bottega Veneta",
    description: "Budget Bottega Veneta (Jodie, Cassette) in Italia. Foto + fascia → piste venditori con LuxeFinder.",
    intent: "howto",
    intro: "Il nuovo Bottega Veneta supera spesso il budget. In Italia si cerca un’offerta più accessibile (usato, rivenditori). Partite da un tetto e da una foto (Jodie, Cassette).",
    locale: "it",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Tetto",
        body: "Articolo + spedizione + margine.",
      },
      {
        h2: "Modello",
        body: "Indicate Jodie, Cassette con precisione + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Caricate foto e budget. LuxeFinder non vende e non autentica automaticamente.",
      },
    ],
    related: ["gz-it-pas-cher-bottega-veneta", "gz-it-trouver-vendeur-bottega-veneta", "gz-fr-budget-bottega-veneta"],
  },
  {
    slug: "gz-it-budget-cartier",
    title: "Budget Cartier in Italia",
    h1: "Definire un budget Cartier",
    description: "Budget Cartier (Love, Juste un Clou) in Italia. Foto + fascia → piste venditori con LuxeFinder.",
    intent: "howto",
    intro: "Il nuovo Cartier supera spesso il budget. In Italia si cerca un’offerta più accessibile (usato, rivenditori). Partite da un tetto e da una foto (Love, Juste un Clou).",
    locale: "it",
    brands: ["cartier"],
    sections: [
      {
        h2: "Tetto",
        body: "Articolo + spedizione + margine.",
      },
      {
        h2: "Modello",
        body: "Indicate Love, Juste un Clou con precisione + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Caricate foto e budget. LuxeFinder non vende e non autentica automaticamente.",
      },
    ],
    related: ["gz-it-pas-cher-cartier", "gz-it-trouver-vendeur-cartier", "gz-fr-budget-cartier"],
  },
  {
    slug: "gz-it-alternative-louis-vuitton",
    title: "Alternativa a Louis Vuitton (Italia)",
    h1: "Cercare un’alternativa a Louis Vuitton",
    description: "Alternativa Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in Italia: usato, budget, venditori. LuxeFinder.",
    intent: "howto",
    intro: "« Alternativa a Louis Vuitton » spesso = stesso uso/look a meno — tipicamente usato. Non è un sostituto ufficiale.",
    locale: "it",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Criteri",
        body: "Uso, taglia, stato, prezzo totale.",
      },
      {
        h2: "Prove",
        body: "Foto recenti, storico venditore.",
      },
      {
        h2: "App",
        body: "Foto + budget su LuxeFinder — short-list senza garanzia di autenticità.",
      },
    ],
    related: ["gz-it-budget-louis-vuitton", "gz-it-occasion-louis-vuitton", "gz-fr-alternative-louis-vuitton"],
  },
  {
    slug: "gz-it-alternative-hermes",
    title: "Alternativa a Hermès (Italia)",
    h1: "Cercare un’alternativa a Hermès",
    description: "Alternativa Hermès (Birkin, Kelly, Evelyne, Picotin) in Italia: usato, budget, venditori. LuxeFinder.",
    intent: "howto",
    intro: "« Alternativa a Hermès » spesso = stesso uso/look a meno — tipicamente usato. Non è un sostituto ufficiale.",
    locale: "it",
    brands: ["hermes"],
    sections: [
      {
        h2: "Criteri",
        body: "Uso, taglia, stato, prezzo totale.",
      },
      {
        h2: "Prove",
        body: "Foto recenti, storico venditore.",
      },
      {
        h2: "App",
        body: "Foto + budget su LuxeFinder — short-list senza garanzia di autenticità.",
      },
    ],
    related: ["gz-it-budget-hermes", "gz-it-occasion-hermes", "gz-fr-alternative-hermes"],
  },
  {
    slug: "gz-it-alternative-chanel",
    title: "Alternativa a Chanel (Italia)",
    h1: "Cercare un’alternativa a Chanel",
    description: "Alternativa Chanel (Classic Flap, Boy, 19, WOC) in Italia: usato, budget, venditori. LuxeFinder.",
    intent: "howto",
    intro: "« Alternativa a Chanel » spesso = stesso uso/look a meno — tipicamente usato. Non è un sostituto ufficiale.",
    locale: "it",
    brands: ["chanel"],
    sections: [
      {
        h2: "Criteri",
        body: "Uso, taglia, stato, prezzo totale.",
      },
      {
        h2: "Prove",
        body: "Foto recenti, storico venditore.",
      },
      {
        h2: "App",
        body: "Foto + budget su LuxeFinder — short-list senza garanzia di autenticità.",
      },
    ],
    related: ["gz-it-budget-chanel", "gz-it-occasion-chanel", "gz-fr-alternative-chanel"],
  },
  {
    slug: "gz-it-alternative-dior",
    title: "Alternativa a Dior (Italia)",
    h1: "Cercare un’alternativa a Dior",
    description: "Alternativa Dior (Book Tote, Saddle, Lady Dior) in Italia: usato, budget, venditori. LuxeFinder.",
    intent: "howto",
    intro: "« Alternativa a Dior » spesso = stesso uso/look a meno — tipicamente usato. Non è un sostituto ufficiale.",
    locale: "it",
    brands: ["dior"],
    sections: [
      {
        h2: "Criteri",
        body: "Uso, taglia, stato, prezzo totale.",
      },
      {
        h2: "Prove",
        body: "Foto recenti, storico venditore.",
      },
      {
        h2: "App",
        body: "Foto + budget su LuxeFinder — short-list senza garanzia di autenticità.",
      },
    ],
    related: ["gz-it-budget-dior", "gz-it-occasion-dior", "gz-fr-alternative-dior"],
  },
  {
    slug: "gz-it-alternative-gucci",
    title: "Alternativa a Gucci (Italia)",
    h1: "Cercare un’alternativa a Gucci",
    description: "Alternativa Gucci (Jackie, Marmont, Ophidia) in Italia: usato, budget, venditori. LuxeFinder.",
    intent: "howto",
    intro: "« Alternativa a Gucci » spesso = stesso uso/look a meno — tipicamente usato. Non è un sostituto ufficiale.",
    locale: "it",
    brands: ["gucci"],
    sections: [
      {
        h2: "Criteri",
        body: "Uso, taglia, stato, prezzo totale.",
      },
      {
        h2: "Prove",
        body: "Foto recenti, storico venditore.",
      },
      {
        h2: "App",
        body: "Foto + budget su LuxeFinder — short-list senza garanzia di autenticità.",
      },
    ],
    related: ["gz-it-budget-gucci", "gz-it-occasion-gucci", "gz-fr-alternative-gucci"],
  },
  {
    slug: "gz-it-alternative-saint-laurent",
    title: "Alternativa a Saint Laurent (Italia)",
    h1: "Cercare un’alternativa a Saint Laurent",
    description: "Alternativa Saint Laurent (Loulou, Niki, Sunset) in Italia: usato, budget, venditori. LuxeFinder.",
    intent: "howto",
    intro: "« Alternativa a Saint Laurent » spesso = stesso uso/look a meno — tipicamente usato. Non è un sostituto ufficiale.",
    locale: "it",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Criteri",
        body: "Uso, taglia, stato, prezzo totale.",
      },
      {
        h2: "Prove",
        body: "Foto recenti, storico venditore.",
      },
      {
        h2: "App",
        body: "Foto + budget su LuxeFinder — short-list senza garanzia di autenticità.",
      },
    ],
    related: ["gz-it-budget-saint-laurent", "gz-it-occasion-saint-laurent", "gz-fr-alternative-saint-laurent"],
  },
  {
    slug: "gz-it-alternative-bottega-veneta",
    title: "Alternativa a Bottega Veneta (Italia)",
    h1: "Cercare un’alternativa a Bottega Veneta",
    description: "Alternativa Bottega Veneta (Jodie, Cassette) in Italia: usato, budget, venditori. LuxeFinder.",
    intent: "howto",
    intro: "« Alternativa a Bottega Veneta » spesso = stesso uso/look a meno — tipicamente usato. Non è un sostituto ufficiale.",
    locale: "it",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Criteri",
        body: "Uso, taglia, stato, prezzo totale.",
      },
      {
        h2: "Prove",
        body: "Foto recenti, storico venditore.",
      },
      {
        h2: "App",
        body: "Foto + budget su LuxeFinder — short-list senza garanzia di autenticità.",
      },
    ],
    related: ["gz-it-budget-bottega-veneta", "gz-it-occasion-bottega-veneta", "gz-fr-alternative-bottega-veneta"],
  },
  {
    slug: "gz-it-alternative-cartier",
    title: "Alternativa a Cartier (Italia)",
    h1: "Cercare un’alternativa a Cartier",
    description: "Alternativa Cartier (Love, Juste un Clou) in Italia: usato, budget, venditori. LuxeFinder.",
    intent: "howto",
    intro: "« Alternativa a Cartier » spesso = stesso uso/look a meno — tipicamente usato. Non è un sostituto ufficiale.",
    locale: "it",
    brands: ["cartier"],
    sections: [
      {
        h2: "Criteri",
        body: "Uso, taglia, stato, prezzo totale.",
      },
      {
        h2: "Prove",
        body: "Foto recenti, storico venditore.",
      },
      {
        h2: "App",
        body: "Foto + budget su LuxeFinder — short-list senza garanzia di autenticità.",
      },
    ],
    related: ["gz-it-budget-cartier", "gz-it-occasion-cartier", "gz-fr-alternative-cartier"],
  },
  {
    slug: "gz-it-pas-cher-louis-vuitton",
    title: "Louis Vuitton economico Italia",
    h1: "Cercare Louis Vuitton a meno",
    description: "Louis Vuitton economico (Neverfull, Speedy, Alma, Pochette Métis) in Italia: budget, usato, venditori.",
    intent: "buy",
    intro: "Le ricerche « Louis Vuitton economico » sono frequenti. Prezzo basso ≠ buon affare.",
    locale: "it",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Attenzione",
        body: "Prezzi irrealistici richiedono più prove.",
      },
      {
        h2: "Percorso",
        body: "Foto → budget → confrontare 2–3 offerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Aiuta la ricerca offerte; non vende stock.",
      },
    ],
    related: ["gz-it-budget-louis-vuitton", "gz-it-alternative-louis-vuitton", "gz-fr-pas-cher-louis-vuitton"],
  },
  {
    slug: "gz-it-pas-cher-hermes",
    title: "Hermès economico Italia",
    h1: "Cercare Hermès a meno",
    description: "Hermès economico (Birkin, Kelly, Evelyne, Picotin) in Italia: budget, usato, venditori.",
    intent: "buy",
    intro: "Le ricerche « Hermès economico » sono frequenti. Prezzo basso ≠ buon affare.",
    locale: "it",
    brands: ["hermes"],
    sections: [
      {
        h2: "Attenzione",
        body: "Prezzi irrealistici richiedono più prove.",
      },
      {
        h2: "Percorso",
        body: "Foto → budget → confrontare 2–3 offerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Aiuta la ricerca offerte; non vende stock.",
      },
    ],
    related: ["gz-it-budget-hermes", "gz-it-alternative-hermes", "gz-fr-pas-cher-hermes"],
  },
  {
    slug: "gz-it-pas-cher-chanel",
    title: "Chanel economico Italia",
    h1: "Cercare Chanel a meno",
    description: "Chanel economico (Classic Flap, Boy, 19, WOC) in Italia: budget, usato, venditori.",
    intent: "buy",
    intro: "Le ricerche « Chanel economico » sono frequenti. Prezzo basso ≠ buon affare.",
    locale: "it",
    brands: ["chanel"],
    sections: [
      {
        h2: "Attenzione",
        body: "Prezzi irrealistici richiedono più prove.",
      },
      {
        h2: "Percorso",
        body: "Foto → budget → confrontare 2–3 offerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Aiuta la ricerca offerte; non vende stock.",
      },
    ],
    related: ["gz-it-budget-chanel", "gz-it-alternative-chanel", "gz-fr-pas-cher-chanel"],
  },
  {
    slug: "gz-it-pas-cher-dior",
    title: "Dior economico Italia",
    h1: "Cercare Dior a meno",
    description: "Dior economico (Book Tote, Saddle, Lady Dior) in Italia: budget, usato, venditori.",
    intent: "buy",
    intro: "Le ricerche « Dior economico » sono frequenti. Prezzo basso ≠ buon affare.",
    locale: "it",
    brands: ["dior"],
    sections: [
      {
        h2: "Attenzione",
        body: "Prezzi irrealistici richiedono più prove.",
      },
      {
        h2: "Percorso",
        body: "Foto → budget → confrontare 2–3 offerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Aiuta la ricerca offerte; non vende stock.",
      },
    ],
    related: ["gz-it-budget-dior", "gz-it-alternative-dior", "gz-fr-pas-cher-dior"],
  },
  {
    slug: "gz-it-pas-cher-gucci",
    title: "Gucci economico Italia",
    h1: "Cercare Gucci a meno",
    description: "Gucci economico (Jackie, Marmont, Ophidia) in Italia: budget, usato, venditori.",
    intent: "buy",
    intro: "Le ricerche « Gucci economico » sono frequenti. Prezzo basso ≠ buon affare.",
    locale: "it",
    brands: ["gucci"],
    sections: [
      {
        h2: "Attenzione",
        body: "Prezzi irrealistici richiedono più prove.",
      },
      {
        h2: "Percorso",
        body: "Foto → budget → confrontare 2–3 offerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Aiuta la ricerca offerte; non vende stock.",
      },
    ],
    related: ["gz-it-budget-gucci", "gz-it-alternative-gucci", "gz-fr-pas-cher-gucci"],
  },
  {
    slug: "gz-it-pas-cher-saint-laurent",
    title: "Saint Laurent economico Italia",
    h1: "Cercare Saint Laurent a meno",
    description: "Saint Laurent economico (Loulou, Niki, Sunset) in Italia: budget, usato, venditori.",
    intent: "buy",
    intro: "Le ricerche « Saint Laurent economico » sono frequenti. Prezzo basso ≠ buon affare.",
    locale: "it",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Attenzione",
        body: "Prezzi irrealistici richiedono più prove.",
      },
      {
        h2: "Percorso",
        body: "Foto → budget → confrontare 2–3 offerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Aiuta la ricerca offerte; non vende stock.",
      },
    ],
    related: ["gz-it-budget-saint-laurent", "gz-it-alternative-saint-laurent", "gz-fr-pas-cher-saint-laurent"],
  },
  {
    slug: "gz-it-pas-cher-bottega-veneta",
    title: "Bottega Veneta economico Italia",
    h1: "Cercare Bottega Veneta a meno",
    description: "Bottega Veneta economico (Jodie, Cassette) in Italia: budget, usato, venditori.",
    intent: "buy",
    intro: "Le ricerche « Bottega Veneta economico » sono frequenti. Prezzo basso ≠ buon affare.",
    locale: "it",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Attenzione",
        body: "Prezzi irrealistici richiedono più prove.",
      },
      {
        h2: "Percorso",
        body: "Foto → budget → confrontare 2–3 offerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Aiuta la ricerca offerte; non vende stock.",
      },
    ],
    related: ["gz-it-budget-bottega-veneta", "gz-it-alternative-bottega-veneta", "gz-fr-pas-cher-bottega-veneta"],
  },
  {
    slug: "gz-it-pas-cher-cartier",
    title: "Cartier economico Italia",
    h1: "Cercare Cartier a meno",
    description: "Cartier economico (Love, Juste un Clou) in Italia: budget, usato, venditori.",
    intent: "buy",
    intro: "Le ricerche « Cartier economico » sono frequenti. Prezzo basso ≠ buon affare.",
    locale: "it",
    brands: ["cartier"],
    sections: [
      {
        h2: "Attenzione",
        body: "Prezzi irrealistici richiedono più prove.",
      },
      {
        h2: "Percorso",
        body: "Foto → budget → confrontare 2–3 offerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Aiuta la ricerca offerte; non vende stock.",
      },
    ],
    related: ["gz-it-budget-cartier", "gz-it-alternative-cartier", "gz-fr-pas-cher-cartier"],
  },
  {
    slug: "gz-it-trouver-vendeur-louis-vuitton",
    title: "Trovare venditore Louis Vuitton Italia",
    h1: "Trovare un venditore Louis Vuitton",
    description: "Trovare venditore Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in Italia: foto, budget, LuxeFinder.",
    intent: "buy",
    intro: "Serve metodo: modello, budget, short-list di offerte — non un solo contatto.",
    locale: "it",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Modello",
        body: "Foto + nome chiaro (Neverfull, Speedy, Alma, Pochette Métis).",
      },
      {
        h2: "Filtro",
        body: "Totale, foto lotto, tempi, pagamento.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + budget → piste. Scelta finale vostra.",
      },
    ],
    related: ["gz-it-budget-louis-vuitton", "gz-it-pas-cher-louis-vuitton", "gz-fr-trouver-vendeur-louis-vuitton"],
  },
  {
    slug: "gz-it-trouver-vendeur-hermes",
    title: "Trovare venditore Hermès Italia",
    h1: "Trovare un venditore Hermès",
    description: "Trovare venditore Hermès (Birkin, Kelly, Evelyne, Picotin) in Italia: foto, budget, LuxeFinder.",
    intent: "buy",
    intro: "Serve metodo: modello, budget, short-list di offerte — non un solo contatto.",
    locale: "it",
    brands: ["hermes"],
    sections: [
      {
        h2: "Modello",
        body: "Foto + nome chiaro (Birkin, Kelly, Evelyne, Picotin).",
      },
      {
        h2: "Filtro",
        body: "Totale, foto lotto, tempi, pagamento.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + budget → piste. Scelta finale vostra.",
      },
    ],
    related: ["gz-it-budget-hermes", "gz-it-pas-cher-hermes", "gz-fr-trouver-vendeur-hermes"],
  },
  {
    slug: "gz-it-trouver-vendeur-chanel",
    title: "Trovare venditore Chanel Italia",
    h1: "Trovare un venditore Chanel",
    description: "Trovare venditore Chanel (Classic Flap, Boy, 19, WOC) in Italia: foto, budget, LuxeFinder.",
    intent: "buy",
    intro: "Serve metodo: modello, budget, short-list di offerte — non un solo contatto.",
    locale: "it",
    brands: ["chanel"],
    sections: [
      {
        h2: "Modello",
        body: "Foto + nome chiaro (Classic Flap, Boy, 19, WOC).",
      },
      {
        h2: "Filtro",
        body: "Totale, foto lotto, tempi, pagamento.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + budget → piste. Scelta finale vostra.",
      },
    ],
    related: ["gz-it-budget-chanel", "gz-it-pas-cher-chanel", "gz-fr-trouver-vendeur-chanel"],
  },
  {
    slug: "gz-it-trouver-vendeur-dior",
    title: "Trovare venditore Dior Italia",
    h1: "Trovare un venditore Dior",
    description: "Trovare venditore Dior (Book Tote, Saddle, Lady Dior) in Italia: foto, budget, LuxeFinder.",
    intent: "buy",
    intro: "Serve metodo: modello, budget, short-list di offerte — non un solo contatto.",
    locale: "it",
    brands: ["dior"],
    sections: [
      {
        h2: "Modello",
        body: "Foto + nome chiaro (Book Tote, Saddle, Lady Dior).",
      },
      {
        h2: "Filtro",
        body: "Totale, foto lotto, tempi, pagamento.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + budget → piste. Scelta finale vostra.",
      },
    ],
    related: ["gz-it-budget-dior", "gz-it-pas-cher-dior", "gz-fr-trouver-vendeur-dior"],
  },
  {
    slug: "gz-it-trouver-vendeur-gucci",
    title: "Trovare venditore Gucci Italia",
    h1: "Trovare un venditore Gucci",
    description: "Trovare venditore Gucci (Jackie, Marmont, Ophidia) in Italia: foto, budget, LuxeFinder.",
    intent: "buy",
    intro: "Serve metodo: modello, budget, short-list di offerte — non un solo contatto.",
    locale: "it",
    brands: ["gucci"],
    sections: [
      {
        h2: "Modello",
        body: "Foto + nome chiaro (Jackie, Marmont, Ophidia).",
      },
      {
        h2: "Filtro",
        body: "Totale, foto lotto, tempi, pagamento.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + budget → piste. Scelta finale vostra.",
      },
    ],
    related: ["gz-it-budget-gucci", "gz-it-pas-cher-gucci", "gz-fr-trouver-vendeur-gucci"],
  },
  {
    slug: "gz-it-trouver-vendeur-saint-laurent",
    title: "Trovare venditore Saint Laurent Italia",
    h1: "Trovare un venditore Saint Laurent",
    description: "Trovare venditore Saint Laurent (Loulou, Niki, Sunset) in Italia: foto, budget, LuxeFinder.",
    intent: "buy",
    intro: "Serve metodo: modello, budget, short-list di offerte — non un solo contatto.",
    locale: "it",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Modello",
        body: "Foto + nome chiaro (Loulou, Niki, Sunset).",
      },
      {
        h2: "Filtro",
        body: "Totale, foto lotto, tempi, pagamento.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + budget → piste. Scelta finale vostra.",
      },
    ],
    related: ["gz-it-budget-saint-laurent", "gz-it-pas-cher-saint-laurent", "gz-fr-trouver-vendeur-saint-laurent"],
  },
  {
    slug: "gz-it-trouver-vendeur-bottega-veneta",
    title: "Trovare venditore Bottega Veneta Italia",
    h1: "Trovare un venditore Bottega Veneta",
    description: "Trovare venditore Bottega Veneta (Jodie, Cassette) in Italia: foto, budget, LuxeFinder.",
    intent: "buy",
    intro: "Serve metodo: modello, budget, short-list di offerte — non un solo contatto.",
    locale: "it",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Modello",
        body: "Foto + nome chiaro (Jodie, Cassette).",
      },
      {
        h2: "Filtro",
        body: "Totale, foto lotto, tempi, pagamento.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + budget → piste. Scelta finale vostra.",
      },
    ],
    related: ["gz-it-budget-bottega-veneta", "gz-it-pas-cher-bottega-veneta", "gz-fr-trouver-vendeur-bottega-veneta"],
  },
  {
    slug: "gz-it-trouver-vendeur-cartier",
    title: "Trovare venditore Cartier Italia",
    h1: "Trovare un venditore Cartier",
    description: "Trovare venditore Cartier (Love, Juste un Clou) in Italia: foto, budget, LuxeFinder.",
    intent: "buy",
    intro: "Serve metodo: modello, budget, short-list di offerte — non un solo contatto.",
    locale: "it",
    brands: ["cartier"],
    sections: [
      {
        h2: "Modello",
        body: "Foto + nome chiaro (Love, Juste un Clou).",
      },
      {
        h2: "Filtro",
        body: "Totale, foto lotto, tempi, pagamento.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + budget → piste. Scelta finale vostra.",
      },
    ],
    related: ["gz-it-budget-cartier", "gz-it-pas-cher-cartier", "gz-fr-trouver-vendeur-cartier"],
  },
  {
    slug: "gz-it-occasion-louis-vuitton",
    title: "Louis Vuitton usato Italia",
    h1: "Comprare Louis Vuitton usato",
    description: "Louis Vuitton usato (Neverfull, Speedy, Alma, Pochette Métis) in Italia: stato, prezzo, venditori.",
    intent: "buy",
    intro: "L’usato è la leva n°1 per un prezzo più basso su Louis Vuitton in Italia.",
    locale: "it",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Stato",
        body: "Angoli, manici, interno, hardware.",
      },
      {
        h2: "Prezzo",
        body: "Confrontate più annunci.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto per confermare il modello, poi offerte.",
      },
    ],
    related: ["gz-it-budget-louis-vuitton", "gz-it-alternative-louis-vuitton", "gz-fr-occasion-louis-vuitton"],
  },
  {
    slug: "gz-it-occasion-hermes",
    title: "Hermès usato Italia",
    h1: "Comprare Hermès usato",
    description: "Hermès usato (Birkin, Kelly, Evelyne, Picotin) in Italia: stato, prezzo, venditori.",
    intent: "buy",
    intro: "L’usato è la leva n°1 per un prezzo più basso su Hermès in Italia.",
    locale: "it",
    brands: ["hermes"],
    sections: [
      {
        h2: "Stato",
        body: "Angoli, manici, interno, hardware.",
      },
      {
        h2: "Prezzo",
        body: "Confrontate più annunci.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto per confermare il modello, poi offerte.",
      },
    ],
    related: ["gz-it-budget-hermes", "gz-it-alternative-hermes", "gz-fr-occasion-hermes"],
  },
  {
    slug: "gz-it-occasion-chanel",
    title: "Chanel usato Italia",
    h1: "Comprare Chanel usato",
    description: "Chanel usato (Classic Flap, Boy, 19, WOC) in Italia: stato, prezzo, venditori.",
    intent: "buy",
    intro: "L’usato è la leva n°1 per un prezzo più basso su Chanel in Italia.",
    locale: "it",
    brands: ["chanel"],
    sections: [
      {
        h2: "Stato",
        body: "Angoli, manici, interno, hardware.",
      },
      {
        h2: "Prezzo",
        body: "Confrontate più annunci.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto per confermare il modello, poi offerte.",
      },
    ],
    related: ["gz-it-budget-chanel", "gz-it-alternative-chanel", "gz-fr-occasion-chanel"],
  },
  {
    slug: "gz-it-occasion-dior",
    title: "Dior usato Italia",
    h1: "Comprare Dior usato",
    description: "Dior usato (Book Tote, Saddle, Lady Dior) in Italia: stato, prezzo, venditori.",
    intent: "buy",
    intro: "L’usato è la leva n°1 per un prezzo più basso su Dior in Italia.",
    locale: "it",
    brands: ["dior"],
    sections: [
      {
        h2: "Stato",
        body: "Angoli, manici, interno, hardware.",
      },
      {
        h2: "Prezzo",
        body: "Confrontate più annunci.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto per confermare il modello, poi offerte.",
      },
    ],
    related: ["gz-it-budget-dior", "gz-it-alternative-dior", "gz-fr-occasion-dior"],
  },
  {
    slug: "gz-it-occasion-gucci",
    title: "Gucci usato Italia",
    h1: "Comprare Gucci usato",
    description: "Gucci usato (Jackie, Marmont, Ophidia) in Italia: stato, prezzo, venditori.",
    intent: "buy",
    intro: "L’usato è la leva n°1 per un prezzo più basso su Gucci in Italia.",
    locale: "it",
    brands: ["gucci"],
    sections: [
      {
        h2: "Stato",
        body: "Angoli, manici, interno, hardware.",
      },
      {
        h2: "Prezzo",
        body: "Confrontate più annunci.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto per confermare il modello, poi offerte.",
      },
    ],
    related: ["gz-it-budget-gucci", "gz-it-alternative-gucci", "gz-fr-occasion-gucci"],
  },
  {
    slug: "gz-it-occasion-saint-laurent",
    title: "Saint Laurent usato Italia",
    h1: "Comprare Saint Laurent usato",
    description: "Saint Laurent usato (Loulou, Niki, Sunset) in Italia: stato, prezzo, venditori.",
    intent: "buy",
    intro: "L’usato è la leva n°1 per un prezzo più basso su Saint Laurent in Italia.",
    locale: "it",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Stato",
        body: "Angoli, manici, interno, hardware.",
      },
      {
        h2: "Prezzo",
        body: "Confrontate più annunci.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto per confermare il modello, poi offerte.",
      },
    ],
    related: ["gz-it-budget-saint-laurent", "gz-it-alternative-saint-laurent", "gz-fr-occasion-saint-laurent"],
  },
  {
    slug: "gz-it-occasion-bottega-veneta",
    title: "Bottega Veneta usato Italia",
    h1: "Comprare Bottega Veneta usato",
    description: "Bottega Veneta usato (Jodie, Cassette) in Italia: stato, prezzo, venditori.",
    intent: "buy",
    intro: "L’usato è la leva n°1 per un prezzo più basso su Bottega Veneta in Italia.",
    locale: "it",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Stato",
        body: "Angoli, manici, interno, hardware.",
      },
      {
        h2: "Prezzo",
        body: "Confrontate più annunci.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto per confermare il modello, poi offerte.",
      },
    ],
    related: ["gz-it-budget-bottega-veneta", "gz-it-alternative-bottega-veneta", "gz-fr-occasion-bottega-veneta"],
  },
  {
    slug: "gz-it-occasion-cartier",
    title: "Cartier usato Italia",
    h1: "Comprare Cartier usato",
    description: "Cartier usato (Love, Juste un Clou) in Italia: stato, prezzo, venditori.",
    intent: "buy",
    intro: "L’usato è la leva n°1 per un prezzo più basso su Cartier in Italia.",
    locale: "it",
    brands: ["cartier"],
    sections: [
      {
        h2: "Stato",
        body: "Angoli, manici, interno, hardware.",
      },
      {
        h2: "Prezzo",
        body: "Confrontate più annunci.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto per confermare il modello, poi offerte.",
      },
    ],
    related: ["gz-it-budget-cartier", "gz-it-alternative-cartier", "gz-fr-occasion-cartier"],
  },
  {
    slug: "gz-es-budget-louis-vuitton",
    title: "Presupuesto Louis Vuitton en España",
    h1: "Definir un presupuesto Louis Vuitton",
    description: "Presupuesto Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) en España. Foto + rango → pistas de vendedores con LuxeFinder.",
    intent: "howto",
    intro: "De nuevo, Louis Vuitton suele superar el presupuesto. En España se busca una oferta más asequible (segunda mano, vendedores). Empiece con un tope y una foto (Neverfull, Speedy, Alma, Pochette Métis).",
    locale: "es",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Tope",
        body: "Artículo + envío + margen.",
      },
      {
        h2: "Modelo",
        body: "Nombre preciso (Neverfull, Speedy, Alma, Pochette Métis) + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Suba foto y presupuesto. LuxeFinder no vende ni autentica automáticamente.",
      },
    ],
    related: ["gz-es-pas-cher-louis-vuitton", "gz-es-trouver-vendeur-louis-vuitton", "gz-fr-budget-louis-vuitton"],
  },
  {
    slug: "gz-es-budget-hermes",
    title: "Presupuesto Hermès en España",
    h1: "Definir un presupuesto Hermès",
    description: "Presupuesto Hermès (Birkin, Kelly, Evelyne, Picotin) en España. Foto + rango → pistas de vendedores con LuxeFinder.",
    intent: "howto",
    intro: "De nuevo, Hermès suele superar el presupuesto. En España se busca una oferta más asequible (segunda mano, vendedores). Empiece con un tope y una foto (Birkin, Kelly, Evelyne, Picotin).",
    locale: "es",
    brands: ["hermes"],
    sections: [
      {
        h2: "Tope",
        body: "Artículo + envío + margen.",
      },
      {
        h2: "Modelo",
        body: "Nombre preciso (Birkin, Kelly, Evelyne, Picotin) + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Suba foto y presupuesto. LuxeFinder no vende ni autentica automáticamente.",
      },
    ],
    related: ["gz-es-pas-cher-hermes", "gz-es-trouver-vendeur-hermes", "gz-fr-budget-hermes"],
  },
  {
    slug: "gz-es-budget-chanel",
    title: "Presupuesto Chanel en España",
    h1: "Definir un presupuesto Chanel",
    description: "Presupuesto Chanel (Classic Flap, Boy, 19, WOC) en España. Foto + rango → pistas de vendedores con LuxeFinder.",
    intent: "howto",
    intro: "De nuevo, Chanel suele superar el presupuesto. En España se busca una oferta más asequible (segunda mano, vendedores). Empiece con un tope y una foto (Classic Flap, Boy, 19, WOC).",
    locale: "es",
    brands: ["chanel"],
    sections: [
      {
        h2: "Tope",
        body: "Artículo + envío + margen.",
      },
      {
        h2: "Modelo",
        body: "Nombre preciso (Classic Flap, Boy, 19, WOC) + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Suba foto y presupuesto. LuxeFinder no vende ni autentica automáticamente.",
      },
    ],
    related: ["gz-es-pas-cher-chanel", "gz-es-trouver-vendeur-chanel", "gz-fr-budget-chanel"],
  },
  {
    slug: "gz-es-budget-dior",
    title: "Presupuesto Dior en España",
    h1: "Definir un presupuesto Dior",
    description: "Presupuesto Dior (Book Tote, Saddle, Lady Dior) en España. Foto + rango → pistas de vendedores con LuxeFinder.",
    intent: "howto",
    intro: "De nuevo, Dior suele superar el presupuesto. En España se busca una oferta más asequible (segunda mano, vendedores). Empiece con un tope y una foto (Book Tote, Saddle, Lady Dior).",
    locale: "es",
    brands: ["dior"],
    sections: [
      {
        h2: "Tope",
        body: "Artículo + envío + margen.",
      },
      {
        h2: "Modelo",
        body: "Nombre preciso (Book Tote, Saddle, Lady Dior) + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Suba foto y presupuesto. LuxeFinder no vende ni autentica automáticamente.",
      },
    ],
    related: ["gz-es-pas-cher-dior", "gz-es-trouver-vendeur-dior", "gz-fr-budget-dior"],
  },
  {
    slug: "gz-es-budget-gucci",
    title: "Presupuesto Gucci en España",
    h1: "Definir un presupuesto Gucci",
    description: "Presupuesto Gucci (Jackie, Marmont, Ophidia) en España. Foto + rango → pistas de vendedores con LuxeFinder.",
    intent: "howto",
    intro: "De nuevo, Gucci suele superar el presupuesto. En España se busca una oferta más asequible (segunda mano, vendedores). Empiece con un tope y una foto (Jackie, Marmont, Ophidia).",
    locale: "es",
    brands: ["gucci"],
    sections: [
      {
        h2: "Tope",
        body: "Artículo + envío + margen.",
      },
      {
        h2: "Modelo",
        body: "Nombre preciso (Jackie, Marmont, Ophidia) + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Suba foto y presupuesto. LuxeFinder no vende ni autentica automáticamente.",
      },
    ],
    related: ["gz-es-pas-cher-gucci", "gz-es-trouver-vendeur-gucci", "gz-fr-budget-gucci"],
  },
  {
    slug: "gz-es-budget-saint-laurent",
    title: "Presupuesto Saint Laurent en España",
    h1: "Definir un presupuesto Saint Laurent",
    description: "Presupuesto Saint Laurent (Loulou, Niki, Sunset) en España. Foto + rango → pistas de vendedores con LuxeFinder.",
    intent: "howto",
    intro: "De nuevo, Saint Laurent suele superar el presupuesto. En España se busca una oferta más asequible (segunda mano, vendedores). Empiece con un tope y una foto (Loulou, Niki, Sunset).",
    locale: "es",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Tope",
        body: "Artículo + envío + margen.",
      },
      {
        h2: "Modelo",
        body: "Nombre preciso (Loulou, Niki, Sunset) + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Suba foto y presupuesto. LuxeFinder no vende ni autentica automáticamente.",
      },
    ],
    related: ["gz-es-pas-cher-saint-laurent", "gz-es-trouver-vendeur-saint-laurent", "gz-fr-budget-saint-laurent"],
  },
  {
    slug: "gz-es-budget-bottega-veneta",
    title: "Presupuesto Bottega Veneta en España",
    h1: "Definir un presupuesto Bottega Veneta",
    description: "Presupuesto Bottega Veneta (Jodie, Cassette) en España. Foto + rango → pistas de vendedores con LuxeFinder.",
    intent: "howto",
    intro: "De nuevo, Bottega Veneta suele superar el presupuesto. En España se busca una oferta más asequible (segunda mano, vendedores). Empiece con un tope y una foto (Jodie, Cassette).",
    locale: "es",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Tope",
        body: "Artículo + envío + margen.",
      },
      {
        h2: "Modelo",
        body: "Nombre preciso (Jodie, Cassette) + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Suba foto y presupuesto. LuxeFinder no vende ni autentica automáticamente.",
      },
    ],
    related: ["gz-es-pas-cher-bottega-veneta", "gz-es-trouver-vendeur-bottega-veneta", "gz-fr-budget-bottega-veneta"],
  },
  {
    slug: "gz-es-budget-cartier",
    title: "Presupuesto Cartier en España",
    h1: "Definir un presupuesto Cartier",
    description: "Presupuesto Cartier (Love, Juste un Clou) en España. Foto + rango → pistas de vendedores con LuxeFinder.",
    intent: "howto",
    intro: "De nuevo, Cartier suele superar el presupuesto. En España se busca una oferta más asequible (segunda mano, vendedores). Empiece con un tope y una foto (Love, Juste un Clou).",
    locale: "es",
    brands: ["cartier"],
    sections: [
      {
        h2: "Tope",
        body: "Artículo + envío + margen.",
      },
      {
        h2: "Modelo",
        body: "Nombre preciso (Love, Juste un Clou) + foto.",
      },
      {
        h2: "LuxeFinder",
        body: "Suba foto y presupuesto. LuxeFinder no vende ni autentica automáticamente.",
      },
    ],
    related: ["gz-es-pas-cher-cartier", "gz-es-trouver-vendeur-cartier", "gz-fr-budget-cartier"],
  },
  {
    slug: "gz-es-alternative-louis-vuitton",
    title: "Alternativa a Louis Vuitton (España)",
    h1: "Buscar una alternativa a Louis Vuitton",
    description: "Alternativa Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) en España: segunda mano, presupuestos, vendedores.",
    intent: "howto",
    intro: "« Alternativa a Louis Vuitton » suele significar mismo uso/look por menos — a menudo ocasión. No es un sustituto oficial.",
    locale: "es",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Comparar",
        body: "Uso, talla, estado, precio total.",
      },
      {
        h2: "Pruebas",
        body: "Fotos recientes, historial.",
      },
      {
        h2: "App",
        body: "Foto + presupuesto en LuxeFinder — short-list sin garantía de autenticidad.",
      },
    ],
    related: ["gz-es-budget-louis-vuitton", "gz-es-occasion-louis-vuitton", "gz-fr-alternative-louis-vuitton"],
  },
  {
    slug: "gz-es-alternative-hermes",
    title: "Alternativa a Hermès (España)",
    h1: "Buscar una alternativa a Hermès",
    description: "Alternativa Hermès (Birkin, Kelly, Evelyne, Picotin) en España: segunda mano, presupuestos, vendedores.",
    intent: "howto",
    intro: "« Alternativa a Hermès » suele significar mismo uso/look por menos — a menudo ocasión. No es un sustituto oficial.",
    locale: "es",
    brands: ["hermes"],
    sections: [
      {
        h2: "Comparar",
        body: "Uso, talla, estado, precio total.",
      },
      {
        h2: "Pruebas",
        body: "Fotos recientes, historial.",
      },
      {
        h2: "App",
        body: "Foto + presupuesto en LuxeFinder — short-list sin garantía de autenticidad.",
      },
    ],
    related: ["gz-es-budget-hermes", "gz-es-occasion-hermes", "gz-fr-alternative-hermes"],
  },
  {
    slug: "gz-es-alternative-chanel",
    title: "Alternativa a Chanel (España)",
    h1: "Buscar una alternativa a Chanel",
    description: "Alternativa Chanel (Classic Flap, Boy, 19, WOC) en España: segunda mano, presupuestos, vendedores.",
    intent: "howto",
    intro: "« Alternativa a Chanel » suele significar mismo uso/look por menos — a menudo ocasión. No es un sustituto oficial.",
    locale: "es",
    brands: ["chanel"],
    sections: [
      {
        h2: "Comparar",
        body: "Uso, talla, estado, precio total.",
      },
      {
        h2: "Pruebas",
        body: "Fotos recientes, historial.",
      },
      {
        h2: "App",
        body: "Foto + presupuesto en LuxeFinder — short-list sin garantía de autenticidad.",
      },
    ],
    related: ["gz-es-budget-chanel", "gz-es-occasion-chanel", "gz-fr-alternative-chanel"],
  },
  {
    slug: "gz-es-alternative-dior",
    title: "Alternativa a Dior (España)",
    h1: "Buscar una alternativa a Dior",
    description: "Alternativa Dior (Book Tote, Saddle, Lady Dior) en España: segunda mano, presupuestos, vendedores.",
    intent: "howto",
    intro: "« Alternativa a Dior » suele significar mismo uso/look por menos — a menudo ocasión. No es un sustituto oficial.",
    locale: "es",
    brands: ["dior"],
    sections: [
      {
        h2: "Comparar",
        body: "Uso, talla, estado, precio total.",
      },
      {
        h2: "Pruebas",
        body: "Fotos recientes, historial.",
      },
      {
        h2: "App",
        body: "Foto + presupuesto en LuxeFinder — short-list sin garantía de autenticidad.",
      },
    ],
    related: ["gz-es-budget-dior", "gz-es-occasion-dior", "gz-fr-alternative-dior"],
  },
  {
    slug: "gz-es-alternative-gucci",
    title: "Alternativa a Gucci (España)",
    h1: "Buscar una alternativa a Gucci",
    description: "Alternativa Gucci (Jackie, Marmont, Ophidia) en España: segunda mano, presupuestos, vendedores.",
    intent: "howto",
    intro: "« Alternativa a Gucci » suele significar mismo uso/look por menos — a menudo ocasión. No es un sustituto oficial.",
    locale: "es",
    brands: ["gucci"],
    sections: [
      {
        h2: "Comparar",
        body: "Uso, talla, estado, precio total.",
      },
      {
        h2: "Pruebas",
        body: "Fotos recientes, historial.",
      },
      {
        h2: "App",
        body: "Foto + presupuesto en LuxeFinder — short-list sin garantía de autenticidad.",
      },
    ],
    related: ["gz-es-budget-gucci", "gz-es-occasion-gucci", "gz-fr-alternative-gucci"],
  },
  {
    slug: "gz-es-alternative-saint-laurent",
    title: "Alternativa a Saint Laurent (España)",
    h1: "Buscar una alternativa a Saint Laurent",
    description: "Alternativa Saint Laurent (Loulou, Niki, Sunset) en España: segunda mano, presupuestos, vendedores.",
    intent: "howto",
    intro: "« Alternativa a Saint Laurent » suele significar mismo uso/look por menos — a menudo ocasión. No es un sustituto oficial.",
    locale: "es",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Comparar",
        body: "Uso, talla, estado, precio total.",
      },
      {
        h2: "Pruebas",
        body: "Fotos recientes, historial.",
      },
      {
        h2: "App",
        body: "Foto + presupuesto en LuxeFinder — short-list sin garantía de autenticidad.",
      },
    ],
    related: ["gz-es-budget-saint-laurent", "gz-es-occasion-saint-laurent", "gz-fr-alternative-saint-laurent"],
  },
  {
    slug: "gz-es-alternative-bottega-veneta",
    title: "Alternativa a Bottega Veneta (España)",
    h1: "Buscar una alternativa a Bottega Veneta",
    description: "Alternativa Bottega Veneta (Jodie, Cassette) en España: segunda mano, presupuestos, vendedores.",
    intent: "howto",
    intro: "« Alternativa a Bottega Veneta » suele significar mismo uso/look por menos — a menudo ocasión. No es un sustituto oficial.",
    locale: "es",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Comparar",
        body: "Uso, talla, estado, precio total.",
      },
      {
        h2: "Pruebas",
        body: "Fotos recientes, historial.",
      },
      {
        h2: "App",
        body: "Foto + presupuesto en LuxeFinder — short-list sin garantía de autenticidad.",
      },
    ],
    related: ["gz-es-budget-bottega-veneta", "gz-es-occasion-bottega-veneta", "gz-fr-alternative-bottega-veneta"],
  },
  {
    slug: "gz-es-alternative-cartier",
    title: "Alternativa a Cartier (España)",
    h1: "Buscar una alternativa a Cartier",
    description: "Alternativa Cartier (Love, Juste un Clou) en España: segunda mano, presupuestos, vendedores.",
    intent: "howto",
    intro: "« Alternativa a Cartier » suele significar mismo uso/look por menos — a menudo ocasión. No es un sustituto oficial.",
    locale: "es",
    brands: ["cartier"],
    sections: [
      {
        h2: "Comparar",
        body: "Uso, talla, estado, precio total.",
      },
      {
        h2: "Pruebas",
        body: "Fotos recientes, historial.",
      },
      {
        h2: "App",
        body: "Foto + presupuesto en LuxeFinder — short-list sin garantía de autenticidad.",
      },
    ],
    related: ["gz-es-budget-cartier", "gz-es-occasion-cartier", "gz-fr-alternative-cartier"],
  },
  {
    slug: "gz-es-pas-cher-louis-vuitton",
    title: "Louis Vuitton barato España",
    h1: "Buscar Louis Vuitton más barato",
    description: "Louis Vuitton barato (Neverfull, Speedy, Alma, Pochette Métis) en España: presupuesto, ocasión, vendedores.",
    intent: "buy",
    intro: "Las búsquedas « Louis Vuitton barato » son fuertes. Precio bajo ≠ buena compra.",
    locale: "es",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Cuidado",
        body: "Precios irreales exigen más pruebas.",
      },
      {
        h2: "Método",
        body: "Foto → presupuesto → comparar 2–3 ofertas.",
      },
      {
        h2: "LuxeFinder",
        body: "Ayuda a buscar ofertas; no vende stock.",
      },
    ],
    related: ["gz-es-budget-louis-vuitton", "gz-es-alternative-louis-vuitton", "gz-fr-pas-cher-louis-vuitton"],
  },
  {
    slug: "gz-es-pas-cher-hermes",
    title: "Hermès barato España",
    h1: "Buscar Hermès más barato",
    description: "Hermès barato (Birkin, Kelly, Evelyne, Picotin) en España: presupuesto, ocasión, vendedores.",
    intent: "buy",
    intro: "Las búsquedas « Hermès barato » son fuertes. Precio bajo ≠ buena compra.",
    locale: "es",
    brands: ["hermes"],
    sections: [
      {
        h2: "Cuidado",
        body: "Precios irreales exigen más pruebas.",
      },
      {
        h2: "Método",
        body: "Foto → presupuesto → comparar 2–3 ofertas.",
      },
      {
        h2: "LuxeFinder",
        body: "Ayuda a buscar ofertas; no vende stock.",
      },
    ],
    related: ["gz-es-budget-hermes", "gz-es-alternative-hermes", "gz-fr-pas-cher-hermes"],
  },
  {
    slug: "gz-es-pas-cher-chanel",
    title: "Chanel barato España",
    h1: "Buscar Chanel más barato",
    description: "Chanel barato (Classic Flap, Boy, 19, WOC) en España: presupuesto, ocasión, vendedores.",
    intent: "buy",
    intro: "Las búsquedas « Chanel barato » son fuertes. Precio bajo ≠ buena compra.",
    locale: "es",
    brands: ["chanel"],
    sections: [
      {
        h2: "Cuidado",
        body: "Precios irreales exigen más pruebas.",
      },
      {
        h2: "Método",
        body: "Foto → presupuesto → comparar 2–3 ofertas.",
      },
      {
        h2: "LuxeFinder",
        body: "Ayuda a buscar ofertas; no vende stock.",
      },
    ],
    related: ["gz-es-budget-chanel", "gz-es-alternative-chanel", "gz-fr-pas-cher-chanel"],
  },
  {
    slug: "gz-es-pas-cher-dior",
    title: "Dior barato España",
    h1: "Buscar Dior más barato",
    description: "Dior barato (Book Tote, Saddle, Lady Dior) en España: presupuesto, ocasión, vendedores.",
    intent: "buy",
    intro: "Las búsquedas « Dior barato » son fuertes. Precio bajo ≠ buena compra.",
    locale: "es",
    brands: ["dior"],
    sections: [
      {
        h2: "Cuidado",
        body: "Precios irreales exigen más pruebas.",
      },
      {
        h2: "Método",
        body: "Foto → presupuesto → comparar 2–3 ofertas.",
      },
      {
        h2: "LuxeFinder",
        body: "Ayuda a buscar ofertas; no vende stock.",
      },
    ],
    related: ["gz-es-budget-dior", "gz-es-alternative-dior", "gz-fr-pas-cher-dior"],
  },
  {
    slug: "gz-es-pas-cher-gucci",
    title: "Gucci barato España",
    h1: "Buscar Gucci más barato",
    description: "Gucci barato (Jackie, Marmont, Ophidia) en España: presupuesto, ocasión, vendedores.",
    intent: "buy",
    intro: "Las búsquedas « Gucci barato » son fuertes. Precio bajo ≠ buena compra.",
    locale: "es",
    brands: ["gucci"],
    sections: [
      {
        h2: "Cuidado",
        body: "Precios irreales exigen más pruebas.",
      },
      {
        h2: "Método",
        body: "Foto → presupuesto → comparar 2–3 ofertas.",
      },
      {
        h2: "LuxeFinder",
        body: "Ayuda a buscar ofertas; no vende stock.",
      },
    ],
    related: ["gz-es-budget-gucci", "gz-es-alternative-gucci", "gz-fr-pas-cher-gucci"],
  },
  {
    slug: "gz-es-pas-cher-saint-laurent",
    title: "Saint Laurent barato España",
    h1: "Buscar Saint Laurent más barato",
    description: "Saint Laurent barato (Loulou, Niki, Sunset) en España: presupuesto, ocasión, vendedores.",
    intent: "buy",
    intro: "Las búsquedas « Saint Laurent barato » son fuertes. Precio bajo ≠ buena compra.",
    locale: "es",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Cuidado",
        body: "Precios irreales exigen más pruebas.",
      },
      {
        h2: "Método",
        body: "Foto → presupuesto → comparar 2–3 ofertas.",
      },
      {
        h2: "LuxeFinder",
        body: "Ayuda a buscar ofertas; no vende stock.",
      },
    ],
    related: ["gz-es-budget-saint-laurent", "gz-es-alternative-saint-laurent", "gz-fr-pas-cher-saint-laurent"],
  },
  {
    slug: "gz-es-pas-cher-bottega-veneta",
    title: "Bottega Veneta barato España",
    h1: "Buscar Bottega Veneta más barato",
    description: "Bottega Veneta barato (Jodie, Cassette) en España: presupuesto, ocasión, vendedores.",
    intent: "buy",
    intro: "Las búsquedas « Bottega Veneta barato » son fuertes. Precio bajo ≠ buena compra.",
    locale: "es",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Cuidado",
        body: "Precios irreales exigen más pruebas.",
      },
      {
        h2: "Método",
        body: "Foto → presupuesto → comparar 2–3 ofertas.",
      },
      {
        h2: "LuxeFinder",
        body: "Ayuda a buscar ofertas; no vende stock.",
      },
    ],
    related: ["gz-es-budget-bottega-veneta", "gz-es-alternative-bottega-veneta", "gz-fr-pas-cher-bottega-veneta"],
  },
  {
    slug: "gz-es-pas-cher-cartier",
    title: "Cartier barato España",
    h1: "Buscar Cartier más barato",
    description: "Cartier barato (Love, Juste un Clou) en España: presupuesto, ocasión, vendedores.",
    intent: "buy",
    intro: "Las búsquedas « Cartier barato » son fuertes. Precio bajo ≠ buena compra.",
    locale: "es",
    brands: ["cartier"],
    sections: [
      {
        h2: "Cuidado",
        body: "Precios irreales exigen más pruebas.",
      },
      {
        h2: "Método",
        body: "Foto → presupuesto → comparar 2–3 ofertas.",
      },
      {
        h2: "LuxeFinder",
        body: "Ayuda a buscar ofertas; no vende stock.",
      },
    ],
    related: ["gz-es-budget-cartier", "gz-es-alternative-cartier", "gz-fr-pas-cher-cartier"],
  },
  {
    slug: "gz-es-trouver-vendeur-louis-vuitton",
    title: "Encontrar vendedor Louis Vuitton España",
    h1: "Encontrar un vendedor de Louis Vuitton",
    description: "Encontrar vendedor Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) en España: foto, presupuesto, LuxeFinder.",
    intent: "buy",
    intro: "Hace falta método: modelo, presupuesto, short-list — no un solo contacto.",
    locale: "es",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Modelo",
        body: "Foto + nombre claro (Neverfull, Speedy, Alma, Pochette Métis).",
      },
      {
        h2: "Filtro",
        body: "Total, fotos del lote, plazo, pago.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + presupuesto → pistas. Decisión final suya.",
      },
    ],
    related: ["gz-es-budget-louis-vuitton", "gz-es-pas-cher-louis-vuitton", "gz-fr-trouver-vendeur-louis-vuitton"],
  },
  {
    slug: "gz-es-trouver-vendeur-hermes",
    title: "Encontrar vendedor Hermès España",
    h1: "Encontrar un vendedor de Hermès",
    description: "Encontrar vendedor Hermès (Birkin, Kelly, Evelyne, Picotin) en España: foto, presupuesto, LuxeFinder.",
    intent: "buy",
    intro: "Hace falta método: modelo, presupuesto, short-list — no un solo contacto.",
    locale: "es",
    brands: ["hermes"],
    sections: [
      {
        h2: "Modelo",
        body: "Foto + nombre claro (Birkin, Kelly, Evelyne, Picotin).",
      },
      {
        h2: "Filtro",
        body: "Total, fotos del lote, plazo, pago.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + presupuesto → pistas. Decisión final suya.",
      },
    ],
    related: ["gz-es-budget-hermes", "gz-es-pas-cher-hermes", "gz-fr-trouver-vendeur-hermes"],
  },
  {
    slug: "gz-es-trouver-vendeur-chanel",
    title: "Encontrar vendedor Chanel España",
    h1: "Encontrar un vendedor de Chanel",
    description: "Encontrar vendedor Chanel (Classic Flap, Boy, 19, WOC) en España: foto, presupuesto, LuxeFinder.",
    intent: "buy",
    intro: "Hace falta método: modelo, presupuesto, short-list — no un solo contacto.",
    locale: "es",
    brands: ["chanel"],
    sections: [
      {
        h2: "Modelo",
        body: "Foto + nombre claro (Classic Flap, Boy, 19, WOC).",
      },
      {
        h2: "Filtro",
        body: "Total, fotos del lote, plazo, pago.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + presupuesto → pistas. Decisión final suya.",
      },
    ],
    related: ["gz-es-budget-chanel", "gz-es-pas-cher-chanel", "gz-fr-trouver-vendeur-chanel"],
  },
  {
    slug: "gz-es-trouver-vendeur-dior",
    title: "Encontrar vendedor Dior España",
    h1: "Encontrar un vendedor de Dior",
    description: "Encontrar vendedor Dior (Book Tote, Saddle, Lady Dior) en España: foto, presupuesto, LuxeFinder.",
    intent: "buy",
    intro: "Hace falta método: modelo, presupuesto, short-list — no un solo contacto.",
    locale: "es",
    brands: ["dior"],
    sections: [
      {
        h2: "Modelo",
        body: "Foto + nombre claro (Book Tote, Saddle, Lady Dior).",
      },
      {
        h2: "Filtro",
        body: "Total, fotos del lote, plazo, pago.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + presupuesto → pistas. Decisión final suya.",
      },
    ],
    related: ["gz-es-budget-dior", "gz-es-pas-cher-dior", "gz-fr-trouver-vendeur-dior"],
  },
  {
    slug: "gz-es-trouver-vendeur-gucci",
    title: "Encontrar vendedor Gucci España",
    h1: "Encontrar un vendedor de Gucci",
    description: "Encontrar vendedor Gucci (Jackie, Marmont, Ophidia) en España: foto, presupuesto, LuxeFinder.",
    intent: "buy",
    intro: "Hace falta método: modelo, presupuesto, short-list — no un solo contacto.",
    locale: "es",
    brands: ["gucci"],
    sections: [
      {
        h2: "Modelo",
        body: "Foto + nombre claro (Jackie, Marmont, Ophidia).",
      },
      {
        h2: "Filtro",
        body: "Total, fotos del lote, plazo, pago.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + presupuesto → pistas. Decisión final suya.",
      },
    ],
    related: ["gz-es-budget-gucci", "gz-es-pas-cher-gucci", "gz-fr-trouver-vendeur-gucci"],
  },
  {
    slug: "gz-es-trouver-vendeur-saint-laurent",
    title: "Encontrar vendedor Saint Laurent España",
    h1: "Encontrar un vendedor de Saint Laurent",
    description: "Encontrar vendedor Saint Laurent (Loulou, Niki, Sunset) en España: foto, presupuesto, LuxeFinder.",
    intent: "buy",
    intro: "Hace falta método: modelo, presupuesto, short-list — no un solo contacto.",
    locale: "es",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Modelo",
        body: "Foto + nombre claro (Loulou, Niki, Sunset).",
      },
      {
        h2: "Filtro",
        body: "Total, fotos del lote, plazo, pago.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + presupuesto → pistas. Decisión final suya.",
      },
    ],
    related: ["gz-es-budget-saint-laurent", "gz-es-pas-cher-saint-laurent", "gz-fr-trouver-vendeur-saint-laurent"],
  },
  {
    slug: "gz-es-trouver-vendeur-bottega-veneta",
    title: "Encontrar vendedor Bottega Veneta España",
    h1: "Encontrar un vendedor de Bottega Veneta",
    description: "Encontrar vendedor Bottega Veneta (Jodie, Cassette) en España: foto, presupuesto, LuxeFinder.",
    intent: "buy",
    intro: "Hace falta método: modelo, presupuesto, short-list — no un solo contacto.",
    locale: "es",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Modelo",
        body: "Foto + nombre claro (Jodie, Cassette).",
      },
      {
        h2: "Filtro",
        body: "Total, fotos del lote, plazo, pago.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + presupuesto → pistas. Decisión final suya.",
      },
    ],
    related: ["gz-es-budget-bottega-veneta", "gz-es-pas-cher-bottega-veneta", "gz-fr-trouver-vendeur-bottega-veneta"],
  },
  {
    slug: "gz-es-trouver-vendeur-cartier",
    title: "Encontrar vendedor Cartier España",
    h1: "Encontrar un vendedor de Cartier",
    description: "Encontrar vendedor Cartier (Love, Juste un Clou) en España: foto, presupuesto, LuxeFinder.",
    intent: "buy",
    intro: "Hace falta método: modelo, presupuesto, short-list — no un solo contacto.",
    locale: "es",
    brands: ["cartier"],
    sections: [
      {
        h2: "Modelo",
        body: "Foto + nombre claro (Love, Juste un Clou).",
      },
      {
        h2: "Filtro",
        body: "Total, fotos del lote, plazo, pago.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto + presupuesto → pistas. Decisión final suya.",
      },
    ],
    related: ["gz-es-budget-cartier", "gz-es-pas-cher-cartier", "gz-fr-trouver-vendeur-cartier"],
  },
  {
    slug: "gz-es-occasion-louis-vuitton",
    title: "Louis Vuitton segunda mano España",
    h1: "Comprar Louis Vuitton de segunda mano",
    description: "Louis Vuitton ocasión (Neverfull, Speedy, Alma, Pochette Métis) en España: estado, precio, vendedores.",
    intent: "buy",
    intro: "La segunda mano es la vía nº1 a un precio más bajo de Louis Vuitton en España.",
    locale: "es",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Estado",
        body: "Esquinas, asas, interior, herrajes.",
      },
      {
        h2: "Precio",
        body: "Compare varios anuncios.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto para confirmar modelo, luego ofertas.",
      },
    ],
    related: ["gz-es-budget-louis-vuitton", "gz-es-alternative-louis-vuitton", "gz-fr-occasion-louis-vuitton"],
  },
  {
    slug: "gz-es-occasion-hermes",
    title: "Hermès segunda mano España",
    h1: "Comprar Hermès de segunda mano",
    description: "Hermès ocasión (Birkin, Kelly, Evelyne, Picotin) en España: estado, precio, vendedores.",
    intent: "buy",
    intro: "La segunda mano es la vía nº1 a un precio más bajo de Hermès en España.",
    locale: "es",
    brands: ["hermes"],
    sections: [
      {
        h2: "Estado",
        body: "Esquinas, asas, interior, herrajes.",
      },
      {
        h2: "Precio",
        body: "Compare varios anuncios.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto para confirmar modelo, luego ofertas.",
      },
    ],
    related: ["gz-es-budget-hermes", "gz-es-alternative-hermes", "gz-fr-occasion-hermes"],
  },
  {
    slug: "gz-es-occasion-chanel",
    title: "Chanel segunda mano España",
    h1: "Comprar Chanel de segunda mano",
    description: "Chanel ocasión (Classic Flap, Boy, 19, WOC) en España: estado, precio, vendedores.",
    intent: "buy",
    intro: "La segunda mano es la vía nº1 a un precio más bajo de Chanel en España.",
    locale: "es",
    brands: ["chanel"],
    sections: [
      {
        h2: "Estado",
        body: "Esquinas, asas, interior, herrajes.",
      },
      {
        h2: "Precio",
        body: "Compare varios anuncios.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto para confirmar modelo, luego ofertas.",
      },
    ],
    related: ["gz-es-budget-chanel", "gz-es-alternative-chanel", "gz-fr-occasion-chanel"],
  },
  {
    slug: "gz-es-occasion-dior",
    title: "Dior segunda mano España",
    h1: "Comprar Dior de segunda mano",
    description: "Dior ocasión (Book Tote, Saddle, Lady Dior) en España: estado, precio, vendedores.",
    intent: "buy",
    intro: "La segunda mano es la vía nº1 a un precio más bajo de Dior en España.",
    locale: "es",
    brands: ["dior"],
    sections: [
      {
        h2: "Estado",
        body: "Esquinas, asas, interior, herrajes.",
      },
      {
        h2: "Precio",
        body: "Compare varios anuncios.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto para confirmar modelo, luego ofertas.",
      },
    ],
    related: ["gz-es-budget-dior", "gz-es-alternative-dior", "gz-fr-occasion-dior"],
  },
  {
    slug: "gz-es-occasion-gucci",
    title: "Gucci segunda mano España",
    h1: "Comprar Gucci de segunda mano",
    description: "Gucci ocasión (Jackie, Marmont, Ophidia) en España: estado, precio, vendedores.",
    intent: "buy",
    intro: "La segunda mano es la vía nº1 a un precio más bajo de Gucci en España.",
    locale: "es",
    brands: ["gucci"],
    sections: [
      {
        h2: "Estado",
        body: "Esquinas, asas, interior, herrajes.",
      },
      {
        h2: "Precio",
        body: "Compare varios anuncios.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto para confirmar modelo, luego ofertas.",
      },
    ],
    related: ["gz-es-budget-gucci", "gz-es-alternative-gucci", "gz-fr-occasion-gucci"],
  },
  {
    slug: "gz-es-occasion-saint-laurent",
    title: "Saint Laurent segunda mano España",
    h1: "Comprar Saint Laurent de segunda mano",
    description: "Saint Laurent ocasión (Loulou, Niki, Sunset) en España: estado, precio, vendedores.",
    intent: "buy",
    intro: "La segunda mano es la vía nº1 a un precio más bajo de Saint Laurent en España.",
    locale: "es",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Estado",
        body: "Esquinas, asas, interior, herrajes.",
      },
      {
        h2: "Precio",
        body: "Compare varios anuncios.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto para confirmar modelo, luego ofertas.",
      },
    ],
    related: ["gz-es-budget-saint-laurent", "gz-es-alternative-saint-laurent", "gz-fr-occasion-saint-laurent"],
  },
  {
    slug: "gz-es-occasion-bottega-veneta",
    title: "Bottega Veneta segunda mano España",
    h1: "Comprar Bottega Veneta de segunda mano",
    description: "Bottega Veneta ocasión (Jodie, Cassette) en España: estado, precio, vendedores.",
    intent: "buy",
    intro: "La segunda mano es la vía nº1 a un precio más bajo de Bottega Veneta en España.",
    locale: "es",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Estado",
        body: "Esquinas, asas, interior, herrajes.",
      },
      {
        h2: "Precio",
        body: "Compare varios anuncios.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto para confirmar modelo, luego ofertas.",
      },
    ],
    related: ["gz-es-budget-bottega-veneta", "gz-es-alternative-bottega-veneta", "gz-fr-occasion-bottega-veneta"],
  },
  {
    slug: "gz-es-occasion-cartier",
    title: "Cartier segunda mano España",
    h1: "Comprar Cartier de segunda mano",
    description: "Cartier ocasión (Love, Juste un Clou) en España: estado, precio, vendedores.",
    intent: "buy",
    intro: "La segunda mano es la vía nº1 a un precio más bajo de Cartier en España.",
    locale: "es",
    brands: ["cartier"],
    sections: [
      {
        h2: "Estado",
        body: "Esquinas, asas, interior, herrajes.",
      },
      {
        h2: "Precio",
        body: "Compare varios anuncios.",
      },
      {
        h2: "LuxeFinder",
        body: "Foto para confirmar modelo, luego ofertas.",
      },
    ],
    related: ["gz-es-budget-cartier", "gz-es-alternative-cartier", "gz-fr-occasion-cartier"],
  },
  {
    slug: "gz-en-budget-louis-vuitton",
    title: "Louis Vuitton budget in United Kingdom",
    h1: "Set a realistic Louis Vuitton budget",
    description: "Budget for Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in United Kingdom. Photo + range → seller leads with LuxeFinder.",
    intent: "howto",
    intro: "Retail Louis Vuitton often exceeds budget. In United Kingdom, many look for a more accessible offer (pre-owned, sellers). Start with a cap and a photo (Neverfull, Speedy, Alma, Pochette Métis).",
    locale: "en",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Set a cap",
        body: "Item + shipping + buffer.",
      },
      {
        h2: "Name the model",
        body: "Be precise (Neverfull, Speedy, Alma, Pochette Métis) — a photo helps.",
      },
      {
        h2: "LuxeFinder",
        body: "Upload photo + budget. LuxeFinder does not sell stock or auto-authenticate.",
      },
    ],
    related: ["gz-en-pas-cher-louis-vuitton", "gz-en-trouver-vendeur-louis-vuitton", "gz-fr-budget-louis-vuitton"],
  },
  {
    slug: "gz-en-budget-hermes",
    title: "Hermès budget in United Kingdom",
    h1: "Set a realistic Hermès budget",
    description: "Budget for Hermès (Birkin, Kelly, Evelyne, Picotin) in United Kingdom. Photo + range → seller leads with LuxeFinder.",
    intent: "howto",
    intro: "Retail Hermès often exceeds budget. In United Kingdom, many look for a more accessible offer (pre-owned, sellers). Start with a cap and a photo (Birkin, Kelly, Evelyne, Picotin).",
    locale: "en",
    brands: ["hermes"],
    sections: [
      {
        h2: "Set a cap",
        body: "Item + shipping + buffer.",
      },
      {
        h2: "Name the model",
        body: "Be precise (Birkin, Kelly, Evelyne, Picotin) — a photo helps.",
      },
      {
        h2: "LuxeFinder",
        body: "Upload photo + budget. LuxeFinder does not sell stock or auto-authenticate.",
      },
    ],
    related: ["gz-en-pas-cher-hermes", "gz-en-trouver-vendeur-hermes", "gz-fr-budget-hermes"],
  },
  {
    slug: "gz-en-budget-chanel",
    title: "Chanel budget in United Kingdom",
    h1: "Set a realistic Chanel budget",
    description: "Budget for Chanel (Classic Flap, Boy, 19, WOC) in United Kingdom. Photo + range → seller leads with LuxeFinder.",
    intent: "howto",
    intro: "Retail Chanel often exceeds budget. In United Kingdom, many look for a more accessible offer (pre-owned, sellers). Start with a cap and a photo (Classic Flap, Boy, 19, WOC).",
    locale: "en",
    brands: ["chanel"],
    sections: [
      {
        h2: "Set a cap",
        body: "Item + shipping + buffer.",
      },
      {
        h2: "Name the model",
        body: "Be precise (Classic Flap, Boy, 19, WOC) — a photo helps.",
      },
      {
        h2: "LuxeFinder",
        body: "Upload photo + budget. LuxeFinder does not sell stock or auto-authenticate.",
      },
    ],
    related: ["gz-en-pas-cher-chanel", "gz-en-trouver-vendeur-chanel", "gz-fr-budget-chanel"],
  },
  {
    slug: "gz-en-budget-dior",
    title: "Dior budget in United Kingdom",
    h1: "Set a realistic Dior budget",
    description: "Budget for Dior (Book Tote, Saddle, Lady Dior) in United Kingdom. Photo + range → seller leads with LuxeFinder.",
    intent: "howto",
    intro: "Retail Dior often exceeds budget. In United Kingdom, many look for a more accessible offer (pre-owned, sellers). Start with a cap and a photo (Book Tote, Saddle, Lady Dior).",
    locale: "en",
    brands: ["dior"],
    sections: [
      {
        h2: "Set a cap",
        body: "Item + shipping + buffer.",
      },
      {
        h2: "Name the model",
        body: "Be precise (Book Tote, Saddle, Lady Dior) — a photo helps.",
      },
      {
        h2: "LuxeFinder",
        body: "Upload photo + budget. LuxeFinder does not sell stock or auto-authenticate.",
      },
    ],
    related: ["gz-en-pas-cher-dior", "gz-en-trouver-vendeur-dior", "gz-fr-budget-dior"],
  },
  {
    slug: "gz-en-budget-gucci",
    title: "Gucci budget in United Kingdom",
    h1: "Set a realistic Gucci budget",
    description: "Budget for Gucci (Jackie, Marmont, Ophidia) in United Kingdom. Photo + range → seller leads with LuxeFinder.",
    intent: "howto",
    intro: "Retail Gucci often exceeds budget. In United Kingdom, many look for a more accessible offer (pre-owned, sellers). Start with a cap and a photo (Jackie, Marmont, Ophidia).",
    locale: "en",
    brands: ["gucci"],
    sections: [
      {
        h2: "Set a cap",
        body: "Item + shipping + buffer.",
      },
      {
        h2: "Name the model",
        body: "Be precise (Jackie, Marmont, Ophidia) — a photo helps.",
      },
      {
        h2: "LuxeFinder",
        body: "Upload photo + budget. LuxeFinder does not sell stock or auto-authenticate.",
      },
    ],
    related: ["gz-en-pas-cher-gucci", "gz-en-trouver-vendeur-gucci", "gz-fr-budget-gucci"],
  },
  {
    slug: "gz-en-budget-saint-laurent",
    title: "Saint Laurent budget in United Kingdom",
    h1: "Set a realistic Saint Laurent budget",
    description: "Budget for Saint Laurent (Loulou, Niki, Sunset) in United Kingdom. Photo + range → seller leads with LuxeFinder.",
    intent: "howto",
    intro: "Retail Saint Laurent often exceeds budget. In United Kingdom, many look for a more accessible offer (pre-owned, sellers). Start with a cap and a photo (Loulou, Niki, Sunset).",
    locale: "en",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Set a cap",
        body: "Item + shipping + buffer.",
      },
      {
        h2: "Name the model",
        body: "Be precise (Loulou, Niki, Sunset) — a photo helps.",
      },
      {
        h2: "LuxeFinder",
        body: "Upload photo + budget. LuxeFinder does not sell stock or auto-authenticate.",
      },
    ],
    related: ["gz-en-pas-cher-saint-laurent", "gz-en-trouver-vendeur-saint-laurent", "gz-fr-budget-saint-laurent"],
  },
  {
    slug: "gz-en-budget-bottega-veneta",
    title: "Bottega Veneta budget in United Kingdom",
    h1: "Set a realistic Bottega Veneta budget",
    description: "Budget for Bottega Veneta (Jodie, Cassette) in United Kingdom. Photo + range → seller leads with LuxeFinder.",
    intent: "howto",
    intro: "Retail Bottega Veneta often exceeds budget. In United Kingdom, many look for a more accessible offer (pre-owned, sellers). Start with a cap and a photo (Jodie, Cassette).",
    locale: "en",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Set a cap",
        body: "Item + shipping + buffer.",
      },
      {
        h2: "Name the model",
        body: "Be precise (Jodie, Cassette) — a photo helps.",
      },
      {
        h2: "LuxeFinder",
        body: "Upload photo + budget. LuxeFinder does not sell stock or auto-authenticate.",
      },
    ],
    related: ["gz-en-pas-cher-bottega-veneta", "gz-en-trouver-vendeur-bottega-veneta", "gz-fr-budget-bottega-veneta"],
  },
  {
    slug: "gz-en-budget-cartier",
    title: "Cartier budget in United Kingdom",
    h1: "Set a realistic Cartier budget",
    description: "Budget for Cartier (Love, Juste un Clou) in United Kingdom. Photo + range → seller leads with LuxeFinder.",
    intent: "howto",
    intro: "Retail Cartier often exceeds budget. In United Kingdom, many look for a more accessible offer (pre-owned, sellers). Start with a cap and a photo (Love, Juste un Clou).",
    locale: "en",
    brands: ["cartier"],
    sections: [
      {
        h2: "Set a cap",
        body: "Item + shipping + buffer.",
      },
      {
        h2: "Name the model",
        body: "Be precise (Love, Juste un Clou) — a photo helps.",
      },
      {
        h2: "LuxeFinder",
        body: "Upload photo + budget. LuxeFinder does not sell stock or auto-authenticate.",
      },
    ],
    related: ["gz-en-pas-cher-cartier", "gz-en-trouver-vendeur-cartier", "gz-fr-budget-cartier"],
  },
  {
    slug: "gz-en-alternative-louis-vuitton",
    title: "Alternative to Louis Vuitton (United Kingdom)",
    h1: "Find an alternative to Louis Vuitton",
    description: "Alternative to Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in United Kingdom: pre-owned, budgets, sellers. LuxeFinder.",
    intent: "howto",
    intro: "“Alternative to Louis Vuitton” usually means similar use/look for less — often pre-owned. Not an official house substitute.",
    locale: "en",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Compare",
        body: "Use, size, condition, all-in price.",
      },
      {
        h2: "Proof",
        body: "Recent photos, seller history.",
      },
      {
        h2: "App",
        body: "Photo + budget on LuxeFinder — shortlist, no authenticity guarantee.",
      },
    ],
    related: ["gz-en-budget-louis-vuitton", "gz-en-occasion-louis-vuitton", "gz-fr-alternative-louis-vuitton"],
  },
  {
    slug: "gz-en-alternative-hermes",
    title: "Alternative to Hermès (United Kingdom)",
    h1: "Find an alternative to Hermès",
    description: "Alternative to Hermès (Birkin, Kelly, Evelyne, Picotin) in United Kingdom: pre-owned, budgets, sellers. LuxeFinder.",
    intent: "howto",
    intro: "“Alternative to Hermès” usually means similar use/look for less — often pre-owned. Not an official house substitute.",
    locale: "en",
    brands: ["hermes"],
    sections: [
      {
        h2: "Compare",
        body: "Use, size, condition, all-in price.",
      },
      {
        h2: "Proof",
        body: "Recent photos, seller history.",
      },
      {
        h2: "App",
        body: "Photo + budget on LuxeFinder — shortlist, no authenticity guarantee.",
      },
    ],
    related: ["gz-en-budget-hermes", "gz-en-occasion-hermes", "gz-fr-alternative-hermes"],
  },
  {
    slug: "gz-en-alternative-chanel",
    title: "Alternative to Chanel (United Kingdom)",
    h1: "Find an alternative to Chanel",
    description: "Alternative to Chanel (Classic Flap, Boy, 19, WOC) in United Kingdom: pre-owned, budgets, sellers. LuxeFinder.",
    intent: "howto",
    intro: "“Alternative to Chanel” usually means similar use/look for less — often pre-owned. Not an official house substitute.",
    locale: "en",
    brands: ["chanel"],
    sections: [
      {
        h2: "Compare",
        body: "Use, size, condition, all-in price.",
      },
      {
        h2: "Proof",
        body: "Recent photos, seller history.",
      },
      {
        h2: "App",
        body: "Photo + budget on LuxeFinder — shortlist, no authenticity guarantee.",
      },
    ],
    related: ["gz-en-budget-chanel", "gz-en-occasion-chanel", "gz-fr-alternative-chanel"],
  },
  {
    slug: "gz-en-alternative-dior",
    title: "Alternative to Dior (United Kingdom)",
    h1: "Find an alternative to Dior",
    description: "Alternative to Dior (Book Tote, Saddle, Lady Dior) in United Kingdom: pre-owned, budgets, sellers. LuxeFinder.",
    intent: "howto",
    intro: "“Alternative to Dior” usually means similar use/look for less — often pre-owned. Not an official house substitute.",
    locale: "en",
    brands: ["dior"],
    sections: [
      {
        h2: "Compare",
        body: "Use, size, condition, all-in price.",
      },
      {
        h2: "Proof",
        body: "Recent photos, seller history.",
      },
      {
        h2: "App",
        body: "Photo + budget on LuxeFinder — shortlist, no authenticity guarantee.",
      },
    ],
    related: ["gz-en-budget-dior", "gz-en-occasion-dior", "gz-fr-alternative-dior"],
  },
  {
    slug: "gz-en-alternative-gucci",
    title: "Alternative to Gucci (United Kingdom)",
    h1: "Find an alternative to Gucci",
    description: "Alternative to Gucci (Jackie, Marmont, Ophidia) in United Kingdom: pre-owned, budgets, sellers. LuxeFinder.",
    intent: "howto",
    intro: "“Alternative to Gucci” usually means similar use/look for less — often pre-owned. Not an official house substitute.",
    locale: "en",
    brands: ["gucci"],
    sections: [
      {
        h2: "Compare",
        body: "Use, size, condition, all-in price.",
      },
      {
        h2: "Proof",
        body: "Recent photos, seller history.",
      },
      {
        h2: "App",
        body: "Photo + budget on LuxeFinder — shortlist, no authenticity guarantee.",
      },
    ],
    related: ["gz-en-budget-gucci", "gz-en-occasion-gucci", "gz-fr-alternative-gucci"],
  },
  {
    slug: "gz-en-alternative-saint-laurent",
    title: "Alternative to Saint Laurent (United Kingdom)",
    h1: "Find an alternative to Saint Laurent",
    description: "Alternative to Saint Laurent (Loulou, Niki, Sunset) in United Kingdom: pre-owned, budgets, sellers. LuxeFinder.",
    intent: "howto",
    intro: "“Alternative to Saint Laurent” usually means similar use/look for less — often pre-owned. Not an official house substitute.",
    locale: "en",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Compare",
        body: "Use, size, condition, all-in price.",
      },
      {
        h2: "Proof",
        body: "Recent photos, seller history.",
      },
      {
        h2: "App",
        body: "Photo + budget on LuxeFinder — shortlist, no authenticity guarantee.",
      },
    ],
    related: ["gz-en-budget-saint-laurent", "gz-en-occasion-saint-laurent", "gz-fr-alternative-saint-laurent"],
  },
  {
    slug: "gz-en-alternative-bottega-veneta",
    title: "Alternative to Bottega Veneta (United Kingdom)",
    h1: "Find an alternative to Bottega Veneta",
    description: "Alternative to Bottega Veneta (Jodie, Cassette) in United Kingdom: pre-owned, budgets, sellers. LuxeFinder.",
    intent: "howto",
    intro: "“Alternative to Bottega Veneta” usually means similar use/look for less — often pre-owned. Not an official house substitute.",
    locale: "en",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Compare",
        body: "Use, size, condition, all-in price.",
      },
      {
        h2: "Proof",
        body: "Recent photos, seller history.",
      },
      {
        h2: "App",
        body: "Photo + budget on LuxeFinder — shortlist, no authenticity guarantee.",
      },
    ],
    related: ["gz-en-budget-bottega-veneta", "gz-en-occasion-bottega-veneta", "gz-fr-alternative-bottega-veneta"],
  },
  {
    slug: "gz-en-alternative-cartier",
    title: "Alternative to Cartier (United Kingdom)",
    h1: "Find an alternative to Cartier",
    description: "Alternative to Cartier (Love, Juste un Clou) in United Kingdom: pre-owned, budgets, sellers. LuxeFinder.",
    intent: "howto",
    intro: "“Alternative to Cartier” usually means similar use/look for less — often pre-owned. Not an official house substitute.",
    locale: "en",
    brands: ["cartier"],
    sections: [
      {
        h2: "Compare",
        body: "Use, size, condition, all-in price.",
      },
      {
        h2: "Proof",
        body: "Recent photos, seller history.",
      },
      {
        h2: "App",
        body: "Photo + budget on LuxeFinder — shortlist, no authenticity guarantee.",
      },
    ],
    related: ["gz-en-budget-cartier", "gz-en-occasion-cartier", "gz-fr-alternative-cartier"],
  },
  {
    slug: "gz-en-pas-cher-louis-vuitton",
    title: "Cheap Louis Vuitton in United Kingdom",
    h1: "Search for cheaper Louis Vuitton",
    description: "Cheaper Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in United Kingdom: budget, pre-owned, sellers. LuxeFinder method.",
    intent: "buy",
    intro: "“Cheap Louis Vuitton” searches are huge. Low price ≠ good deal — check condition and seller.",
    locale: "en",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Caution",
        body: "Unrealistic prices need more proof.",
      },
      {
        h2: "Method",
        body: "Photo → budget → compare 2–3 offers.",
      },
      {
        h2: "LuxeFinder",
        body: "Helps find offers; does not sell inventory.",
      },
    ],
    related: ["gz-en-budget-louis-vuitton", "gz-en-alternative-louis-vuitton", "gz-fr-pas-cher-louis-vuitton"],
  },
  {
    slug: "gz-en-pas-cher-hermes",
    title: "Cheap Hermès in United Kingdom",
    h1: "Search for cheaper Hermès",
    description: "Cheaper Hermès (Birkin, Kelly, Evelyne, Picotin) in United Kingdom: budget, pre-owned, sellers. LuxeFinder method.",
    intent: "buy",
    intro: "“Cheap Hermès” searches are huge. Low price ≠ good deal — check condition and seller.",
    locale: "en",
    brands: ["hermes"],
    sections: [
      {
        h2: "Caution",
        body: "Unrealistic prices need more proof.",
      },
      {
        h2: "Method",
        body: "Photo → budget → compare 2–3 offers.",
      },
      {
        h2: "LuxeFinder",
        body: "Helps find offers; does not sell inventory.",
      },
    ],
    related: ["gz-en-budget-hermes", "gz-en-alternative-hermes", "gz-fr-pas-cher-hermes"],
  },
  {
    slug: "gz-en-pas-cher-chanel",
    title: "Cheap Chanel in United Kingdom",
    h1: "Search for cheaper Chanel",
    description: "Cheaper Chanel (Classic Flap, Boy, 19, WOC) in United Kingdom: budget, pre-owned, sellers. LuxeFinder method.",
    intent: "buy",
    intro: "“Cheap Chanel” searches are huge. Low price ≠ good deal — check condition and seller.",
    locale: "en",
    brands: ["chanel"],
    sections: [
      {
        h2: "Caution",
        body: "Unrealistic prices need more proof.",
      },
      {
        h2: "Method",
        body: "Photo → budget → compare 2–3 offers.",
      },
      {
        h2: "LuxeFinder",
        body: "Helps find offers; does not sell inventory.",
      },
    ],
    related: ["gz-en-budget-chanel", "gz-en-alternative-chanel", "gz-fr-pas-cher-chanel"],
  },
  {
    slug: "gz-en-pas-cher-dior",
    title: "Cheap Dior in United Kingdom",
    h1: "Search for cheaper Dior",
    description: "Cheaper Dior (Book Tote, Saddle, Lady Dior) in United Kingdom: budget, pre-owned, sellers. LuxeFinder method.",
    intent: "buy",
    intro: "“Cheap Dior” searches are huge. Low price ≠ good deal — check condition and seller.",
    locale: "en",
    brands: ["dior"],
    sections: [
      {
        h2: "Caution",
        body: "Unrealistic prices need more proof.",
      },
      {
        h2: "Method",
        body: "Photo → budget → compare 2–3 offers.",
      },
      {
        h2: "LuxeFinder",
        body: "Helps find offers; does not sell inventory.",
      },
    ],
    related: ["gz-en-budget-dior", "gz-en-alternative-dior", "gz-fr-pas-cher-dior"],
  },
  {
    slug: "gz-en-pas-cher-gucci",
    title: "Cheap Gucci in United Kingdom",
    h1: "Search for cheaper Gucci",
    description: "Cheaper Gucci (Jackie, Marmont, Ophidia) in United Kingdom: budget, pre-owned, sellers. LuxeFinder method.",
    intent: "buy",
    intro: "“Cheap Gucci” searches are huge. Low price ≠ good deal — check condition and seller.",
    locale: "en",
    brands: ["gucci"],
    sections: [
      {
        h2: "Caution",
        body: "Unrealistic prices need more proof.",
      },
      {
        h2: "Method",
        body: "Photo → budget → compare 2–3 offers.",
      },
      {
        h2: "LuxeFinder",
        body: "Helps find offers; does not sell inventory.",
      },
    ],
    related: ["gz-en-budget-gucci", "gz-en-alternative-gucci", "gz-fr-pas-cher-gucci"],
  },
  {
    slug: "gz-en-pas-cher-saint-laurent",
    title: "Cheap Saint Laurent in United Kingdom",
    h1: "Search for cheaper Saint Laurent",
    description: "Cheaper Saint Laurent (Loulou, Niki, Sunset) in United Kingdom: budget, pre-owned, sellers. LuxeFinder method.",
    intent: "buy",
    intro: "“Cheap Saint Laurent” searches are huge. Low price ≠ good deal — check condition and seller.",
    locale: "en",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Caution",
        body: "Unrealistic prices need more proof.",
      },
      {
        h2: "Method",
        body: "Photo → budget → compare 2–3 offers.",
      },
      {
        h2: "LuxeFinder",
        body: "Helps find offers; does not sell inventory.",
      },
    ],
    related: ["gz-en-budget-saint-laurent", "gz-en-alternative-saint-laurent", "gz-fr-pas-cher-saint-laurent"],
  },
  {
    slug: "gz-en-pas-cher-bottega-veneta",
    title: "Cheap Bottega Veneta in United Kingdom",
    h1: "Search for cheaper Bottega Veneta",
    description: "Cheaper Bottega Veneta (Jodie, Cassette) in United Kingdom: budget, pre-owned, sellers. LuxeFinder method.",
    intent: "buy",
    intro: "“Cheap Bottega Veneta” searches are huge. Low price ≠ good deal — check condition and seller.",
    locale: "en",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Caution",
        body: "Unrealistic prices need more proof.",
      },
      {
        h2: "Method",
        body: "Photo → budget → compare 2–3 offers.",
      },
      {
        h2: "LuxeFinder",
        body: "Helps find offers; does not sell inventory.",
      },
    ],
    related: ["gz-en-budget-bottega-veneta", "gz-en-alternative-bottega-veneta", "gz-fr-pas-cher-bottega-veneta"],
  },
  {
    slug: "gz-en-pas-cher-cartier",
    title: "Cheap Cartier in United Kingdom",
    h1: "Search for cheaper Cartier",
    description: "Cheaper Cartier (Love, Juste un Clou) in United Kingdom: budget, pre-owned, sellers. LuxeFinder method.",
    intent: "buy",
    intro: "“Cheap Cartier” searches are huge. Low price ≠ good deal — check condition and seller.",
    locale: "en",
    brands: ["cartier"],
    sections: [
      {
        h2: "Caution",
        body: "Unrealistic prices need more proof.",
      },
      {
        h2: "Method",
        body: "Photo → budget → compare 2–3 offers.",
      },
      {
        h2: "LuxeFinder",
        body: "Helps find offers; does not sell inventory.",
      },
    ],
    related: ["gz-en-budget-cartier", "gz-en-alternative-cartier", "gz-fr-pas-cher-cartier"],
  },
  {
    slug: "gz-en-trouver-vendeur-louis-vuitton",
    title: "Find a Louis Vuitton seller in United Kingdom",
    h1: "Find a seller for Louis Vuitton",
    description: "Find a Louis Vuitton seller (Neverfull, Speedy, Alma, Pochette Métis) in United Kingdom: photo, budget, LuxeFinder.",
    intent: "buy",
    intro: "Finding a serious Louis Vuitton seller needs a method: model, budget, shortlist — not one contact.",
    locale: "en",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Model",
        body: "Photo + clear name (Neverfull, Speedy, Alma, Pochette Métis).",
      },
      {
        h2: "Filter",
        body: "All-in price, lot photos, timing, payment.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → leads. Final choice is yours.",
      },
    ],
    related: ["gz-en-budget-louis-vuitton", "gz-en-pas-cher-louis-vuitton", "gz-fr-trouver-vendeur-louis-vuitton"],
  },
  {
    slug: "gz-en-trouver-vendeur-hermes",
    title: "Find a Hermès seller in United Kingdom",
    h1: "Find a seller for Hermès",
    description: "Find a Hermès seller (Birkin, Kelly, Evelyne, Picotin) in United Kingdom: photo, budget, LuxeFinder.",
    intent: "buy",
    intro: "Finding a serious Hermès seller needs a method: model, budget, shortlist — not one contact.",
    locale: "en",
    brands: ["hermes"],
    sections: [
      {
        h2: "Model",
        body: "Photo + clear name (Birkin, Kelly, Evelyne, Picotin).",
      },
      {
        h2: "Filter",
        body: "All-in price, lot photos, timing, payment.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → leads. Final choice is yours.",
      },
    ],
    related: ["gz-en-budget-hermes", "gz-en-pas-cher-hermes", "gz-fr-trouver-vendeur-hermes"],
  },
  {
    slug: "gz-en-trouver-vendeur-chanel",
    title: "Find a Chanel seller in United Kingdom",
    h1: "Find a seller for Chanel",
    description: "Find a Chanel seller (Classic Flap, Boy, 19, WOC) in United Kingdom: photo, budget, LuxeFinder.",
    intent: "buy",
    intro: "Finding a serious Chanel seller needs a method: model, budget, shortlist — not one contact.",
    locale: "en",
    brands: ["chanel"],
    sections: [
      {
        h2: "Model",
        body: "Photo + clear name (Classic Flap, Boy, 19, WOC).",
      },
      {
        h2: "Filter",
        body: "All-in price, lot photos, timing, payment.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → leads. Final choice is yours.",
      },
    ],
    related: ["gz-en-budget-chanel", "gz-en-pas-cher-chanel", "gz-fr-trouver-vendeur-chanel"],
  },
  {
    slug: "gz-en-trouver-vendeur-dior",
    title: "Find a Dior seller in United Kingdom",
    h1: "Find a seller for Dior",
    description: "Find a Dior seller (Book Tote, Saddle, Lady Dior) in United Kingdom: photo, budget, LuxeFinder.",
    intent: "buy",
    intro: "Finding a serious Dior seller needs a method: model, budget, shortlist — not one contact.",
    locale: "en",
    brands: ["dior"],
    sections: [
      {
        h2: "Model",
        body: "Photo + clear name (Book Tote, Saddle, Lady Dior).",
      },
      {
        h2: "Filter",
        body: "All-in price, lot photos, timing, payment.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → leads. Final choice is yours.",
      },
    ],
    related: ["gz-en-budget-dior", "gz-en-pas-cher-dior", "gz-fr-trouver-vendeur-dior"],
  },
  {
    slug: "gz-en-trouver-vendeur-gucci",
    title: "Find a Gucci seller in United Kingdom",
    h1: "Find a seller for Gucci",
    description: "Find a Gucci seller (Jackie, Marmont, Ophidia) in United Kingdom: photo, budget, LuxeFinder.",
    intent: "buy",
    intro: "Finding a serious Gucci seller needs a method: model, budget, shortlist — not one contact.",
    locale: "en",
    brands: ["gucci"],
    sections: [
      {
        h2: "Model",
        body: "Photo + clear name (Jackie, Marmont, Ophidia).",
      },
      {
        h2: "Filter",
        body: "All-in price, lot photos, timing, payment.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → leads. Final choice is yours.",
      },
    ],
    related: ["gz-en-budget-gucci", "gz-en-pas-cher-gucci", "gz-fr-trouver-vendeur-gucci"],
  },
  {
    slug: "gz-en-trouver-vendeur-saint-laurent",
    title: "Find a Saint Laurent seller in United Kingdom",
    h1: "Find a seller for Saint Laurent",
    description: "Find a Saint Laurent seller (Loulou, Niki, Sunset) in United Kingdom: photo, budget, LuxeFinder.",
    intent: "buy",
    intro: "Finding a serious Saint Laurent seller needs a method: model, budget, shortlist — not one contact.",
    locale: "en",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Model",
        body: "Photo + clear name (Loulou, Niki, Sunset).",
      },
      {
        h2: "Filter",
        body: "All-in price, lot photos, timing, payment.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → leads. Final choice is yours.",
      },
    ],
    related: ["gz-en-budget-saint-laurent", "gz-en-pas-cher-saint-laurent", "gz-fr-trouver-vendeur-saint-laurent"],
  },
  {
    slug: "gz-en-trouver-vendeur-bottega-veneta",
    title: "Find a Bottega Veneta seller in United Kingdom",
    h1: "Find a seller for Bottega Veneta",
    description: "Find a Bottega Veneta seller (Jodie, Cassette) in United Kingdom: photo, budget, LuxeFinder.",
    intent: "buy",
    intro: "Finding a serious Bottega Veneta seller needs a method: model, budget, shortlist — not one contact.",
    locale: "en",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Model",
        body: "Photo + clear name (Jodie, Cassette).",
      },
      {
        h2: "Filter",
        body: "All-in price, lot photos, timing, payment.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → leads. Final choice is yours.",
      },
    ],
    related: ["gz-en-budget-bottega-veneta", "gz-en-pas-cher-bottega-veneta", "gz-fr-trouver-vendeur-bottega-veneta"],
  },
  {
    slug: "gz-en-trouver-vendeur-cartier",
    title: "Find a Cartier seller in United Kingdom",
    h1: "Find a seller for Cartier",
    description: "Find a Cartier seller (Love, Juste un Clou) in United Kingdom: photo, budget, LuxeFinder.",
    intent: "buy",
    intro: "Finding a serious Cartier seller needs a method: model, budget, shortlist — not one contact.",
    locale: "en",
    brands: ["cartier"],
    sections: [
      {
        h2: "Model",
        body: "Photo + clear name (Love, Juste un Clou).",
      },
      {
        h2: "Filter",
        body: "All-in price, lot photos, timing, payment.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget → leads. Final choice is yours.",
      },
    ],
    related: ["gz-en-budget-cartier", "gz-en-pas-cher-cartier", "gz-fr-trouver-vendeur-cartier"],
  },
  {
    slug: "gz-en-occasion-louis-vuitton",
    title: "Louis Vuitton pre-owned United Kingdom",
    h1: "Buy pre-owned Louis Vuitton",
    description: "Pre-owned Louis Vuitton (Neverfull, Speedy, Alma, Pochette Métis) in United Kingdom: condition, price, sellers. LuxeFinder.",
    intent: "buy",
    intro: "Pre-owned is the #1 path to a lower Louis Vuitton price in United Kingdom.",
    locale: "en",
    brands: ["louis_vuitton"],
    sections: [
      {
        h2: "Condition",
        body: "Corners, straps, interior, hardware.",
      },
      {
        h2: "Price",
        body: "Compare several listings.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo to confirm the model, then compare offers.",
      },
    ],
    related: ["gz-en-budget-louis-vuitton", "gz-en-alternative-louis-vuitton", "gz-fr-occasion-louis-vuitton"],
  },
  {
    slug: "gz-en-occasion-hermes",
    title: "Hermès pre-owned United Kingdom",
    h1: "Buy pre-owned Hermès",
    description: "Pre-owned Hermès (Birkin, Kelly, Evelyne, Picotin) in United Kingdom: condition, price, sellers. LuxeFinder.",
    intent: "buy",
    intro: "Pre-owned is the #1 path to a lower Hermès price in United Kingdom.",
    locale: "en",
    brands: ["hermes"],
    sections: [
      {
        h2: "Condition",
        body: "Corners, straps, interior, hardware.",
      },
      {
        h2: "Price",
        body: "Compare several listings.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo to confirm the model, then compare offers.",
      },
    ],
    related: ["gz-en-budget-hermes", "gz-en-alternative-hermes", "gz-fr-occasion-hermes"],
  },
  {
    slug: "gz-en-occasion-chanel",
    title: "Chanel pre-owned United Kingdom",
    h1: "Buy pre-owned Chanel",
    description: "Pre-owned Chanel (Classic Flap, Boy, 19, WOC) in United Kingdom: condition, price, sellers. LuxeFinder.",
    intent: "buy",
    intro: "Pre-owned is the #1 path to a lower Chanel price in United Kingdom.",
    locale: "en",
    brands: ["chanel"],
    sections: [
      {
        h2: "Condition",
        body: "Corners, straps, interior, hardware.",
      },
      {
        h2: "Price",
        body: "Compare several listings.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo to confirm the model, then compare offers.",
      },
    ],
    related: ["gz-en-budget-chanel", "gz-en-alternative-chanel", "gz-fr-occasion-chanel"],
  },
  {
    slug: "gz-en-occasion-dior",
    title: "Dior pre-owned United Kingdom",
    h1: "Buy pre-owned Dior",
    description: "Pre-owned Dior (Book Tote, Saddle, Lady Dior) in United Kingdom: condition, price, sellers. LuxeFinder.",
    intent: "buy",
    intro: "Pre-owned is the #1 path to a lower Dior price in United Kingdom.",
    locale: "en",
    brands: ["dior"],
    sections: [
      {
        h2: "Condition",
        body: "Corners, straps, interior, hardware.",
      },
      {
        h2: "Price",
        body: "Compare several listings.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo to confirm the model, then compare offers.",
      },
    ],
    related: ["gz-en-budget-dior", "gz-en-alternative-dior", "gz-fr-occasion-dior"],
  },
  {
    slug: "gz-en-occasion-gucci",
    title: "Gucci pre-owned United Kingdom",
    h1: "Buy pre-owned Gucci",
    description: "Pre-owned Gucci (Jackie, Marmont, Ophidia) in United Kingdom: condition, price, sellers. LuxeFinder.",
    intent: "buy",
    intro: "Pre-owned is the #1 path to a lower Gucci price in United Kingdom.",
    locale: "en",
    brands: ["gucci"],
    sections: [
      {
        h2: "Condition",
        body: "Corners, straps, interior, hardware.",
      },
      {
        h2: "Price",
        body: "Compare several listings.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo to confirm the model, then compare offers.",
      },
    ],
    related: ["gz-en-budget-gucci", "gz-en-alternative-gucci", "gz-fr-occasion-gucci"],
  },
  {
    slug: "gz-en-occasion-saint-laurent",
    title: "Saint Laurent pre-owned United Kingdom",
    h1: "Buy pre-owned Saint Laurent",
    description: "Pre-owned Saint Laurent (Loulou, Niki, Sunset) in United Kingdom: condition, price, sellers. LuxeFinder.",
    intent: "buy",
    intro: "Pre-owned is the #1 path to a lower Saint Laurent price in United Kingdom.",
    locale: "en",
    brands: ["saint_laurent"],
    sections: [
      {
        h2: "Condition",
        body: "Corners, straps, interior, hardware.",
      },
      {
        h2: "Price",
        body: "Compare several listings.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo to confirm the model, then compare offers.",
      },
    ],
    related: ["gz-en-budget-saint-laurent", "gz-en-alternative-saint-laurent", "gz-fr-occasion-saint-laurent"],
  },
  {
    slug: "gz-en-occasion-bottega-veneta",
    title: "Bottega Veneta pre-owned United Kingdom",
    h1: "Buy pre-owned Bottega Veneta",
    description: "Pre-owned Bottega Veneta (Jodie, Cassette) in United Kingdom: condition, price, sellers. LuxeFinder.",
    intent: "buy",
    intro: "Pre-owned is the #1 path to a lower Bottega Veneta price in United Kingdom.",
    locale: "en",
    brands: ["bottega_veneta"],
    sections: [
      {
        h2: "Condition",
        body: "Corners, straps, interior, hardware.",
      },
      {
        h2: "Price",
        body: "Compare several listings.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo to confirm the model, then compare offers.",
      },
    ],
    related: ["gz-en-budget-bottega-veneta", "gz-en-alternative-bottega-veneta", "gz-fr-occasion-bottega-veneta"],
  },
  {
    slug: "gz-en-occasion-cartier",
    title: "Cartier pre-owned United Kingdom",
    h1: "Buy pre-owned Cartier",
    description: "Pre-owned Cartier (Love, Juste un Clou) in United Kingdom: condition, price, sellers. LuxeFinder.",
    intent: "buy",
    intro: "Pre-owned is the #1 path to a lower Cartier price in United Kingdom.",
    locale: "en",
    brands: ["cartier"],
    sections: [
      {
        h2: "Condition",
        body: "Corners, straps, interior, hardware.",
      },
      {
        h2: "Price",
        body: "Compare several listings.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo to confirm the model, then compare offers.",
      },
    ],
    related: ["gz-en-budget-cartier", "gz-en-alternative-cartier", "gz-fr-occasion-cartier"],
  },
];

export const SEO_GREY_LOCALES = [
  { code: "fr", country: "France" },
  { code: "de", country: "Deutschland" },
  { code: "it", country: "Italia" },
  { code: "es", country: "Espa\u00f1a" },
  { code: "en", country: "United Kingdom" },
] as const;
