# LuxMatch

Marketplace photo → devis.

**Live:** https://luxmatch-six.vercel.app

## Reconnaissance produit

**Priorité : Google Cloud Vision** (`WEB_DETECTION` + logo + OCR) — le plus proche de Google Lens en API officielle.

1. Crée un projet [Google Cloud](https://console.cloud.google.com/)
2. Active **Cloud Vision API**
3. Crée une **API key** (restreins-la à Vision API)
4. Sur Vercel : `GOOGLE_VISION_API_KEY=...`

Fallback optionnel : `OPENAI_API_KEY` (GPT-4o). Sans clé → mode démo.

## Env

| Variable | Rôle |
|----------|------|
| `GOOGLE_VISION_API_KEY` | ID produit type Lens (recommandé) |
| `BLOB_READ_WRITE_TOKEN` | Auto (Blob) |
| `OPENAI_API_KEY` | Fallback description |
| `LUXMATCH_PUBLIC_URL` | `https://luxmatch-six.vercel.app` |

## Local

```bash
npm install
npx vercel env pull
# ajoute GOOGLE_VISION_API_KEY dans .env.local
npm run dev   # :3001
```
