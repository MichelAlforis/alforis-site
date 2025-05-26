import { useState, useEffect } from 'react'

export default function useScrollPosition() {
  // Valeur initiale sûre en SSR
  const [scrollY, setScrollY] = useState(() => {
    if (typeof window === 'undefined') return 0
    const el = document.scrollingElement || document.body
    return el.scrollTop
  })

  useEffect(() => {
    // On cible d'abord l'élément scrollable
    const el = document.scrollingElement || document.body
    let prevY = el.scrollTop

    const onScroll = () => {
      const currentY = el.scrollTop
      // Mise à jour seulement si changement de position
      if (currentY !== prevY) {
        prevY = currentY
        setScrollY(currentY)
      }
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    // Init
    onScroll()

    return () => {
      el.removeEventListener('scroll', onScroll)
    }
  }, [])

  return scrollY
}