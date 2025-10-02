
// ============================================
// 4. DifferentiatorsSection.jsx
// ============================================
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Shield, Globe } from 'lucide-react'

export default function DifferentiatorsSection({ extraClass = '' }) {
  const [hoveredCard, setHoveredCard] = useState(null)

  const differentiators = [
    {
      icon: <Target className="w-10 h-10" />,
      title: 'Sélectivité',
      description: 'Représentation volontairement limitée pour offrir un vrai focus stratégique à chaque partenaire.'
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: 'Double culture produit & distribution',
      description: 'Ex-banquier de marchés (EMTN, fonds structurés), capable d\'expliquer des solutions complexes.'
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Indépendance totale',
      description: 'Aucun actionnaire bancaire, pas de biais de distribution. Seule priorité : votre réussite.'
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: 'Approche intégrée',
      description: 'Stratégie commerciale, accompagnement marketing local, suivi réglementaire.'
    }
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
          <h2 className="text-center mb-4">Nos différenciateurs</h2>
          <p className="text-acier dark:text-ivoire/70 text-center mb-12 text-lg">Ce qui nous distingue des concurrents</p>
          
          <div className="space-y-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="flex gap-6 p-6 md:p-8 bg-ivoire dark:bg-acier/40 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-acier/20 dark:border-vertSauge/20"
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
