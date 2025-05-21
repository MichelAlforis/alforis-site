'use client'

import React, { useEffect } from 'react'
import PriorityNav from '@/components/Navbar/PriorityNav'
import Button from '@/components/ui/Button'
import SwitchDarkMode from '@/components/Navbar/SwitchDarkMode'
import { usePathname } from 'next/navigation'

export default function NavbarDesktop({
  links,
  isActive,
  handleLinkClick,
  dark,
  setDark,
}) {

    const pathname = usePathname()
    const isHome   = pathname === '/'


  return (
  <div className="flex items-center">
    <div className="flex-1 flex items-center space-x-6 overflow-x-auto">
        {/* → Priorité  */}  
        <PriorityNav 
          links={links}
          isActive={isActive}
          handleLinkClick={handleLinkClick}
          isHome={isHome}
          />
      </div>

      {/* → SWITCH MODE JOUR/NUIT */}
      <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
      <SwitchDarkMode/>

      {/* → Bouton rdv */}
      <Button
        to="/prendre-rendez-vous"
        className="btn-alforis-rdv font-semibold"
        onClick={() => handleLinkClick('/prendre-rendez-vous')}
      >
        Prendre un RDV
      </Button>
    </div>
  </div>
  )
}
