'use client'

import React, { useState, useEffect } from 'react'
import { couleurs } from '@/styles/generated-colors'
import { motion } from 'framer-motion'
import useButtonHover from '@/hooks/useButtonHover'
import Confetti from 'react-confetti'                // npm install react-confetti
import { useWindowSize } from 'react-use'            // npm install react-use

export default function ContactForm() {
  const { buttonClass, onMouseEnter, onMouseLeave } = useButtonHover()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const { width, height } = useWindowSize()         // pour confetti

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
      setError("⚠️ Une erreur est survenue. Veuillez réessayer.")
      toast.error("⚠️ Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false)
    }
  }

  // Confirmation écran
  if (submitted) {
    return (
      <motion.section
        className="flex flex-col items-center justify-center min-h-screen bg-ivoire dark:bg-acier text-anthracite rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        aria-live="polite"
      >
        <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />
        <motion.div
          className="bg-ivoire rounded-2xl shadow-lg space-y-6 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="text-6xl">✅</div>
          <h2 className="text-3xl font-semibold">Message envoyé !</h2>
          <p className="text-lg">Merci, nous vous recontacterons sous 24 h.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-block px-8 py-3 font-semibold uppercase rounded-full bg-doré/70 text-ivoire shadow-lg hover:bg-doré/90 transition"
          >
            Nouveau message
          </button>
        </motion.div>
      </motion.section>
    )
  }

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-ivoire/20 dark:bg-acier/60 p-2 md:p-4 overflow-hidden">
      {/* Cercles d’arrière-plan */}
      <motion.span
        className="absolute top-16 left-20 w-48 h-48 bg-vertSauge opacity-50 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute bottom-16 right-24 w-72 h-72 bg-doré opacity-30 rounded-full filter blur-4xl"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-base w-full  grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Texte & coordonnées */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-lg text-acier">
            Vous souhaitez poser une question, planifier une rencontre ou
            recevoir une documentation ?<br />
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
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-ivoire bg-opacity-80 rounded-2xl shadow-xl p-4 md:p-6 space-y-6"
        >
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={isSubmitting}
              className="mt-1 w-full border border-vertSauge rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isSubmitting}
              className="mt-1 w-full border border-vertSauge rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite disabled:opacity-50"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              disabled={isSubmitting}
              className="mt-1 w-full border border-vertSauge rounded-lg px-4 py-2 focus:ring-anthracite focus:border-anthracite disabled:opacity-50"
            />
          </div>

          {/* Affichage d’erreur */}
          {error && (
            <p className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}

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
      </div>
    </section>
  )
}
