'use client'
/* app/marketplace/MarketplaceContent.jsx */


import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Animated from '@/components/animated/Animated'
import SmartResponsive from '@/components/ui/SmartResponsive'
import dynamic from 'next/dynamic'

const HonorairesSimulator = dynamic(
  () => import('@/components/MarketPlace/HonorairesSimulator'),
  { loading: () => <p className="text-center text-ardoise">Chargement…</p> }
)

const OffresTypes = [
  { type: 'particulier', label: 'Particulier' },
  { type: 'dirigeant',   label: 'Dirigeant' },
  { type: 'encours',     label: 'Sur encours' },
]

export default function MarketplaceContent({ offres }) {
  const [selectedType, setSelectedType] = useState('particulier')

  return (
    <Animated.Page>
      <motion.main className="main-content bg-ivoire text-anthracite pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <Animated.H1 className="text-5xl font-semibold text-center">
            L'offre Alforis
          </Animated.H1>

          <div className="flex flex-wrap justify-center gap-4">
            {OffresTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={
                  `btn-alforis-outline ${
                    selectedType === type && 'bg-doré text-ardoise'
                  }`
                }
              >
                {label}
              </button>
            ))}
          </div>

          {selectedType !== 'encours' ? (
             <SmartResponsive
              data={offres.filter((o) => o.cible === selectedType)}
              type="marketplace"
              emptyMessage="Aucune offre disponible pour ce profil."
            />
          ) : (
            <HonorairesSimulator />
          )}
        </div>
      </motion.main>
    </Animated.Page>
  )
}
