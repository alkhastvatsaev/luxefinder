#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const INTEL = path.join(ROOT, 'data/intel');
function loadEnv(file) {
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}
const KEY = loadEnv(path.join(ROOT, '.env.local')).GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const CONCURRENCY = 4;
const LIMIT = 120;

const extracted = fs.readFileSync(path.join(INTEL, '02_extracted.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const prev = new Map(fs.readFileSync(path.join(INTEL, '03_enriched.jsonl'), 'utf8').trim().split('\n').map((l) => {
  const o = JSON.parse(l); return [o.page_id, o];
}));

function score(row) {
  const blob = `${row.title} ${row.h1} ${row.body_text} ${row.url}`.toLowerCase();
  let s = 0;
  if (/product|produit|sac|bag|borsa|tasche|replica|repliq|fake|faux/.test(blob) || blob.includes('/p/')) s += 3;
  if (/chanel|vuitton|hermes|hermès|dior|gucci|prada|ysl|celine|bottega|fendi/.test(blob)) s += 4;
  if (row.prices) s += 2;
  return s;
}
const candidates = extracted.map((r) => ({ r, s: score(r) })).filter((x) => x.s >= 4).sort((a, b) => b.s - a.s).slice(0, LIMIT);

async function geminiJson(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(KEY)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0, responseMimeType: 'application/json' },
    }),
    signal: AbortSignal.timeout(25000),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(j.error?.message || `http_${res.status}`);
  const text = j.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
  return JSON.parse(text.match(/\{[\s\S]*\}/)[0]);
}

function promptFor(row) {
  return `ANTI-contrefaçon. JSON only. Null si non observé. Pas de liens achat/contacts.
title:${JSON.stringify(row.title||'')}
h1:${JSON.stringify(row.h1||'')}
body:${JSON.stringify((row.body_text||'').slice(0,1600))}
alts:${JSON.stringify((row.alt_texts||'').slice(0,400))}
price:${JSON.stringify(row.prices||'')}
lang:${JSON.stringify(row.lang||'')}
{"brand_raw":"","model_raw":"","model_aliases_observed":[],"attributes":{"material":null,"hardware":null,"color":null,"size":null,"closure":null,"pattern":null},"counterfeit_markers":{"quality_tier_label":null,"explicit_replica_language":false,"brand_disclaimer_present":false,"authenticity_claims":[]},"content_angle":null,"target_intent":null,"confidence":"high","unresolved":[]}`;
}

const outPath = path.join(INTEL, '03_gemini_partial.jsonl');
fs.writeFileSync(outPath, '');
let ok = 0, fail = 0, i = 0;

async function worker() {
  while (i < candidates.length) {
    const idx = i++;
    const row = candidates[idx].r;
    try {
      const out = await geminiJson(promptFor(row));
      const rec = { page_id: row.page_id, domain: row.domain, url: row.url, ...out, price_raw: row.prices || '', lang: row.lang || '', enrichment_engine: 'gemini-2.5-flash' };
      fs.appendFileSync(outPath, JSON.stringify(rec) + '\n');
      ok++;
    } catch (e) {
      fail++;
      fs.appendFileSync(outPath, JSON.stringify({ page_id: row.page_id, domain: row.domain, url: row.url, error: e.message, enrichment_engine: 'failed' }) + '\n');
    }
    if ((ok + fail) % 10 === 0) console.log(`[gemini] ${ok + fail}/${candidates.length} ok=${ok} fail=${fail}`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

// merge into 03_enriched
const geminiRows = fs.readFileSync(outPath, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((r) => !r.error);
for (const r of geminiRows) prev.set(r.page_id, r);
const merged = [...prev.values()];
fs.writeFileSync(path.join(INTEL, '03_enriched.jsonl'), merged.map((r) => JSON.stringify(r)).join('\n'));
fs.writeFileSync(path.join(INTEL, '03_enriched_summary.json'), JSON.stringify({
  n: merged.length,
  gemini_ok: ok,
  gemini_fail: fail,
  gemini_limit: LIMIT,
  with_brand: merged.filter((e) => e.brand_raw).length,
  with_model: merged.filter((e) => e.model_raw).length,
  explicit_replica_pages: merged.filter((e) => e.counterfeit_markers?.explicit_replica_language).length,
  mode: 'gemini-2.5-flash+heuristic_merge',
}, null, 2));
console.log(JSON.stringify({ ok, fail, merged: merged.length }, null, 2));
