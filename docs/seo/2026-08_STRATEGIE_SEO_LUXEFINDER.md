# Stratégie SEO LuxeFinder — un domaine, deux jobs

| | |
|---|---|
| **Domaine** | https://luxefinder.app |
| **Repo / Vercel** | `luxefinder` → Production URL = luxefinder.app |
| **Date** | 2026-08-06 |
| **Principe** | Home = app minimaliste ; `/guide`, `/marques`, `/sacs` = acquisition SEO sur le **même** domaine |
| **Hors scope** | Site marketing séparé + redirect ; Instagram / TikTok (phase ultérieure) |

---

## 1. Architecture (décision)

```text
Google / Bing / ChatGPT
        │
        ├─ requêtes longue traîne ──► luxefinder.app/guide/... ou /sacs/...
        │                                      │
        │                                      ▼ CTA « Essayer LuxeFinder »
        │                              luxefinder.app/  (app photo → budget → vendeurs)
        │
        └─ marque « LuxeFinder » ──► luxefinder.app/
```

**Pourquoi pas un 2ᵉ site :** Google rank la page qui a le contenu ; un blog externe + redirect vers `/` brûle le ranking et dilue l’autorité.

---

## 2. Audit technique live (baseline 2026-08-06)

| Check | Avant | Cible |
|-------|-------|-------|
| URLs indexables | Quasi seulement `/` | `/` + hubs + guides + modèles |
| `robots.txt` | 404 | Allow + sitemap |
| `sitemap.xml` | 404 | Dynamique Next.js |
| Title / description | `LuxeFinder` / `Photo. Modèle. Offres.` | Intent-rich SSR |
| H1 home | Absent | `sr-only` SSR (UX inchangée) |
| Canonical / OG | Absents | Présents |
| JSON-LD | Absent | WebApplication + Organization + Article/FAQ |
| Contenu textuel home | ~2 phrases | App inchangée ; richesse sur routes SEO |
| `/guide` etc. | 404 | 200 + contenu |

Repo confirmé : projet Vercel **`luxefinder`**, code local [`etude/luxefinder`](../../) (`package.json` name: `luxefinder`).

---

## 3. Objectif réaliste

- **Non** : #1 sur `sac louis vuitton` (SERP marques / marketplaces).
- **Oui** : dominer la **longue traîne FR** (guides, modèles, budget, trouver vendeur, photo → offres) + citations GEO (ChatGPT / Perplexity / AI Overviews).

KPI :
1. Pages indexées (GSC)
2. Clics organiques
3. CTR guides
4. **Conversions** CTA → upload photo sur `/`

---

## 4. Roadmap

| Phase | Contenu | Statut implémentation repo |
|-------|---------|----------------------------|
| 0 | robots, sitemap, meta, JSON-LD, H1 sr-only | Fait dans ce chantier |
| 1 | Routes `/guide`, `/marques`, `/sacs`, légales, FAQ | Fait |
| 2 | Keyword map 3 couches + backlog 30/100 | Fait (doc) |
| 3 | Publier / enrichir 30 P0 puis programmatic | Contenu initial porté ; enrichissement continu |
| 4 | GEO : FAQ schema, `/llms.txt` | Fait |
| 5 | GSC / Bing + itération | Checklist fournie |

---

## 5. Ton éditorial LuxeFinder

Produit : **photo + budget → on trouve des vendeurs**.

Les pages SEO :
- Expliquent le parcours (identifier le modèle, fixer un budget, comparer des offres)
- Évitent le thin spam / portes automatiques vides
- CTA unique vers l’app `/`
- Mentions légales / confidentialité présentes

---

## 6. Search Console / Bing — checklist humaine

- [ ] Google Search Console : propriété `luxefinder.app` (DNS ou HTML)
- [ ] Soumettre `https://luxefinder.app/sitemap.xml`
- [ ] URL Inspection sur `/` et 3 guides P0
- [ ] Bing Webmaster : importer via GSC ou XML
- [ ] Surveiller couverture index + requêtes sous 14 jours

Voir aussi [CHECKLIST_GSC_BING.md](./CHECKLIST_GSC_BING.md).

---

## 7. Fichiers clés dans le repo

| Fichier | Rôle |
|---------|------|
| `src/app/robots.ts` | robots |
| `src/app/sitemap.ts` | sitemap |
| `src/app/layout.tsx` | meta / OG globaux |
| `src/lib/seo-pages.ts` | contenu éditorial |
| `src/app/guide/**` | hub + slugs |
| `src/app/marques/**` | hub marques |
| `src/app/sacs/**` | pages modèles |
| `public/llms.txt` | GEO / agents |
| `docs/seo/KEYWORD_MAP_LUXEFINDER.md` | backlog mots-clés |

---

**Disclaimer ranking :** aucune garantie de position #1 ; la stratégie maximise les chances sur la longue traîne et la convertibilité.
