📁 Arborescence cible
ruby
Copier
Modifier
.
├── README.md
├── app
│   ├── layout.jsx            # Layout global (Navbar, footer, ScrollRestoration…)
│   ├── page.jsx              # /  (ancien pages/index.jsx)
│   ├── services
│   │   └── page.jsx          # /services  (ancien pages/Services.jsx)
│   ├── approche
│   │   └── page.jsx          # /approche  (ancien pages/ApprochePersonnalisee.jsx)
│   ├── parcours
│   │   ├── page.jsx          # /parcours  (ancien pages/Parcours.jsx)
│   │   └── [slug]
│   │       └── page.jsx      # /parcours/[slug]  (ancien pages/parcours/[slug].jsx)
│   ├── blog
│   │   ├── page.jsx          # /blog-studio  (ancien pages/blog-studio.jsx)
│   │   └── [slug]
│   │       └── page.jsx      # /blog/[slug]  (ancien pages/blog/[slug].jsx)
│   ├── marketplace
│   │   ├── page.jsx          # /marketplace  (ancien pages/marketplace.jsx)
│   │   └── [slug]
│   │       └── page.jsx      # /marketplace/[slug]  (ancien pages/marketplace/[slug].jsx)
│   ├── contact
│   │   └── page.jsx          # /contact  (ancien pages/Contact2.jsx)
│   ├── faq
│   │   └── page.jsx          # /faq  (ancien pages/FAQ.jsx)
│   ├── mentions-legales
│   │   └── page.jsx          # /mentions-legales (ancien pages/MentionsLegales.jsx)
│   └── prendre-rendez-vous
│       └── page.jsx          # /prendre-rendez-vous (ancien pages/prendre-rendez-vous.jsx)
│
├── components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── AlforisHead.jsx       # transformable en metadata
│   ├── ui
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── ProgressBar.jsx
│   │   └── MobileScrollProgress.jsx
│   └── parcours
│       ├── ParcoursFormulaire.jsx
│       └── … (tous les composants de parcours)
│
├── hooks
│   ├── scrollToTop.js        # optionnel si on utilise ScrollRestoration
│   └── …  
│
├── public
│   ├── favicon.ico
│   ├── og-cover.jpg
│   ├── assets
│   └── sounds
│
├── styles
│   ├── globals.css           # avec @tailwind base, components, utilities + vos btn-alforis-*
│   ├── navbar.css
│   └── cookieconsent-theme-alforis.css
│
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── package.json
└── …  
🛠 Plan de migration pas à pas
Créer app/layout.jsx

y importer votre navbar, footer, <ScrollRestoration />, <MobileScrollProgress/>

mettre html/body, metadata, scroll-smooth en <body>

Migrer chaque page de pages/ → app/

pages/index.jsx → app/page.jsx

pages/Services.jsx → app/services/page.jsx

pages/ApprochePersonnalisee.jsx → app/approche/page.jsx

etc., en conservant la logique et les hooks usePathname, useRouter, etc.

Migrer les routes dynamiques

pages/parcours/[slug].jsx → app/parcours/[slug]/page.jsx

pages/blog/[slug].jsx → app/blog/[slug]/page.jsx

etc.

Configurer les métadonnées

remplacer <AlforisHead> global par export const metadata = { title, description } dans app/layout.jsx.

pour les pages qui ont besoin d’un titre spécifique, ajouter export const metadata = { title: 'Titre' } dans chaque page.jsx.

Supprimer le Pages Router

une fois que toutes les pages sont migrées et validées, supprimez le dossier pages/ (sauf pages/api/ si nécessaire).

retirez les fichiers _app.js et _document.js.

Ajuster vos imports

vérifiez que tous les liens <Link href="…"> pointent bien vers les nouvelles routes.

ajustez les chemins relatifs pour components/… et hooks/….

Nettoyer le CSS

gardez styles/globals.css et tailwind.config.js

vérifiez les @layer components pour vos boutons et safelist si besoin.

Tester et déboguer

démarrez le serveur (npm run dev)

visitez chaque page, testez la navigation, le scroll, les formulaires, les animations.

Supprimer le code obsolète

retirez ScrollManager, pages/_app.js, pages/_document.js, tout code de fallback Pages Router.

Lancer la build de production

bash
Copier
Modifier
npm run build && npm start
Vérifiez que toutes les routes fonctionnent, que la sitemap est mise à jour, et que le déploiement (Vercel, etc.) se passe sans erreur.



# Guide de Migration vers Next.js 13 App Router

Ce document décrit les étapes à suivre pour migrer votre projet Next.js existant (Pages Router) vers le nouveau App Router introduit dans Next.js 13.

---

## 1. Pré-requis

* Next.js 13 ou version supérieure installée
* Node.js 16+ recommandé
* Sauvegarde du projet actuel (branche Git dédiée)

---

## 2. Structure cible du projet

```plaintext
.
├── README.md
├── app
│   ├── layout.jsx            # Layout global
│   ├── page.jsx              # /       (ancien index)
│   ├── services
│   │   └── page.jsx          # /services
│   ├── approche
│   │   └── page.jsx          # /approche
│   ├── parcours
│   │   ├── page.jsx          # /parcours
│   │   └── [slug]/page.jsx   # /parcours/[slug]
│   └── …                     # autres routes
├── components
│   └── …                     # composants réutilisables
├── hooks
│   └── …                     # hooks personnalisés
├── public
│   └── …                     # assets statiques
├── styles
│   ├── globals.css           # styles globaux + Tailwind
│   └── …                     # autres CSS
├── next.config.js
├── tailwind.config.js
├── package.json
└── …
```

---

## 3. Étapes de migration

### 3.1. Créer le dossier `app/`

1. Créez un dossier `app/` à la racine du projet.
2. Déplacez ou créez le fichier de layout global :

   * `app/layout.jsx` : enveloppe `<html>`, `<body>`, `<ScrollRestoration />`, `<MobileScrollProgress />`, `<Navbar />`, `<Footer />`.

### 3.2. Migrer les pages statiques

Pour chaque page dans `pages/`, suivez :

* `pages/index.jsx` → `app/page.jsx`
* `pages/Services.jsx` → `app/services/page.jsx`
* `pages/ApprochePersonnalisee.jsx` → `app/approche/page.jsx`
* `pages/FAQ.jsx` → `app/faq/page.jsx`
* etc.

Prenez soin de :

* Adapter l’import de vos composants
* Remplacer `<Head>` ou `<AlforisHead>` par l’export `metadata` ou par un fichier `head.js` le cas échéant

### 3.3. Migrer les routes dynamiques

Pour chaque dossier dynamique :

* `pages/parcours/[slug].jsx` → `app/parcours/[slug]/page.jsx`
* `pages/blog/[slug].jsx` → `app/blog/[slug]/page.jsx`
* `pages/marketplace/[slug].jsx` → `app/marketplace/[slug]/page.jsx`

### 3.4. Supprimer le Pages Router obsolète

1. Une fois toutes les pages migrées et validées, supprimez :

   * le dossier `pages/` (sauf `pages/api/` si nécessaire)
   * les fichiers `pages/_app.js` et `pages/_document.js`
2. Vérifiez l’absence de toute référence à `pages/` dans `next.config.js` ou ailleurs.

### 3.5. Adapter les hooks de navigation et scroll

* Remplacez l’ancien `ScrollManager` par `<ScrollRestoration />` dans `app/layout.jsx`.
* Conservez ou migrez `MobileScrollProgress` dans le layout.
* Supprimez vos listeners `router.events` (Pages Router).

### 3.6. Mettre à jour les métadonnées

* Dans `app/layout.jsx`, exportez :

  ```js
  export const metadata = {
    title: 'Alforis',
    description: 'Découvrez notre approche patrimoniale sur mesure',
  }
  ```
* Pour des pages spécifiques, ajoutez un `export const metadata` dans chaque `page.jsx`.

### 3.7. Tester et valider

1. Lancez :

   ```bash
   npm run dev
   ```
2. Vérifiez chaque route :

   * URL renvoie la bonne page
   * Scroll-to-top est automatique et fluide
   * Composants (Navbar, Footer, progress bar) fonctionnent
   * Formulaires et interactions ne sont pas bloqués

### 3.8. Build de production

```bash
npm run build && npm start
```

* Assurez-vous que le déploiement (Vercel, etc.) se passe sans erreur.

---

## 4. Bonnes pratiques

* **Versions** : conservez une branche Git avant/après migration
* **Documentation** : tenez à jour votre `README.md` principal
* **Performance** : profitez des server components pour alléger le client
* **Sécurité** : réglez `scrollRestoration = 'manual'` si besoin

Bonne migration ! 🌟
