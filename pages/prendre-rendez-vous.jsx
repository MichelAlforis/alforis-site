// pages/prendre-rendez-vous.jsx
'use client'

import { useState } from 'react'
import ContactSection from '@/components/ContactSection'
import AlforisHead from '@/components/AlforisHead'

const rdvTypes = [
  { type: 'appel', label: 'Appel téléphonique', emoji: '📞' },
  { type: 'visio', label: 'Rendez-vous en visio', emoji: '💻' },
  { type: 'patrimonial', label: 'Rendez-vous patrimonial', emoji: '📍' }
]

export default function PrendreRendezVous() {
  const [selectedType, setSelectedType] = useState(null)

  return (
<>
    <AlforisHead
  title="Prendre rendez-vous – Alforis"
  description="Réservez un appel, une visio ou un rendez-vous patrimonial avec notre équipe."
    />

    <section className="min-h-screen px-6 py-20 bg-ivoire text-anthracite">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-title font-semibold mb-12">
          Choisissez votre rendez-vous
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {rdvTypes.map(({ type, label, emoji }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`border rounded-2xl p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md hover:border-doré/80 ${
                selectedType === type ? 'border-doré bg-white' : 'border-transparent bg-white/50'
              }`}
            >
              <div className="text-4xl mb-4">{emoji}</div>
              <div className="text-xl font-medium">{label}</div>
              <div className="text-xl text-acier font-medium">{label}</div>
            </button>
          ))}
        </div>

        {selectedType && (
          <div className="mt-12">
            <ContactSection type={selectedType} onChangeType={setSelectedType} />
          </div>
        )}
      </div>
    </section>
</>
  )
}

