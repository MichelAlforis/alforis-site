'use client'

import React, { useState } from 'react'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'
import ContactFinal       from '@/components/parcours/ContactFinal'
import ClapDeFin          from '@/components/parcours/ClapDeFin'

export default function ClientParcoursWrapper({ meta, slug }) {
  const [step, setStep] = useState('form')
  const [sessionData, setSessionData] = useState(null)

   const handleFormComplete = ({ answers, textAnswer, profilPrincipal, profilSecondaire }) => {
    setSessionData({ answers, textAnswer, profilPrincipal, profilSecondaire })
    setStep('contact')
  }

  const handleContactSubmit = () => {
    setStep('clap')
  }

  return (
    <>

      {step === 'form' && (
        <ParcoursFormulaire
          meta={meta}
          slug={slug}
          onComplete={handleFormComplete}
        />
      )}

      {step === 'contact' && sessionData && (
        <ContactFinal
          meta={meta}
          Slug={slug}
          answers={sessionData.answers}
          textAnswer={sessionData.textAnswer}
          profilPrincipal={sessionData.profilPrincipal}
          onSubmit={handleContactSubmit}
        />
      )}

      {step === 'clap' && sessionData && (
        <ClapDeFin
          profilPrincipal={sessionData.profilPrincipal}
          profilSecondaire={sessionData.profilSecondaire}
          meta={meta}
          slug={slug}
        />
      )}
    </>
  )
}