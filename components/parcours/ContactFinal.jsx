'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PremiumButton from '../ui/PremiumButton'
import { GoldText }                 from '@/hooks/useGoldEffect'
import { validerDonnees, sanitizeFormData, filterFormData } from './ValidationDonnees';
import { toast } from 'react-toastify'

export default function ContactFinal({
  answers,
  textAnswer,
  onSubmit,
  profilPrincipal,
  meta = {},
  slug = '',
}) {
  const [step, setStep] = useState(1)
  const [recordId, setRecordId] = useState(null)
  const [errorFields, setErrorFields] = useState({})

  const mappedAnswers = Array.isArray(answers)
    ? answers.reduce((acc, val, i) => ({ ...acc, [`Q${i + 1}`]: val }), {})
    : answers;

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
    Profil: profilPrincipal || '',
    NomDuFormulaire: meta?.title || '',
    ...mappedAnswers // 👈 c'est la seule modif à faire
  });


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
      return 'Âge minimal : 18.'
    }
    if (key === 'NumeroTelephone' && !/^\+?[0-9\s-]{7,20}$/.test(value)) {
      return 'Téléphone invalide.'
    }
    if (key === 'RGPD' && !value) {
      return 'Vous devez accepter.'
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setFormData(prev => ({ ...prev, [name]: val }))
  }

  const handleBlur = (e) => {
    const { name, type, value, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setErrorFields(prev => ({ ...prev, [name]: validateField(name, val) }))
  }

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();

    // 1) Validation
    const errs = validerDonnees(formData, 'step1');
    setErrorFields(errs);
    if (Object.keys(errs).length) return;
    
    
    // 2) Envoi partiel
    try {
      const sanitized = sanitizeFormData(formData);
      const fields = filterFormData(sanitized);
      const res = await fetch('/api/airtable-partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();

      if (data.id) {
        toast.success("🎯 Parfait ! Votre profil complet vous attend. Plus qu’une dernière étape !");
        setRecordId(data.id);
        setStep(2);
      } else {
        throw new Error(data.error || 'Inconnu');
      }
    } catch (err) {
      console.error('❌ Erreur Step1:', err);
      toast.error("Impossible d'enregistrer vos infos. Réessayez.");
    }
  };


  const handleSubmitStep2 = async (e) => {
    e.preventDefault();

    // 1) Validation
    const errs = validerDonnees(formData, 'step2');
    setErrorFields(errs);
    if (Object.keys(errs).length || !recordId) return;

    try {
      // 2) sanitize + filter
      const sanitized = sanitizeFormData(formData);
      const fields = filterFormData(sanitized);

     // 3) ôte NomDuFormulaire (et MarketingOk) avant de renvoyer le reste
     const {
       NomDuFormulaire,
       MarketingOk,             // si tu n'en as pas besoin, on l'extrait ici aussi
       ...allowedFields         // tout le reste (Nom, Email, etc.)
     } = fields;

     const airtableFields = {
       ...allowedFields,                   // ne contient plus NomDuFormulaire
       NomDuFormulaire: NomDuFormulaire || meta.title || 'Parcours inconnu',
       Profil:            profilPrincipal,
       PhraseLibre:       sanitized.PhraseLibre,
     };

      // 4) envoi PATCH
      const res = await fetch('/api/airtable-update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: recordId, fields: airtableFields }),
      });

      if (res.ok) {
        toast.success("🎉 Bravo ! Votre questionnaire est terminé ! Votre profil complet arrive par e-mail.");
        onSubmit();
      } else {
        const err = await res.json();
        throw new Error(err.error || 'Mise à jour échouée');
      }
    } catch (err) {
      console.error('❌ Erreur Step2:', err);
      toast.error("Impossible de finaliser. Réessayez.");
    }
  };

  return (
    <div className="main-content max-w-3xl mx-auto px-4 space-y-8 md:mt-10">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmitStep1}
            className="bg-ivoire rounded-2xl shadow-lg p-8 space-y-6"
          >
            {/* Étape 1: infos de base */}
            <h2 className="text-2xl font-title text-ardoise">
              Étape 1 :<GoldText> Vos infos</GoldText>
            </h2>
            {['Nom', 'Email', 'Age'].map((key) => (
              <div key={key}>
                <label className="block text-anthracite font-medium mb-1">{key}</label>
                <input
                  name={key}
                  type={key === 'Age' ? 'number' : key === 'Email' ? 'email' : 'text'}
                  value={formData[key]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 border rounded-xl focus:ring-2 ${
                    errorFields[key] ? 'border-red-500 ring-red-200' : 'border-light focus:ring-doré'
                  }`}
                />
                {errorFields[key] && <p className="text-red-600 text-sm">{errorFields[key]}</p>}
              </div>
            ))}
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="RGPD" checked={formData.RGPD} onChange={handleChange} />
              <span className="text-sm text-ardoise">J'accepte la politique RGPD</span>
            </label>
            <PremiumButton type="submit"   className="w-40 /* largeur fixe */
    px-3 py-2                    /* padding compact */
    text-md font-semibold        /* taille et graisse */
    rounded-lg                   /* bords arrondis */
    bg-transparent text-doré     /* fond et couleur du texte */
    hover:bg-doré/10             /* hover léger */"
            >Voir le résultat →</PremiumButton>
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
            className="bg-ivoire rounded-2xl shadow-lg p-8 space-y-6"
          >
            {/* Étape 2: précisions */}
            <h2 className="text-2xl font-title text-ardoise text-center">
              Votre mot-clé :<br />
              <span className="text-3xl font-semibold block mt-2 text-doré">
                <GoldText>{profilPrincipal}</GoldText>
              </span>
            </h2>
            <p className="text-center text-anthracite text-base mt-2">
              Ce mot-clé reflète votre posture actuelle. Affinons votre trajectoire.
            </p>
            <div>
              <label className="block text-anthracite font-medium mb-1">Situation actuelle</label>
              <select
                name="SituationActuelle"
                value={formData.SituationActuelle}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 border rounded-xl focus:ring-2 ${
                  errorFields.SituationActuelle
                    ? 'border-red-500 ring-red-200'
                    : 'border-light focus:ring-doré'
                }`}
              >
                <option value="">Choisissez...</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Union libre">Union libre</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf/Veuve">Veuf/Veuve</option>
              {errorFields.SituationActuelle && (
                <p className="text-red-600 text-sm">{errorFields.SituationActuelle}</p>
              )}
              </select>
            </div>
            {['PatrimoineActuel', 'RevenusAnnuels', 'RisquePercu', 'NumeroTelephone'].map((key) => (
              <div key={key}>
                <label className="block text-anthracite font-medium mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 border rounded-xl focus:ring-2 ${
                    errorFields[key] ? 'border-red-500 ring-red-200' : 'border-light focus:ring-doré'
                  }`}
                />
                {errorFields[key] && <p className="text-red-600 text-sm">{errorFields[key]}</p>}
              </div>
            ))}

          <PremiumButton type="submit"   className="w-40 /* largeur fixe */
          px-3 py-2                    /* padding compact */
          text-md font-semibold        /* taille et graisse */
          rounded-lg                   /* bords arrondis */
          bg-transparent text-doré     /* fond et couleur du texte */
          hover:bg-doré/10             /* hover léger */"
                  >Découvrir votre profil →</PremiumButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
