'use client'

import { useEffect, useState } from 'react'
import useButtonHover from '@/hooks/useButtonHover'
import { Animated } from '@/components/animated/Animated'
import ClapDeFin from '@/components/parcours/ClapDeFin'
import { GoldText } from "@/hooks/useGoldEffect"
import { sanitizeFormData,filterFormData } from '@/pages/api/FormData'


export default function ContactFinalV2({ answers, textAnswer, onSubmit, profile, meta, onComplete }) {

  const { getButtonProps } = useButtonHover()

  const [step, setStep] = useState(1)
  const [recordId, setRecordId] = useState(null)
  const [errorFields, setErrorFields] = useState({})
  const [success, setSuccess] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  
  const [formData, setFormData] = useState(() => ({
    nom: '',
    email: '',
    age: '',
    phraseLibre: textAnswer || '',
    patrimoineActuel: '',
    situationActuelle: '',
    objectifVie: false,
    revenusAnnuels: '',
    risquePercu: '',
    NomDuFormulaire: meta?.title || "Parcours inconnu",
    q1: answers?.[0] || '',
    q2: answers?.[1] || '',
    q3: answers?.[2] || '',
    q4: answers?.[3] || '',
    q5: answers?.[4] || '',
    q6: answers?.[5] || '',
    q7: answers?.[6] || '',
    q8: answers?.[7] || '',
    q9: answers?.[8] || '',
    NumeroTelephone: '',
    rgpd: false,
    marketingOk: false,
    desinscription: false,
    profil: profile || '',
  }))

  const validateField = (key, value) => {
    if (['nom', 'email', 'age'].includes(key) && !value) return 'Ce champ est requis.'
    if (key === 'email' && !/.+@.+\..+/.test(value)) return 'Email invalide.'
    if (key === 'age' && (isNaN(value) || value < 10)) return 'Âge invalide.'
    return ''
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setFormData(prev => ({ ...prev, [name]: val }))
    setErrorFields(prev => ({ ...prev, [name]: validateField(name, val) }))
  }

  const handleFirstStepSubmit = async (e) => {
    e.preventDefault()
    const required = ['nom', 'email', 'age']
    let hasError = false
    const errors = {}

    for (const key of required) {
      const err = validateField(key, formData[key])
      if (err) {
        errors[key] = err
        hasError = true
      }
    }
    setErrorFields(errors)
    if (hasError) return

    try {
      const response = await fetch('/api/airtable-partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const res = await response.json()
      if (res.id) {
        setRecordId(res.id)
        setStep(2)
      }
    } catch (err) {
      console.error('Erreur Airtable (1ère étape) :', err)
    }
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    const required = ['situationActuelle', 'NumeroTelephone']
    const errors = {}
    const sanitizedFields = sanitizeFormData(formData)
    const fieldsToSend = filterFormData(sanitizedFields)
    let hasError = false
    setHasSubmitted(true)

    required.forEach(key => {
      if (!formData[key]) {
        errors[key] = 'Champ requis'
        hasError = true
      }
    })
    setErrorFields(errors)
    if (hasError || !recordId) return
  
    try {
      if (!recordId) {
        console.error("❌ recordId manquant !");
        return;
      }
    
      const response = await fetch('/api/airtable-update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: recordId,
          fields: fieldsToSend
        })
        
        
      });
    
      let data;
      const contentType = response.headers.get("content-type");
    
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        console.warn("⚠️ Réponse non JSON, code HTTP :", response.status);
        data = {};
      }
    
      if (!response.ok) {
        throw new Error(data?.error || `Erreur mise à jour Airtable (${response.status})`);
      }
    
      setSuccess(true);
    
    } catch (err) {
      console.error('❌ Erreur Airtable mise à jour :', err.message || err)
    }
  }

  const renderInput = (label, name, type = 'text') => (
    <div>
      <label className="block text-anthracite font-semibold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name] || ''}
        onChange={handleInputChange}
        className={`w-full rounded-xl border p-3 ${errorFields[name] ? 'border-red-500' : 'border-light'}`}
      />
      {errorFields[name] && <p className="text-red-600 text-sm mt-1">❌ {errorFields[name]}</p>}
    </div>
  )
  

  function handleChange(e) {
    const { name, type, value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  useEffect(() => {
    if (success && onSubmit) {
      onSubmit() // déclenche contactValidated = true dans le parent
    }
  }, [success, onSubmit])
  
  

  return (
    <>
       <div className="mb-6 max-w-2xl mx-auto px-6">
          <span className="text-sm text-muted">
            {step === 1 ? "Informations essentielles" : "Finalisation du profil"}
          </span>
        </div>

      <form onSubmit={step === 1 ? handleFirstStepSubmit : handleFinalSubmit} className="space-y-6 max-w-2xl mx-auto text-left">
        {step === 1 && (
          <>
            {renderInput('Nom', 'nom')}
            {renderInput('Email', 'email', 'email')}
            {renderInput('Âge', 'age', 'number')}
            <label><input type="checkbox" name="rgpd" checked={formData.rgpd} onChange={handleChange} required />
              J’accepte l’utilisation de mes données pour un échange personnalisé.</label>
            <label><input type="checkbox" name="marketingOk" checked={formData.marketingOk} onChange={handleChange} />
              J’accepte que mes données soient utilisées à des fins commerciales.</label>
          </>
        )}

        {step === 2 && (
          <>
    <h3> Vous êtes : </h3>
    <Animated.H3 className="text-doré"><GoldText>{profile}</GoldText></Animated.H3>
    <h3>en savoir plus?</h3>
  
            {(formData.revenusAnnuels === '' || formData.patrimoineActuel === '') && (
              <p className="text-center text-sm text-muted mt-2 italic">
                Pour une analyse plus fine de votre profil, pensez à indiquer vos revenus et votre patrimoine estimé.
              </p>
            )}

          <div>
            <label className="block text-anthracite font-semibold mb-1">Situation actuelle</label>
            <select
              name="situationActuelle"
              value={formData.situationActuelle}
              onChange={handleInputChange}
              className={`w-full rounded-xl border p-3 ${errorFields.situationActuelle ? 'border-red-500' : 'border-light'}`}
            >
              <option value="">Choisissez...</option>
              <option value="Célibataire">Célibataire</option>
              <option value="En couple">En couple</option>
              <option value="Marié(e)">Marié(e)</option>
              <option value="Divorcé(e)">Divorcé(e)</option>
              <option value="Veuf(ve)">Veuf(ve)</option>
            </select>
            {errorFields.situationActuelle && <p className="text-red-600 text-sm mt-1">❌ {errorFields.situationActuelle}</p>}
          </div>


            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="objectifVie"
                checked={formData.objectifVie}
                onChange={handleInputChange}
              /> Pensez-vous que votre patrimoine répond à vos objectifs de vie ?
            </label>

            {renderInput('Revenus annuels (€)', 'revenusAnnuels', 'number')}
            {renderInput('Patrimoine estimé (€)', 'patrimoineActuel', 'number')}
            {renderInput('Votre perception du risque de 1 à 5', 'risquePercu')}
            {renderInput('Téléphone', 'NumeroTelephone')}
           </>
        )}

        <div className="text-center pt-4">
          <button
            type="submit"
            {...getButtonProps(0, 'btn-alforis-outline')}
          >
            {step === 1 ? 'Générer mon profil' : 'En savoir PLUS'}
          </button>
        </div>
      </form>
    </>
  )
}
