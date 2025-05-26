'use client'
import { useSearchParams } from 'next/navigation'
import PremiumButton from '@/components/ui/PremiumButton'
import { useState } from 'react'

export default function AnnulationRDV() {
  const params = useSearchParams()
  const token = params.get('token')
  const [done, setDone] = useState(false)
  let date, time, email
  if (token) {
    const [d, t, e] = decodeURIComponent(token).split('|')
    date = d
    time = t
    email = e
  }

  const handleAnnulation = async () => {
    await fetch('/api/annule-rdv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, time, email })
    })
    setDone(true)
  }

  if (!token) return <div className="text-center p-12">Lien invalide ou expiré.</div>

  return (
    <div className="max-w-lg mx-auto p-8 rounded-2xl bg-ivoire/95 shadow-xl mt-12 text-center border border-doré/20">
      <h2 className="text-2xl font-bold text-doré mb-2">Gérer mon rendez-vous</h2>
      {done ? (
        <>
          <p className="mb-6">Votre demande d'annulation a bien été prise en compte.<br/>Notre équipe va vous recontacter.</p>
          <PremiumButton href="/prendre-rendez-vous">Replanifier un rendez-vous</PremiumButton>
        </>
      ) : (
        <>
          <p className="mb-4">Voulez-vous annuler votre RDV du <b>{date}</b> à <b>{time}</b> ?</p>
          <div className="flex justify-center gap-4">
            <PremiumButton onClick={handleAnnulation}>Confirmer l'annulation</PremiumButton>
            <PremiumButton href="/prendre-rendez-vous" variant="outline">Replanifier</PremiumButton>
          </div>
        </>
      )}
    </div>
  )
}
