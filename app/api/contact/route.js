'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useButtonHover from '@/hooks/useButtonHover'

export default function ContactForm() {
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Handler de soumission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) throw new Error('Erreur réseau')
      setSubmitted(true)
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // UI de confirmation
  if (submitted) {
    return (
      <motion.main
        className="flex flex-col items-center justify-center min-h-screen bg-ivoire text-anthracite p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-12 space-y-6 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="text-6xl">✅</div>
          <h2 className="text-3xl font-semibold">Message envoyé !</h2>
          <p className="text-lg">Merci de nous avoir contactés. Nous reviendrons vers vous sous 24 h.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-block px-8 py-3 font-semibold uppercase rounded-full bg-doré text-white shadow-lg hover:bg-doré/90 transition"
          >
            Envoyer un autre message
          </button>
        </motion.div>
      </motion.main>
    )
  }

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
            recevoir une documentation ?<br />
            Laissez-nous un message ou prenez directement rendez-vous.
          </p>
          <ul className="text-sm text-acier space-y-2">
            <li><strong>Email :</strong>{' '}
              <a href="mailto:michel.marques@alforis.fr" className="underline">
                michel.marques@alforis.fr
              </a>
            </li>
            <li><strong>Téléphone :</strong>{' '}
              <a href="tel:+33646462291" className="underline">
                06 46 46 22 91
              </a>
            </li>
            <li><strong>Adresse :</strong> 10 rue de la Bourse, 75002 Paris</li>
          </ul>
        </motion.div>

        {/* Formulaire */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 w-full border border-beigeClair rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full border border-beigeClair rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="mt-1 w-full border border-beigeClair rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite"
            />
          </div>

          {/* Erreur */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Bouton */}
          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className={`${buttonClass} inline-block px-8 py-3 font-semibold uppercase tracking-wide rounded-full border-2 border-anthracite transition-all duration-300 ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-anthracite hover:text-ivoire'
              }`}
            >
              {isSubmitting ? 'Envoi…' : 'Envoyer le message'}
            </button>
          </div>
        </motion.form>
      </section>
    </main>
  )
}
