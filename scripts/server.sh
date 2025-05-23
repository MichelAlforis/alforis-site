#!/usr/bin/env bash
set -euo pipefail

# CONFIGURATION
SSH_KEY="$HOME/.ssh/id_rsa_hetzner"
SERVER="root@159.69.108.234"
REMOTE_DIR="/root/alforis"

# Fonction utilitaire : exécute une commande sur le serveur
run_remote() {
  ssh -i "$SSH_KEY" "$SERVER" "cd $REMOTE_DIR && $*"
}

# Vérifie qu'on a un argument
if [ $# -lt 1 ]; then
  echo "Usage: $0 {build|start|deploy}"
  exit 1
fi

ACTION=$1
shift

case "$ACTION" in
  build)
    echo "🔨  Build local"
    npm run build
    ;;

  start)
    echo "🚀  Démarrage de l'app sur le serveur"
    run_remote "pm2 start npm --name alforis-site -- run start && pm2 save"
    ;;

  deploy)
    echo "📤  Déploiement sur le serveur"
    echo "   • Copie des fichiers..."
    scp -i "$SSH_KEY" -r . "$SERVER:$REMOTE_DIR"
    echo "   • Installation & build & redémarrage distant..."
    run_remote "npm install && npm run build && pm2 restart alforis-site || pm2 start npm --name alforis-site -- run start; pm2 save"
    ;;

  *)
    echo "❌  Action inconnue : $ACTION"
    echo "    Usage: $0 {build|start|deploy}"
    exit 1
    ;;
esac
