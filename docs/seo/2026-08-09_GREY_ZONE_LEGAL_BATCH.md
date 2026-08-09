# LuxeFinder — batch SEO zone grise légale (200 pages)

| | |
|---|---|
| **Domaine** | https://luxefinder.app |
| **Fichier** | `src/lib/seo-grey-batch.ts` |
| **Volume** | **200** = 5 locales × 5 intents × 8 maisons |
| **Date** | 2026-08-09 |

## Lexique AUTORISÉ (capture d’audience)

- budget / Budget  
- alternative  
- pas cher / günstig / economico / barato / cheap  
- trouver vendeur / Verkäufer finden / …  
- occasion / Second Hand / usato / pre-owned  

## Lexique INTERDIT (volontaire)

réplique, replica, contrefaçon, fake, 1:1, Yupoo-buy, Pandabuy tuto, mirror quality claims.

## Positionnement page

Chaque page dit explicitement : **LuxeFinder ne vend pas et n’authentifie pas automatiquement.**  
CTA = photo + budget → short-list d’offres vendeurs.

## Maisons

Louis Vuitton, Hermès, Chanel, Dior, Gucci, Saint Laurent, Bottega Veneta, Cartier.

## Locales

FR, DE, IT, ES, EN.

## Indexation

```bash
cd luxefinder
npm run seo:export-urls
npm run indexnow   # après deploy
```

Sitemap : inclus via `SEO_PAGES`.
