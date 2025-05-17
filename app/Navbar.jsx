'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavbarLogo from '@/components/animated/NavbarLogo'
import { scrollToTop } from '@/hooks/scrollToTop'
import { motion, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasShadow, setHasShadow] = useState(false)
  const menuRef = useRef(null)

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Scroll to top if same link
  const handleLinkClick = useCallback(href => {
    if (pathname === href) scrollToTop()
  }, [pathname])

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Nos Services' },
    { href: '/approchepersonnalisee', label: 'Approche' },
    { href: '/blog-studio', label: 'Blog & Studio' },
    { href: '/parcours', label: 'Vos Parcours' },
    { href: '/contact', label: 'Contact' },
    { href: '/marketplace', label: 'Nos Tarifs' }
  ]

  const isActive = href => pathname === href

  return (
    <nav className={
      `fixed inset-x-0 top-0 bg-ivoire/80 backdrop-blur-md transition-shadow duration-300 ${hasShadow ? 'shadow-lg' : ''}`
    }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Skip link */}
        <div className="flex items-center space-x-4">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-doré text-white p-2 rounded"
          >
            Aller au contenu
          </a>
          <Link href="/" onClick={() => handleLinkClick('/')} className="flex items-center">
            <NavbarLogo className="h-10 md:h-12 w-auto" aria-hidden="true" />
            <span className="sr-only">Alforis - Accueil</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => handleLinkClick(href)}
              className={
                `relative text-sm lg:text-base font-medium transition-colors duration-200
                ${isActive(href) ? 'text-doré' : 'text-acier hover:text-doré'}`
              }
            >
              {label}
              <span
                className={
                  `absolute bottom-0 left-0 h-0.5 w-full bg-doré transition-transform duration-300
                  ${isActive(href) ? 'scale-x-100' : 'scale-x-0'}`
                }
              />
            </Link>
          ))}
          <Button
            to="/prendre-rendez-vous"
            className="ml-4 btn-alforis-rdv"
            onClick={() => handleLinkClick('/prendre-rendez-vous')}
          >
            Prendre un RDV
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={toggleMenu}
          className="md:hidden p-2 text-anthracite hover:text-doré focus:outline-none focus:ring-2 focus:ring-doré z-70"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <FocusTrap>
            <motion.div
              ref={menuRef}
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-16 bg-ivoire/95 backdrop-blur-sm shadow-lg border-t border-ardoise/20 z-50"
            >
              <div className="px-4 py-2 space-y-2">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => { handleLinkClick(href); setIsOpen(false) }}
                    className={
                      `block text-base font-medium py-2 transition-colors duration-200
                      ${isActive(href) ? 'text-doré' : 'text-ardoise hover:text-doré'}`
                    }
                  >
                    {label}
                  </Link>
                ))}
                <Button
                  to="/prendre-rendez-vous"
                  variant="solid"
                  className="w-full mt-2"
                  onClick={() => { setIsOpen(false); handleLinkClick('/prendre-rendez-vous') }}
                >
                  Prendre un RDV
                </Button>
              </div>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </nav>
  )
}
