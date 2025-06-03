'use client'
/* components/home/Contact.jsx - Renamed to Acte V – Signature & appel */

import { motion } from 'framer-motion'
import SignatureSVG from '@/assets/illustrations/SignatureSVG' // Import the new SVG component
import Link from 'next/link' // For the new CTA button

const citationText = "Ce métier, je l’exerce pour redonner aux gens le pouvoir de comprendre, de choisir et de décider."
const ctaText = "→ Découvrez ce qu’on ne vous a jamais dit sur votre argent."
// Assuming 'doré' color RGB is approximately 242, 158, 76 for the boxShadow
// The colors should ideally come from generate-colors.mjs if accessible
// For dark background (D_contact.webp), text should be light (e.g., text-ivoire, text-doré-clair)
// Form input/label colors will need to complement this.

export default function Contact({ extraClass = '' }) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 0 15px 5px rgba(242, 158, 76, 0.5)", // Assuming doré is approx #F29E4C
    transition: { duration: 0.3 }
  };


  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 md:p-10 text-ivoire ${extraClass}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-lg lg:max-w-xl text-center space-y-8 md:space-y-10"
      >
        {/* Citation */}
        <motion.blockquote
          variants={itemVariants}
          className="text-2xl md:text-3xl font-light italic leading-snug md:leading-normal text-doré-clair"
        >
          "{citationText}"
        </motion.blockquote>

        {/* SVG Signature */}
        <motion.div variants={itemVariants} className="flex justify-center">
          {/* Assuming D_contact.webp is dark, signature should be light */}
          <SignatureSVG strokeColor="var(--doré-clair, #E6CFAF)" />
        </motion.div>

        {/* Adapted Contact Form */}
        {/* Assuming D_contact.webp is dark, form elements need to be styled for light text on dark inputs or dark text on light inputs */}
        <motion.form
          variants={itemVariants} // Animate form as a whole block first
          action="/api/contact" // Retained from original
          method="POST"
          className="space-y-6 text-left bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-5 p-6 md:p-8 rounded-xl shadow-lg"
        >
          <motion.div variants={formItemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-ivoire mb-1">Nom complet</label>
            <input type="text" id="name" name="name" required className="mt-1 w-full border-ivoire/50 bg-transparent rounded-md px-4 py-2.5 text-ivoire focus:ring-doré focus:border-doré placeholder-ivoire/70" placeholder="Votre nom"/>
          </motion.div>
          <motion.div variants={formItemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-ivoire mb-1">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 w-full border-ivoire/50 bg-transparent rounded-md px-4 py-2.5 text-ivoire focus:ring-doré focus:border-doré placeholder-ivoire/70" placeholder="Votre email"/>
          </motion.div>
          <motion.div variants={formItemVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-ivoire mb-1">Message</label>
            <textarea id="message" name="message" rows="4" required className="mt-1 w-full border-ivoire/50 bg-transparent rounded-md px-4 py-2.5 text-ivoire focus:ring-doré focus:border-doré placeholder-ivoire/70" placeholder="Votre message"></textarea>
          </motion.div>
          <motion.div variants={formItemVariants} className="text-center md:text-right pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-doré text-anthracite font-semibold rounded-full shadow-md hover:bg-doré-clair hover:text-anthracite-dark transition-colors duration-300"
            >
              Envoyer le message
            </button>
          </motion.div>
        </motion.form>

        {/* New Call to Action Button */}
        <motion.div variants={itemVariants} className="pt-6 md:pt-8">
          <Link href="/parcours" passHref>
            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-doré text-doré font-semibold text-lg rounded-full shadow-lg"
              whileHover={buttonHover}
              whileTap={{ scale: 0.95 }}
            >
              {ctaText}
            </motion.button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  )
}
