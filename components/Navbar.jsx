'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavbarLogo from '@components/animated/NavbarLogo'
import {GoldLink } from "@/hooks/useGoldEffect"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/Services', label: 'Nos Services' },
    { href: '/ApprochePersonnalisee', label: 'Approche' },
    { href: '/blog-studio', label: 'Blog & Studio' },
    { href: '/ProfilDeVie', label: 'Votre Profil de Vie' },
    { href: '/Contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white/30 backdrop-blur-md shadow-sm border-b border-[#D1C5B0]/50 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
          <Link href="/" className="group flex items-center overflow-hidden">
            <NavbarLogo className="h-[60px] md:h-[40px] w-auto" />
          </Link>

          </div>

          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-6">
            {links.map(({ href, label }) => (
              <GoldLink
                key={href}
                href={href}
                reverse
                className={`px-3 py-2 rounded-md text-md ${
                  pathname === href ? 'text-doré font-semibold' : 'text-acier'
                }`}
              >
                {label}
              </GoldLink>
            ))}

            <Button to="/ContactSection" index={1} className="btn-alforis-rdv">
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
              className={`block text-white hover:text-doré ${
                pathname === href ? 'text-doré font-semibold' : ''
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


