// components/HeaderFixed.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TabsBar from './TabsBar'
import ThemeToggleButton from '../ui/ThemeToggleButton'

export default function HeaderFixed({
  title,
  mdTitle,
  tabs = [],
  activeTab: propActiveTab,
  onTabChange,
  introHeight = '15vh'

}) {
  const [activeTab, setActiveTab] = useState(
    () => propActiveTab ?? tabs[0]?.key ?? ''
  )
  const [showTabs, setShowTabs] = useState(true)

  // Si la prop change, on la sync en interne
  useEffect(() => {
    if (propActiveTab != null) {
      setActiveTab(propActiveTab)
    }
  }, [propActiveTab])

  // Scroll listener pour cacher les tabs
  useEffect(() => {
    const handler = () => setShowTabs(window.scrollY < 64)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Wrapper pour propager le changement
  const handleTabChange = (key) => {
    setActiveTab(key)
    onTabChange?.(key)
  }

  return (
    <>
      {/* Spacer (intro) */}
      <div style={{ height: introHeight }} />

      {/* Header fixe sous la bannière + navbar */}
      <header
        style={{ top: 'var(--navbar-offset)' }}
        className="
          sticky inset-x-0 z-overlay
          bg-white/10 dark:bg-black/10 backdrop-blur-2xl
          border-b border-ardoise/20
          flex flex-col
        "
      >
        {/* Ligne titre + déco */}
        <div className="relative flex items-center justify-center px-4 py-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="animated-h1 text-xl sm:text-2xl md:text-3xl lg:text-4xl
                       font-extrabold text-anthracite dark:text-ivoire"
          >
            {title}
          </motion.h1>

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ThemeToggleButton />
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="absolute bottom-0 h-1 bg-doré rounded-full"
            style={{ left: '30%' }}
          />
        </div>

        {/* Onglets sous le titre, collapse sans bouger le titre */}
        <AnimatePresence initial={false}>
          {showTabs && tabs.length > 0 && (
            <motion.div
              key="tabs"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden bg-white/10 dark:bg-black/10
                         backdrop-blur-2xl border-t border-ardoise/20 px-4 pb-2"
            >
              <TabsBar
                tabs={tabs}
                activeKey={activeTab}
                onChange={handleTabChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

