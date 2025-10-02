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
NC='\033[0m' # No Color

# Verbose mode
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

run_quiet() {
  if [[ $VERBOSE -eq 1 ]]; then
    "$@" 2>&1 | tee -a "$LOGFILE"
    return "${PIPESTATUS[0]}"
  else
    "$@" >> "$LOGFILE" 2>&1
  fi
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

scp_quiet() {
  local exclude_opts=(
    --exclude='.git'
    --exclude='node_modules'
    --exclude='.next'
    --exclude='.env.local'
    --exclude='*.log'
    --exclude='.DS_Store'
  )
  
  if command -v rsync &> /dev/null; then
    log "Utilisation de rsync pour la copie"
    if [[ $VERBOSE -eq 1 ]]; then
      rsync -avz --progress "${exclude_opts[@]}" -e "ssh -i $SSH_KEY" . "$SERVER:$REMOTE_DIR" 2>&1 | tee -a "$LOGFILE"
      return "${PIPESTATUS[0]}"
    else
      rsync -az "${exclude_opts[@]}" -e "ssh -i $SSH_KEY" . "$SERVER:$REMOTE_DIR" >> "$LOGFILE" 2>&1
    fi
  else
    log "rsync non disponible, utilisation de scp"
    if [[ $VERBOSE -eq 1 ]]; then
      scp -i "$SSH_KEY" -r . "$SERVER:$REMOTE_DIR" 2>&1 | tee -a "$LOGFILE"
      return "${PIPESTATUS[0]}"
    else
      scp -q -i "$SSH_KEY" -r . "$SERVER:$REMOTE_DIR" >> "$LOGFILE" 2>&1
    fi
  fi
}

show_help() {
  cat <<EOF
${BLUE}Alforis Deployment Script${NC}

${GREEN}Usage:${NC} $0 [OPTIONS] <ACTION>

${GREEN}Options:${NC}
  -v        Verbose mode (affiche les détails)
  -h        Affiche cette aide

${GREEN}Actions:${NC}
  build     Build local du projet (npm run build)
  install   Installation des dépendances sur le serveur
  start     Démarrage/Redémarrage de l'app PM2
  stop      Arrêt de l'app PM2
  restart   Redémarrage de l'app PM2
  deploy    Déploiement complet (copie + install + build + restart)
  status    Affiche le statut PM2 et les infos du serveur
  logs      Affiche les logs PM2 en temps réel
  rollback  Annule le dernier déploiement (si backup disponible)

${GREEN}Variables d'environnement:${NC}
  SSH_KEY      Chemin vers la clé SSH (défaut: ~/.ssh/id_rsa_hetzner)
  SERVER       Serveur cible (défaut: root@159.69.108.234)
  REMOTE_DIR   Répertoire distant (défaut: /root/alforis)
  LOGFILE      Fichier de log (défaut: deploy.log)
  APP_NAME     Nom de l'app PM2 (défaut: alforis-site)

${GREEN}Exemples:${NC}
  $0 -v deploy          Déploiement complet en mode verbose
  $0 status             Vérifie le statut de l'application
  $0 logs               Suit les logs en temps réel
EOF
}

check_dependencies() {
  local missing=()
  
  for cmd in npm ssh scp; do
    if ! command -v "$cmd" &> /dev/null; then
      missing+=("$cmd")
    fi
  done
  
  if [[ ${#missing[@]} -gt 0 ]]; then
    print_error "Commandes manquantes : ${missing[*]}"
    exit 3
  fi
}

create_backup() {
  log "Création d'un backup avant déploiement"
  local backup_name="backup_$(date +%Y%m%d_%H%M%S)"
  
  if ssh_quiet "cd $(dirname "$REMOTE_DIR") && [ -d '$REMOTE_DIR' ] && cp -r '$REMOTE_DIR' '${REMOTE_DIR}_${backup_name}'"; then
    log "Backup créé : ${REMOTE_DIR}_${backup_name}"
    echo "$backup_name" > .last_backup
    return 0
  else
    print_warning "Impossible de créer le backup (répertoire inexistant?)"
    return 1
  fi
}

# -------------------- CHECKS ---------------------
# Parse options first
while getopts "vh" opt; do
  case $opt in
    v) VERBOSE=1 ;;
    h) show_help; exit 0 ;;
    *) show_help; exit 1 ;;
  esac
done
shift $((OPTIND-1))

if [ "$(whoami)" = "root" ] && [ -n "${SSH_CONNECTION-}" ]; then
  print_error "Vous êtes déjà sur le serveur ! Lancez ce script depuis votre poste local."
  exit 1
fi

if [[ $# -lt 1 ]]; then
  show_help
  exit 0
fi

ACTION="$1"
shift

check_dependencies

# Vérification de la clé SSH
if [[ ! -f "$SSH_KEY" ]]; then
  print_error "Clé SSH introuvable : $SSH_KEY"
  exit 2
fi

# Test de connexion SSH
print_info "Test de la connexion SSH..."
if ! ssh_cmd 'exit' 2>/dev/null; then
  print_error "Connexion SSH impossible avec $SERVER (clé : $SSH_KEY)"
  print_info "Vérifiez que la clé est correcte et que le serveur est accessible"
  exit 2
fi
print_success "Connexion SSH OK"

# ------------------- ACTIONS ---------------------
case "$ACTION" in
  build)
    print_info "Build local du projet"
    log "🔨 Build local"
    if run_quiet npm run build; then
      print_success "Build réussi"
    else
      print_error "Build échoué (voir $LOGFILE)"
      exit 10
    fi
    ;;

  install)
    print_info "Installation des dépendances sur le serveur"
    log "📥 Installation des dépendances"
    if ssh_quiet "cd '$REMOTE_DIR' && npm ci --omit=dev"; then
      print_success "Dépendances installées"
    else
      print_error "Échec de l'installation (voir $LOGFILE)"
      exit 12
    fi
    ;;

  start)
    print_info "Démarrage de l'application"
    log "🚀 Démarrage de l'app"
    if ssh_quiet "cd '$REMOTE_DIR' && pm2 start npm --name '$APP_NAME' -- run start && pm2 save"; then
      print_success "Application démarrée"
    else
      print_error "Échec du démarrage (voir $LOGFILE)"
      exit 11
    fi
    ;;

  stop)
    print_info "Arrêt de l'application"
    log "🛑 Arrêt de l'app"
    if ssh_quiet "pm2 stop '$APP_NAME'"; then
      print_success "Application arrêtée"
    else
      print_error "Échec de l'arrêt (voir $LOGFILE)"
      exit 11
    fi
    ;;

  restart)
    print_info "Redémarrage de l'application"
    log "🔄 Redémarrage de l'app"
    if ssh_quiet "pm2 restart '$APP_NAME' || (cd '$REMOTE_DIR' && pm2 start npm --name '$APP_NAME' -- run start && pm2 save)"; then
      print_success "Application redémarrée"
    else
      print_error "Échec du redémarrage (voir $LOGFILE)"
      exit 11
    fi
    ;;

  deploy)
    print_info "Déploiement complet sur le serveur"
    log "📤 Début du déploiement"
    
    # Backup
    create_backup || true
    
    # Copie des fichiers
    print_info "Copie des fichiers..."
    if ! scp_quiet; then
      print_error "Échec de la copie (voir $LOGFILE)"
      exit 13
    fi
    print_success "Fichiers copiés"
    
    # Installation, build et restart
    print_info "Installation des dépendances..."
    if ! ssh_quiet "cd '$REMOTE_DIR' && npm ci --omit=dev"; then
      print_error "Échec de l'installation (voir $LOGFILE)"
      exit 14
    fi
    print_success "Dépendances installées"
    
    print_info "Build distant..."
    if ! ssh_quiet "cd '$REMOTE_DIR' && npm run build"; then
      print_error "Échec du build distant (voir $LOGFILE)"
      exit 15
    fi
    print_success "Build réussi"
    
    print_info "Redémarrage de l'application..."
    if ssh_quiet "pm2 restart '$APP_NAME' || (cd '$REMOTE_DIR' && pm2 start npm --name '$APP_NAME' -- run start && pm2 save)"; then
      print_success "Déploiement terminé avec succès !"
      log "✅ Déploiement complet terminé"
    else
      print_error "Échec du redémarrage (voir $LOGFILE)"
      exit 16
    fi
    ;;

  status)
    print_info "Récupération du statut"
    log "📋 Vérification du statut"
    ssh_cmd "cd '$REMOTE_DIR' && echo '=== PM2 Status ===' && pm2 status && echo && echo '=== Disk Usage ===' && df -h '$REMOTE_DIR' && echo && echo '=== Directory Info ===' && ls -lh"
    ;;

  logs)
    print_info "Affichage des logs (Ctrl+C pour quitter)"
    ssh_cmd "pm2 logs '$APP_NAME'"
    ;;

  rollback)
    if [[ ! -f .last_backup ]]; then
      print_error "Aucun backup trouvé. Impossible de faire un rollback."
      exit 20
    fi
    
    local backup_name
    backup_name=$(cat .last_backup)
    print_warning "Rollback vers le backup : $backup_name"
    read -rp "Confirmer le rollback ? (y/N) " confirm
    
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
      if ssh_quiet "cd $(dirname '$REMOTE_DIR') && rm -rf '$REMOTE_DIR' && mv '${REMOTE_DIR}_${backup_name}' '$REMOTE_DIR' && pm2 restart '$APP_NAME'"; then
        print_success "Rollback effectué"
        rm .last_backup
      else
        print_error "Échec du rollback"
        exit 21
      fi
    else
      print_info "Rollback annulé"
    fi
    ;;

  *)
    print_error "Action inconnue : $ACTION"
    echo
    show_help
    exit 1
    ;;
esac

exit 0