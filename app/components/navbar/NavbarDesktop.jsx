'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import SwitchDarkMode from '@/components/ui/SwitchDarkMode'

export default function NavbarDesktop({
  links,
  isActive,
  handleLinkClick,
  dark,
  setDark,
}) {

  return (
    <div className="nav-links flex items-center space-x-4">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={() => handleLinkClick(href)}
          className={isActive(href) ? 'active' : ''}
        >
          {label}
        </Link>
      ))}

      {/* → SWITCH MODE JOUR/NUIT */}
      <SwitchDarkMode/>

      <Button
        to="/prendre-rendez-vous"
        className="btn-alforis-rdv"
        onClick={() => handleLinkClick('/prendre-rendez-vous')}
      >
        Prendre un RDV
      </Button>
    </div>
  )
}
