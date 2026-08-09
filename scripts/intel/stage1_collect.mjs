#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const INTEL = path.join(ROOT, 'data/intel');
const RAW = path.join(INTEL, 'raw');
const UA = 'LuxeFinderIntelBot/0.1 (+https://luxefinder.app; stage1-collect; anti-counterfeit-research)';
const CONCURRENCY = 12;
const TIMEOUT = 10000;
const MAX_PRODUCT_PAGES = 8;

fs.mkdirSync(RAW, { recursive: true });
const summary = JSON.parse(fs.readFileSync(path.join(INTEL, '00_clusters_summary.json'), 'utf8'));
const clusters = fs.readFileSync(path.join(INTEL, '00_clusters.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const byDomain = new Map(clusters.map((c) => [c.domain, c]));
const targets = summary.crawl_targets;
const evidence = path.join(INTEL, 'EVIDENCE_LOG.jsonl');

function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal, redirect: 'follow',
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml' },
    });
    clearTimeout(t);
    const buf = Buffer.from(await res.arrayBuffer()).slice(0, 1_500_000);
    return { ok: res.ok, status: res.status, url: res.url || url, buf, html: buf.toString('utf8') };
  } catch (e) {
    clearTimeout(t);
    return { ok: false, status: 0, url, buf: Buffer.alloc(0), html: '', error: String(e.message || e) };
  }
}

function extractLinks(html, base) {
  const links = new Set();
  const re = /href=["']([^"'#]+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const u = new URL(m[1], base);
      if (!/^https?:$/.test(u.protocol)) continue;
      if (u.hostname.replace(/^www\./, '') !== new URL(base).hostname.replace(/^www\./, '')) continue;
      links.add(u.origin + u.pathname);
    } catch {}
  }
  return [...links];
}

function scoreProductUrl(u) {
  const s = u.toLowerCase();
  let score = 0;
  if (/product|produit|producto|prodotto|tasche|bag|borsa|sac-|watch|montre|replica|item|shop\//.test(s)) score += 3;
  if (/blog|news|cart|checkout|account|login|privacy|terms|contact/.test(s)) score -= 5;
  if ((s.match(/\//g) || []).length >= 3) score += 1;
  return score;
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }));
  return out;
}

const pages = [];

async function crawlDomain(domain, idx) {
  if (idx % 25 === 0) console.log(`[stage1] ${idx}/${targets.length} ${domain}`);
  const meta = byDomain.get(domain) || {};
  const homeCandidates = [`https://${domain}/`, `https://www.${domain}/`];
  let home = null;
  for (const u of homeCandidates) {
    const r = await fetchText(u);
    if (r.html && r.html.length > 200) { home = r; break; }
    if (!home) home = r;
  }
  const toFetch = [];
  if (home) {
    toFetch.push({ url: home.url, kind: 'home', pre: home });
    const links = extractLinks(home.html, home.url)
      .map((u) => ({ u, s: scoreProductUrl(u) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, MAX_PRODUCT_PAGES)
      .map((x) => x.u);
    // editorial
    const editorial = extractLinks(home.html, home.url).filter((u) => /blog|guide|how-to|comment|reconnaitre|fake|authenti/i.test(u)).slice(0, 3);
    for (const u of [...new Set([...links, ...editorial])]) toFetch.push({ url: u, kind: 'page', pre: null });
  }

  const domainPages = [];
  for (const item of toFetch) {
    const r = item.pre || await fetchText(item.url);
    const dir = path.join(RAW, domain.replace(/[^a-z0-9.-]/gi, '_'));
    fs.mkdirSync(dir, { recursive: true });
    const hash = r.buf.length ? sha256(r.buf) : sha256(Buffer.from(item.url));
    const rawPath = path.join(dir, `${hash}.html.gz`);
    if (r.buf.length) fs.writeFileSync(rawPath, zlib.gzipSync(r.buf));
    const page = {
      page_id: hash.slice(0, 16),
      domain,
      cluster_id: meta.cluster_id || '',
      is_representative: !!meta.is_cluster_representative,
      url: r.url || item.url,
      fetched_at: new Date().toISOString(),
      http_status: r.status,
      content_hash: hash,
      raw_path: r.buf.length ? rawPath : '',
      screenshot_path: '',
      render_mode: 'static',
      block_reason: r.ok ? '' : (r.error || `http_${r.status}`),
      kind: item.kind,
      html_len: r.html.length,
    };
    domainPages.push(page);
    fs.appendFileSync(evidence, JSON.stringify({
      stage: 1, domain, url: page.url, fetched_at: page.fetched_at, content_hash: hash, http_status: r.status,
    }) + '\n');
    // stash html alongside for stage2 speed (ungzip later also ok) — keep .html.txt sidecar small path map
    if (r.html) fs.writeFileSync(path.join(dir, `${hash}.meta.json`), JSON.stringify({ url: page.url, title_hint: (r.html.match(/<title[^>]*>([^<]*)/i) || [])[1] || '' }));
    // store decompressed html for stage2 if under 400k
    if (r.html && r.html.length < 400000) fs.writeFileSync(path.join(dir, `${hash}.html`), r.html);
  }
  return domainPages;
}

const results = await mapPool(targets, CONCURRENCY, crawlDomain);
for (const arr of results) pages.push(...(arr || []));

fs.writeFileSync(path.join(INTEL, '01_pages.jsonl'), pages.map((p) => JSON.stringify(p)).join('\n'));
const header = ['page_id','domain','cluster_id','url','fetched_at','http_status','content_hash','raw_path','screenshot_path','render_mode','block_reason','kind'];
const csv = [header.join(',')].concat(pages.map((p) => header.map((h) => {
  const v = String(p[h] ?? '');
  return /["',\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}).join(','))).join('\n');
fs.writeFileSync(path.join(INTEL, '01_pages.csv'), csv);
fs.writeFileSync(path.join(INTEL, '01_pages_summary.json'), JSON.stringify({
  n_pages: pages.length,
  n_domains: new Set(pages.map((p) => p.domain)).size,
  ok: pages.filter((p) => p.http_status >= 200 && p.http_status < 400).length,
  with_raw: pages.filter((p) => p.raw_path).length,
}, null, 2));
console.log(JSON.stringify({ n_pages: pages.length, ok: pages.filter((p) => p.http_status >= 200 && p.http_status < 400).length }, null, 2));
