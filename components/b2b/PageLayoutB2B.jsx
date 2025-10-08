// components/pageB2B/PageLayoutB2B.jsx
'use client'

import React, { useRef } from 'react'
import HeaderFixedB2B from './HeaderFixedB2B'
import usePaddingTop from '@/hooks/usePaddingTop'
import useScrollPosition from '@/hooks/useScrollPosition' // 👈 1. Importer le hook

/**
 * PageLayoutB2B: wrapper pour les pages B2B Alforis
 * - HeaderFixedB2B avec animations de scroll (sans TabsBar)
 * - Full screen classique
 * - Padding dynamique via hook
 */
export default function PageLayoutB2B({
  children,
  title,
  mdTitle,
  description,
  introHeight = '12vh',
  maxWidth = 'w-full',
}) {
  const paddingTop = usePaddingTop()
  const mainRef = useRef(null)
  const scrollY = useScrollPosition(mainRef) // 👈 2. Mesurer le scroll du <main>

  return (
    <div className="relative min-h-screen bg-ivoire dark:bg-ardoise transition-colors duration-600">
      <HeaderFixedB2B
        title={title}
        mdTitle={mdTitle}
        description={description}
        introHeight={introHeight}
        scrollY={scrollY} // 👈 3. Passer la position de scroll au header
      />
      
      <main
        ref={mainRef}
        data-scroll-root
        className={`${maxWidth} relative min-h-screen h-screen overflow-y-auto`}
        style={{ paddingTop }}
      >
        {children}
      </main>
    </div>
  )
}