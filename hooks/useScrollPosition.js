import { useState, useEffect } from 'react'

export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Next.js: attendre que le DOM soit dispo
    const scEl = document.body

    const onScroll = () => {
      setScrollY(scEl.scrollTop)
    }

    scEl.addEventListener('scroll', onScroll, { passive: true })
    // init
    setScrollY(scEl.scrollTop)

    return () => scEl.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}
