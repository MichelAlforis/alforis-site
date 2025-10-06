// components/b2b/RDVFormB2B.jsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import PremiumButton from '@/components/ui/PremiumButton'
import { toast } from 'react-toastify'

export default function RDVFormB2B({ type, date, heure, onSuccess }) {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    fonction: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/rdv-confirm-b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          type,
          date,
          heure
        })
      })

      if (!res.ok) throw new Error('Erreur lors de l\'enregistrement')

      toast.success('Demande enregistrée ! Nous vous confirmons sous 24h.')
      onSuccess?.()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <Input
        required
        placeholder="Prénom"
        value={form.prenom}
        onChange={(e) => setForm(f => ({ ...f, prenom: e.target.value }))}
      />
      <Input
        required
        placeholder="Nom"
        value={form.nom}
        onChange={(e) => setForm(f => ({ ...f, nom: e.target.value }))}
      />
      <Input
        required
        type="email"
        placeholder="Email professionnel"
        value={form.email}
        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
      />
      <Input
        required
        placeholder="Téléphone"
        value={form.telephone}
        onChange={(e) => setForm(f => ({ ...f, telephone: e.target.value }))}
      />
      <Input
        required
        placeholder="Entreprise"
        value={form.entreprise}
        onChange={(e) => setForm(f => ({ ...f, entreprise: e.target.value }))}
      />
      <Input
        placeholder="Fonction (optionnel)"
        value={form.fonction}
        onChange={(e) => setForm(f => ({ ...f, fonction: e.target.value }))}
      />
      
      <PremiumButton type="submit" disabled={loading} className="w-full">
        {loading ? 'Envoi...' : 'Confirmer le rendez-vous'}
      </PremiumButton>
    </form>
  )
}