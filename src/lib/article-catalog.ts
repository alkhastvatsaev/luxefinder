/** Catalog of product article pages — one per studio image (SEO + Google Images). */

export type ArticleCategory = "sac" | "bijou" | "lunettes";

export type ArticleSection = { h2: string; body: string };

export type ArticleSource = { title: string; url: string };

export type ArticleItem = {
  slug: string;
  brand: string;
  name: string;
  shortName: string;
  category: ArticleCategory;
  /** Public path under luxefinder.app */
  imagePath: string;
  /** Alt optimized for Google Images query "luxe finder" */
  imageAlt: string;
  /** Caption for image sitemap / figcaption */
  imageCaption: string;
  year?: string;
  designer?: string;
  h1: string;
  description: string;
  intro: string;
  sections: ArticleSection[];
  sources: ArticleSource[];
};

const SITE = "https://luxefinder.app";

function lfAlt(product: string): string {
  return `LuxeFinder — ${product} | photo luxefinder.app`;
}

function lfCaption(product: string): string {
  return `Photo LuxeFinder : ${product}. Identifiez ce modèle avec l’app photo sur luxefinder.app.`;
}

export const ARTICLE_CATALOG: ArticleItem[] = [
  // ─── Sacs ───────────────────────────────────────────────────────────────
  {
    slug: "hermes-birkin-cargo",
    brand: "Hermès",
    name: "Hermès Birkin Cargo",
    shortName: "Birkin Cargo",
    category: "sac",
    imagePath: "/pics/item-01.jpg",
    imageAlt: lfAlt("Hermès Birkin Cargo toile Goéland"),
    imageCaption: lfCaption("Hermès Birkin Cargo"),
    year: "2020",
    h1: "LuxeFinder — Histoire du Hermès Birkin Cargo",
    description:
      "Origine du Birkin Cargo Hermès (2020) : toile Goéland, poches utilitaires, édition limitée. Photo et histoire sur LuxeFinder.",
    intro:
      "Le Birkin Cargo réinterprète l’icône Hermès de 1984 dans une version utilitaire : toile légère, poches extérieures et détails techniques — sans renoncer au savoir-faire de la maison.",
    sections: [
      {
        h2: "De Jane Birkin au Cargo",
        body: "Le Birkin naît en 1984 d’une conversation entre Jane Birkin et Jean-Louis Dumas à bord d’un vol Paris–Londres : un sac capacieux, ouvert, pensé pour la vie réelle. Quatre décennies plus tard, Hermès pousse cette logique pratique avec le Cargo, présenté comme l’un des Birkins les plus fonctionnels jamais produits.",
      },
      {
        h2: "Signature Cargo",
        body: "Apparu vers 2020 en édition limitée, le Cargo combine toile Goéland (ou assimilée) et trim cuir Swift, souvent en hardware palladium. Cinq poches extérieures, sangles et parfois un porte-gobelet : le vocabulaire du travel et du workwear entre dans le temple Hermès. Les volumes restent ceux du Birkin (notamment 35), ce qui en fait une pièce immédiatement reconnaissable pour les collectionneurs.",
      },
      {
        h2: "Pourquoi cette photo compte pour LuxeFinder",
        body: "Sur LuxeFinder, cette image studio sert de référence visuelle : silhouette Cargo, contraste toile/cuir, placement des poches. L’objectif SEO et Images Google est clair — associer la photo au nom « LuxeFinder » pour que la recherche « luxe finder » fasse remonter ces clichés dans l’onglet Images.",
      },
    ],
    sources: [
      {
        title: "Christie’s — Guide Birkin limited editions (Cargo)",
        url: "https://www.christies.com/stories/hermes-birkin-bags-a-guide-to-the-most-covetable-limited-edition-styles-4f57cf934a054a49a40e670304e2af46",
      },
      {
        title: "Sotheby’s — Cargo Birkin & HAC Cargo",
        url: "https://www.sothebys.com/en/articles/the-ultimate-guide-to-the-hermes-cargo-birkin-and-hac-cargo",
      },
    ],
  },
  {
    slug: "hermes-birkin-touch",
    brand: "Hermès",
    name: "Hermès Birkin Touch",
    shortName: "Birkin Touch",
    category: "sac",
    imagePath: "/pics/item-02.jpg",
    imageAlt: lfAlt("Hermès Birkin Touch accents exotiques"),
    imageCaption: lfCaption("Hermès Birkin Touch"),
    year: "années 2010+",
    h1: "LuxeFinder — Histoire du Hermès Birkin Touch",
    description:
      "Le Birkin Touch Hermès mêle cuir classique et accents exotiques (lézard, crocodile…). Histoire, codes et photo LuxeFinder.",
    intro:
      "Le Birkin Touch désigne les Birkins où des peaux exotiques viennent « toucher » le corps principal en cuir — un dialogue de textures très recherché sur le marché secondaire.",
    sections: [
      {
        h2: "Qu’est-ce qu’un Touch ?",
        body: "Chez Hermès, « Touch » signale un mélange de matières : typiquement un corps en Togo, Clemence ou Swift, avec poignées, coins ou panneaux en lézard, alligator ou crocodile. Le contraste mat/lustré et grain/écaille rend chaque pièce unique.",
      },
      {
        h2: "Place dans la famille Birkin",
        body: "Moins un modèle fixe qu’une configuration artisanale, le Touch s’inscrit dans la tradition Hermès des éditions spéciales et des commandes sur-mesure. Il conserve la structure Birkin (anses, clapet, clous de pied) tout en poussant le luxe matière.",
      },
      {
        h2: "Identifier avec LuxeFinder",
        body: "Sur une photo, les indices Touch sont les zones exotiques brillantes et le contraste avec le cuir grainé. LuxeFinder utilise ce type d’image pour entraîner l’œil (et le modèle) à séparer Birkin classique, Cargo, Touch et HAC.",
      },
    ],
    sources: [
      {
        title: "PurseBop — Exclusive Touch Birkin",
        url: "https://www.pursebop.com/all-about-the-exclusive-touch-birkin-hermes-101-reveal/",
      },
    ],
  },
  {
    slug: "gucci-ophidia-gg",
    brand: "Gucci",
    name: "Gucci Ophidia GG",
    shortName: "Ophidia GG",
    category: "sac",
    imagePath: "/pics/item-03.jpg",
    imageAlt: lfAlt("Gucci Ophidia GG toile monogramme"),
    imageCaption: lfCaption("Gucci Ophidia GG"),
    year: "2018",
    designer: "Alessandro Michele",
    h1: "LuxeFinder — Histoire du Gucci Ophidia GG",
    description:
      "Sac Gucci Ophidia GG : monogramme, bandes Web vert-rouge, hardware Double G. Histoire Michele et photo LuxeFinder.",
    intro:
      "L’Ophidia incarne le revival Alessandro Michele : toile GG Supreme, bandes Web héritées des années 50–60, et fermoir Double G — un best-seller accessible de la maison florentine.",
    sections: [
      {
        h2: "Codes maison",
        body: "Le monogramme GG (Guccio Gucci) et les bandes Web vert-rouge-vert sont des signatures historiques. Michele les a remis au centre du vestiaire, avec un hardware vintage et des proportions shoulder bag très Instagram.",
      },
      {
        h2: "Ligne Ophidia",
        body: "Lancée sous Michele, Ophidia décline mini, small et medium en toile ou cuir. Le petit modèle shoulder avec chainette et bandoulière toile est l’un des plus photographiés — exactement le type de silhouette de notre image studio.",
      },
      {
        h2: "Sur LuxeFinder",
        body: "Repérer Ophidia = lire Web + Double G + toile GG. La page associe le nom LuxeFinder à cette photo pour le référencement Images.",
      },
    ],
    sources: [
      {
        title: "Gucci — Ophidia (collection maison)",
        url: "https://www.gucci.com/",
      },
    ],
  },
  {
    slug: "chanel-classic-flap",
    brand: "Chanel",
    name: "Chanel Classic Flap",
    shortName: "Classic Flap",
    category: "sac",
    imagePath: "/pics/item-04.jpg",
    imageAlt: lfAlt("Chanel Classic Flap caviar noir doré"),
    imageCaption: lfCaption("Chanel Classic Flap"),
    year: "1983 (héritage 2.55 de 1955)",
    designer: "Karl Lagerfeld / Coco Chanel",
    h1: "LuxeFinder — Histoire du Chanel Classic Flap",
    description:
      "Du 2.55 (1955) au Classic Double Flap de Karl Lagerfeld (1983) : matelassé, chaîne, CC. Photo et récit LuxeFinder.",
    intro:
      "Peu de sacs sont aussi immédiatement lisibles : matelassé diamant, chaîne entrelacée de cuir, fermoir Double C. Le Classic Flap est l’évolution Lagerfeld du 2.55 de Coco Chanel.",
    sections: [
      {
        h2: "1955 — le 2.55",
        body: "En février 1955, Gabrielle Chanel lance le 2.55 : première bandoulière pour libérer les mains des femmes, matelassé inspiré des vestes de jockeys, doublure bordeaux évoquant Aubazine. Une révolution fonctionnelle autant qu’esthétique.",
      },
      {
        h2: "1983 — Classic Double Flap",
        body: "Karl Lagerfeld introduit le Classic Double Flap (référence 11.12) : fermoir Double C tournevis, chaîne gainée cuir, double rabat intérieur. Le modèle en caviar noir hardware doré de notre photo est devenu un standard d’investissement et d’identification visuelle.",
      },
      {
        h2: "Repères LuxeFinder",
        body: "Sur image : quilting, proportion medium, contraste caviar / métal doré. Titre et alt portent « LuxeFinder » pour lier la marque à ce cliché dans Google Images.",
      },
    ],
    sources: [
      {
        title: "Sotheby’s — The Chanel Flap Bag",
        url: "https://www.sothebys.com/en/articles/the-chanel-flap-bag-iconic-since-1955",
      },
    ],
  },
  {
    slug: "prada-re-edition-2005",
    brand: "Prada",
    name: "Prada Re-Edition 2005",
    shortName: "Re-Edition 2005",
    category: "sac",
    imagePath: "/pics/item-05.jpg",
    imageAlt: lfAlt("Prada Re-Edition 2005 nylon noir"),
    imageCaption: lfCaption("Prada Re-Edition 2005"),
    year: "2005 / reédition 2019+",
    designer: "Miuccia Prada",
    h1: "LuxeFinder — Histoire du Prada Re-Edition 2005",
    description:
      "Nylon Prada Re-Edition 2005 : mini shoulder bag culte, plaque triangle, revival street-luxe. Photo LuxeFinder.",
    intro:
      "Icône nylon de Miuccia Prada, la Re-Edition 2005 a connu un second souffle massif à la fin des années 2010 : petit format, bandoulière, plaque triangle — le sac « micro » par excellence.",
    sections: [
      {
        h2: "Le nylon comme signature",
        body: "Dès les années 1980–90, Prada élève le nylon technique au rang de luxe. Le Re-Edition 2005 concentre cette idée dans un format compact avec zip, poche frontale et logo triangle émaillé.",
      },
      {
        h2: "Revival",
        body: "Reprise et amplifiée dans les collections récentes, la ligne Re-Edition (2000, 2005…) est devenue un phénomène TikTok / street style, tout en restant ancrée dans l’ADN industrial-chic de la maison milanaise.",
      },
      {
        h2: "Photo LuxeFinder",
        body: "Silhouette noire mate, hardware argenté, triangle : autant de signaux pour l’identification photo. Alt et légende intègrent LuxeFinder pour le SEO Images.",
      },
    ],
    sources: [
      {
        title: "Prada — Re-Nylon / Re-Edition",
        url: "https://www.prada.com/",
      },
    ],
  },
  {
    slug: "saint-laurent-loulou",
    brand: "Saint Laurent",
    name: "Saint Laurent Loulou",
    shortName: "Loulou",
    category: "sac",
    imagePath: "/pics/item-06.jpg",
    imageAlt: lfAlt("Saint Laurent Loulou matelassé"),
    imageCaption: lfCaption("Saint Laurent Loulou"),
    year: "2015",
    designer: "Hedi Slimane (hommage à Loulou de La Falaise)",
    h1: "LuxeFinder — Histoire du Saint Laurent Loulou",
    description:
      "Sac YSL Loulou : hommage à Loulou de La Falaise, matelassé chevron, fermoir YSL. Histoire et photo LuxeFinder.",
    intro:
      "Nommé d’après Loulou de La Falaise, muse d’Yves Saint Laurent, le Loulou est le shoulder bag matelassé chevron devenu best-seller sous Hedi Slimane.",
    sections: [
      {
        h2: "Loulou de La Falaise",
        body: "Styliste et amie d’Yves Saint Laurent dès la fin des années 1960, Loulou incarnait l’élégance libre de la maison. Lui dédier un sac, c’est ancrer l’accessoire dans la mythologie YSL.",
      },
      {
        h2: "Design",
        body: "Matelassé en V (chevron), rabat souple, monogramme YSL métallique, bandoulière chaîne : une lecture moderne du quilted bag parisien, plus rock que le Classic Flap.",
      },
      {
        h2: "Sur LuxeFinder",
        body: "La photo studio isole le chevron et le fermoir — points d’ancrage pour l’ID visuelle et pour le ranking Images sous la requête LuxeFinder.",
      },
    ],
    sources: [
      {
        title: "Musée Yves Saint Laurent — Loulou de La Falaise",
        url: "https://museeyslparis.com/en/biography/rencontre-avec-loulou-de-la-falaise",
      },
    ],
  },
  {
    slug: "louis-vuitton-alma-bb",
    brand: "Louis Vuitton",
    name: "Louis Vuitton Alma BB",
    shortName: "Alma BB",
    category: "sac",
    imagePath: "/pics/item-07.jpg",
    imageAlt: lfAlt("Louis Vuitton Alma BB Monogram"),
    imageCaption: lfCaption("Louis Vuitton Alma BB Monogram"),
    year: "1934 (forme) / BB moderne",
    designer: "Gaston-Louis Vuitton",
    h1: "LuxeFinder — Histoire du Louis Vuitton Alma BB",
    description:
      "Alma LV : du Squire Art déco (1934) à l’Alma BB Monogram. Pont de l’Alma, silhouette dôme, photo LuxeFinder.",
    intro:
      "L’Alma, silhouette dôme Art déco, doit son nom à la Place / au pont de l’Alma à Paris. Le format BB (Baby) en Monogram est l’une des versions les plus portées aujourd’hui.",
    sections: [
      {
        h2: "Des Steamer au Squire",
        body: "Héritière des bagages de voyage (Steamer 1901), la forme compacte « Squire » est liée à Gaston-Louis Vuitton et, selon la légende maison, à une demande de Coco Chanel. En 1934, le modèle public adopte l’esprit Alma.",
      },
      {
        h2: "Alma et Monogram",
        body: "La toile Monogram (1896) a redonné une seconde vie à la forme ; le nom Alma s’impose durablement. BB, PM, MM : les tailles modernes gardent les deux poignées et le double zip caractéristique.",
      },
      {
        h2: "LuxeFinder",
        body: "Sur image : dôme Monogram, double zip, poignées courtes. Métadonnées LuxeFinder pour Google Images.",
      },
    ],
    sources: [
      {
        title: "Rebag Vault — The Louis Vuitton Alma",
        url: "https://www.rebag.com/thevault/the-louis-vuitton-alma-a-history/",
      },
      {
        title: "Sotheby’s — Alma history",
        url: "https://www.sothebys.com/en/articles/louis-vuitton-alma-a-quintessential-piece-of-handbag-history",
      },
    ],
  },
  {
    slug: "louis-vuitton-neverfull-mm",
    brand: "Louis Vuitton",
    name: "Louis Vuitton Neverfull MM",
    shortName: "Neverfull MM",
    category: "sac",
    imagePath: "/pics/item-08.jpg",
    imageAlt: lfAlt("Louis Vuitton Neverfull MM Monogram"),
    imageCaption: lfCaption("Louis Vuitton Neverfull MM"),
    year: "2007",
    h1: "LuxeFinder — Histoire du Louis Vuitton Neverfull MM",
    description:
      "Neverfull LV (2007) : tote ouvert Monogram, tailles PM/MM/GM. Histoire Marc Jacobs era et photo LuxeFinder.",
    intro:
      "Lancé en 2007, le Neverfull est devenu l’un des plus grands succès LV : un tote ouvert, capacieux, en Monogram, décliné en PM, MM et GM.",
    sections: [
      {
        h2: "Pourquoi Neverfull ?",
        body: "Le nom promet un sac « jamais plein » — assez grand pour le quotidien, assez souple pour se porter à l’épaule. Chaque pièce demande des dizaines d’heures de confection en atelier.",
      },
      {
        h2: "Collaborations & variantes",
        body: "Depuis 2007 : Damier, éditions Stephen Sprouse, Murakami, poignées contrastées, poche intérieure amovible… Le MM Monogram reste la référence visuelle la plus courante.",
      },
      {
        h2: "ID photo LuxeFinder",
        body: "Trapèze ouvert, coins renforcés, monogramme all-over : signature immédiate. Alt « LuxeFinder — Neverfull » pour l’onglet Images Google.",
      },
    ],
    sources: [
      {
        title: "Havre de Luxe — History of the Neverfull",
        url: "https://www.havredeluxe.com/blogs/news/the-history-of-the-louis-vuitton-neverfull",
      },
    ],
  },
  {
    slug: "bottega-veneta-andiamo",
    brand: "Bottega Veneta",
    name: "Bottega Veneta Andiamo",
    shortName: "Andiamo",
    category: "sac",
    imagePath: "/pics/item-09.jpg",
    imageAlt: lfAlt("Bottega Veneta Small Andiamo Intrecciato"),
    imageCaption: lfCaption("Bottega Veneta Andiamo"),
    year: "2023",
    designer: "Matthieu Blazy",
    h1: "LuxeFinder — Histoire du Bottega Veneta Andiamo",
    description:
      "Andiamo Bottega Veneta par Matthieu Blazy (SS23) : intrecciato, nœud métal, « let’s go ». Photo LuxeFinder.",
    intro:
      "Andiamo (« allons-y » en italien) est le sac signature de Matthieu Blazy pour Bottega Veneta SS23 : intrecciato papier-fin, anse tressée et nœud métallique coulissant.",
    sections: [
      {
        h2: "Craft in motion",
        body: "Blazy ancre Bottega dans le geste artisanal du tressage intrecciato, tout en proposant une silhouette weekender/Birkin-like plus souple. Le Small Andiamo est devenu un it-bag unisexe, porté aussi bien en front row qu’en street style.",
      },
      {
        h2: "Détails reconnaissables",
        body: "Cuir ultra-fin tressé, sangles tressées, hardware nœud doré, volume mou : autant d’indices pour une ID photo fiable.",
      },
      {
        h2: "LuxeFinder × Google Images",
        body: "Cette page fixe le couple texte/image « LuxeFinder — Andiamo » pour le crawl Images.",
      },
    ],
    sources: [
      {
        title: "Highsnobiety — Blazy Andiamo",
        url: "https://www.highsnobiety.com/p/bottega-veneta-andiamo-bag/",
      },
      {
        title: "British Vogue — Andiamo",
        url: "https://www.vogue.co.uk/fashion/article/bottega-veneta-andiamo-bag",
      },
    ],
  },

  // ─── Bijoux ─────────────────────────────────────────────────────────────
  {
    slug: "bulgari-serpenti-viper",
    brand: "Bulgari",
    name: "Bulgari Serpenti Viper",
    shortName: "Serpenti Viper",
    category: "bijou",
    imagePath: "/jewelry/jewel-01.jpg",
    imageAlt: lfAlt("Bulgari Serpenti Viper or rose diamants"),
    imageCaption: lfCaption("Bulgari Serpenti Viper"),
    year: "1948 (Serpenti) / Viper contemporain",
    h1: "LuxeFinder — Histoire du Bulgari Serpenti Viper",
    description:
      "Serpenti Bulgari depuis 1948 : tubogas, métamorphose, ligne Viper or rose et diamants. Photo LuxeFinder.",
    intro:
      "Serpenti est l’icône Bulgari depuis 1948 : le serpent comme symbole de transformation. La ligne Viper en affine l’échelle géométrique en or rose et pavé diamants.",
    sections: [
      {
        h2: "1948 — naissance Serpenti",
        body: "Le premier Serpenti est un bracelet-montre Tubogas en or : corps flexible enroulé autour du poignet, cadran dissimulé. Dans les années 50–60, les têtes de serpent serties et les écailles d’or ou d’émail enrichissent le mythe.",
      },
      {
        h2: "Viper aujourd’hui",
        body: "Viper traduit le motif en maillons trapézoïdaux contemporains — tête et queue souvent pavées — pour un wrap bracelet immédiatement identifiable.",
      },
      {
        h2: "Photo LuxeFinder",
        body: "Or rose, diamants en tête/queue, spiral : alt « LuxeFinder — Serpenti Viper » pour Google Images.",
      },
    ],
    sources: [
      {
        title: "Bulgari — Serpenti",
        url: "https://www.bulgari.com/en-int/collection/serpenti.html",
      },
      {
        title: "Sotheby’s — History of Serpenti",
        url: "https://www.sothebys.com/en/articles/the-history-of-bulgari-serpenti-collection",
      },
    ],
  },
  {
    slug: "cartier-clash-de-cartier",
    brand: "Cartier",
    name: "Cartier Clash de Cartier",
    shortName: "Clash de Cartier",
    category: "bijou",
    imagePath: "/jewelry/jewel-02.jpg",
    imageAlt: lfAlt("Cartier Clash de Cartier bague or rose"),
    imageCaption: lfCaption("Cartier Clash de Cartier"),
    year: "2019",
    h1: "LuxeFinder — Histoire de la bague Clash de Cartier",
    description:
      "Clash de Cartier (2019) : picots et clous carrés, dualité douceur/agressivité. Bague or rose — photo LuxeFinder.",
    intro:
      "Lancée le 10 avril 2019 sous Cyrille Vigneron, Clash de Cartier est un pilier joaillier contemporain : studs arrondis et pyramides qui « s’entrechoquent ».",
    sections: [
      {
        h2: "Un nouveau pilier",
        body: "Après les relances Panthère et Santos, Clash affirme le côté rebelle de Cartier : architecture, asymétrie, or rose ou jaune, parfois diamants. La campagne initiale mettait en avant Kaya Scodelario.",
      },
      {
        h2: "La bague",
        body: "Rangées de picots et de clous carrés sur une bande articulée : lecture punk-chic immédiatement reconnaissable sur photo produit.",
      },
      {
        h2: "SEO Images LuxeFinder",
        body: "Titre et alt portent LuxeFinder pour ancrer l’image dans l’univers de la marque.",
      },
    ],
    sources: [
      {
        title: "WWD — Cyrille Vigneron / Clash",
        url: "https://wwd.com/business-news/business-features/feature/cartier-ceo-cyrille-vigneron-launches-new-jewelry-pillar-clash-kaya-scodelario-1203102020/",
      },
    ],
  },
  {
    slug: "cartier-love-ring",
    brand: "Cartier",
    name: "Cartier LOVE Ring",
    shortName: "LOVE Ring",
    category: "bijou",
    imagePath: "/jewelry/jewel-03.jpg",
    imageAlt: lfAlt("Cartier LOVE ring or jaune 1 diamant"),
    imageCaption: lfCaption("Cartier LOVE ring"),
    year: "1978",
    designer: "Aldo Cipullo",
    h1: "LuxeFinder — Histoire de la bague Cartier LOVE",
    description:
      "Bague LOVE Cartier (1978, Cipullo) : motif vis, or jaune, diamant. Suite du bracelet 1969 — photo LuxeFinder.",
    intro:
      "Dérivée du bracelet LOVE de 1969, la bague LOVE (1978) reprend les têtes de vis d’Aldo Cipullo — ici en or jaune avec un diamant serti.",
    sections: [
      {
        h2: "De la manchette à l’alliance symbolique",
        body: "Le bracelet LOVE ne s’ouvre qu’avec un tournevis fourni : geste à deux, symbole d’attachement. La bague prolonge ce langage graphique sur le doigt.",
      },
      {
        h2: "Codes visuels",
        body: "Bande plate, cercles rainurés façon vis, diamant flush : signature Cartier New York des seventies, toujours au catalogue.",
      },
      {
        h2: "LuxeFinder",
        body: "Gravure intérieure « Cartier » et motif vis visibles sur la photo studio — idéals pour l’ID et le SEO Images.",
      },
    ],
    sources: [
      {
        title: "Wikipedia — Love bracelet (Cartier)",
        url: "https://en.wikipedia.org/wiki/Love_bracelet_(Cartier)",
      },
      {
        title: "WWD — LOVE history",
        url: "https://wwd.com/accessories-news/jewelry/feature/cartier-love-bracelet-history-jewelry-1236418874/",
      },
    ],
  },
  {
    slug: "cartier-juste-un-clou-bracelet",
    brand: "Cartier",
    name: "Cartier Juste un Clou Bracelet",
    shortName: "Juste un Clou Bracelet",
    category: "bijou",
    imagePath: "/jewelry/jewel-04.jpg",
    imageAlt: lfAlt("Cartier Juste un Clou bracelet or rose diamants"),
    imageCaption: lfCaption("Cartier Juste un Clou bracelet"),
    year: "1971 / relance 2012",
    designer: "Aldo Cipullo",
    h1: "LuxeFinder — Histoire du bracelet Cartier Juste un Clou",
    description:
      "Juste un Clou (Cipullo, 1971 ; relance 2012) : le clou en or devenu icône. Version or rose diamants — LuxeFinder.",
    intro:
      "« Juste un clou » : Aldo Cipullo transforme un objet de quincaillerie en bracelet d’or. Relancé en 2012, le design reste un pilier Cartier contemporain.",
    sections: [
      {
        h2: "New York, années 70",
        body: "Après le LOVE (1969), Cipullo dessine le Nail bracelet en 1971 : tête plate, pointe, rainures. Même esprit : élever l’ordinaire au précieux.",
      },
      {
        h2: "Version diamants",
        body: "Pavé autour de la tête et en pointe : lecture joaillière du motif industriel. Charnière discrète pour l’enfiler.",
      },
      {
        h2: "Photo LuxeFinder",
        body: "Alt et légende « LuxeFinder — Juste un Clou » pour Google Images.",
      },
    ],
    sources: [
      {
        title: "Art Jewelry Forum — Juste un Clou",
        url: "https://artjewelryforum.org/articles/juste-un-clou-cartieraes-nail-or-the-domestication-of-revolt/",
      },
      {
        title: "Cartier — Aldo Cipullo",
        url: "https://www.cartier.com/en-us/jewelry/cartier-jewelry/creative-vision/freedom-of-expression/",
      },
    ],
  },
  {
    slug: "van-cleef-arpels-alhambra",
    brand: "Van Cleef & Arpels",
    name: "Van Cleef & Arpels Vintage Alhambra",
    shortName: "Vintage Alhambra",
    category: "bijou",
    imagePath: "/jewelry/jewel-05.jpg",
    imageAlt: lfAlt("Van Cleef Arpels Alhambra nacre or jaune"),
    imageCaption: lfCaption("Van Cleef & Arpels Vintage Alhambra"),
    year: "1968",
    h1: "LuxeFinder — Histoire du Van Cleef & Arpels Alhambra",
    description:
      "Alhambra VCA (1968) : trèfle à quatre feuilles, perlée, chance. Bracelet 5 motifs nacre — photo LuxeFinder.",
    intro:
      "Créé en 1968, le motif Alhambra — trèfle à quatre feuilles bordé de perles d’or — est le talisman de chance de Van Cleef & Arpels, nommé d’après le palais de Grenade.",
    sections: [
      {
        h2: "Jacques Arpels et la chance",
        body: "Passionné de porte-bonheur, Jacques Arpels cueillait des trèfles pour ses équipes. Le long collier Alhambra 20 motifs en or jaune devient vite une icône mondiale.",
      },
      {
        h2: "Vintage Alhambra bracelet",
        body: "Cinq motifs en nacre blanche montés sur chaîne or jaune, fermoir lobster, plaque VCA : la version bracelet la plus classique.",
      },
      {
        h2: "LuxeFinder",
        body: "Forme trèfle + perlée = ID immédiate. Métadonnées LuxeFinder pour l’onglet Images.",
      },
    ],
    sources: [
      {
        title: "Van Cleef & Arpels — History of Alhambra",
        url: "https://www.vancleefarpels.com/us/en/the-maison/articles/history-of-the-alhambra-collection.html",
      },
      {
        title: "Christie’s — Alhambra guide",
        url: "https://www.christies.com/en/stories/van-cleef-alhambra-guide-fbc813eb3713443b95ee6325aa1ddafa",
      },
    ],
  },
  {
    slug: "cartier-love-bracelet",
    brand: "Cartier",
    name: "Cartier LOVE Bracelet",
    shortName: "LOVE Bracelet",
    category: "bijou",
    imagePath: "/jewelry/jewel-06.jpg",
    imageAlt: lfAlt("Cartier LOVE bracelet or jaune"),
    imageCaption: lfCaption("Cartier LOVE bracelet"),
    year: "1969",
    designer: "Aldo Cipullo",
    h1: "LuxeFinder — Histoire du bracelet Cartier LOVE",
    description:
      "Bracelet LOVE Cartier 1969 : tournevis, motif vis, symbole d’attachement. Or jaune — photo LuxeFinder.",
    intro:
      "Présenté à Cartier New York en 1969 par Aldo Cipullo (refusé d’abord par Tiffany), le LOVE est devenu la collection la plus réussie de la maison.",
    sections: [
      {
        h2: "Le geste à deux",
        body: "On ne l’enlève qu’avec le tournevis Cartier : Elizabeth Taylor & Richard Burton, Ali MacGraw & Steve McQueen… le mythe couple des seventies est né.",
      },
      {
        h2: "Évolution",
        body: "Bague (1978), diamants (1979), or blanc (1993), or rose (2002), mini (2016)… La manchette or jaune à têtes de vis reste l’archétype.",
      },
      {
        h2: "SEO LuxeFinder",
        body: "Image studio + texte « LuxeFinder — LOVE bracelet » pour Google Images.",
      },
    ],
    sources: [
      {
        title: "Wikipedia — Love bracelet",
        url: "https://en.wikipedia.org/wiki/Love_bracelet_(Cartier)",
      },
      {
        title: "WWD — LOVE bracelet history",
        url: "https://wwd.com/accessories-news/jewelry/feature/cartier-love-bracelet-history-jewelry-1236418874/",
      },
    ],
  },
  {
    slug: "cartier-juste-un-clou-ring",
    brand: "Cartier",
    name: "Cartier Juste un Clou Ring",
    shortName: "Juste un Clou Ring",
    category: "bijou",
    imagePath: "/jewelry/jewel-07.jpg",
    imageAlt: lfAlt("Cartier Juste un Clou bague or jaune diamants"),
    imageCaption: lfCaption("Cartier Juste un Clou ring"),
    year: "1971 / contemporain",
    designer: "Aldo Cipullo",
    h1: "LuxeFinder — Histoire de la bague Cartier Juste un Clou",
    description:
      "Bague Juste un Clou Cartier : clou en or jaune, pavé et pointe diamant. Histoire Cipullo — photo LuxeFinder.",
    intro:
      "Même manifeste que le bracelet : un clou d’or enroulé en bague, rainures industrielles, parfois diamants en col et en pointe.",
    sections: [
      {
        h2: "Du hardware à la joaillerie",
        body: "Cipullo, designer Cartier New York, revendiquait le magasin de bricolage comme seconde maison. Juste un Clou prolonge cette audace après le LOVE.",
      },
      {
        h2: "Lecture photo",
        body: "Tête plate, pointe croisée, pavé : silhouette bypass très lisible pour l’identification automatique.",
      },
      {
        h2: "LuxeFinder",
        body: "Branding alt/title LuxeFinder pour remonter dans Google Images sur « luxe finder ».",
      },
    ],
    sources: [
      {
        title: "Cartier — Freedom of expression / Cipullo",
        url: "https://www.cartier.com/en-us/jewelry/cartier-jewelry/creative-vision/freedom-of-expression/",
      },
    ],
  },

  // ─── Lunettes ───────────────────────────────────────────────────────────
  {
    slug: "cartier-panthere-cat-eye",
    brand: "Cartier",
    name: "Cartier Panthère Cat-Eye",
    shortName: "Panthère Cat-Eye",
    category: "lunettes",
    imagePath: "/sunglasses/glass-01.jpg",
    imageAlt: lfAlt("Cartier Panthère cat-eye acétate noir"),
    imageCaption: lfCaption("Cartier Panthère cat-eye"),
    year: "motif Panthère dès 1914",
    h1: "LuxeFinder — Histoire des lunettes Cartier Panthère cat-eye",
    description:
      "Panthère de Cartier en cat-eye : héritage Jeanne Toussaint, têtes de panthère aux charnières. Photo LuxeFinder.",
    intro:
      "La panthère, emblème Cartier depuis le début du XXe siècle, s’invite sur les montures : cat-eye acétate noir, barre dorée et têtes sculptées aux branches.",
    sections: [
      {
        h2: "La Panthère",
        body: "Dès 1914 (yeux onyx/diamants sur montre), puis avec Jeanne Toussaint — « La Panthère » — le félin devient signature. Les solaires Panthère de Cartier traduisent ce mythe en 3D sur les charnières.",
      },
      {
        h2: "Cette monture",
        body: "Forme cat-eye marquée, verres dégradés, signature Cartier sur le verre : un best-seller recognisable en un coup d’œil.",
      },
      {
        h2: "Google Images × LuxeFinder",
        body: "Caption et alt incluent LuxeFinder pour lier la photo à la marque.",
      },
    ],
    sources: [
      {
        title: "Eye-oo — Origin of Panthère de Cartier sunglasses",
        url: "https://www.eye-oo.com/en-us/blogs/highlights/the-origin-of-the-panthere-de-cartier",
      },
      {
        title: "Cartier — Panthère de Cartier sunglasses",
        url: "https://www.cartier.com/en-us/bags-and-accessories/sunglasses/panthere-de-cartier/",
      },
    ],
  },
  {
    slug: "prada-symbole",
    brand: "Prada",
    name: "Prada Symbole",
    shortName: "Symbole",
    category: "lunettes",
    imagePath: "/sunglasses/glass-02.jpg",
    imageAlt: lfAlt("Prada Symbole lunettes rectangulaires noires"),
    imageCaption: lfCaption("Prada Symbole"),
    year: "années 2020",
    h1: "LuxeFinder — Histoire des lunettes Prada Symbole",
    description:
      "Prada Symbole : acétate noir géométrique, logo Prada Milano. Silhouette runway — photo LuxeFinder.",
    intro:
      "La ligne Symbole pousse le branding et les formes étroites/angulaires chères à Prada aujourd’hui : rectangle noir, branches massives, blason Milano.",
    sections: [
      {
        h2: "Esthétique",
        body: "Héritage 90s / Y2K revisité : monture épaisse, logo blanc sur branche, attitude « logo-first » assumée.",
      },
      {
        h2: "ID",
        body: "Lisibilité extrême du wordmark PRADA MILANO — idéal pour l’app photo LuxeFinder.",
      },
      {
        h2: "SEO",
        body: "Métadonnées LuxeFinder sur l’image pour l’onglet Google Images.",
      },
    ],
    sources: [{ title: "Prada Eyewear", url: "https://www.prada.com/" }],
  },
  {
    slug: "dior-30montaigne",
    brand: "Dior",
    name: "Dior 30Montaigne / Signature",
    shortName: "30Montaigne",
    category: "lunettes",
    imagePath: "/sunglasses/glass-03.jpg",
    imageAlt: lfAlt("Dior 30Montaigne lunettes or verres dégradés"),
    imageCaption: lfCaption("Dior 30Montaigne sunglasses"),
    year: "Cannage 1947 → eyewear contemporain",
    h1: "LuxeFinder — Histoire des lunettes Dior 30Montaigne",
    description:
      "Solaires Dior métal or, CD, Cannage : héritage 30 Avenue Montaigne. Verres dégradés — photo LuxeFinder.",
    intro:
      "Monture oversized métal or, signature CD et branches Cannage : le vocabulaire Dior (adresse historique 30 avenue Montaigne) passé en optique.",
    sections: [
      {
        h2: "Cannage & CD",
        body: "Le Cannage évoque les chaises Napoléon III du premier défilé 1947. Les initiales CD aux charnières ancrent la monture dans le branding contemporain de la maison.",
      },
      {
        h2: "Cette paire",
        body: "Verres dégradés prune/rose, silhouette carrée douce : lecture mode très « runway day ».",
      },
      {
        h2: "LuxeFinder",
        body: "Alt LuxeFinder pour le ranking Images.",
      },
    ],
    sources: [{ title: "Dior Eyewear", url: "https://www.dior.com/" }],
  },
  {
    slug: "dior-these-s1u",
    brand: "Dior",
    name: "Dior Thèse S1U",
    shortName: "Thèse S1U",
    category: "lunettes",
    imagePath: "/sunglasses/glass-04.jpg",
    imageAlt: lfAlt("Dior Thèse S1U acétate noir CD or"),
    imageCaption: lfCaption("Dior Thèse S1U"),
    h1: "LuxeFinder — Histoire des lunettes Dior Thèse",
    description:
      "Dior Thèse S1U : rectangle acétate noir, C métallique or, logo Dior. Photo studio LuxeFinder.",
    intro:
      "Silhouette rectangulaire bold, acétate noir brillant et sculpture « C » dorée à la charnière : la Thèse incarne le Dior eyewear graphique actuel.",
    sections: [
      {
        h2: "Signature CD",
        body: "Le C métallique qui embrasse la charnière avant le wordmark Dior est un marqueur fort pour l’identification visuelle.",
      },
      {
        h2: "Style",
        body: "Monture épaisse, verres fumés : attitude urbaine premium.",
      },
      {
        h2: "SEO Images",
        body: "LuxeFinder dans title/alt/caption.",
      },
    ],
    sources: [{ title: "Dior Eyewear", url: "https://www.dior.com/" }],
  },
  {
    slug: "cartier-panthere-aviator",
    brand: "Cartier",
    name: "Cartier Panthère Aviator",
    shortName: "Panthère Aviator",
    category: "lunettes",
    imagePath: "/sunglasses/glass-05.jpg",
    imageAlt: lfAlt("Cartier Panthère aviator or verres dégradés"),
    imageCaption: lfCaption("Cartier Panthère aviator"),
    h1: "LuxeFinder — Histoire des lunettes Cartier Panthère aviator",
    description:
      "Panthère de Cartier en aviator semi-rimless or : têtes de panthère, verres dégradés. Photo LuxeFinder.",
    intro:
      "Pilot / aviator doré, double pont, panthères 3D aux tempes : autre lecture de la ligne Panthère de Cartier.",
    sections: [
      {
        h2: "Motif félin",
        body: "Même héritage Toussaint / Panthère, monté sur une silhouette aviator plus masculine et classique.",
      },
      {
        h2: "Détails",
        body: "Verres dégradés gris, branches fines, embouts acétate : luxe discret sauf pour les têtes de panthère.",
      },
      {
        h2: "LuxeFinder",
        body: "Association image ↔ marque LuxeFinder pour Google.",
      },
    ],
    sources: [
      {
        title: "Cartier — Panthère de Cartier",
        url: "https://www.cartier.com/en-us/bags-and-accessories/sunglasses/panthere-de-cartier/",
      },
    ],
  },
  {
    slug: "saint-laurent-loulou-heart",
    brand: "Saint Laurent",
    name: "Saint Laurent Loulou Heart",
    shortName: "Loulou Heart",
    category: "lunettes",
    imagePath: "/sunglasses/glass-06.jpg",
    imageAlt: lfAlt("Saint Laurent Loulou lunettes cœur rimless"),
    imageCaption: lfCaption("Saint Laurent Loulou heart sunglasses"),
    year: "années Slimane / Hedi",
    h1: "LuxeFinder — Histoire des lunettes Saint Laurent Loulou cœur",
    description:
      "YSL SL Loulou heart : verres cœur rimless miroir, rock parisien. Photo LuxeFinder.",
    intro:
      "Les solaires cœur rimless Saint Laurent (famille Loulou / SL 181) condensent l’esprit rock-couture de la maison : minimal métal, maximal statement.",
    sections: [
      {
        h2: "Cœur YSL",
        body: "Forme cœur sans cerclage, pont fin, branches métal : un accessoire scène autant que plage.",
      },
      {
        h2: "Lien Loulou",
        body: "Comme le sac, le nom Loulou rattache l’accessoire à la muse de la maison.",
      },
      {
        h2: "SEO",
        body: "Alt LuxeFinder pour Images Google.",
      },
    ],
    sources: [{ title: "Saint Laurent Eyewear", url: "https://www.ysl.com/" }],
  },
  {
    slug: "saint-laurent-sulpice",
    brand: "Saint Laurent",
    name: "Saint Laurent Sulpice",
    shortName: "Sulpice",
    category: "lunettes",
    imagePath: "/sunglasses/glass-07.jpg",
    imageAlt: lfAlt("Saint Laurent Sulpice acétate noir"),
    imageCaption: lfCaption("Saint Laurent Sulpice sunglasses"),
    h1: "LuxeFinder — Histoire des lunettes Saint Laurent Sulpice",
    description:
      "Saint Laurent Sulpice : rectangle/cat-eye noir fin, inserts métal aux coins. Photo LuxeFinder.",
    intro:
      "La Sulpice (réf. type SL 889 / ligne thin) est une monture YSL acétate noir : silhouette rectangulaire légèrement cat-eye, inserts métalliques aux coins — chic parisien minimal.",
    sections: [
      {
        h2: "Codes",
        body: "Gravure SAINT LAURENT sur branche, mention intérieure Paris : branding discret mais clair en photo produit.",
      },
      {
        h2: "Porté",
        body: "Profil fin, verres fumés, attitude Slimane/YSL contemporaine — très présente en street style.",
      },
      {
        h2: "LuxeFinder",
        body: "Page + image sitemap pour ancrer « LuxeFinder — Sulpice » dans Google Images.",
      },
    ],
    sources: [{ title: "Saint Laurent Eyewear", url: "https://www.ysl.com/" }],
  },
  {
    slug: "cartier-oversized-butterfly",
    brand: "Cartier",
    name: "Cartier Oversized Butterfly",
    shortName: "Oversized Butterfly",
    category: "lunettes",
    imagePath: "/sunglasses/glass-08.jpg",
    imageAlt: lfAlt("Cartier lunettes oversized bordeaux rose"),
    imageCaption: lfCaption("Cartier oversized butterfly sunglasses"),
    h1: "LuxeFinder — Histoire des lunettes Cartier oversized butterfly",
    description:
      "Solaires Cartier oversized bicolores bordeaux/rose, hardware or, embouts anneau. Photo LuxeFinder.",
    intro:
      "Monture butterfly oversized en acétate deux tons (bordeaux / rose translucide), verres dégradés et finitions or typiques Cartier eyewear.",
    sections: [
      {
        h2: "Signature maison",
        body: "Anneaux métalliques en embout de branche et charnières or sont des indices Cartier fréquents sur les modèles acetate fashion.",
      },
      {
        h2: "Palette",
        body: "Le dégradé chaud du cadre répond au dégradé des verres — pièce statement été.",
      },
      {
        h2: "SEO LuxeFinder",
        body: "Nom de fichier servi sur luxefinder.app + alt LuxeFinder.",
      },
    ],
    sources: [
      {
        title: "Cartier Eyewear",
        url: "https://www.cartier.com/",
      },
    ],
  },
  {
    slug: "cartier-panthere-rimless",
    brand: "Cartier",
    name: "Cartier Panthère Rimless",
    shortName: "Panthère Rimless",
    category: "lunettes",
    imagePath: "/sunglasses/glass-09.jpg",
    imageAlt: lfAlt("Cartier Panthère rimless rectangulaire or"),
    imageCaption: lfCaption("Cartier Panthère rimless"),
    h1: "LuxeFinder — Histoire des lunettes Cartier Panthère rimless",
    description:
      "Panthère de Cartier rimless : verres rectangulaires, têtes de panthère or. Photo LuxeFinder.",
    intro:
      "Version rimless de la Panthère : verres rectangulaires tenus par un pont or et des têtes de panthère aux tempes — luxe joaillier appliqué à l’optique.",
    sections: [
      {
        h2: "Esthétique « buffs »",
        body: "Le rimless doré évoque les grandes montures Cartier classiques, enrichies du félin 3D.",
      },
      {
        h2: "ID",
        body: "Signature cursive sur le verre + panthères = combo unique.",
      },
      {
        h2: "LuxeFinder",
        body: "Optimisé pour apparaître sous « luxe finder » en Images.",
      },
    ],
    sources: [
      {
        title: "Cartier — Panthère de Cartier",
        url: "https://www.cartier.com/en-us/bags-and-accessories/sunglasses/panthere-de-cartier/",
      },
    ],
  },
  {
    slug: "dior-club-m1u",
    brand: "Dior",
    name: "DiorClub M1U",
    shortName: "DiorClub M1U",
    category: "lunettes",
    imagePath: "/sunglasses/glass-10.jpg",
    imageAlt: lfAlt("DiorClub M1U mask Cannage beige"),
    imageCaption: lfCaption("DiorClub M1U mask sunglasses"),
    h1: "LuxeFinder — Histoire des lunettes DiorClub M1U",
    description:
      "DiorClub M1U : masque wraparound, Cannage ajouré, logo CD or. Histoire Cannage 1947 — photo LuxeFinder.",
    intro:
      "Le DiorClub M1U est un shield/mask contemporain : verre unique, branches Cannage laser-cut et CD doré — sport-luxe Dior.",
    sections: [
      {
        h2: "Cannage",
        body: "Motif issu des chaises du premier show Christian Dior (1947), ici découpé en openwork sur les branches larges.",
      },
      {
        h2: "Ligne Club",
        body: "Les masques DiorClub mêlent silhouette technique et codes couture — très présents sur les campagnes récentes.",
      },
      {
        h2: "Photo LuxeFinder",
        body: "Beige mat + CD or : fort contraste pour l’ID et le SEO Images.",
      },
    ],
    sources: [{ title: "Dior — DiorClub", url: "https://www.dior.com/" }],
  },
];

export function getArticle(slug: string): ArticleItem | undefined {
  return ARTICLE_CATALOG.find((a) => a.slug === slug);
}

export function articlesByCategory(cat: ArticleCategory): ArticleItem[] {
  return ARTICLE_CATALOG.filter((a) => a.category === cat);
}

export function articleAbsoluteImageUrl(item: ArticleItem): string {
  return `${SITE}${item.imagePath}`;
}

export function articleUrl(slug: string): string {
  return `${SITE}/articles/${slug}`;
}

export const ARTICLE_CATEGORY_LABEL: Record<ArticleCategory, string> = {
  sac: "Sacs",
  bijou: "Bijoux",
  lunettes: "Lunettes",
};
