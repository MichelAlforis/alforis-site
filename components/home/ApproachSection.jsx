'use client'
/* components/home/ApproachSection.jsx - Renamed to Acte III – Présence */

import { motion } from 'framer-motion'

const paragraphs = [
  "Alforis est né d’un constat clair : les produits sont maîtrisés, pas toujours compris. Moi, je les ai créés, distribués, décortiqués.",
  "Là où d’autres placent, je décrypte.",
  "Je mets cette expertise au service d’un conseil lucide, humain, sans agenda caché."
];

export default function ApproachSection({ extraClass = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger the animation of each paragraph
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Assuming D_approach.webp / M_approach.webp might be textured or darker,
  // text-ivoire should provide good contrast and a premium feel.
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center text-center p-6 md:p-10 ${extraClass}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }} // Trigger when 40% is in view
        className="max-w-xl lg:max-w-2xl space-y-6 md:space-y-8" // Constrained width for readability
      >
        {paragraphs.map((text, index) => (
          <motion.p
            key={index}
            variants={itemVariants}
            // Styling for a personal, direct, yet sophisticated voice.
            // Using text-ivoire, assuming a darker background from D_approach.webp / M_approach.webp
            className="text-xl md:text-2xl lg:text-3xl font-light text-ivoire leading-relaxed md:leading-loose"
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}