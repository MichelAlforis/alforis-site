// hooks/useScrollPosition.js
import { useState, useEffect } from 'react'

export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // on cible <body> (ou document.scrollingElement)
    const scEl = document.body

    const onScroll = () => {
      setScrollY(scEl.scrollTop)
    }

    scEl.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initialise immédiatement

    return () => scEl.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}
