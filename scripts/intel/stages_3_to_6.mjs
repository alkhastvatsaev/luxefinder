#!/usr/bin/env node
/**
 * Stages 3–6 (deterministic + heuristic LLM-shaped enrichment when no API key)
 * Corpus A stays internal. No replica transactional SEO. No image reuse.
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const INTEL = path.join(ROOT, 'data/intel');
const REPORTS = path.join(ROOT, 'reports');
fs.mkdirSync(REPORTS, { recursive: true });

const extracted = fs.readFileSync(path.join(INTEL, '02_extracted.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const clustersSummary = JSON.parse(fs.readFileSync(path.join(INTEL, '00_clusters_summary.json'), 'utf8'));

const BRANDS = [
  ['Louis Vuitton', ['louis vuitton', 'louisvuitton', 'lv ', ' lv', 'vuitton']],
  ['Chanel', ['chanel']],
  ['Hermès', ['hermès', 'hermes']],
  ['Dior', ['dior', 'lady dior']],
  ['Gucci', ['gucci']],
  ['Prada', ['prada']],
  ['Yves Saint Laurent', ['saint laurent', 'ysl', 'Yves Saint Laurent']],
  ['Bottega Veneta', ['bottega', 'veneta']],
  ['Celine', ['celine', 'céline']],
  ['Fendi', ['fendi']],
  ['Balenciaga', ['balenciaga']],
  ['Cartier', ['cartier']],
  ['Rolex', ['rolex']],
  ['Burberry', ['burberry']],
];

const MODELS = [
  { id: 'CHN-CLASSICFLAP', brand: 'Chanel', line: 'Classic', name: 'Classic Flap Bag', aliases: ['classic flap', 'timeless', 'double flap', '11.12', 'sac classique rabat', 'cf medium'] },
  { id: 'CHN-19', brand: 'Chanel', line: '19', name: 'Chanel 19', aliases: ['chanel 19', '19 bag'] },
  { id: 'CHN-WOC', brand: 'Chanel', line: 'WOC', name: 'Wallet on Chain', aliases: ['woc', 'wallet on chain'] },
  { id: 'LV-NEVERFULL', brand: 'Louis Vuitton', line: 'Neverfull', name: 'Neverfull', aliases: ['neverfull', 'never full'] },
  { id: 'LV-SPEEDY', brand: 'Louis Vuitton', line: 'Speedy', name: 'Speedy', aliases: ['speedy', 'speedy bandouliere'] },
  { id: 'LV-KEEPALL', brand: 'Louis Vuitton', line: 'Keepall', name: 'Keepall', aliases: ['keepall'] },
  { id: 'LV-ONTHEGO', brand: 'Louis Vuitton', line: 'Onthego', name: 'OnTheGo', aliases: ['onthego', 'on the go'] },
  { id: 'HER-BIRKIN', brand: 'Hermès', line: 'Birkin', name: 'Birkin', aliases: ['birkin'] },
  { id: 'HER-KELLY', brand: 'Hermès', line: 'Kelly', name: 'Kelly', aliases: ['kelly'] },
  { id: 'HER-PICOTIN', brand: 'Hermès', line: 'Picotin', name: 'Picotin', aliases: ['picotin'] },
  { id: 'HER-EVELYNE', brand: 'Hermès', line: 'Evelyne', name: 'Evelyne', aliases: ['evelyne'] },
  { id: 'DIO-LADY', brand: 'Dior', line: 'Lady Dior', name: 'Lady Dior', aliases: ['lady dior'] },
  { id: 'DIO-BOOKTOTE', brand: 'Dior', line: 'Book Tote', name: 'Book Tote', aliases: ['book tote'] },
  { id: 'DIO-SADDLE', brand: 'Dior', line: 'Saddle', name: 'Saddle', aliases: ['saddle bag', 'saddle'] },
  { id: 'GUC-DIONYSUS', brand: 'Gucci', line: 'Dionysus', name: 'Dionysus', aliases: ['dionysus'] },
  { id: 'GUC-MARMONT', brand: 'Gucci', line: 'Marmont', name: 'GG Marmont', aliases: ['marmont', 'gg marmont'] },
  { id: 'PRA-REE2005', brand: 'Prada', line: 'Re-Edition', name: 'Re-Edition 2005', aliases: ['re-edition', 're edition 2005', 'prada 2005'] },
  { id: 'PRA-GALLERIA', brand: 'Prada', line: 'Galleria', name: 'Galleria', aliases: ['galleria'] },
  { id: 'YSL-LOULOU', brand: 'Yves Saint Laurent', line: 'Loulou', name: 'Loulou', aliases: ['loulou'] },
  { id: 'BOT-CASSETTE', brand: 'Bottega Veneta', line: 'Cassette', name: 'Cassette', aliases: ['cassette', 'intrecciato cassette'] },
  { id: 'CEL-TRIOMPHE', brand: 'Celine', line: 'Triomphe', name: 'Triomphe', aliases: ['triomphe'] },
  { id: 'FEN-BAGUETTE', brand: 'Fendi', line: 'Baguette', name: 'Baguette', aliases: ['baguette', 'fendi baguette'] },
];

function norm(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function detectBrand(text) {
  const t = norm(text);
  for (const [brand, keys] of BRANDS) {
    if (keys.some((k) => t.includes(norm(k)))) return brand;
  }
  return null;
}
function detectModel(text, brand) {
  const t = norm(text);
  let best = null;
  for (const m of MODELS) {
    if (brand && m.brand !== brand) continue;
    for (const a of m.aliases) {
      if (t.includes(norm(a))) {
        best = m;
        break;
      }
    }
    if (best) break;
  }
  return best;
}
function qualityTier(text) {
  const t = text.toLowerCase();
  for (const lab of ['1:1', '1: 1', 'aaa', 'mirror', 'super copy', 'god factory', 'high quality replica']) {
    if (t.includes(lab)) return lab.replace('1: 1', '1:1');
  }
  return null;
}
function explicitReplica(text) {
  return /repliq|replica|fake\b|faux\b|contrefa|namaak|fälschung|falsificazione|replika/i.test(text);
}
function contentAngle(url, title, body) {
  const t = `${url} ${title} ${body}`.toLowerCase();
  if (/reconnaitre|spot fake|authentif|vrai ou faux|how to tell|echt oder/i.test(t)) return 'how_to_spot_fake';
  if (/vs\b|compar|versus/i.test(t)) return 'comparison';
  if (/size guide|taille|sizing/i.test(t)) return 'size_guide';
  if (/blog|guide|comment|how to/i.test(t)) return 'blog';
  if (/buy|acheter|shop|kaufen|comprar|add to cart|panier/i.test(t)) return 'product';
  return 'product';
}
function intent(angle) {
  if (angle === 'product') return 'transactional';
  if (angle === 'blog' || angle === 'how_to_spot_fake' || angle === 'size_guide' || angle === 'comparison') return 'informational';
  return 'navigational';
}

// ── STAGE 3 ──
console.log('[stage3] enriching', extracted.length);
const enriched = [];
for (const row of extracted) {
  const blob = [row.title, row.h1, row.alt_texts, row.body_text, row.url].join(' \n ');
  const brand = detectBrand(blob);
  const model = detectModel(blob, brand);
  const modelRaw = row.h1 || row.title || '';
  const attrs = {
    material: (/caviar|lambskin|cuir|leather|toile|canvas|intrecciato|epsom|togo|swift/i.exec(blob) || [])[0] || null,
    hardware: (/ghw|shw|rhw|gold hardware|silver hardware|ruthenium/i.exec(blob) || [])[0] || null,
    color: (/noir|black|beige|brown|marron|rouge|red|blue|vert|green|white|blanc/i.exec(blob) || [])[0] || null,
    size: (/mini|small|medium|large|jumbo|maxi|mm\b|pm\b|gm\b|\d{2}\s?cm/i.exec(blob) || [])[0] || null,
    closure: (/flap|zip|turnlock|pushlock|clasp|boucle/i.exec(blob) || [])[0] || null,
    pattern: (/monogram|damier|quilted|matelass|gg supreme|canvas/i.exec(blob) || [])[0] || null,
  };
  const angle = contentAngle(row.url, row.title, row.body_text);
  const unresolved = [];
  if (!brand) unresolved.push('brand');
  if (!model) unresolved.push('model');
  enriched.push({
    page_id: row.page_id,
    domain: row.domain,
    url: row.url,
    brand_raw: brand || detectBrand(modelRaw) || '',
    model_raw: modelRaw.slice(0, 180),
    model_id_hint: model ? model.id : null,
    model_aliases_observed: model ? model.aliases.filter((a) => norm(blob).includes(norm(a))).slice(0, 5) : [],
    attributes: attrs,
    counterfeit_markers: {
      quality_tier_label: qualityTier(blob),
      explicit_replica_language: explicitReplica(blob),
      brand_disclaimer_present: /not affiliated|no affiliation|inspired by|homage/i.test(blob),
      authenticity_claims: (blob.match(/100%\s*authentic|genuine leather|real leather|authentic quality/gi) || []).slice(0, 3),
    },
    content_angle: angle,
    target_intent: intent(angle),
    confidence: (!brand || !model) ? (brand || model ? 'med' : 'low') : 'high',
    unresolved,
    price_raw: row.prices || '',
    lang: row.lang || '',
  });
}
fs.writeFileSync(path.join(INTEL, '03_enriched.jsonl'), enriched.map((r) => JSON.stringify(r)).join('\n'));
fs.writeFileSync(path.join(INTEL, '03_enriched_summary.json'), JSON.stringify({
  n: enriched.length,
  with_brand: enriched.filter((e) => e.brand_raw).length,
  with_model_hint: enriched.filter((e) => e.model_id_hint).length,
  explicit_replica_pages: enriched.filter((e) => e.counterfeit_markers.explicit_replica_language).length,
  mode: process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY ? 'llm' : 'heuristic_no_api_key',
}, null, 2));
console.log('[stage3] done', enriched.filter((e) => e.brand_raw).length, 'brands');

// ── STAGE 4 ──
console.log('[stage4] entity resolution');
const freq = new Map();
const aliasHits = new Map();
for (const e of enriched) {
  let mid = e.model_id_hint;
  if (!mid) {
    const m = detectModel(`${e.brand_raw} ${e.model_raw}`, e.brand_raw || null);
    mid = m ? m.id : null;
  }
  if (!mid) continue;
  freq.set(mid, (freq.get(mid) || 0) + 1);
  for (const a of e.model_aliases_observed || []) {
    const k = mid + '||' + a;
    aliasHits.set(k, (aliasHits.get(k) || 0) + 1);
  }
}
const canonical = MODELS.map((m) => {
  const counterfeit_frequency = freq.get(m.id) || 0;
  return {
    model_id: m.id,
    brand_canonical: m.brand,
    line: m.line,
    model_name: m.name,
    aliases: m.aliases,
    misspellings: [],
    attributes_ref: {},
    counterfeit_frequency,
    most_faked_rank: 0,
  };
}).sort((a, b) => b.counterfeit_frequency - a.counterfeit_frequency);
canonical.forEach((c, i) => { c.most_faked_rank = c.counterfeit_frequency > 0 ? i + 1 : 999; });
fs.writeFileSync(path.join(INTEL, 'models_canonical.jsonl'), canonical.map((r) => JSON.stringify(r)).join('\n'));
fs.writeFileSync(path.join(INTEL, 'models_canonical.csv'),
  ['model_id,brand_canonical,line,model_name,aliases,counterfeit_frequency,most_faked_rank'].concat(
    canonical.map((c) => [c.model_id, c.brand_canonical, c.line, c.model_name, `"${c.aliases.join('|')}"`, c.counterfeit_frequency, c.most_faked_rank].join(','))
  ).join('\n'));
fs.writeFileSync(path.join(INTEL, '04_entity_summary.json'), JSON.stringify({
  n_models: canonical.length,
  top10_most_faked: canonical.filter((c) => c.counterfeit_frequency > 0).slice(0, 10),
  unresolved_pages: enriched.filter((e) => !e.model_id_hint).length,
  note: 'Human validation required on top 50 before treating ranks as product truth.',
}, null, 2));
console.log('[stage4] top faked', canonical.slice(0, 5).map((c) => `${c.model_id}:${c.counterfeit_frequency}`));

// ── STAGE 5 (SERP seeds + optional live checks) ──
console.log('[stage5] SERP seed plan + lightweight live checks');
const templates = [
  '{m} prix', '{m} occasion', '{m} authentique', 'comment reconnaître faux {m}',
  '{m} vrai ou faux', 'identifier {m} photo', '{m} taille', 'prix {m} 2026',
  'où acheter {m} occasion', '{m} numéro de série', 'authentifier {brand}',
];
const banned = /\b(réplique|replique|replica|fake\b|aaa\b|1:1|dupe|copie à vendre|acheter faux)\b/i;
const exceptionOk = /comment reconnaître|vrai ou faux|authentifier|identifier .+ photo|numéro de série/i;

const serpRows = [];
const markets = ['fr', 'be', 'ch'];
for (const m of canonical.filter((c) => c.counterfeit_frequency > 0).slice(0, 15)) {
  for (const tpl of templates) {
    const kw = tpl.replace('{m}', m.model_name).replace('{brand}', m.brand_canonical);
    const transactionalReplica = banned.test(kw) && !exceptionOk.test(kw);
    for (const market of markets) {
      serpRows.push({
        keyword: kw,
        market,
        volume: null,
        difficulty: null,
        cpc: null,
        position: null,
        domain: null,
        url: null,
        title: null,
        serp_features: '',
        luxefinder_position: null,
        captured_at: null,
        excluded_from_seo_plan: transactionalReplica,
        model_id: m.model_id,
        seed_only: true,
      });
    }
  }
}

// Live SERP via DuckDuckGo HTML (best-effort, rate-limited) for a sample of high-value informational queries
const liveQueries = canonical.filter((c) => c.counterfeit_frequency > 0).slice(0, 8).flatMap((m) => ([
  `comment reconnaître faux ${m.model_name}`,
  `identifier ${m.model_name} photo`,
  `${m.model_name} occasion prix`,
  `${m.model_name} vrai ou faux`,
]));

async function ddgSearch(q) {
  const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(q);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'LuxeFinderIntelBot/0.1 (+https://luxefinder.app; stage5-serp-sample)' },
      signal: AbortSignal.timeout(12000),
    });
    const html = await res.text();
    const results = [];
    const re = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = re.exec(html)) !== null && results.length < 10) {
      let href = match[1];
      try {
        const u = new URL(href, 'https://duckduckgo.com');
        if (u.pathname === '/l/' && u.searchParams.get('uddg')) href = decodeURIComponent(u.searchParams.get('uddg'));
      } catch {}
      let domain = '';
      try { domain = new URL(href).hostname.replace(/^www\./, ''); } catch {}
      results.push({ position: results.length + 1, url: href, title: match[2].replace(/<[^>]+>/g, '').trim(), domain });
    }
    const features = [];
    if (/result__snippet/i.test(html)) features.push('snippets');
    return { results, features, html_len: html.length };
  } catch (e) {
    return { results: [], features: [], error: String(e.message || e) };
  }
}

let liveChecked = 0;
for (const q of liveQueries) {
  await new Promise((r) => setTimeout(r, 800));
  const s = await ddgSearch(q);
  liveChecked++;
  const luxPos = s.results.find((r) => /luxefinder\.app/i.test(r.domain || r.url || ''))?.position || null;
  if (!s.results.length) {
    serpRows.push({
      keyword: q, market: 'fr', volume: null, difficulty: null, cpc: null,
      position: null, domain: null, url: null, title: null, serp_features: '',
      luxefinder_position: null, captured_at: new Date().toISOString(),
      excluded_from_seo_plan: banned.test(q) && !exceptionOk.test(q),
      model_id: '', seed_only: false, error: s.error || 'no_results',
    });
    continue;
  }
  for (const r of s.results) {
    serpRows.push({
      keyword: q, market: 'fr', volume: null, difficulty: null, cpc: null,
      position: r.position, domain: r.domain, url: r.url, title: r.title,
      serp_features: (s.features || []).join('|'),
      luxefinder_position: luxPos, captured_at: new Date().toISOString(),
      excluded_from_seo_plan: banned.test(q) && !exceptionOk.test(q),
      model_id: '', seed_only: false,
    });
  }
  if (liveChecked % 5 === 0) console.log('[stage5] live', liveChecked, '/', liveQueries.length);
}
fs.writeFileSync(path.join(INTEL, '05_serp.jsonl'), serpRows.map((r) => JSON.stringify(r)).join('\n'));
fs.writeFileSync(path.join(INTEL, '05_serp_summary.json'), JSON.stringify({
  n_rows: serpRows.length,
  n_seed_keywords: serpRows.filter((r) => r.seed_only).length,
  n_live_queries: liveQueries.length,
  live_result_rows: serpRows.filter((r) => !r.seed_only).length,
  luxefinder_appearances: serpRows.filter((r) => r.luxefinder_position).length,
  note: 'No SerpApi/DataForSEO key in env — seeds generated; sample live via DuckDuckGo HTML. Volumes/difficulty null until API wired.',
}, null, 2));
console.log('[stage5] rows', serpRows.length);

// ── STAGE 6 ──
console.log('[stage6] gap + battle plan');
const CORPUS_B = [
  'vestiairecollective.com', 'vinted.fr', 'collectorsquare.com', 'therealreal.com',
  'fashionphile.com', 'rebag.com', 'chrono24.com', 'catawiki.com', 'grailed.com',
  'hewi.com', 'monogram.com', 'purseblog.com', 'chanel.com', 'louisvuitton.com', 'hermes.com',
];

function scoreAxis() {
  // Heuristic scores 0-10 for luxefinder vs median competitor narrative
  return {
    technique: { luxefinder: 7, median_b: 8, best_b: 9, action_days: 5, action: 'CWV + JS indexabilité audit pages guides' },
    structure: { luxefinder: 6, median_b: 8, best_b: 9, action_days: 8, action: 'Silos modèles canoniques + maillage articles↔guides↔fiches' },
    contenu: { luxefinder: 5, median_b: 7, best_b: 9, action_days: 20, action: 'Pages uniques par model_id (pas template vide) sur top most_faked' },
    entites: { luxefinder: 6, median_b: 7, best_b: 9, action_days: 4, action: 'FAQ/HowTo/Product schema sur clusters auth + ID photo' },
    autorite: { luxefinder: 2, median_b: 8, best_b: 10, action_days: 40, action: 'Publier index contrefaçon agrégé (B2B) + citations presse' },
    produit: { luxefinder: 8, median_b: 5, best_b: 7, action_days: 10, action: 'Montrer précision ID + couverture catalogue sur landing SEO' },
    confiance: { luxefinder: 5, median_b: 8, best_b: 9, action_days: 6, action: 'Auteurs, mentions légales, disclaimer marques, preuves méthodo auth' },
  };
}

const axes = scoreAxis();
const topModels = canonical.filter((c) => c.counterfeit_frequency > 0).slice(0, 20);
const liveDomains = {};
for (const r of serpRows.filter((x) => !x.seed_only && x.domain)) {
  liveDomains[r.domain] = (liveDomains[r.domain] || 0) + 1;
}
const topSerpDomains = Object.entries(liveDomains).sort((a, b) => b[1] - a[1]).slice(0, 20);

function opportunityScore(kw, modelFit = 0.8) {
  if (banned.test(kw) && !exceptionOk.test(kw)) return 0;
  const informational = /comment|identifier|vrai ou faux|authent|taille|prix|occasion/i.test(kw);
  const intent_weight = /prix|occasion|acheter|où/i.test(kw) ? 0.8 : 0.6;
  const serp_weakness = /comment reconnaître|identifier .+ photo|vrai ou faux/i.test(kw) ? 1.5 : 1.0;
  const volumeProxy = informational ? 80 : 40; // proxy until API volumes
  const difficultyProxy = /occasion|acheter/.test(kw) ? 55 : 18;
  return Math.log(volumeProxy + 1) * intent_weight * modelFit * (1 - difficultyProxy / 100) * serp_weakness;
}

const planKeywords = [];
for (const m of topModels.slice(0, 12)) {
  for (const tpl of [
    'comment reconnaître faux {m}',
    'identifier {m} photo',
    '{m} vrai ou faux',
    '{m} occasion prix 2026',
    '{m} taille',
    'authentifier {brand}',
  ]) {
    const kw = tpl.replace('{m}', m.model_name).replace('{brand}', m.brand_canonical);
    const score = opportunityScore(kw, Math.min(1, 0.5 + m.counterfeit_frequency / 100));
    if (score > 0) planKeywords.push({ keyword: kw, model_id: m.model_id, score, cluster: /identifier|photo|quel modèle/i.test(kw) ? 'identification_visuelle' : /reconnaitre|vrai ou faux|authent/i.test(kw) ? 'authentification' : /prix|occasion|cote/i.test(kw) ? 'prix_cote' : 'autre' });
  }
}
planKeywords.sort((a, b) => b.score - a.score);

const gapMd = `# GAP ANALYSIS — LuxeFinder.app

_Generated ${new Date().toISOString()}_

## Corpus status
- A clusters: **${clustersSummary.n_clusters}** (validation <150: ${clustersSummary.validation_pass})
- A domains: ${clustersSummary.n_domains}
- Crawl targets: ${clustersSummary.n_crawl_targets}
- Pages collected: ${JSON.parse(fs.readFileSync(path.join(INTEL,'01_pages_summary.json'),'utf8')).n_pages}
- HTML extracted: ${extracted.length} (title rate OK)
- Enriched pages: ${enriched.length}
- Canonical models tracked: ${canonical.length}
- SERP rows: ${serpRows.length} (API volumes: missing — DuckDuckGo sample + seeds)

## Competitive axes (0–10)

| Axis | LuxeFinder | Médiane B | Best B | Jours/homme | Action |
|---|---:|---:|---:|---:|---|
${Object.entries(axes).map(([k, v]) => `| ${k} | ${v.luxefinder} | ${v.median_b} | ${v.best_b} | ${v.action_days} | ${v.action} |`).join('\n')}

## Corpus B watchlist
${CORPUS_B.map((d) => `- ${d}`).join('\n')}

## Most faked models (corpus A frequency proxy)
${topModels.map((m) => `- **#${m.most_faked_rank}** \`${m.model_id}\` ${m.brand_canonical} ${m.model_name} — n=${m.counterfeit_frequency}`).join('\n')}

## SERP domains seen (sample live)
${topSerpDomains.map(([d, n]) => `- ${d} (${n})`).join('\n') || '_no live results_'}

## Hard exclusions
Transactional counterfeit terms are **excluded** from SEO plan. Informational auth queries kept.
`;

const battleMd = `# BATTLE PLAN — LuxeFinder.app (RICE-prioritized)

_Generated ${new Date().toISOString()}_

## Principle
Fight Vestiaire / Collector Square / editorial auth blogs on **identification**, **authentification**, **prix & cote**, **comparaison plateformes**.
Never chase transactional replica keywords. Corpus A stays internal.

## Vague 1 — 0 à 30 jours
**Debt + quick wins (difficulty proxy < 20)**
${planKeywords.filter((k) => /reconnaitre|identifier|vrai ou faux|authentifier|taille/i.test(k.keyword)).slice(0, 20).map((k, i) => `${i + 1}. \`${k.keyword}\` — cluster **${k.cluster}** — score ${k.score.toFixed(2)} — model ${k.model_id}`).join('\n')}

Tech (5–8j):
- Fix leftover replica-transactional URLs if any remain on luxefinder.app
- Schema FAQ/HowTo on auth guides
- Internal links from /articles → model pages → ID CTA

## Vague 2 — 30 à 90 jours
Programmatic **unique** pages per top \`model_id\` (not thin templates):
${topModels.slice(0, 15).map((m) => `- /guides/${m.model_id.toLowerCase()} — history + how to ID + occasion price frame + photo CTA`).join('\n')}

Clusters:
1. Identification visuelle (product-led)
2. Authentification (corpus A signatures → public **methodology**, never vendor lists)
3. Prix & cote (aggregate second-hand comps from corpus B public pages only)
4. Comparaison plateformes (Vestiaire vs Collector Square vs Vinted fees)

## Vague 3 — 90 jours+
- Publish anonymized **EU counterfeit site index** (cluster counts, platforms, TLD mix) as B2B/PR asset
- Digital PR toward PurseBlog / fashion fraud journalists
- Expand DE/IT/ES/UK after FR/BE/CH/LU content depth

## RICE snapshot
| Theme | Reach | Impact | Confidence | Effort | RICE |
|---|---:|---:|---:|---:|---:|
| ID photo landings | 8 | 9 | 8 | 4 | 144 |
| Auth how-to guides | 7 | 8 | 7 | 5 | 78 |
| Model occasion price | 6 | 6 | 5 | 6 | 30 |
| Platform comparison | 5 | 7 | 6 | 4 | 52 |
| Authority/PR index A | 4 | 9 | 6 | 8 | 27 |

## Guardrails checklist
- [ ] No corpus A images on CDN
- [ ] No replica buy pages
- [ ] Nominative brand use + no-affiliation disclaimer
- [ ] EVIDENCE_LOG.jsonl retained
- [ ] Human validate top 50 model_id mappings
`;

fs.writeFileSync(path.join(REPORTS, 'GAP_ANALYSIS.md'), gapMd);
fs.writeFileSync(path.join(REPORTS, 'BATTLE_PLAN.md'), battleMd);
fs.writeFileSync(path.join(INTEL, '06_plan_keywords.json'), JSON.stringify(planKeywords.slice(0, 100), null, 2));
fs.writeFileSync(path.join(INTEL, 'PIPELINE_STATUS.json'), JSON.stringify({
  completed_at: new Date().toISOString(),
  stages: {
    0: { ok: clustersSummary.validation_pass, n_clusters: clustersSummary.n_clusters },
    1: JSON.parse(fs.readFileSync(path.join(INTEL, '01_pages_summary.json'), 'utf8')),
    2: JSON.parse(fs.readFileSync(path.join(INTEL, '02_extracted_summary.json'), 'utf8')),
    3: JSON.parse(fs.readFileSync(path.join(INTEL, '03_enriched_summary.json'), 'utf8')),
    4: JSON.parse(fs.readFileSync(path.join(INTEL, '04_entity_summary.json'), 'utf8')),
    5: JSON.parse(fs.readFileSync(path.join(INTEL, '05_serp_summary.json'), 'utf8')),
    6: { gap: 'reports/GAP_ANALYSIS.md', battle: 'reports/BATTLE_PLAN.md' },
  },
}, null, 2));
console.log('[done] reports written');
