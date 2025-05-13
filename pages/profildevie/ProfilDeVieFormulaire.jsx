
'use client'

import { motion, useState, useRef, useEffect } from "react"
import { Animated } from '@/components/animated/Animated'
import useButtonHover from "@/hooks/useButtonHover"
import { Progress } from "@/components/ui/progress"
import ContactFinal from "@/components/parcours/ContactFinal"
import { questions, profilesData, keywords } from "@/components/parcours/index"
import { scoringMatrix } from '@/components/parcours/scoringMatrix'
import Button from '@/components/ui/Button' // chemin selon ton arborescence exacte


export default function ProfilDeVieFormulaire() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [textAnswer, setTextAnswer] = useState("")
  const [completed, setCompleted] = useState(false)
  const [profile, setProfile] = useState(null)
  const [contactValidated, setContactValidated] = useState(false)
  const sectionsRef = useRef([])
  const { getButtonProps } = useButtonHover()

  useEffect(() => {
    if (step < questions.length) {
      sectionsRef.current[step]?.scrollIntoView({ behavior: "smooth" })
    }
  }, [step])

  const handleSelect = (value) => {
    const newAnswers = [...answers]
    newAnswers[step] = value
    setAnswers(newAnswers)
    setStep(step + 1)
  }

  const calculateProfiles = (answers, textAnswer) => {
    const profiles = Object.keys(scoringMatrix[0])
    const scores = profiles.reduce((acc, p) => ({ ...acc, [p]: 0 }), {})
  
    answers.forEach((rep, i) => {
      const question = questions[i]
      const idx = question?.options?.indexOf(rep)
      if (idx !== -1 && scoringMatrix[i]) {
        for (const profil of profiles) {
          scores[profil] += scoringMatrix[i][profil][idx] || 0
        }
      }
    })
  
    if (textAnswer) {
      Object.entries(keywords).forEach(([profil, mots]) => {
        mots.forEach((mot) => {
          if (textAnswer.toLowerCase().includes(mot.toLowerCase())) {
            scores[profil] += 2
          }
        })
      })
    }
  
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    const [best, second] = sorted
    const profilSecondaire = best[1] - second[1] <= 2 ? second[0] : null
  
    return { profilPrincipal: best[0], profilSecondaire }
  }
  
  const handleFinal = () => {
    const { profilPrincipal } = calculateProfiles(answers, textAnswer)
    setProfile(profilPrincipal)
    setCompleted(true)
  }
  
  const getProgressValue = () => {
    const totalSteps = questions.length
    const baseProgress = (step / totalSteps) * 80
  
    if (completed && !contactValidated) return 90
    if (completed && contactValidated) return 100
  
    return baseProgress
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }
  

  return (
    <div className="profil-wrapper py-12 px-6 space-y-12">

      <div className="sticky top-20 z-30 bg-ivoire/80 border-b border-light py-4 mb-8">
        <div className="max-w-2xl mx-auto px-6">
        <Progress value={getProgressValue()} className="progress-bar-inner" />
        </div>
      </div>
{step > 0 && !completed && (
  <div className="max-w-2xl mx-auto px-6 -mt-4 mb-4 text-left">
    <Button onClick={handleBack} 
    className="btn-alforis-rdv" 
    index={-1}>
      ← Revenir à la question précédente
    </Button>
  </div>
)}

      <div className="space-y-16">
        {questions.map((q, i) => (
          <section key={i} ref={(el) => (sectionsRef.current[i] = el)} className="profil-section scroll-mt-[300px]">
            {!completed && step === i && (
              <Animated.Div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="profil-card space-y-6">
                <h2 className="question-title text-xl font-title font-semibold text-anthracite mb-4">{q.text}</h2>

                {q.options ? (
                  <Animated.Div className="options-list grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.options.map((option, idx) => (
                      <button key={idx} {...getButtonProps(idx)} onClick={() => handleSelect(option)} className="btn-alforis-outline">
                        {option}
                      </button>
                    ))}
                  </Animated.Div>
                ) : (
                  <div className="space-y-6">
                    <textarea
                      rows="4"
                      value={textAnswer}
                      onChange={(e) => setTextAnswer(e.target.value)}
                      placeholder='Ex. : “Tu peux y aller, c’est aligné.”'
                      className="text-answer w-full p-4 border border-light rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="cta-end text-center">
                      <button {...getButtonProps(999)} onClick={handleFinal} className="btn-alforis-retro">
                        Découvrir mon profil
                      </button>
                    </div>
                  </div>
                )}
              </Animated.Div>
            )}
          </section>
        ))}
      </div>

      {completed && profile && !contactValidated && (
        <ContactFinal
          answers={answers}
          textAnswer={textAnswer}
          profile={profile}
          onSubmit={() => setContactValidated(true)}
        />
      )}

      {completed && profile && contactValidated && (
        <section className="profil-result mt-16">
          <Animated.Div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="profil-result-box border-2 p-8 rounded-2xl shadow-lg text-center space-y-6"
            style={{ borderColor: profilesData[profile].color }}
          >
            <div className="profil-icon text-4xl">{profilesData[profile].icon}</div>
            <h2 className="profil-title text-2xl font-bold">{profilesData[profile].title}</h2>
            <p className="profil-description text-lg text-steel">{profilesData[profile].description}</p>
          </Animated.Div>
        </section>
      )}
    </div>
  )
}
