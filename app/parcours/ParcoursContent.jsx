// app/parcours/ParcoursContent.jsx
'use client'

import React from 'react'
import Animated from '@/components/animated/Animated'
import SmartResponsive from '@/components/ui/SmartResponsive'

export default function ParcoursContent({ content }) {
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
        </div>
      </main>
    </Animated.Page>
  )
}
