/** Programmatic sac model pages for /sacs/[brand]/[model] */

export type SacModelPage = {
  brand: string;
  model: string;
  name: string;
  h1: string;
  description: string;
  intro: string;
  sections: { h2: string; body: string }[];
  relatedGuideSlugs: string[];
};

export const SAC_MODEL_PAGES: SacModelPage[] = [
  {
    brand: "louis-vuitton",
    model: "neverfull",
    name: "Neverfull",
    h1: "Louis Vuitton Neverfull — identifier et trouver une offre",
    description:
      "Neverfull MM/GM : repères modèle, tailles, et comment LuxeFinder trouve des vendeurs selon votre budget.",
    intro:
      "Le Neverfull est l’un des sacs les plus cherchés. Avant de comparer des offres, confirmez la taille (PM/MM/GM), la toile et le coloris intérieur.",
    sections: [
      {
        h2: "Repères visuels",
        body: "Silhouette cabas trapèze, anses cuir, coins renforcés, pochette intérieure souvent présente selon génération. Notez la toile (Monogram, Damier, Empreinte).",
      },
      {
        h2: "Budget",
        body: "Fixez une fourchette avant de contacter. Les écarts de prix reflètent souvent l’état, la génération ou la qualité annoncée — exigez des photos du lot.",
      },
      {
        h2: "Avec LuxeFinder",
        body: "Uploadez une photo de Neverfull et votre budget : l’app oriente la recherche de vendeurs compatibles.",
      },
    ],
    relatedGuideSlugs: ["louis-vuitton", "neverfull", "budget-sac-luxe"],
  },
  {
    brand: "louis-vuitton",
    model: "alma",
    name: "Alma",
    h1: "Louis Vuitton Alma — guide modèle et offres",
    description: "Alma BB/PM : identification, tailles, recherche vendeur via photo LuxeFinder.",
    intro: "L’Alma se reconnaît à sa coque structurée et ses doubles zips. Clarifiez BB vs PM avant toute négociation.",
    sections: [
      { h2: "Signaux", body: "Forme trapue, double curseur, poignées courtes, pieds métalliques. Vérifiez symétrie et hardware." },
      { h2: "Recherche", body: "Photo nette + budget dans LuxeFinder pour short-lister des vendeurs." },
      { h2: "Contrôles", body: "Demandez macros coutures, coins, intérieur date code / marquage selon génération." },
    ],
    relatedGuideSlugs: ["code-date-louis-vuitton", "sac-de-luxe-moins-1000-euros", "louis-vuitton-occasion", "etat-sac-occasion"],
  },
  {
    brand: "louis-vuitton",
    model: "speedy",
    name: "Speedy",
    h1: "Louis Vuitton Speedy — modèle et vendeurs",
    description: "Speedy 20/25/30/35 : repères, tailles, offres via LuxeFinder.",
    intro: "Le Speedy est un classique. La taille change l’usage quotidien : précisez-la avant de comparer.",
    sections: [
      { h2: "Tailles", body: "20 (nano) à 35. Mesurez ou demandez la longueur base en cm au vendeur." },
      { h2: "Bandoulière", body: "Certaines versions incluent une bandoulière ; confirmez la présence sur photos récentes." },
      { h2: "LuxeFinder", body: "Photo + budget pour lancer la recherche d’offres." },
    ],
    relatedGuideSlugs: ["speedy", "tailles-sacs-luxe", "louis-vuitton"],
  },
  {
    brand: "hermes",
    model: "birkin",
    name: "Birkin",
    h1: "Hermès Birkin — identification et recherche d’offres",
    description: "Birkin : tailles, cuirs, et méthode LuxeFinder pour trouver des vendeurs selon budget.",
    intro: "Le Birkin se définit par taille, cuir et quincaillerie. Sans ces trois infos, les offres ne sont pas comparables.",
    sections: [
      { h2: "Taille & cuir", body: "25/30/35… et type de cuir changent radicalement le prix. Exigez ces infos par écrit." },
      { h2: "Contrôles", body: "Coutures sellier, symétrie, clous, fermoir. Photos macro indispensables." },
      { h2: "LuxeFinder", body: "Déposez une photo pour cadrer le modèle, puis filtrez par budget." },
    ],
    relatedGuideSlugs: ["hermes", "birkin", "authentifier-sac-luxe"],
  },
  {
    brand: "hermes",
    model: "kelly",
    name: "Kelly",
    h1: "Hermès Kelly — guide modèle",
    description: "Kelly Sellier/Retournée : repères et recherche vendeur LuxeFinder.",
    intro: "Kelly et Birkin se confondent souvent en photo floue. Isolez la silhouette et le type de fermoir.",
    sections: [
      { h2: "Différences clés", body: "Structure plus verticale, sangles latérales, cadenas caractéristique." },
      { h2: "Sellier vs Retournée", body: "Finition et tenue changent. Demandez le type explicitement." },
      { h2: "App", body: "Photo + budget sur luxefinder.app." },
    ],
    relatedGuideSlugs: ["kelly", "hermes", "comparer-offres-vendeurs"],
  },
  {
    brand: "chanel",
    model: "classic-flap",
    name: "Classic Flap",
    h1: "Chanel Classic Flap — identifier et trouver une offre",
    description: "Classic Flap medium/small : matelassé, chaîne, recherche vendeur LuxeFinder.",
    intro: "Matelassé diamant, fermoir CC et chaîne culottée cuir sont les signaux Classic Flap. Précisez la taille.",
    sections: [
      { h2: "Repères", body: "Matelassé régulier, logo CC, chaîne entrelacée. Vérifiez l’intérieur et le numéro de série selon génération." },
      { h2: "Offres", body: "Comparez prix + photos lot. Méfiez-vous des catalogues génériques." },
      { h2: "LuxeFinder", body: "Uploadez une photo pour démarrer la short-list vendeurs." },
    ],
    relatedGuideSlugs: ["chanel", "classic-flap", "trouver-vendeur-sac-luxe"],
  },
  {
    brand: "dior",
    model: "book-tote",
    name: "Book Tote",
    h1: "Dior Book Tote — modèle et offres",
    description: "Book Tote : motifs, tailles, recherche via photo LuxeFinder.",
    intro: "Le Book Tote se distingue par sa broderie / motif et sa silhouette cabas rigide. Le motif est le premier filtre.",
    sections: [
      { h2: "Motif", body: "Confirmez le pattern exact (cannage, obliquité, collaboration). Une photo nette évite les erreurs." },
      { h2: "Taille", body: "Small vs large : demandez dimensions intérieures si besoin quotidien." },
      { h2: "LuxeFinder", body: "Photo + budget → pistes vendeurs." },
    ],
    relatedGuideSlugs: ["dior", "book-tote", "budget-sac-luxe"],
  },
  {
    brand: "gucci",
    model: "jackie",
    name: "Jackie",
    h1: "Gucci Jackie — guide et vendeurs",
    description: "Jackie 1961 : piston clasp, identification, offres LuxeFinder.",
    intro: "Le fermoir piston est la signature Jackie. Vérifiez la génération (classic vs 1961).",
    sections: [
      { h2: "Signaux", body: "Anse courbe, fermoir piston, toile ou cuir selon version." },
      { h2: "Contrôles", body: "Hardware, coutures, logo. Photos récentes du lot." },
      { h2: "App", body: "Lancez LuxeFinder avec une photo claire." },
    ],
    relatedGuideSlugs: ["numero-serie-gucci", "sac-de-luxe-moins-1000-euros", "gucci-occasion", "faire-authentifier-un-sac"],
  },
  {
    brand: "gucci",
    model: "marmont",
    name: "Marmont",
    h1: "Gucci Marmont — modèle et offres",
    description: "GG Marmont : matelassé chevron, recherche vendeur via LuxeFinder.",
    intro: "Le double G et le matelassé chevron définissent la ligne Marmont. Précisez mini / small / medium.",
    sections: [
      { h2: "Repères", body: "Chevron matelassé, logo GG, chaîne ou bandoulière selon modèle." },
      { h2: "Budget", body: "Cadrez une fourchette avant négociation." },
      { h2: "LuxeFinder", body: "Photo → offres vendeurs filtrées budget." },
    ],
    relatedGuideSlugs: ["numero-serie-gucci", "sac-de-luxe-moins-1000-euros", "gucci-occasion", "etat-sac-occasion"],
  },
  {
    brand: "saint-laurent",
    model: "loulou",
    name: "Loulou",
    h1: "Saint Laurent Loulou — identification et offres",
    description: "Loulou YSL : quilt Y, fermoir, recherche LuxeFinder.",
    intro: "Le matelassé en Y et le monogramme YSL sont les clés. Distinguez small / medium.",
    sections: [
      { h2: "Signaux", body: "Quilt Y, fermoir monogramme, bandoulière chaîne." },
      { h2: "Vérifs", body: "Symétrie quilt, gravure hardware, coutures." },
      { h2: "App", body: "Utilisez luxefinder.app pour lancer la recherche." },
    ],
    relatedGuideSlugs: ["sac-de-luxe-moins-1000-euros", "premier-sac-de-luxe", "etat-sac-occasion", "faire-authentifier-un-sac"],
  },
  {
    brand: "louis-vuitton",
    model: "pochette-metis",
    name: "Pochette Métis",
    h1: "Louis Vuitton Pochette Métis — identifier et trouver une offre",
    description:
      "Pochette Métis : repères, tailles, budget, recherche vendeur via photo LuxeFinder.",
    intro:
      "La Métis se reconnaît à son rabat et son S-lock. Confirmez East West vs version classique avant de comparer.",
    sections: [
      { h2: "Signaux", body: "Rabat, S-lock, bandoulière, compartiments. Photo face + fermoir indispensables." },
      { h2: "Budget", body: "Cadrez une fourchette selon état (neuf / occasion)." },
      { h2: "LuxeFinder", body: "Uploadez une photo + budget pour short-lister des offres." },
    ],
    relatedGuideSlugs: ["code-date-louis-vuitton", "reconnaitre-vrai-louis-vuitton", "prix-neverfull-occasion", "louis-vuitton-occasion"],
  },
  {
    brand: "louis-vuitton",
    model: "speedy-25",
    name: "Speedy 25",
    h1: "Louis Vuitton Speedy 25 — guide taille et offres",
    description: "Speedy 25 : dimensions, bandoulière, recherche d’offres LuxeFinder.",
    intro: "La Speedy 25 est un format quotidien. Vérifiez la présence d’une bandoulière selon la version.",
    sections: [
      { h2: "Taille", body: "Demandez la longueur de base en cm si le vendeur est flou sur « 25 »." },
      { h2: "Contrôles", body: "Coins, anses, toile, zip. Macros du lot." },
      { h2: "App", body: "Photo Speedy + budget sur luxefinder.app." },
    ],
    relatedGuideSlugs: ["speedy", "tailles-sacs-luxe", "louis-vuitton-occasion"],
  },
  {
    brand: "chanel",
    model: "boy",
    name: "Boy",
    h1: "Chanel Boy — identification et offres",
    description: "Chanel Boy : fermoir, chaîne, tailles, recherche vendeur LuxeFinder.",
    intro: "Le Boy se distingue par son fermoir et sa chaîne. Précisez la taille avant négociation.",
    sections: [
      { h2: "Repères", body: "Fermoir Boy, matelassé, chaîne. Distinguez small / old medium." },
      { h2: "Occasion", body: "État de la chaîne et du cuir pèsent sur le prix." },
      { h2: "LuxeFinder", body: "Photo + budget pour trouver des pistes." },
    ],
    relatedGuideSlugs: ["prix-chanel-timeless-occasion", "numero-serie-chanel", "augmentation-prix-chanel", "chanel-occasion"],
  },
  {
    brand: "bottega-veneta",
    model: "jodie",
    name: "Jodie",
    h1: "Bottega Veneta Jodie — guide et offres",
    description: "Jodie Bottega : intrecciato, tailles, budget, LuxeFinder.",
    intro: "La Jodie se reconnaît à ses nœuds et à l’intrecciato. Clarifiez mini / small / medium.",
    sections: [
      { h2: "Signaux", body: "Nœuds caractéristiques, tressage, forme galbée." },
      { h2: "Contrôles", body: "Régularité du tressage, hardware, intérieur." },
      { h2: "App", body: "Lancez une recherche photo sur LuxeFinder." },
    ],
    relatedGuideSlugs: ["sac-de-luxe-investissement", "sac-de-luxe-moins-1000-euros", "etat-sac-occasion", "budget-sac-luxe"],
  },
  {
    brand: "fendi",
    model: "baguette",
    name: "Baguette",
    h1: "Fendi Baguette — modèle et vendeurs",
    description: "Fendi Baguette : variants, contrôles, offres via LuxeFinder.",
    intro: "La Baguette a de nombreuses éditions. Isoler le variant évite les mauvaises comparaisons de prix.",
    sections: [
      { h2: "Variant", body: "Matériau, motif FF, taille. Photo nette du fermoir et du rabat." },
      { h2: "Budget", body: "Les collabs / éditions limitées sortent du marché « classique »." },
      { h2: "LuxeFinder", body: "Photo + budget → pistes vendeurs." },
    ],
    relatedGuideSlugs: ["sac-de-luxe-moins-1000-euros", "faire-authentifier-un-sac", "etat-sac-occasion", "sac-luxe-occasion-france"],
  },
  {
    brand: "celine",
    model: "luggage",
    name: "Luggage",
    h1: "Celine Luggage — identification et offres",
    description: "Celine Luggage : silhouette, tailles, recherche LuxeFinder.",
    intro: "La Luggage se reconnaît à ses poignées et sa structure. Confirmez nano / micro / regular.",
    sections: [
      { h2: "Signaux", body: "Forme doctor bag, poignées, bandoulière optionnelle." },
      { h2: "État", body: "Coins et base s’usent vite — exigez des macros." },
      { h2: "App", body: "Uploadez une photo pour démarrer la recherche." },
    ],
    relatedGuideSlugs: ["sac-de-luxe-investissement", "etat-sac-occasion", "acheter-sac-occasion-authenticite", "celine"],
  },
  {
    brand: "dior",
    model: "saddle",
    name: "Saddle",
    h1: "Dior Saddle — guide modèle et offres",
    description: "Dior Saddle : silhouette, contrôles, budget, LuxeFinder.",
    intro: "La Saddle a une forme très distinctive. Vérifiez la génération et le matériau.",
    sections: [
      { h2: "Repères", body: "Silhouette sellier, CD fermoir, bandoulière." },
      { h2: "Offres", body: "Comparez état et authenticité avant le prix seul." },
      { h2: "LuxeFinder", body: "Photo Saddle + budget pour short-list." },
    ],
    relatedGuideSlugs: ["authentifier-sac-dior", "book-tote-budget", "faire-authentifier-un-sac", "dior"],
  },
  {
    brand: "louis-vuitton",
    model: "keepall",
    name: "Keepall",
    h1: "Louis Vuitton Keepall — tailles, cabine et offres occasion",
    description:
      "Keepall 45/50/55 : cabine, bandoulière, prix occasion, usure, recherche LuxeFinder.",
    intro:
      "Le Keepall est le week-ender LV le plus cherché. Clarifiez 45 vs 50 vs 55, avec/sans bandoulière, avant de comparer.",
    sections: [
      { h2: "Les tailles et leurs usages", body: "45 = compact, 50 = polyvalent, 55 = vrai volume. Demandez la longueur utile si vous visez un bagage cabine." },
      { h2: "Quelle taille passe en cabine", body: "Les règles compagnies varient. Un 55 rempli passe rarement confortablement ; 45/50 sont plus réalistes." },
      { h2: "Bandoulière et prix", body: "Confirmez sangle + attaches sur photos du lot. Poignées, coins, doublure décotent fort." },
      { h2: "LuxeFinder", body: "Photo Keepall + budget pour short-lister des offres." },
    ],
    relatedGuideSlugs: ["louis-vuitton-vintage", "sac-luxe-homme", "code-date-louis-vuitton", "louis-vuitton-occasion"],
  },
  {
    brand: "louis-vuitton",
    model: "onthego",
    name: "OnTheGo",
    h1: "Louis Vuitton OnTheGo — guide occasion et offres",
    description:
      "OnTheGo PM/MM/GM : toile vs empreinte, usure des anses, prix occasion, LuxeFinder.",
    intro:
      "Cabas LV récent très demandé. Clarifiez taille et matière (monogram géant vs empreinte) avant de négocier.",
    sections: [
      { h2: "Tailles PM/MM/GM", body: "La taille change l’usage quotidien. Photo avec objet de référence si le vendeur est flou." },
      { h2: "Toile vs empreinte", body: "Anses fines et coins : points d’usure typiques à inspecter en macros." },
      { h2: "LuxeFinder", body: "Photo + budget pour comparer des offres." },
    ],
    relatedGuideSlugs: ["taille-neverfull-pm-mm-gm", "prix-neverfull-occasion", "code-date-louis-vuitton", "louis-vuitton-occasion"],
  },
  {
    brand: "chanel",
    model: "woc",
    name: "WOC",
    h1: "Chanel WOC (Wallet on Chain) — guide et prix occasion",
    description:
      "WOC Chanel : contenance, versions, prix occasion, authenticité, LuxeFinder.",
    intro:
      "Porte d’entrée Chanel fréquente en occasion. Validez l’usage réel (mini format) et le cuir avant d’acheter.",
    sections: [
      { h2: "C’est quoi une WOC", body: "Portefeuille / mini sac à chaîne. Idéale light daily — pas un cabas." },
      { h2: "Versions et prix", body: "Timeless, Boy, 19, saisonnières : ne comparez pas les prix entre versions." },
      { h2: "LuxeFinder", body: "Photo WOC + budget pour trouver des pistes." },
    ],
    relatedGuideSlugs: ["augmentation-prix-chanel", "chanel-caviar-ou-agneau", "numero-serie-chanel", "chanel-occasion"],
  },
  {
    brand: "chanel",
    model: "chanel-19",
    name: "Chanel 19",
    h1: "Chanel 19 — guide occasion et offres",
    description:
      "Chanel 19 occasion : tailles, cuir souple, écart neuf/occasion, authenticité, LuxeFinder.",
    intro:
      "Icône plus récente : le 19 ne se comporte pas comme un Timeless à la revente. Clarifiez taille et état de l’agneau.",
    sections: [
      { h2: "Tailles et chaînes", body: "Demandez la taille exacte ; le porté change avec la chaîne mixte." },
      { h2: "Cuir souple", body: "L’agneau marque vite — macros coins et zones de contact." },
      { h2: "LuxeFinder", body: "Photo + budget pour short-list." },
    ],
    relatedGuideSlugs: ["augmentation-prix-chanel", "chanel-caviar-ou-agneau", "numero-serie-chanel", "prix-chanel-timeless-occasion"],
  },
  {
    brand: "dior",
    model: "lady-dior",
    name: "Lady Dior",
    h1: "Lady Dior d’occasion — guide et prix",
    description:
      "Lady Dior occasion : tailles, prix, charms, cannage, vintage vs récent, LuxeFinder.",
    intro:
      "Cannage et charms D.I.O.R. En occasion, inspectez charms, coins et cannage avant le prix affiché.",
    sections: [
      { h2: "Tailles et prix", body: "Mini / medium… ne mélangez pas les tailles dans l’argus. Vintage ≠ récent." },
      { h2: "Points de contrôle", body: "Charms, cannage, marquages — voir guide authentifier Dior." },
      { h2: "LuxeFinder", body: "Photo Lady Dior + budget." },
    ],
    relatedGuideSlugs: ["authentifier-sac-dior", "book-tote-budget", "faire-authentifier-un-sac", "dior"],
  },
  {
    brand: "celine",
    model: "triomphe",
    name: "Triomphe",
    h1: "Celine Triomphe d’occasion — guide et offres",
    description:
      "Celine Triomphe occasion : teen vs medium, prix, fermoir, marquages, LuxeFinder.",
    intro:
      "Triomphe cuir récent vs héritage toile : deux marchés. Clarifiez taille et matière avant de comparer.",
    sections: [
      { h2: "Tailles et prix", body: "Teen vs medium : usage et cote différents. Relevez des annonces comparables." },
      { h2: "Authentifier", body: "Fermoir, marquages, logo selon époque (Celine / Céline)." },
      { h2: "LuxeFinder", body: "Photo + budget." },
    ],
    relatedGuideSlugs: ["sac-de-luxe-moins-1000-euros", "sac-de-luxe-investissement", "acheter-sac-occasion-authenticite", "celine"],
  },
  {
    brand: "hermes",
    model: "evelyne",
    name: "Evelyne",
    h1: "Hermès Evelyne d’occasion — l’Hermès accessible",
    description:
      "Evelyne TPM/PM/GM occasion : prix réalistes, blind stamp, cuirs, prudence auth, LuxeFinder.",
    intro:
      "Point d’entrée Hermès fréquent en occasion. Ton éducatif : prix réalistes et vigilance contrefaçon.",
    sections: [
      { h2: "Tailles et prix", body: "TPM/PM/GM changent le porté. Méfiez-vous des prix irréalistes." },
      { h2: "Blind stamp et contrôles", body: "Le tampon aide à dater ; ce n’est pas une preuve absolue seule." },
      { h2: "LuxeFinder", body: "Photo + budget ; auth renforcée sur gros tickets." },
    ],
    relatedGuideSlugs: ["kelly-vs-birkin", "faire-authentifier-un-sac", "hermes-occasion", "prix-kelly-occasion"],
  },
  {
    brand: "hermes",
    model: "picotin",
    name: "Picotin",
    h1: "Hermès Picotin d’occasion — guide",
    description:
      "Picotin 18/22 occasion : prix, cuir clémence, blind stamp, LuxeFinder.",
    intro:
      "Second Hermès « accessible » classique. Affaissement du clémence : souvent normal — à juger selon intensité et prix.",
    sections: [
      { h2: "18 vs 22", body: "Volume et porté différents. Ne comparez pas les prix entre tailles." },
      { h2: "Cuir et vérification", body: "Soft collapse possible ; déformation extrême se négocie. Blind stamp + finitions." },
      { h2: "LuxeFinder", body: "Photo Picotin + budget." },
    ],
    relatedGuideSlugs: ["kelly-vs-birkin", "faire-authentifier-un-sac", "hermes-occasion", "prix-birkin-occasion"],
  },
  {
    brand: "prada",
    model: "re-edition-2005",
    name: "Re-Edition 2005",
    h1: "Prada Re-Edition 2005 d’occasion — guide",
    description:
      "Prada Re-Edition / nylon : vintage vs réédition, prix, auth triangle/plaque/zips, LuxeFinder.",
    intro:
      "Modèle ultra-copié. Distinguez réédition, vintage 2000s et faux nylon avant de parler prix.",
    sections: [
      { h2: "Versions et prix", body: "Deux marchés (vintage / réédition). Un nylon « parfait » hors marché = alerte." },
      { h2: "Authentifier", body: "Triangle, plaque intérieure, zips, coutures." },
      { h2: "LuxeFinder", body: "Photo + budget." },
    ],
    relatedGuideSlugs: ["sac-de-luxe-moins-1000-euros", "faire-authentifier-un-sac", "premier-sac-de-luxe", "arnaques-sacs-luxe-occasion"],
  },
  {
    brand: "prada",
    model: "galleria",
    name: "Galleria",
    h1: "Prada Galleria d’occasion — guide",
    description:
      "Galleria saffiano occasion : tailles, prix, authenticité, vieillissement du cuir.",
    intro:
      "Le saffiano vieillit souvent bien → bon rapport en occasion si l’auth est OK.",
    sections: [
      { h2: "Tailles et prix", body: "Ne mélangez pas mini et formats bureau dans l’argus." },
      { h2: "Contrôles", body: "Marquages, hardware, coins de base." },
      { h2: "LuxeFinder", body: "Photo + budget." },
    ],
    relatedGuideSlugs: ["sac-de-luxe-moins-1000-euros", "faire-authentifier-un-sac", "premier-sac-de-luxe", "etat-sac-occasion"],
  },
  {
    brand: "gucci",
    model: "dionysus",
    name: "Dionysus",
    h1: "Gucci Dionysus d’occasion — guide et prix",
    description:
      "Dionysus occasion : versions GG/suede, cote, fermoir tête de tigre, LuxeFinder.",
    intro:
      "Cote en repli = opportunités si état et auth sont bons. Contrôlez surtout le fermoir.",
    sections: [
      { h2: "Versions et tendance", body: "GG Supreme, suede, mini… prix non comparables. Croisez 5 annonces." },
      { h2: "Le fermoir", body: "Point d’auth n°1 — macro obligatoire." },
      { h2: "LuxeFinder", body: "Photo + budget." },
    ],
    relatedGuideSlugs: ["numero-serie-gucci", "gucci-occasion", "sac-de-luxe-moins-1000-euros", "faire-authentifier-un-sac"],
  },
];

export function getSacModel(brand: string, model: string): SacModelPage | undefined {
  return SAC_MODEL_PAGES.find((p) => p.brand === brand && p.model === model);
}

export function modelsByBrand(brand: string): SacModelPage[] {
  return SAC_MODEL_PAGES.filter((p) => p.brand === brand);
}

export function allBrandsFromModels(): string[] {
  return [...new Set(SAC_MODEL_PAGES.map((p) => p.brand))];
}
