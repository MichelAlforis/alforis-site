import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import offres from '@/content/Offres/offres'
import CTA from '@/components/ui/CallToAction.jsx'

export default function OffreDetail() {
  const { slug } = useRouter().query
  const offer = offres.find(o => o.slug === slug)
  if (!offer) return <p>Offre introuvable.</p>

  return (
    <>
      <Head>
      <title>{offer.title} – Alforis</title>
      </Head>
      <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
        <h1 className="...">{offer.title}</h1>
        <p className="...">{offer.description}</p>
        <p className="...">{offer.price}</p>
        <CTA />
        
      </main>
    </>
  )
}