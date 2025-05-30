'use client'

import React, { useEffect,useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import useScrollPosition from '@/hooks/useScrollPosition'
import SwitchDarkMode from '@/components/ui/SwitchDarkMode'
import PriorityNav from '@/components/Navbar/PriorityNav'
import Button from '@/components/ui/Button'
import NavbarLogo from '@/components/Navbar/NavbarLogo'
import NavLink from '@/components/Navbar/NavLink'
import { scrollToTop } from '@/hooks/scrollToTop'

export default function NavbarDesktop({links}) {


    const pathname = usePathname()
    const isHome   = pathname === '/'
    const [hasShadow, setHasShadow]   = useState(false)
    const scrollY = useScrollPosition();
    const isActive = href => pathname === href
    const handleLinkClick = href => {
      if (pathname === href) scrollToTop()
    }

  // shadow on scroll
  useEffect(() => {
    // Vérifier si scrollY est supérieur à 10 pour appliquer l'ombre
    setHasShadow(scrollY > 10);
  }, [scrollY]);


  return (
    <header
      className={clsx(
        'site-header fixed inset-x-0 top-0 z-nav h-nav transition-shadow duration-300',
        hasShadow && 'shadow-xl',
        isHome
          ? 'bg-transparent backdrop-blur-none'
          : 'bg-ivoire/10 dark:bg-acier/10 backdrop-blur-2xl'
      )}
    >

      <div
        className="
          grid
          grid-cols-[15%_1fr_60%_15%]
          h-full
          items-center
        "
      >

        {/* LOGO & SKIP LINK */}
        {/* col-1: logo */}
        <div className='items-center space-x-4'>
          <Link href="/" onClick={() => handleLinkClick('/')}>
            <NavbarLogo className="navbar-logo" isHome={isHome}  />
          </Link>
        </div>
        
        {/* col-2: vide */}
        <div></div>

        {/* MENU DESKTOP */}
        {/* col-3: nav + bouton mobile */}
      <div className="flex-1 flex items-center justify-end space-x-2 justify-self-end mr-4">
            {/* → Priorité  */}  
            {links.map(l => <NavLink key={l.href} href={l.href} label={l.label} isHome={isHome} />)}

        </div>

          {/* col-4:→ SWITCH MODE JOUR/NUIT */}
        <div className="flex items-center space-x-4 flex-shrink-0 mr-2">
          <SwitchDarkMode/>

          {/* → Bouton rdv */}
          <Button
            to="/prendre-rendez-vous"
            className="btn-alforis-rdv font-semibold "
            onClick={() => handleLinkClick('/prendre-rendez-vous')}
          >
            Prendre un RDV
          </Button>
        </div>
    </div>
  </header>
  )
}
