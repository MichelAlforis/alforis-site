// components/parcours/ParcoursFormulaire.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Animated } from '@/components/animated/Animated'
import { Progress } from '@/components/ui/progress'
import Button from '@/components/ui/button'
import ContactFinal from '@/components/parcours/ContactFinal'
import ClapDeFin from '@/components/parcours/ClapDeFin'
import ProfileDetails from '@/components/parcours/ProfileDetails'
import AlforisHead from '@/components/AlforisHead'
import { GoldText } from '@/hooks/useGoldEffect'

export default function ParcoursFormulaire({ meta, slug }) {
  const { title, description, questions, scoringMatrix, keywords } = meta

  // États du parcours
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [textAnswer, setTextAnswer] = useState('')
  const [completed, setCompleted] = useState(false)
  const [profile, setProfile] = useState(null)
  const [showProfileKeyword, setShowProfileKeyword] = useState(false)
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [contactDone, setContactDone] = useState(false)

  // Scroll au sommet pour chaque étape
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, showProfileKeyword, showProfileDetails, contactDone])

  // Calcul du profil à partir des réponses
  const calculateProfile = () => {
    const profils = Object.keys(scoringMatrix[0])
    const scores = profils.reduce((acc, p) => ({ ...acc, [p]: 0 }), {})
    answers.forEach((rep, i) => {
      const idx = questions[i]?.options?.indexOf(rep)
      if (idx >= 0) {
        profils.forEach(p => (scores[p] += scoringMatrix[i][p][idx] || 0))
      }
    })
    if (textAnswer && keywords) {
      Object.entries(keywords).forEach(([p, mots]) => {
        mots.forEach(mot => {
          if (textAnswer.toLowerCase().includes(mot.toLowerCase())) scores[p] += 2
        })
      })
    }
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    return sorted[0][0]
  }

  // Navigation entre étapes/questions
  const goNext = () => {
    if (!completed) {
      if (step < questions.length - 1) setStep(step + 1)
      else {
        const p = calculateProfile()
        setProfile(p)
        setCompleted(true)
      }
    }
  }
  const goBack = () => {
    if (!completed) {
      if (step > 0) setStep(step - 1)
    } else if (showProfileDetails) {
      setShowProfileDetails(false)
    } else if (showProfileKeyword) {
      setShowProfileKeyword(false)
    }
  }

  // Enregistrer une réponse
  const setOption = val => {
    const copy = [...answers]
    copy[step] = val
    setAnswers(copy)
  }

  // Calcul de la progression sticky
  const progress = completed
    ? contactDone
      ? 100
      : showProfileDetails
      ? 95
      : showProfileKeyword
      ? 90
      : 85
    : Math.round((step / questions.length) * 80)

  return (
    <>
      <AlforisHead title={`${title} – Alforis`} description={description} path={`/${slug}`} />

      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        {/* Progression (sticky) */}
        {!contactDone && (
          <div className="sticky top-16 z-50 bg-ivoire/80 backdrop-blur py-4">
            <div className="px-2">
              <Progress value={progress} className="h-2 rounded-full" />
            </div>
            {!completed && (
              <div className="mt-2 flex justify-center space-x-3">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition
                      ${i === step ? 'bg-doré text-white' : answers[i] != null ? 'bg-ardoise text-white' : 'bg-light text-ardoise'}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Flow des contenus */}
        <AnimatePresence exitBeforeEnter initial={false}>

          {/* 1) Questionnaire */}
          {!completed ? (
            <Animated.Div
              key={`q-${step}`}
              variant="slideFromRight"
              className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
            >
              <h2 className="text-2xl font-title text-ardoise">
                {questions[step].text}
              </h2>

              {/* Options ou zone libre */}
              {questions[step].options ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[step].options.map(opt => (
                    <Animated.Button
                      key={opt}
                      variant="fadeInUp"
                      onClick={() => setOption(opt)}
                      className={`p-4 rounded-xl border transition
                        ${answers[step] === opt
                          ? 'border-doré bg-doré/10 text-doré font-semibold'
                          : 'border-light bg-light text-ardoise'}`}
                    >
                      {opt}
                    </Animated.Button>
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

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-light">
                <Button variant="outline" onClick={goBack} disabled={step === 0}>
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
            </Animated.Div>

          ) : !showProfileKeyword ? (
            {/* 2) Mot-clé Intro */}
            <Animated.Div
              key="keyword"
              variant="fadeInUp"
              className="bg-white p-8 rounded-2xl shadow-lg space-y-4 text-center"
            >
              <h2 className="text-3xl font-title text-doré">Votre mot-clé</h2>
              <p className="mt-2 text-2xl font-semibold text-ardoise">{profile}</p>
              <Button onClick={() => setShowProfileKeyword(true)}>
                En savoir plus →
              </Button>
            </Animated.Div>

          ) : !showProfileDetails ? (
            {/* 3) Détails Profil */}
            <Animated.Div
              key="details"
              variant="slideFromLeft"
              className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
            >
              <ProfileDetails profil={profile} />
              <div className="text-center">
                <Button onClick={() => setShowProfileDetails(true)}>
                  Je veux être accompagné →
                </Button>
              </div>
            </Animated.Div>

          ) : !contactDone ? (
            {/* 4) Contact Final */}
            <Animated.Div
              key="contact"
              variant="fadeInUp"
              className="p-8"
            >
              <ContactFinal
                answers={answers}
                textAnswer={textAnswer}
                profile={profile}
                meta={meta}
                parcoursSlug={slug}
                onSubmit={() => setContactDone(true)}
              />
            </Animated.Div>

          ) : (
            {/* 5) Clap de Fin */}
            <Animated.Div
              key="fin"
              variant="fadeInUp"
              className="p-8"
            >
              <ClapDeFin profil={profile} meta={meta} />
            </Animated.Div>

          )}

        </AnimatePresence>
      </div>
    </>
  )
}
