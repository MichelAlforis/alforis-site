// pages/marketplace/[slug].jsx

import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import offres from '@/content/offres'
import CTA from '@/components/ui/CallToAction.jsx'

export default function OffreDetail() {
  const { slug } = useRouter().query
  const offer = offres.find((o) => o.slug === slug)
  if (!offer) return <p className="text-center p-12">Offre introuvable.</p>

  return (
    <>
      <Head>
        <title>{offer.title} – Alforis</title>
        <meta name="description" content={offer.description} />
      </Head>

      <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-auto mb-8 rounded-lg shadow object-cover"
        />

        <h1 className="text-4xl font-title text-ardoise mb-6 leading-snug">
          {offer.title}
        </h1>

        <article className="prose prose-lg text-anthracite max-w-none">
          <p className="font-semibold">{offer.description}</p>
          <p className="text-xl font-bold mt-6">{offer.price}</p>
        </article>

        <div className="mt-12">
          <CTA />
        </div>
      </main>
    </>
  )
}