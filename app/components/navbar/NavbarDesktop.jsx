'use client'

import React, { useEffect } from 'react'
import PriorityNav from '@/components/Navbar/PriorityNav'
import Button from '@/components/ui/Button'
import SwitchDarkMode from '@/components/Navbar/SwitchDarkMode'

export default function NavbarDesktop({
  links,
  isActive,
  handleLinkClick,
  dark,
  setDark,
}) {

  return (
    <div className="flex items-center space-x-6">
      {/* → Priorité  */}  
      <PriorityNav 
        links={links}
        isActive={isActive}
        handleLinkClick={handleLinkClick}
        />

      {/* → SWITCH MODE JOUR/NUIT */}
      <SwitchDarkMode/>

      {/* → Bouton rdv */}
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
