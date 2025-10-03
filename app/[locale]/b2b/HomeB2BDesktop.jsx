'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Animated from '@/components/animated/Animated'
import useButtonHover from '@/hooks/useButtonHover'
import { useTheme } from "@/styles/ThemeDark"
import clsx from 'clsx'

// Import statique du Hero
import HeroB2BSection from './Components/Home/HeroB2BSection'

// Dynamic imports des autres composants
const CountriesSection = dynamic(() => import('./Components/Home/CountriesSection'), { ssr: false })
const RoleSection = dynamic(() => import('./Components/Home/RoleSection'), { ssr: false })
const DifferentiatorsSection = dynamic(() => import('./Components/Home/DifferentiatorsSection'), { ssr: false })
const ServicesB2BSection = dynamic(() => import('./Components/Home/ServicesB2BSection'), { ssr: false })
const TargetsSection = dynamic(() => import('./Components/Home/TargetsSection'), { ssr: false })
const ContactB2BSection = dynamic(() => import('./Components/Home/ContactB2BSection'), { ssr: false })

export default function HomeB2BDesktop() {
  const { dark } = useTheme()
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  const sections = [
    { id: 'hero', Component: HeroB2BSection, bgImage: '/assets/img/b2b/D_hero_b2b.webp' },
    { id: 'role', Component: RoleSection, bgImage: null },
    { id: 'countries', Component: CountriesSection, bgImage: null }, // Fond dégradé CSS
    { id: 'differentiators', Component: DifferentiatorsSection, bgImage: null },
    { id: 'services', Component: ServicesB2BSection, bgImage: null }, // Fond dégradé CSS
    { id: 'targets', Component: TargetsSection, bgImage: null },
    { id: 'contact', Component: ContactB2BSection, bgImage: null }, // Fond dégradé CSS
  ]

  return (
    <Animated.Page>
      <main
        id="scroll-container-b2b"
        className="relative w-full text-anthracite dark:text-ivoire snap-y snap-mandatory overflow-y-auto md:overflow-hidden md:snap-none"
      >
        {sections.map(({ id, Component, bgImage }) => (
          <section
            key={id}
            id={id}
            className={clsx(
              'relative snap-start',
              id === 'hero' ? 'hero-fullscreen' : 'h-auto md:h-[100dvh]'
            )}
          >
            {/* Image de fond si définie */}
            {bgImage && (
              <div className="absolute inset-0 w-full h-full z-base">
                <Image
                  src={bgImage}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  priority={id === 'hero'}
                  loading={id === 'hero' ? undefined : 'lazy'}
                />
              </div>
            )}

            {/* Fond dégradé CSS pour sections sans image */}
            {!bgImage && id === 'countries' && (
              <div className="absolute inset-0 bg-gradient-to-br from-ardoise via-anthracite to-ardoise" />
            )}
            {!bgImage && id === 'services' && (
              <div className="absolute inset-0 bg-gradient-to-br from-anthracite via-ardoise to-anthracite" />
            )}
            {!bgImage && id === 'contact' && (
              <div className="absolute inset-0 bg-gradient-to-br from-ardoise via-anthracite to-ardoise" />
            )}

            {/* Contenu */}
            <div className="relative z-overlay w-full h-full flex items-center justify-center px-4">
              <Component extraClass="w-full" buttonClass={buttonClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            </div>
          </section>
        ))}
      </main>
    </Animated.Page>
  )
}
