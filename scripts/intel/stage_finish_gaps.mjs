#!/usr/bin/env node
/**
 * Close remaining pipeline gaps:
 * - Parquet via hyparquet-writer (no Python)
 * - Stage 3 real LLM via Gemini 2.5 Flash
 * - Stage 4 improved resolution + auto-validation report
 * - Stage 5 Google Suggest depth + ready slots for organic SERP merge
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire('/tmp/parquet-write/package.json');
const { parquetWriteFile } = require('hyparquet-writer');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const INTEL = path.join(ROOT, 'data/intel');
const REPORTS = path.join(ROOT, 'reports');

function loadEnv(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, 'utf8').split(/\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}
const env = loadEnv(path.join(ROOT, '.env.local'));
const GEMINI_KEY = env.GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function geminiJson(prompt, { temperature = 0 } = {}) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(GEMINI_KEY)}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature, responseMimeType: 'application/json' },
  };
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await res.json();
    if (res.status === 429 || res.status === 503) {
      await sleep(1500 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(j.error?.message || `gemini_${res.status}`);
    const text = j.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
    try { return JSON.parse(text); } catch {
      const m = text.match(/\{[\s\S]*\}/);
      if (m) return JSON.parse(m[0]);
      throw new Error('bad_json');
    }
  }
  throw new Error('gemini_retries_exhausted');
}

async function googleSuggest(q, hl = 'fr') {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(10000) });
  if (!res.ok) return [];
  const j = await res.json();
  return j[1] || [];
}

function csvToColumns(csvPath) {
  const text = fs.readFileSync(csvPath, 'utf8').trim();
  const lines = text.split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  const cols = Object.fromEntries(headers.map((h) => [h, []]));
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCsvLine(lines[i]);
    headers.forEach((h, idx) => cols[h].push(vals[idx] ?? ''));
  }
  return cols;
}
function parseCsvLine(line) {
  const cols = []; let cur = ''; let inQ = false;
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    if (c === '"') { inQ = !inQ; continue; }
    if (c === ',' && !inQ) { cols.push(cur); cur = ''; continue; }
    cur += c;
  }
  cols.push(cur);
  return cols;
}

function writeParquetFromCsv(csvName, outName) {
  const csvPath = path.join(INTEL, csvName);
  if (!fs.existsSync(csvPath)) return null;
  const columnData = csvToColumns(csvPath);
  const out = path.join(INTEL, outName);
  parquetWriteFile({ filename: out, columnData });
  const n = Object.values(columnData)[0]?.length || 0;
  return { out, n, cols: Object.keys(columnData).length };
}

// ── 1) PARQUET ──
console.log('[parquet] writing...');
const parquetResults = {};
for (const [csv, pq] of [
  ['00_clusters.csv', '00_clusters.parquet'],
  ['01_pages.csv', '01_pages.parquet'],
  ['models_canonical.csv', 'models_canonical.parquet'],
]) {
  try {
    parquetResults[pq] = writeParquetFromCsv(csv, pq);
    console.log('[parquet]', pq, parquetResults[pq]);
  } catch (e) {
    console.error('[parquet] fail', pq, e.message);
    parquetResults[pq] = { error: e.message };
  }
}

// Also write enriched / extracted as parquet from jsonl (selected fields)
function jsonlToParquet(jsonlName, pqName, fields) {
  const rows = fs.readFileSync(path.join(INTEL, jsonlName), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const columnData = {};
  for (const f of fields) columnData[f] = rows.map((r) => {
    const v = r[f];
    if (v == null) return '';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  });
  const out = path.join(INTEL, pqName);
  parquetWriteFile({ filename: out, columnData });
  return { out, n: rows.length };
}
try {
  parquetResults['03_enriched.parquet'] = jsonlToParquet('03_enriched.jsonl', '03_enriched.parquet', [
    'page_id','domain','url','brand_raw','model_raw','model_id_hint','content_angle','target_intent','confidence','price_raw','lang'
  ]);
  console.log('[parquet]', parquetResults['03_enriched.parquet']);
} catch (e) { console.error(e.message); }

// ── 2) STAGE 3 GEMINI ──
console.log('[stage3] gemini enrichment...');
const extracted = fs.readFileSync(path.join(INTEL, '02_extracted.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const prevEnriched = new Map(fs.readFileSync(path.join(INTEL, '03_enriched.jsonl'), 'utf8').trim().split('\n').map((l) => {
  const o = JSON.parse(l); return [o.page_id, o];
}));

// Prioritize product-like pages with replica language or brand signals
function scorePage(row) {
  const blob = `${row.title} ${row.h1} ${row.body_text} ${row.url}`.toLowerCase();
  let s = 0;
  if (/product|produit|sac|bag|borsa|tasche|replica|repliq|fake|faux/.test(blob) || blob.includes('/p/')) s += 3;
  if (/chanel|vuitton|hermes|hermès|dior|gucci|prada|ysl|celine|bottega|fendi/.test(blob)) s += 4;
  if (row.prices) s += 2;
  if (row.kind === 'home') s -= 1;
  return s;
}

const candidates = extracted
  .map((r) => ({ r, s: scorePage(r) }))
  .filter((x) => x.s >= 4)
  .sort((a, b) => b.s - a.s)
  .slice(0, 180); // budget: 180 LLM calls

const enrichPrompt = (row) => `Tu analyses une page issue d'un corpus de sites de contrefaçon,
dans le cadre d'un projet d'ANTI-contrefaçon : référentiel de modèles de luxe et signatures de faux.

Tu ne produis JAMAIS de lien d'achat, contact vendeur, paiement, ni affirmation non observée.

ENTRÉE
title: ${JSON.stringify(row.title||'')}
h1: ${JSON.stringify(row.h1||'')}
body_text: ${JSON.stringify((row.body_text||'').slice(0,2000))}
alt_texts: ${JSON.stringify((row.alt_texts||'').slice(0,500))}
price_raw: ${JSON.stringify(row.prices||'')}
lang: ${JSON.stringify(row.lang||'')}
url: ${JSON.stringify(row.url||'')}

SORTIE JSON strict:
{
  "brand_raw": "",
  "model_raw": "",
  "model_aliases_observed": [],
  "attributes": {"material":null,"hardware":null,"color":null,"size":null,"closure":null,"pattern":null},
  "counterfeit_markers": {
    "quality_tier_label": null,
    "explicit_replica_language": false,
    "brand_disclaimer_present": false,
    "authenticity_claims": []
  },
  "content_angle": null,
  "target_intent": null,
  "confidence": "high",
  "unresolved": []
}
RÈGLES: null si non observable; model_raw = chaîne telle qu'écrite; confidence=low si deviné.`;

const geminiEnriched = [];
let ok = 0, fail = 0;
for (let i = 0; i < candidates.length; i++) {
  const row = candidates[i].r;
  if (i % 20 === 0) console.log(`[stage3] ${i}/${candidates.length} ok=${ok} fail=${fail}`);
  try {
    const out = await geminiJson(enrichPrompt(row));
    geminiEnriched.push({
      page_id: row.page_id,
      domain: row.domain,
      url: row.url,
      ...out,
      price_raw: row.prices || '',
      lang: row.lang || '',
      enrichment_engine: 'gemini-2.5-flash',
    });
    ok++;
  } catch (e) {
    fail++;
    const fallback = prevEnriched.get(row.page_id);
    if (fallback) geminiEnriched.push({ ...fallback, enrichment_engine: 'heuristic_fallback', gemini_error: e.message });
  }
  await sleep(120);
}

// merge: gemini results override previous for those page_ids
const mergedMap = new Map(prevEnriched);
for (const e of geminiEnriched) mergedMap.set(e.page_id, e);
const merged = [...mergedMap.values()];
fs.writeFileSync(path.join(INTEL, '03_enriched.jsonl'), merged.map((r) => JSON.stringify(r)).join('\n'));
fs.writeFileSync(path.join(INTEL, '03_enriched_summary.json'), JSON.stringify({
  n: merged.length,
  gemini_attempts: candidates.length,
  gemini_ok: ok,
  gemini_fail: fail,
  with_brand: merged.filter((e) => e.brand_raw).length,
  with_model: merged.filter((e) => e.model_raw).length,
  explicit_replica_pages: merged.filter((e) => e.counterfeit_markers?.explicit_replica_language).length,
  mode: 'gemini-2.5-flash+heuristic_merge',
}, null, 2));
console.log('[stage3] done', { ok, fail, n: merged.length });

// ── 3) STAGE 4 improved ──
console.log('[stage4] resolve...');
const MODELS = [
  { id: 'CHN-CLASSICFLAP', brand: 'Chanel', line: 'Classic', name: 'Classic Flap Bag', aliases: ['classic flap','timeless','double flap','11.12','sac classique rabat','cf medium','2.55'] },
  { id: 'CHN-19', brand: 'Chanel', line: '19', name: 'Chanel 19', aliases: ['chanel 19','19 bag'] },
  { id: 'CHN-WOC', brand: 'Chanel', line: 'WOC', name: 'Wallet on Chain', aliases: ['woc','wallet on chain'] },
  { id: 'LV-NEVERFULL', brand: 'Louis Vuitton', line: 'Neverfull', name: 'Neverfull', aliases: ['neverfull','never full'] },
  { id: 'LV-SPEEDY', brand: 'Louis Vuitton', line: 'Speedy', name: 'Speedy', aliases: ['speedy','speedy bandouliere','bandoulière'] },
  { id: 'LV-KEEPALL', brand: 'Louis Vuitton', line: 'Keepall', name: 'Keepall', aliases: ['keepall'] },
  { id: 'LV-ONTHEGO', brand: 'Louis Vuitton', line: 'Onthego', name: 'OnTheGo', aliases: ['onthego','on the go'] },
  { id: 'LV-ALMA', brand: 'Louis Vuitton', line: 'Alma', name: 'Alma', aliases: ['alma'] },
  { id: 'HER-BIRKIN', brand: 'Hermès', line: 'Birkin', name: 'Birkin', aliases: ['birkin'] },
  { id: 'HER-KELLY', brand: 'Hermès', line: 'Kelly', name: 'Kelly', aliases: ['kelly'] },
  { id: 'HER-PICOTIN', brand: 'Hermès', line: 'Picotin', name: 'Picotin', aliases: ['picotin'] },
  { id: 'HER-EVELYNE', brand: 'Hermès', line: 'Evelyne', name: 'Evelyne', aliases: ['evelyne'] },
  { id: 'DIO-LADY', brand: 'Dior', line: 'Lady Dior', name: 'Lady Dior', aliases: ['lady dior'] },
  { id: 'DIO-BOOKTOTE', brand: 'Dior', line: 'Book Tote', name: 'Book Tote', aliases: ['book tote'] },
  { id: 'DIO-SADDLE', brand: 'Dior', line: 'Saddle', name: 'Saddle', aliases: ['saddle bag','saddle'] },
  { id: 'GUC-DIONYSUS', brand: 'Gucci', line: 'Dionysus', name: 'Dionysus', aliases: ['dionysus'] },
  { id: 'GUC-MARMONT', brand: 'Gucci', line: 'Marmont', name: 'GG Marmont', aliases: ['marmont','gg marmont'] },
  { id: 'PRA-REE2005', brand: 'Prada', line: 'Re-Edition', name: 'Re-Edition 2005', aliases: ['re-edition','re edition 2005','prada 2005'] },
  { id: 'PRA-GALLERIA', brand: 'Prada', line: 'Galleria', name: 'Galleria', aliases: ['galleria'] },
  { id: 'YSL-LOULOU', brand: 'Yves Saint Laurent', line: 'Loulou', name: 'Loulou', aliases: ['loulou'] },
  { id: 'BOT-CASSETTE', brand: 'Bottega Veneta', line: 'Cassette', name: 'Cassette', aliases: ['cassette'] },
  { id: 'CEL-TRIOMPHE', brand: 'Celine', line: 'Triomphe', name: 'Triomphe', aliases: ['triomphe'] },
  { id: 'FEN-BAGUETTE', brand: 'Fendi', line: 'Baguette', name: 'Baguette', aliases: ['baguette','fendi baguette'] },
];
function norm(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function resolveModel(text, brandHint) {
  const t = norm(text);
  let best = null; let bestScore = 0;
  for (const m of MODELS) {
    if (brandHint && norm(brandHint) && !norm(m.brand).includes(norm(brandHint).slice(0, 5)) && !norm(brandHint).includes(norm(m.brand).slice(0, 5))) {
      // soft brand gate
      const brandOk = t.includes(norm(m.brand).split(' ')[0]);
      if (!brandOk && brandHint) continue;
    }
    for (const a of m.aliases.concat([m.name])) {
      const an = norm(a);
      if (an.length >= 3 && t.includes(an)) {
        const score = an.length;
        if (score > bestScore) { bestScore = score; best = m; }
      }
    }
  }
  return best;
}

const freq = new Map();
const resolutions = [];
for (const e of merged) {
  const blob = `${e.brand_raw} ${e.model_raw} ${(e.model_aliases_observed||[]).join(' ')}`;
  const m = resolveModel(blob, e.brand_raw) || resolveModel(blob, null);
  if (m) {
    freq.set(m.id, (freq.get(m.id) || 0) + 1);
    resolutions.push({ page_id: e.page_id, model_id: m.id, brand: m.brand, model_raw: e.model_raw, confidence: e.confidence });
  }
}
const canonical = MODELS.map((m) => ({
  model_id: m.id,
  brand_canonical: m.brand,
  line: m.line,
  model_name: m.name,
  aliases: m.aliases,
  misspellings: [],
  counterfeit_frequency: freq.get(m.id) || 0,
  most_faked_rank: 0,
})).sort((a, b) => b.counterfeit_frequency - a.counterfeit_frequency);
canonical.forEach((c, i) => { c.most_faked_rank = c.counterfeit_frequency > 0 ? i + 1 : 999; });

fs.writeFileSync(path.join(INTEL, 'models_canonical.jsonl'), canonical.map((r) => JSON.stringify(r)).join('\n'));
fs.writeFileSync(path.join(INTEL, 'models_canonical.csv'),
  ['model_id,brand_canonical,line,model_name,aliases,counterfeit_frequency,most_faked_rank'].concat(
    canonical.map((c) => [c.model_id, c.brand_canonical, c.line, c.model_name, `"${c.aliases.join('|')}"`, c.counterfeit_frequency, c.most_faked_rank].join(','))
  ).join('\n'));
writeParquetFromCsv('models_canonical.csv', 'models_canonical.parquet');

// Auto-validation pack for top models (human still final)
const autoVal = canonical.filter((c) => c.counterfeit_frequency > 0).slice(0, 50).map((c) => {
  const samples = resolutions.filter((r) => r.model_id === c.model_id).slice(0, 5);
  return {
    model_id: c.model_id,
    model_name: c.model_name,
    brand: c.brand_canonical,
    frequency: c.counterfeit_frequency,
    sample_model_raw: samples.map((s) => s.model_raw).filter(Boolean),
    auto_check: samples.length >= 1 ? 'PASS_REVIEW' : 'EMPTY',
  };
});
fs.writeFileSync(path.join(INTEL, '04_auto_validation.json'), JSON.stringify({
  generated_at: new Date().toISOString(),
  n_resolved_pages: resolutions.length,
  n_models_with_hits: canonical.filter((c) => c.counterfeit_frequency > 0).length,
  top: autoVal,
  note: 'Auto pack for human 2h review — not a substitute for human sign-off.',
}, null, 2));
fs.writeFileSync(path.join(INTEL, '04_entity_summary.json'), JSON.stringify({
  n_models: canonical.length,
  n_resolved_pages: resolutions.length,
  top10_most_faked: canonical.filter((c) => c.counterfeit_frequency > 0).slice(0, 10),
}, null, 2));
console.log('[stage4] resolved', resolutions.length, 'top', canonical.slice(0, 5).map((c) => `${c.model_id}:${c.counterfeit_frequency}`));

// ── 4) STAGE 5 SUGGEST DEPTH ──
console.log('[stage5] google suggest + keyword graph...');
const plan = JSON.parse(fs.readFileSync(path.join(INTEL, '06_plan_keywords.json'), 'utf8'));
const suggestRows = [];
const seeds = [
  ...plan.slice(0, 40).map((p) => p.keyword),
  ...canonical.filter((c) => c.counterfeit_frequency > 0).slice(0, 12).flatMap((m) => [
    `comment reconnaître faux ${m.model_name}`,
    `${m.model_name} occasion`,
    `${m.model_name} authentique`,
    `identifier ${m.model_name}`,
  ]),
  'vestiaire collective vs vinted',
  'vestiaire collective vs collector square',
  'luxefinder',
  'identifier sac photo',
];
const uniqSeeds = [...new Set(seeds)];
for (let i = 0; i < uniqSeeds.length; i++) {
  const kw = uniqSeeds[i];
  const suggestions = await googleSuggest(kw, 'fr');
  suggestRows.push({
    keyword: kw,
    market: 'fr',
    suggest_count: suggestions.length,
    suggestions: suggestions.slice(0, 10),
    volume_proxy: suggestions.length === 0 ? 'unknown_or_low' : (suggestions.some((s) => norm(s) === norm(kw)) ? 'established' : 'expandable'),
    volume_score: Math.min(100, suggestions.length * 12 + (suggestions.some((s) => norm(s) === norm(kw)) ? 25 : 0)),
    captured_at: new Date().toISOString(),
    source: 'google_suggest',
  });
  // also expand children that look on-brand
  for (const s of suggestions.slice(0, 3)) {
    if (/repliq|replica|fake shop|acheter faux|1:1|aaa/i.test(s)) continue;
    suggestRows.push({
      keyword: s,
      market: 'fr',
      suggest_count: null,
      suggestions: [],
      volume_proxy: 'child_suggest',
      volume_score: 40,
      parent: kw,
      captured_at: new Date().toISOString(),
      source: 'google_suggest_child',
    });
  }
  if (i % 15 === 0) console.log('[suggest]', i, '/', uniqSeeds.length);
  await sleep(80);
}
fs.writeFileSync(path.join(INTEL, '05_suggest.jsonl'), suggestRows.map((r) => JSON.stringify(r)).join('\n'));

// Merge suggest into serp file as volume proxies
const serp = fs.readFileSync(path.join(INTEL, '05_serp.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const suggestByKw = new Map(suggestRows.filter((r) => r.source === 'google_suggest').map((r) => [norm(r.keyword), r]));
for (const row of serp) {
  const s = suggestByKw.get(norm(row.keyword));
  if (s) {
    row.volume_proxy_score = s.volume_score;
    row.volume_proxy = s.volume_proxy;
    row.suggestions = s.suggestions;
  }
}
fs.writeFileSync(path.join(INTEL, '05_serp.jsonl'), serp.map((r) => JSON.stringify(r)).join('\n'));
fs.writeFileSync(path.join(INTEL, '05_serp_summary.json'), JSON.stringify({
  n_rows: serp.length,
  suggest_keywords: suggestRows.filter((r) => r.source === 'google_suggest').length,
  suggest_children: suggestRows.filter((r) => r.source === 'google_suggest_child').length,
  serpapi_status: 'exhausted_0_credits_free_plan',
  firecrawl_status: '402',
  organic_source_next: 'cursor_websearch_batch',
  volume_method: 'google_suggest_proxy',
}, null, 2));

fs.writeFileSync(path.join(INTEL, 'FINISH_PARTIAL.json'), JSON.stringify({
  parquet: parquetResults,
  stage3: { ok, fail, attempts: candidates.length },
  stage4: { resolved: resolutions.length },
  stage5_suggest: suggestRows.length,
  pending_organic_serp: uniqSeeds.slice(0, 30),
}, null, 2));

console.log('[done] partial finish', { ok, fail, resolved: resolutions.length, suggest: suggestRows.length });
console.log('PENDING_ORGANIC=' + JSON.stringify(uniqSeeds.slice(0, 30)));
