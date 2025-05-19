// components/HeaderFixed.jsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import TabsBar from './TabsBar'
import ThemeToggleButton from './ThemeToggleButton'

export default function HeaderFixed({ title, tabs, activeTab, onTabChange }) {
  const [showTabs, setShowTabs] = useState(true)
  const headerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setShowTabs(window.scrollY < 64)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-[var(--cc-banner-height)] z-overlay bg-ivoire/80 dark:bg-acier/80 backdrop-blur"
    >
      {/* Title row: static inside header, separated by bottom border */}
      <div className="relative flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 border-b border-acier/30">
        <h1 className="animated-h1 w-full text-center text-lg font-semibold sm:text-xl md:text-2xl">
          {title}
        </h1>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ThemeToggleButton />
        </div>
      </div>

      {/* Tabs row: collapsible under title, no effect on title height */}
      {tabs && (
        <div
          className={`transition-[max-height] duration-300 ease-out overflow-hidden bg-ivoire/80 dark:bg-acier/80 ${
            showTabs ? 'max-h-16 border-b border-acier/20' : 'max-h-0'
          }`}
        >
          <TabsBar tabs={tabs} activeKey={activeTab} onChange={onTabChange} />
        </div>
      )}
    </header>
  )
}
