'use client'
/* components/home/ApproachSection.jsx - SECTION 3: STRUCTURE EN 3 FRAMES ÉPAISSES */

import { motion } from 'framer-motion'

const framesData = [
  {
    id: "experience",
    title: "Expérience réelle",
    text: "Ancien banquier privé CIC, créateur de produits structurés Crédit Mutuel IM. 15 ans d'expérience en première ligne avec les dirigeants, cadres supérieurs et institutionnels."
  },
  {
    id: "independence",
    title: "Indépendance totale",
    text: "Aucune rétrocommission, aucun lien avec les banques. Je suis libre de vous dire exactement ce qu’il faut savoir pour choisir en pleine conscience."
  },
  {
    id: "entrepreneurial",
    title: "Expertise entrepreneuriale",
    text: "J’ai fondé Alforis par conviction, non par opportunisme. Je comprends personnellement les enjeux humains, économiques et fiscaux que vous affrontez chaque jour.",
    isEmphasized: true // Flag for distinct styling
  }
];

export default function ApproachSection({ extraClass = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Time between each frame animation
        delayChildren: 0.2,   // Initial delay
      }
    }
  };

  const frameVariants = {
    hidden: { opacity: 0, y: 30 }, // Slightly more y-shift for "thicker" feel
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Assuming D_approach.webp / M_approach.webp backgrounds, using light text.
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 md:p-10 ${extraClass}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }} // Trigger when 25% of the container is in view
        className="max-w-2xl lg:max-w-3xl w-full space-y-8 md:space-y-10" // Vertical stacking
      >
        {framesData.map((frame) => (
          <motion.div
            key={frame.id}
            variants={frameVariants}
            // Styling for each "thick" frame.
            // More padding, potentially more opaque background or distinct border.
            className={`bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-10 p-6 md:p-8 rounded-xl shadow-xl backdrop-blur-md
              ${frame.isEmphasized ? 'border-2 border-doré' : 'border border-transparent'}`}
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-doré-clair mb-4 md:mb-5">
              {frame.title}
            </h3>
            <p className="text-base md:text-lg text-ivoire font-light leading-relaxed md:leading-loose">
              {frame.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}