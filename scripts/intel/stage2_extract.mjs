#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const INTEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data/intel');
const pages = fs.readFileSync(path.join(INTEL, '01_pages.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));

function loadHtml(p) {
  const htmlPath = p.raw_path ? p.raw_path.replace(/\.html\.gz$/, '.html') : '';
  if (htmlPath && fs.existsSync(htmlPath)) return fs.readFileSync(htmlPath, 'utf8');
  if (p.raw_path && fs.existsSync(p.raw_path)) {
    try { return zlib.gunzipSync(fs.readFileSync(p.raw_path)).toString('utf8'); } catch { return ''; }
  }
  return '';
}
function pick(html, re) {
  const m = html.match(re);
  return m ? (m[1] || m[0]).trim().replace(/\s+/g, ' ') : '';
}
function all(html, re) {
  const out = []; let m; const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  while ((m = r.exec(html)) !== null) out.push((m[1] || m[0]).trim());
  return out;
}

const rows = [];
let withTitle = 0;
for (let i = 0; i < pages.length; i++) {
  const p = pages[i];
  if (i % 200 === 0) console.log(`[stage2] ${i}/${pages.length}`);
  const html = loadHtml(p);
  const title = pick(html, /<title[^>]*>([^<]*)/i);
  if (title) withTitle++;
  const h1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, '');
  const h2 = all(html, /<h2[^>]*>([\s\S]*?)<\/h2>/i).slice(0, 8).map((x) => x.replace(/<[^>]+>/g, '').trim());
  const h3 = all(html, /<h3[^>]*>([\s\S]*?)<\/h3>/i).slice(0, 8).map((x) => x.replace(/<[^>]+>/g, '').trim());
  const metaDesc = pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    || pick(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const canonical = pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i);
  const lang = pick(html, /<html[^>]+lang=["']([^"']+)/i);
  const robots = pick(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i);
  const ogTitle = pick(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i);
  const alts = all(html, /alt=["']([^"']{2,120})["']/i).slice(0, 30);
  const jsonld = all(html, /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
  let prices = [];
  let currency = '';
  let availability = '';
  for (const block of jsonld) {
    try {
      const j = JSON.parse(block);
      const nodes = Array.isArray(j) ? j : (j['@graph'] ? j['@graph'] : [j]);
      for (const n of nodes) {
        const offers = n.offers || (n.Offers) || null;
        const off = Array.isArray(offers) ? offers[0] : offers;
        if (off && (off.price || off.lowPrice)) {
          prices.push(String(off.price || off.lowPrice));
          currency = off.priceCurrency || currency;
          availability = String(off.availability || '');
        }
      }
    } catch {}
  }
  const priceText = all(html, /(?:€|EUR|USD|\$|£)\s?\d[\d\s.,]{1,12}|\d[\d\s.,]{1,12}\s?(?:€|EUR)/g).slice(0, 10);
  if (!prices.length && priceText.length) prices = priceText;
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 2500);
  const internalLinks = (html.match(/href=["'][^"']+/gi) || []).length;
  const hasSearch = /type=["']search["']|name=["']q["']|searchform|search-field/i.test(html);
  const hasReviews = /review|avis|bewertung|recension/i.test(html);
  rows.push({
    page_id: p.page_id,
    domain: p.domain,
    cluster_id: p.cluster_id,
    url: p.url,
    kind: p.kind,
    title, h1, h2: h2.join(' | '), h3: h3.join(' | '),
    meta_description: metaDesc, canonical, lang, robots, og_title: ogTitle,
    alt_texts: alts.join(' || '),
    prices: prices.join(' | '), currency, availability,
    body_text: body,
    n_internal_link_attrs: internalLinks,
    has_search: hasSearch,
    has_reviews: hasReviews,
    jsonld_blocks: jsonld.length,
    html_len: html.length,
  });
}

fs.writeFileSync(path.join(INTEL, '02_extracted.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n'));
const titleRate = rows.length ? withTitle / rows.length : 0;
fs.writeFileSync(path.join(INTEL, '02_extracted_summary.json'), JSON.stringify({
  n_rows: rows.length,
  title_extraction_rate: titleRate,
  validation_pass: titleRate > 0.95 || withTitle / Math.max(1, rows.filter((r) => r.html_len > 0).length) > 0.95,
  with_title: withTitle,
  with_html: rows.filter((r) => r.html_len > 0).length,
}, null, 2));
console.log(JSON.stringify({
  n_rows: rows.length,
  with_title: withTitle,
  title_rate_all: titleRate,
  title_rate_with_html: withTitle / Math.max(1, rows.filter((r) => r.html_len > 0).length),
}, null, 2));
