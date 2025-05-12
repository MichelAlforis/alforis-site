import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import offres from '@/content/Offres/offres'
import PrendreRendezVous from '../prendre-rendez-vous'

export default function OffreDetail() {
  const { slug } = useRouter().query
  const offer = offres.find(o => o.id === slug)
  if (!offer) return <p>Offre introuvable.</p>

  return (
    <>
      <Head>
        <title>{offer.titre} – Alforis</title>
      </Head>
      <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
        <h1 className="text-4xl font-title mb-4 text-ardoise">{offer.titre}</h1>
        <p className="text-lg mb-6 text-anthracite/80">{offer.description}</p>
        <p className="text-xl font-bold mb-8">{offer.prix}</p>

        <Link href={`/prendre-rendez-vous`} className="btn-alforis-retro">
        Prendre rendez-vous
        </Link>
      </main>
    </>
  )
}