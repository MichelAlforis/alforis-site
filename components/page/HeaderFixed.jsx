// components/HeaderFixed.jsx
'use client'

import React, { useState, useEffect } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import { motion, AnimatePresence } from 'framer-motion'
import TabsBar from './TabsBar'
import ThemeToggleButton from './ThemeToggleButton'
import SwitchDarkMode from '../ui/SwitchDarkMode'

export default function HeaderFixed({
  title,
  mdTitle,
  description,
  tabs = [],
  activeTab: propActiveTab,
  onTabChange,
  introHeight = '10vh',
  showTabs = true,
}) {
  const [activeTab, setActiveTab] = useState(
    () => propActiveTab ?? tabs[0]?.key ?? ''
  )

  const [isMobile, setIsMobile] = useState(false)

  // Sync prop -> state
  useEffect(() => {
    if (propActiveTab != null) setActiveTab(propActiveTab)
  }, [propActiveTab])

  //  Scroll pour tabs + intro
  const scrollY = useScrollPosition()




  // Detect mobile pour titre
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const chooseTitle = !isMobile && mdTitle ? mdTitle : title

  const handleTabChange = key => {
    setActiveTab(key)
    onTabChange?.(key)
  }
  
    // tu peux maintenant directement :
  const introVisible      = scrollY < 1
  const threshold = isMobile ? 400 : 200

   // On calcule la visibilité des onglets
  const tabsVisibleOnScroll = scrollY < threshold


  return (
    <section
      style={{ top: 'var(--navbar-offset)' }}
      className="
        sticky inset-x-0 z-overlay
        bg-white/10 dark:bg-black/10 backdrop-blur-2xl
        border-b border-ardoise/20
        flex flex-col
      "
    >
      {/* titre + toggle */}
      <div className="relative flex items-center justify-between px-4 py-1 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow font-bold"
        >
          {chooseTitle}
        </motion.h1>
        <div className="flex-shrink-0">
          <ThemeToggleButton />
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '96%' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="absolute bottom-0 h-1 bg-vertSauge dark:bg-doré rounded-full"
          style={{ left: '2%' }}
        />
      </div>

      {/* description “intro” qui disparaît */}
      <AnimatePresence initial={false}>
        {introVisible && (
          <motion.div
            key="intro"
            initial={{ height: introHeight, opacity: 1 }}
            animate={{ height: introHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex items-center justify-center overflow-hidden h-screen"
          >
            <h3 className='w-full px-6 text-center text-sm sm:text-l md:text-xl font-normal text-base text-anthracite pl-4'>
              {description}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* onglets qui se cachent sous scroll */}
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
    </section>
  )
}
