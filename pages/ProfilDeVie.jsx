'use client'

import { useEffect } from 'react'
import AlforisHead from '@/components/AlforisHead'
import Link from 'next/link'
import { Animated } from '@/components/animated/Animated'
import { fetchAllContent } from '@/lib/server/fetchAllContent'
import ParcoursGrid from '@/components/parcours/ParcoursGrid'

export default function ParcoursPage({ content }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <AlforisHead
        title="Nos Parcours – Alforis"
        description="Découvrez nos parcours personnalisés adaptés à votre trajectoire."
        path="/parcours"
      />

<Animated.Page>
        <main className="bg-ivoire text-anthracite pt-[var(--nav-height)] pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Animated.H1 className="text-5xl font-semibold text-center mb-6">
              Nos Parcours
            </Animated.H1>

            < ParcoursGrid content={content} />
          </div>
        </main>
      </Animated.Page>
    </>
  )
}

export async function getStaticProps() {
  const content = await fetchAllContent() // Récupère tous les parcours depuis le dossier
  return { props: { content } }
}
