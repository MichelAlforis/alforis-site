'use client'

import { useState } from "react"
import useButtonHover from "@/hooks/useButtonHover"

export default function ContactFinal({ answers, textAnswer, profile, onSubmit }) {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    age: "",
    rgpd: false,
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { getButtonProps } = useButtonHover()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.rgpd) {
      setError("Vous devez accepter les conditions RGPD pour continuer.")
      return
    }

    setLoading(true)

    const finalData = {
      nom: formData.nom,
      email: formData.email,
      age: formData.age,
      rgpd: formData.rgpd,
      profil: profile,
      phraseLibre: textAnswer,
      reponses: answers.map((rep, i) => `Q${i + 1}: ${rep}`),
    }

    try {
      const response = await fetch('/api/DonneeAirtable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })

      if (!response.ok) {
        const errText = await response.text()
        console.error("❌ Erreur Airtable:", errText)
        throw new Error("Erreur lors de l'envoi")
      }

      setSuccess(true)
      if (onSubmit) onSubmit(formData)
    } catch (err) {
      console.error("❌ Envoi échoué :", err)
      setError("Erreur lors de l’envoi. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold text-anthracite">
          Merci pour votre confiance.
        </h3>
        <p className="text-acier">
          Nous vous recontactons très vite pour approfondir ensemble votre trajectoire.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto text-left">
      <div>
        <label className="block text-anthracite font-semibold mb-1">Nom</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-light bg-white p-3"
        />
      </div>

      <div>
        <label className="block text-anthracite font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-light bg-white p-3"
        />
      </div>

      <div>
        <label className="block text-anthracite font-semibold mb-1">Âge</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-light bg-white p-3"
        />
      </div>

      <label className="flex items-start gap-3 text-muted text-sm">
        <input
          type="checkbox"
          name="rgpd"
          checked={formData.rgpd}
          onChange={handleChange}
          className="mt-1"
        />
        <span>
          J’accepte que mes données soient utilisées uniquement dans le cadre d’un échange personnalisé avec Alforis.
          <a href="/politique-confidentialite" target="_blank" className="underline ml-1">
            Voir la politique de confidentialité
          </a>.
        </span>
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={loading}
          {...getButtonProps(0, "btn-alforis-outline")}
        >
          {loading ? "Envoi..." : "Envoyer mes coordonnées"}
        </button>
      </div>
    </form>
  )
}
