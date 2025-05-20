// components/HeaderFixed.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TabsBar from './TabsBar'
import ThemeToggleButton from './ThemeToggleButton'

export default function HeaderFixed({
  title,
  tabs = [],
  activeTab: propActiveTab,
  onTabChange,
  introHeight = '10vh',
  showTabs = true,      // <- nouveau, défaut à true
}) {
  const [activeTab, setActiveTab] = useState(
    () => propActiveTab ?? tabs[0]?.key ?? ''
  )
   const [tabsVisibleOnScroll, setTabsVisibleOnScroll] = useState(true) // <-- nouveau nom

  // Si la prop change, on la sync en interne
  useEffect(() => {
    if (propActiveTab != null) {
      setActiveTab(propActiveTab)
    }
  }, [propActiveTab])

  // Scroll listener pour cacher les tabs
  useEffect(() => {
    if (!showTabs) return  // n'active pas l'écouteur si les tabs sont désactivés
    const handler = () => setTabsVisibleOnScroll(window.scrollY < 64)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [showTabs])

  // Wrapper pour propager le changement
  const handleTabChange = (key) => {
    console.log('HeaderFixed onTabChange:', key) 
    setActiveTab(key)
    onTabChange?.(key)
  }

    // State local renommé pour éviter conflit nom (showTabs -> showTabsState)
  const [showTabsState, setShowTabsState] = useState(true)

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
          <div className="relative flex items-center justify-between px-4 py-4 sm:px-6">
            {/* Colonne pour le titre (90% de largeur) */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow text-xl font-bold" // flex-grow pour occuper l'espace restant
            >
              {title}
            </motion.h1>

            {/* Colonne pour le logo (10% de largeur) */}
            <div className="flex-shrink-0 w-1/10">
              <ThemeToggleButton />
            </div>


          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '96%' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="absolute bottom-0 h-1 bg-doré rounded-full"
            style={{ left: '2%' }}
          />
        </div>

        {/* Onglets sous le titre, collapse sans bouger le titre */}
        <AnimatePresence initial={false}>
          {showTabs && tabsVisibleOnScroll && tabs.length > 0 && (
            <motion.div
              key="tabs"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden mt-2 px-4 pb-2"
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
