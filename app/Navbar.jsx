// components/Navbar.jsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/button'
import NavbarLogo from '@/components/animated/NavbarLogo'
import { scrollToTop } from '@/hooks/scrollToTop'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Accueil', id: '0' },
    { href: '/Services', label: 'Nos Services', id: '1' },
    { href: '/ApprochePersonnalisee', label: 'Approche', id: '2' },
    { href: '/blog-studio', label: 'Blog & Studio', id: '3' },
    { href: '/Parcours', label: 'Vos Parcours', id: '4' },
    { href: '/Contact2', label: 'Contact', id: '5' },
    { href: '/marketplace', label: 'Nos Tarifs', id: '6' },
  ]

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLinkClick = (href) => {
    if (pathname === href) {
      scrollToTop()
    }
    // otherwise let Next.js handle navigation
  }

  return (
    <nav className="bg-ivoire/80 shadow-sm border-b border-ardoise/30 fixed top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="Logo-Cont flex-shrink-0">
            <Link href="/" onClick={() => handleLinkClick('/')} className="group flex items-center overflow-hidden">
              <NavbarLogo className="h-[40px] md:h-[50px] w-auto max-h-[60px]" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center space-x-6">
            {links.map(({ href, label, id }) => (
              <Link
                key={href}
                href={href}
                id={id}
                onClick={() => handleLinkClick(href)}
                className={`
                  px-3 py-2 rounded-md transition-all duration-300 ease-in-out
                  flex items-center justify-center h-20
                  ${pathname === href ? 'active' : 'text-acier'}
                  text-xs md:text-sm lg:text-base
                `}
              >
                {label}
              </Link>
            ))}
            <Button to="/prendre-rendez-vous" onClick={() => handleLinkClick('/prendre-rendez-vous')} index={1}>
              Prendre un RDV
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-acier focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-ivoire/95 px-6 py-2 space-y-1 shadow-lg border-t border-ardoise/20 z-50">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => { setIsOpen(false); handleLinkClick(href) }}
              className={`block text-ardoise text-lg font-medium transition-all duration-200 ${
                pathname === href ? 'font-bold underline text-doré' : ''
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/prendre-rendez-vous"
            onClick={() => { setIsOpen(false); handleLinkClick('/prendre-rendez-vous') }}
            className="flex items-center justify-center h-12 mt-6 bg-doré text-white hover:bg-white hover:text-doré transition px-6 py-2 rounded-full font-semibold shadow-md"
          >
            Prendre un RDV
          </Link>
        </div>
      )}
    </nav>
  )
}