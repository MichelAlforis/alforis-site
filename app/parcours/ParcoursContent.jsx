/* app/parcours/ParcoursContent.jsx */
'use client'

import React from 'react'
import Animated from '@/components/animated/Animated'
import ParcoursGrid from '@/components/parcours/ParcoursGrid'

export default function ParcoursContent({ content }) {
  return (
    <Animated.Page>
      <main className="main-content bg-ivoire text-anthracite pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Animated.H1 className="text-5xl font-semibold text-center mb-6">
            Nos Parcours
          </Animated.H1>
          <ParcoursGrid content={content} />
        </div>
      </main>
    </Animated.Page>
  )
}