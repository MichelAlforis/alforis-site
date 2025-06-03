
'use client'
/* components/home/KeyFigures.jsx - SECTION 4: USER COUNT / CHIFFRES CLÉS */

import { useInView } from 'react-intersection-observer'
import useCountUp from '@/hooks/useCountUp'
import { motion } from 'framer-motion'

// Updated figures data
const figuresData = [
  { id: "encours", value: 570, suffix: " M€", label: "d'encours sous conseil générés" },
  { id: "pnb", value: 42, displayValuePrefix: "4,", displayValueSuffix: " M€", label: "de PNB généré via des solutions structurées" }, // Count to 42 for "4,2"
  { id: "experience", value: 15, suffix: " ans", label: "d'expérience à tous les niveaux du secteur financier" }
];

export default function KeyFigures({ extraClass = '' }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3 // Trigger when 30% of the element is in view
  });

  const countUpDuration = 2000; // Animation duration for count-up

  // Initialize counters for each figure
  const counters = figuresData.map(fig => useCountUp(fig.value, countUpDuration, inView));

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger the animation of each figure
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  // Assuming D_figures.webp / M_figures.webp background, use light text colors.
  return (
    <div
      ref={ref}
      className={`relative w-full h-full flex items-center justify-center p-6 md:p-10 ${extraClass}`}
    >
      <motion.div
        variants={containerAnimation}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 text-center max-w-4xl lg:max-w-5xl w-full"
      >
        {figuresData.map((fig, index) => (
          <motion.div
            key={fig.id}
            variants={itemAnimation}
            className="flex flex-col items-center p-4" // Added padding for spacing within each figure block
          >
            <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-doré-clair mb-2 md:mb-3">
              {fig.id === "pnb"
                ? `4,${String(counters[index]).padStart(1, '0').slice(-1)}` // Format for 4,2 (counts 0-9 for decimal)
                : counters[index]}
              {fig.id === "pnb" ? fig.displayValueSuffix : fig.suffix}
            </p>
            <p className="text-base md:text-lg text-ivoire/90 dark:text-acier/90 font-light leading-relaxed">
              {fig.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
