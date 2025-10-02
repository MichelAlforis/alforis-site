
// ============================================
// 7. ContactB2BSection.jsx
// ============================================
'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SignatureSVG from '@/assets/illustrations/SignatureSVG'

export default function ContactB2BSection({ extraClass = '', buttonClass = '', onMouseEnter = () => {}, onMouseLeave = () => {} }) {
  return (
    <section className={`py-24 ${extraClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-acier/20 backdrop-blur-sm rounded-2xl p-10 md:p-16 border border-doré/30 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ivoire">
            Accélérez votre développement en Europe
          </h2>
          <p className="text-xl text-ivoire/80 mb-8 leading-relaxed">
            Alforis vous accompagne de Luxembourg à Lisbonne, en passant par Paris et Madrid.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${buttonClass} bg-doré text-anthracite px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3 group mb-10`}
          >
            Parler à Alforis
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </motion.button>
          
          <p className="text-ivoire/60 text-sm mb-8">
            Réponse sous 24h • Première consultation gratuite
          </p>

          <div className="border-t border-doré/20 pt-8 mt-8">
            <p className="text-lg text-ivoire/90 italic mb-6 max-w-3xl mx-auto leading-relaxed">
              "Notre mission : transformer votre ambition européenne en réalité commerciale. 
              Pas de promesses vides, que des connexions qualifiées et une stratégie claire."
            </p>
            <SignatureSVG className="mx-auto h-20 md:h-24 text-doré" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}