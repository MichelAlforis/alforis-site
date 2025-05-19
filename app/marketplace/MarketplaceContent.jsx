'use client'
/* app/marketplace/MarketplaceContent.jsx */

import React from 'react'
import { motion } from 'framer-motion'
import Animated from '@/components/animated/Animated'
import SmartResponsive from '@/components/ui/SmartResponsive'
import dynamic from 'next/dynamic'

const HonorairesSimulator = dynamic(
  () => import('@/components/HonorairesSimulator'),
  { loading: () => <p className="text-center text-ardoise">Chargement…</p> }
)

const OffresTypes = [
  { type: 'particulier', label: 'Particulier' },
  { type: 'dirigeant',   label: 'Dirigeant' },
  { type: 'encours',     label: 'Sur encours' },
]

export default function MarketplaceContent({ content, activeTab = 'particulier', onTabChange }) {
  // Le filtre est dicté par activeTab (remonté par TabsBar)
  const selectedType = activeTab

  return (
    <Animated.Page>
      <motion.main className="main-content bg-ivoire text-anthracite dark:bg-acier dark:text-ivoire pb-24 px-6 transition-colors">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 
            La TabsBar doit être gérée dans le layout/header, pas ici !
            Donc PAS de boutons ici.
          */}

          {selectedType !== 'encours' ? (
            <SmartResponsive
              data={content.filter((o) => o.cible === selectedType)}
              type="marketplace"
              emptyMessage="Aucune offre disponible pour ce profil."
              // ASTUCE : SmartResponsive doit afficher les titres et sous-titres dans des <p>, pas <h1/h2/h3>
            />
          ) : (
            <HonorairesSimulator />
          )}
        </div>
      </motion.main>
    </Animated.Page>
  )
}
