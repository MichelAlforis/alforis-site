'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * useSmoothScroll
 * Hook qui renvoie une valeur scrollY lissée via interpolation.
 * Utile pour animer en douceur des composants selon le scroll.
 */
export default function useSmoothScroll({ friction = 0.1 } = {}) {
  const [smoothedY, setSmoothedY] = useState(0)
  const targetY = useRef(0)
  const frame = useRef(null)

  useEffect(() => {
    // Met à jour la cible à chaque scroll
 const handleScroll = () => {
   const scEl = document.scrollingElement || document.body
   targetY.current = scEl.scrollTop
 }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation frame pour interpoler smoothedY vers targetY
    const animate = () => {
      setSmoothedY(prevY => prevY + (targetY.current - prevY) * friction)
      frame.current = requestAnimationFrame(animate)
    }

    // Lancement de l'animation
    frame.current = requestAnimationFrame(animate)

    // Nettoyage
    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [friction])

  return smoothedY
}
