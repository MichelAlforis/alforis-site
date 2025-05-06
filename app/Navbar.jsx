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

  // Liste des liens de la navbar (déplacée ici pour qu'elle soit accessible dans tout le composant)
  const links = [
    { href: '/', label: 'Accueil', id: '0' },
    { href: '/Services', label: 'Nos Services', id: '1' },
    { href: '/ApprochePersonnalisee', label: 'Approche', id: '2' },
    { href: '/blog-studio', label: 'Blog & Studio', id: '3' },
    { href: '/Profil-De-Vie', label: 'Votre Profil de Vie', id: '4' },
    { href: '/Contact2', label: 'Contact', id: '5' },
  ];

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])



  return (
    <nav className="bg-ivoire/80 backdrop-blur-md shadow-sm border-b border-ardoise/30 fixed top-0 w-full z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* BARRE DU HAUT */}
    <div className="flex justify-between h-16 items-center">
      {/* Logo */}
      <div className="Logo-Cont flex-shrink-0">
        <Link href="/" className="group flex items-center overflow-hidden">
          <NavbarLogo className="h-[40px] md:h-[50px] w-auto max-h-[60px]" />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex md:items-center space-x-6">
        {links.map(({ href, label, id }) => (
          <Link
            key={href}
            href={href}
            id={id}
            className={`px-3 py-2 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center h-20 ${
              pathname === href ? 'active' : 'text-acier'
            }`}
          >
            {label}
          </Link>
        ))}
        <Button to="/ContactSection" index={1}>
          Prendre un RDV
        </Button>
      </div>

      {/* Bouton menu mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-acier focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </div>
  </div>

  {/* Menu mobile : en dehors du bloc .flex pour qu'il s'affiche dessous */}
  {isOpen && (
  <div className="md:hidden fixed top-16 left-0 right-0 bg-ivoire/95 backdrop-blur-lg px-6 py-2 space-y-1 shadow-lg border-t border-ardoise/20 z-50">
    {links.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        onClick={() => setIsOpen(false)}
        className={`block text-ardoise text-lg font-medium transition-all duration-200 ${
          pathname === href ? 'font-bold underline' : ''
        }`}
      >
        {label}
      </Link>
    ))}

    <Link
      href="/ContactSection"
      onClick={() => setIsOpen(false)}
      className="block mt-6 bg-doré text-white text-center hover:bg-white hover:text-doré transition px-2 py-2 rounded-full font-semibold shadow-md"
    >
      Prendre un RDV
    </Link>
  </div>
)}
</nav>
  );
}
