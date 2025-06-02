'use client'
/* components/home/HeroSection.jsx - ACTE I — LE SCEAU */

import { motion } from 'framer-motion'
import Image from 'next/image' // Using Next Image for optimization

export default function HeroSection({ extraClass = '' }) {
  const sealVariants = {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, // Clip from right to left
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',  // Reveal
      transition: { duration: 1.5, ease: "circOut", delay: 0.5 }
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 2 } // 2-second delay for text
    },
  }

  const sealHover = {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" } // Respiration effect
  }

  return (
    <section
      className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-center ${extraClass}`}
      style={{ background: 'linear-gradient(180deg, #000000 0%, #1A1A1A 100%)' }} // Dark background for "Acte I"
    >
      <motion.div
        className="mb-12" // Space between seal and text
        variants={sealVariants}
        initial="hidden"
        animate="visible" // Changed to animate for continuous animation if viewport condition is met
        whileHover={sealHover}
      >
        <Image
          src="/assets/icons/sceau-alforis.svg"
          alt="Sceau Alforis"
          width={200} // Adjust size as needed
          height={200} // Adjust size as needed
          priority // Preload if it's LCP
        />
      </motion.div>

      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible" // Changed to animate
        className="max-w-2xl px-4"
      >
        <p className="text-xl md:text-2xl text-acier mb-6 font-light leading-relaxed">
          Ce que vous avez entendu sur la gestion de patrimoine… est souvent ce qu'on voulait vous faire entendre.
        </p>
        <p className="text-xl md:text-2xl text-acier font-light leading-relaxed">
          Je vous propose une autre voie. Celle de la transparence. De l’intelligence. De la cohérence.
        </p>
      </motion.div>
    </section>
  )
}
