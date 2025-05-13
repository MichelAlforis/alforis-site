'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Animated from '@/components/animated/Animated'
import AlforisHead from '@/components/AlforisHead'
import MarketplaceGrid from '@/components/MarketPlace/MarketplaceGrid'

// Lazy-load du simulateur pour éviter de charger tout de suite son gros bundle
const HonorairesSimulator = dynamic(
  () => import('@/components/MarketPlace/HonorairesSimulator'),
  { ssr: false, loading: () => <p className="text-center">Chargement…</p> }
)

const OffresTypes = [
  { type: 'particulier', label: 'Particulier' },
  { type: 'dirigeant',   label: 'Dirigeant' },
  { type: 'encours',     label: 'Honoraires sur encours' },
]

export default function MarketplacePage() {
  // selectedType vaut 'particulier' | 'dirigeant' | 'encours'
  const [selectedType, setSelectedType] = useState('particulier')

  return (
    <>
      <AlforisHead
        title="Marketplace – Alforis"
        path="/marketplace"
        description="Découvrez nos prestations de conseil patrimonial et réservez en ligne en toute transparence."
        keywords="marketplace, conseil patrimonial, Alforis"
      />

      <Animated.Page>
        <motion.main className="bg-ivoire text-anthracite pt-[var(--nav-height)] pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Animated.H1 className="text-5xl font-semibold text-center mb-8">
              L'offre Alforis
            </Animated.H1>

            {/* --- Boutons de filtre --- */}
            <div className="text-center mb-12 inline-flex flex-wrap gap-4 justify-center">
              {OffresTypes.map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`btn-alforis-outline ${
                    selectedType === type ? 'bg-doré text-ardoise' : ''
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* --- Affichage conditionnel --- */}
            {selectedType !== 'encours' ? (
              <MarketplaceGrid cible={selectedType} />
            ) : (

                <HonorairesSimulator />

            )}
          </div>
        </motion.main>
      </Animated.Page>
    </>
  )
}
