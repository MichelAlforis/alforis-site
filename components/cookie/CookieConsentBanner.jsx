'use client'
import { useEffect, useRef } from 'react'

export default function CookieConsentBanner({ onOpen, onClose }) {
  const bannerRef = useRef(null)

  useEffect(() => {
    function reportHeight() {
      if (bannerRef.current) {
        onOpen?.(bannerRef.current.offsetHeight)
      } else {
        onClose?.()
      }
    }
    // Simule l’affichage, la disparition et les changements de hauteur
    // À adapter à ton cookieconsent.js réel, ici on ne fait que démontrer le mécanisme.
    setTimeout(reportHeight, 120) // Simule apparition
    window.addEventListener('resize', reportHeight)
    return () => window.removeEventListener('resize', reportHeight)
  }, [onOpen, onClose])

  return (
    <div ref={bannerRef} className="cc-window">
      {/* Ton vrai bandeau ici */}
      Ce site utilise des cookies. <button>OK</button>
    </div>
  )
}
