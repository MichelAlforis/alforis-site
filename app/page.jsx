'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientSelectorOverlay() {
  const [isVisible, setIsVisible] = useState(true)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const router = useRouter()

  // Vérifier si l'utilisateur a déjà fait un choix
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedChoice = localStorage.getItem('alforis-client-type')
      if (savedChoice && (savedChoice === 'b2b' || savedChoice === 'particulier')) {
        // Redirection automatique si choix mémorisé
        setTimeout(() => {
          router.push(`/${savedChoice}`)
        }, 100)
        return
      }
    }
  }, [router])

  const handleChoice = (choice) => {
    setSelectedChoice(choice)
    
    // Vibration tactile si supportée
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30)
    }

    // Sauvegarder le choix
    if (typeof window !== 'undefined') {
      localStorage.setItem('alforis-client-type', choice)
    }

    // Animation de sortie puis redirection
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        router.push(`/${choice}`)
      }, 300)
    }, 200)
  }

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  }

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.3 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-ivoire dark:bg-anthracite"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Contenu principal */}
        <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
          
          {/* Logo temporaire */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="text-4xl font-title font-bold text-doré">
              ALFORIS
            </div>
          </motion.div>

          {/* Titre principal */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-title font-semibold text-anthracite dark:text-doré mb-4">
              Bienvenue chez Alforis
            </h1>
            <p className="text-lg md:text-xl text-acier dark:text-vertSauge">
              Sélectionnez votre espace de conseil patrimonial
            </p>
          </motion.div>

          {/* Cartes de sélection */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            
            {/* Carte Professionnels */}
            <motion.button
              onClick={() => handleChoice('b2b')}
              className="group relative overflow-hidden"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={0}
            >
              <div className="bg-white/90 dark:bg-acier/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-ivoire/30 dark:border-acier/30 shadow-xl">
                
                {/* Icône */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-doré/10 dark:bg-vertSauge/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-doré dark:text-vertSauge" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 3h8v2H8v-2zm0 3h6v2H8v-2z"/>
                    </svg>
                  </div>
                </div>

                {/* Contenu */}
                <h2 className="text-xl md:text-2xl font-title font-semibold text-anthracite dark:text-doré mb-4">
                  Professionnels & Institutions
                </h2>
                
                <p className="text-sm md:text-base text-acier dark:text-ivoire mb-6 leading-relaxed">
                  Banques privées, gérants d'actifs, family offices, corporates
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-doré/10 dark:bg-vertSauge/20 text-doré dark:text-vertSauge text-xs rounded-full">
                    Institutionnel
                  </span>
                  <span className="px-3 py-1 bg-doré/10 dark:bg-vertSauge/20 text-doré dark:text-vertSauge text-xs rounded-full">
                    Partenariats
                  </span>
                </div>

                {/* Effet de survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-doré/5 to-doré/10 dark:from-vertSauge/5 dark:to-vertSauge/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.button>

            {/* Carte Particuliers */}
            <motion.button
              onClick={() => handleChoice('particulier')}
              className="group relative overflow-hidden"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={1}
            >
              <div className="bg-white/90 dark:bg-acier/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-ivoire/30 dark:border-acier/30 shadow-xl">
                
                {/* Icône */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-ardoise/10 dark:bg-doré/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-ardoise dark:text-doré" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>

                {/* Contenu */}
                <h2 className="text-xl md:text-2xl font-title font-semibold text-anthracite dark:text-doré mb-4">
                  Particuliers & Familles
                </h2>
                
                <p className="text-sm md:text-base text-acier dark:text-ivoire mb-6 leading-relaxed">
                  Conseil patrimonial, bilans, transmission, optimisation
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-ardoise/10 dark:bg-doré/20 text-ardoise dark:text-doré text-xs rounded-full">
                    Patrimoine
                  </span>
                  <span className="px-3 py-1 bg-ardoise/10 dark:bg-doré/20 text-ardoise dark:text-doré text-xs rounded-full">
                    Sur-mesure
                  </span>
                </div>

                {/* Effet de survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-ardoise/5 to-ardoise/10 dark:from-doré/5 dark:to-doré/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.button>
          </div>

          {/* Note discrète */}
          <motion.p 
            className="text-center mt-12 text-xs text-acier/70 dark:text-ivoire/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Votre choix sera mémorisé pour vos prochaines visites
          </motion.p>
        </div>

        {/* Indicateur de chargement lors de la sélection */}
        <AnimatePresence>
          {selectedChoice && (
            <motion.div
              className="absolute inset-0 bg-black/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white dark:bg-anthracite rounded-full p-4 shadow-lg">
                <div className="w-8 h-8 border-3 border-doré border-t-transparent rounded-full animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}