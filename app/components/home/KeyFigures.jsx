
'use client'
/* components/home/KeyFigures.jsx */


import { useInView } from 'react-intersection-observer'
import useCountUp from '@/hooks/useCountUp'
import { motion } from 'framer-motion'


const figures = [
  { value: 570, label: "d'encours sous conseil générés", suffix: ' M€' },
  { value: 100, label: "d'indépendance", suffix: ' %' },
  { value: 15, label: "d’expérience au cœur du secteur financier", suffix: ' ans' },
]

export default function KeyFigures({ extraClass = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const counts = figures.map(fig => useCountUp(fig.value, 1500, inView))

  return (
    <section id="chiffres" className={`py-20 md:py-28 ${extraClass}`}>
      <div ref={ref} className="bg-ardoise bg-opacity-40 rounded-2xl shadow-lg space-y-16 max-w-5xl mx-auto py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6 text-center"
        >
          <h2 className="text-doré text-3xl md:text-5xl font-bold drop-shadow-lg">
            L'Expertise derrière Alforis
          </h2>
          <p className="text-ivoire text-base md:text-lg leading-relaxed">
            Plus de 15 ans d'expérience dans la structuration d'investissements, la construction de solutions personnalisées et la défense des intérêts patrimoniaux les plus exigeants.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-ivoire text-center">
          {figures.map((fig, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="space-y-2"
            >
              <p className="text-4xl text-ivoire font-bold drop-shadow-md">
                {counts[i]}{fig.suffix}
              </p>
              <p className="text-ivoire/80 text-sm">{fig.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}