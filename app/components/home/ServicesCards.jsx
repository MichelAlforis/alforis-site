'use client'
/* components/home/ServicesCards.jsx */
import { useEffect,useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  { title: 'Comprendre avant d’agir', desc: 'Je ne propose jamais une solution préfabriquée. Mon expertise consiste à décrypter précisément votre situation financière actuelle.', icon: '/assets/img/home/engineering.webp', alt: 'Icône ingénierie patrimoniale' },
  { title: 'Maîtriser chaque choix', desc: 'Avoir accès aux produits financiers ne suffit pas. Mon expérience m’a appris à identifier clairement leurs avantages, leurs limites, et surtout leurs coûts réels cachés.', icon: '/assets/img/home/cash-flow.webp', alt: 'Icône trésorerie long terme' },
  { title: 'Construire durablement', desc: 'Chaque décision est prise avec une vision claire à long terme : optimisation fiscale, performance durable, protection et transmission.', icon: '/assets/img/home/family.webp', alt: 'Icône gouvernance familiale' },
  { title: 'Relation claire et directe', desc: 'Je vous parle ouvertement, sans jargon, en toute indépendance. Parce que la confiance repose avant tout sur la transparence.', icon: '/assets/img/home/concierge.webp', alt: 'Icône conciergerie premium' },
]

const MotionLink = motion.create(Link)

export default function ServicesCards({ extraClass = '' }) {
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <section className={`py-16 ${extraClass}`}>      
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Une méthode pour sécuriser et développer votre patrimoine
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {services.map((s, i) => (
            <MotionLink
              key={s.title}
              href="/services"
              className="bg-ivoire bg-opacity-90 dark:bg-acier/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition group block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div className="flex items-start gap-4">
                <img src={s.icon} alt={s.alt || ''} className="w-20 h-20 object-contain hidden sm:block" loading="lazy" decoding="async"/>
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-doré group-hover:text-doré transition">{s.title}</h3>
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