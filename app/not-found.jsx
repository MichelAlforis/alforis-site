'use client'
// app/not-found.jsx

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFoundPage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-ivoire to-ivoire text-anthracite p-6">
      {/* Blobs animés */}
      <motion.span
        className="absolute top-10 left-1/4 w-40 h-40 bg-anthracite opacity-10 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.span
        className="absolute bottom-20 right-1/3 w-56 h-56 bg-anthracite opacity-5 rounded-full filter blur-2xl"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <Image
          src="/assets/img/logo.svg"
          alt="Alforis"
          width={120}
          height={40}
          className="mb-8"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'anticipate' }}
          className="text-6xl font-extrabold mb-4 tracking-tight leading-none"
        >
          Oups… Page introuvable
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-acier mb-8 leading-relaxed"
        >
          Désolé, cette page n’existe pas ou a été déplacée.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 border-2 border-anthracite text-anthracite rounded-full uppercase font-semibold tracking-widest hover:bg-anthracite hover:text-ivoire transition-all duration-300"
          >
            Retour à l’accueil
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
