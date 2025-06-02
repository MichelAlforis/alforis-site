'use client'
/* components/home/ServicesCards.jsx - Renamed to Acte II – Traversée */

import { motion } from 'framer-motion'

const mainStatement1 = "15 ans à tous les postes de la finance, du conseil aux produits."
const mainStatement2 = "Je sais comment les choses fonctionnent vraiment."
const bulletPoints = [
  "Clarifiez ce que vous payez et pourquoi",
  "Reprenez le contrôle de votre fiscalité",
  "Organisez vos décisions patrimoniales avec sérénité",
  "Transmettez sans subir"
]

export default function ServicesCards({ extraClass = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Assuming the background D_services.webp / M_services.webp are dark,
  // text colors should be light (e.g., text-ivoire, text-doré-clair).
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center text-center p-4 md:p-8 ${extraClass}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl lg:max-w-3xl mx-auto" // Constrain width for readability
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-ivoire mb-6 md:mb-8 leading-tight"
        >
          {mainStatement1}
        </motion.h2>

        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-ivoire mb-10 md:mb-12 leading-tight"
        >
          {mainStatement2}
        </motion.h2>

        <motion.ul
          className="space-y-4 md:space-y-5 text-left" // Text-left for bullet points for better readability
          // This motion.ul can also have variants if needed, or just let items be staggered by parent
        >
          {bulletPoints.map((point, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="text-lg md:text-xl text-doré-clair flex items-start" // Using doré-clair for emphasis
            >
              <span className="flex-shrink-0 mr-3 mt-1 w-2 h-2 bg-doré-clair rounded-full"></span> {/* Custom bullet */}
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
