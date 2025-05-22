'use client'
import React from 'react'
import Link from 'next/link'
import { tonemapPixelShader } from 'babylonjs'

export default function ClapDeFin({
  profilPrincipal,
  profilSecondaire,
  meta,
  slug,
}) {
  // On cherche d'abord les données du profil principal
  const data = meta.profilesData?.[profilPrincipal]
  if (!data) {
    return (
      <p className="text-center mt-12 text-lg text-anthracite">
        Désolé, profil introuvable.
      </p>
    )
  }

  const { icon, title, description, color, paragraphs, citation, cta } = data

  // Construire l'URL de la CTA
  let href = cta?.href || ''
  if (href && !href.startsWith('http') && !href.startsWith('/')) {
    href = `/${href}`
  }

  return (
  <section style={{ paddingTop: `calc(var(--nav-height) + 0.25rem)` }}>
    <div
      className="max-w-3xl mx-auto h-full text-center px-4 space-y-8 border-2 rounded-2xl shadow-lg"
      style={{ borderColor: color }}
    >
      <div className="text-5xl mt-4">{icon}</div>
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

      {cta?.label && (
        href.startsWith('http') ? (
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
        )
      )}

      {/* Affichage du profil secondaire si présent */}
      {profilSecondaire && (
        <p className="mt-4 text-sm text-ardoise">
          Profil secondaire : <strong>{profilSecondaire}</strong>
        </p>
      )}

      {/* Bouton retour au début du parcours */}
      <Link href={`/parcours`} className="block mt-4 text-sm text-anthracite">
        ← Revenir à la sélection
      </Link>
    </div>
  </section>
  )
}
