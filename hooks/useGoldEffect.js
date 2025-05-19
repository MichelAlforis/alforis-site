'use client'

import { motion, useAnimationControls, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { couleurs } from "@/styles/generated-colors";
import Link from 'next/link'

// Hook d’effet or/acier
export function useGoldEffect({ reverse = false, initial } = {}) {
  const controls = useAnimationControls()

  const couleurDepart = reverse ? couleurs.acier : couleurs.doré
  const couleurHover = reverse ? couleurs.doré : couleurs.acier

  const fillColor = useMotionValue(initial || couleurDepart)
  const strokeColor = useMotionValue(couleurDepart)
  const strokeWidth = useMotionValue(2)

  const strokeSpring = useSpring(strokeWidth, { stiffness: 200, damping: 20 })
  const fillColorTemplate = useMotionTemplate`${fillColor}`
  const strokeColorTemplate = useMotionTemplate`${strokeColor}`

  const onEnter = () => {
    fillColor.set(couleurHover)
    strokeColor.set(couleurHover)
    strokeWidth.set(20)
    controls.start({ opacity: 1, transition: { duration: 0.2 } })
  }

  const onLeave = () => {
    fillColor.set(couleurDepart)
    strokeColor.set(couleurDepart)
    strokeWidth.set(2)
    controls.start({ opacity: 1, transition: { duration: 0.2 } })
  }

  return {
    controls,
    fillColorTemplate,
    strokeColorTemplate,
    strokeSpring,
    onEnter,
    onLeave,
    couleurDepart,
    couleurHover,
  }
}

// Texte animé avec effet or
export const GoldText = ({ children, className = "", reverse = false }) => {
  const { fillColorTemplate, onEnter, onLeave, couleurDepart } = useGoldEffect({ reverse })

  return (
    <motion.span
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        color: fillColorTemplate,
        fontWeight: 700,
        textShadow: `0 0 6px ${couleurDepart}55`,
        transition: 'color 0.3s ease, text-shadow 0.3s ease',
      }}
      className={className}
    >
      {children}
    </motion.span>
  )
}

// Lien animé avec effet or
export const GoldLink = ({ href, children, className = "", reverse = false }) => {
  const { fillColorTemplate, onEnter, onLeave, couleurDepart } = useGoldEffect({ reverse })

  return (
    <Link href={href} className={className}>
      <motion.span
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          color: fillColorTemplate,
          display: 'inline-block',
          fontWeight: 500,
          textShadow: reverse ? 'none' : `0 0 6px ${couleurDepart}55`,
          transition: 'color 0.3s ease, text-shadow 0.3s ease',
        }}
      >
        {children}
      </motion.span>
    </Link>
  )
}
