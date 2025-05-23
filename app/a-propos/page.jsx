// app/a-propos/page.jsx
import PageClient from "./PageClient"

export async function generateMetadata() {
  return {
  title: 'a-propos – Alforis',
  description:
    'Découvrez notre approche patrimoniale sur mesure à travers notre page a-propos.',
  openGraph: {
    title: 'a-propos – Alforis',
    description:
      'Découvrez notre approche patrimoniale sur mesure à travers notre page a-propos.',
    url: 'https://www.alforis.fr/a-propos',
    siteName: 'Alforis',
    type: 'website',
    images: ['/assets/img/og/a-propos.png'], // exemple
  },
  twitter: {
    card: 'summary_large_image',
    title: 'a-propos – Alforis',
    description:
      'Découvrez notre approche patrimoniale sur mesure à travers notre page a-propos.',
    images: ['/assets/img/twitter/a-propos.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/a-propos' },
}}

export default function aproposServer() {
  return <PageClient />
}
