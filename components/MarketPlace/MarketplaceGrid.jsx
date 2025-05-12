'use client'

import React from 'react'
import OffreCard from './OffreCard'
import offres from '@/content/Offres/offres'

export default function MarketplaceGrid({ cible = 'particulier' }) {
  const filtered = offres.filter(o => o.cible === cible)

  if (!filtered.length) {
    return (
      <div className="text-center text-anthracite py-12 text-lg">
        Aucune offre disponible pour ce profil.
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      {filtered.map((offre, idx) => (
        <div key={offre.slug} className="h-full">
          <OffreCard {...offre} index={idx} />
        </div>
      ))}
    </section>
  )
}
