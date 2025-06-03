'use client'
/* components/home/Contact.jsx */

import { motion } from 'framer-motion'
import useButtonHover from '@/hooks/useButtonHover'
import { useState, useEffect } from 'react'

export default function Contact({ extraClass = '' }) {
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <section id="contact" className={`relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-16 ${extraClass}`}>      
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-doré mb-4">
          Entrer en contact avec Alforis
        </h2>
        <p className="text-base text-ivoire leading-relaxed">
          Vous souhaitez poser une question, planifier une rencontre ou recevoir une documentation ? <br />
          Laissez-nous un message ou prenez directement rendez-vous.
        </p>
        <ul className="text-sm text-ivoire space-y-2">
          <li><strong>Email :</strong> <a href="mailto:michel.marques@alforis.fr" className="underline">michel.marques@alforis.fr</a></li>
          <li><strong>Téléphone :</strong> <a href="tel:+33646462291" className="underline">06 46 46 22 91</a></li>
          <li><strong>Adresse :</strong> 10 rue de la Bourse, 75002 Paris</li>
        </ul>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-ivoire bg-opacity-90 dark:bg-acier/90 rounded-2xl shadow-xl p-8 space-y-6"
        action="/api/contact"
        method="POST"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-anthracite dark:text-ivoire">Nom complet</label>
          <input type="text" id="name" name="name" required className="mt-2 w-full border border-vertSauge rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-anthracite dark:text-ivoire">Email</label>
          <input type="email" id="email" name="email" required className="mt-2 w-full border border-vertSauge rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-anthracite dark:text-ivoire">Message</label>
          <textarea id="message" name="message" rows="5" required className="mt-2 w-full border border-vertSauge rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite"></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`${buttonClass} inline-block px-8 py-3 font-semibold uppercase tracking-wide rounded-full border-2 border-anthracite transition-all duration-300 hover:bg-anthracite hover:text-ivoire`}
          >
            Envoyer le message
          </button>
        </div>
      </motion.form>
    </section>
  )
}