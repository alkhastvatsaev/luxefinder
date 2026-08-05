# LuxMatch

Marketplace photo → devis WhatsApp.

**Live:** https://luxmatch-six.vercel.app

## Stack

- Next.js 16 (App Router) on Vercel
- API native `/api/luxmatch/*` + **Vercel Blob** (plus de tunnel ngrok)
- OpenAI Vision optionnel (`OPENAI_API_KEY`)

## Env (Vercel)

| Variable | Rôle |
|----------|------|
| `BLOB_READ_WRITE_TOKEN` | Auto (Blob store) |
| `OPENAI_API_KEY` | Analyse photo réelle (sinon mock) |
| `LUXMATCH_PUBLIC_URL` | `https://luxmatch-six.vercel.app` |

## Local

```bash
npm install
npx vercel env pull   # BLOB_READ_WRITE_TOKEN
npm run dev           # http://localhost:3001
```

## Flow

1. Drop photo → analyse IA
2. Confirme → 10 liens vendeurs créés (blast WA reste sur worker WAREACH local)
3. Fournisseur `/s/{token}` → devis
4. Client `/r/{token}` → choisit + avis
