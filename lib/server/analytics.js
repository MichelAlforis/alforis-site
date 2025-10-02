// lib/analytics.js

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Envoyer un événement personnalisé à Google Analytics
export function logEvent(action, params) {
  if (!GA_MEASUREMENT_ID) {
    console.warn('❗ Google Analytics ID manquant, event non envoyé.')
    return
  }

  if (typeof window.gtag !== 'function') {
    console.warn('❗ gtag non trouvé sur window.')
    return
  }

  window.gtag('event', action, params)
}

// Exemple d'utilisation :
// logEvent('unsubscribe', { email: 'michel@exemple.com' })
