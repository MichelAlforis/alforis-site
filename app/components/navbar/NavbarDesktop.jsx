'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NavbarDesktop({
  links,
  isActive,
  handleLinkClick,
  dark,
  setDark,
}) {
  // applique la classe dark/clair sur le html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])



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
