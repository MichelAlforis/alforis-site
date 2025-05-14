/* app/services/ServicesContent.jsx */
'use client'

import React, { useState } from 'react'
import Animated from '@/components/animated/Animated'
import NoWidowText from '@/components/animated/NoWindowText'
import { Settings, DollarSign, Users, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    id: 1,
    icon: Settings,
    title: 'Ingénierie patrimoniale',
    subtitle: 'Structurer votre patrimoine sans trahir vos valeurs',
    description:
      'Stratégies sur mesure alliant droit, finance et psychologie familiale pour une vision claire de votre avenir.',
  },
  {
    id: 2,
    icon: DollarSign,
    title: 'Trésorerie long terme',
    subtitle: 'Faire fructifier sans dénaturer vos réserves',
    description:
      'Solutions sécurisées et dynamiques pour valoriser vos excédents de trésorerie en toute confiance.',
  },
  {
    id: 3,
    icon: Users,
    title: 'Gouvernance familiale',
    subtitle: 'Préserver l’harmonie tout en préparant l’avenir',
    description:
      'Charte familiale, pacte ou instance de concertation pour un héritage serein et durable.',
  },
  {
    id: 4,
    icon: Star,
    title: 'Conciergerie premium',
    subtitle: 'Vous libérer du temps, sans perdre le fil',
    description:
      'Assistance proactive pour orchestrer toutes vos démarches patrimoniales et personnelles.',
  },
]

export default function ServicesContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const current = services[activeIndex]

  return (
    <Animated.Page>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="main-content bg-ivoire text-anthracite py-16 px-6"
      >
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <NoWidowText as="h1" className="text-4xl md:text-5xl font-title">
            Nos expertises,<br /> votre sérénité
          </NoWidowText>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveIndex(i)}
                className={
                  `px-4 py-2 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === i
                      ? 'bg-doré text-ivoire'
                      : 'bg-ivoire/50 text-anthracite hover:bg-ivoire'
                  }`
                }
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="relative">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-doré text-white p-4 rounded-full">
                    <current.icon size={32} />
                  </div>
                </div>
                <NoWidowText as="h2" className="text-2xl font-semibold mb-2">
                  {current.title}
                </NoWidowText>
                <p className="text-acier italic mb-4">{current.subtitle}</p>
                <p className="leading-relaxed mb-6">{current.description}</p>
                <Button className="btn-alforis-outline">En savoir plus</Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.main>
    </Animated.Page>
  )
}
