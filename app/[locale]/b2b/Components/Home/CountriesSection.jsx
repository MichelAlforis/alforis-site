'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function CountriesSection({ extraClass = '' }) {
  const t = useTranslations('home.countries')
  const [activeCountry, setActiveCountry] = useState(null)

  const countries = [
    {
      code: 'FR',
      name: t('france.name'),
      flag: '🇫🇷',
      description: t('france.description'),
      highlights: [
        t('france.highlights.0'),
        t('france.highlights.1'),
        t('france.highlights.2')
      ]
    },
    {
      code: 'LU',
      name: t('luxembourg.name'),
      flag: '🇱🇺',
      description: t('luxembourg.description'),
      highlights: [
        t('luxembourg.highlights.0'),
        t('luxembourg.highlights.1'),
        t('luxembourg.highlights.2')
      ]
    },
    {
      code: 'ES',
      name: t('spain.name'),
      flag: '🇪🇸',
      description: t('spain.description'),
      highlights: [
        t('spain.highlights.0'),
        t('spain.highlights.1'),
        t('spain.highlights.2')
      ]
    },
    {
      code: 'PT',
      name: t('portugal.name'),
      flag: '🇵🇹',
      description: t('portugal.description'),
      highlights: [
        t('portugal.highlights.0'),
        t('portugal.highlights.1'),
        t('portugal.highlights.2')
      ]
    }
  ]

  return (
    <section className={`py-20 ${extraClass}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-4 text-ivoire">{t('title')}</h2>
          <p className="text-ivoire/70 text-center mb-16 text-lg">{t('subtitle')}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                onHoverStart={() => setActiveCountry(country.code)}
                onHoverEnd={() => setActiveCountry(null)}
                className="bg-acier/30 backdrop-blur-sm p-6 rounded-2xl border-2 border-doré/20 hover:border-doré transition-all cursor-pointer"
              >
                <div className="text-6xl mb-4 text-center">{country.flag}</div>
                <h3 className="text-2xl font-bold mb-3 text-center text-doré">{country.name}</h3>
                <p className="text-ivoire/80 text-sm mb-6 text-center leading-relaxed">{country.description}</p>
                
                <div className="space-y-2">
                  {country.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-ivoire/90">
                      <CheckCircle className="w-4 h-4 text-doré flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}