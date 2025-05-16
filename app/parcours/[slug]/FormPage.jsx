'use client'
// app/parcours/[slug]/FormPage.jsx

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'

export default function FormPage({ meta, slug }) {
  const router = useRouter()
  const searchParams = useSearchParams() // Appel de useSearchParams() ici

  return (
    <ParcoursFormulaire
      meta={meta}
      slug={slug}
      onComplete={({ profil, answers, textAnswer }) => {
        const params = new URLSearchParams({
          profil,
          answers: JSON.stringify(answers),
          textAnswer
        })
        router.push(`/parcours/${slug}/contact?${params.toString()}`)
      }}
    />
  )
}
