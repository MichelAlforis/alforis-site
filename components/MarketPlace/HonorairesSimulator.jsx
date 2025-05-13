'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// 1. Déclarez votre formatter en-dehors du composant
const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

export default function HonorairesModal() {
  const [encours, setEncours] = useState(250_000)
  const [show, setShow]       = useState(false)

  // 2. Calcul simplifié des honoraires
  const calculateFee = () => {
    let pct
    if (encours < 250_000) pct = 0.9
    else if (encours < 1_000_000) pct = 0.6
    else pct = 0.4

    return currencyFormatter.format((encours * pct) / 100)
  }

  return (

    <>
              <div className="mt-16 text-center">
                {/* on cache l’image sur mobile */}
                <div className="hidden sm:block mx-auto mb-8">
                  <Image
                    src="/assets/img/marketplace/lordenargent_simul.webp"
                    alt="Simulation d’honoraires"
                    width={1600}
                    height={900}
                    quality={80}
                    loading="lazy"
                    decoding="async"
                    className="rounded-lg shadow-md object-cover"
                  />
                </div>
      <button
        onClick={() => setShow(true)}
        className="btn-alforis-outline bg-doré text-white px-4 py-2 rounded"
      >
        Lancer simulation
      </button>

      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg mb-4">Simulation d’honoraires</h2>

            {/* Slider par paliers de 50 000 */}
            <input
              type="range"
              min={0}
              max={2_000_000}
              step={50_000}
              value={encours}
              onChange={e => setEncours(+e.target.value)}
              className="w-full mb-4"
            />

            <p className="mb-4">
              Montant : <strong>{currencyFormatter.format(encours)}</strong>
            </p>
            <p className="mb-6">
              Honoraires : <strong>{calculateFee()}</strong>
            </p>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShow(false)} className="px-4">
                Fermer
              </button>
            </div>
          </div>
        </div>
        
      )}
      </div>
    </>
  )
}
