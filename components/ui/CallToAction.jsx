'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import useButtonHover from '@/hooks/useButtonHover'
import { useState, useEffect, useRef } from 'react'

const CTA_BUTTONS = [
  {
    label: 'Explorer mon Profil de Vie',
    path: '/profil-de-vie',
  },
  {
    label: 'Prendre rendez-vous avec Alforis',
    path: '/prendre-rendez-vous',
  },
]

export default function CallToAction() {
  const router = useRouter()
  const { getButtonProps } = useButtonHover()
  const [isNavigating, setIsNavigating] = useState(false)
  const clickSoundRef = useRef(null)

  useEffect(() => {
    clickSoundRef.current = new Audio('/sounds/click-retro.wav')
    clickSoundRef.current.volume = 0.4
    clickSoundRef.current.preload = 'auto'
  }, [])

  const handleClick = (path) => {
    if (isNavigating) return
    setIsNavigating(true)

    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch(console.error)
    }

    setTimeout(() => router.push(path), 400)
  }

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.2, duration: 0.7, ease: 'easeOut' },
    }),
    hover: { scale: 1.04, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  }

  return (
    <motion.div
      className="mt-24 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 px-4"
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {CTA_BUTTONS.map((btn, i) => (
        <motion.button
          key={btn.path}
          {...getButtonProps(i)}
          custom={i}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleClick(btn.path)}
          disabled={isNavigating}
          className={`
            relative w-full md:w-[320px] h-[65px] rounded-xl 
            btn-alforis-rdv
            tracking-wide overflow-hidden shadow-lg shadow-doré/10 transition-all duration-500
            ${isNavigating ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
          `}
        >
          {/* Effet de fond plus visible au survol */}
          <motion.span
            className="absolute inset-0 bg-doré opacity-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.4 }}
          />

          {/* Halo net et élégant au clic */}
          {isNavigating && (
            <motion.span
              className="absolute inset-0 rounded-xl ring-2 ring-doré"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.15, opacity: [0.5, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}

          {/* Texte */}
          <span className="relative z-10">{btn.label}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}
