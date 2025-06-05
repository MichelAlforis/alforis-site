# 🧭 Alforis – Cabinet de Conseil Patrimonial

Bienvenue dans le dépôt officiel du site [Alforis](https://www.alforis.fr), cabinet de design de trajectoire de vie fondé par Michel Marques.  
Ce site présente l’approche humaine, introspective et indépendante d’Alforis à travers des articles, des profils de vie, et des solutions patrimoniales sur mesure.

---

## 🚀 Déploiement

Le site est déployé automatiquement via [Vercel](https://vercel.com/), depuis la branche `main`.  
🟢 Chaque `git push` déclenche une mise à jour en production.
✨ Nouvelle page `/prendre-rendez-vous` : sélection fluide du type de rendez-vous (appel, visio, patrimonial), avec intégration dynamique Cal.com et mini-navigation contextuelle.

---

## 🧱 Stack technique

- **Next.js 15.3.1**
- **React**
- **Tailwind CSS**
- **Node.js**
- **Vercel** (hébergement)
- **Airtable API** (gestion de données dynamique)

---

## 📁 Structure

```bash
.
├── content/             # Contenu des articles, profils, parcours
│   ├── blog/
│   ├── parcours/
│   └── studio/
├── pages/               # Routes Next.js
│   ├── blog/[slug].jsx
│   ├── parcours/[slug].jsx
│   ├── studio/[slug].jsx
│   └── index.jsx
├── components/          # Composants réutilisables
├── lib/                 # Logique serveur et utilitaires
├── public/              # Assets statiques
├── styles/              # Fichiers CSS
└── ...

⚙️ Scripts utiles

npm install          # Installation des dépendances
npm run dev          # Démarrage en mode développement
npm run build        # Build de production
npm run start        # Serveur local de production

📬 Contact
Développé par Michel Marques
Pour toute contribution ou suggestion, ouvrez une issue ou contactez l’équipe.

© 2025 Alforis. Tous droits réservés.
