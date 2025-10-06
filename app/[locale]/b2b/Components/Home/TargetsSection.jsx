'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Building2, Briefcase, Users, Shield } from 'lucide-react'

export default function TargetsSection({ extraClass = '' }) {
  const t = useTranslations('home.targets')

  const targets = [
    { icon: <Building2 className="w-6 h-6" />, text: t('items.0') },
    { icon: <Briefcase className="w-6 h-6" />, text: t('items.1') },
    { icon: <Users className="w-6 h-6" />, text: t('items.2') },
    { icon: <Shield className="w-6 h-6" />, text: t('items.3') }
  ]

  return (
    <section className={`py-20 ${extraClass}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center mb-4">{t('title')}</h2>
          <p className="text-acier dark:text-ivoire/70 text-center mb-12 text-lg">{t('subtitle')}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {targets.map((target, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex items-center gap-4 p-6 bg-ivoire dark:bg-acier/40 rounded-xl shadow-lg border border-acier/20 dark:border-vertSauge/20 hover:border-doré dark:hover:border-doré transition-all"
              >
                <div className="text-doré flex-shrink-0">
                  {target.icon}
                </div>
                <p className="text-anthracite dark:text-ivoire font-medium">{target.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}