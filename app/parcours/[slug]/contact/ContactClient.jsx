'use client'

import { useEffect, useState } from 'react'
import ContactFinal from '@/components/parcours/ContactFinal'

export default function ContactClient({ meta, slug }) {
  const [data, setData] = useState({
    profil: '',
    textAnswer: '',
    answers: []
  })

  useEffect(() => {
    const stored = sessionStorage.getItem('parcoursData')
    if (stored) {
      try {
        setData(JSON.parse(stored))
      } catch {
        console.warn('❌ Erreur lecture sessionStorage')
      }
    }
  }, [])

  return (
    <ContactFinal
      meta={meta}
      slug={slug}
      profile={data.profil}
      textAnswer={data.textAnswer}
      answers={data.answers}
      onSubmit={() =>
        window.location.href = `/parcours/${slug}/clap-de-fin?profil=${encodeURIComponent(data.profil)}`
      }
    />
  )
}
