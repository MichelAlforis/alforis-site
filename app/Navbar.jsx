'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavbarLogo from '@/components/animated/NavbarLogo'
import { scrollToTop } from '@/hooks/scrollToTop'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Nos Services' },
    { href: '/approchepersonnalisee', label: 'Approche' },
    { href: '/blog-studio', label: 'Blog & Studio' },
    { href: '/parcours', label: 'Vos Parcours' },
    { href: '/contact', label: 'Contact' },
    { href: '/marketplace', label: 'Nos Tarifs' },
  ]

  const handleLinkClick = useCallback(href => {
    if (pathname === href) scrollToTop()
  }, [pathname])

  const linkClasses = href =>
    `px-3 py-2 rounded-md transition duration-300 flex items-center text-sm lg:text-base font-medium ${
      pathname === href ? 'text-doré font-semibold' : 'text-acier hover:text-doré'
    }`

  return (
    <nav className="sticky top-0 z-nav bg-ivoire/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
        {/* Logo + Skip link for accessibility */}
        <div className="flex items-center space-x-4">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 text-white bg-doré p-2 rounded">
            Aller au contenu
          </a>
          <Link href="/" onClick={() => handleLinkClick('/')} className="flex items-center h-full">
            <NavbarLogo className="h-10 md:h-12 w-auto" aria-hidden="true" />
            <span className="sr-only">Alforis - Accueil</span>
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => handleLinkClick(href)}
              className={linkClasses(href)}
            >
              {label}
            </Link>
          ))}
          <Button
            to="/prendre-rendez-vous" className="btn-alforis-rdv"
            onClick={() => handleLinkClick('/prendre-rendez-vous')}
          >
            Prendre un RDV
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setIsOpen(prev => !prev)}
          className="md:hidden p-2 text-acier hover:text-doré focus:outline-none focus:ring-2 focus:ring-doré"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden fixed inset-x-0 top-[64px] bg-ivoire/95 backdrop-blur-sm shadow-lg border-t border-ardoise/20 z-nav transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-6 py-4 space-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => { handleLinkClick(href); setIsOpen(false) }}
              className={`block text-lg font-medium py-3 transition duration-200 ${
                pathname === href ? 'text-doré' : 'text-ardoise hover:text-doré'
              }`}
            >
              {label}
            </Link>
          ))}
          <Button
            to="/prendre-rendez-vous"
            variant="solid"
            className="w-full mt-4"
            onClick={() => { setIsOpen(false); handleLinkClick('/prendre-rendez-vous') }}
          >
            Prendre un RDV
          </Button>
        </div>
      </div>
    </nav>
  )
}
