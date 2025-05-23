'use client'
import { useState } from 'react'

export default function CustomDisponibilityForm({ type }) {
  const [message, setMessage] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    // TODO: envoyer message + type vers backend
    alert("Merci ! Nous avons reçu votre proposition de créneau.")
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <p className="text-center">
        Aucun créneau ne vous convient pour <strong>{type}</strong>.
        Proposez vos disponibilités ci-dessous :
      </p>
      <textarea
        required
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Ex : Mercredi 29/05 à 10h, Jeudi 30/05 à 15h"
        className="w-full p-3 border rounded-lg"
      />
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-doré text-ivoire rounded-lg hover:opacity-90 transition"
        >
          Envoyer ma proposition
        </button>
      </div>
    </form>
  )
}
