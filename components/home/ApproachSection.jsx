'use client'
/* components/home/ApproachSection.jsx */
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSVGRenderer from '@/components/animated/AnimatedSVGRenderer'
import { couleurs } from '@/styles/generated-colors.mjs'
import Buste from '@/assets/illustrations/buste'
import ApprocheIcon from '@/assets/illustrations/approche'
import LifePic from '@/assets/illustrations/Lifepic'
import { useTheme } from "@/styles/ThemeDark";

const cards = [
  {
    href: '/approchepersonnalisee',
    title: 'Notre approche est d’abord humaine',
    text: `Avant de parler stratégie ou fiscalité, nous écoutons ce qui vous a forgé. Vos intuitions, vos blessures, vos moteurs. Car comprendre une trajectoire, c’est d’abord écouter son histoire.`,
    Svg: ApprocheIcon,
    stroke: 20,
  },
  {
    href: '/parcours',
    title: 'Prêt à vous découvrir autrement ?',
    text: `Le Profil de Vie vous permet de faire le point, en quelques questions clés, sur ce qui compte vraiment pour vous aujourd’hui, et ce que vous souhaitez faire grandir demain.`,
    Svg: LifePic,
    stroke: 20,
  },
  {
    href: '/services',
    title: 'Chaque trajectoire est unique',
    text: `Nous ne croyons pas aux solutions toutes faites. Chaque accompagnement Alforis commence par une cartographie de vos objectifs profonds, de votre horizon personnel, et de vos contraintes concrètes.`,
    Svg: Buste,
    stroke: 12,
  },
]

export default function ApproachSection({ extraClass = '' }) {
   const { dark } = useTheme();
   
  return (
    <section id="approach" className={`w-full py-16 ${extraClass}`}>      
      <div className="space-y-8 px-4 md:px-0 max-w-4xl mx-auto">
        {cards.map((c, i) => (
          <Link key={c.href} href={c.href} className="group block">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col md:flex-row items-center bg-ivoire bg-opacity-90 dark:bg-acier/60 shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="hidden sm:flex flex-shrink-0 p-6 items-center justify-center">
                <AnimatedSVGRenderer
                  SvgComponent={c.Svg}
                  wrapperClassName="w-24 h-24 stroke-ardoise fill-doré"
                  strokecolor={dark ? couleurs.ivoire : couleurs.acier}
                  fillColor={couleurs.doré}
                  strokeWidth={c.stroke}
                  duration={3}
                  delayStep={0.8}
                  tiltIntensity={1.5}
                  preserveAspectRatio="xMidYMid meet"
                />
              </div>
              <div className="flex-1 p-6">
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-2xl md:text-3xl font-semibold text-anthracite mb-2 leading-snug"
                >
                  {c.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base md:text-lg text-acier leading-relaxed"
                >
                  {c.text}
                </motion.p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}