// components/parcours/ParcoursFormulaire.jsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import Button from '@/components/ui/Button'
import ContactFinal from '@/components/parcours/ContactFinal'
import ClapDeFin from '@/components/parcours/ClapDeFin'
import AlforisHead from '@/components/AlforisHead'



export default function ParcoursFormulaire({ meta, slug }) {
  const { title, description, questions, scoringMatrix, keywords } = meta

  // États
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [textAnswer, setTextAnswer] = useState('')
  const [completed, setCompleted] = useState(false)
  const [profile, setProfile] = useState(null)
  const [contactDone, setContactDone] = useState(false)

  // Progression sticky sous la navbar (navbar ~4rem = top-16)
  const progress = completed
    ? contactDone ? 100 : 90
    : Math.round((step / questions.length) * 80)

  // Calcul du profil
  const calculateProfile = () => {
    const profiles = Object.keys(scoringMatrix[0])
    const scores = profiles.reduce((acc, p) => ({ ...acc, [p]: 0 }), {})
    answers.forEach((rep, i) => {
      const idx = questions[i]?.options?.indexOf(rep)
      if (idx >= 0) {
        profiles.forEach(p => scores[p] += scoringMatrix[i][p][idx] || 0)
      }
    })
    if (textAnswer && keywords) {
      Object.entries(keywords).forEach(([p, mots]) => {
        mots.forEach(mot => {
          if (textAnswer.toLowerCase().includes(mot.toLowerCase())) scores[p] += 2
        })
      })
    }
    const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1])
    return sorted[0][0]
  }

  // Navigation
  const goNext = () => {
    if (step < questions.length - 1) setStep(step + 1)
    else {
      const p = calculateProfile()
      setProfile(p)
      setCompleted(true)
    }
  }
  const goBack = () => step > 0 && setStep(step - 1)

  // Enregistre réponse
  const setOption = val => {
    const a = [...answers]
    a[step] = val
    setAnswers(a)
  }

  return (
    <>
      <AlforisHead title={`${title} – Alforis`} description={description} path={`/${slug}`} />

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
                  ${step === i ? 'bg-doré text-white' : answers[i] != null ? 'bg-ardoise text-white' : 'bg-light text-ardoise'}`
                }
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence exitBeforeEnter initial={false}>
          {!completed ? (
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

              {/* Options ou texte libre */}
              {questions[step].options ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[step].options.map(opt => (
                    <motion.button
                      key={opt}
                      onClick={() => setOption(opt)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={
                        `p-4 rounded-xl border transition
                          ${answers[step] === opt
                            ? 'border-doré bg-doré/10 text-doré font-semibold'
                            : 'border-light bg-light text-ardoise'}`
                      }
                    >
                      {opt}
                    </motion.button>
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
                  {step === questions.length - 1 ? 'Valider' : 'Suivant →'}
                </Button>
              </div>
            </motion.div>
          ) : !contactDone && profile ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="p-8"
            >
              <ContactFinal
                answers={answers}
                textAnswer={textAnswer}
                profile={profile}
                parcoursSlug={slug}
                onSubmit={() => setContactDone(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="fin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8"
            >
              <ClapDeFin profil={profile} meta={meta} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
