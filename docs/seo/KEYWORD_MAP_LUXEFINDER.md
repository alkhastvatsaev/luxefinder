# Keyword map LuxeFinder — 3 couches

Site : https://luxefinder.app  
Positionnement : photo + budget → trouver des vendeurs (sacs & mode luxe).  
Volumes : **non inventés** — priorisation qualitative FR ; affiner avec GSC après indexation.

---

## Couche 1 — Marque (navigation)

| Mot-clé | Page cible | Priorité |
|---------|------------|----------|
| LuxeFinder | `/` | P0 |
| luxefinder.app | `/` | P0 |
| Luxe Finder | `/` | P0 |
| LuxeFinder avis / comment ça marche | `/comment-ca-marche` | P0 |

---

## Couche 2 — Intention produit (money)

| Mot-clé / intention | Page cible | Priorité |
|---------------------|------------|----------|
| trouver vendeur sac luxe | `/guide/trouver-vendeur-sac-luxe` | P0 |
| envoyer photo sac trouver offre | `/` + `/comment-ca-marche` | P0 |
| budget sac luxe France | `/guide/budget-sac-luxe` | P0 |
| identifier modèle sac luxe photo | `/guide/identifier-modele-sac` | P0 |
| comparer offres sac luxe | `/guide/comparer-offres-vendeurs` | P0 |
| première recherche vendeur luxe | `/guide/premiere-recherche` | P0 |
| éviter arnaques vendeurs sacs | `/guide/eviter-arnaques-vendeurs` | P0 |
| guide tailles sacs luxe | `/guide/tailles-sacs-luxe` | P0 |
| authentifier sac luxe points clés | `/guide/authentifier-sac-luxe` | P0 |
| FAQ LuxeFinder | `/faq` | P0 |

---

## Couche 3 — Longue traîne marques / modèles

### Marques (hub `/marques/[brand]`)

louis-vuitton, hermes, chanel, dior, gucci, saint-laurent, bottega-veneta, fendi, celine, prada, balenciaga, loewe, cartier (accessoires), tiffany

### Modèles sacs (programmatic `/sacs/[brand]/[model]`)

| Brand | Models P0 |
|-------|-----------|
| louis-vuitton | neverfull, alma, speedy, pochette-metis, sidonie |
| hermes | birkin, kelly, evelyne, picotin |
| chanel | classic-flap, 22, boy |
| dior | book-tote, saddle, lady-dior |
| gucci | jackie, marmont, ophidia |
| saint-laurent | loulou, niki, sunset |
| bottega-veneta | jodie, cassette |
| fendi | baguette, peekaboo |
| celine | luggage, triomphe |

### Guides process (héritage adapté)

yupoo, whatsapp vendeur, agent france, qc checklist, douane, livraison — utiles comme **éducation** puis CTA app (pas comme destination finale).

---

## Backlog 30 pages P0 (ship order)

### Batch mid-tail 50 pages (shippé 2026-08-06) — plan exécuté

Plan source : [`plan-seo-50-pages-luxefinder.md`](./plan-seo-50-pages-luxefinder.md)

- [x] 29 guides mid-tail (`seo-midtail-batch.ts`) — P0/P1/P2 guides du plan  
- [x] Modèles `/sacs` : keepall, onthego, woc, chanel-19, lady-dior, triomphe, evelyne, picotin, re-edition-2005, galleria, dionysus (+ enrichissement related existants)  
- P0 Inspection GSC : code-date LV, Speedy tailles, Neverfull tailles, hausses Chanel, n° série Chanel, prix Timeless/Neverfull, etc. (`URLS_TO_SUBMIT.txt`)

### Batch longue traîne IndexNow (shippé 2026-08-06) — 20/20

- [x] sac-luxe-occasion-france  
- [x] acheter-sac-occasion-authenticite  
- [x] louis-vuitton-occasion  
- [x] gucci-occasion  
- [x] chanel-occasion  
- [x] hermes-occasion  
- [x] vente-produits-luxe-occasion  
- [x] trouver-vendeur-louis-vuitton  
- [x] trouver-vendeur-gucci  
- [x] budget-sac-louis-vuitton  
- [x] identifier-neverfull-photo  
- [x] comparer-prix-sac-luxe-occasion  
- [x] arnaques-sacs-luxe-occasion  
- [x] sac-luxe-seconde-main-vs-neuf  
- [x] deposer-photo-sac-trouver-offre  
- [x] speedy-taille-offres  
- [x] book-tote-budget  
- [x] classic-flap-trouver-vendeur  
- [x] accessoires-luxe-occasion  
- [x] glossaire-luxe-acheteur  

Modèles `/sacs` ajoutés : pochette-metis, speedy-25, boy, jodie, baguette, luggage, saddle (+ existants).

### Historique P0

1. `/` (marque + app)  
2. `/comment-ca-marche`  
3. `/faq`  
4. `/guide` (hub)  
5. trouver-vendeur-sac-luxe  
6. budget-sac-luxe  
7. identifier-modele-sac  
8. comparer-offres-vendeurs  
9. premiere-recherche  
10. eviter-arnaques-vendeurs  

## Backlog ~100 programmatic (phase 3+)

- Tous les modèles liste couche 3  
- Variantes : `{model} budget`, `{model} taille`, `{brand} trouver vendeur`  
- Textile : `/vetements/[brand]/[line]` (à activer après sacs)  
- Clusters occasion / authentification / entretien  

---

## Maillage

```text
/guide ──► howto P0 ──► marques ──► sacs/model
   │                         │
   └──────── CTA ────────────┴──► /
```

Règle : chaque page SEO ≥ 3 liens internes related + 1 CTA app.
