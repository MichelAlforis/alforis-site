'use client'
/* app/HomeContent.jsx */

import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from './components/home/HeroSection'
import ServicesCards from './components/home/ServicesCards'
import ApproachSection from './components/home/ApproachSection'
import KeyFigures from './components/home/KeyFigures'
import Contact from './components/home/Contact'
import PortraitSVG from './components/home/PortraitSVG'
import { Animated } from '../components/animated/Animated'
import useControlledScrollSections from '../hooks/useControlledScrollSections'
import useButtonHover from '../hooks/useButtonHover'
import clsx from 'clsx'

export default function HomeContent() {
  const sections = [
    { id: 'hero', Component: HeroSection },
    { id: 'services', Component: ServicesCards },
    { id: 'approach', Component: ApproachSection },
    { id: 'figures', Component: KeyFigures },
    { id: 'contact', Component: Contact },
  ]

  const { goToNextSection, goToPrevSection } = useControlledScrollSections(
    sections.map((s) => s.id)
  )
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <Animated.Page>
      <main
        id="scroll-container"
        className="relative w-full text-anthracite snap-y snap-mandatory overflow-y-auto md:overflow-hidden md:snap-none"
      >
        {sections.map(({ id, Component }) => (
          <section
            key={id}
            id={id}
            className={clsx(
              'relative snap-start',            // commun à toutes
              id === 'hero'
                ? 'hero-fullscreen'              // only full-screen Hero
                : 'h-auto md:h-[100dvh]'         // les autres : auto mobile, 100dvh tablette+
            )}
          >
            {/* ❶ Image de fond classique (desktop/mobile) */}
            <picture className="absolute inset-0 w-full h-full z-base">
              <source srcSet={`/assets/img/home/D_${id}.webp`} />
              <img
                src={`/assets/img/home/M_${id}.webp`}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </picture>

            {/* ❷ Si c'est la section "figures", on insère l’arrière-plan SVG */}
            {id === 'figures' && (
              <motion.div
                className="absolute inset-0 z-base flex items-center"
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <PortraitSVG className="absolute inset-y-0 right-0 opacity-70" />
              </motion.div>
            )}

            {/* ❸ Contenu principal, toujours au-dessus */}
            <div className="relative z-overlay w-full h-full flex items-center justify-center px-4">
              <Component extraClass="w-full" />
            </div>
          </section>
        ))}
      </main>
    </Animated.Page>
  )
}
