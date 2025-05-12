// pages/marketplace.jsx

import Animated from '@/components/animated/Animated'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AlforisHead from '@/components/AlforisHead'
import MarketplaceGrid from '@/components/MarketPlace/MarketplaceGrid'
import HonorairesSimulator from '@/components/MarketPlace/HonorairesSimulator'
import offres from '@/content/Offres/offres'

export default function MarketplacePage() {
  const [cible, setCible] = useState('particulier')

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
              Marketplace Alforis
            </Animated.H1>

            <div className="text-center mb-12">
              <p className="text-lg md:text-xl mb-6">
                Des prestations de conseil transparentes et premium.
              </p>
              <div className="inline-flex gap-4">
                <button
                  className={`btn-alforis-outline ${cible === 'particulier' ? 'bg-doré text-ardoise' : ''}`}
                  onClick={() => setCible('particulier')}
                >
                  Particulier
                </button>
                <button
                  className={`btn-alforis-outline ${cible === 'dirigeant' ? 'bg-doré text-ardoise' : ''}`}
                  onClick={() => setCible('dirigeant')}
                >
                  Dirigeant
                </button>
              </div>
            </div>

            <MarketplaceGrid cible={cible} />

            <div className="mt-16">
              <HonorairesSimulator />
            </div>
          </div>
        </motion.main>
      </Animated.Page>
    </>
  )
}
