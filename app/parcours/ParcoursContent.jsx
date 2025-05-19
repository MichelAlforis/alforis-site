'use client'
// app/parcours/ParcoursContent.jsx

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Animated from '@/components/animated/Animated'
import SmartResponsive from '@/components/ui/SmartResponsive'

export default function ParcoursContent({ content, totalPages }) {
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  // Lorsque l'utilisateur clique sur une carte, on navigue vers la page slug
  const handleCardClick = (item) => {
    router.push(`/parcours/${item.slug}`)
  }

  // Changer de page sans rechargement
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <Animated.Page>
      <main className="main-content bg-ivoire text-anthracite pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Animated.H1 className="text-5xl font-semibold text-center mb-6">
            Nos Parcours
          </Animated.H1>

          <SmartResponsive
            data={content}
            type="parcours"
            filterKey="type"
            filterValue="Parcours"
            emptyMessage="Aucun parcours disponible."
            onCardClick={handleCardClick}
            currentPage={currentPage}
          />

          <div className="flex justify-between mt-8">
            <button
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-doré text-ivoire rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Précédent
            </button>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-doré text-ivoire rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant →
            </button>
          </div>
        </div>
      </main>
    </Animated.Page>
  )
}
