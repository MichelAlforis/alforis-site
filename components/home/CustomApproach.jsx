
/* components/home/CustomApproach.jsx */
'use client'

import { motion } from 'framer-motion'
import AnimatedSVGRenderer from '@/components/animated/AnimatedSVGRenderer'
import ApprocheIcon from '@/assets/illustrations/approche.svg'

export default function CustomApproach({ extraClass = '' }) {
  return (
    <section className={`py-16 ${extraClass}`}>      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 flex justify-center"
        >
          <AnimatedSVGRenderer
            SvgComponent={ApprocheIcon}
            strokeColor="var(--stroke-color)"
            fillColor="var(--fill-color)"
            strokeWidth={7}
            duration={5}
            delayStep={0.8}
            tiltIntensity={1.5}
            className="w-full max-w-[15vw]"
            wrapperClassName="stroke-ardoise fill-doré"
            viewBox="0 0 1024 1024"
            preserveAspectRatio="xMidYMid meet"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md>w-2/3 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-semibold text-anthracite mb-4">Chaque trajectoire est unique.</h2>
          <p className="text-base md:text-lg text-acier leading-relaxed">
            Nous ne croyons pas aux solutions toutes faites. Chaque accompagnement Alforis commence par une cartographie de vos objectifs profonds, de votre horizon personnel, et de vos contraintes concrètes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
