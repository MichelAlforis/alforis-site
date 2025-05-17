'use client'
// app/parcours/[slug]/ClientParcoursWrapper.jsx

import React, { useState } from 'react'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'
import ContactFinal from '@/components/parcours/ContactFinal'
import ClapDeFin from '@/components/parcours/ClapDeFin'

export default function ClientParcoursWrapper({ meta, slug }) {
  const [step, setStep] = useState('form')
  const [sessionData, setSessionData] = useState(null)

  // Quand le formulaire est complété
  const handleFormComplete = (data) => {
    setSessionData(data)
    setStep('contact')
  }

  // Quand le contact est soumis
  const handleContactSubmit = () => {
    setStep('clap')
  }

  return (
    <>
      {step === 'form' && (
        <ParcoursFormulaire meta={meta} slug={slug} onComplete={handleFormComplete} />
      )}

      {step === 'contact' && sessionData && (
        <ContactFinal
          meta={meta}
          slug={slug}
          {...sessionData}
          onSubmit={handleContactSubmit}
        />
      )}

      {step === 'clap' && sessionData && (
        <ClapDeFin profil={sessionData.profil} />
      )}
    </>
  )
}