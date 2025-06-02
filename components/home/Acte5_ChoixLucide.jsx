'use client'
/* components/home/Acte5_ChoixLucide.jsx */

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link' // For the CTA button

// Placeholder for icons - actual SVGs would be imported or used inline
const IconPlaceholder = ({ name, className = '' }) => (
  <div className={`flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full text-acier text-xs ${className}`}>
    {name}
  </div>
);

const content = {
  title: "ACTE V – LE CHOIX LUCIDE",
  lines: [
    "On vous a souvent fait croire qu’il fallait être riche pour être conseillé.",
    "C’est faux. Ce qu’il faut, c’est être prêt.",
  ],
  readiness: "Prêt à comprendre. Prêt à décider. Prêt à agir.",
  finalQuestion: "Et si c’était maintenant ?",
  cta: {
    text: "→ Je souhaite découvrir cette approche",
    href: "/parcours"
  },
  icons: [ // Placeholder names
    { name: "Email", id: "email" },
    { name: "Lumière", id: "light" },
    { name: "Dossiers", id: "files" }
  ]
};

export default function Acte5_ChoixLucide({ extraClass = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const iconContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.5, // Delay after main text starts appearing
            staggerChildren: 0.3,
        }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 10 }
    }
  };


  return (
    <section
      className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-acier ${extraClass}`}
      style={{ backgroundColor: '#2C2C2C' }} // Soft dark background (charcoal)
    >
      <motion.div
        className="max-w-3xl mx-auto p-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-title font-bold text-doré-clair mb-10 md:mb-12"
          variants={itemVariants}
        >
          {content.title}
        </motion.h2>

        {content.lines.map((line, index) => (
          <motion.p
            key={index}
            className="text-xl md:text-2xl text-gray-300 mb-4 font-light leading-relaxed"
            variants={itemVariants}
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          className="my-10 md:my-12"
          variants={iconContainerVariants} // This will apply stagger to its children (icons)
        >
          <div className="flex justify-center space-x-6 md:space-x-8">
            {content.icons.map((icon) => (
              <motion.div key={icon.id} variants={iconVariants}>
                <IconPlaceholder name={icon.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-2xl md:text-3xl text-gray-200 mb-8 font-medium" // Emphasized readiness
          variants={itemVariants}
        >
          {content.readiness}
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl text-doré-clair mb-10 md:mb-12 italic" // Final question highlighted
          variants={itemVariants}
        >
          {content.finalQuestion}
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link href={content.cta.href} passHref>
            <motion.button
              className="px-10 py-4 bg-doré-clair text-anthracite font-semibold text-lg rounded-full shadow-lg
                         hover:bg-doré transition-colors duration-300 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-doré focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {content.cta.text}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
