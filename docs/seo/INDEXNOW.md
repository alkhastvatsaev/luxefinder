# IndexNow — indexation Bing (et partenaires)

Host : `luxefinder.app`  
Clé publique : fichier `public/{INDEXNOW_KEY}.txt` (déjà généré)  
Endpoint : `https://api.indexnow.org/indexnow`

## Setup

1. La clé est dans `docs/seo/.indexnow-key` et `public/<clé>.txt`.
2. Ajoute dans `.env.local` :

```bash
INDEXNOW_KEY=b7f8d09f395540809faa4e2ecc5a4e20
```

(Remplace si tu régénères la clé — le fichier `.txt` dans `public/` doit matcher.)

3. Dans [Bing Webmaster Tools](https://www.bing.com/webmasters) :
   - Ajoute `https://luxefinder.app`
   - Soumets le sitemap `https://luxefinder.app/sitemap.xml`
   - IndexNow est déclenché via `npm run indexnow`

## Soumettre toutes les URLs SEO

```bash
cd luxmatch
npm run indexnow
```

Le script envoie les URLs par lots de 100. Codes OK : **200** ou **202**.

## Quand relancer

- Après chaque deploy de nouvelles pages guide / modèles
- Après une grosse màj de contenu
- Pas besoin de spammer toutes les heures

## Google Search Console

IndexNow **ne pousse pas Google**. Pour Google :

1. Sitemap dans GSC
2. Inspection d’URL sur la liste `docs/seo/URLS_TO_SUBMIT.txt` (P0)
3. Générer la liste : `npm run seo:export-urls`

## Vérifier la clé

```bash
curl -sI "https://luxefinder.app/b7f8d09f395540809faa4e2ecc5a4e20.txt"
# → 200 après deploy
```
