# ADR-0001 — Stockage privé des RFQ et identifiants non devinables

**Statut :** ACCEPTÉE · **Date :** 2026-08-09 · **Phase :** P0.5 · **Finding :** S1 (critique)
**Décideur :** CTO, sur GO explicite du commanditaire au GATE P0.

---

## Contexte

`src/lib/store.ts` écrivait **toutes** les données applicatives en blob Vercel avec
`access: "public"` et `addRandomSuffix: false`. Le document `rfq/{id}.json` contient
`contact_email`, `contact_telegram`, les téléphones fournisseurs, le budget client, **ainsi que
`client_token` et tous les `supplier_token`** — c'est-à-dire les seuls secrets qui protègent
`/r/[token]`, `/s/[token]` et `/offres/[token]`.

Les identifiants étaient énumérables : `newId() = Date.now() * 1000 + Math.floor(Math.random() * 1000)`
ne laisse que **1 000 candidats par milliseconde**. Le nom d'hôte du store est public par
construction, puisque `uploadPhoto()` renvoie une URL `*.public.blob.vercel-storage.com`
affichée à chaque client.

Impact : fuite de données personnelles **et** usurpation d'identité client ou fournisseur.
Violation de l'article 32 du RGPD.

## Options envisagées

| # | Option | Évaluation |
|---|---|---|
| A | Passer les blobs en `access: "private"` | ✅ ferme l'exposition ; `@vercel/blob` 2.6.1 le supporte nativement via `get(path, { access: "private" })` |
| B | Garder public mais rendre les chemins imprévisibles (UUID dans le nom) | ⚠️ sécurité par l'obscurité ; une URL fuitée reste publique pour toujours |
| C | A + retirer les jetons d'authentification du document persisté | 🥇 idéal en défense en profondeur, mais **8 sites d'appel** dans `luxefinder-core.ts` lisent `row.client_token` / `o.supplier_token` |
| D | Migrer immédiatement vers Postgres | ❌ bonne cible, mauvais moment : c'est un chantier P2 de 20 j/h, pas un correctif d'urgence |

## Décision

**Option A quand le store Blob est privé ; sinon public + IDs non énumérables.**

Constat prod (2026-08-09) : le store lié à `BLOB_READ_WRITE_TOKEN` est un store
**public**. Appeler `access: "private"` lève
`Cannot use private access on a public store` et casse RFQ / offres.

Concrètement :

1. `BLOB_ACCESS_MODE=private` → `put`/`get` privés (ADR cible). Absent ou autre →
   `access: "public"` + lecture `list`/`fetch` (compat store actuel).
2. `newId()` reste non énumérable (`crypto.getRandomValues`, 52 bits, type `number` conservé).
3. `makeSupplierSlots()` appelle `newId()` par slot (plus de `newId() + i`).
4. Pour basculer vraiment en privé : créer un **Blob store private** dans Vercel,
   pointer le token, puis `BLOB_ACCESS_MODE=private`.

### Ce que nous n'avons **pas** fait, et pourquoi

**L'option C (retirer les jetons du document) est reportée en P2.** Une fois les blobs privés,
l'exposition est fermée ; le gain marginal de C est de la défense en profondeur. Le coût, lui,
est un refactor de 8 sites d'appel dans le chemin critique de production, sans aucun test
automatisé pour le rattraper (0 test dans le repo). **Le rapport risque/bénéfice ne le justifie
pas dans un correctif d'urgence.** À reprendre quand la suite de tests existera.

**Les photos restent `access: "public"`** (`uploadPhoto`). Elles sont affichées au client via
leur URL, et leur nom est déjà un `crypto.randomUUID()` non devinable. Risque résiduel accepté
et documenté ; à revoir avec des URL signées en P3.

## Conséquences

### ⚠️ Ce correctif ne protège que les écritures futures

**Les blobs déjà écrits avant ce déploiement restent publics.** Changer le code ne change pas
l'ACL des objets existants. Deux actions restent donc **obligatoires** et ne sont pas couvertes
par cet ADR :

1. **Migration des blobs existants** — script de réécriture en privé, ou purge si les données
   ne sont plus utiles. À chiffrer dès le début de P2 (`[ESTIMATION] 1 j/h`).
2. **Rotation des jetons en circulation** — tout `client_token` / `supplier_token` émis avant ce
   correctif doit être considéré comme potentiellement compromis. **Mais les faire tourner
   invalide les liens actifs envoyés aux clients et aux fournisseurs.** C'est un arbitrage
   commercial, pas technique : **il revient au commanditaire.**

### Autres conséquences

- ✅ Positive : une lecture passe de 2 à 1 aller-retour réseau.
- ⚠️ `useCache: false` contourne le cache CDN à chaque lecture. C'est délibéré : le motif
  *read-modify-write* de `saveRfq()` exige de lire la dernière version. À réévaluer après la
  migration Postgres.
- ⚠️ La perte de données par écriture concurrente (finding **S7**) **n'est pas corrigée** — elle
  disparaîtra avec Postgres en P2.
- ✅ `npx tsc --noEmit` passe (exit 0).

## Coût

| Poste | Réel |
|---|---:|
| Implémentation + vérification | **0,5 j/h** (estimé 2 j/h) |
| Migration des blobs existants | 1 j/h — **à faire en P2** |
| Retrait des jetons du document (option C) | 2 j/h — **reporté en P2** |

Moins cher que prévu parce que `@vercel/blob` 2.6.1 supporte nativement les blobs privés, ce qui
n'était pas acquis avant vérification.
