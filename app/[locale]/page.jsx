'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { SVGConfig } from '@/public/assets/img/svg/navbarLogoConfig.js'

export default function LocaleChoicePage() {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const params = useParams()
  const locale = params.locale || 'fr'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Alforis',
    alternateName: 'Alforis B2B',
    description: 'Spécialiste de la distribution B2B pour asset managers et sociétés de gestion en Europe',
    url: 'https://www.alforis.fr',
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Luxembourg' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' }
    ],
    serviceType: 'Third Party Marketing Asset Management',
    memberOf: {
      '@type': 'Organization',
      name: 'AFTPM'
    }
  }

  const handleChoice = (choice) => {
    setSelectedChoice(choice)
    
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30)
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('alforis-client-type', choice)
    }

    setTimeout(() => {
      if (choice === 'b2b') {
        window.location.href = `/${locale}/b2b`
      } else {
        window.location.href = '/particulier'
      }
    }, 300)
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-ivoire dark:bg-anthracite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
          
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="h-12 md:h-16">
<motion.svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 2234 500"
  preserveAspectRatio="xMidYMid meet"
  fill="none"
  className="w-auto h-full filter drop-shadow-lg"
>
  <motion.path
    fill="rgb(242 158 76)"
    stroke="rgb(242 158 76)"  // Ajoutez stroke
    strokeWidth={2}           // Ajoutez strokeWidth
    d={SVGConfig.d1}
    initial={{ pathLength: 0, opacity: 0, fill: "rgba(242, 158, 76, 0)" }}
    animate={{ pathLength: 1, opacity: 1, fill: "rgb(242, 158, 76)" }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  />
  <motion.path
    fill="rgb(242 158 76)"
    stroke="rgb(242 158 76)"
    strokeWidth={2}
    d={SVGConfig.d2}
    initial={{ pathLength: 0, opacity: 0, fill: "rgba(242, 158, 76, 0)" }}
    animate={{ pathLength: 1, opacity: 1, fill: "rgb(242, 158, 76)" }}
    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
  />
</motion.svg>
            </div>
          </motion.div>

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-title font-semibold text-anthracite dark:text-doré mb-4">
              Distribution B2B Asset Management
            </h1>
            <p className="text-lg md:text-xl text-acier dark:text-vertSauge">
              & Conseil Patrimonial
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
            
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
              <div className="bg-white/90 dark:bg-acier/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border-2 border-doré/50 dark:border-vertSauge/50 shadow-xl h-full flex flex-col">
                
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-doré/10 dark:bg-vertSauge/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-doré dark:text-vertSauge" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 3h8v2H8v-2zm0 3h6v2H8v-2z"/>
                    </svg>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-title font-semibold text-anthracite dark:text-doré mb-4">
                  Asset Managers B2B
                </h2>
                
                <p className="text-sm md:text-base text-acier dark:text-ivoire mb-6 leading-relaxed flex-grow">
                  Distribution en France, Luxembourg, Espagne, Portugal
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-doré/20 dark:bg-vertSauge/30 text-doré dark:text-vertSauge text-xs font-semibold rounded-full">
                    Activité principale
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-doré/5 to-doré/10 dark:from-vertSauge/5 dark:to-vertSauge/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.button>

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
              <div className="bg-white/90 dark:bg-acier/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-ivoire/30 dark:border-acier/30 shadow-xl h-full flex flex-col">
                
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-ardoise/10 dark:bg-doré/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-ardoise dark:text-doré" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-title font-semibold text-anthracite dark:text-doré mb-4">
                  Particuliers & Familles
                </h2>
                
                <p className="text-sm md:text-base text-acier dark:text-ivoire mb-6 leading-relaxed flex-grow">
                  Conseil patrimonial, bilans, transmission
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-ardoise/10 dark:bg-doré/20 text-ardoise dark:text-doré text-xs rounded-full">
                    Patrimoine
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-ardoise/5 to-ardoise/10 dark:from-doré/5 dark:to-doré/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.button>
          </div>

          <motion.p 
            className="text-center mt-12 text-xs text-acier/70 dark:text-ivoire/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Votre choix sera mémorisé pour vos prochaines visites
          </motion.p>
        </div>

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
    </>
  )
}