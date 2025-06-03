
'use client'
/* components/home/HeroSection.jsx */


import { motion } from 'framer-motion'
import Image from 'next/image'
import { GoldLink } from '@/hooks/useGoldEffect'
import Button from '@/components/ui/Button'

export default function HeroSection({ extraClass = '' }) {
  return (
    <section className={`relative w-full overflow-hidden ${extraClass}`}>      
      <div className="flex flex-col items-center text-center px-4 py-20 md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-anthracite dark:text-acier leading-snug mb-6 pt-40 md:pt-28 "
        >
          La vérité que votre banquier ne vous dira jamais, je la connais. Et je la partage.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-acier dark:text-acier font-light mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          15 ans à conseiller et structurer des solutions financières complexes au plus haut niveau du secteur bancaire privé. Aujourd'hui indépendant, j'apporte à mes clients ce qu'ils recherchent vraiment : clarté, maîtrise et sérénité dans la gestion de leur patrimoine.
        </motion.p>
        <Button to="/parcours" className="btn-alforis-rdv" index={1}>
          Découvrez ce qu’on ne vous a jamais dit sur votre argent.
        </Button>
      </div>
    </section>
  )
}