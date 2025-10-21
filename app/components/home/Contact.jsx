'use client'
/* components/home/Contact.jsx */

import { motion } from 'framer-motion'
import useButtonHover from '@/hooks/useButtonHover'
import { useState, useEffect } from 'react'
import SignatureSVG from '@/assets/illustrations/SignatureSVG'
import { Calendar, Mail } from 'lucide-react'

export default function Contact({ extraClass = '', hideForm = false }) {
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <section id="contact" className={`relative w-full max-w-6xl mx-auto py-20 md:py-28 ${extraClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <h2 className="text-doré text-3xl md:text-4xl font-bold mb-4">
          Parlons de vos objectifs financiers
        </h2>
        <p className="text-ivoire text-lg leading-relaxed max-w-2xl mx-auto">
          Choisissez la manière la plus simple pour vous de prendre contact
        </p>
      </motion.div>

      {/* Modal simplifié 2 colonnes : Calendrier + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">

        {/* CTA Calendrier */}
        <motion.a
          href="https://calendly.com/votre-lien-calendly"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="bg-ivoire bg-opacity-90 dark:bg-acier/90 rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-doré/10 rounded-full flex items-center justify-center group-hover:bg-doré/20 transition-colors duration-300">
              <Calendar className="w-10 h-10 text-doré" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-doré mb-2">Réserver un rendez-vous</h3>
              <p className="text-sm text-acier leading-relaxed">
                Choisissez un créneau de 30 minutes<br />
                Visio ou téléphone selon votre convenance<br />
                <span className="font-semibold text-doré">Réponse garantie sous 24h</span>
              </p>
            </div>
            <button className="px-8 py-3 bg-doré text-white font-semibold uppercase tracking-wide rounded-full hover:bg-doré/90 transition-all duration-300">
              Prendre RDV
            </button>
          </div>
        </motion.a>

        {/* CTA Email */}
        <motion.a
          href="mailto:michel.marques@alforis.fr"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="bg-ivoire bg-opacity-90 dark:bg-acier/90 rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-vertSauge/10 rounded-full flex items-center justify-center group-hover:bg-vertSauge/20 transition-colors duration-300">
              <Mail className="w-10 h-10 text-vertSauge dark:text-doré" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-vertSauge dark:text-doré mb-2">Envoyer un email</h3>
              <p className="text-sm text-acier leading-relaxed">
                Posez votre question par email<br />
                Recevez une documentation personnalisée<br />
                <span className="font-semibold text-vertSauge dark:text-doré">Réponse sous 24h ouvrées</span>
              </p>
            </div>
            <button className="px-8 py-3 bg-vertSauge dark:bg-doré text-white font-semibold uppercase tracking-wide rounded-full hover:bg-vertSauge/90 dark:hover:bg-doré/90 transition-all duration-300">
              Envoyer un email
            </button>
          </div>
        </motion.a>
      </div>

      {/* Informations de contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="mt-12 text-center space-y-4"
      >
        <ul className="text-sm text-ivoire space-y-2">
          <li><strong>Email :</strong> <a href="mailto:michel.marques@alforis.fr" className="underline hover:text-doré transition-colors duration-300">michel.marques@alforis.fr</a></li>
          <li><strong>Téléphone :</strong> <a href="tel:+33646462291" className="underline hover:text-doré transition-colors duration-300">06 46 46 22 91</a></li>
          <li><strong>Adresse :</strong> 10 rue de la Bourse, 75002 Paris</li>
        </ul>
        <p className="text-base text-ivoire leading-relaxed italic mt-6 max-w-2xl mx-auto">
          "Mon métier, c'est vous redonner le pouvoir sur votre argent : comprendre, choisir, agir en toute lucidité."
        </p>
        <SignatureSVG className="mt-6 text-doré h-16 md:h-24 w-auto mx-auto" />
      </motion.div>
    </section>
  )
}