'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Progress from '@/components/ui/progress'
import Button from '@/components/ui/Button'
import { detectProfilFromMatrix } from '@/components/parcours/detectProfilFromMatrix'

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
      setShake(true)
      setTimeout(() => setShake(false), 300)
      return
    }
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      const { profilPrincipal } = detectProfilFromMatrix(answers, textAnswer)
      onComplete({ answers, textAnswer, profil: profilPrincipal })
    }
  }

  const goBack = () => step > 0 && setStep(step - 1)

  const setOption = (opt) => {
    const copy = [...answers]
    copy[step] = opt
    setAnswers(copy)
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div className="sticky top-16 z-50 bg-ivoire/80 backdrop-blur py-4">
        <div className="px-2">
          <Progress value={progressPercent} className="h-2 rounded-full" />
        </div>
        <div className="mt-2 flex justify-center space-x-3">
          {questions.map((_, i) => {
            const done = answers[i] != null
            const current = step === i
            return (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition ${
                  current
                    ? 'bg-doré text-white'
                    : done
                    ? 'bg-ardoise text-white'
                    : 'bg-light text-ardoise'
                }`}
              >{i + 1}</div>
            )
          })}
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-title text-ardoise">
            {questions[step].text}
          </h2>

          {questions[step].options ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step].options.map(opt => (
                <motion.button
                  key={opt}
                  onClick={() => setOption(opt)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`p-4 rounded-xl border transition ${
                    answers[step] === opt
                      ? 'border-doré bg-doré/10 text-doré font-semibold'
                      : 'border-light bg-light text-ardoise'
                  }`}
                >{opt}</motion.button>
              ))}
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

      <div className="flex justify-between pt-4 border-t border-light">
        <Button onClick={goBack} disabled={step === 0} className="btn-alforis-outline">
          ← Précédent
        </Button>
        <motion.div animate={shake ? { rotate: [0, -10, 10, -10, 0] } : { rotate: 0 }} transition={{ duration: 0.4 }}>
          <Button onClick={handleNextClick} disabled={questions[step].options ? answers[step] == null : textAnswer.trim() === ''}>
            {step === questions.length - 1 ? 'Valider' : 'Suivant →'}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}