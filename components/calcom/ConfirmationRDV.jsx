'use client'

import { useState } from 'react'
import PremiumButton from '../ui/PremiumButton'
import { Input } from '../ui/input'
import { toast } from 'react-toastify'
import AddressInput from '../ui/AddressInput'  // ton composant d'autocomplétion

export default function ConfirmationRDVForm({
  type,
  date,
  time,
  onRestart,
  onAirtable,
  agendaUrl
}) {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: ''     // ← nouveau champ
  })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)

    try {
      const payload = {
        type,
        date,
        time,
        Nom:             form.nom,
        Prenom:          form.prenom,
        Email:           form.email,
        NumeroTelephone: form.telephone,
        // n’injecte adresse que pour le physique
        ...(type === 'patrimonial' && { adresse: form.adresse })
      }

      const res = await fetch('/api/rdv-confirm', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      })

      // créneau plus dispo
      if (res.status === 409) {
        const { error } = await res.json()
        toast.error(error)
        onRestart?.()
        return
      }

      // autre erreur
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || err.message || 'Erreur d’enregistrement')
      }

      // succès
      setDone(true)
      toast.success('Votre demande a bien été enregistrée.')
      onAirtable?.()
    } catch (err) {
      toast.error(err.message || "Erreur lors de l'enregistrement, veuillez réessayer.")
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto rounded-2xl bg-ivoire/95 dark:bg-acier/95 shadow-2xl text-center space-y-6 border border-doré/20 p-8">
        <h2 className="text-3xl font-bold text-doré">Rendez-vous enregistré</h2>
        <p className="text-lg text-acier dark:text-ivoire">
          Merci {form.prenom} {form.nom}, nous vous contacterons pour confirmer le créneau du{' '}
          <strong>
            {date &&
              new Date(date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
          </strong>{' '}
          à <strong>{time}</strong>.
        </p>
        <p className="text-md text-anthracite dark:text-ivoire">
          Vous recevrez une confirmation par email sous 24h.
        </p>
        <PremiumButton onClick={onRestart}>Prendre un autre rendez-vous</PremiumButton>
        {agendaUrl && (
          <a
            href={agendaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 underline text-acier"
          >
            Accéder à l’agenda complet
          </a>
        )}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 rounded-2xl bg-ivoire/95 dark:bg-acier/95 shadow-2xl text-center space-y-6 border border-doré/20"
    >
      <h2 className="text-2xl font-bold text-doré">Finalisez votre rendez-vous</h2>
      <p className="text-md text-anthracite dark:text-ivoire">
        Pour valider votre demande du{' '}
        <strong>
          {date &&
            new Date(date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
        </strong>{' '}
        à <strong>{time}</strong>, merci de remplir les infos ci-dessous.
      </p>

      <div className="flex flex-col gap-3">
        <Input
          name="prenom"
          value={form.prenom}
          onChange={handleChange}
          required
          placeholder="Prénom"
          className="w-full bg-white"
        />
        <Input
          name="nom"
          value={form.nom}
          onChange={handleChange}
          required
          placeholder="Nom"
          className="w-full bg-white"
        />
        <Input
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          required
          placeholder="Téléphone"
          className="w-full bg-white"
        />
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Adresse e-mail"
          className="w-full bg-white"
        />

        {type === 'patrimonial' && (
          <AddressInput
            value={form.adresse}
            onSelect={addr => setForm(f => ({ ...f, adresse: addr }))}
          />
        )}
      </div>

      <PremiumButton type="submit" disabled={sending} className="w-full text-doré">
        {sending ? 'Envoi...' : 'Valider mon rendez-vous'}
      </PremiumButton>

      <button type="button" onClick={onRestart} className="mt-4 underline text-acier">
        ← Choisir un autre créneau
      </button>

      {agendaUrl && (
        <a href={agendaUrl} target="_blank" rel="noopener noreferrer" className="block mt-4 underline text-acier">
          Accéder à l’agenda complet
        </a>
      )}
    </form>
  )
}
