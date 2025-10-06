// ============================================
// 1. HeroB2BSection.jsx (avec i18n)
// ============================================
'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function HeroB2BSection({ extraClass = '', buttonClass = '', onMouseEnter = () => {}, onMouseLeave = () => {} }) {
  const t = useTranslations('home.hero')
    console.log('Hero locale test:', t('title')) 
    
  return (
    <section className={`w-full min-h-screen flex flex-col items-center justify-center text-center px-4 ${extraClass}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-block mb-6 px-6 py-2 bg-doré/20 backdrop-blur-sm rounded-full text-sm font-semibold text-doré border border-doré/30"
      >
        {t('badge')}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-bold leading-tight mb-6 text-ivoire max-w-5xl"
      >
        {t('title')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl md:text-2xl mb-4 text-doré font-light"
      >
        {t('countries')}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-md md:text-lg text-ivoire/90 font-light mb-10 max-w-4xl mx-auto leading-relaxed"
      >
        {t('description')}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`${buttonClass} bg-doré text-anthracite px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3 group`}
      >
        {t('cta')}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </section>
  )
}