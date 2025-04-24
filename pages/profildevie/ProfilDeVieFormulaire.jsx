import { Animated } from '@/components/animated/Animated'
'use client'

import { useState, useRef, useEffect } from "react"
import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'
import useButtonHover from "@/hooks/useButtonHover"
import { Progress } from "@/components/ui/progress"
import SceauSuspendu from "@/components/animated/SceauSuspendu"
import ContactFinal from "@/pages/profildevie/ContactFinal"
import { questions, profilesData, keywords } from "@/components/profildevie/index"


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

  const handleFinal = () => {
    const score = Object.keys(profilesData).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
    answers.forEach((ans) => {
      Object.entries(keywords).forEach(([label, keys]) => {
        keys.forEach((k) => {
          if (ans?.toLowerCase().includes(k)) score[label] += 1
        })
      })
    })
    Object.entries(keywords).forEach(([label, keys]) => {
      keys.forEach((k) => {
        if (textAnswer.toLowerCase().includes(k)) score[label] += 2
      })
    })
    const sorted = Object.entries(score).sort((a, b) => b[1] - a[1])
    if (sorted.length > 0) {
      const best = sorted[0][0]
      setProfile(best)
      setCompleted(true)
    } else {
      setProfile(null)
      setCompleted(true)
    }
  }

  return (
    <div className="profil-wrapper py-12 px-6 space-y-12">
      <SceauSuspendu targetId="sceau-formulaire" />

      <div className="progress-bar mb-10">
        <Progress value={((step + 1) / questions.length) * 100} className="progress-bar-inner" />
      </div>

      <div className="space-y-16">
        {questions.map((q, i) => (
          <section key={i} ref={(el) => (sectionsRef.current[i] = el)} className="profil-section scroll-mt-[300px]">
            {!completed && step === i && (
              <Animated.Div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="profil-card space-y-6">
                <h2 className="question-title text-xl font-title font-semibold text-anthracite mb-4">{q.text}</h2>

                {q.options ? (
                  <div className="options-list grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.options.map((option, idx) => (
                      <button key={idx} {...getButtonProps(idx)} onClick={() => handleSelect(option)} className="btn-alforis-outline">
                        {option}
                      </button>
                    ))}
                  </div>
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
