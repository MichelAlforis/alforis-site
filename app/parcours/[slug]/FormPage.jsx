'use client'

import { useRouter } from 'next/navigation'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'

export default function FormPage({ meta, slug }) {
  const router = useRouter()

  // Callback invoked when the form is completed
  const handleComplete = ({ profil, answers, textAnswer }) => {
    // Build query string with encoded values
    const params = new URLSearchParams()
    params.set('profil', profil)
    params.set('answers', JSON.stringify(answers))
    params.set('textAnswer', textAnswer)

    // Navigate to contact page with parameters
    router.push(`/parcours/${slug}/contact?${params.toString()}`)
  }

  return (
    <ParcoursFormulaire
      meta={meta}
      slug={slug}
      onComplete={handleComplete}
    />
  )
}
