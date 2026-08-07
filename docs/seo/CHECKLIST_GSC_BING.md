# Checklist Google Search Console & Bing

## Google Search Console

1. [ ] Ajouter la propriété **URL prefix** `https://luxefinder.app`
2. [ ] Vérifier (DNS TXT ou balise HTML / fichier)
3. [ ] Sitemaps → ajouter `https://luxefinder.app/sitemap.xml`
4. [ ] Paramètres → utilisateurs (si équipe)
5. [ ] Inspection d’URL — liste P0 générée : `docs/seo/URLS_TO_SUBMIT.txt`
   - [ ] `/` `/guide` `/marques` `/comment-ca-marche`
   - [ ] Batch occasion : `sac-luxe-occasion-france`, `louis-vuitton-occasion`, `gucci-occasion`, …
   - [ ] `npm run seo:export-urls` pour régénérer la liste
6. [ ] Demander indexation si « Découverte » lente
7. [ ] Sous 14 j : Performance → requêtes / pages / pays FR

## Bing Webmaster Tools + IndexNow

1. [ ] Ajouter le site ou **Importer depuis GSC**
2. [ ] Soumettre le même sitemap
3. [ ] Vérifier que `https://luxefinder.app/<INDEXNOW_KEY>.txt` répond 200  
   (voir [`INDEXNOW.md`](./INDEXNOW.md))
4. [ ] Après chaque deploy de contenu : `npm run indexnow`
5. [ ] Vérifier indexation Bing (URL Inspection / rapports)

## Après deploy technique

1. [ ] `curl -sI https://luxefinder.app/robots.txt` → 200  
2. [ ] `curl -sI https://luxefinder.app/sitemap.xml` → 200  
3. [ ] `curl -sL https://luxefinder.app/llms.txt` → 200  
4. [ ] View-source `/` : H1 présent, og:title, JSON-LD  
5. [ ] View-source `/guide/sac-luxe-occasion-france` : Article + FAQ JSON-LD  
6. [ ] `npm run indexnow` (status 200/202)

## KPI hebdo (noter)

| Semaine | Indexées | Clics | Impressions | CTR | Uploads depuis CTA |
|---------|----------|-------|-------------|-----|--------------------|
| | | | | | |
