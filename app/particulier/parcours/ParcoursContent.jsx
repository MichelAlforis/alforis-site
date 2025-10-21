'use client'
// app/parcours/ParcoursContent.jsx

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'  // ✅ Ajoutez cet import
import Animated from '@/components/animated/Animated'
import SmartResponsive from '@/components/ui/SmartResponsive'

export default function ParcoursContent({ content }) {
  const router = useRouter()  // ✅ Ajoutez cette ligne
  
  // état thème jour/nuit
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  
  // Lorsque l'utilisateur clique sur une carte, on navigue vers la page slug
  const handleCardClick = (item) => {
    router.push(`/particulier/parcours/${item.slug}`)
  }

  return (
    <Animated.Page>
      <section className="bg-white text-anthracite dark:bg-acier/90 text-ivoire px-2 md:px-6 mt-2 md:mt-4 rounded-xl">
          <SmartResponsive
            data={content}
            type="parcours"
            filterKey="type"
            filterValue="Parcours"
            emptyMessage="Aucun parcours disponible."
            onCardClick={handleCardClick}
          />
      </section>
    </Animated.Page>
  )
}