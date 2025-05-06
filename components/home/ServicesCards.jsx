'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    title: 'Ingénierie patrimoniale',
    description: 'Structuration sur mesure de votre patrimoine personnel et professionnel.',
    icon: '/assets/img/engineering.svg',
    alt: 'Icône ingénierie patrimoniale'
  },
  {
    title: 'Trésorerie long terme',
    description: 'Valorisation et sécurisation des excédents de trésorerie d’entreprise.',
    icon: '/assets/img/cash-flow.svg',
    alt: 'Icône trésorerie long terme'
  },
  {
    title: 'Gouvernance familiale',
    description: 'Organisation durable autour de la famille, des héritiers et associés.',
    icon: '/assets/img/family.svg',
    alt: 'Icône gouvernance familiale'
  },
  {
    title: 'Conciergerie premium',
    description: 'Un interlocuteur unique pour centraliser et coordonner tous vos enjeux.',
    icon: '/assets/img/concierge.svg',
    alt: 'Icône conciergerie premium'
  },
]

const MotionLink = motion(Link)

export default function ServicesCards(extraClass = '') {
  return (
    <section className="relative w-full overflow-hidden z-10 ${extraClass}">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center w-full z-10">
        <h2 >Nos services sur-mesure</h2>

        {/* Grid des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {services.map((service, index) => (
            <MotionLink
              key={index}
              href="/Services"
              className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-sm hover:shadow-lg transition group block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <img
                  src={service.icon}
                  alt={service.alt}
                  className="w-20 h-20"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-serif text-anthracite group-hover:text-doré transition">
                    {service.title}
                  </h3>
                  <p className="text-sm text-acier mt-2">{service.description}</p>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  )
}
