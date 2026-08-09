# BATTLE PLAN — LuxeFinder.app

_Generated 2026-08-09T17:47:44.086Z_

## Workarounds applied (gaps closed)
- SerpAPI free **0 crédits** → organic via Cursor WebSearch + volume via **Google Suggest**
- Firecrawl **402** → contournement WebSearch
- OpenAI absent → **Gemini 2.5 Flash** (119 pages enrichies)
- Python parquet cassé → **hyparquet-writer** (Node)

## Vague 1 — top keywords (score × suggest proxy)
1. `comment reconnaître faux Neverfull` — prix_cote — score 2.74 — vol_proxy 40 — LV-NEVERFULL
2. `identifier Neverfull photo` — identification_visuelle — score 2.74 — vol_proxy 40 — LV-NEVERFULL
3. `identifier Birkin photo` — identification_visuelle — score 2.57 — vol_proxy 40 — HER-BIRKIN
4. `comment reconnaître faux Re-Edition 2005` — prix_cote — score 2.54 — vol_proxy 40 — PRA-REE2005
5. `identifier Re-Edition 2005 photo` — identification_visuelle — score 2.54 — vol_proxy 40 — PRA-REE2005
6. `Re-Edition 2005 vrai ou faux` — authentification — score 2.54 — vol_proxy 40 — PRA-REE2005
7. `Birkin vrai ou faux` — authentification — score 2.52 — vol_proxy 37 — HER-BIRKIN
8. `comment reconnaître faux Classic Flap Bag` — prix_cote — score 2.30 — vol_proxy 40 — CHN-CLASSICFLAP
9. `identifier Classic Flap Bag photo` — identification_visuelle — score 2.30 — vol_proxy 40 — CHN-CLASSICFLAP
10. `Classic Flap Bag vrai ou faux` — authentification — score 2.30 — vol_proxy 40 — CHN-CLASSICFLAP
11. `comment reconnaître faux Birkin` — prix_cote — score 2.23 — vol_proxy 24 — HER-BIRKIN
12. `comment reconnaître faux Loulou` — prix_cote — score 2.08 — vol_proxy 48 — YSL-LOULOU
13. `comment reconnaître faux Wallet on Chain` — prix_cote — score 1.99 — vol_proxy 40 — CHN-WOC
14. `identifier Wallet on Chain photo` — identification_visuelle — score 1.99 — vol_proxy 40 — CHN-WOC
15. `Wallet on Chain vrai ou faux` — authentification — score 1.99 — vol_proxy 40 — CHN-WOC
16. `identifier Loulou photo` — identification_visuelle — score 1.99 — vol_proxy 40 — YSL-LOULOU
17. `Loulou vrai ou faux` — authentification — score 1.99 — vol_proxy 40 — YSL-LOULOU
18. `Neverfull vrai ou faux` — authentification — score 1.89 — vol_proxy 12 — LV-NEVERFULL
19. `authentifier Louis Vuitton` — authentification — score 1.83 — vol_proxy 40 — LV-NEVERFULL
20. `authentifier Hermès` — authentification — score 1.71 — vol_proxy 40 — HER-BIRKIN

## P0 evidence-backed
1. Publier guides auth Classic Flap / Speedy / Birkin / WOC — SERP tenu par blogs (uandmoi, miloura, authentifier, 1stdibs), pas Vestiaire
2. Landings `identifier {modèle} photo` — intention produit LuxeFinder, SERP sans outil photo
3. Page `Vestiaire vs Vinted` / frais plateformes — angle neutre
4. Marque: différencier vs luxfinder.com; forcer indexation luxefinder.app
5. Brancher SerpAPI payant ou DataForSEO avant Vague 2 pour volumes réels

## Guardrails
- Corpus A interne, pas d'images A sur CDN
- Exclusion SEO transactionnelle contrefaçon
- `04_auto_validation.json` prêt pour review humaine top modèles
