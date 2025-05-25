'use client'

import React, { useEffect } from 'react'
import { motion, useAnimationControls, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { usePathname } from 'next/navigation'
import useScrollPosition from '@/hooks/useScrollPosition'
import { useTheme } from '@/styles/ThemeDark'
import { couleurs } from '@/styles/generated-colors.mjs'
import { SVGConfig } from './navbarLogoConfig'

export default function NavbarLogo({ className = '', isHome }) {
  const pathname = usePathname()
  const isHomePage = isHome ?? pathname === '/'
  const { dark: isDark } = useTheme()

  // 1) Couleur de base dynamique
  const baseColor = (isDark || isHomePage) ? couleurs.ivoire : couleurs.acier

  // 2) Animations contrôles
  const logoCtrls = useAnimationControls()
  const textCtrls = useAnimationControls()

  // 3) Motion values pour couleur & épaisseur
  const fillColor   = useMotionValue(baseColor)
  const strokeColor = useMotionValue(baseColor)
  const strokeWidth = useMotionValue(10)
  const strokeSpring = useSpring(strokeWidth, { stiffness: 200, damping: 20 })
  const fillTpl     = useMotionTemplate`${fillColor}`
  const strokeTpl   = useMotionTemplate`${strokeColor}`

  // 4) Synchroniser mot.values quand baseColor change
  useEffect(() => {
    fillColor.set(baseColor)
    strokeColor.set(baseColor)
    strokeWidth.set(10)
    logoCtrls.set({ pathLength: 0.7 })
    textCtrls.set({ pathLength: 0.8, rotate: 0 })
  }, [baseColor, pathname, logoCtrls, textCtrls, fillColor, strokeColor, strokeWidth])


  // 5) Parallax si tu veux (optionnel ici)
  const scrollY       = useScrollPosition()
  const yParallax     = useSpring(scrollY / 12,      { stiffness: 150, damping: 25 })
  const scaleParallax = useSpring(scrollY > 80 ? 0.85 : 1, { stiffness: 200, damping: 20 })

  // 6) Handlers hover / tap  
  const animateIn = () => {
    // passe en doré
    fillColor.set(couleurs.doré)
    strokeColor.set(couleurs.doré)
    strokeWidth.set(20)

    logoCtrls.start({ pathLength: 1, transition: { duration: 0.5, ease: 'easeOut' } })
    textCtrls.start([
      { pathLength: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } },
      { rotate: [0, -1, 1, 0], transition: { duration: 0.3 } }
    ])
  }

  const animateOut = () => {
    fillColor.set(baseColor)
    strokeColor.set(baseColor)
    strokeWidth.set(10)

    logoCtrls.start({ pathLength: 0.7, transition: { duration: 0.4, ease: 'easeOut' } })
    textCtrls.start([
      { pathLength: 0.8, transition: { duration: 0.4, ease: 'easeOut', delay: 0.1 } },
      { rotate: 0, transition: { duration: 0.3 } }
    ])
  }

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2234 500"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ y: yParallax, scale: scaleParallax, cursor: 'pointer' }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
      onTap={animateIn} // si tu veux le même comportement au tap
    >
      {/* Logo principal */}
      <motion.path
        d={SVGConfig.d1}
        fill={fillTpl}
        stroke={strokeTpl}
        strokeWidth={strokeSpring}
        fillRule="evenodd"     // utile si ton path se auto-intersecte
        clipRule="evenodd"
        initial={{ pathLength: 0.7 }}
        animate={logoCtrls}
        style={{ strokeLinecap: 'round', pointerEvents: 'visiblePainted' }}
      />

      {/* Texte */}
      <motion.path
        d={SVGConfig.d2}
        fill="none"
        stroke={strokeTpl}
        strokeWidth={strokeSpring}
        initial={{ pathLength: 0.8, rotate: 0 }}
        animate={textCtrls}
        style={{ strokeLinecap: 'round', pointerEvents: 'visiblePainted' }}
      />
    </motion.svg>
  )
}
