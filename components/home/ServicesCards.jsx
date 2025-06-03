'use client'
/* components/home/ServicesCards.jsx - SECTION 2: STRUCTURE EN 4 FRAMES */

import { motion } from 'framer-motion'

const framesData = [
  {
    title: "Comprendre avant d’agir",
    text: "Je ne propose jamais une solution préfabriquée. Mon expertise consiste à décrypter précisément votre situation financière actuelle."
  },
  {
    title: "Maîtriser chaque choix",
    text: "Avoir accès aux produits financiers ne suffit pas. Mon expérience m’a appris à identifier clairement leurs avantages, leurs limites, et surtout leurs coûts réels cachés."
  },
  {
    title: "Construire durablement",
    text: "Chaque décision est prise avec une vision claire à long terme : optimisation fiscale, performance durable, protection et transmission."
  },
  {
    title: "Relation claire et directe",
    text: "Je vous parle ouvertement, sans jargon, en toute indépendance. Parce que la confiance repose avant tout sur la transparence."
  }
];

export default function ServicesCards({ extraClass = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Time between each frame animation
        delayChildren: 0.2,   // Initial delay before starting animations
      }
    }
  };

  const frameVariants = {
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

  // Assuming D_services.webp / M_services.webp are dark/textured,
  // using light text colors for readability and "haut de gamme, feutré" feel.
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center p-6 md:p-10 ${extraClass}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the container is in view
        className="max-w-4xl lg:max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {framesData.map((frame, index) => (
          <motion.div
            key={index}
            variants={frameVariants}
            // Styling for each "frame" - subtle background to distinguish from main section bg
            className="bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-5 p-6 rounded-lg shadow-lg backdrop-blur-sm"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-doré-clair mb-3 md:mb-4">
              {frame.title}
            </h3>
            <p className="text-base md:text-lg text-ivoire font-light leading-relaxed">
              {frame.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
