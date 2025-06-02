
'use client'
/* components/home/Acte4_Structure.jsx */

import React from 'react'
import { motion } from 'framer-motion'

const pillarsData = [
  {
    title: "Analyser en profondeur",
    description: "Une vision 360°, sans filtre, sans dépendance bancaire."
  },
  {
    title: "Agencer avec cohérence",
    description: "Des stratégies alignées avec votre réalité de vie, pas des produits préfabriqués."
  },
  {
    title: "Optimiser dans la durée",
    description: "Fiscalité, transmission, protection : chaque levier est activé en conscience."
  },
  {
    title: "Agir en pleine indépendance",
    description: "Pas de rétrocommissions. Pas d’intérêts cachés. Un seul engagement : le vôtre."
  }
];

export default function Acte4_Structure({ extraClass = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger animation of each pillar
        delayChildren: 0.2,
        // Subtle scale-up for "zoom progressif"
        scale: [0.95, 1],
        duration: 0.8,
      }
    }
  };

  const pillarVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9] // Smooth ease
      }
    }
  };

  return (
    <section
      className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-anthracite dark:text-acier ${extraClass}`}
      // "Gray architectural blocks, plans verticals, géométrie élégante" theme
      // Using subtle gray background and letting the pillar styles define the "blocks"
      style={{ backgroundColor: '#EAEAEA' }} // Light gray background for a clean, architectural feel
    >
      <motion.div
        className="max-w-4xl lg:max-w-5xl mx-auto p-8 md:p-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the section is in view
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-title font-bold text-anthracite dark:text-acier mb-4">
            ACTE IV – LA STRUCTURE
          </h2>
          <p className="text-lg md:text-xl text-acier dark:text-gray-400 font-light">
            Fondations solides pour une sérénité durable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pillarsData.map((pillar, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-anthracite-light p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700" // Architectural block style
              variants={pillarVariants}
              // No initial/animate here, as it's handled by container's staggerChildren
            >
              <h3 className="text-xl md:text-2xl font-semibold text-anthracite dark:text-doré-clair mb-3">
                {pillar.title}
              </h3>
              <p className="text-base md:text-lg text-acier dark:text-gray-300 font-light leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
