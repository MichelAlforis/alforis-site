// lib/cookieConsent.js
let _busy = false

/**
 * Ouvre le panneau CookieConsent (cc_popup.revokeChoice)
 * @param {Object} opts
 * @param {number} [opts.attempts=6]  - nb d'essais
 * @param {number} [opts.delay=250]   - délai entre essais (ms)
 * @param {boolean} [opts.showAlert=false] - alerte si non dispo
 * @param {string} [opts.message] - message i18n optionnel pour l'alerte
 * @returns {Promise<boolean>} true si ouvert, false sinon
 */
export const openCookieSettings = async ({
  attempts = 6,
  delay = 250,
  showAlert = false,
  message
} = {}) => {
  if (typeof window === 'undefined') return false
  if (_busy) return false
  _busy = true

  const tryOnce = () => {
    const api = window?.cc_popup
    if (api && typeof api.revokeChoice === 'function') {
      api.revokeChoice()
      return true
    }
    return false
  }

  // essai immédiat puis retries
  if (tryOnce()) { _busy = false; return true }

  for (let i = 0; i < attempts; i++) {
    await new Promise(r => setTimeout(r, delay))
    if (tryOnce()) { _busy = false; return true }
  }

  _busy = false
  if (showAlert) {
    alert(message || "La gestion des cookies n'est pas encore prête. Réessayez dans un instant.")
  } else {
    console.warn('CookieConsent popup not ready')
  }
  return false
}
