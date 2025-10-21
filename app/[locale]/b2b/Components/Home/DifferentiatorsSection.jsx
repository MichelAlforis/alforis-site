'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Shield, Globe } from 'lucide-react'

export default function DifferentiatorsSection({ extraClass = '' }) {
  const t = useTranslations('home.differentiators')
  const [hoveredCard, setHoveredCard] = useState(null)

  const differentiators = [
    {
      icon: <Target className="w-10 h-10" />,
      title: t('selectivity.title'),
      description: t('selectivity.description')
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: t('dualCulture.title'),
      description: t('dualCulture.description')
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: t('independence.title'),
      description: t('independence.description')
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: t('integrated.title'),
      description: t('integrated.description')
    }
  ]

  return (
    <section className={`py-24 md:py-32 ${extraClass}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-4">{t('title')}</h2>
          <p className="text-acier dark:text-ivoire/70 text-center mb-12 text-lg">{t('subtitle')}</p>
          
          <div className="space-y-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.01 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="flex gap-6 p-6 md:p-8 bg-ivoire dark:bg-acier/40 rounded-2xl shadow-md-soft hover:shadow-lg-soft transition-all duration-300 border border-acier/20 dark:border-vertSauge/20"
              >
                <div className="text-doré flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 text-doré">{item.title}</h3>
                  <p className="text-acier dark:text-ivoire leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}