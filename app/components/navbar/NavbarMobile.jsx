'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavbarLogo from '@/components/Navbar/NavbarLogo'

export default function NavbarMobile({
  links,
  isActive,
  isOpen,
  toggle,
  handleLinkClick,
  dark,
  setDark,
}) {
  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Burger uniquement si le menu est fermé */}
      {!isOpen && (
        <button
          onClick={toggle}
          aria-label="Ouvrir le menu"
          className="lg:hidden p-3 focus:outline-none focus:ring-2 focus:ring-doré rounded"
        >
          <Menu size={28} />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
            <motion.div
              className="mobile-menu"
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
                  <NavbarLogo className="h-8 w-auto" aria-hidden="true" />
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
              <nav className="flex-1 flex flex-col items-center justify-center space-y-6 py-6">
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
