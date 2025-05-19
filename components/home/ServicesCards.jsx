'use client'
/* components/home/ServicesCards.jsx */

import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  { title: 'Ingénierie patrimoniale', desc: 'Structuration sur mesure de votre patrimoine personnel et professionnel.', icon: '/assets/img/home/engineering.webp', alt: 'Icône ingénierie patrimoniale' },
  { title: 'Trésorerie long terme', desc: 'Valorisation et sécurisation des excédents de trésorerie d’entreprise.', icon: '/assets/img/home/cash-flow.webp', alt: 'Icône trésorerie long terme' },
  { title: 'Gouvernance familiale', desc: 'Organisation durable autour de la famille, des héritiers et associés.', icon: '/assets/img/home/family.webp', alt: 'Icône gouvernance familiale' },
  { title: 'Conciergerie premium', desc: 'Un interlocuteur unique pour centraliser et coordonner tous vos enjeux.', icon: '/assets/img/home/concierge.webp', alt: 'Icône conciergerie premium' },
]

const MotionLink = motion.create(Link)

export default function ServicesCards({ extraClass = '' }) {
  return (
    <section className={`py-16 ${extraClass}`}>      
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-anthracite"
        >
          Nos services sur-mesure
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {services.map((s, i) => (
            <MotionLink
              key={s.title}
              href="/services"
              className="bg-ivoire bg-opacity-90 rounded-2xl p-6 shadow-md hover:shadow-lg transition group block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div className="flex items-start gap-4">
                <img src={s.icon} alt={s.alt} className="w-20 h-20 object-contain" loading="lazy" />
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-anthracite group-hover:text-doré transition">{s.title}</h3>
                  <p className="text-sm text-acier mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  )
}
