'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import useButtonHover from '@/hooks/useButtonHover'

const CallToAction = () => {
  const router = useRouter()
  const { getButtonProps } = useButtonHover()

  const handleDelayedNavigation = (path) => {
    const clickSound = new Audio('/sounds/click-retro.wav')
    clickSound.volume = 0.5
    clickSound.play()
    setTimeout(() => router.push(path), 180)
  }

  return (
    <motion.div
      className="mt-24 max-w-5xl mx-auto flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.button
        {...getButtonProps(0)}
        onClick={() => handleDelayedNavigation('/Profil-De-Vie')}
        className="w-full md:w-[280px] h-[60px] btn-alforis-retro flex items-center justify-center"
      >
        Explorer mon Profil de Vie
      </motion.button>

      <motion.button
        {...getButtonProps(1)}
        onClick={() => handleDelayedNavigation('/ContactSection')}
        className="w-full md:w-[280px] h-[60px] btn-alforis-retro flex items-center justify-center"
      >
        Prendre rendez-vous avec Alforis
      </motion.button>

      {/* 3e bouton si besoin */}
      {/*
      <motion.button
        {...getButtonProps(2)}
        onClick={() => handleDelayedNavigation('/some-other-page')}
        className="w-full md:w-[280px] h-[60px] btn-alforis-retro flex items-center justify-center"
      >
        Autre action stratégique
      </motion.button>
      */}
    </motion.div>
  )
}

export default CallToAction
