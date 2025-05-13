// content/parcours/ContactFinal.jsx
'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import useButtonHover from '@/hooks/useButtonHover'
import ClapDeFin from '@/components/parcours/ClapDeFin'
import { GoldText } from '@/hooks/useGoldEffect'
import { sanitizeFormData, filterFormData } from '@/components/parcours/ValidationDonnees'


export default function ContactFinal({ answers, textAnswer, onSubmit, profile, meta }) {
  const { getButtonProps } = useButtonHover()
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
    ObjectifVie: false,
    RevenusAnnuels: '',
    RisquePercu: '',
    Q1: answers[0] || '',
    Q2: answers[1] || '',
    Q3: answers[2] || '',
    Q4: answers[3] || '',
    Q5: answers[4] || '',
    Q6: answers[5] || '',
    Q7: answers[6] || '',
    Q8: answers[7] || '',
    Q9: answers[8] || '',
    NumeroTelephone: '',
    NomDuFormulaire: meta?.title || '',
    Profil: profile || ''
  })

  const validateField = (key, value) => {
    if (['Nom','Email','Age'].includes(key) && !value) return 'Ce champ est requis.'
    if (key === 'Email' && !/.+@.+\..+/.test(value)) return 'Email invalide.'
    if (key === 'Age' && (isNaN(value) || Number(value) < 10)) return 'Âge invalide.'
    if (key === 'NumeroTelephone' && !/^\+?[0-9\s-]{7,20}$/.test(value)) return 'Téléphone invalide.'
    return ''
  }

// Après
const handleChange = e => {
  const { name, type, value, checked } = e.target
  const val = type === 'checkbox' ? checked : value
  setFormData(prev => ({ ...prev, [name]: val }))
}

// Nouveau handler pour la blur
const handleBlur = e => {
  const { name, value, checked, type } = e.target
  const val = type === 'checkbox' ? checked : value
  setErrorFields(prev => ({ ...prev, [name]: validateField(name, val) }))
}

  const handleFirstStepSubmit = async e => {
    e.preventDefault()
    const required = ['Nom','Email','Age','RGPD']
    const errors = {}
    let hasError = false
    required.forEach(key => {
      const err = validateField(key, formData[key])
      if (err) { errors[key] = err; hasError = true }
    })
    setErrorFields(errors)
    if (hasError) return
    const response = await fetch('/api/airtable-partial', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify(formData)
    })
    const res = await response.json()
    if (res.id) { setRecordId(res.id); setStep(2) }
  }

  const handleFinalSubmit = async e => {
    e.preventDefault()
    const required = ['SituationActuelle','NumeroTelephone']
    const errors = {}
    let hasError = false
    required.forEach(key => {
      if (!formData[key]) { errors[key] = 'Champ requis'; hasError = true }
    })
    setErrorFields(errors)
    if (hasError || !recordId) return
    const sanitized = sanitizeFormData(formData)
    const fieldsToSend = filterFormData(sanitized)
    const response = await fetch('/api/airtable-update', {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id: recordId, fields: fieldsToSend })
    })
    if (response.ok) setSuccess(true)
  }

  useEffect(() => {
    if (success && onSubmit) onSubmit()
  }, [success, onSubmit])

  return (
    <>
      <div className="mb-6 max-w-2xl mx-auto px-6">
        <span className="text-sm text-muted">{step === 1 ? 'Informations essentielles' : 'Finalisation du profil'}</span>
      </div>
      <form onSubmit={step===1?handleFirstStepSubmit:handleFinalSubmit} className="space-y-6 max-w-2xl mx-auto text-left">
        {step===1 && (
          <>
            {['Nom','Email','Age'].map(field => (
              <div key={field}>
                <label className="block text-anthracite font-semibold mb-1">{field}</label>
                <input 
                name={field} 
                type={field==='Email'?'email':field==='Age'?'number':'text'}   
                value={formData[field]} 
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-xl border p-3 ${errorFields[field]?'border-red-500':'border-light'}`} />
                
                {errorFields[field] && <p className="text-red-600 text-sm mt-1">❌ {errorFields[field]}</p>}
              </div>
            ))}
            <label className="flex items-center gap-2"><input type="checkbox" name="RGPD" checked={formData.RGPD} onChange={handleChange} />
              J’accepte l’utilisation de mes données pour un échange personnalisé.
            </label>
            <label className="flex items-center gap-2"><input type="checkbox" name="MarketingOk" checked={formData.MarketingOk} onChange={handleChange} />
              J’accepte que mes données soient utilisées à des fins commerciales.
            </label>
          </>
        )}

        {step===2 && (
          <>
            <h3 className="text-anthracite font-semibold">Vous êtes : <GoldText>{profile}</GoldText></h3>
            <div>
              <label className="block text-anthracite font-semibold mb-1">Situation actuelle</label>
              <select name="SituationActuelle" value={formData.SituationActuelle} onChange={handleChange}
                className={`w-full rounded-xl border p-3 ${errorFields.SituationActuelle?'border-red-500':'border-light'}`}>
                <option value="">Choisissez...</option>
                <option value="Célibataire">Célibataire</option>
                <option value="En couple">En couple</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf(ve)">Veuf(ve)</option>
              </select>
              {errorFields.SituationActuelle && <p className="text-red-600 text-sm mt-1">❌ {errorFields.SituationActuelle}</p>}
            </div>
            {['RevenusAnnuels','PatrimoineActuel','RisquePercu','NumeroTelephone'].map(field => (
              <div key={field}>
                <label className="block text-anthracite font-semibold mb-1">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input name={field} value={formData[field]} onChange={handleChange}
                  className={`w-full rounded-xl border p-3 ${errorFields[field]?'border-red-500':'border-light'}`} />
                {errorFields[field] && <p className="text-red-600 text-sm mt-1">❌ {errorFields[field]}</p>}
              </div>
            ))}
          </>
        )}

        <div className="text-center pt-4">
          <Button
            type="submit"
            {...getButtonProps(0, step === 1 ? 'btn-alforis-outline' : 'btn-alforis-retro')}
          >
            {step === 1 ? 'Générer mon profil' : 'En savoir PLUS'}
          </Button>
        </div>
      </form>
    </>
  )
}