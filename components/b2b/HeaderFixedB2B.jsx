'use client'

import React, { useState, useEffect } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggleButton from '../ui/ThemeToggleButton'

/**
 * HeaderFixedB2B - Header animé pour pages B2B sans TabsBar
 * Spécificités :
 * - Barre de progression dorée
 * - Fade progressif du titre et description au scroll
 * - Pas de navigation par onglets (trop casual pour B2B)
 */
export default function HeaderFixedB2B({
  title,
  mdTitle,
  description,
  introHeight = '12vh',
}) {
  const [isMobile, setIsMobile] = useState(false)

  // Détection responsive mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Hauteur du viewport pour calculs de seuils
  const [vh, setVh] = useState(0)
  useEffect(() => {
    const recalc = () => setVh(window.innerHeight)
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [])

  const chooseTitle = !isMobile && mdTitle ? mdTitle : title
  const scrollY = useScrollPosition()

  // ------ Seuils d'animation B2B ------
  
  // Description: fade 0% - 15% écran
  const descPct = 0.15
  const descMin = 0
  const descThreshold = Math.max(vh * descPct, descMin)
  const descFade = 1 - Math.min(scrollY / descThreshold, 1)

  // H1: fade 15% - 30%
  const h1Pct = 0.30
  const h1Min = 120
  const h1Threshold = Math.max(vh * h1Pct, h1Min)
  const h1Fade = 1 - Math.max(0, Math.min((scrollY - descThreshold) / h1Threshold, 1))

  return (
    <section
      id="Header-B2B-Layout"
      style={{ top: 'var(--navbar-offset)' }}
      className="
        sticky inset-x-0 z-overlay
        bg-white/40 dark:bg-black/40
        backdrop-blur-xl
        border-b border-doré/20
        flex flex-col
      "
    >
      {/* Titre + Toggle theme */}
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
            className="relative flex items-center justify-between px-4 py-2 sm:px-6 overflow-hidden"
          >
            <motion.h1
              initial={false}
              animate={false}
              className="flex-grow font-title font-bold text-lg sm:text-xl md:text-2xl text-ardoise dark:text-doré"
              style={{ opacity: 1, y: 0 }}
            >
              {chooseTitle}
            </motion.h1>
            
            <div className="flex-shrink-0 md:hidden">
              <ThemeToggleButton />
            </div>
            
            {/* Barre de progression dorée */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '94%' }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="absolute bottom-0 h-1 bg-gradient-to-r from-doré via-vertSauge to-doré rounded-full"
              style={{ left: '3%' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Description / Sous-titre */}
      <AnimatePresence initial={false}>
        {descFade > 0.01 && (
          <motion.div
            key="intro"
            initial={{ opacity: 1, y: 0, height: introHeight }}
            animate={{ 
              opacity: descFade, 
              y: -20 * (1 - descFade), 
              height: introHeight 
            }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex items-center justify-center overflow-hidden"
          >
            <h2 className="w-full px-6 text-center text-sm sm:text-base md:text-lg font-normal text-anthracite dark:text-ivoire/80 italic">
              {description}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}