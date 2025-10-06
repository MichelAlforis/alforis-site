// components/pageB2B/PageLayoutB2B.jsx
'use client'

import React from 'react'
import HeaderFixedB2B from './HeaderFixedB2B'
import usePaddingTop from '@/hooks/usePaddingTop'

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

  return (
    <div
      className="min-h-screen bg-ivoire dark:bg-ardoise transition-colors duration-600"
      style={{ paddingTop }}
    >
      <HeaderFixedB2B
        title={title}
        mdTitle={mdTitle}
        description={description}
        introHeight={introHeight}
      />
      
      <main className={`${maxWidth}`}>
        {children}
      </main>
    </div>
  )
}