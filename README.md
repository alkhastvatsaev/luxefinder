# LuxMatch

Marketplace photo → devis. **Live:** https://luxmatch-six.vercel.app

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
| `LUXMATCH_PUBLIC_URL` | URL publique |

### Métriques offline

```bash
npx tsx scripts/vision-metrics.ts
```
