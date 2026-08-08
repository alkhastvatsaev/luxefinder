/**
 * Luxury model knowledge base — aliases for fuzzy title matching.
 */

export type LuxuryModel = {
  brand: string;
  model: string;
  aliases: string[];
  category?: string;
};

export const LUXURY_MODELS: LuxuryModel[] = [
  // Louis Vuitton
  { brand: "Louis Vuitton", model: "Lockme", aliases: ["lockme", "lock me", "lockme ever", "lockme tote", "lockme shopper"], category: "sac" },
  { brand: "Louis Vuitton", model: "Lock Go PM", aliases: ["lock go", "lockgo", "lock go pm", "lock go bb", "sac lock go"], category: "sac" },
  { brand: "Louis Vuitton", model: "Speedy", aliases: ["speedy", "speedy 25", "speedy 30", "speedy 35", "speedy bandouliere"], category: "sac" },
  { brand: "Louis Vuitton", model: "Neverfull", aliases: ["neverfull", "neverfull mm", "neverfull gm", "neverfull pm"], category: "sac" },
  { brand: "Louis Vuitton", model: "Alma", aliases: ["alma", "alma bb", "alma pm"], category: "sac" },
  { brand: "Louis Vuitton", model: "Capucines", aliases: ["capucines", "capucines bb", "capucines mm"], category: "sac" },
  { brand: "Louis Vuitton", model: "Petite Malle", aliases: ["petite malle"], category: "sac" },
  { brand: "Louis Vuitton", model: "Pochette Métis", aliases: ["pochette metis", "métis", "metis"], category: "sac" },
  { brand: "Louis Vuitton", model: "Onthego", aliases: ["onthego", "on the go", "onthego mm", "onthego gm"], category: "sac" },
  { brand: "Louis Vuitton", model: "Keepall", aliases: ["keepall", "keepall 45", "keepall 50", "keepall 55"], category: "sac" },
  { brand: "Louis Vuitton", model: "Twist", aliases: ["twist", "twist mm", "twist pm"], category: "sac" },
  { brand: "Louis Vuitton", model: "Dauphine", aliases: ["dauphine", "dauphine mm", "dauphine soft"], category: "sac" },
  { brand: "Louis Vuitton", model: "Multi Pochette", aliases: ["multi pochette", "multipochette"], category: "sac" },
  // Hermès
  { brand: "Hermès", model: "Birkin", aliases: ["birkin", "birkin 25", "birkin 30", "birkin 35", "birkin 40"], category: "sac" },
  { brand: "Hermès", model: "Kelly", aliases: ["kelly", "kelly 25", "kelly 28", "kelly 32", "kelly sellier"], category: "sac" },
  { brand: "Hermès", model: "Constance", aliases: ["constance", "constance 18", "constance 24"], category: "sac" },
  { brand: "Hermès", model: "Evelyne", aliases: ["evelyne", "evelyn", "evelyne tpm", "evelyne pm"], category: "sac" },
  { brand: "Hermès", model: "Picotin", aliases: ["picotin", "picotin lock"], category: "sac" },
  // Chanel
  { brand: "Chanel", model: "Classic Flap", aliases: ["classic flap", "timeless", "double flap", "cf"], category: "sac" },
  { brand: "Chanel", model: "Boy", aliases: ["boy bag", "boy chanel", "boy"], category: "sac" },
  { brand: "Chanel", model: "2.55", aliases: ["2.55", "255"], category: "sac" },
  { brand: "Chanel", model: "Gabrielle", aliases: ["gabrielle"], category: "sac" },
  { brand: "Chanel", model: "19", aliases: ["chanel 19", "19 bag"], category: "sac" },
  // Dior
  { brand: "Dior", model: "Lady Dior", aliases: ["lady dior", "lady"], category: "sac" },
  { brand: "Dior", model: "Book Tote", aliases: ["book tote", "booktote"], category: "sac" },
  { brand: "Dior", model: "Saddle", aliases: ["saddle bag", "saddle"], category: "sac" },
  { brand: "Dior", model: "Bobby", aliases: ["bobby"], category: "sac" },
  // Gucci
  { brand: "Gucci", model: "Dionysus", aliases: ["dionysus"], category: "sac" },
  { brand: "Gucci", model: "Jackie", aliases: ["jackie", "jackie 1961"], category: "sac" },
  { brand: "Gucci", model: "Marmont", aliases: ["marmont", "gg marmont"], category: "sac" },
  { brand: "Gucci", model: "Horsebit", aliases: ["horsebit", "1955 horsebit"], category: "sac" },
  {
    brand: "Gucci",
    model: "Ophidia",
    aliases: [
      "ophidia",
      "ophidia gg",
      "ophidia supreme",
      "ophidia shoulder",
      "ophidia small",
      "ophidia mini",
      "sac ophidia",
      "sac a epaule ophidia",
      "ophidia gg supreme",
    ],
    category: "sac",
  },
  // Saint Laurent
  { brand: "Saint Laurent", model: "Loulou", aliases: ["loulou", "lou lou"], category: "sac" },
  { brand: "Saint Laurent", model: "Sunset", aliases: ["sunset"], category: "sac" },
  { brand: "Saint Laurent", model: "Cassandre", aliases: ["cassandre", "kate"], category: "sac" },
  // Bottega
  { brand: "Bottega Veneta", model: "Jodie", aliases: ["jodie", "mini jodie"], category: "sac" },
  { brand: "Bottega Veneta", model: "Cassette", aliases: ["cassette"], category: "sac" },
  { brand: "Bottega Veneta", model: "Pouch", aliases: ["the pouch", "pouch"], category: "sac" },
  // Others
  { brand: "Fendi", model: "Baguette", aliases: ["baguette", "fendi baguette"], category: "sac" },
  { brand: "Fendi", model: "Peekaboo", aliases: ["peekaboo"], category: "sac" },
  { brand: "Celine", model: "Luggage", aliases: ["luggage", "luggage nano", "luggage micro"], category: "sac" },
  { brand: "Celine", model: "Triomphe", aliases: ["triomphe", "classic triomphe"], category: "sac" },
  { brand: "Prada", model: "Re-Edition", aliases: ["re-edition", "re edition", "2000", "2005"], category: "sac" },
  { brand: "Prada", model: "Galleria", aliases: ["galleria"], category: "sac" },
  { brand: "Loewe", model: "Puzzle", aliases: ["puzzle", "puzzle bag"], category: "sac" },
  { brand: "Loewe", model: "Flamenco", aliases: ["flamenco"], category: "sac" },
  { brand: "Balenciaga", model: "Hourglass", aliases: ["hourglass"], category: "sac" },
  { brand: "Balenciaga", model: "City", aliases: ["city bag", "motorcycle"], category: "sac" },
];

export const TRUSTED_DOMAINS = [
  "louisvuitton.com",
  "hermes.com",
  "chanel.com",
  "dior.com",
  "gucci.com",
  "ysl.com",
  "saintlaurent.com",
  "bottegaveneta.com",
  "fendi.com",
  "celine.com",
  "prada.com",
  "loewe.com",
  "balenciaga.com",
  "farfetch.com",
  "ssense.com",
  "matchesfashion.com",
  "net-a-porter.com",
  "mytheresa.com",
  "vestiairecollective.com",
  "therealreal.com",
  "fashionphile.com",
  "rebag.com",
  "saksfifthavenue.com",
  "neimanmarcus.com",
];

export const REPLICA_PATTERNS =
  /\b(replica|réplique|replika|fake|1:1|1\/1|miroir|mirror|super\s*fake|aaa\+|wholesale|usine|factory\s*direct)\b|高仿|精仿|复刻|一比一/i;

export function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Generic shopping words that must not drive model matching alone. */
const QUERY_STOPWORDS = new Set([
  "sac",
  "bag",
  "bags",
  "tote",
  "handbag",
  "handbags",
  "shoulder",
  "crossbody",
  "bandeuliere",
  "bandouliere",
  "epaule",
  "mini",
  "small",
  "large",
  "petit",
  "petite",
  "grand",
  "grande",
  "format",
  "femme",
  "femmes",
  "homme",
  "hommes",
  "woman",
  "women",
  "man",
  "men",
  "the",
  "and",
  "for",
  "with",
  "de",
  "du",
  "des",
  "la",
  "le",
  "les",
  "un",
  "une",
  "et",
  "en",
  "au",
  "aux",
  "sur",
  "pour",
  "avec",
  "dans",
  "que",
  "vous",
  "cherchez",
  "voulez",
]);

/** Meaningful query tokens for KB + offer matching. */
export function significantQueryTokens(query: string): string[] {
  return normalizeText(query)
    .split(" ")
    .filter((t) => t.length >= 3 && !QUERY_STOPWORDS.has(t));
}

export type LuxurySuggestion = {
  brand: string;
  model: string;
  label: string;
  category?: string;
  score: number;
};

/** Fuzzy typeahead over the luxury KB (safe for client + server). */
export function suggestLuxuryModels(query: string, limit = 8): LuxurySuggestion[] {
  const q = normalizeText(query);
  if (q.length < 2) return [];

  const tokens = significantQueryTokens(query);
  if (!tokens.length && q.length < 3) return [];
  const scored: LuxurySuggestion[] = [];

  for (const item of LUXURY_MODELS) {
    const brandN = normalizeText(item.brand);
    const modelN = normalizeText(item.model);
    const aliasesN = item.aliases.map(normalizeText);
    const haystack = [brandN, modelN, ...aliasesN].join(" ");
    const label = `${item.brand} ${item.model}`;

    let score = 0;
    let modelHit = false;
    let brandHit = false;

    if (haystack.startsWith(q) || brandN.startsWith(q) || modelN.startsWith(q)) score += 120;
    if (modelN === q || aliasesN.includes(q)) {
      score += 200;
      modelHit = true;
    } else if (haystack.includes(q) && q.length >= 4) {
      score += 80;
      if (modelN.includes(q) || aliasesN.some((a) => a.includes(q))) modelHit = true;
      if (brandN.includes(q)) brandHit = true;
    }

    for (const t of tokens) {
      if (brandN.includes(t) || brandN.split(" ").includes(t)) {
        score += 45;
        brandHit = true;
      }
      if (modelN === t || modelN.includes(t)) {
        score += 90;
        modelHit = true;
      }
      if (aliasesN.some((a) => a === t || a.includes(t) || t.includes(modelN))) {
        score += 70;
        modelHit = true;
      }
    }

    for (const a of aliasesN) {
      if (a.startsWith(q) && q.length >= 3) {
        score += 100;
        modelHit = true;
      } else if (q.length >= 4 && a.includes(q)) {
        score += 40;
        modelHit = true;
      }
    }

    // Never suggest from stopwords / single letters alone — need a model (or strong brand+model) hit
    if (!modelHit && !(brandHit && tokens.some((t) => modelN.includes(t)))) continue;
    if (score < 40) continue;

    scored.push({
      brand: item.brand,
      model: item.model,
      label,
      category: item.category,
      score,
    });
  }

  scored.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
  const seen = new Set<string>();
  const out: LuxurySuggestion[] = [];
  for (const s of scored) {
    const key = s.label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
    if (out.length >= limit) break;
  }
  return out;
}

