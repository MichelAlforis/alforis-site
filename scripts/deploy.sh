#!/bin/bash

# Message de commit
echo "Entrez le message de commit :"
read COMMIT_MSG

# Étapes Git
echo "📦 Ajout des fichiers..."
git add .

echo "📝 Commit en cours..."
git commit -m "$COMMIT_MSG"

echo "⬆️ Push vers Git..."
git push

# Déploiement Vercel
echo "🚀 Déploiement Vercel en production..."
# npx vercel --prod

echo "✅ Déploiement terminé."
