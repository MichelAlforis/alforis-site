// app/Navbar.jsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavConfig } from './components/navbar/NavbarConfig'
import NavbarDesktop from './components/navbar/NavbarDesktop'
import NavbarMobile from './components/navbar/NavbarMobile'

export default function Navbar({ initialContext = 'particulier' }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [context, setContext] = useState(initialContext)

  useEffect(() => {
    const determineContext = () => {
      if (!pathname) return initialContext

      const segments = pathname.split('/').filter(Boolean)
      if (segments.includes('b2b')) return 'b2b'
      if (segments.includes('particulier')) return 'particulier'

      if (typeof window !== 'undefined') {
        const savedChoice = window.localStorage.getItem('alforis-client-type')
        if (savedChoice === 'b2b' || savedChoice === 'particulier') {
          return savedChoice
        }
      }

      return 'particulier'
    }

    const nextContext = determineContext()
    if (nextContext !== context) {
      setContext(nextContext)
    }
  }, [pathname, initialContext, context])

  const config = NavConfig[context] ?? NavConfig.particulier
  const links = config.tabs ?? []

  // Détection taille du mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* Menu Desktop */}
      {!isMobile && <NavbarDesktop links={links} context={context} />}

      {/* MENU MOBILE */}
      {isMobile && <NavbarMobile links={links} context={context} />}
    </>
  )
}
