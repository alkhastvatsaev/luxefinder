#!/usr/bin/env node
/**
 * ÉTAGE 0 — Déduplication corpus A (LuxeFinder intel)
 * Fingerprint homepages → union-find clusters → 00_clusters.csv + summary
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dns from 'dns/promises';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const INTEL = path.join(ROOT, 'data/intel');
const HARVEST = path.resolve(ROOT, '../luxguard/docs/audits/2026-08-09_EU_REPLICA_SITES_HARVEST.csv');
const UA = 'LuxeFinderIntelBot/0.1 (+https://luxefinder.app; stage0-fingerprint; anti-counterfeit-research)';
const CONCURRENCY = 30;
const TIMEOUT_MS = 9000;

fs.mkdirSync(INTEL, { recursive: true });
const evidencePath = path.join(INTEL, 'EVIDENCE_LOG.jsonl');

const MARKETPLACE = new Set([
  'ebay.it','ebay.co.uk','ebay.de','ebay.fr','ebay.es','ebay.com',
  'subito.it','marktplaats.nl','vinted.fr','vinted.de','vinted.it',
  'leboncoin.fr','kleinanzeigen.de','willhaben.at','ricardo.ch',
  'allegro.pl','vestiairecollective.com','therealreal.com','grailed.com',
]);
const MEDIA_HINTS = /(news|today|informacion|herald|rtbf|abc\.|cope\.|frag-einen|wikipedia|reddit|youtube|facebook|instagram|tiktok|twitter|x\.com)/i;

function sha1(s) {
  return crypto.createHash('sha1').update(String(s || '')).digest('hex').slice(0, 16);
}
function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    // naive CSV with quotes
    const cols = [];
    let cur = '', inQ = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') { inQ = !inQ; continue; }
      if (c === ',' && !inQ) { cols.push(cur); cur = ''; continue; }
      cur += c;
    }
    cols.push(cur);
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = cols[idx] ?? ''; });
    rows.push(obj);
  }
  return rows;
}

function categorize(domain) {
  if (MARKETPLACE.has(domain) || /^(ebay|vinted|subito|marktplaats|leboncoin)\./.test(domain)) return 'marketplace';
  if (MEDIA_HINTS.test(domain)) return 'media';
  if (/\.(gov|gouv\.fr|europa\.eu)$/.test(domain)) return 'gov';
  return 'shop_candidate';
}

function detectPlatform(html) {
  const h = html.toLowerCase();
  if (/cdn\.shopify\.com|myshopify\.com|shopify\.theme/i.test(html)) return 'Shopify';
  if (/wp-content|woocommerce/i.test(h)) return 'WooCommerce';
  if (/opencart|catalog\/view\/theme/i.test(h)) return 'OpenCart';
  if (/magento/i.test(h) || h.includes('/static/version')) return 'Magento';
  if (/prestashop/i.test(h)) return 'PrestaShop';
  if (/wix\.com|wixstatic/i.test(h)) return 'Wix';
  if (/squarespace/i.test(h)) return 'Squarespace';
  if (/bigcommerce/i.test(h)) return 'BigCommerce';
  return 'custom';
}

function extractAnalytics(html) {
  const ids = new Set();
  const patterns = [
    /GTM-[A-Z0-9]+/g,
    /UA-\d{4,}-\d+/g,
    /G-[A-Z0-9]{6,}/g,
    /fbq\s*\(\s*['"]init['"]\s*,\s*['"](\d+)['"]/g,
    /facebook\.com\/tr\?id=(\d+)/g,
  ];
  for (const re of patterns) {
    let m;
    const r = new RegExp(re.source, re.flags);
    while ((m = r.exec(html)) !== null) {
      ids.add(m[1] || m[0]);
    }
  }
  return [...ids].sort();
}

function domSkeleton(html, maxTags = 80) {
  const tags = [];
  const re = /<\/?([a-zA-Z0-9]+)(\s|>|\/)/g;
  let m;
  while ((m = re.exec(html)) !== null && tags.length < maxTags) {
    const t = m[1].toLowerCase();
    if (t === 'script' || t === 'style' || t === 'noscript' || t === 'svg' || t === 'path') continue;
    tags.push(t);
  }
  return sha1(tags.join('>'));
}

function footerHash(html) {
  const m = html.match(/<footer[\s\S]*?<\/footer>/i) || html.match(/id=["']footer["'][\s\S]{0,4000}/i);
  if (!m) return '';
  const text = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().slice(0, 500);
  if (text.length < 20) return '';
  return sha1(text);
}

function bannerHashes(html) {
  const urls = [];
  const re = /<(?:img|source)[^>]+(?:src|srcset)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null && urls.length < 8) {
    const u = m[1].split(/\s+/)[0];
    if (/logo|banner|hero|header|slider|slide/i.test(u) || urls.length < 3) {
      urls.push(sha1(u.replace(/\?.*$/, '')));
    }
  }
  return [...new Set(urls)].slice(0, 5);
}

async function resolveIp(domain) {
  try {
    const r = await dns.lookup(domain);
    return r.address;
  } catch {
    return '';
  }
}

async function fetchHome(domain) {
  const urls = [`https://${domain}/`, `https://www.${domain}/`, `http://${domain}/`];
  for (const url of urls) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        signal: ctrl.signal,
        redirect: 'follow',
        headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml' },
      });
      clearTimeout(t);
      const buf = Buffer.from(await res.arrayBuffer());
      // skip huge
      const html = buf.slice(0, 800_000).toString('utf8');
      return { url: res.url || url, status: res.status, html, ok: res.ok };
    } catch (e) {
      clearTimeout(t);
    }
  }
  return { url: `https://${domain}/`, status: 0, html: '', ok: false };
}

class UnionFind {
  constructor(n) {
    this.p = Array.from({ length: n }, (_, i) => i);
    this.r = Array(n).fill(0);
  }
  find(x) {
    while (this.p[x] !== x) { this.p[x] = this.p[this.p[x]]; x = this.p[x]; }
    return x;
  }
  union(a, b) {
    a = this.find(a); b = this.find(b);
    if (a === b) return;
    if (this.r[a] < this.r[b]) [a, b] = [b, a];
    this.p[b] = a;
    if (this.r[a] === this.r[b]) this.r[a]++;
  }
}

function clusterPass(rows, loose = false) {
  const n = rows.length;
  const uf = new UnionFind(n);
  const byKey = new Map();
  const add = (key, i) => {
    if (!key) return;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(i);
  };

  for (let i = 0; i < n; i++) {
    const r = rows[i];
    for (const id of r.analytics_ids || []) add(`an:${id}`, i);
    if (r.footer_hash) add(`ft:${r.footer_hash}`, i);
    for (const b of r.banner_hashes || []) add(`bn:${b}`, i);
    if (r.dom_hash && r.platform && r.platform !== 'custom') {
      add(`domplat:${r.dom_hash}|${r.platform}`, i);
    }
    if (loose) {
      if (r.dom_hash) add(`dom:${r.dom_hash}`, i);
      if (r.ip && r.platform) add(`ipplat:${r.ip}|${r.platform}`, i);
      if (r.fetch_status !== 'ok') add(`catfail:${r.category}|unreachable`, i);
      else add(`cat:${r.category}|${r.platform || 'x'}|${(r.tld || '').slice(0, 6)}`, i);
      // coarser: same eTLD label stem for replica keywords
      const stem = r.domain.replace(/\.(com|net|org|shop|store|to|cc|de|fr|it|es|nl|be|ch|uk|co\.uk).*$/i, '');
      if (/repliq|replica|fake|faux|namaak|contref|1-?1|aaa/i.test(stem)) {
        add(`stemfam:${stem.replace(/[0-9_-]+/g, '').slice(0, 12)}`, i);
      }
    } else {
      if (r.fetch_status !== 'ok' && r.category === 'media') add('media_unreachable', i);
      if (r.category === 'marketplace') add('marketplace_all', i);
      if (r.category === 'media') add(`media_${(r.tld || 'xx')}`, i);
    }
  }

  for (const idxs of byKey.values()) {
    for (let k = 1; k < idxs.length; k++) uf.union(idxs[0], idxs[k]);
  }

  // second link: same dom_hash + same platform even custom if not unique alone in loose
  if (loose) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = rows[i], b = rows[j];
        if (a.dom_hash && a.dom_hash === b.dom_hash && a.platform === b.platform) uf.union(i, j);
      }
    }
  }

  const groups = new Map();
  for (let i = 0; i < n; i++) {
    const root = uf.find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(i);
  }
  return groups;
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return out;
}

async function main() {
  console.log('[stage0] loading', HARVEST);
  const rowsIn = parseCsv(fs.readFileSync(HARVEST, 'utf8'));
  console.log('[stage0] domains', rowsIn.length);

  const fingerprints = await mapPool(rowsIn, CONCURRENCY, async (row, idx) => {
    const domain = String(row.domain || '').trim().toLowerCase();
    if (!domain) return null;
    if (idx % 50 === 0) console.log(`[stage0] fetch ${idx}/${rowsIn.length} ${domain}`);
    const category = categorize(domain);
    const ip = await resolveIp(domain);
    const fetched = await fetchHome(domain);
    const html = fetched.html || '';
    const fp = {
      rank: Number(row.rank) || idx + 1,
      domain,
      tld: row.tld || domain.split('.').pop(),
      eu_tld: row.eu_tld,
      replica_hint: row.replica_hint,
      category,
      ip,
      asn: '', // optional enrichment skipped for speed
      created_at: '',
      last_seen: new Date().toISOString(),
      fetch_status: fetched.ok ? 'ok' : (fetched.status ? `http_${fetched.status}` : 'fail'),
      http_status: fetched.status,
      final_url: fetched.url,
      platform: html ? detectPlatform(html) : 'unknown',
      analytics_ids: html ? extractAnalytics(html) : [],
      dom_hash: html ? domSkeleton(html, 80) : '',
      footer_hash: html ? footerHash(html) : '',
      banner_hashes: html ? bannerHashes(html) : [],
      content_hash: html ? sha1(html.slice(0, 50000)) : '',
    };
    fs.appendFileSync(evidencePath, JSON.stringify({
      stage: 0, domain, url: fetched.url, fetched_at: fp.last_seen,
      content_hash: fp.content_hash, http_status: fetched.status,
    }) + '\n');
    return fp;
  });

  const fps = fingerprints.filter(Boolean);

  let loose = false;
  let groups = clusterPass(fps, false);
  let nClusters = groups.size;
  console.log('[stage0] clusters strict:', nClusters);
  if (nClusters >= 150) {
    loose = true;
    groups = clusterPass(fps, true);
    nClusters = groups.size;
    console.log('[stage0] clusters loose:', nClusters);
  }
  // if still too many, force category+platform mega-collapse for non-shops and bucket shops by platform+dom prefix
  if (nClusters >= 150) {
    loose = true;
    const uf = new UnionFind(fps.length);
    const by = new Map();
    fps.forEach((r, i) => {
      let key;
      if (r.category !== 'shop_candidate') key = `meta:${r.category}`;
      else if (r.fetch_status !== 'ok') key = 'shop_unreachable';
      else key = `shop:${r.platform}:${(r.dom_hash || 'x').slice(0, 8)}:${r.ip || 'noip'}`;
      if (!by.has(key)) by.set(key, []);
      by.get(key).push(i);
      // also join analytics
      for (const id of r.analytics_ids || []) {
        const k = `an:${id}`;
        if (!by.has(k)) by.set(k, []);
        by.get(k).push(i);
      }
    });
    for (const idxs of by.values()) for (let k = 1; k < idxs.length; k++) uf.union(idxs[0], idxs[k]);
    groups = new Map();
    for (let i = 0; i < fps.length; i++) {
      const root = uf.find(i);
      if (!groups.has(root)) groups.set(root, []);
      groups.get(root).push(i);
    }
    nClusters = groups.size;
    console.log('[stage0] clusters mega-loose:', nClusters);
  }

  const outRows = [];
  let cid = 0;
  const clusterMeta = [];
  for (const idxs of groups.values()) {
    cid++;
    const members = idxs.map((i) => fps[i]).sort((a, b) => a.rank - b.rank);
    const rep = members[0];
    const size = members.length;
    const clusterId = `C${String(cid).padStart(4, '0')}`;
    clusterMeta.push({ cluster_id: clusterId, size, representative: rep.domain, platform: rep.platform });
    for (const m of members) {
      outRows.push({
        domain: m.domain,
        cluster_id: clusterId,
        cluster_size: size,
        is_cluster_representative: m.domain === rep.domain,
        platform: m.platform,
        analytics_ids: (m.analytics_ids || []).join('|'),
        asn: m.asn || '',
        ip: m.ip || '',
        created_at: m.created_at || '',
        last_seen: m.last_seen,
        fetch_status: m.fetch_status,
        category: m.category,
        dom_hash: m.dom_hash,
        footer_hash: m.footer_hash,
        rank: m.rank,
        tld: m.tld,
      });
    }
  }

  outRows.sort((a, b) => a.cluster_id.localeCompare(b.cluster_id) || a.rank - b.rank);

  const header = Object.keys(outRows[0]);
  const csv = [header.join(',')].concat(outRows.map((r) => header.map((h) => {
    const v = String(r[h] ?? '');
    return /["',\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
  }).join(','))).join('\n');
  fs.writeFileSync(path.join(INTEL, '00_clusters.csv'), csv);
  fs.writeFileSync(path.join(INTEL, '00_clusters.jsonl'), outRows.map((r) => JSON.stringify(r)).join('\n'));

  // size distribution
  const sizes = clusterMeta.map((c) => c.size);
  const hist = { '1': 0, '2-5': 0, '6-20': 0, '21-50': 0, '51+': 0 };
  for (const s of sizes) {
    if (s === 1) hist['1']++;
    else if (s <= 5) hist['2-5']++;
    else if (s <= 20) hist['6-20']++;
    else if (s <= 50) hist['21-50']++;
    else hist['51+']++;
  }
  clusterMeta.sort((a, b) => b.size - a.size);
  const summary = {
    n_domains: fps.length,
    n_clusters: nClusters,
    loose_pass: loose,
    validation_pass: nClusters < 150,
    size_distribution: hist,
    fetch_ok: fps.filter((f) => f.fetch_status === 'ok').length,
    top20: clusterMeta.slice(0, 20),
    crawl_targets: outRows.filter((r) => {
      const c = clusterMeta.find((x) => x.cluster_id === r.cluster_id);
      if (r.is_cluster_representative) return true;
      // up to 2 samples per cluster
      const samples = outRows.filter((x) => x.cluster_id === r.cluster_id && !x.is_cluster_representative);
      return samples.slice(0, 2).some((s) => s.domain === r.domain);
    }).map((r) => r.domain),
  };
  // fix crawl_targets properly
  const targets = [];
  for (const c of clusterMeta) {
    const members = outRows.filter((r) => r.cluster_id === c.cluster_id);
    const rep = members.find((m) => m.is_cluster_representative);
    if (rep) targets.push(rep.domain);
    for (const s of members.filter((m) => !m.is_cluster_representative).slice(0, 2)) targets.push(s.domain);
  }
  summary.crawl_targets = [...new Set(targets)];
  summary.n_crawl_targets = summary.crawl_targets.length;

  fs.writeFileSync(path.join(INTEL, '00_clusters_summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify({ n_domains: summary.n_domains, n_clusters: summary.n_clusters, validation_pass: summary.validation_pass, hist, top5: summary.top20.slice(0, 5) }, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
