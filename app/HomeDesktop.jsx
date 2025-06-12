'use client'
/* app/HomeContent.jsx */

import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import HeroSection from './components/home/HeroSection'
// Static import for HeroSection's component is fine as it's critical
// Other components will be dynamically imported within the sections array or separately
import { Animated } from '../components/animated/Animated'
import useControlledScrollSections from '../hooks/useControlledScrollSections'
import useButtonHover from '../hooks/useButtonHover'
import clsx from 'clsx'

export default function HomeContent() {
  // Dynamically import PortraitSVG as it's used directly and is non-critical for LCP
  const PortraitSVG = dynamic(() => import('./components/home/PortraitSVG'), { ssr: false })

  const sections = [
    { id: 'hero', Component: HeroSection }, // HeroSection remains static
    {
      id: 'services',
      Component: dynamic(() => import('./components/home/ServicesCards'), { ssr: false })
    },
    {
      id: 'approach',
      Component: dynamic(() => import('./components/home/ApproachSection'), { ssr: false })
    },
    {
      id: 'figures',
      Component: dynamic(() => import('./components/home/KeyFigures'), { ssr: false })
    },
    {
      id: 'contact',
      Component: dynamic(() => import('./components/home/Contact'), { ssr: false })
    },
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
            {id === 'hero' ? (
              <div className="absolute inset-0 w-full h-full z-base">
                <Image
                  src="/assets/img/home/D_hero.webp"
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full z-base">
                <Image
                  src={`/assets/img/home/D_${id}.webp`}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            )}

            {/* ❷ Si c'est la section "figures", on insère l’arrière-plan SVG */}
            { id === 'figures' && (
              <motion.div
                className="absolute inset-0 z-base flex justify-end items-end overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <PortraitSVG className="h-full max-h-[80vh] w-auto opacity-70" />
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
