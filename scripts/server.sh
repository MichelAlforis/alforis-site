#!/usr/bin/env bash
set -euo pipefail

# -------------------- CONFIG --------------------
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_rsa_hetzner}"
SERVER="${SERVER:-root@159.69.108.234}"
REMOTE_DIR="${REMOTE_DIR:-/root/alforis}"
LOGFILE="${LOGFILE:-deploy.log}"
APP_NAME="${APP_NAME:-alforis-site}"

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

VERBOSE=0

# -------------------- UTILS ---------------------
print_error()   { echo -e "${RED}❌ $*${NC}" >&2; }
print_success() { echo -e "${GREEN}✅ $*${NC}"; }
print_info()    { echo -e "${BLUE}ℹ️  $*${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $*${NC}"; }

log() { 
  local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $*"
  [[ $VERBOSE -eq 1 ]] && echo "$msg"
  echo "$msg" >> "$LOGFILE"
}

ssh_cmd() {
  ssh -i "$SSH_KEY" -o BatchMode=yes -o ConnectTimeout=10 "$SERVER" "$@"
}

ssh_quiet() {
  if [[ $VERBOSE -eq 1 ]]; then
    ssh_cmd "$@" 2>&1 | tee -a "$LOGFILE"
    return "${PIPESTATUS[0]}"
  else
    ssh_cmd "$@" >> "$LOGFILE" 2>&1
  fi
}

show_help() {
  cat <<EOF
${BLUE}Alforis Deployment Script (Git Workflow)${NC}

${GREEN}Usage:${NC} $0 [OPTIONS] <ACTION>

${GREEN}Options:${NC}
  -v        Verbose mode
  -h        Affiche cette aide

${GREEN}Actions:${NC}
  push      Commit local + push vers GitHub
  pull      Pull depuis GitHub sur le serveur
  deploy    Workflow complet : push local → pull serveur → build → restart
  build     Build local du projet
  install   Installation des dépendances sur le serveur
  restart   Redémarrage de l'app PM2
  status    Statut PM2 et infos serveur
  logs      Logs PM2 en temps réel

${GREEN}Workflow recommandé:${NC}
  1. Développer en local
  2. $0 deploy          (push → pull → build → restart automatique)
  3. $0 logs            (vérifier que tout fonctionne)
EOF
}

check_dependencies() {
  local missing=()
  for cmd in git npm ssh; do
    if ! command -v "$cmd" &> /dev/null; then
      missing+=("$cmd")
    fi
  done
  
  if [[ ${#missing[@]} -gt 0 ]]; then
    print_error "Commandes manquantes : ${missing[*]}"
    exit 3
  fi
}

# -------------------- PARSE OPTIONS ---------------------
while getopts "vh" opt; do
  case $opt in
    v) VERBOSE=1 ;;
    h) show_help; exit 0 ;;
    *) show_help; exit 1 ;;
  esac
done
shift $((OPTIND-1))

if [[ $# -lt 1 ]]; then
  show_help
  exit 0
fi

ACTION="$1"
shift

check_dependencies

# Test SSH
if [[ ! -f "$SSH_KEY" ]]; then
  print_error "Clé SSH introuvable : $SSH_KEY"
  exit 2
fi

print_info "Test connexion SSH..."
if ! ssh_cmd 'exit' 2>/dev/null; then
  print_error "Connexion SSH impossible"
  exit 2
fi
print_success "Connexion SSH OK"

# ------------------- ACTIONS ---------------------
case "$ACTION" in
  push)
    print_info "Commit et push vers GitHub"
    log "📤 Push vers GitHub"
    
    # Vérifier s'il y a des changements
    if git diff-index --quiet HEAD --; then
      print_warning "Aucun changement à commiter"
    else
      # Demander le message de commit
      read -rp "Message de commit: " commit_msg
      if [[ -z "$commit_msg" ]]; then
        commit_msg="Update $(date '+%Y-%m-%d %H:%M')"
      fi
      
      git add .
      git commit -m "$commit_msg"
    fi
    
    git push origin main
    print_success "Push effectué"
    ;;

  pull)
    print_info "Pull depuis GitHub sur le serveur"
    log "📥 Pull sur serveur"
    
    if ssh_quiet "cd '$REMOTE_DIR' && git pull origin main"; then
      print_success "Pull effectué"
    else
      print_error "Échec du pull"
      exit 10
    fi
    ;;

  deploy)
    print_info "Déploiement complet (push → pull → build → restart)"
    log "🚀 Déploiement complet"
    
    # 1. Push local vers GitHub
    print_info "Étape 1/4 : Push vers GitHub"
    if git diff-index --quiet HEAD --; then
      print_warning "Aucun changement local à commiter"
    else
      read -rp "Message de commit: " commit_msg
      if [[ -z "$commit_msg" ]]; then
        commit_msg="Deploy $(date '+%Y-%m-%d %H:%M')"
      fi
      git add .
      git commit -m "$commit_msg"
    fi
    
    if ! git push origin main; then
      print_error "Échec du push"
      exit 11
    fi
    print_success "Push OK"
    
    # 2. Pull sur serveur
    print_info "Étape 2/4 : Pull sur le serveur"
    if ! ssh_quiet "cd '$REMOTE_DIR' && git pull origin main"; then
      print_error "Échec du pull"
      exit 12
    fi
    print_success "Pull OK"
    
    # 3. Install + Build
    print_info "Étape 3/4 : Installation et build"
    if ! ssh_quiet "cd '$REMOTE_DIR' && npm install && npm run build"; then
      print_error "Échec du build"
      exit 13
    fi
    print_success "Build OK"
    
    # 4. Restart PM2
    print_info "Étape 4/4 : Redémarrage PM2"
    if ! ssh_quiet "pm2 restart '$APP_NAME' && pm2 save"; then
      print_error "Échec du restart"
      exit 14
    fi
    print_success "Redémarrage OK"
    
    print_success "✨ Déploiement terminé avec succès !"
    print_info "Vérifiez les logs avec: $0 logs"
    ;;

  build)
    print_info "Build local"
    if npm run build; then
      print_success "Build local réussi"
    else
      print_error "Build local échoué"
      exit 15
    fi
    ;;

  install)
    print_info "Installation des dépendances sur le serveur"
    if ssh_quiet "cd '$REMOTE_DIR' && npm install"; then
      print_success "Installation OK"
    else
      print_error "Installation échouée"
      exit 16
    fi
    ;;

  restart)
    print_info "Redémarrage PM2"
    if ssh_quiet "pm2 restart '$APP_NAME' && pm2 save"; then
      print_success "Redémarrage OK"
    else
      print_error "Redémarrage échoué"
      exit 17
    fi
    ;;

  status)
    print_info "Statut du serveur"
    ssh_cmd "cd '$REMOTE_DIR' && echo '=== PM2 ===' && pm2 status && echo && echo '=== Git ===' && git log -1 --oneline && echo && echo '=== Disk ===' && df -h '$REMOTE_DIR'"
    ;;

  logs)
    print_info "Logs PM2 (Ctrl+C pour quitter)"
    ssh_cmd "pm2 logs '$APP_NAME'"
    ;;

  *)
    print_error "Action inconnue : $ACTION"
    show_help
    exit 1
    ;;
esac

exit 0