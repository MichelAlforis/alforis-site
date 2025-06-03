
'use client'
/* components/home/KeyFigures.jsx - Renamed to Acte IV – Architecture */

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useCountUp from '@/hooks/useCountUp' // Assuming this path is correct

const trustPointsData = [
  {
    id: "figures",
    // For useCountUp, we'll count to 570 and 42 (then display as 4,2)
    texts: [{ value: 570, suffix: "M€ collectés" }, { value: 42, decimals: 1, suffix: "M€ de PNB généré" }]
  },
  {
    id: "diploma",
    texts: ["Diplômé IAE Paris | ORIAS | CIF"]
  },
  {
    id: "experience",
    texts: ["Ancien banquier privé (CIC) devenu producteur de solutions structurées (Crédit Mutuel IM)"]
  },
  {
    id: "founder",
    texts: ["Entrepreneur, pas commercial : j’ai fondé ce cabinet par conviction, pas par transition"]
  }
];

export default function KeyFigures({ extraClass = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const countUpDuration = 2000; // 2 seconds
  const collectedAmount = useCountUp(570, countUpDuration, inView);
  const pnbAmount = useCountUp(42, countUpDuration, inView); // Will be displayed as 4,2

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 }, // Slide in from left
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Assuming D_figures.webp / M_figures.webp may have varied tones,
  // using text-ivoire for primary text and text-doré-clair for highlights or numbers.
  return (
    <div
      ref={ref} // ref for useInView to trigger animations
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 md:p-10 ${extraClass}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"} // Control animation via inView
        className="max-w-2xl lg:max-w-3xl w-full space-y-8 md:space-y-10" // Added w-full
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-semibold text-center text-doré-clair mb-10 md:mb-12"
        >
          Pourquoi me faire confiance
        </motion.h2>

        {trustPointsData.map((point) => (
          <motion.div
            key={point.id}
            variants={itemVariants}
            className="bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-5 p-4 md:p-6 rounded-lg shadow-md" // Subtle architectural block
          >
            {point.id === "figures" ? (
              <p className="text-xl md:text-2xl text-ivoire text-center font-medium">
                <span className="font-bold text-doré-clair">{collectedAmount}</span>M€ collectés
                <span className="mx-2 text-ivoire/80">|</span>
                <span className="font-bold text-doré-clair">{pnbAmount / 10}</span>M€ de PNB généré
                {/* Displaying 42 as 4,2 */}
              </p>
            ) : (
              point.texts.map((text, index) => (
                <p key={index} className="text-lg md:text-xl text-ivoire text-center leading-relaxed">
                  {text}
                </p>
              ))
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
