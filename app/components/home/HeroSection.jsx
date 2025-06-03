
'use client'
/* components/home/HeroSection.jsx */


import { motion } from 'framer-motion'
import Image from 'next/image'
import { GoldLink } from '@/hooks/useGoldEffect'
import Button from '@/components/ui/Button'

export default function HeroSection({ extraClass = '' }) {
  return (
<section className={`relative w-full min-h-screen overflow-hidden ${extraClass}`}>
  <div className="absolute md:top-1/3 left-0 w-full translate-y-16 flex flex-col text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-bold uppercase leading-snug mb-6"
        >
          Comprendre la finance, en tirer le meilleur : <br/>
           <GoldLink href="/parcours">faisons-le ensemble.</GoldLink>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-md md:text-xl font-normal text-acier dark:text-acier font-light mb-8 max-w-7xl mx-auto leading-relaxed"
        >
          15 ans à conseiller et structurer des solutions financières complexes au plus haut niveau du secteur bancaire privé. Aujourd'hui indépendant, j'apporte à mes clients ce qu'ils recherchent vraiment : clarté, maîtrise et sérénité dans la gestion de leur patrimoine.
        </motion.p>
        <Button to="/parcours" className="btn-alforis-rdv max-w-md mx-auto " index={1}>
          Découvrez ce qu’on ne vous a jamais dit sur votre argent.
        </Button>
      </div>
    </section>
  )
}