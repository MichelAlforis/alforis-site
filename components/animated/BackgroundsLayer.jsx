'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const sections = ['hero', 'services', 'approach', 'figures', 'contact']

const bgClasses = {
  hero: 'bg-hero-mobile sm:bg-hero-desktop',
  services: 'bg-services-mobile sm:bg-services-desktop',
  approach: 'bg-approach-mobile sm:bg-approach-desktop',
  figures: 'bg-figures-mobile sm:bg-figures-desktop',
  contact: 'bg-contact-mobile sm:bg-contact-desktop',
}

export default function BackgroundsLayer({ activeSection }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -100]) // effet parallax

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {sections.map((section) => (
        <motion.div
          key={section}
          style={{ y }}
          className={`
            absolute inset-0 w-full h-full
            bg-contain bg-no-repeat bg-center
            transition-opacity duration-700 ease-in-out
            will-change-transform
            ${bgClasses[section]}
            ${section === activeSection ? 'opacity-100' : 'opacity-0'}
          `}
        />
      ))}
    </div>
  )
}
