'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { detectProfilFromMatrix } from '@/components/parcours/detectProfilFromMatrix'
import { toast } from 'react-toastify'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'


export default function ParcoursFormulaire({ meta, slug, onComplete }) {
  const { questions } = meta
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [textAnswer, setTextAnswer] = useState('')
  const [shake, setShake] = useState(false)

  // Progression avec indicateur de phase
  const progressPercent = Math.round((step / questions.length) * 100)
  const totalPhases = 3 // Form → Contact → Results
  const currentPhase = 1

  const handleNextClick = () => {
    const isDisabled = questions[step].options
      ? answers[step] == null
      : textAnswer.trim() === ''
    if (isDisabled) {
      toast.warn("Merci de répondre à la question avant de continuer.", {
        position: "top-center",
        autoClose: 2000,
      });
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    if (step < questions.length - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      try {
        const { profilPrincipal, profilSecondaire } = detectProfilFromMatrix(
          answers,
          textAnswer,
          meta.scoringMatrix,
          meta.keywords
        )
        toast.success("🎉 Questionnaire terminé avec succès !", {
          position: "top-center",
          autoClose: 2000,
        })
        onComplete({
          answers,
          textAnswer,
          profilPrincipal,
          profilSecondaire,
        })
      } catch (err) {
        console.error('Erreur profil:', err)
        toast.error("Une erreur est survenue lors du calcul de votre profil.", {
          position: "top-center",
        })
        return
      }
    }
  }

  const goBack = () => step > 0 && setStep(step - 1)

  const setOption = (opt) => {
    const copy = [...answers]
    copy[step] = opt
    setAnswers(copy)
  }

  return (
<section className="min-h-screen bg-gradient-to-b from-white via-powder-blue/5 to-slate-corporate/5 dark:from-slate-corporate dark:via-slate-corporate/90 dark:to-slate-corporate/80 pt-[calc(var(--nav-height)+2rem)] pb-20">
  <div className="max-w-4xl mx-auto px-4 space-y-6">

    {/* Indicateur de phase global */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-[var(--nav-height)] z-50 bg-white/95 dark:bg-slate-corporate/95 backdrop-blur-xl rounded-2xl shadow-lg border border-trust-blue/20 p-6 mb-8"
    >
      {/* Phase actuelle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-trust-blue text-white flex items-center justify-center font-bold text-lg shadow-lg">
            {currentPhase}
          </div>
          <div>
            <p className="text-sm text-slate-corporate/60 dark:text-powder-blue/60 font-medium">
              Phase {currentPhase}/{totalPhases}
            </p>
            <p className="text-lg font-semibold text-trust-blue">
              Questionnaire
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gold-classic">
            {step + 1}/{questions.length}
          </p>
          <p className="text-xs text-slate-corporate/60 dark:text-powder-blue/60">
            Questions
          </p>
        </div>
      </div>

      {/* Barre de progression moderne */}
      <div className="relative w-full h-3 bg-slate-corporate/10 dark:bg-powder-blue/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-trust-blue via-powder-blue to-gold-classic rounded-full shadow-lg"
        />
      </div>

      {/* Mini cercles de progression */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {questions.map((_, i) => {
          const done = answers[i] != null
          const current = step === i
          return (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`
                relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                ${current
                  ? 'bg-trust-blue text-white ring-4 ring-trust-blue/30 scale-110 shadow-lg'
                  : done
                    ? 'bg-gold-classic text-slate-corporate dark:text-slate-corporate shadow-md'
                    : 'bg-slate-corporate/10 text-slate-corporate/40 dark:bg-powder-blue/10 dark:text-powder-blue/40'
                }
              `}
            >
              {done && !current ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                i + 1
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>

    {/* Questions Card */}
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`
          bg-white dark:bg-slate-corporate/60 backdrop-blur-sm
          p-8 md:p-12 rounded-3xl shadow-2xl border border-trust-blue/10
          space-y-8 transition-all duration-300
          ${shake ? 'animate-shake' : ''}
        `}
      >
        {/* Numéro de question stylisé */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-trust-blue to-powder-blue flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {step + 1}
          </div>
          <div className="h-1 flex-1 bg-gradient-to-r from-trust-blue/30 to-transparent rounded-full" />
        </div>

        {/* Question */}
        <h2 className="text-2xl md:text-3xl font-title text-slate-corporate dark:text-white leading-relaxed">
          {questions[step].text}
        </h2>

        {/* Options ou textarea */}
        {questions[step].options ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions[step].options.map((opt, i) => {
              const isActive = answers[step] === opt
              return (
                <motion.button
                  key={i}
                  onClick={(e) => {
                    setOption(opt)
                    e.currentTarget.blur()
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    group relative p-5 rounded-2xl border-2 transition-all duration-300
                    text-left font-medium
                    ${isActive
                      ? 'border-trust-blue bg-trust-blue/10 dark:bg-trust-blue/20 text-trust-blue dark:text-powder-blue shadow-lg shadow-trust-blue/20'
                      : 'border-slate-corporate/20 dark:border-powder-blue/30 bg-white dark:bg-slate-corporate/40 text-slate-corporate dark:text-powder-blue hover:border-powder-blue hover:shadow-md'
                    }
                  `}
                >
                  <span className="relative z-10">{opt}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeOption"
                      className="absolute inset-0 bg-trust-blue/5 rounded-2xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        ) : (
          <textarea
            rows={5}
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Écrivez votre réponse ici..."
            className="w-full p-5 border-2 border-slate-corporate/20 dark:border-powder-blue/30 rounded-2xl shadow-sm
              focus:ring-4 focus:ring-trust-blue/20 focus:border-trust-blue
              bg-white dark:bg-slate-corporate/40 text-slate-corporate dark:text-white
              placeholder:text-slate-corporate/40 dark:placeholder:text-powder-blue/40
              transition-all duration-300 resize-none"
          />
        )}

        {/* Boutons de navigation */}
        <div className="flex justify-between items-center pt-6 border-t-2 border-slate-corporate/10 dark:border-powder-blue/10">
          <motion.button
            onClick={goBack}
            disabled={step === 0}
            whileHover={step > 0 ? { scale: 1.05, x: -5 } : {}}
            whileTap={step > 0 ? { scale: 0.95 } : {}}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
              ${step === 0
                ? 'opacity-40 cursor-not-allowed text-slate-corporate/40 dark:text-powder-blue/40'
                : 'bg-slate-corporate/10 dark:bg-powder-blue/10 text-slate-corporate dark:text-powder-blue hover:bg-slate-corporate/20 dark:hover:bg-powder-blue/20 shadow-md'
              }
            `}
          >
            <ArrowLeft className="w-5 h-5" />
            Précédent
          </motion.button>

          <motion.button
            onClick={handleNextClick}
            disabled={
              questions[step].options
                ? answers[step] == null
                : textAnswer.trim() === ''
            }
            whileHover={{
              scale: 1.05,
              x: 5,
              boxShadow: '0 10px 40px rgba(30, 77, 139, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
              ${
                questions[step].options
                  ? answers[step] == null
                  : textAnswer.trim() === ''
                ? 'opacity-50 cursor-not-allowed bg-slate-corporate/20 dark:bg-powder-blue/20 text-slate-corporate/40 dark:text-powder-blue/40'
                : 'bg-gradient-to-r from-trust-blue to-powder-blue text-white shadow-lg hover:shadow-2xl hover:shadow-trust-blue/40'
              }
            `}
          >
            {step === questions.length - 1 ? (
              <>
                Valider
                <CheckCircle2 className="w-5 h-5" />
              </>
            ) : (
              <>
                Suivant
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>

  </div>
</section>
  )
}