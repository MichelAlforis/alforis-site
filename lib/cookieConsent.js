/**
 * Ouvre le panneau de gestion des cookies CookieConsent
 * @param {boolean} showAlert - Afficher une alerte si non disponible (défaut: false)
 */
export const openCookieSettings = (showAlert = false) => {
  if (typeof window === 'undefined') return;
  
  if (window.cc_popup?.revokeChoice) {
    window.cc_popup.revokeChoice();
  } else {
    setTimeout(() => {
      if (window.cc_popup?.revokeChoice) {
        window.cc_popup.revokeChoice();
      } else if (showAlert) {
        alert("La gestion des cookies n'est pas encore prête. Merci de réessayer dans un instant.");
      } else {
        console.warn('CookieConsent popup not ready');
      }
    }, 300);
  }
};