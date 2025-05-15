/* app/parcours/page.jsx */
export const metadataBase = new URL('https://www.alforis.fr')
export const metadata = {
  title: 'Nos Parcours – Alforis',
  description: 'Découvrez nos parcours personnalisés adaptés à votre trajectoire.',
  openGraph: {
    title: 'Nos Parcours – Alforis',
    description: 'Découvrez nos parcours personnalisés adaptés à votre trajectoire.',
    url: 'https://www.alforis.fr/parcours',
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    images: ['/assets/img/og/parcours.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/parcours' },
}

import { fetchAllContent } from '@/lib/server/fetchAllContent'
import ParcoursContent from './ParcoursContent'

export default async function Page() {
  const all = await fetchAllContent()
  const content = all.filter((item) => item.type === 'Parcours')

  return <ParcoursContent content={content} />
}