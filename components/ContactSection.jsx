// ContactSection.jsx
'use client'

import { useEffect, useRef } from 'react'

const urlMap = {
  appel: 'https://cal.com/michelmarques/appel',
  visio: 'https://cal.com/michelmarques/visio',
  patrimonial: 'https://cal.com/michelmarques/patrimonial'
}

const labelMap = {
  appel: 'un appel téléphonique',
  visio: 'un rendez-vous en visio',
  patrimonial: 'un rendez-vous patrimonial en personne'
}

export default function ContactSection({ type, onChangeType }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (type && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [type])

  if (!type || !urlMap[type]) return null

  const otherTypes = Object.keys(urlMap).filter((t) => t !== type)

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto">
      <p className="text-center text-lg text-acier mb-6">
        Vous avez choisi <strong>{labelMap[type]}</strong>. Veuillez sélectionner un créneau ci-dessous :
      </p>

      <div className="flex justify-center gap-4 mb-6">
        {otherTypes.map((t) => (
          <button
            key={t}
            onClick={() => onChangeType?.(t)}
            className="btn-alforis-rdv"
          >
            {labelMap[t]}
          </button>
        ))}
      </div>

      <iframe
        src={urlMap[type]}
        width="100%"
        height="600"
        className="border-none shadow-md rounded-xl"
        loading="lazy"
        title={`Prise de rendez-vous - ${type}`}
      ></iframe>
    </div>
  )
}
