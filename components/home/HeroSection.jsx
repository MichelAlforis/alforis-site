
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
          className="text-3xl md:text-5xl font-title font-bold text-anthracite dark:text-acier leading-snug mb-6 mt-16"
        >
          Chez Alforis, notre raison d'être c'est<br />
         <GoldLink href="/parcours">VOUS</GoldLink>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-acier dark:text-acier font-light mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Le patrimoine ne dit rien par lui-même. Il prend sens s’il raconte une histoire : <strong>la vôtre</strong>.
        </motion.p>
        <Button to="/parcours" className="btn-alforis-rdv" index={1}>
          Commencer mon diagnostic
        </Button>
      </div>
    </section>
  )
}
