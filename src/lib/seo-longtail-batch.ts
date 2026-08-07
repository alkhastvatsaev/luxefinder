/** Batch longue traîne — occasion, marques×intent, glossaire (20 pages). */

type PageSection = { h2: string; body: string };
type SeoPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intent: "howto" | "brand" | "model" | "buy";
  intro: string;
  sections: PageSection[];
  brands?: string[];
  related: string[];
};

export const SEO_LONGTAIL_BATCH: SeoPage[] = [
  {
    slug: "sac-luxe-occasion-france",
    title: "Sac de luxe d’occasion en France — guide d’achat",
    h1: "Sac de luxe d’occasion en France",
    description:
      "Comment acheter un sac de luxe d’occasion en France : authentification, budget, vendeurs, pièges à éviter. Puis LuxeFinder pour comparer des offres.",
    intent: "howto",
    intro:
      "Le marché de l’occasion luxe est vaste : plateformes, particuliers, revendeurs. Avant de payer, il faut cadrer le modèle, l’état et le prix — puis comparer plusieurs offres.",
    sections: [
      {
        h2: "Pourquoi l’occasion",
        body: "Un modèle iconique peut coûter moins cher en seconde main, à condition d’accepter l’usure et de vérifier l’authenticité. Fixez un budget net de frais de port et de commission.",
      },
      {
        h2: "Parcours recommandé",
        body: "1) Identifiez le modèle (photo claire) 2) Notez l’état (coins, anses, intérieur) 3) Comparez 2–3 offres 4) Exigez des preuves écrites. LuxeFinder aide aux étapes 1 et 3 via photo + budget.",
      },
      {
        h2: "Où chercher",
        body: "Marketplaces d’occasion, réseaux, vendeurs spécialisés. Méfiez-vous des annonces sans photos récentes ni historique. Croisez toujours avec une short-list d’offres.",
      },
    ],
    related: [
      "acheter-sac-occasion-authenticite",
      "comparer-prix-sac-luxe-occasion",
      "arnaques-sacs-luxe-occasion",
    ],
  },
  {
    slug: "acheter-sac-occasion-authenticite",
    title: "Acheter un sac d’occasion : checklist authenticité",
    h1: "Checklist authenticité avant d’acheter d’occasion",
    description:
      "Points de contrôle pour un sac de luxe d’occasion : coutures, hardware, marquage, photos. Méthode avant paiement.",
    intent: "howto",
    intro:
      "Aucune checklist en ligne ne remplace un expert, mais elle structure vos questions au vendeur et évite les erreurs grossières.",
    sections: [
      {
        h2: "Contrôles photo",
        body: "Macros coutures, logo, fermoir, intérieur, coins. Demandez des clichés du lot réel, pas seulement le catalogue.",
      },
      {
        h2: "Contrôles transaction",
        body: "Identité du vendeur, historique, mode de paiement traçable, politique de retour. Refusez la pression « maintenant ou jamais ».",
      },
      {
        h2: "Avec LuxeFinder",
        body: "Uploadez une photo pour cadrer le modèle, puis appliquez cette checklist à chaque offre remontée.",
      },
    ],
    related: ["authentifier-sac-luxe", "sac-luxe-occasion-france", "eviter-arnaques-vendeurs"],
  },
  {
    slug: "louis-vuitton-occasion",
    title: "Louis Vuitton occasion — Neverfull, Speedy, Alma",
    h1: "Louis Vuitton d’occasion : guide acheteur",
    description:
      "Acheter Louis Vuitton d’occasion : modèles populaires, budget, authenticité, trouver un vendeur avec LuxeFinder.",
    intent: "buy",
    brands: ["louis_vuitton"],
    intro:
      "Neverfull, Speedy et Alma dominent les recherches occasion LV. Clarifiez taille et toile avant de négocier.",
    sections: [
      {
        h2: "Modèles les plus cherchés",
        body: "Neverfull MM/GM, Speedy 25/30, Alma BB/PM, Pochette Métis. Une photo nette évite de comparer des versions différentes.",
      },
      {
        h2: "Budget & état",
        body: "L’état des coins et des anses pèse beaucoup sur le prix. Demandez l’usure réelle et le total rendu.",
      },
      {
        h2: "LuxeFinder",
        body: "Déposez une photo LV + budget pour short-lister des offres / vendeurs.",
      },
    ],
    related: ["trouver-vendeur-louis-vuitton", "budget-sac-louis-vuitton", "louis-vuitton"],
  },
  {
    slug: "gucci-occasion",
    title: "Gucci occasion — Jackie, Marmont, Ophidia",
    h1: "Gucci d’occasion : guide acheteur",
    description:
      "Sacs Gucci d’occasion : Jackie, Marmont, contrôles authenticité, budget, recherche vendeur LuxeFinder.",
    intent: "buy",
    brands: ["gucci"],
    intro:
      "Jackie et Marmont circulent beaucoup en seconde main. Vérifiez génération et hardware avant de comparer les prix.",
    sections: [
      {
        h2: "Repères modèles",
        body: "Jackie : fermoir piston. Marmont : chevron + GG. Ophidia : bande Web. Précisez la taille dans l’annonce.",
      },
      {
        h2: "Authenticité",
        body: "Gravures, coutures, symétrie du matelassé. Photos macro du lot.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo + budget pour trouver des pistes vendeurs Gucci.",
      },
    ],
    related: ["trouver-vendeur-gucci", "gucci", "sac-luxe-occasion-france"],
  },
  {
    slug: "chanel-occasion",
    title: "Chanel occasion — Classic Flap et autres",
    h1: "Chanel d’occasion : guide acheteur",
    description:
      "Chanel Classic Flap d’occasion : tailles, contrôles, budget, trouver un vendeur avec LuxeFinder.",
    intent: "buy",
    brands: ["chanel"],
    intro:
      "Le Classic Flap est le modèle le plus scruté en occasion. Taille, génération et état de la chaîne changent le prix.",
    sections: [
      {
        h2: "Ce qu’il faut figer",
        body: "Taille (mini / small / medium), couleur, année approximative, état du cuir et de la chaîne.",
      },
      {
        h2: "Contrôles",
        body: "Matelassé, fermoir CC, intérieur, numéro selon génération. Exigez des macros.",
      },
      {
        h2: "LuxeFinder",
        body: "Uploadez une photo pour cadrer le modèle puis comparer des offres.",
      },
    ],
    related: ["classic-flap-trouver-vendeur", "chanel", "acheter-sac-occasion-authenticite"],
  },
  {
    slug: "hermes-occasion",
    title: "Hermès occasion — prudence et méthode",
    h1: "Hermès d’occasion : méthode prudente",
    description:
      "Approche prudente pour Hermès en occasion : Birkin/Kelly, preuves, budget, risque d’arnaque élevé.",
    intent: "buy",
    brands: ["hermes"],
    intro:
      "Le segment Hermès attire beaucoup de contrefaçons et d’annonces trompeuses. Ralentissez : preuves d’abord, paiement ensuite.",
    sections: [
      {
        h2: "Informations minimales",
        body: "Taille, cuir, couleur, quincaillerie, provenance. Sans ces infos, refusez de négocier.",
      },
      {
        h2: "Preuves",
        body: "Photos macro, historique vendeur, éventuellement expertise tierce. Méfiez-vous des « deals » urgents.",
      },
      {
        h2: "LuxeFinder",
        body: "Une photo aide à cadrer le modèle ; appliquez ensuite une grille de confiance stricte.",
      },
    ],
    related: ["arnaques-sacs-luxe-occasion", "hermes", "authentifier-sac-luxe"],
  },
  {
    slug: "vente-produits-luxe-occasion",
    title: "Vente de produits de luxe d’occasion — panorama acheteur",
    h1: "Vente de produits de luxe d’occasion",
    description:
      "Comprendre la vente de produits de luxe d’occasion : canaux, prix, risques, et comment LuxeFinder aide à trouver des offres.",
    intent: "howto",
    intro:
      "« Vente produits luxe occasion » couvre sacs, accessoires et parfois prêt-à-porter. L’acheteur gagne à structurer sa recherche plutôt qu’à scroller sans filtre.",
    sections: [
      {
        h2: "Canaux typiques",
        body: "Plateformes C2C, sites spécialisés, réseaux sociaux, vendeurs pro. Chaque canal a ses frais et ses risques.",
      },
      {
        h2: "Filtrer vite",
        body: "Modèle identifié + budget + preuves photos. Sinon vous comparez des pommes et des oranges.",
      },
      {
        h2: "Rôle de LuxeFinder",
        body: "Partir d’une photo et d’un budget pour remonter des pistes, puis négocier hors app avec prudence.",
      },
    ],
    related: ["sac-luxe-occasion-france", "accessoires-luxe-occasion", "deposer-photo-sac-trouver-offre"],
  },
  {
    slug: "trouver-vendeur-louis-vuitton",
    title: "Trouver un vendeur Louis Vuitton selon votre budget",
    h1: "Trouver un vendeur Louis Vuitton",
    description:
      "Photo + budget : comment LuxeFinder aide à trouver des vendeurs / offres autour d’un sac Louis Vuitton.",
    intent: "howto",
    brands: ["louis_vuitton"],
    intro:
      "Plutôt que de multiplier les onglets, partez du modèle exact (photo) et d’une fourchette de prix.",
    sections: [
      {
        h2: "Identifier le modèle",
        body: "Neverfull, Speedy, Alma, Métis… Une erreur de naming fausse toutes les offres.",
      },
      {
        h2: "Budget",
        body: "Indiquez une fourchette réaliste. Demandez le prix total rendu.",
      },
      {
        h2: "Dans l’app",
        body: "luxefinder.app → photo LV → budget → short-list de pistes vendeurs.",
      },
    ],
    related: ["louis-vuitton-occasion", "budget-sac-louis-vuitton", "louis-vuitton"],
  },
  {
    slug: "trouver-vendeur-gucci",
    title: "Trouver un vendeur Gucci selon votre budget",
    h1: "Trouver un vendeur Gucci",
    description:
      "Recherche vendeur Gucci : Jackie, Marmont, photo + budget via LuxeFinder.",
    intent: "howto",
    brands: ["gucci"],
    intro:
      "Les annonces Gucci se ressemblent. Isolez le modèle puis comparez 2–3 offres sérieuses.",
    sections: [
      {
        h2: "Photo utile",
        body: "Face + hardware + détail logo. Évitez les photos trop filtrées.",
      },
      {
        h2: "Comparer",
        body: "Prix, état, preuves. Appliquez une grille courte avant paiement.",
      },
      {
        h2: "LuxeFinder",
        body: "Déposez la photo et le budget pour démarrer la recherche.",
      },
    ],
    related: ["gucci-occasion", "gucci", "comparer-offres-vendeurs"],
  },
  {
    slug: "budget-sac-louis-vuitton",
    title: "Budget sac Louis Vuitton — cadrer sa recherche",
    h1: "Budget pour un sac Louis Vuitton",
    description:
      "Comment fixer un budget pour un sac LV (neuf ou occasion) et l’utiliser dans LuxeFinder.",
    intent: "howto",
    brands: ["louis_vuitton"],
    intro:
      "Sans plafond, chaque « bonne affaire » paraît urgente. Un budget écrit clarifie la négociation.",
    sections: [
      {
        h2: "Ce qui fait varier le prix",
        body: "Modèle, taille, toile, état, canal de vente, frais annexes.",
      },
      {
        h2: "Méthode",
        body: "Notez un mini / cible / max. Restez sous le max même si le vendeur insiste.",
      },
      {
        h2: "Dans LuxeFinder",
        body: "Le champ budget filtre les pistes. Ajustez après identification du modèle.",
      },
    ],
    related: ["trouver-vendeur-louis-vuitton", "budget-sac-luxe", "louis-vuitton"],
  },
  {
    slug: "identifier-neverfull-photo",
    title: "Identifier un Neverfull Louis Vuitton sur photo",
    h1: "Identifier un Neverfull sur photo",
    description:
      "Repères visuels Neverfull MM/GM, erreurs fréquentes, puis recherche d’offres LuxeFinder.",
    intent: "model",
    brands: ["louis_vuitton"],
    intro:
      "Le Neverfull se reconnaît à sa silhouette cabas trapèze. Confirmez la taille avant de comparer des prix.",
    sections: [
      {
        h2: "Signaux",
        body: "Trapèze, anses cuir, coins, toile Monogram/Damier/Empreinte, pochette selon génération.",
      },
      {
        h2: "Erreurs fréquentes",
        body: "Confondre PM/MM/GM, ou un cabas générique avec un Neverfull. Mesurez ou demandez la longueur de base.",
      },
      {
        h2: "Ensuite",
        body: "Dans LuxeFinder, uploadez la photo + budget pour trouver des vendeurs compatibles.",
      },
    ],
    related: ["neverfull", "louis-vuitton", "deposer-photo-sac-trouver-offre"],
  },
  {
    slug: "comparer-prix-sac-luxe-occasion",
    title: "Comparer les prix des sacs de luxe d’occasion",
    h1: "Comparer les prix en occasion luxe",
    description:
      "Méthode pour comparer des prix de sacs de luxe d’occasion sans se faire piéger par des annonces trompeuses.",
    intent: "howto",
    intro:
      "Un prix bas n’est une affaire que si le modèle et l’état sont équivalents. Alignez d’abord les attributs, ensuite les montants.",
    sections: [
      {
        h2: "Grille de comparaison",
        body: "Modèle exact, taille, état (1–5), photos lot, frais totaux, conditions de retour.",
      },
      {
        h2: "Normaliser",
        body: "Ramenez chaque offre au « prix rendu ». Ignorez les annonces sans preuve visuelle récente.",
      },
      {
        h2: "LuxeFinder",
        body: "Short-list via photo/budget, puis appliquez la grille hors app.",
      },
    ],
    related: ["comparer-offres-vendeurs", "sac-luxe-occasion-france", "budget-sac-luxe"],
  },
  {
    slug: "arnaques-sacs-luxe-occasion",
    title: "Arnaques sacs de luxe d’occasion — signaux d’alerte",
    h1: "Arnaques sur les sacs de luxe d’occasion",
    description:
      "Red flags : prix irréalistes, refus de macros, pression, paiements opaques. Protégez votre achat occasion.",
    intent: "howto",
    intro:
      "Le marché occasion attire les arnaqueurs. Une checklist courte évite la plupart des pièges classiques.",
    sections: [
      {
        h2: "Red flags",
        body: "Prix trop bas, vendeur pressé, refus de vidéo/macros, changement de RIB, catalogues volés.",
      },
      {
        h2: "Bonnes pratiques",
        body: "Paiement traçable, échanges écrits, second avis sur l’authenticité si montant élevé.",
      },
      {
        h2: "LuxeFinder",
        body: "Utilisez l’app pour cadrer le modèle ; ne payez jamais dans la précipitation.",
      },
    ],
    related: ["eviter-arnaques-vendeurs", "acheter-sac-occasion-authenticite", "hermes-occasion"],
  },
  {
    slug: "sac-luxe-seconde-main-vs-neuf",
    title: "Sac de luxe seconde main vs neuf",
    h1: "Seconde main ou neuf : comment choisir",
    description:
      "Avantages et limites du sac de luxe neuf vs seconde main : prix, risque, disponibilité, méthode LuxeFinder.",
    intent: "howto",
    intro:
      "Neuf = garantie et état parfait, prix fort. Occasion = potentiel d’économie, plus de devoirs de vérification.",
    sections: [
      {
        h2: "Choisir neuf",
        body: "Si vous voulez une taille/couleur précise neuve, ou zéro risque d’usure.",
      },
      {
        h2: "Choisir occasion",
        body: "Si le modèle iconique est hors budget neuf et que vous savez contrôler l’état.",
      },
      {
        h2: "LuxeFinder",
        body: "Quelle que soit la piste, partez d’une photo pour éviter les erreurs de modèle.",
      },
    ],
    related: ["sac-luxe-occasion-france", "budget-sac-luxe", "premiere-recherche"],
  },
  {
    slug: "deposer-photo-sac-trouver-offre",
    title: "Déposer une photo de sac pour trouver une offre",
    h1: "Photo → offres : le parcours LuxeFinder",
    description:
      "Comment déposer une photo de sac de luxe pour trouver des offres et des vendeurs selon votre budget.",
    intent: "howto",
    intro:
      "C’est le cœur du produit : une image nette + un budget = point de départ pour des pistes concrètes.",
    sections: [
      {
        h2: "Préparer la photo",
        body: "Fond neutre, lumière naturelle, pièce entière, éventuellement un zoom hardware.",
      },
      {
        h2: "Lancer la recherche",
        body: "Sur luxefinder.app, uploadez, indiquez le budget, lisez la description proposée.",
      },
      {
        h2: "Après les résultats",
        body: "Comparez, posez des questions écrites, appliquez la checklist authenticité.",
      },
    ],
    related: ["premiere-recherche", "trouver-vendeur-sac-luxe", "identifier-modele-sac"],
  },
  {
    slug: "book-tote-budget",
    title: "Dior Book Tote budget — cadrer prix et offres",
    h1: "Budget pour un Dior Book Tote",
    description:
      "Fixer un budget Book Tote (motif, taille) et trouver des offres via photo LuxeFinder.",
    intent: "model",
    brands: ["dior"],
    intro:
      "Le motif du Book Tote change fortement le prix perçu. Identifiez-le avant de fixer votre plafond.",
    sections: [
      {
        h2: "Motif & taille",
        body: "Cannage, obliquité, collabs… + small/large. Une photo nette évite les mauvaises comparaisons.",
      },
      {
        h2: "Budget",
        body: "Incluez port et éventuelle commission. Demandez le total rendu.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo Book Tote + budget → pistes vendeurs.",
      },
    ],
    related: ["book-tote", "dior", "budget-sac-luxe"],
  },
  {
    slug: "classic-flap-trouver-vendeur",
    title: "Chanel Classic Flap — trouver un vendeur",
    h1: "Trouver un vendeur pour un Classic Flap",
    description:
      "Classic Flap Chanel : identifier la taille, fixer un budget, trouver des vendeurs avec LuxeFinder.",
    intent: "model",
    brands: ["chanel"],
    intro:
      "Le Classic Flap se négocie sur la taille et l’état. Cadrez ces deux points avant tout contact vendeur.",
    sections: [
      {
        h2: "Identification",
        body: "Matelassé, CC, chaîne culottée. Précisez mini / small / medium.",
      },
      {
        h2: "Recherche",
        body: "Photo + budget dans LuxeFinder, puis grille de comparaison des offres.",
      },
      {
        h2: "Prudence",
        body: "Segment très contrefait : macros et preuves avant paiement.",
      },
    ],
    related: ["classic-flap", "chanel-occasion", "arnaques-sacs-luxe-occasion"],
  },
  {
    slug: "accessoires-luxe-occasion",
    title: "Accessoires de luxe d’occasion — ceintures, portefeuilles",
    h1: "Accessoires de luxe d’occasion",
    description:
      "Acheter ceintures, portefeuilles et petits leather goods d’occasion : contrôles, budget, LuxeFinder.",
    intent: "howto",
    intro:
      "Les accessoires circulent beaucoup en seconde main. Moins spectaculaires qu’un sac, ils demandent les mêmes réflexes d’authenticité.",
    sections: [
      {
        h2: "Points de contrôle",
        body: "Gravure hardware, coutures, symétrie logo, état du cuir. Photos nettes indispensables.",
      },
      {
        h2: "Budget",
        body: "Les écarts sont plus serrés ; un prix anormalement bas reste un signal d’alerte.",
      },
      {
        h2: "LuxeFinder",
        body: "Une photo d’accessoire peut aussi lancer une recherche d’offres selon votre budget.",
      },
    ],
    related: ["vente-produits-luxe-occasion", "sac-luxe-occasion-france", "eviter-arnaques-vendeurs"],
  },
  {
    slug: "speedy-taille-offres",
    title: "Louis Vuitton Speedy — tailles et offres",
    h1: "Speedy : choisir la taille et trouver une offre",
    description:
      "Guide Speedy 20/25/30/35 : quelle taille choisir, budget, puis recherche vendeur via photo LuxeFinder.",
    intent: "model",
    brands: ["louis_vuitton"],
    intro:
      "La Speedy change radicalement selon la taille. Fixez le format avant de comparer des prix d’occasion ou neuf.",
    sections: [
      {
        h2: "Tailles courantes",
        body: "20 (nano), 25, 30, 35. Demandez la longueur de base en cm si le vendeur est vague. Vérifiez aussi la bandoulière.",
      },
      {
        h2: "Offres",
        body: "Comparez état des coins/anses et toile. Un prix bas sur une taille rare mérite des macros.",
      },
      {
        h2: "LuxeFinder",
        body: "Photo Speedy + budget → pistes vendeurs. Voir aussi /sacs/louis-vuitton/speedy-25.",
      },
    ],
    related: ["speedy", "louis-vuitton-occasion", "tailles-sacs-luxe"],
  },
  {
    slug: "glossaire-luxe-acheteur",
    title: "Glossaire luxe pour acheteurs — lexique utile",
    h1: "Glossaire acheteur luxe",
    description:
      "Lexique pour acheteurs de sacs et accessoires de luxe : occasion, QC, hardware, toile, budget, vendeur.",
    intent: "howto",
    intro:
      "Un vocabulaire clair accélère votre recherche et évite les malentendus avec les vendeurs.",
    sections: [
      {
        h2: "Modèle & silhouette",
        body: "Nom commercial de la pièce (Neverfull, Classic Flap…). Toujours le confirmer avant de parler prix.",
      },
      {
        h2: "Hardware / toile / QC",
        body: "Hardware = métaux. Toile = monogram, damier, etc. QC = contrôle qualité photo avant validation.",
      },
      {
        h2: "Budget & offre",
        body: "Budget = plafond. Offre = proposition vendeur (prix + conditions). LuxeFinder relie photo, budget et pistes d’offres.",
      },
    ],
    related: ["trouver-vendeur-sac-luxe", "tailles-sacs-luxe", "premiere-recherche"],
  },
];
