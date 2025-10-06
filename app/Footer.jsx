'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Imports B2C (existants)
import FooterMobile from './components/footer/FooterMobile'
import FooterDesktop from './components/footer/FooterDesktop'

// Imports B2B (nouveaux)
import FooterMobileB2B from './components/footer/FooterMobileB2B'
import FooterDesktopB2B from './components/footer/FooterDesktopB2B'

export default function Footer({ messages }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isB2B, setIsB2B] = useState(false)
  const pathname = usePathname()

  // Détection du contexte B2C/B2B selon l'URL
  useEffect(() => {
    // Patterns d'URL qui activent le mode B2B
    const b2bPatterns = [
      '/b2b',
      '/pro',
      '/entreprises',
      '/partenaires',
      '/solutions',
      '/professionnels',
      '/espace-pro'
    ]
    
    // Extraire le chemin sans la locale
    // Ex: /fr/b2b/solutions → /b2b/solutions
    const pathWithoutLocale = pathname?.replace(/^\/(fr|en|es|pt)/, '') || ''
    
    // Vérifier si le chemin (sans locale) commence par un pattern B2B
    const isB2BRoute = b2bPatterns.some(pattern => 
      pathWithoutLocale.startsWith(pattern)
    )
    
    setIsB2B(isB2BRoute)
  }, [pathname])

  // Détection taille d'écran Mobile/Desktop
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

  // Logique de rendu : 4 cas possibles
  if (isB2B && !isMobile) {
    return <FooterDesktopB2B messages={messages} />
  }

  if (isB2B && isMobile) {
    return <FooterMobileB2B messages={messages}/>
  }

  if (!isB2B && !isMobile) {
    return <FooterDesktop />
  }

  return <FooterMobile />
}