'use client'

import React, { useState, useEffect, useRef } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import { motion, AnimatePresence } from 'framer-motion'
import TabsBar from './TabsBar'
import ThemeToggleButton from '../ui/ThemeToggleButton'


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
  const headerRef = useRef(null)

  // À chaque resize ou changement de props, on recalcule la hauteur
  useEffect(() => {
    if (!headerRef.current) return
    const h = headerRef.current.offsetHeight
    document.documentElement.style.setProperty(
      '--header-total-height',
      `${h}px`
    )
  }, [])  // <- tableau vide : ne s'exécute qu'au montage



  // Responsive mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Hauteur du viewport pour % scroll
  const [vh, setVh] = useState(0)
  useEffect(() => {
    const recalc = () => setVh(window.innerHeight)
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [])

  const chooseTitle = !isMobile && mdTitle ? mdTitle : title
  const scrollY = useScrollPosition()

  // ------ Seuils personnalisés ------
  // Description: fade 0% - 10% écran (min 0px)
  const descPct = 0.10
  const descMin = 0
  const descThreshold = Math.max(vh * descPct, descMin)
  const descFade = 1 - Math.min(scrollY / descThreshold, 1)

  // TabsBar: fade 15% - 25% (min 56px)
  const tabsPct = 0.15
  const tabsMin = 56
  const tabsThreshold = Math.max(vh * tabsPct, tabsMin)
  const tabsFade = 1 - Math.max(0, Math.min((scrollY - descThreshold) / tabsThreshold, 1))

  // H1: fade 40% - 20% (min 96px)
  const h1Pct = 0.40
  const h1Min = 96
  const h1Threshold = Math.max(vh * h1Pct, h1Min)
  const h1Fade = 1 - Math.max(0, Math.min((scrollY - descThreshold - tabsThreshold) / h1Threshold, 1))

  const handleTabChange = key => {
    setActiveTab(key)
    onTabChange?.(key)
  }

  return (
    <section
      id="Header-Layout"
      style={{ top: 'var(--navbar-offset)' }}
      className="
        sticky inset-x-0 z-overlay
        bg-white/30 dark:bg-black/30
        border-b border-ardoise/20
        flex flex-col
      "
    >
      {/* titre + toggle */}
      <AnimatePresence initial={false}>
        {h1Fade > 0.01 && (
          <motion.div
            key="header-row"
            initial={{ opacity: 1, y: 0, height: 'auto' }}
            animate={{
              opacity: h1Fade,
              y: -20 * (1 - h1Fade),
              height: h1Fade > 0.01 ? 'auto' : 0,
            }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="relative flex items-center justify-between px-4 py-1 sm:px-6 overflow-hidden"
          >
            <motion.h1
              initial={false}
              animate={false} // Plus besoin d'animer à l'intérieur (hérite du parent)
              className="flex-grow font-bold"
              style={{ opacity: 1, y: 0 }} // Ne pas refaire le fade à ce niveau
            >
              {chooseTitle}
            </motion.h1>
            <div className="flex-shrink-0 md:hidden">
              <ThemeToggleButton />
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '96%' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="absolute bottom-0 h-1 bg-vertSauge dark:bg-doré rounded-full"
              style={{ left: '2%' }}
            />
          </motion.div>
        )}
      </AnimatePresence>


      {/* description */}
      <AnimatePresence initial={false}>
        {descFade > 0.01 && (
          <motion.div
            key="intro"
            initial={{ opacity: 1, y: 0, height: introHeight }}
            animate={{ opacity: descFade, y: -20 * (1 - descFade), height: introHeight }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex items-center justify-center overflow-hidden"
          >
            <h3 className='w-full px-6 text-center text-sm sm:text-l md:text-xl font-normal text-base text-anthracite pl-4'>
              {description}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* onglets TabsBar */}
      <AnimatePresence initial={false}>
        {showTabs && tabsFade > 0.01 && tabs.length > 0 && (
          <motion.div
            ref={headerRef}
            key="tabs"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: tabsFade }}
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
