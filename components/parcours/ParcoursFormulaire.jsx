'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Progress from '@/components/ui/progress'
import { detectProfilFromMatrix } from '@/components/parcours/detectProfilFromMatrix'
import { toast } from 'react-toastify'
import PremiumButton from '../ui/PremiumButton'


export default function ParcoursFormulaire({ meta, slug, onComplete }) {
  const { questions } = meta
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [textAnswer, setTextAnswer] = useState('')
  const [shake, setShake] = useState(false)

  // Progression sticky + stickers
  const progressPercent = Math.round((step / questions.length) * 80)

  const handleNextClick = () => {
    const isDisabled = questions[step].options
      ? answers[step] == null
      : textAnswer.trim() === ''
    if (isDisabled) {
      toast.warn("Merci de répondre à la question avant de continuer.");
      setShake(true)
      setTimeout(() => setShake(false), 300)
      return
    }
    if (step < questions.length - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      try {
      const { profilPrincipal, profilSecondaire } = detectProfilFromMatrix(answers, textAnswer, meta.scoringMatrix, meta.keywords)
        toast.success("Bravo ! Questionnaire terminé.")
        onComplete({
          answers,
          textAnswer,
          profilPrincipal,
          profilSecondaire,    // ← on ajoute le secondaire
        })
        } catch (err) {
            toast.error("Une erreur est survenue lors du calcul de votre profil.");
          return;
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
<section className="main-content">
  {/* Wrapper qui fixe la largeur responsive */}
  <div className="max-w-3xl mx-auto px-4 space-y-8">
    
    {/* Bloc sticky – même largeur que le contenu */}
    <div
      className="
        sticky top-[var(--nav-height)] 
        bg-ivoire/90 dark:bg-acier/60 
        rounded-2xl p-4 
        flex flex-col
        z-base mb-2 md:mb-4
      "
    >
      {/* 1. Marge au-dessus de la progressbar, mais à l'intérieur du bg */}
      <div className="mb-4">
        <Progress value={progressPercent} className="h-2 rounded-full" />
      </div>
      
      {/* 2. Cercles de progression */}
      <div className="flex justify-center space-x-3">
        {questions.map((_, i) => {
          const done    = answers[i] != null
          const current = step === i
          return (
            <div
              key={i}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center shadow-md transition
                ${current
                  ? 'bg-doré text-ivoire'
                  : done
                    ? 'bg-ardoise text-ivoire'
                    : 'bg-light text-ardoise'
                }
              `}
            >
              {i + 1}
            </div>
          )
        })}
      </div>
    </div>

    {/* Bloc contenu – même wrapper max-width que le sticky */}
    <div className="space-y-8">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-ivoire p-8 rounded-2xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-title text-ardoise">
            {questions[step].text}
          </h2>

          {questions[step].options ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step].options.map((opt, i) => {
                const isActive = answers[step] === opt;
                return (
                  <motion.button
                    key={i}
                    onClick={e => {
                      setOption(opt);
                      e.currentTarget.blur();
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      p-4 rounded-xl border transition
                      ${isActive
                        ? 'border-doré bg-doré/10 text-doré font-semibold'
                        : 'border-light bg-light text-ardoise'
                      }
                      focus:outline-none focus:ring-0 focus:border-light
                    `}
                  >
                    {opt}
                  </motion.button>
                )
              })}
            </div>
          ) : (
            <textarea
              rows={4}
              value={textAnswer}
              onChange={e => setTextAnswer(e.target.value)}
              placeholder="Votre réponse libre..."
              className="w-full p-4 border border-light rounded-xl shadow-sm focus:ring-2 focus:ring-doré"
            />
          )}
        </motion.div>
      </AnimatePresence>

    {/* Bloc bouttons */}

      <div className="flex flex-row justify-between items-center pt-4 border-t border-light">
        {/* ← Précédent */}
        <PremiumButton
          onClick={goBack}
          disabled={step === 0}
          className="w-40
            px-3 py-2 text-md
            rounded-lg
            bg-transparent text-doré hover:bg-doré/10"  
        >
          ← Précédent
        </PremiumButton>

        {/* Suivant / Valider */}
        <PremiumButton
          onClick={handleNextClick}
          disabled={
            questions[step].options
              ? answers[step] == null
              : textAnswer.trim() === ''
          }
          className="w-40
            px-3 py-2 text-md
            rounded-lg
            bg-transparent text-doré hover:bg-doré/10" 
        >
          {step === questions.length - 1 ? 'Valider' : 'Suivant →'}
        </PremiumButton>
      </div>




    </div>

  </div>
</section>
 )
}