// components/Navbar.jsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavbarLogo from '@/components/animated/NavbarLogo'
import { scrollToTop } from '@/hooks/scrollToTop'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Nos Services' },
    { href: '/approchepersonnalisee', label: 'Approche' },
    { href: '/blog-studio', label: 'Blog & Studio' },
    { href: '/parcours', label: 'Vos Parcours' },
    { href: '/contact', label: 'Contact' },
    { href: '/marketplace', label: 'Nos Tarifs' },
  ]

  const handleLinkClick = (href) => {
    if (pathname === href) scrollToTop()
  }

  const linkClasses = (href) => {
    const base = 'px-3 py-2 rounded-md transition duration-300 ease-in-out flex items-center text-sm lg:text-base'
    const active = pathname === href ? 'text-doré font-semibold' : 'text-acier hover:text-doré'
    return `${base} ${active}`
  }

  return (
    <nav aria-label="Main navigation" className="fixed top-0 w-full bg-ivoire/80 shadow-sm border-b border-ardoise/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => handleLinkClick('/')}>  
            <NavbarLogo className="h-10 md:h-12 w-auto" aria-hidden="true" />
            <span className="sr-only">Alforis - Accueil</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => handleLinkClick(href)} className={linkClasses(href)}>
                {label}
              </Link>
            ))}
            <Button to="/prendre-rendez-vous" onClick={() => handleLinkClick('/prendre-rendez-vous')}>
              Prendre un RDV
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setIsOpen((open) => !open)}
            className="md:hidden p-2 text-acier hover:text-doré focus:outline-none focus:ring-2 focus:ring-doré"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-ivoire/95 px-6 py-4 space-y-2 shadow-lg border-t border-ardoise/20">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => { handleLinkClick(href); setIsOpen(false) }}
              className={`block text-lg font-medium transition duration-200 ${pathname === href ? 'text-doré' : 'text-ardoise hover:text-doré'}`}
            >
              {label}
            </Link>
          ))}
          <Button
            to="/prendre-rendez-vous"
            onClick={() => { setIsOpen(false); handleLinkClick('/prendre-rendez-vous') }}
            className="w-full mt-4"
          >
            Prendre un RDV
          </Button>
        </div>
      )}
    </nav>
  )
}
