'use client'
// app/a-propos/PageClient.jsx

import React, { useState, useEffect } from 'react'
import PageLayout from '@/components/page/PageLayout'           // ton layout global
import { pageConfig } from './pageConfig'                            // title, tabs, etc.
import AProposDesktop from './AProposPageDesktop'
import AProposMobile from './AProposPageMobile'


export default function PageClient({ content }) {
  const [activeTab, setActiveTab] = useState(
    Array.isArray(pageConfig.tabs) && pageConfig.tabs.length > 0
      ? pageConfig.tabs[0].key
      : ''
  )

  const [isMobile, setIsMobile] = useState(false)

    // Détection taille du mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);  // Détecte la largeur de l'écran
    };

    handleResize();  // Appel initial pour déterminer la taille de l'écran au chargement
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    {!isMobile && (<AProposDesktop/>)}
    {isMobile && (<AProposMobile/>)}
    </>
  )
}
