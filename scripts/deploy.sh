#!/bin/bash
set -euo pipefail

# ----------- CONFIGURATION -----------
# Si besoin, modifiez ces variables en fonction de l’emplacement exact du projet :
PROJECT_DIR="/root/alforis"   # chemin vers votre dossier de projet sur le serveur
BRANCH="main"                 # branche à déployer
PM2_NAME="alforis-site"       # nom du process PM2

# ----------- DÉBUT DU SCRIPT -----------
echo "🟢 Début du déploiement depuis le serveur"

# 1. Aller dans le dossier du projet
echo "➡️  cd $PROJECT_DIR"
cd "$PROJECT_DIR"

# 2. S’assurer qu’on est sur la bonne branche et à jour
echo "📥 Récupération des dernières modifications depuis GitHub ($BRANCH)…"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
echo "✅ Code à jour (HEAD = origin/$BRANCH)"

# 3. Installer/mettre à jour les dépendances
echo "📦 Installation / mise à jour des dépendances…"
npm install --production=false
echo "✅ Dépendances OK"

# 4. Compiler / builder le projet
echo "🏗  Lancement de la compilation (npm run build)…"
npm run build
echo "✅ Build terminé"

# 5. (Re)Démarrage PM2
echo "🔄 Redémarrage de l’application avec PM2 (name: $PM2_NAME)…"
if pm2 list | grep -q "$PM2_NAME"; then
  pm2 restart "$PM2_NAME"
else
  pm2 start npm --name "$PM2_NAME" -- run start
fi
pm2 save
echo "✅ PM2 a redémarré $PM2_NAME"

echo "🟢 Déploiement terminé avec succès"
