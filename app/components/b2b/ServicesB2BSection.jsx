
// ============================================
// 5. ServicesB2BSection.jsx
// ============================================
'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function ServicesB2BSection({ extraClass = '' }) {
  const services = [
    'Stratégie de distribution multi-pays avec roadmap claire sur 4 marchés',
    'Accès qualifié aux réseaux clés : bancassureurs, private banks, family offices, plateformes',
    'Roadshows et événements ciblés avec interlocuteurs décisionnaires pré-qualifiés',
    'Support réglementaire et accompagnement onboarding distributeurs',
    'Traduction & adaptation marketing FR/ES/PT (pas de "copy-paste")'
  ]

  return (
    <section className={`py-20 ${extraClass}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-acier/20 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-doré/20"
        >
          <h2 className="text-center mb-4 text-ivoire">Services offerts aux Asset Managers</h2>
          <p className="text-ivoire/70 text-center mb-12 text-lg">Un accompagnement complet pour votre développement</p>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-ivoire/10 backdrop-blur-sm p-6 rounded-xl border border-doré/20 hover:border-doré hover:bg-ivoire/15 transition-all"
              >
                <CheckCircle className="w-6 h-6 text-doré flex-shrink-0 mt-1" />
                <p className="text-ivoire text-lg leading-relaxed">{service}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
