#!/bin/bash

PORT=3010

echo "🔍 Vérification du port $PORT..."

PID=$(lsof -t -i:$PORT)

if [ -n "$PID" ]; then
  echo "⚠️  Port $PORT déjà utilisé par le processus $PID. Suppression..."
  kill -9 $PID
  echo "✅ Processus $PID tué."
else
  echo "✅ Aucun processus ne bloque le port $PORT."
fi

echo "🎨 Mise à jour des couleurs à partir de tailwind.config.js..."

#!/bin/bash

echo "🧹 Suppression des fichiers .DS_Store..."

# Supprime tous les fichiers .DS_Store dans le dossier courant et ses sous-dossiers
find . -name ".DS_Store" -type f -delete

echo "✅ Tous les fichiers .DS_Store ont été supprimés."


node ./generate-colors.js

echo "🚀 Lancement du serveur sur le port $PORT..."
PORT=$PORT npm run dev
