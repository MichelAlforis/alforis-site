'use client'
/* app/services/ServicesContent.jsx */


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
    "Nous concevons des stratégies sur mesure, adaptées à votre structure personnelle, professionnelle et familiale. L’objectif : fluidifier, optimiser, transmettre, tout en respectant ce qui vous est essentiel.\n\nConcrètement, cela signifie comprendre vos enjeux profonds, vos préférences de gouvernance, et vos impératifs de transmission. Nous faisons dialoguer droit, finance, psychologie familiale et projection à long terme.\n\nChaque scénario est modélisé, testé, challengé. Vous choisissez en connaissance de cause, avec une visibilité claire sur les conséquences juridiques, fiscales et humaines.",
    citation: "Un bon conseil patrimonial respecte d’abord ce qui vous est cher.",
},
  {
    id: 2,
    icon: DollarSign,
    title: 'Trésorerie long terme',
    subtitle: 'Faire fructifier sans dénaturer vos réserves',
    description:
    "Nous accompagnons les dirigeants dans la valorisation de leur trésorerie excédentaire, avec une approche sécurisée, structurée et alignée avec les objectifs de l’entreprise.\n\nNous analysons la nature des excédents (ponctuels ou structurels), leur horizon d’utilisation, et les contraintes internes de gouvernance.\n\nNos solutions vont des produits garantis aux structures plus dynamiques, en veillant toujours à articuler performance, liquidité, et cohérence stratégique.",
    citation: "La prudence n’empêche pas la performance, si elle est bien guidée.",
  },
  {
    id: 3,
    icon: Users,
    title: 'Gouvernance familiale',
    subtitle: 'Préserver l’harmonie tout en préparant l’avenir',
    description:
    "La famille est souvent un atout… à condition d’être organisée. Nous aidons à structurer la gouvernance, anticiper les enjeux successoraux et préserver l’harmonie dans la durée.\n\nCela peut passer par la rédaction d’une charte, la mise en place d’un pacte familial, ou la création d’un organe de concertation.\n\nL’enjeu est toujours de pacifier les transmissions, protéger les plus vulnérables, et rendre la solidarité familiale efficiente et non pesante.",
    citation: "Un héritage serein se prépare bien avant d’être transmis.",
  },
  {
    id: 4,
    icon: Star,
    title: 'Conciergerie Financière',
    subtitle: 'Vous libérer du temps, sans perdre le fil',
    description:
      "Un seul interlocuteur pour coordonner vos besoins patrimoniaux, juridiques, immobiliers, administratifs. Notre conciergerie simplifie votre vie et vous libère du temps.\n\nNous intervenons pour faire avancer vos démarches, vous représenter, organiser les rendez-vous avec vos conseils et assurer un suivi de vos projets patrimoniaux.\n\nC’est une assistance proactive, personnalisée, pilotée par nous mais pensée pour vous, dans le respect de vos priorités et de votre niveau d’implication souhaité.",
    citation: "La tranquillité d’esprit est une richesse que l’on peut orchestrer.",
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
