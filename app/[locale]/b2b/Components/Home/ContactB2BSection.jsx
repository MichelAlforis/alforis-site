'use client'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SignatureSVG from '@/assets/illustrations/SignatureSVG'

export default function ContactB2BSection({ 
  extraClass = '', 
  buttonClass = '', 
  onMouseEnter = () => {}, 
  onMouseLeave = () => {} 
}) {
  const t = useTranslations('home.contact')
  const router = useRouter()
  const locale = useLocale()
  
  const handleContactClick = () => {
    router.push(`/${locale}/b2b/contact`)
  }
  
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
            {t('title')}
          </h2>
          <p className="text-xl text-ivoire/80 mb-8 leading-relaxed">
            {t('description')}
          </p>
          
          <motion.button
            onClick={handleContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`
              ${buttonClass} 
              relative z-50
              bg-doré text-anthracite 
              px-12 py-5 rounded-full 
              font-bold text-lg 
              shadow-2xl hover:shadow-3xl 
              transition-all 
              inline-flex items-center gap-3 
              group mb-10
              cursor-pointer
              hover:bg-doré/90
            `}
          >
            {t('cta')}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </motion.button>
          
          <p className="text-ivoire/60 text-sm mb-8">
            {t('response')}
          </p>

          <div className="border-t border-doré/20 pt-8 mt-8">
            <p className="text-lg text-ivoire/90 italic mb-6 max-w-3xl mx-auto leading-relaxed">
              "{t('quote')}"
            </p>
            <SignatureSVG className="mx-auto h-20 md:h-24 text-doré" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}