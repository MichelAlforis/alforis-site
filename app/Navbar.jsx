'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavConfig } from './components/navbar/NavbarConfig'
import NavbarDesktop from './components/navbar/NavbarDesktop'
import NavbarMobile from './components/navbar/NavbarMobile'
import NavbarLogo from '@/components/Navbar/NavbarLogo'
import { scrollToTop } from '@/hooks/scrollToTop'
import clsx from 'clsx'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // état menu + shadow
  const [isOpen, setIsOpen]         = useState(false)
  const [hasShadow, setHasShadow]   = useState(false)

  // thème jour/nuit persistant
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('alforis-theme')
    if (saved !== null) {
      // on passe en sombre seulement si on a vraiment "dark"
      setDark(saved === 'dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('alforis-theme', dark ? 'dark' : 'light')
  }, [dark])

  // shadow on scroll
  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menu on route change
  useEffect(() => setIsOpen(false), [pathname])

  const links = NavConfig.tabs

  const isActive = href => pathname === href
  const handleLinkClick = href => {
    if (pathname === href) scrollToTop()
  }

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
            grid-cols-[20%_1fr_70%]
            h-full
            items-center
          "
        >

        {/* LOGO & SKIP LINK */}
        {/* col-1: logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" onClick={() => handleLinkClick('/')}>
            <NavbarLogo className="navbar-logo"  />
          </Link>
        </div>

        {/* col-2: vide */}
        <div></div>

        {/* MENU DESKTOP */}
        {/* col-3: nav + bouton mobile */}
        <div className="hidden lg:block">
        <NavbarDesktop
          links={links}
          isActive={isActive}
          handleLinkClick={handleLinkClick}
          setDark={setDark}
        />
        </div>

        {/* MENU MOBILE */}
        <NavbarMobile
          links={links}
          isActive={isActive}
          isOpen={isOpen}
          toggle={() => setIsOpen(o => !o)}
          handleLinkClick={handleLinkClick}
          setDark={setDark}
        />
      </div>
    </header>
  )
}
