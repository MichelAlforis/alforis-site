'use client'
/* components/home/Contact.jsx - SECTION 5: CONTACT AVEC SIGNATURE SVG */

import { motion } from 'framer-motion'
import SignatureSVG from '@/assets/illustrations/SignatureSVG'
import Link from 'next/link' // For the final CTA button

const citationText = "Mon métier, c’est vous redonner le pouvoir sur votre argent : comprendre, choisir, agir en toute lucidité."
const finalCtaText = "Échangeons sur votre trajectoire financière."
// Assuming 'doré' color is rgb(242, 158, 76) for boxShadow
const doradoBoxShadow = "0 0 15px 5px rgba(242, 158, 76, 0.4)";

export default function Contact({ extraClass = '' }) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.2 } // Stagger children appearance
    }
  };

  const itemVariants = { // For citation, signature, form block, final CTA
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const formInputVariants = { // For individual form elements if needed, or animate form as one block
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Common hover effect for buttons (can be customized per button)
  const buttonHoverEffect = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };
  const finalCtaHoverEffect = {
    scale: 1.05,
    boxShadow: doradoBoxShadow,
    transition: { duration: 0.3 }
  };

  // Assuming D_contact.webp / M_contact.webp background (likely dark), use light text.
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 md:p-10 text-ivoire ${extraClass}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }} // Trigger when 15% is in view
        className="w-full max-w-lg lg:max-w-xl text-center space-y-6 md:space-y-8"
      >
        {/* Citation */}
        <motion.blockquote
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl font-light italic text-doré-clair leading-snug md:leading-normal"
        >
          "{citationText}"
        </motion.blockquote>

        {/* SVG Signature */}
        <motion.div variants={itemVariants} className="flex justify-center my-4 md:my-6">
          <SignatureSVG strokeColor="var(--doré-clair, #E6CFAF)" />
        </motion.div>

        {/* Contact Form (adapted) */}
        <motion.form
          variants={itemVariants}
          action="/api/contact" // Retained from original
          method="POST"
          className="space-y-5 md:space-y-6 text-left bg-black bg-opacity-25 dark:bg-white dark:bg-opacity-10 p-6 md:p-8 rounded-xl shadow-2xl backdrop-blur-sm"
        >
          <motion.div variants={formInputVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-ivoire/90 mb-1">Nom</label>
            <input type="text" id="name" name="name" required className="mt-1 w-full border-ivoire/40 bg-white/5 rounded-md px-4 py-2.5 text-ivoire focus:ring-doré focus:border-doré placeholder-ivoire/60" placeholder="Votre nom complet"/>
          </motion.div>
          <motion.div variants={formInputVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-ivoire/90 mb-1">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 w-full border-ivoire/40 bg-white/5 rounded-md px-4 py-2.5 text-ivoire focus:ring-doré focus:border-doré placeholder-ivoire/60" placeholder="Votre adresse email"/>
          </motion.div>
          <motion.div variants={formInputVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-ivoire/90 mb-1">Message</label>
            <textarea id="message" name="message" rows="4" required className="mt-1 w-full border-ivoire/40 bg-white/5 rounded-md px-4 py-2.5 text-ivoire focus:ring-doré focus:border-doré placeholder-ivoire/60" placeholder="Quel est votre besoin ?"></textarea>
          </motion.div>
          <motion.div variants={formInputVariants} className="text-center pt-2">
            <motion.button
              type="submit"
              className="px-9 py-3 bg-doré text-anthracite font-semibold rounded-full shadow-md hover:bg-doré-clair hover:text-anthracite-dark transition-colors duration-300"
              whileHover={buttonHoverEffect}
              whileTap={{ scale: 0.98 }}
            >
              Envoyer le message
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Final Call to Action Button */}
        <motion.div variants={itemVariants} className="pt-4 md:pt-6">
          <Link href="/parcours" passHref> {/* Defaulting to /parcours, can be changed */}
            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-doré-clair text-doré-clair font-semibold text-lg rounded-full shadow-lg"
              whileHover={finalCtaHoverEffect}
              whileTap={{ scale: 0.95 }}
            >
              {finalCtaText}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
