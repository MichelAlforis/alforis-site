
/* components/home/HumanApproach.jsx */
'use client'

import { motion } from 'framer-motion'
import AnimatedSVGRenderer from '@/components/animated/AnimatedSVGRenderer'
import BusteIcon from '@/assets/illustrations/buste.svg'

const text =
  'Avant de parler stratégie ou fiscalité, nous écoutons ce qui vous a forgé. Vos intuitions, vos blessures, vos moteurs. Car comprendre une trajectoire, c’est d’abord écouter son histoire.'

export default function HumanApproach({ extraClass = '' }) {
  return (
    <section className={`${extraClass} py-16`}>      
      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 flex justify-center"
        >
          <AnimatedSVGRenderer
            SvgComponent={BusteIcon}
            strokeColor="var(--stroke-color)"
            fillColor="var(--fill-color)"
            strokeWidth={7}
            duration={5}
            delayStep={0.8}
            
          className="w-auto max-w-[15vw] stroke-ardoise fill-doré"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-semibold text-anthracite mb-4">
            Notre approche est d’abord humaine.
          </h2>
          <p className="text-base md:text-lg text-acier leading-relaxed">
            {text.split('. ').map((s, i) => (
              <span key={i}>
                {s.trim()}{s.endsWith('.') ? '' : '.'}<br />
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  )
}