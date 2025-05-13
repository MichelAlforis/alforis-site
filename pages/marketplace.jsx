import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Animated from '@/components/animated/Animated'
import AlforisHead from '@/components/AlforisHead'
import MarketplaceGrid from '@/components/MarketPlace/MarketplaceGrid'
import { fetchAllOffres } from '@/lib/server/fetAllOffres'

const HonorairesSimulator = dynamic(
  () => import('@/components/Marketplace/HonorairesSimulator'),
  { ssr: false, loading: () => <p className="text-center">Chargement…</p> }
)

const OffresTypes = [
  { type: 'particulier', label: 'Particulier' },
  { type: 'dirigeant',   label: 'Dirigeant' },
  { type: 'encours',     label: 'Honoraires sur encours' },
]

export default function MarketplacePage({ offres }) {
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
        <motion.main className="main-content bg-ivoire text-anthracite pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Animated.H1 className="text-5xl font-semibold text-center mb-8">
              L'offre Alforis
            </Animated.H1>

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

            {selectedType !== 'encours'
              ? <MarketplaceGrid cible={selectedType} offres={offres} />
              : <HonorairesSimulator />
            }
          </div>
        </motion.main>
      </Animated.Page>
    </>
  )
}

export async function getStaticProps() {
  const offres = await fetchAllOffres()
  return {
    props: { offres }
  }
}
