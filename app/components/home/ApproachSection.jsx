'use client'
/* components/home/ApproachSection.jsx */
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSVGRenderer from '@/components/animated/AnimatedSVGRenderer'
import { couleurs } from '@/styles/generated-colors'
import Buste from '@/assets/illustrations/buste'
import ApprocheIcon from '@/assets/illustrations/approche'
import LifePic from '@/assets/illustrations/Lifepic'
import { useTheme } from "@/styles/ThemeDark";

const cards = [
  {
    href: '/approchepersonnalisee',
    title: 'Expérience réelle',
    text: `Ancien banquier privé CIC, créateur de produits structurés Crédit Mutuel. 15 ans d'expérience en première ligne avec les dirigeants, cadres supérieurs et institutionnels.`,
    Svg: ApprocheIcon,
    stroke: 20,
  },
  {
    href: '/parcours',
    title: 'Indépendance totale',
    text: `Aucune rétrocommission, aucun lien avec les banques. Je suis libre de vous dire exactement ce qu’il faut savoir pour choisir en pleine conscience.`,
    Svg: LifePic,
    stroke: 20,
  },
  {
    href: '/services',
    title: 'Expertise entrepreneuriale',
    text: `J’ai fondé Alforis par conviction, non par opportunisme. Je comprends personnellement les enjeux humains, économiques et fiscaux que vous affrontez chaque jour.`,
    Svg: Buste,
    stroke: 12,
  },
]

export default function ApproachSection({ extraClass = '' }) {
   const { dark } = useTheme();
   
  return (
    <section id="approach" className={`w-full py-20 md:py-28 ${extraClass}`}>
      <div className="space-y-8 px-4 md:px-0 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Expérience, indépendance et vision entrepreneuriale
        </motion.h2>
        {cards.map((c, i) => (
          <Link key={c.href} href={c.href} className="group block cursor-pointer">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col md:flex-row items-center bg-ivoire bg-opacity-90 dark:bg-acier/60 shadow-lg rounded-2xl overflow-hidden hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out"
            >
              <div className="hidden sm:flex flex-shrink-0 p-6 items-center justify-center">
                <AnimatedSVGRenderer
                  SvgComponent={c.Svg}
                  wrapperClassName="w-24 h-24 stroke-ardoise fill-doré"
                  strokecolor={dark ? couleurs.ivoire : couleurs.acier}
                  fillColor={couleurs.doré}
                  strokeWidth={c.stroke}
                  duration={1.8}
                  delayStep={0.4}
                  tiltIntensity={0.8}
                  preserveAspectRatio="xMidYMid meet"
                />
              </div>
              <div className="flex-1 p-6">
                <motion.h3
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
                  className="text-2xl md:text-3xl font-semibold text-doré mb-2 leading-snug"
                >
                  {c.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
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