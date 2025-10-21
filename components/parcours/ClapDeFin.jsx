'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Mail,
  Calendar,
  Award,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react'
import confetti from 'canvas-confetti'

export default function ClapDeFin({
  profilPrincipal,
  profilSecondaire,
  meta,
}) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [copied, setCopied] = useState(false)

  const data = meta.profilesData?.[profilPrincipal]

  useEffect(() => {
    // Confetti explosion au chargement
    const duration = 3000
    const end = Date.now() + duration

    const colors = ['#1E4D8B', '#D4AF37', '#8B9DC3']

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
    setShowConfetti(true)

    return () => setShowConfetti(false)
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-corporate/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 bg-white dark:bg-slate-corporate/60 rounded-3xl shadow-2xl"
        >
          <p className="text-2xl text-slate-corporate dark:text-white">
            Profil introuvable
          </p>
          <Link
            href="/particulier/parcours"
            className="mt-6 inline-block text-trust-blue hover:underline"
          >
            Revenir à la sélection
          </Link>
        </motion.div>
      </div>
    )
  }

  const { icon, title, description, color, paragraphs, citation, cta } = data
  let href = cta?.href || '/contact'
  if (href && !href.startsWith('http') && !href.startsWith('/')) {
    href = `/${href}`
  }
  const isExternal = href.startsWith('http')

  const currentPhase = 3
  const totalPhases = 3

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Mon profil : ${profilPrincipal}`,
        text: description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const iconVariant = {
    hidden: { scale: 0, rotate: -180 },
    show: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.5,
      },
    },
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-powder-blue/10 to-gold-classic/5 dark:from-slate-corporate dark:via-slate-corporate/95 dark:to-slate-corporate/90 pt-[calc(var(--nav-height)+2rem)] pb-20 overflow-hidden relative">
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * -100],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute w-2 h-2 bg-gold-classic rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-8 relative z-10">
        {/* Indicateur Phase 3 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-[var(--nav-height)] z-50 bg-white/95 dark:bg-slate-corporate/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gold-classic/30 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-classic to-trust-blue text-white flex items-center justify-center font-bold text-lg shadow-lg"
              >
                {currentPhase}
              </motion.div>
              <div>
                <p className="text-sm text-slate-corporate/60 dark:text-powder-blue/60 font-medium">
                  Phase {currentPhase}/{totalPhases}
                </p>
                <p className="text-lg font-semibold text-gold-classic">
                  Votre profil complet
                </p>
              </div>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        {/* Carte principale avec profil */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-slate-corporate/60 backdrop-blur-sm rounded-3xl shadow-2xl border-4 p-8 md:p-16 space-y-10"
          style={{ borderColor: color || '#D4AF37' }}
        >
          {/* Badge "Terminé" */}
          <motion.div variants={item} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border-2 border-green-500 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="text-green-500 font-bold text-lg">
                Questionnaire terminé !
              </span>
            </div>
          </motion.div>

          {/* Icône principale */}
          <motion.div variants={iconVariant} className="flex justify-center">
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="text-8xl md:text-9xl"
              >
                {icon}
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gold-classic/20 rounded-full blur-3xl"
              />
            </div>
          </motion.div>

          {/* Titre profil */}
          <motion.div variants={item} className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-title font-bold text-slate-corporate dark:text-white leading-tight">
              {title}
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-gold-classic to-transparent mx-auto max-w-md"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-center text-slate-corporate/80 dark:text-powder-blue/90 leading-relaxed max-w-3xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Badge profil secondaire */}
          {profilSecondaire && (
            <motion.div variants={item} className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-trust-blue/10 border-2 border-trust-blue/30 rounded-full">
                <Award className="w-5 h-5 text-trust-blue" />
                <span className="text-trust-blue font-semibold">
                  Profil secondaire : <strong>{profilSecondaire}</strong>
                </span>
              </div>
            </motion.div>
          )}

          {/* Paragraphes détaillés */}
          <motion.div
            variants={container}
            className="space-y-6 max-w-3xl mx-auto"
          >
            {paragraphs?.map((p, i) => (
              <motion.div
                key={i}
                variants={item}
                className="p-6 bg-gradient-to-br from-trust-blue/5 to-powder-blue/5 dark:from-trust-blue/10 dark:to-powder-blue/10 rounded-2xl border border-trust-blue/10"
              >
                <p className="text-lg text-slate-corporate/90 dark:text-powder-blue/90 leading-relaxed">
                  {p}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Citation inspirante */}
          {citation && (
            <motion.blockquote
              variants={item}
              className="relative p-8 bg-gradient-to-br from-gold-classic/10 to-gold-classic/5 rounded-2xl border-l-4 italic text-lg text-slate-corporate/80 dark:text-powder-blue/80"
              style={{ borderColor: color || '#D4AF37' }}
            >
              <span className="text-4xl absolute top-4 left-4 opacity-20">
                {citation.emoji}
              </span>
              <p className="relative z-10 pl-8">{citation.text}</p>
            </motion.blockquote>
          )}

          {/* Actions CTA */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            {/* CTA Principal */}
            {isExternal ? (
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-trust-blue to-powder-blue text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-trust-blue/50 transition-all duration-300"
              >
                {cta?.label || 'Prendre rendez-vous'}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            ) : (
              <Link href={href}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-trust-blue to-powder-blue text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-trust-blue/50 transition-all duration-300 cursor-pointer"
                >
                  {cta?.label || 'Prendre rendez-vous'}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </motion.div>
              </Link>
            )}

            {/* Bouton Partager */}
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-slate-corporate/10 dark:bg-powder-blue/10 text-slate-corporate dark:text-powder-blue font-semibold rounded-xl hover:bg-slate-corporate/20 dark:hover:bg-powder-blue/20 transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
              {copied ? 'Copié !' : 'Partager'}
            </motion.button>
          </motion.div>

          {/* Actions secondaires */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link
              href="/contact"
              className="flex items-center gap-2 text-trust-blue hover:text-powder-blue font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              Nous contacter
            </Link>
            <Link
              href="/particulier/parcours"
              className="flex items-center gap-2 text-slate-corporate/60 dark:text-powder-blue/60 hover:text-slate-corporate dark:hover:text-powder-blue font-medium transition-colors"
            >
              ← Refaire un parcours
            </Link>
          </motion.div>

          {/* Ligne de séparation dorée */}
          <motion.div
            variants={item}
            className="h-px bg-gradient-to-r from-transparent via-gold-classic to-transparent"
          />

          {/* Message de confirmation email */}
          <motion.div
            variants={item}
            className="text-center p-6 bg-trust-blue/5 dark:bg-trust-blue/10 rounded-2xl border border-trust-blue/20"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-trust-blue" />
              <p className="font-bold text-lg text-trust-blue">
                Vérifiez vos emails !
              </p>
            </div>
            <p className="text-slate-corporate/70 dark:text-powder-blue/70">
              Votre profil complet et nos recommandations personnalisées vous
              ont été envoyés par email.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
