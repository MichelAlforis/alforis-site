# Tunnel Parcours Alforis

Le tunnel "Parcours" permet à un visiteur de répondre à une série de questions, d'obtenir un **profil personnalisé**, et de recevoir un **bilan** par email après validation de son parcours.  
Le flow technique combine React (Next.js), calcul de profil côté client, et enregistrement structuré dans Airtable.

---

## 1. Architecture et composants

### Flux global
1. **Affichage et choix d'un parcours** via la marketplace.
2. **Remplissage du questionnaire interactif** (choix + réponse libre).
3. **Calcul du profil** (`detectProfilFromMatrix`).
4. **Tunnel Contact (étapes 1 puis 2)** pour saisir les infos personnelles.
5. **Push partiel** dans Airtable (step 1) puis **update complet** (step 2).
6. **Affichage bilan personnalisé (ClapDeFin)** avec call-to-action.

### Principaux fichiers :

- `ParcoursFormulaire.jsx` – Affiche la séquence de questions et collecte les réponses.
- `detectProfilFromMatrix.js` – Calcule le profil principal/secondaire à partir des réponses.
- `ContactFinal.jsx` – Tunnel en 2 étapes pour saisir les infos, valider RGPD, compléter les détails.
- `ValidationDonnees.jsx` – Centralise toutes les règles de validation frontend.
- `airtable-partial.js`, `airtable-update.js`, `airtableAPI.js` – Gestion de l'envoi/sauvegarde côté Airtable (POST partiel, PATCH complet).
- `ClapDeFin.jsx` – Affichage du résultat (profil, contenu personnalisé, CTA).

---

## 2. Détail du déroulement

### A. Sélection et lancement du parcours

- Utilisateur choisit un parcours depuis la marketplace (`ParcoursContent.jsx`).
- Le composant `ParcoursFormulaire` récupère la liste des questions/choix via le meta du parcours.

### B. Questionnaire dynamique

- Chaque question s'affiche sous forme de bouton(s) ou textarea (réponse libre).
- Un bouton “Suivant” déclenche la validation à chaque étape.
- À la dernière question, clic sur “Valider” déclenche :
    - `detectProfilFromMatrix` → retourne `profilPrincipal`, `profilSecondaire`, et le scoring.
    - `onComplete` du parent est appelé avec ces infos + les réponses collectées.

### C. Tunnel contact en 2 étapes

#### Étape 1 : Informations de base
- Saisie : Nom, Email, Âge, RGPD, etc.  
- Validation **forte** via `ValidationDonnees.jsx`.
- POST vers `/api/airtable-partial` (`airtable-partial.js`)
    - Si un email existe déjà : récupère l’id
    - Sinon, crée un nouvel enregistrement partiel avec les infos collectées.

#### Étape 2 : Compléments
- Saisie de : situation, téléphone, patrimoine, revenus, risque, phrase libre, etc.
- Validation spécifique via `ValidationDonnees.jsx`.
- PATCH vers `/api/airtable-update` (`airtable-update.js`)
    - Update du même enregistrement avec les infos finales.

### D. Affichage résultat et notification

- Composant `ClapDeFin` :  
  Affiche un contenu personnalisé selon le profil principal (et secondaire), plus un bouton retour ou CTA externe.

---

## 3. Logique de scoring

- Gérée dans `detectProfilFromMatrix.js`
    - Prend : 
        - Le tableau des réponses (par index),
        - La réponse libre,
        - La matrice de scoring (meta),
        - Les mots-clés associés (meta).
    - Retourne : 
        - `profilPrincipal` (score max)
        - `profilSecondaire` (si l’écart <= 2)
        - Tous les scores (debug possible)

---

## 4. Gestion de la validation

Centralisée dans `ValidationDonnees.jsx` :
- Fonction `validerDonnees(data, step)` :
    - Vérifie chaque champ selon le step.
    - Retourne `{ champ: message }` si erreur.
- Fonctions `sanitizeFormData`, `filterFormData` :
    - Nettoient, convertissent et préparent les données pour Airtable.
- Tous les noms de champ doivent correspondre **exactement** à ceux d’Airtable.

---

## 5. Gestion Airtable (sauvegarde)

### Création partielle (`airtable-partial.js` / `airtableAPI.js`)
- Enregistre : Nom, Email, Téléphone, Age, RGPD, Profil, NomDuFormulaire, Q1-10, PhraseLibre, etc.
- Si l’email existe déjà, ne crée pas de doublon.
- Champs non transmis lors du premier POST sont null par défaut.

### Mise à jour complète (`airtable-update.js` / `airtableAPI.js`)
- Patch : tous les champs finaux, dont ceux saisis à l’étape 2.
- Peut déclencher : envoi mail au client, notification admin (hook à placer ici).
- Retourne statut au frontend (toast de confirmation ou erreur).

---

## 6. Astuces et points durs

- **Valider la correspondance entre tous les noms de champ dans le code ET Airtable.**
- **Bien centraliser la logique du calcul de profil** pour rendre l’architecture future-proof (voir scoring).
- **Ajouter du logging sur les requêtes Airtable** côté serveur en dev : ça évite de tourner en rond sur des bugs de mapping.
- **Adapter les valeurs de certains selects** (ex : “Célibataire”, “Marié(e)”) : même orthographe/casse entre le frontend et Airtable.
- **Régler la logique RGPD** pour ne jamais stocker sans consentement.
- **Penser à l’UX sur mobile** (scroll, clavier, sticky).
- **Garder des toasts clairs et utiles** pour chaque étape utilisateur.

---

## 7. TODO & évolutions

- Refactor pour rendre les étapes dynamiques (supporter plus/moins d’étapes sans casser la logique).
- Modulariser la logique de scoring pour supporter plusieurs types de quiz/profils.
- Ajouter un système d’analytics pour suivre le funnel.
- Internationalisation (i18n) : préparer les labels/messages en français et anglais.

---

# Résumé technique

- **Frontend** : React, Next.js, Framer Motion, Toastify.
- **Validation** : centralisée et évolutive (`ValidationDonnees.jsx`).
- **Scoring** : dynamique et modulaire (`detectProfilFromMatrix.js`).
- **Back/Airtable** : double API pour partiel + update, mapping strict, emails déclenchés.
- **Résultat** : expérience fluide, données propres, personnalisation premium.

---

# Pour toute évolution, toujours :
- Ajouter le champ dans Airtable
- Mettre à jour les mappings dans le code (partiel + update)
- Ajouter la validation si besoin

---

**Le tunnel Parcours est le cœur du profiling Alforis – robustesse, clarté, et structure avant tout.**

