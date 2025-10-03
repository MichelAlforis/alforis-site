'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { Globe } from 'lucide-react'
import useScrollPosition from '@/hooks/useScrollPosition'
import SwitchDarkMode from '@/components/ui/SwitchDarkMode'
import Button from '@/components/ui/Button'
import NavbarLogo from '@/components/Navbar/NavbarLogo'
import NavLink from '@/components/Navbar/NavLink'
import { scrollToTop } from '@/hooks/scrollToTop'

export default function NavbarDesktop({ links }) {
  const pathname = usePathname()
  const router = useRouter()

  // Extraire la locale du pathname au lieu d'utiliser useLocale()
  const getLocaleFromPath = () => {
    const segments = pathname.split('/')
    const possibleLocale = segments[1]
    return ['fr', 'en', 'es', 'pt'].includes(possibleLocale) ? possibleLocale : 'fr'
  }
  
  const locale = getLocaleFromPath()
  
  const isHome = pathname === '/'
  const [hasShadow, setHasShadow] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const scrollY = useScrollPosition()
  const isActive = href => pathname === href
  
  // Déterminer le "contexte" sans variable globale
  const ctx = pathname.startsWith('/b2b') || pathname.includes('/b2b') ? 'b2b' : 'particulier'
  const rdvPath = ctx === 'b2b' ? '/b2b/contact' : '/particulier/prendre-rendez-vous'
  
  const handleLinkClick = href => {
    if (pathname === href) scrollToTop()
  }

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' }
  ]

  const changeLanguage = (newLocale) => {
    // Remplacer la locale dans le pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    
    router.push(newPath)
    setShowLanguages(false)
  }

  const currentLang = languages.find(l => l.code === locale)
  const isB2BPage = ctx === 'b2b'

  // shadow on scroll
  useEffect(() => {
    setHasShadow(scrollY > 10)
  }, [scrollY])

  return (
    <header
      className={clsx(
        'site-header fixed inset-x-0 top-0 z-nav h-nav transition-shadow duration-300',
        hasShadow && 'shadow-xl',
        isHome
          ? 'bg-transparent backdrop-blur-none'
          : 'bg-ivoire/10 dark:bg-acier/10 backdrop-blur-2xl'
      )}
    >
      <div className="flex h-full items-center gap-4 px-4">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/" onClick={() => handleLinkClick('/')}>
            <NavbarLogo className="navbar-logo" isHome={isHome} />
          </Link>
        </div>
        
        {/* Spacer pour pousser le menu à droite */}
        <div className="flex-1" />

        {/* MENU DESKTOP */}
        <div className="flex items-center space-x-2">
          {links.map(l => <NavLink key={l.href} href={l.href} label={l.label} isHome={isHome} />)}
        </div>

        {/* CONTRÔLES : LANGUE (si B2B) + SWITCH MODE + BOUTON */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Sélecteur de langue - affiché uniquement sur pages B2B */}
          {isB2BPage && (
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-2 px-3 py-2 bg-ivoire/90 dark:bg-acier/90 backdrop-blur-sm rounded-full border border-doré/30 hover:border-doré transition-all"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4 text-doré" />
                <span className="font-bold text-anthracite dark:text-ivoire text-sm">
                  {currentLang?.code.toUpperCase()}
                </span>
              </button>

              {showLanguages && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowLanguages(false)}
                  />
                  
                  <div className="absolute top-full mt-2 right-0 bg-ivoire dark:bg-acier rounded-xl shadow-2xl border border-doré/30 overflow-hidden min-w-[180px] z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={clsx(
                          'w-full px-4 py-3 flex items-center gap-3 hover:bg-doré/20 transition-colors text-left',
                          locale === lang.code && 'bg-doré/30 font-bold'
                        )}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-anthracite dark:text-ivoire">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <SwitchDarkMode />

          <Button
            to={rdvPath}
            className="btn-alforis-rdv font-semibold whitespace-nowrap"
            onClick={() => handleLinkClick(rdvPath)}
          >
            {ctx === 'b2b' ? 'Contact' : 'Prendre un RDV'}
          </Button>
        </div>
      </div>
    </header>
  )
}