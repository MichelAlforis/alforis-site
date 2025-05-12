'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Animated from '@/components/animated/Animated'
import AlforisHead from '@/components/AlforisHead'
import MarketplaceGrid from '@/components/MarketPlace/MarketplaceGrid'
import HonorairesSimulator from '@/components/MarketPlace/HonorairesSimulator'
import Image from 'next/image'

export default function MarketplacePage() {
  const [cible, setCible] = useState('particulier')
  const [view, setView] = useState('offres')

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

            {/* 🔀 Boutons de filtre – on autorise le retour à la ligne */}
            <div className="text-center mb-12 inline-flex flex-wrap gap-4 justify-center">
              <button
                className={`btn-alforis-outline ${
                  view === 'offres' && cible === 'particulier'
                    ? 'bg-doré text-ardoise'
                    : ''
                }`}
                onClick={() => {
                  setCible('particulier')
                  setView('offres')
                }}
              >
                Particulier
              </button>

              <button
                className={`btn-alforis-outline ${
                  view === 'offres' && cible === 'dirigeant'
                    ? 'bg-doré text-ardoise'
                    : ''
                }`}
                onClick={() => {
                  setCible('dirigeant')
                  setView('offres')
                }}
              >
                Dirigeant
              </button>

              <button
                className={`btn-alforis-outline ${
                  view === 'simulator' ? 'bg-doré text-ardoise' : ''
                }`}
                onClick={() => setView('simulator')}
              >
                Honoraires sur encours
              </button>
            </div>

            {/* Affichage conditionnel */}
            {view === 'offres' && <MarketplaceGrid cible={cible} />}

            {view === 'simulator' && (
              <div className="mt-16 text-center">
                {/* on cache l’image sur mobile */}
                <div className="hidden sm:block mx-auto mb-8">
                  <Image
                    src="/assets/img/marketplace/lordenargent_simul.webp"
                    alt="Simulation d’honoraires"
                    width={1600}
                    height={900}
                    quality={80}
                    placeholder="blur"
                    blurDataURL="/assets/img/marketplace/lordenargent_simul-blur.webp"
                    loading="lazy"
                    decoding="async"
                    className="rounded-lg shadow-md object-cover"
                  />
                </div>
                <HonorairesSimulator />
              </div>
            )}
          </div>
        </motion.main>
      </Animated.Page>
    </>
  )
}
