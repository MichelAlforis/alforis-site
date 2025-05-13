// components/MarketplaceGrid.jsx
import React from 'react'
import OffreCard from './OffreCard'

export default function MarketplaceGrid({ cible = 'particulier', offres }) {
  const filtered = offres.filter((o) => o.cible === cible)
  if (filtered.length === 0) {
    return (
      <div className="text-center text-anthracite py-12 text-lg">
        Aucune offre disponible pour ce profil.
      </div>
    )
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      {filtered.map((offre, idx) => (
        <OffreCard key={offre.slug} {...offre} index={idx} />
      ))}
    </section>
  )
}
