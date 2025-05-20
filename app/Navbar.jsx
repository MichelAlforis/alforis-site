'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavbarLogo from '@/components/animated/NavbarLogo'
import { scrollToTop } from '@/hooks/scrollToTop'
import { motion, AnimatePresence } from 'framer-motion'


export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasShadow, setHasShadow] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])


  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLinkClick = useCallback(href => {
    if (pathname === href) scrollToTop()
  }, [pathname])

  const links = [
    { href: '/parcours', label: 'Parcours' },
    { href: '/blog-studio', label: 'Blog & Studio' },
    { href: '/marketplace', label: 'Tarifs' },
    { href: '/services', label: 'Services' },
    { href: '/approchepersonnalisee', label: 'Approche' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = href => pathname === href

  return (
<header className={`
  site-header
  ${hasShadow ? 'shadow-lg' : ''}
`}>
  <div className="w-full mx-auto px-4 lg:px-8 flex items-center justify-between h-full">
    {/* ← Logo à gauche */}
    <div className="navbar-logo flex-shrink-0">
      <Link href="/" onClick={() => handleLinkClick('/')}>
        <NavbarLogo className="h-8 md:h-12 w-auto" />
        <span className="sr-only">Alforis - Accueil</span>
      </Link>
    </div>

    {/* ← Liens + bouton (desktop) */}
    <div className="flex items-center space-x-4">
      <div className="nav-links">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => handleLinkClick(href)}
            className={`
              relative text-sm lg:text-base font-medium
              transition-colors duration-200
              ${isActive(href)
                ? 'text-doré'
                : 'text-acier hover:text-doré'
              }
            `}
          >
            {label}
            <span className={`
              absolute bottom-0 left-0 h-0.5 w-full bg-doré
              transition-transform duration-300
              ${isActive(href) ? 'scale-x-100' : 'scale-x-0'}
            `}/>
          </Link>
        ))}
      </div>

      <Button
        to="/prendre-rendez-vous"
        className="ml-4 btn-alforis-rdv hidden lg:inline-block"
        onClick={() => handleLinkClick('/prendre-rendez-vous')}
      >
        Prendre un RDV
      </Button>

      {/* ← Bouton mobile */}
      <button
        type="button"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={toggleMenu}
        className="lg:hidden p-4 sm:p-5 text-ardoise hover:text-doré focus:outline-none focus:ring-2 focus:ring-doré"
      >
        {isOpen ? <X size={28}/> : <Menu size={28}/>}
      </button>
    </div>
  </div>


      <AnimatePresence>
        {isOpen && (
            <motion.nav
              ref={menuRef}
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-16 bg-ivoire/95 backdrop-blur-sm shadow-lg border-t border-ardoise/20 z-50"
            >
              <div className="px-4 py-1 space-y-1"> {/* réduit l'interligne */}
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => { handleLinkClick(href); setIsOpen(false) }}
                    className={`block text-base font-medium py-2 transition-colors duration-200 ${isActive(href) ? 'text-doré' : 'text-ardoise hover:text-doré'}`}
                  >
                    {label}
                  </Link>
                ))}
                <Button to="/prendre-rendez-vous"  className="w-full btn-alforis-rdv mt-2" onClick={() => { setIsOpen(false); handleLinkClick('/prendre-rendez-vous') }}>
                  Prendre un RDV
                </Button>
              </div>
            </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
