// hooks/useScrollPosition.js
import { useState, useEffect } from 'react'

/**
 * Renvoie la position de scroll Y du container (ref) ou, par défaut, de document.body.
 */
export default function useScrollPosition(containerRef) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Priorité au container ref, sinon on écoute body
    const target = containerRef?.current || document.body
    if (!target) return

    const onScroll = () => {
      setScrollY(target.scrollTop)
    }

    target.addEventListener('scroll', onScroll, { passive: true })
    // valeur initiale
    setScrollY(target.scrollTop)

    return () => {
      target.removeEventListener('scroll', onScroll)
    }
  }, [containerRef])

  return scrollY
}
