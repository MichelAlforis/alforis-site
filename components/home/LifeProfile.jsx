
'use client'
/* components/home/LifeProfile.jsx */


import { motion } from 'framer-motion'
import AnimatedSVGRenderer from '@/components/animated/AnimatedSVGRenderer'
import LifePic from '@/assets/illustrations/lifeprofile.svg'

export default function LifeProfile({ extraClass = '' }) {
  return (
    <section className={`py-16 ${extraClass}`}>      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 flex justify-center"
        >
          <AnimatedSVGRenderer
            SvgComponent={LifePic}
            strokeColor="var(--stroke-color)"
            fillColor="var(--fill-color)"
            strokeWidth={7}
            duration={3}
            delayStep={0.5}
            tiltIntensity={1.5}
            className="w-full max-w-[15vw] stroke-doré fill-artoise"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-semibold text-anthracite mb-4">
            Prêt à vous découvrir autrement ?
          </h2>
          <p className="text-base md:text-lg text-acier leading-relaxed">
            Le <strong>Profil de Vie</strong> vous permet de faire le point, en quelques questions clés, sur ce qui compte vraiment pour vous aujourd’hui, et ce que vous souhaitez faire grandir demain.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
