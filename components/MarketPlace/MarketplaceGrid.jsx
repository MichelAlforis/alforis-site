// components/MarketplaceGrid.jsx
'use client'

import React from 'react'
import OffreCard from './OffreCard'
import offres from '@/content/Offres/offres'

const MarketplaceGrid = ({ cible = 'particulier' }) => {
  const filtered = offres.filter(o => o.cible === cible)

  if (!Array.isArray(filtered) || filtered.length === 0) {
    return (
      <div className="text-center text-anthracite py-12 text-lg">
        Aucune offre disponible pour ce profil.
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-anim auto-rows-fr">
      {filtered.map((offre, index) => (
        <div key={offre.slug} className="h-full">
          <OffreCard {...offre} index={index} />
        </div>
      ))}
    </section>
  )
}

export default MarketplaceGrid