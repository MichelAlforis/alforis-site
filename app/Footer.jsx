'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import FooterMobile from './components/footer/FooterMobile'
import FooterDesktop from './components/footer/FooterDesktop'
import FooterMobileB2B from './components/footer/FooterMobileB2B'
import FooterDesktopB2B from './components/footer/FooterDesktopB2B'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)
  const [isB2B, setIsB2B] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const b2bPatterns = ['/b2b', '/pro', '/entreprises']
    const pathWithoutLocale = pathname?.replace(/^\/(fr|en|es|pt)/, '') || ''
    setIsB2B(b2bPatterns.some(pattern => pathWithoutLocale.startsWith(pattern)))
  }, [pathname])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Maintenant useTranslations fonctionnera car on est dans NextIntlClientProvider
  if (isB2B && !isMobile) return <FooterDesktopB2B />
  if (isB2B && isMobile) return <FooterMobileB2B />
  if (!isB2B && !isMobile) return <FooterDesktop />
  return <FooterMobile />
}