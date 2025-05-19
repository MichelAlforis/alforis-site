// components/AnimatedBackground.jsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { couleurs } from '@/styles/generated-colors'

// Passe un "rgb(r g b)" en "rgba(r, g, b, a)"
const toRgba = (rgbString, alpha) => {
  const [r, g, b] = rgbString.match(/\d+/g)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function AnimatedBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // 1er halo : doré chaud en clair, ivoire léger en sombre
  const halo1 = isDark
    ? toRgba(couleurs.ivoire, 0.15)
    : toRgba(couleurs.doré,    0.1)

  // 2ᵉ halo : acier en sombre, vertSauge en clair
  const halo2 = isDark
    ? toRgba(couleurs.acier,     0.1)
    : toRgba(couleurs.vertSauge, 0.08)



  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Halo chaud/pâle */}
      <motion.span
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 350,
          height: 350,
          background: `radial-gradient(circle, ${halo1}, transparent)`,
          top: '15%',
          left: '5%',
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 70, ease: 'linear' }}
      />

      {/* Halo doux vert/acier */}
      <motion.span
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 450,
          height: 450,
          background: `radial-gradient(circle, ${halo2}, transparent)`,
          bottom: '10%',
          right: '8%',
        }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
      />
    </div>
    
  )
}
