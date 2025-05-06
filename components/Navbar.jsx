'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavbarLogo from '@/components/animated/NavbarLogo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Liste des liens de la navbar
  const links = [
    { href: '/', label: 'Accueil', id: '0' },
    { href: '/Services', label: 'Nos Services', id: '1' },
    { href: '/ApprochePersonnalisee', label: 'Approche', id: '2' },
    { href: '/blog-studio', label: 'Blog & Studio', id: '3' },
    { href: '/Profil-De-Vie', label: 'Votre Profil de Vie', id: '4' },
    { href: '/Contact2', label: 'Contact', id: '5' },
  ]

  return (
    <nav className="bg-ivoire/80 backdrop-blur-md shadow-sm border-b border-ardoise/30 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center overflow-hidden">
              <NavbarLogo className="h-[40px] md:h-[60px] w-auto max-h-[80px]" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-6">
            {links.map(({ href, label, id }) => (
              <Link
                key={href}
                href={href}
                reverse
                id={id}
                className={`px-3 py-2 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center h-20 ${
                  pathname === href ? 'active text-doré' : 'text-acier' // Ajout de la classe active et dorée pour le lien actif
                }`}
              >
                {label}
              </Link>
            ))}

            <Button to="/ContactSection" index={1}>
              Prendre un RDV
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-acier">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-anthracite px-4 pt-4 pb-6 space-y-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block text-white transition-all duration-300 ease-in-out ${
                pathname === href ? 'active' : ''
              }`}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/ContactSection"
            className="block mt-4 bg-doré text-white text-center hover:bg-white hover:text-doré transition px-4 py-2 rounded-full font-semibold shadow-md"
          >
            Prendre un RDV
          </Link>
        </div>
      )}
    </nav>
  )
}
