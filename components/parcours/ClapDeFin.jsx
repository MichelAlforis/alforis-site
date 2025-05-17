'use client'
import React from 'react'
import Link from 'next/link'

export default function ClapDeFin({ profil, meta }) {
  const data = meta.profilesData?.[profil]
  if (!data) {
    return (
      <p className="text-center mt-12 text-lg text-anthracite">
        Désolé, profil introuvable.
      </p>
    )
  }

  const { icon, title, description, color, paragraphs, citation, cta } = data

  // Construire URL de CTA
  let href = cta?.href || ''
  if (href && !href.startsWith('http') && !href.startsWith('/')) {
    href = `/${href}`
  }

  return (
    <div
      className="max-w-xl mx-auto text-center space-y-6 p-8 border-2 rounded-2xl shadow-lg"
      style={{ borderColor: color }}
    >
      <div className="text-5xl">{icon}</div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-lg text-steel">{description}</p>

      <div className="text-left space-y-4 pt-4">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {citation && (
        <p className="italic text-steel pt-2">
          {citation.emoji} {citation.text}
        </p>
      )}

      {cta && (
        <div>
          {href.startsWith('http') ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 btn-alforis-retro"
            >
              {cta.label}
            </a>
          ) : (
            <Link href={href} className="inline-block mt-4 btn-alforis-retro">
              {cta.label}
            </Link>
          )}
        </div>
      )}

      {/* Bouton retour au formulaire initial si besoin */}
      <Link href={`/parcours/${profil}`} className="block mt-4 text-sm text-anthracite">
        ← Revenir à la sélection
      </Link>
    </div>
  )
}
