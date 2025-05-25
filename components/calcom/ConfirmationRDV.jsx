'use client'
import { useState } from 'react'
import PremiumButton from '../ui/PremiumButton'
import Input from '../ui/input'
import { toast } from 'react-toastify'

export default function ConfirmationRDVForm({ type, date, time, onRestart, onAirtable, agendaUrl }) {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      // Appel API interne (à adapter à ta route !)
      const res = await fetch('/api/rdv-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          date,
          time,
          Nom: form.nom,
          Prenom: form.prenom,
          Email: form.email,
          NumeroTelephone: form.telephone,
        }),
      })
      if (!res.ok) throw new Error('Erreur d\'enregistrement')
      setDone(true)
      toast.success('Votre demande a bien été enregistrée.')
      if (onAirtable) onAirtable()
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement, veuillez réessayer.")
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto p-8 rounded-2xl bg-ivoire/95 dark:bg-acier/95 shadow-2xl text-center space-y-6 border border-doré/20">
        <div className="text-3xl font-bold text-doré mb-2">
          Rendez-vous enregistré
        </div>
        <div className="text-lg text-acier dark:text-ivoire mb-4">
          Merci {form.prenom} {form.nom}, nous vous contacterons pour confirmer le créneau du <strong>
            {date && new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </strong> à <strong>{time}</strong>.
        </div>
        <div className="text-md text-anthracite dark:text-ivoire mb-4">
          Vous recevrez une confirmation par email et SMS sous 24h.<br />
          <span className="text-doré font-semibold">Besoin d’un autre rendez-vous ?</span>
        </div>
        <PremiumButton onClick={onRestart}>
          Prendre un autre rendez-vous
        </PremiumButton>
        {agendaUrl && (
          <div className="mt-6">
            <a
              href={agendaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-acier"
            >
              Accéder à l’agenda complet
            </a>
          </div>
        )}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 rounded-2xl bg-ivoire/95 dark:bg-acier/95 shadow-2xl text-center space-y-6 border border-doré/20"
    >
      <div className="text-2xl font-bold text-doré mb-2">
        Finalisez votre rendez-vous
      </div>
      <div className="mb-4 text-md text-anthracite dark:text-ivoire">
        Pour valider votre demande de rendez-vous du <strong>
          {date && new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </strong> à <strong>{time}</strong> :
        <br />Merci de remplir les informations ci-dessous.
      </div>
      <div className="flex flex-col gap-3">
        <Input
          name="prenom"
          value={form.prenom}
          onChange={handleChange}
          required
          placeholder="Prénom"
          className="w-full"
        />
        <Input
          name="nom"
          value={form.nom}
          onChange={handleChange}
          required
          placeholder="Nom"
          className="w-full"
        />
        <Input
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          required
          placeholder="Téléphone"
          className="w-full"
        />
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Adresse e-mail"
          className="w-full"
        />
      </div>
      <PremiumButton
        type="submit"
        className="w-full"
        disabled={sending}
      >
        Valider mon rendez-vous
      </PremiumButton>
      <div className="mt-6">
        <button
          type="button"
          onClick={onRestart}
          className="underline text-acier"
        >
          ← Choisir un autre créneau
        </button>
      </div>
      {agendaUrl && (
        <div className="mt-4">
          <a
            href={agendaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-acier"
          >
            Accéder à l’agenda complet
          </a>
        </div>
      )}
    </form>
  )
}
