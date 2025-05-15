'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import ContactFinal from '@/components/parcours/ContactFinal'

export default function ContactClient({ meta, slug }) {
  const router = useRouter()
  const qp = useSearchParams()

  const profil     = qp.get('profil')          || ''
  const textAnswer = qp.get('textAnswer')      || ''
  const answers    = JSON.parse(qp.get('answers') || '[]')

  return (
    <ContactFinal
      meta={meta}
      profile={profil}
      textAnswer={textAnswer}
      answers={answers}
      parcoursSlug={slug}
      onSubmit={() =>
        router.push(`/parcours/${slug}/clap-de-fin?profil=${encodeURIComponent(profil)}`)
      }
    />
  )
}
