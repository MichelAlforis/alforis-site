'use client'
import { useState } from 'react'
import PremiumButton from '../ui/PremiumButton'
import Input from '../ui/input'
import { toast } from 'react-toastify'

export default function RdvDisponibiliteFallback({ onSubmit, onBack }) {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Ici, envoie le message vers ta boîte mail, Airtable, ou API...
    // Simule un envoi avec un setTimeout
    setTimeout(() => {
      setLoading(false)
      toast.success("Merci, nous allons vous recontacter très vite.", { icon: "💌" })
      setMessage('')
      setEmail('')
      if (onSubmit) onSubmit({ email, message })
    }, 1000)
  }

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">
      <div className="text-xl font-semibold text-ardoise dark:text-ivoire">
        Proposez vos disponibilités
      </div>
      <p className="text-acier dark:text-ivoire">
        Aucun créneau proposé ne vous convient&nbsp;? Indiquez-nous vos préférences, nous adapterons notre agenda.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          required
          placeholder="Votre email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full"
        />
        <textarea
          required
          placeholder="Vos disponibilités, ou vos contraintes…"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full min-h-[90px] rounded-xl border border-acier px-3 py-2 mt-1"
        />
        <PremiumButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          Envoyer ma demande
        </PremiumButton>
        <button
          type="button"
          className="underline text-acier mt-4"
          onClick={onBack}
        >
          ← Retour à la sélection de rendez-vous
        </button>
      </form>
    </div>
  )
}
