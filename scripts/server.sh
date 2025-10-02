#!/usr/bin/env bash
set -euo pipefail

# -------------------- CONFIG --------------------
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_rsa_hetzner}"
SERVER="${SERVER:-root@159.69.108.234}"
REMOTE_DIR="${REMOTE_DIR:-/root/alforis}"
LOGFILE="${LOGFILE:-deploy.log}"

# --- Colors ---
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verbose mode
VERBOSE=0
if [[ "${1:-}" == "-v" ]]; then VERBOSE=1; shift; fi

# -------------------- UTILS ---------------------
print_error() { echo -e "${RED}$*${NC}" >&2; }
log()         { [[ $VERBOSE -eq 1 ]] && echo "$*"; echo "$*" >> "$LOGFILE"; }
run_quiet()   { "$@" >> "$LOGFILE" 2>&1; }
ssh_quiet()   { ssh -i "$SSH_KEY" "$SERVER" "$@" >> "$LOGFILE" 2>&1; }
scp_quiet()   { scp -q -i "$SSH_KEY" -r . "$SERVER:$REMOTE_DIR" >> "$LOGFILE" 2>&1; }

show_help() {
  cat <<EOF
Usage: $0 [-v] {build|install|start|deploy|status}
  -v        Verbose mode (echo success messages)
  -h        Show this help
Actions:
  build     Build local project (npm run build)
  install   Install dependencies on the server (npm install)
  start     Start/Restart PM2 app on server
  deploy    Push & full-restart (install/build/restart)
  status    Show PM2/app status on server
Configurable via env: SSH_KEY, SERVER, REMOTE_DIR, LOGFILE
EOF
}

# -------------------- CHECKS ---------------------
if [ "$(whoami)" = "root" ] && [ -n "${SSH_CONNECTION-}" ]; then
  print_error "❌ Vous êtes déjà sur le serveur ! Lancez ce script depuis votre poste local."
  exit 1
fi

if [[ $# -lt 1 ]] || [[ "$1" == "-h" ]]; then
  show_help
  exit 0
fi

ACTION="$1"; shift

# Test SSH connection first, fail fast
if ! ssh -i "$SSH_KEY" -o BatchMode=yes -o ConnectTimeout=5 "$SERVER" 'exit' 2>/dev/null; then
  print_error "❌ Connexion SSH impossible avec $SERVER (clé : $SSH_KEY)"
  exit 2
fi

# ------------------- ACTIONS ---------------------
case "$ACTION" in
  build)
    log "🔨 Build local"
    if run_quiet npm run build; then
      log "✅ Build réussi"
    else
      print_error "❌ Build échoué"
      exit 10
    fi
    ;;

  install)
    log "📥 Installation des dépendances sur le serveur"
    if ssh_quiet "cd $REMOTE_DIR && npm install"; then
      log "✅ Dépendances installées"
    else
      print_error "❌ Échec de l'installation distante"
      exit 12
    fi
    ;;

  start)
    log "🚀 (Re)démarrage distant de l’application"
    if ssh_quiet "cd $REMOTE_DIR && pm2 start npm --name alforis-site -- run start && pm2 save"; then
      log "✅ PM2 redémarré"
    else
      print_error "❌ PM2 non redémarré"
      exit 11
    fi
    ;;

  deploy)
    log "📤 Déploiement sur le serveur"
    log "• Copie des fichiers…"
    if scp_quiet; then
      log "• Fichiers copiés"
    else
      print_error "❌ Échec de la copie SCP"
      exit 13
    fi
    log "• Installation, build & (re)démarrage…"
    if ssh_quiet "cd $REMOTE_DIR && npm install && npm run build && pm2 restart alforis-site || pm2 start npm --name alforis-site -- run start; pm2 save"; then
      log "✅ Déploiement terminé"
    else
      print_error "❌ Échec du déploiement distant"
      exit 14
    fi
    ;;

  status)
    log "📋 Statut distant PM2/app"
    ssh_quiet "cd $REMOTE_DIR && pm2 status && ls -lh"
    ;;

  *)
    print_error "❌ Action inconnue : $ACTION"
    show_help
    exit 1
    ;;
esac
