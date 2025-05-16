'use client'
// app/parcours/ParcoursContent.jsx

import React from 'react'
import Link from 'next/link'
import Animated from '@/components/animated/Animated'
import SmartResponsive from '@/components/ui/SmartResponsive'

export default function ParcoursContent({ content, currentPage, totalPages }) {
  const basePath = '/parcours'
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
          />

          {/* pagination controls */}
          <div className="flex justify-between mt-8">
            {currentPage > 1 ? (
              <Link
                href={`${basePath}?page=${currentPage - 1}`}
                className="px-4 py-2 bg-doré text-white rounded hover:opacity-90"
              >
                ← Précédent
              </Link>
            ) : (
              <div />
            )}

            {currentPage < totalPages ? (
              <Link
                href={`${basePath}?page=${currentPage + 1}`}
                className="px-4 py-2 bg-doré text-white rounded hover:opacity-90"
              >
                Suivant →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </Animated.Page>
  )
}
