'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavbarLogoMobile from '@/components/Navbar/NavbarLogoMobile'
import clsx from 'clsx'

export default function NavbarMobile({links}) {
  
  const [isOpen, setIsOpen]         = useState(false)

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])


  return (
    <>
      {/* Burger uniquement si le menu est fermé */}
        {!isOpen && (
          <div
            className="pt-0 grid grid-cols-2 h-full items-center"
            style={{ height: "var(--nav-height)" }}
          >
            {/* Colonne 1 : logo mobile */}
            <div className="flex items-center">
              <NavbarLogoMobile  className= 'navbar-logo' isHome={isHome} />
            </div>

            {/* Colonne 2 : bouton menu aligné à droite */}
            <div className="flex items-center justify-end">
              <button
                onClick={toggle}
                aria-label="Ouvrir le menu"
                className={clsx(
                  "lg:hidden z-nav p-3 focus:outline-none focus:ring-2 focus:ring-doré rounded",
                  isHome ? "text-ivoire" : "text-acier"
                )}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        )}


      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {/* — En-tête mobile : skip-link, logo & bouton X */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-ardoise/30">
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only bg-doré text-ivoire p-2 rounded"
                >
                  Aller au contenu
                </a>
                <Link
                  href="/"
                  onClick={() => {
                    handleLinkClick('/')
                    toggle()
                  }}
                  className="flex items-center"
                >
                
                  <span className="sr-only">Alforis – Accueil</span>
                </Link>
                <button
                  onClick={toggle}
                  aria-label="Fermer le menu"
                  className="p-2 focus:outline-none focus:ring-2 focus:ring-doré rounded"
                >
                  <X size={28} />
                </button>
              </div>

              {/* — Liens & actions */}
              <nav className="mobile-menu z-nav flex-1 flex flex-col min-h-screen items-center justify-center space-y-6 py-6">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => {
                      handleLinkClick(href)
                      toggle()
                    }}
                    className={isActive(href) ? 'active' : ''}
                  >
                    {label}
                  </Link>
                ))}

                <button
                  type="button"
                  className="theme-toggle flex items-center space-x-2"
                  aria-label="Alterner jour / nuit"
                  onClick={() => setDark(d => !d)}
                >
                  {dark ? <Sun size={24} /> : <Moon size={24} />}
                  <span>{dark ? 'Mode Clair' : 'Mode Sombre'}</span>
                </button>

                <Button
                  to="/prendre-rendez-vous"
                  className="btn-alforis-rdv"
                  onClick={() => {
                    handleLinkClick('/prendre-rendez-vous')
                    toggle()
                  }}
                >
                  Prendre un RDV
                </Button>
              </nav>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
