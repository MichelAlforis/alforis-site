'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { Progress } from '@/components/ui/progress'
import { GoldText } from '@/hooks/useGoldEffect'
import ClapDeFin from '@/components/parcours/ClapDeFin'
import { sanitizeFormData, filterFormData } from '@/components/parcours/ValidationDonnees'
import AlforisHead from '@/components/AlforisHead'

export default function ContactFinal({ answers, textAnswer, onSubmit, profile, meta = {}, parcoursSlug = '' }) {
  const [step, setStep] = useState(1)
  const [recordId, setRecordId] = useState(null)
  const [errorFields, setErrorFields] = useState({})
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    Nom: '',
    Email: '',
    Age: '',
    RGPD: false,
    MarketingOk: false,
    PhraseLibre: textAnswer || '',
    PatrimoineActuel: '',
    SituationActuelle: '',
    RevenusAnnuels: '',
    RisquePercu: '',
    NumeroTelephone: '',
    Profil: profile || '',
    FormName: meta?.title || ''
  })

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const validateField = (key, value) => {
    if (['Nom', 'Email', 'Age', 'SituationActuelle', 'NumeroTelephone'].includes(key) && !value) {
      return 'Requis.'
    }
    if (key === 'Email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      return 'Format email invalide.'
    }
    if (key === 'Age' && (isNaN(value) || Number(value) < 18)) {
      return 'Âge minimal: 18.'
    }
    if (key === 'NumeroTelephone' && !/^\+?[0-9\s-]{7,20}$/.test(value)) {
      return 'Téléphone invalide.'
    }
    if (key === 'RGPD' && !value) {
      return 'Vous devez accepter.'
    }
    return ''
  }

  const handleChange = e => {
    const { name, type, value, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setFormData(prev => ({ ...prev, [name]: val }))
  }

  const handleBlur = e => {
    const { name, type, value, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setErrorFields(prev => ({ ...prev, [name]: validateField(name, val) }))
  }

  const handleSubmitStep1 = async e => {
    e.preventDefault()
    const required = ['Nom', 'Email', 'Age', 'RGPD']
    const errs = {}
    required.forEach(key => {
      const err = validateField(key, formData[key])
      if (err) errs[key] = err
    })
    setErrorFields(errs)
    if (Object.keys(errs).length) return

    const res = await fetch('/api/airtable-partial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (data.id) {
      setRecordId(data.id)
      setStep(2)
    }
  }

  const handleSubmitStep2 = async e => {
    e.preventDefault()
    const required = ['SituationActuelle', 'NumeroTelephone']
    const errs = {}
    required.forEach(key => {
      const err = validateField(key, formData[key])
      if (err) errs[key] = err
    })
    setErrorFields(errs)
    if (Object.keys(errs).length || !recordId) return

    const sanitized = sanitizeFormData(formData)
    const fields = filterFormData(sanitized)
    const res = await fetch('/api/airtable-update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: recordId, fields })
    })
    if (res.ok) setSuccess(true)
  }

  useEffect(() => {
    if (success && onSubmit) onSubmit()
  }, [success, onSubmit])

  if (success) {
    return <ClapDeFin profil={profile} meta={meta} />
  }

  return (
    <>
      <AlforisHead
        title={`Contact final – ${meta.title}`}
        description="Vos coordonnées pour un suivi personnalisé"
        path={`/${parcoursSlug}/contact`}
      />

      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <Progress value={step === 1 ? 50 : 100} className="w-3/4 h-2 rounded-full" />
          <span className="text-sm text-ardoise">Étape {step}/2</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmitStep1}
              className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
            >
              <h2 className="text-2xl font-title text-ardoise">
                <GoldText>Étape 1:</GoldText> Vos infos
              </h2>

              {['Nom', 'Email', 'Age'].map(key => (
                <div key={key}>
                  <label className="block text-anthracite font-medium mb-1">
                    {key}
                  </label>
                  <input
                    name={key}
                    type={key === 'Age' ? 'number' : key === 'Email' ? 'email' : 'text'}
                    value={formData[key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-3 border rounded-xl focus:ring-2 ${errorFields[key] ? 'border-red-500 ring-red-200' : 'border-light focus:ring-doré'}`}
                  />
                  {errorFields[key] && <p className="text-red-600 text-sm">{errorFields[key]}</p>}
                </div>
              ))}

              <label className="flex items-center space-x-2">
                <input type="checkbox" name="RGPD" checked={formData.RGPD} onChange={handleChange} />
                <span className="text-sm text-ardoise">J'accepte la politique RGPD</span>
              </label>

              <Button type="submit" className='btn-alforis-outline'>Suivant →</Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmitStep2}
              className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
            >
              <h2 className="text-2xl font-title text-ardoise">
                <GoldText>Étape 2:</GoldText> Complétez
              </h2>

              <div>
                <label className="block text-anthracite font-medium mb-1">Situation actuelle</label>
                <select
                  name="SituationActuelle"
                  value={formData.SituationActuelle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 border rounded-xl focus:ring-2 ${errorFields.SituationActuelle ? 'border-red-500 ring-red-200' : 'border-light focus:ring-doré'}`}
                >
                  <option value="">Choisissez...</option>
                  <option>Célibataire</option>
                  <option>En couple</option>
                  <option>Marié(e)</option>
                </select>
                {errorFields.SituationActuelle && <p className="text-red-600 text-sm">{errorFields.SituationActuelle}</p>}
              </div>

              {['PatrimoineActuel', 'RevenusAnnuels', 'RisquePercu', 'NumeroTelephone'].map(key => (
                <div key={key}>
                  <label className="block text-anthracite font-medium mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-3 border rounded-xl focus:ring-2 ${errorFields[key] ? 'border-red-500 ring-red-200' : 'border-light focus:ring-doré'}`}
                  />
                  {errorFields[key] && <p className="text-red-600 text-sm">{errorFields[key]}</p>}
                </div>
              ))}

              <Button type="submit">Terminer</Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
