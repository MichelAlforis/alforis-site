// components/parcours/ClapDeFin.jsx
'use client'

import React from 'react'

export default function ClapDeFin({ profil, meta }) {
  // On récupère directement les données du profil
  const data = meta.profilesData[profil]

  // S’il n’existe pas, on affiche un message générique
  if (!data) {
    return (
      <p className="text-center mt-12 text-lg text-anthracite">
        Désolé, profil introuvable.
      </p>
    )
  }

  // Déstructuration
  const { icon, title, description, color, paragraphs, citation, cta } = data

  return (
    <div
      className="max-w-xl mx-auto text-center space-y-6 p-8 border-2 rounded-2xl shadow-lg"
      style={{ borderColor: color || '#000' }}
    >
      {/* Icône et titre */}
      <div className="text-5xl">{icon}</div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-lg text-steel">{description}</p>

      {/* Paragraphes détaillés */}
      <div className="text-left space-y-4 pt-4">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Citation */}
      {citation && (
        <p className="italic text-steel pt-2">
          {citation.emoji} {citation.text}
        </p>
      )}

      {/* Call to action */}
      {cta && (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 btn-alforis-retro"
        >
          {cta.label}
        </a>
      )}
    </div>
  )
}
