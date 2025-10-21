'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GoldText } from '@/hooks/useGoldEffect'
import { validerDonnees, sanitizeFormData, filterFormData } from './ValidationDonnees'
import { toast } from 'react-toastify'
import { Mail, User, Phone, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'

export default function ContactFinal({
  answers,
  textAnswer,
  onSubmit,
  profilPrincipal,
  meta = {},
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorFields, setErrorFields] = useState({})

  const mappedAnswers = Array.isArray(answers)
    ? answers.reduce((acc, val, i) => ({ ...acc, [`Q${i + 1}`]: val }), {})
    : answers

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
    ...mappedAnswers,
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation complète
    const errs = {
      ...validerDonnees(formData, 'step1'),
      ...validerDonnees(formData, 'step2'),
    }
    setErrorFields(errs)

    if (Object.keys(errs).length) {
      setIsLoading(false)
      toast.error("Merci de remplir tous les champs requis.", {
        position: "top-center",
      })
      return
    }

    try {
      // 1) Envoi POST initial
      const sanitized = sanitizeFormData(formData)
      const fields = filterFormData(sanitized)

      const resPost = await fetch('/api/airtable-partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const dataPost = await resPost.json()

      if (!dataPost.id) {
        throw new Error(dataPost.error || 'Erreur création')
      }

      // 2) Envoi PATCH avec toutes les infos
      const { NomDuFormulaire, MarketingOk, ...allowedFields } = fields
      const airtableFields = {
        ...allowedFields,
        NomDuFormulaire: NomDuFormulaire || meta.title || 'Parcours inconnu',
        Profil: profilPrincipal,
        PhraseLibre: sanitized.PhraseLibre,
      }

      const resPatch = await fetch('/api/airtable-update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: dataPost.id, fields: airtableFields }),
      })

      if (resPatch.ok) {
        toast.success("🎉 Parfait ! Votre profil est prêt !", {
          position: "top-center",
          autoClose: 2000,
        })
        setTimeout(() => onSubmit(), 1000)
      } else {
        const errPatch = await resPatch.json()
        throw new Error(errPatch.error || 'Mise à jour échouée')
      }
    } catch (err) {
      console.error('❌ Erreur soumission:', err)
      toast.error("Une erreur est survenue. Réessayez.", {
        position: "top-center",
      })
      setIsLoading(false)
    }
  }

  const currentPhase = 2
  const totalPhases = 3

  return (
    <section className="min-h-screen bg-gradient-to-b from-ivoire via-ivoire to-acier/5 dark:from-anthracite dark:via-anthracite/90 dark:to-acier/20 pt-[calc(var(--nav-height)+2rem)] pb-20">
      <div className="max-w-4xl mx-auto px-4 space-y-6">

        {/* Indicateur Phase 2 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-[var(--nav-height)] z-50 bg-ivoire/95 dark:bg-anthracite/95 backdrop-blur-xl rounded-2xl shadow-lg border border-ardoise/20 dark:border-acier/30 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ardoise dark:bg-acier text-ivoire flex items-center justify-center font-bold text-lg shadow-lg">
                {currentPhase}
              </div>
              <div>
                <p className="text-sm text-acier dark:text-ivoire/70 font-medium">
                  Phase {currentPhase}/{totalPhases}
                </p>
                <p className="text-lg font-semibold text-ardoise dark:text-ivoire">
                  Vos coordonnées
                </p>
              </div>
            </div>
            <Sparkles className="w-8 h-8 text-doré" />
          </div>
        </motion.div>

        {/* Formulaire unique */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-ivoire dark:bg-anthracite/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-ardoise/10 dark:border-acier/20 p-8 md:p-12 space-y-8"
        >
          {/* En-tête avec profil */}
          <div className="text-center space-y-4 pb-8 border-b-2 border-doré/20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Sparkles className="w-16 h-16 mx-auto text-doré" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-title text-anthracite dark:text-ivoire">
              Votre profil détecté :
            </h2>
            <p className="text-4xl md:text-5xl font-bold">
              <GoldText>{profilPrincipal}</GoldText>
            </p>
            <p className="text-acier dark:text-ivoire/70 text-lg">
              Complétez vos coordonnées pour recevoir votre analyse complète
            </p>
          </div>

          {/* Section Identité */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-ardoise dark:text-acier" />
              <h3 className="text-xl font-bold text-anthracite dark:text-ivoire">
                Identité
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-anthracite dark:text-ivoire/80 font-medium mb-2">
                  Nom complet *
                </label>
                <input
                  name="Nom"
                  type="text"
                  value={formData.Nom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-4 border-2 rounded-xl transition-all duration-300
                    ${errorFields.Nom
                      ? 'border-red-500 ring-4 ring-red-500/20'
                      : 'border-acier/30 dark:border-acier/50 focus:border-doré focus:ring-4 focus:ring-doré/20'
                    }
                    bg-ivoire dark:bg-anthracite/60 text-anthracite dark:text-ivoire`}
                  placeholder="Jean Dupont"
                />
                {errorFields.Nom && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">⚠️ {errorFields.Nom}</p>}
              </div>

              <div>
                <label className="block text-anthracite dark:text-ivoire/80 font-medium mb-2">
                  Âge *
                </label>
                <input
                  name="Age"
                  type="number"
                  value={formData.Age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-4 border-2 rounded-xl transition-all duration-300
                    ${errorFields.Age
                      ? 'border-red-500 ring-4 ring-red-500/20'
                      : 'border-acier/30 dark:border-acier/50 focus:border-doré focus:ring-4 focus:ring-doré/20'
                    }
                    bg-ivoire dark:bg-anthracite/60 text-anthracite dark:text-ivoire`}
                  placeholder="45"
                  min="18"
                />
                {errorFields.Age && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">⚠️ {errorFields.Age}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-anthracite dark:text-ivoire/80 font-medium mb-2">
                <Mail className="w-5 h-5 text-ardoise dark:text-acier" />
                Email *
              </label>
              <input
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-300
                  ${errorFields.Email
                    ? 'border-red-500 ring-4 ring-red-500/20'
                    : 'border-acier/30 dark:border-acier/50 focus:border-doré focus:ring-4 focus:ring-doré/20'
                  }
                  bg-ivoire dark:bg-anthracite/60 text-anthracite dark:text-ivoire`}
                placeholder="jean.dupont@email.com"
              />
              {errorFields.Email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">⚠️ {errorFields.Email}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-anthracite dark:text-ivoire/80 font-medium mb-2">
                <Phone className="w-5 h-5 text-ardoise dark:text-acier" />
                Téléphone *
              </label>
              <input
                name="NumeroTelephone"
                type="tel"
                value={formData.NumeroTelephone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-300
                  ${errorFields.NumeroTelephone
                    ? 'border-red-500 ring-4 ring-red-500/20'
                    : 'border-acier/30 dark:border-acier/50 focus:border-doré focus:ring-4 focus:ring-doré/20'
                  }
                  bg-ivoire dark:bg-anthracite/60 text-anthracite dark:text-ivoire`}
                placeholder="+33 6 12 34 56 78"
              />
              {errorFields.NumeroTelephone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">⚠️ {errorFields.NumeroTelephone}</p>}
            </div>
          </div>

          {/* Section Situation */}
          <div className="space-y-6 pt-6 border-t-2 border-acier/20 dark:border-acier/40">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-ardoise dark:text-acier" />
              <h3 className="text-xl font-bold text-anthracite dark:text-ivoire">
                Situation patrimoniale
              </h3>
            </div>

            <div>
              <label className="block text-anthracite dark:text-ivoire/80 font-medium mb-2">
                Situation actuelle *
              </label>
              <select
                name="SituationActuelle"
                value={formData.SituationActuelle}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-300
                  ${errorFields.SituationActuelle
                    ? 'border-red-500 ring-4 ring-red-500/20'
                    : 'border-acier/30 dark:border-acier/50 focus:border-doré focus:ring-4 focus:ring-doré/20'
                  }
                  bg-ivoire dark:bg-anthracite/60 text-anthracite dark:text-ivoire`}
              >
                <option value="">Sélectionnez...</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Union libre">Union libre</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf/Veuve">Veuf/Veuve</option>
              </select>
              {errorFields.SituationActuelle && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">⚠️ {errorFields.SituationActuelle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['PatrimoineActuel', 'RevenusAnnuels'].map((key) => (
                <div key={key}>
                  <label className="block text-anthracite dark:text-ivoire/80 font-medium mb-2">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={key === 'PatrimoineActuel' ? '500 000 €' : '80 000 €'}
                    className="w-full p-4 border-2 border-acier/30 dark:border-acier/50 rounded-xl
                      focus:border-doré focus:ring-4 focus:ring-doré/20 transition-all duration-300
                      bg-ivoire dark:bg-anthracite/60 text-anthracite dark:text-ivoire"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-anthracite dark:text-ivoire/80 font-medium mb-2">
                Perception du risque
              </label>
              <input
                name="RisquePercu"
                value={formData.RisquePercu}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Prudent, Équilibré, Dynamique..."
                className="w-full p-4 border-2 border-acier/30 dark:border-acier/50 rounded-xl
                  focus:border-doré focus:ring-4 focus:ring-doré/20 transition-all duration-300
                  bg-ivoire dark:bg-anthracite/60 text-anthracite dark:text-ivoire"
              />
            </div>
          </div>

          {/* RGPD */}
          <div className="space-y-3 pt-6 border-t-2 border-acier/20 dark:border-acier/40">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="RGPD"
                checked={formData.RGPD}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-doré border-acier/30 rounded focus:ring-2 focus:ring-doré/50"
              />
              <span className="text-sm text-acier dark:text-ivoire/70 group-hover:text-anthracite dark:group-hover:text-ivoire transition">
                J'accepte la politique de confidentialité et le traitement de mes données personnelles *
              </span>
            </label>
            {errorFields.RGPD && <p className="text-red-500 text-sm flex items-center gap-1">⚠️ {errorFields.RGPD}</p>}

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="MarketingOk"
                checked={formData.MarketingOk}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-doré border-acier/30 rounded focus:ring-2 focus:ring-doré/50"
              />
              <span className="text-sm text-acier dark:text-ivoire/70 group-hover:text-anthracite dark:group-hover:text-ivoire transition">
                Je souhaite recevoir des conseils personnalisés et l'actualité patrimoniale
              </span>
            </label>
          </div>

          {/* Bouton de soumission */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-xl
              bg-gradient-to-r from-ardoise to-doré text-ivoire
              shadow-2xl hover:shadow-doré/50 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-4 border-ivoire/30 border-t-ivoire rounded-full"
                />
                Envoi en cours...
              </>
            ) : (
              <>
                Découvrir mon profil complet
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </motion.button>
        </motion.form>

      </div>
    </section>
  )
}
