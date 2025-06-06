'use client'
import { motion, useAnimation } from 'framer-motion'

export default function PremiumButton({
  children,
  onClick,
  disabled = false,
  className = '',
  disableAnimation = false,
}) {
  const controls = useAnimation()

  const handleClick = (e) => {
    if (disabled) {
      // 1) Tilt rapide
      controls.start({
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.4 }
      })
      // 2) Vibration longue/double pour signaler l'erreur
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([50, 30, 50])
      }
      return
    }

    // Vibration courte pour confirmation
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30)
    }

    onClick?.(e)
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      disabled={disabled}
      className={`
        w-full py-4 px-6
        text-base font-semibold
        text-acier dark:text-ivoire
        rounded-2xl
        bg-ivoire dark:bg-acier/30 backdrop-blur-md
        border border-ivoire/20 dark:border-acier/20
        shadow-lg
        transition-colors duration-200
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-ivoire/50 dark:hover:bg-acier/50'}
        focus:outline-none focus:ring-4 focus:ring-doré/50
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
