'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import cn from 'classnames'
import useButtonHover from '@/hooks/useButtonHover'

/**
 * Button component styled for Alforis UI
 * Variants map to global CSS utility classes to avoid specificity clashes
 * Props:
 * - children: button content
 * - variant: 'retro' | 'outline' | 'rdv'
 * - sound: boolean, play click sound
 * - to: optional route to navigate
 * - onClick: click handler
 * - index: for hover sound timing
 * - className: additional classes
 * - type: button type
 */
const VARIANT_CLASSES = {
  retro: 'btn-alforis-retro',     // style from global.css
  outline: 'btn-alforis-outline',
  rdv: 'btn-alforis-rdv',
}

const Button = forwardRef(({
  children,
  variant = 'retro',
  sound = true,
  to = '',
  onClick,
  index = 0,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const router = useRouter()
  const { getButtonProps } = useButtonHover()

  const handleClick = (e) => {
    if (sound) {
      const clickSound = new Audio('/sounds/click-retro.wav')
      clickSound.volume = 0.5
      clickSound.play()
    }

    if (to) {
      setTimeout(() => router.push(to), 180)
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={handleClick}
      className={cn(
        VARIANT_CLASSES[variant],
        'focus:outline-none focus:ring-2 focus:ring-doré transition',
        className
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...getButtonProps(index)}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button
