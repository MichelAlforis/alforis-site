import { motion, useAnimationControls, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { couleurs } from "@/public/styles/colors"
import Link from 'next/link'

export function useGoldEffect({ reverse = false, initial } = {}) {
  const controls = useAnimationControls()

  const fillColor = useMotionValue(initial || (reverse ? couleurs.acier : couleurs.doré))
  const strokeColor = useMotionValue(reverse ? couleurs.acier : couleurs.doré)
  const strokeWidth = useMotionValue(2)

  const strokeSpring = useSpring(strokeWidth, { stiffness: 200, damping: 20 })
  const fillColorTemplate = useMotionTemplate`${fillColor}`
  const strokeColorTemplate = useMotionTemplate`${strokeColor}`

  const onEnter = () => {
    fillColor.set(reverse ? couleurs.doré : couleurs.acier)
    strokeColor.set(reverse ? couleurs.doré : couleurs.acier)
    strokeWidth.set(20)
    controls.start({ opacity: 1, transition: { duration: 0.2 } })
  }

  const onLeave = () => {
    fillColor.set(reverse ? couleurs.acier : couleurs.doré)
    strokeColor.set(reverse ? couleurs.acier : couleurs.doré)
    strokeWidth.set(2)
    controls.start({ opacity: 1, transition: { duration: 0.2 } })
  }

  return {
    controls,
    fillColorTemplate,
    strokeColorTemplate,
    strokeSpring,
    onEnter,
    onLeave
  }
}

export const GoldText = ({ children, className = "", reverse = false }) => {
  const { fillColorTemplate, onEnter, onLeave } = useGoldEffect({ reverse })

  return (
    <motion.span
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        color: fillColorTemplate,
        fontWeight: 700,
        textShadow: '0 0 6px rgba(200,167,101,0.4)',
        transition: 'color 0.3s ease, text-shadow 0.3s ease',
      }}
      className={className}
    >
      {children}
    </motion.span>
  )
}

export const GoldLink = ({ href, children, className = "", reverse = false }) => {
  const { fillColorTemplate, onEnter, onLeave } = useGoldEffect({ reverse })

  return (
    <Link href={href} className={className}>
      <motion.span
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          color: fillColorTemplate,
          display: 'inline-block',
          fontWeight: 500,
          textShadow: reverse ? 'none' : '0 0 6px rgba(200,167,101,0.3)',
          transition: 'color 0.3s ease, text-shadow 0.3s ease',
        }}
      >
        {children}
      </motion.span>
    </Link>
  )
}
