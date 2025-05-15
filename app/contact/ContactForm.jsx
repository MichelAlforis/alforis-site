'use client'
// app/contact/ContactForm.jsx


import React from 'react'
import { motion } from 'framer-motion'
import useButtonHover from '@/hooks/useButtonHover'

export default function ContactForm() {
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-ivoire to-white text-anthracite p-6 overflow-hidden">
      {/* Arrière-plan animé */}
      <motion.span
        className="absolute top-16 left-20 w-48 h-48 bg-anthracite opacity-5 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute bottom-16 right-24 w-72 h-72 bg-anthracite opacity-3 rounded-full filter blur-4xl"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <section className="relative z-10 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Texte & coordonnées */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-ardoise leading-tight">
            Entrer en contact avec Alforis
          </h1>
          <p className="text-lg text-acier">
            Vous souhaitez poser une question, planifier une rencontre ou
            recevoir une documentation ?
            <br />
            Laissez-nous un message ou prenez directement rendez-vous.
          </p>
          <ul className="text-sm text-acier space-y-2">
            <li>
              <strong>Email :</strong>{' '}
              <a href="mailto:michel.marques@alforis.fr" className="underline">
                michel.marques@alforis.fr
              </a>
            </li>
            <li>
              <strong>Téléphone :</strong>{' '}
              <a href="tel:+33646462291" className="underline">
                06 46 46 22 91
              </a>
            </li>
            <li>
              <strong>Adresse :</strong> 10 rue de la Bourse, 75002 Paris
            </li>
          </ul>
        </motion.div>

        {/* Formulaire */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 space-y-6"
          action="/api/contact"  /* adapte l’endpoint */
          method="POST"
        >
          {/** Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 w-full border border-beigeClair rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite"
            />
          </div>

          {/** Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full border border-beigeClair rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite"
            />
          </div>

          {/** Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="mt-1 w-full border border-beigeClair rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite"
            />
          </div>

          {/** Bouton */}
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
    </main>
  )
}
