// app/Navbar.jsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavConfig } from './components/navbar/NavbarConfig'
import NavbarDesktop from './components/navbar/NavbarDesktop'
import NavbarMobile from './components/navbar/NavbarMobile'

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  
  // Déterminer le contexte actuel
  const getContext = () => {
    // Gérer les URLs avec locale (/fr/b2b, /en/b2b, etc.)
    if (pathname.includes('/b2b')) return 'b2b'  // ← CHANGEMENT ICI
    if (pathname.includes('/particulier')) return 'particulier'  // ← ET ICI
    
    // Pour pages partagées et racine, utiliser contexte mémorisé
    if (typeof window !== 'undefined') {
      const savedChoice = localStorage.getItem('alforis-client-type')
      if (savedChoice === 'b2b' || savedChoice === 'particulier') {
        return savedChoice
      }
    }
    
    // Défaut : particulier
    return 'particulier'
  }
  
  const context = getContext()
  const config = NavConfig[context]
  const links = config.tabs

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