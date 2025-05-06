import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="bg-ivoire text-anthracite min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-4"
      >
        Page introuvable
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-lg text-acier mb-8"
      >
        Désolé, cette page n’existe pas ou a été déplacée.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href="/" className="btn-alforis-outline">
          Retour à l’accueil
        </Link>
      </motion.div>
    </main>
  )
}
