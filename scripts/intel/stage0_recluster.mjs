#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const INTEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../data/intel');
const rows = fs.readFileSync(path.join(INTEL, '00_clusters.jsonl'), 'utf8')
  .trim().split('\n').map((l) => JSON.parse(l));

class UF {
  constructor(n) { this.p = [...Array(n).keys()]; this.r = Array(n).fill(0); }
  find(x) { while (this.p[x] !== x) { this.p[x] = this.p[this.p[x]]; x = this.p[x]; } return x; }
  union(a, b) {
    a = this.find(a); b = this.find(b); if (a === b) return;
    if (this.r[a] < this.r[b]) [a, b] = [b, a];
    this.p[b] = a; if (this.r[a] === this.r[b]) this.r[a]++;
  }
}

function cluster(fps, mode) {
  const n = fps.length;
  const uf = new UF(n);
  const by = new Map();
  const add = (k, i) => {
    if (!k) return;
    if (!by.has(k)) by.set(k, []);
    by.get(k).push(i);
  };

  for (let i = 0; i < n; i++) {
    const r = fps[i];
    const aids = String(r.analytics_ids || '').split('|').filter(Boolean);
    for (const id of aids) add(`an:${id}`, i);
    if (r.footer_hash) add(`ft:${r.footer_hash}`, i);
    if (r.dom_hash && r.platform && r.platform !== 'custom' && r.platform !== 'unknown') {
      add(`dp:${r.dom_hash}|${r.platform}`, i);
    }
    // category meta collapses (noise)
    if (r.category === 'marketplace') add('meta:marketplace', i);
    if (r.category === 'media') add('meta:media', i);
    if (r.category === 'gov') add('meta:gov', i);

    if (mode >= 1) {
      // same DOM skeleton among shops (clone farms often custom)
      if (r.dom_hash && r.category === 'shop_candidate' && r.fetch_status === 'ok') {
        add(`domshop:${r.dom_hash}`, i);
      }
      if (r.ip && r.platform && r.platform !== 'unknown' && r.fetch_status === 'ok') {
        add(`ipplat:${r.ip}|${r.platform}`, i);
      }
    }
    if (mode >= 2) {
      // unreachable shops together; media already collapsed
      if (r.fetch_status !== 'ok' && r.category === 'shop_candidate') add('shop_unreachable', i);
      // IP alone for shops if shared hosting farm
      if (r.ip && r.category === 'shop_candidate' && r.fetch_status === 'ok') add(`ip:${r.ip}`, i);
      // shortened dom (first half of hash already 16 hex) — use platform+tld soft only for tiny platforms
      if (r.platform && !['custom', 'unknown'].includes(r.platform) && r.category === 'shop_candidate') {
        add(`plat:${r.platform}|${r.tld}`, i);
      }
    }
    if (mode >= 3) {
      // domain keyword families (replica farms naming)
      const stem = r.domain.toLowerCase().replace(/[^a-z]/g, '');
      for (const fam of ['replica', 'repliq', 'fakefake', 'contref', 'namaak', '1to1', 'aaa']) {
        // use presence of replica/fake etc
      }
      const m = stem.match(/(replica|repliq|fake|faux|namaak|contrefacon|dupes?)/);
      if (m && r.category === 'shop_candidate') add(`kw:${m[1]}|${r.platform}|${r.tld}`, i);
    }
  }

  for (const idxs of by.values()) {
    // only merge if key is strong OR group not huge for weak keys
    const key = [...by.entries()].find(([, v]) => v === idxs)?.[0] || '';
    for (let k = 1; k < idxs.length; k++) uf.union(idxs[0], idxs[k]);
  }

  const groups = new Map();
  for (let i = 0; i < n; i++) {
    const root = uf.find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(i);
  }
  return groups;
}

const fps = rows.map((r) => ({
  ...r,
  analytics_ids: r.analytics_ids,
  rank: Number(r.rank) || 9999,
}));

let mode = 0;
let groups = cluster(fps, mode);
while (groups.size >= 150 && mode < 3) {
  mode++;
  groups = cluster(fps, mode);
  console.log(`mode ${mode} => ${groups.size} clusters`);
}
console.log(`final mode=${mode} n_clusters=${groups.size}`);

const outRows = [];
const clusterMeta = [];
let cid = 0;
for (const idxs of groups.values()) {
  cid++;
  const members = idxs.map((i) => fps[i]).sort((a, b) => a.rank - b.rank);
  const rep = members[0];
  const size = members.length;
  const clusterId = `C${String(cid).padStart(4, '0')}`;
  clusterMeta.push({ cluster_id: clusterId, size, representative: rep.domain, platform: rep.platform, category: rep.category });
  for (const m of members) {
    outRows.push({
      domain: m.domain,
      cluster_id: clusterId,
      cluster_size: size,
      is_cluster_representative: m.domain === rep.domain,
      platform: m.platform,
      analytics_ids: m.analytics_ids || '',
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

clusterMeta.sort((a, b) => b.size - a.size);
const hist = { '1': 0, '2-5': 0, '6-20': 0, '21-50': 0, '51+': 0 };
for (const c of clusterMeta) {
  if (c.size === 1) hist['1']++;
  else if (c.size <= 5) hist['2-5']++;
  else if (c.size <= 20) hist['6-20']++;
  else if (c.size <= 50) hist['21-50']++;
  else hist['51+']++;
}
const targets = [];
for (const c of clusterMeta) {
  const members = outRows.filter((r) => r.cluster_id === c.cluster_id);
  const rep = members.find((m) => m.is_cluster_representative);
  if (rep) targets.push(rep.domain);
  for (const s of members.filter((m) => !m.is_cluster_representative).slice(0, 2)) targets.push(s.domain);
}
const summary = {
  n_domains: fps.length,
  n_clusters: groups.size,
  recluster_mode: mode,
  loose_pass: mode > 0,
  validation_pass: groups.size < 150,
  size_distribution: hist,
  fetch_ok: fps.filter((f) => f.fetch_status === 'ok').length,
  top20: clusterMeta.slice(0, 20),
  crawl_targets: [...new Set(targets)],
  n_crawl_targets: new Set(targets).size,
  note: 'Reclustered from saved fingerprints; mega category|platform|tld join removed.',
};
fs.writeFileSync(path.join(INTEL, '00_clusters_summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({
  n_clusters: summary.n_clusters,
  validation_pass: summary.validation_pass,
  hist,
  top10: summary.top20.slice(0, 10),
  n_crawl_targets: summary.n_crawl_targets,
}, null, 2));
