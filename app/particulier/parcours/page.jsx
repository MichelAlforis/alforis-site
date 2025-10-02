// app/parcours/page.jsx
import { fetchAllParcours } from '@/lib/server/fetchAllParcours'
import PageClient from './PageClient'

export const dynamic = 'force-static'

export async function generateMetadata() {
  return {
  title: 'Parcours',
  description: 'Découvrez votre parcours de vie patrimonial.',
  openGraph: {
    title: 'Parcours – Alforis',
    description: 'Découvrez votre parcours de vie patrimonial.',
    url: 'https://www.alforis.fr/parcours',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/parcours.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/parcours' },
}}


export default async function Page({ searchParams }) {
  // Pagination côté serveur
  const content = await fetchAllParcours()

  return (
    <PageClient
      content={content}
    />
  )
}
