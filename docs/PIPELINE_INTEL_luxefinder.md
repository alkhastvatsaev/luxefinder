# PIPELINE D'INTELLIGENCE CONCURRENTIELLE — LuxeFinder.app

Chaîne à 7 étages. Corpus A / B / C **jamais mélangés**.

| Corpus | Usage |
|---|---|
| **A** — ~1146 sites répliques | Signatures faux + lexique + demande latente. Jamais SEO imitatif, jamais images réutilisées. |
| **B** — ~40 concurrents réels | Vestiaire, Vinted, Collector Square, TheRealReal, Fashionphile, Rebag, Chrono24, Catawiki, Grailed, HEWI, Monogram, PurseBlog, maisons. |
| **C** — Vérité SERP | DataForSEO / SerpApi / Ahrefs (à câbler). Samples WebSearch/DDG en attendant. |

## Chemins
- Données: `luxefinder/data/intel/`
- Reports: `luxefinder/reports/`
- Scripts: `luxefinder/scripts/intel/`

## Étages
0. Déduplication → `00_clusters.*` — **n_clusters < 150**
1. Collecte → `01_pages.*` + `raw/{domain}/*.html.gz`
2. Extraction déterministe → `02_extracted.*` — **title rate > 95% sur HTML**
3. Enrichissement (LLM ou heuristique) → `03_enriched.*`
4. Résolution entités → `models_canonical.*`
5. Vérité SERP → `05_serp.*`
6. Gap + Battle → `reports/GAP_ANALYSIS.md`, `reports/BATTLE_PLAN.md`

## Garde-fous
Jamais: images corpus A sur luxefinder.app; SEO transactionnel contrefaçon; contacts/paiements vendeurs.
Toujours: usage nominatif; disclaimer affiliation; `EVIDENCE_LOG.jsonl`; corpus A interne.

## Statut exécution
Voir `data/intel/PIPELINE_STATUS.json`.
