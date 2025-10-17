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

export default function NavbarDesktop({ links, context: providedContext }) {
  const pathname = usePathname()
  const router = useRouter()

  const getLocaleFromPath = () => {
    const segments = pathname.split('/').filter(Boolean)
    const possibleLocale = segments[0]
    return ['fr', 'en', 'es', 'pt'].includes(possibleLocale) ? possibleLocale : 'fr'
  }
  
  const locale = getLocaleFromPath()
  
  const fallbackContext = pathname.includes('/b2b') ? 'b2b' : 'particulier'
  const ctx = providedContext ?? fallbackContext
  
  // Home path selon le contexte
  const homePath = ctx === 'b2b' ? `/${locale}/b2b` : '/'
  
  const isHome = pathname === homePath
  
  const [hasShadow, setHasShadow] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const scrollY = useScrollPosition()
  const isActive = href => pathname === href
  
  const rdvPath = ctx === 'b2b' ? `/${locale}/b2b/contact` : '/particulier/prendre-rendez-vous'
  const isB2BPage = ctx === 'b2b'
  
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
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    
    router.push(newPath)
    setShowLanguages(false)
  }

  const currentLang = languages.find(l => l.code === locale)

  useEffect(() => {
    setHasShadow(scrollY > 10)
  }, [scrollY])

  return (
    <header
      className={clsx(
        'site-header fixed inset-x-0 top-0 z-nav h-nav transition-all duration-500',
        isB2BPage 
          ? 'bg-anthracite/95 dark:bg-anthracite/98 backdrop-blur-xl border-b border-doré/10'
          : isHome
            ? 'bg-transparent backdrop-blur-none'
            : 'bg-ivoire/10 dark:bg-acier/10 backdrop-blur-2xl',
        hasShadow && 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
      )}
    >
      <div className="flex h-full items-center gap-6 px-6 max-w-[1600px] mx-auto">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link 
            href={homePath} 
            onClick={() => handleLinkClick(homePath)}
            className="inline-block"
          >
            <NavbarLogo className="navbar-logo h-nav" isHome={isHome} />
          </Link>
        </div>
        
        <div className="flex-1" />

        {/* MENU DESKTOP - Style Elite B2B */}
        <nav className="flex items-center space-x-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => handleLinkClick(l.href)}
              className={clsx(
                'px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-300 rounded-lg relative group',
                isB2BPage
                  ? isActive(l.href)
                    ? 'text-doré bg-doré/10'
                    : 'text-ivoire/90 hover:text-doré hover:bg-ivoire/5'
                  : isActive(l.href)
                    ? 'text-doré'
                    : 'text-anthracite dark:text-ivoire hover:text-doré'
              )}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-doré" />
              )}
            </Link>
          ))}
        </nav>

        {/* CONTRÔLES ELITE */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          {/* Sélecteur de langue B2B - Version minimaliste */}
          {isB2BPage && (
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-2 px-3 py-2 bg-ivoire/5 hover:bg-ivoire/10 
                           backdrop-blur-sm rounded-lg border border-doré/20 hover:border-doré/40 
                           transition-all duration-300 group"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4 text-doré/80 group-hover:text-doré transition-colors" />
                <span className="font-bold text-ivoire/90 text-xs tracking-wider">
                  {currentLang?.code.toUpperCase()}
                </span>
              </button>

              {showLanguages && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowLanguages(false)}
                  />
                  
                  <div className="absolute top-full mt-2 right-0 
                                  bg-anthracite dark:bg-anthracite 
                                  backdrop-blur-xl 
                                  rounded-xl shadow-2xl 
                                  border border-doré/20 
                                  overflow-hidden 
                                  min-w-[200px] z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={clsx(
                          'w-full px-4 py-3 flex items-center gap-3 transition-all text-left',
                          locale === lang.code
                            ? 'bg-doré/20 text-doré font-bold'
                            : 'text-ivoire/80 hover:bg-ivoire/5 hover:text-doré'
                        )}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm tracking-wide">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="w-px h-6 bg-doré/20" />

          <SwitchDarkMode />

          <Button
            to={rdvPath}
            className={clsx(
              'font-semibold whitespace-nowrap px-6 py-2.5 rounded-lg transition-all duration-300',
              isB2BPage
                ? 'bg-doré text-anthracite hover:bg-doré/90 shadow-lg hover:shadow-xl hover:shadow-doré/20'
                : 'btn-alforis-rdv'
            )}
            onClick={() => handleLinkClick(rdvPath)}
          >
            {ctx === 'b2b' ? 'Contact' : 'Prendre un RDV'}
          </Button>
        </div>
      </div>
    </header>
  )
}
