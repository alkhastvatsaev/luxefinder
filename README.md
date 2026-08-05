# LuxMatch

Marketplace photo → devis WhatsApp. Front séparé de WAREACH.

**Live:** https://luxmatch-six.vercel.app

## Stack

- Next.js 16 (App Router)
- Proxy `/api/luxmatch/*` → backend WAREACH (`BACKEND_URL`)

## Env (Vercel)

| Variable | Exemple |
|----------|---------|
| `BACKEND_URL` | `https://….ngrok-free.dev` ou API hébergée |

## Local

```bash
npm install
export BACKEND_URL=http://127.0.0.1:8000
npm run dev   # http://localhost:3001
```

L’API RFQ tourne dans le monorepo WAREACH (`/api/luxmatch/*`).

## Flow

1. Drop photo → analyse IA
2. Confirme → blast 10 WhatsApp fournisseurs
3. Fournisseur `/s/{token}` → devis
4. Client `/r/{token}` → choisit + avis
