'use client'

import React, { useState } from 'react'
import Progress from '@/components/ui/progress'
import Button from '@/components/ui/Button'

export default function ParcoursFormulaire({ meta, slug, onComplete }) {
  const { questions, scoringMatrix, keywords } = meta

  // États
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [textAnswer, setTextAnswer] = useState('')

  // Progression sticky sous la navbar (navbar ~4rem = top-16)
  const progress = Math.round(((step + 1) / (questions.length + 1)) * 100)

  // Calcul du profil
  const calculateProfile = () => {
    const profiles = Object.keys(scoringMatrix[0])
    const scores = profiles.reduce((acc, p) => ({ ...acc, [p]: 0 }), {})

    answers.forEach((rep, i) => {
      const idx = questions[i]?.options?.indexOf(rep)
      if (idx >= 0) {
        profiles.forEach(p => {
          scores[p] += scoringMatrix[i][p][idx] || 0
        })
      }
    })

    if (textAnswer && keywords) {
      Object.entries(keywords).forEach(([p, mots]) => {
        mots.forEach(mot => {
          if (textAnswer.toLowerCase().includes(mot.toLowerCase())) {
            scores[p] += 2
          }
        })
      })
    }

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    return sorted[0][0]
  }

  // Navigation
  const goNext = () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1)
    } else {
      const profil = calculateProfile()
      onComplete({ answers, textAnswer, profil })
    }
  }
  const goBack = () => {
    if (step > 0) setStep(prev => prev - 1)
  }

  // Enregistre réponse
  const setOption = val => {
    const copy = [...answers]
    copy[step] = val
    setAnswers(copy)
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      {/* Progression */}
      <div className="sticky top-16 z-50 bg-ivoire/80 backdrop-blur py-4">
        <div className="px-2">
          <Progress value={progress} className="h-2 rounded-full" />
        </div>
        {/* Stickers sous la barre */}
        <div className="mt-2 flex justify-center space-x-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={
                `w-8 h-8 rounded-full flex items-center justify-center shadow-md transition 
                ${step === i
                  ? 'bg-doré text-white'
                  : answers[i] != null
                  ? 'bg-ardoise text-white'
                  : 'bg-light text-ardoise'}`
              }
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question actuelle */}
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-title text-ardoise">
          {questions[step].text}
        </h2>

        {/* Options ou texte libre */}
        {questions[step].options ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions[step].options.map(opt => (
              <button
                key={opt}
                onClick={() => setOption(opt)}
                className={
                  `p-4 rounded-xl border transition
                  ${answers[step] === opt
                    ? 'border-doré bg-doré/10 text-doré font-semibold'
                    : 'border-light bg-light text-ardoise'}`
                }
              >
                {opt}
              </button>
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

        {/* Back / Next */}
        <div className="flex justify-between pt-4 border-t border-light">
          <Button className="btn-alforis-outline" onClick={goBack} disabled={step === 0}>
            ← Précédent
          </Button>
          <Button
            onClick={goNext}
            disabled={
              questions[step].options
                ? answers[step] == null
                : textAnswer.trim() === ''
            }
          >
            {step === questions.length - 1 ? 'Voir mes résultats' : 'Suivant →'}
          </Button>
        </div>
      </div>
    </div>
  )
}