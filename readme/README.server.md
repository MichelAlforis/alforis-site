# Projet Alforis

Ce document détaille l’architecture, les accès et les procédures de déploiement pour le projet **Alforis**.

---

## 📦 Structure du projet

```bash
Alforis-V7.0/          # Répo local
├── .github/            # Workflows GitHub Actions
│   └── workflows/
│       └── deploy.yml # Déploiement SSH vers le VPS
├── app/                # Sources Next.js
├── public/             # Assets statiques
├── next.config.mjs     # Config Next.js (ESM + MDX + remark-gfm)
├── package.json        # Dépendances & scripts
├── .env.local          # Variables d’environnement (non versionné)
└── README.md           # Document info + procédures
```

---

## 🔑 Accès & identifiants

### 1. GitHub

* **Dépôt** : `https://github.com/MichelAlforis/alforis-site.git`
* **Branches** :

  * `main` → Production
  * `develop` → Staging / Previews
* **Secrets** (Settings → Secrets → Actions) :

  * `API_KEY` : Clé API de l’application
  * `NEXT_PUBLIC_API_URL` : URL back-end publique
  * `SSH_PRIVATE_KEY` : Clé privée SSH (déploiement VPS)

### 2. Vercel (Preview & Prod)

* **Projet** : Alforis-site
* **Connecté à** : branche `main` (production) et PRs (preview)
* **Env. variables** (Settings → Environment) :

  * `API_KEY`              (production)
  * `NEXT_PUBLIC_API_URL`  (production)

---

## 🖥️ Serveur Hetzner (Production)

* **Type** : CPX11 (1 vCPU, 2 Go RAM, 40 Go SSD)
* **Région** : Falkenstein (DE)
* **IP publique** : `159.69.108.234`
* **Utilisateur** : `root`
* **Accès SSH** :

  ```bash
  ssh -i ~/.ssh/id_rsa_hetzner root@159.69.108.234
  ```
* **Pare-feu** (UFW) : ports 22, 80, 443 ouverts
* **Node.js** : v18.x
* **Process manager** : PM2 (`alforis-site`)

---

## ⚙️ Installation et déploiement manuel

1. **Connexion SSH** :

   ```bash
   ssh -i ~/.ssh/id_rsa_hetzner root@159.69.108.234
   ```
2. **Cloner/Déploiement** :

   ```bash
   cd /root
   git clone https://github.com/MichelAlforis/alforis-site.git alforis
   cd alforis
   npm install
   ```
3. **Variables d’environnement** :

   ```bash
   cat << 'EOF' > .env.local
   API_KEY=ta_cle
   NEXT_PUBLIC_API_URL=https://api.alforis.fr
   EOF
   ```
4. **Build + Démarrage** :

   ```bash
   npm run build
   pm2 start npm --name alforis-site -- run start
   pm2 save
   ```
5. **Logs & statut** :

   ```bash
   pm2 logs alforis-site
   pm2 status
   ```

---

## 🤖 Déploiement automatique (GitHub Actions)

### Workflow: `.github/workflows/deploy.yml`

```yaml
name: Déploiement SSH
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Générer .env.local
        run: |
          echo "API_KEY=${{ secrets.API_KEY }}" > .env.local
          echo "NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }}" >> .env.local
      - name: Préparer la clé SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan 159.69.108.234 >> ~/.ssh/known_hosts
      - name: Copier le code
        run: scp -i ~/.ssh/id_rsa -r . root@159.69.108.234:/root/alforis
      - name: Redémarrer l’app
        run: |
          ssh -i ~/.ssh/id_rsa root@159.69.108.234 << 'EOF'
            cd /root/alforis
            npm install
            npm run build
            pm2 restart alforis-site || pm2 start npm --name alforis-site -- run start
            pm2 save
          EOF
    env:
      NODE_ENV: production
```

* **Trigger** : Push sur `main`
* **Actions** : build + transfert + PM2 restart sur le VPS

---

## 📚 Documentation & Liens utiles

* **Next.js** : [https://nextjs.org/docs](https://nextjs.org/docs)
* **MDX + remark-gfm** : [https://github.com/remarkjs/remark-gfm](https://github.com/remarkjs/remark-gfm)
* **GitHub Actions** : [https://docs.github.com/actions](https://docs.github.com/actions)
* **Hetzner Cloud** : [https://console.hetzner.cloud](https://console.hetzner.cloud)

---

> Garder toujours **GitHub** comme source unique de vérité : aucun changement direct en prod sans PR & merge sur `main`.
>
> Bonne dev et bons déploiements ! 🚀
