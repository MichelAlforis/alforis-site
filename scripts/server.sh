#!/usr/bin/env bash
set -euo pipefail

# -------------------- CONFIG --------------------
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_rsa_hetzner}"
SERVER="${SERVER:-root@159.69.108.234}"
REMOTE_DIR="${REMOTE_DIR:-/root/alforis}"
LOGFILE="${LOGFILE:-deploy.log}"
APP_NAME="${APP_NAME:-alforis-site}"
PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"
LOCKFILE="/tmp/.alforis-deploy.lock"

# --- Colors ---
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
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
  ssh -i "$SSH_KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o ConnectTimeout=10 "$SERVER" "$@"
}

ssh_quiet() {
  if [[ $VERBOSE -eq 1 ]]; then
    ssh_cmd "$@" 2>&1 | tee -a "$LOGFILE"
    return "${PIPESTATUS[0]}"
  else
    ssh_cmd "$@" >> "$LOGFILE" 2>&1
  fi
}

scp_cmd() {
  scp -i "$SSH_KEY" -o BatchMode=yes -o IdentitiesOnly=yes "$@"
}

show_last_log() {
  echo -e "\n--- Dernières lignes du log ($LOGFILE) ---"
  tail -n 120 "$LOGFILE" || true
  echo -e "--- fin log ---\n"
}

show_help() {
  cat <<EOF
${BLUE}Alforis Deployment Script (Git + PM2)${NC}

${GREEN}Usage:${NC} $0 [OPTIONS] <ACTION>

${GREEN}Options:${NC}
  -v        Verbose mode
  -h        Affiche cette aide

${GREEN}Actions:${NC}
  push         Commit local + push vers GitHub
  pull         Pull depuis GitHub sur le serveur (force reset)
  env          Copier .env.local vers le serveur
  pm2-setup    Uploader ecosystem.config.js et (re)lancer via PM2
  deploy       push → pull → env → install+build → pm2 (start/restart)
  build        Build local du projet
  install      Installation des dépendances sur le serveur
  restart      Redémarrage PM2 (avec fallback start si absent)
  rollback     Revenir au commit précédent
  status       Statut PM2 et infos serveur
  logs         Logs PM2 en temps réel
  healthcheck  Vérifier que l'app répond

${GREEN}Scripts npm:${NC}
  npm run server              Affiche l'aide
  npm run deploy              Déploiement complet (verbose)
  npm run deploy:status       Statut du serveur
  npm run deploy:logs         Logs en temps réel
  npm run deploy:rollback     Rollback au commit précédent
EOF
}

check_dependencies() {
  local missing=()
  for cmd in git npm ssh scp; do
    command -v "$cmd" >/dev/null 2>&1 || missing+=("$cmd")
  done
  if [[ ${#missing[@]} -gt 0 ]]; then
    print_error "Commandes manquantes : ${missing[*]}"
    exit 3
  fi
}

acquire_lock() {
  if [[ -f "$LOCKFILE" ]]; then
    local lock_age=$(($(date +%s) - $(stat -f %m "$LOCKFILE" 2>/dev/null || stat -c %Y "$LOCKFILE" 2>/dev/null)))
    if [[ $lock_age -lt 1800 ]]; then
      print_error "Déploiement déjà en cours (lock actif depuis ${lock_age}s)"
      print_info "Si c'est un lock obsolète, supprimez : $LOCKFILE"
      exit 99
    else
      print_warning "Lock obsolète détecté (${lock_age}s), je le supprime"
      rm -f "$LOCKFILE"
    fi
  fi
  touch "$LOCKFILE"
  trap 'rm -f "$LOCKFILE"' EXIT INT TERM
}

healthcheck() {
  print_info "Healthcheck sur http://localhost:$PORT/"
  sleep 3
  if ssh_cmd "curl -f -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/ | grep -q '^[23]'"; then
    print_success "Application opérationnelle"
    return 0
  else
    print_error "L'application ne répond pas correctement"
    return 1
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

if [[ $# -lt 1 ]]; then show_help; exit 0; fi
ACTION="$1"; shift

check_dependencies

# Test SSH
if [[ ! -f "$SSH_KEY" ]]; then
  print_error "Clé SSH introuvable : $SSH_KEY"
  exit 2
fi

print_info "Test connexion SSH..."
if ! ssh_cmd 'exit' 2>/dev/null; then
  print_error "Connexion SSH impossible (clé non utilisée ou refusée)."
  exit 2
fi
print_success "Connexion SSH OK"

# ------------------- ACTIONS ---------------------
case "$ACTION" in
  push)
    print_info "Commit et push vers GitHub"
    log "📤 Push vers GitHub"
    if git diff-index --quiet HEAD --; then
      print_warning "Aucun changement à commiter"
    else
      read -rp "Message de commit: " commit_msg
      [[ -z "$commit_msg" ]] && commit_msg="Update $(date '+%Y-%m-%d %H:%M')"
      git add .
      git commit -m "$commit_msg"
    fi
    git push origin main
    print_success "Push effectué"
    ;;

  pull)
    print_info "Pull depuis GitHub sur le serveur (force reset)"
    log "📥 Pull sur serveur"
    ssh_quiet "mkdir -p '$REMOTE_DIR'"
    
    # Sauvegarde du commit actuel
    CURRENT_COMMIT=$(ssh_cmd "cd '$REMOTE_DIR' 2>/dev/null && git rev-parse HEAD 2>/dev/null || echo 'none'")
    echo "$CURRENT_COMMIT" > .last_deploy_commit
    
    if ssh_quiet "cd '$REMOTE_DIR' && git fetch origin main && git reset --hard origin/main"; then
      print_success "Pull effectué (force reset)"
    else
      print_error "Échec du pull"
      exit 10
    fi
    ;;

  env)
    print_info "Copie de .env.local vers le serveur"
    if [[ ! -f ".env.local" ]]; then
      print_warning ".env.local introuvable en local — étape ignorée."
      exit 0
    fi
    
    # Validation des variables critiques
    if ! grep -q "DATABASE_URL\|NEXT_PUBLIC" .env.local 2>/dev/null; then
      print_warning "Aucune variable DATABASE_URL ou NEXT_PUBLIC trouvée"
    fi
    
    scp_cmd ".env.local" "$SERVER:$REMOTE_DIR/.env.local" \
      && print_success ".env.local copié" \
      || { print_error "Échec copie .env.local (clé non utilisée ?)"; exit 20; }
    ;;

  pm2-setup)
    print_info "PM2 setup avec ecosystem.config.js"
    if [[ -f "ecosystem.config.js" ]]; then
      scp_cmd "ecosystem.config.js" "$SERVER:$REMOTE_DIR/ecosystem.config.js" \
        || { print_error "Échec upload ecosystem.config.js"; exit 21; }
    else
      print_warning "ecosystem.config.js introuvable en local — je génère côté serveur."
      ssh_quiet "cat > '$REMOTE_DIR/ecosystem.config.js' <<'EOF'
module.exports = {
  apps: [
    {
      name: \"$APP_NAME\",
      script: \"node_modules/next/dist/bin/next\",
      args: \"start -p $PORT -H $HOST\",
      cwd: \"$REMOTE_DIR\",
      env: { NODE_ENV: \"production\" },
      watch: false,
      autorestart: true,
      max_restarts: 10
    }
  ]
}
EOF"
    fi
    
    if ssh_quiet "cd '$REMOTE_DIR' && pm2 start ecosystem.config.js --only '$APP_NAME' || pm2 restart '$APP_NAME'"; then
      ssh_quiet "pm2 save"
      print_success "PM2 démarré/actu avec ecosystem.config.js"
    else
      print_error "Échec PM2 setup"
      exit 22
    fi
    ;;

  deploy)
    acquire_lock
    print_info "Déploiement complet : push → pull → env → build → pm2"
    log "🚀 Déploiement complet"
    DEPLOY_START=$(date +%s)

    # 1/5 Push
    print_info "Étape 1/5 : Push GitHub"
    if git diff-index --quiet HEAD --; then
      print_warning "Aucun changement local à commiter"
    else
      read -rp "Message de commit: " commit_msg
      [[ -z "$commit_msg" ]] && commit_msg="Deploy $(date '+%Y-%m-%d %H:%M')"
      git add . && git commit -m "$commit_msg"
    fi
    git push origin main || { print_error "Échec du push"; exit 11; }
    print_success "Push OK"

    # 2/5 Pull
    print_info "Étape 2/5 : Pull serveur"
    ssh_quiet "mkdir -p '$REMOTE_DIR'"
    
    # Sauvegarde pour rollback
    PREVIOUS_COMMIT=$(ssh_cmd "cd '$REMOTE_DIR' 2>/dev/null && git rev-parse HEAD 2>/dev/null || echo 'none'")
    echo "$PREVIOUS_COMMIT" > .last_deploy_commit
    
    ssh_quiet "cd '$REMOTE_DIR' && git fetch origin main && git reset --hard origin/main" \
      || { print_error "Échec du pull"; exit 12; }
    print_success "Pull OK"

    # 3/5 Env
    print_info "Étape 3/5 : Copie .env.local"
    if [[ -f ".env.local" ]]; then
      scp_cmd ".env.local" "$SERVER:$REMOTE_DIR/.env.local" \
        || { print_error "Échec copie .env.local"; exit 20; }
      print_success ".env.local copié"
    else
      print_warning ".env.local absent en local — je continue."
    fi

    # 4/5 Install + Build
    print_info "Étape 4/5 : Installation et build"
    if ! ssh_quiet "cd '$REMOTE_DIR' && (npm ci --no-audit --no-fund || npm install) && NODE_ENV=production npm run build"; then
      print_error "Échec du build"
      show_last_log
      print_warning "Utilisez 'npm run deploy:rollback' pour revenir à l'état précédent"
      exit 13
    fi
    print_success "Build OK"

    # 5/5 PM2
    print_info "Étape 5/5 : PM2 start/restart"
    if [[ -f "ecosystem.config.js" ]]; then
      scp_cmd "ecosystem.config.js" "$SERVER:$REMOTE_DIR/ecosystem.config.js" || true
    fi
    
    if ! ssh_quiet "cd '$REMOTE_DIR' && (pm2 describe '$APP_NAME' >/dev/null 2>&1 && pm2 restart '$APP_NAME' --update-env || pm2 start ecosystem.config.js --only '$APP_NAME') && pm2 save"; then
      print_error "Échec du restart PM2"
      exit 14
    fi
    print_success "Redémarrage OK"

    # Healthcheck
    if healthcheck; then
      DEPLOY_DURATION=$(($(date +%s) - DEPLOY_START))
      print_success "✨ Déploiement terminé avec succès en ${DEPLOY_DURATION}s !"
      print_info "Vérifiez les logs avec: npm run deploy:logs"
    else
      print_warning "Déploiement terminé mais healthcheck échoué"
      print_info "Consultez les logs: npm run deploy:logs"
    fi
    ;;

  build)
    print_info "Build local"
    npm run build && print_success "Build local réussi" || { print_error "Build local échoué"; exit 15; }
    ;;

  install)
    print_info "Installation des dépendances sur le serveur"
    ssh_quiet "cd '$REMOTE_DIR' && (npm ci --no-audit --no-fund || npm install)" \
      && print_success "Installation OK" || { print_error "Installation échouée"; exit 16; }
    ;;

  restart)
    print_info "PM2 restart (fallback start si absent)"
    if ssh_quiet "pm2 describe '$APP_NAME' >/dev/null 2>&1"; then
      ssh_quiet "pm2 restart '$APP_NAME' --update-env && pm2 save" \
        && print_success "Redémarrage OK" || { print_error "Redémarrage échoué"; exit 17; }
    else
      print_warning "Process $APP_NAME introuvable — je lance via ecosystem."
      ssh_quiet "cd '$REMOTE_DIR' && pm2 start ecosystem.config.js --only '$APP_NAME' && pm2 save" \
        && print_success "Démarrage OK" || { print_error "Démarrage échoué"; exit 18; }
    fi
    
    healthcheck || print_warning "Healthcheck échoué après restart"
    ;;

  rollback)
    print_info "Rollback au commit précédent"
    if [[ ! -f ".last_deploy_commit" ]]; then
      print_error "Aucun commit de sauvegarde trouvé (.last_deploy_commit manquant)"
      exit 30
    fi
    
    PREVIOUS_COMMIT=$(cat .last_deploy_commit)
    if [[ "$PREVIOUS_COMMIT" == "none" ]]; then
      print_error "Aucun commit précédent valide"
      exit 31
    fi
    
    print_warning "Rollback vers $PREVIOUS_COMMIT"
    read -rp "Confirmer le rollback ? (y/N) " confirm
    [[ "$confirm" != "y" ]] && { print_info "Rollback annulé"; exit 0; }
    
    ssh_quiet "cd '$REMOTE_DIR' && git reset --hard $PREVIOUS_COMMIT" \
      || { print_error "Échec du rollback Git"; exit 32; }
    
    ssh_quiet "cd '$REMOTE_DIR' && npm ci --no-audit --no-fund && NODE_ENV=production npm run build" \
      || { print_error "Échec du build après rollback"; exit 33; }
    
    ssh_quiet "pm2 restart '$APP_NAME' --update-env && pm2 save" \
      || { print_error "Échec du restart après rollback"; exit 34; }
    
    print_success "Rollback effectué avec succès"
    healthcheck || print_warning "Healthcheck échoué après rollback"
    ;;

  status)
    print_info "Statut du serveur"
    ssh_cmd "cd '$REMOTE_DIR' && echo '=== PM2 ===' && pm2 status && echo && echo '=== Git ===' && git log -3 --oneline && echo && echo '=== Disk ===' && df -h '$REMOTE_DIR' && echo && echo '=== Port $PORT ===' && (lsof -i :$PORT || echo 'Aucun process sur le port $PORT')"
    ;;

  logs)
    print_info "Logs PM2 (Ctrl+C pour quitter)"
    ssh_cmd "pm2 logs '$APP_NAME'"
    ;;

  healthcheck)
    healthcheck
    ;;

  *)
    print_error "Action inconnue : $ACTION"
    show_help
    exit 1
    ;;
esac

exit 0