'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function RoleSection({ extraClass = '' }) {
  const t = useTranslations('role')
  
  return (
    <section className={`py-20 ${extraClass}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-12">{t('title')}</h2>
          
          <div className="bg-gradient-to-br from-acier/10 to-vertSauge/10 dark:from-acier/20 dark:to-vertSauge/20 p-8 md:p-12 rounded-2xl border border-acier/20 dark:border-vertSauge/20">
            <p className="text-xl md:text-2xl mb-8 text-anthracite dark:text-ivoire font-light text-center leading-relaxed">
              {t('subtitle')} <br className="hidden md:block" />
              <span className="text-doré font-bold">{t('description')}</span>
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <motion.div 
                className="bg-ivoire dark:bg-acier/40 p-8 rounded-xl shadow-lg border border-acier/20"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-4">💼</div>
                <h3 className="mb-3 text-doré">{t('institutional')}</h3>
                <p className="text-acier dark:text-ivoire">{t('institutionalCountries')}</p>
              </motion.div>
              
              <motion.div 
                className="bg-ivoire dark:bg-acier/40 p-8 rounded-xl shadow-lg border border-acier/20"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="mb-3 text-doré">{t('retail')}</h3>
                <p className="text-acier dark:text-ivoire">{t('retailDescription')}</p>
              </motion.div>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-4 text-anthracite dark:text-ivoire">
              <Shield className="w-8 h-8 text-doré flex-shrink-0" />
              <p className="font-medium text-center text-lg">{t('independence')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}