'use client'
// app/parcours/ParcoursContent.jsx

import React, { useState, useEffect } from 'react'
import Animated from '@/components/animated/Animated'
import SmartResponsive from '@/components/ui/SmartResponsive'

export default function ParcoursContent({ content }) {
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  
  // Lorsque l'utilisateur clique sur une carte, on navigue vers la page slug
  const handleCardClick = (item) => {
    router.push(`/parcours/${item.slug}`)
  }


  return (
    <Animated.Page>
      <section className="bg-ivoire text-anthracite dark:bg-acier/90 text-ivoire pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          <SmartResponsive
            data={content}
            type="parcours"
            filterKey="type"
            filterValue="Parcours"
            emptyMessage="Aucun parcours disponible."
            onCardClick={handleCardClick}
          />
        </div>
      </section>
    </Animated.Page>
  )
}
