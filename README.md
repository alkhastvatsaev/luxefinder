# LuxeFinder

Marketplace photo → devis. **Live:** https://luxefinder.app

## Architecture SEO (même domaine)

| URL | Rôle |
|-----|------|
| `/` | App minimaliste (conversion) |
| `/guide`, `/guide/[slug]` | Contenu SEO / acquisition |
| `/marques`, `/sacs/...` | Hubs marques & modèles |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | Indexation + GEO |

Stratégie : [`docs/seo/2026-08_STRATEGIE_SEO_LUXEFINDER.md`](docs/seo/2026-08_STRATEGIE_SEO_LUXEFINDER.md)  
Keyword map : [`docs/seo/KEYWORD_MAP_LUXEFINDER.md`](docs/seo/KEYWORD_MAP_LUXEFINDER.md)  
GSC checklist : [`docs/seo/CHECKLIST_GSC_BING.md`](docs/seo/CHECKLIST_GSC_BING.md)  
IndexNow (Bing) : [`docs/seo/INDEXNOW.md`](docs/seo/INDEXNOW.md)

```bash
npm run seo:export-urls   # listes GSC
npm run indexnow          # pousse les URLs vers Bing IndexNow
```

## Reconnaissance luxe (proche Lens)

Pipeline multi-signaux :

1. **Google Cloud Vision** — WEB_DETECTION + logo + OCR + IMAGE_PROPERTIES + OBJECT_LOCALIZATION
2. **ROI crops** (sharp) — centre + zone hardware
3. **KB modèles luxe** + scoring titres / anti-réplique
4. **Google Lens** via SerpAPI (`SERPAPI_KEY`) si configuré
5. **Product Search** catalogue GCP optionnel
6. **Synthèse LLM** (OpenAI / Gemini) → top-3 candidats
7. **Cache** Blob par hash image (7j)

### Env

| Variable | Rôle |
|----------|------|
| `GOOGLE_VISION_API_KEY` | Obligatoire pour ID précise |
| `OPENAI_API_KEY` | Synthèse / fallback |
| `SERPAPI_KEY` | Google Lens shopping/visual |
| `PRODUCT_SEARCH_PROJECT` | Projet GCP Product Search |
| `PRODUCT_SEARCH_LOCATION` | ex. `us-west1` |
| `PRODUCT_SEARCH_PRODUCT_SET` | ID du product set |
| `BLOB_READ_WRITE_TOKEN` | Auto |
| `LUXEFINDER_PUBLIC_URL` | URL publique (ex. `https://luxefinder.app`) |

### Métriques offline

```bash
npx tsx scripts/vision-metrics.ts
```
