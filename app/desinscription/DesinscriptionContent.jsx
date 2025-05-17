'use client'
/* app/desinscription/DesinscriptionContent.jsx */

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import Animated from '@/components/animated/Animated'
import { motion } from 'framer-motion'

export default function DesinscriptionContent() {
  const router = useRouter()
  const [status, setStatus] = useState('pending') // 'pending' | 'success' | 'error'

  useEffect(() => {
    // On ne court-circuite que côté client
    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    if (!email) {
      setStatus('error')
      return
    }
    fetch('/api/desinscription', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res) => (res.ok ? setStatus('success') : setStatus('error')))
      .catch(() => setStatus('error'))
  }, [])

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <Animated.Page>
      <main className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-ivoire via-white to-ivoire px-4 py-16">
        {/* Blobs décoratifs */}
        <motion.div
          className="absolute top-10 left-10 w-36 h-36 bg-doré opacity-10 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 bg-doré opacity-8 rounded-full filter blur-4xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-6">
          {/* Icône animée */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            transition={{ duration: 0.6 }}
          >
            {status === 'pending' && <Loader2 className="animate-spin text-doré" size={48} />}
            {status === 'success' && <CheckCircle2 className="text-green-500" size={48} />}
            {status === 'error' && <XCircle className="text-red-600" size={48} />}
          </motion.div>

          {/* Message dynamique */}
          {status === 'pending' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-medium"
            >
              Traitement de votre désinscription…
            </motion.p>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-2xl font-bold text-anthracite">Désinscription confirmée 🎉</h1>
              <p className="text-base text-acier">
                Vous ne recevrez plus nos e-mails. Merci de votre confiance.
              </p>
              <button
                onClick={() => router.push('/')}
                className="mt-4 inline-block px-6 py-3 bg-anthracite text-ivoire rounded-full font-semibold hover:opacity-90 transition"
              >
                Retour à l'accueil
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-2xl font-bold text-red-600">Erreur ❌</h1>
              <p className="text-base text-acier">
                Impossible de traiter votre demande. Veuillez vérifier le lien
                ou nous contacter.
              </p>
              <button
                onClick={() => router.push('/')}
                className="mt-4 inline-block px-6 py-3 bg-doré text-white rounded-full font-semibold hover:bg-yellow-600 transition"
              >
                Revenir à l'accueil
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </Animated.Page>
  )
}
