// app/contact/page.jsx
import PageClient from "./PageClient"

export async function generateMetadata() {
  return {
  title: 'Contact – Alforis',
  description:
    'Découvrez notre approche patrimoniale sur mesure à travers notre page contact.',
  openGraph: {
    title: 'Contact – Alforis',
    description:
      'Découvrez notre approche patrimoniale sur mesure à travers notre page contact.',
    url: 'https://www.alforis.fr/contact',
    siteName: 'Alforis',
    type: 'website',
    images: ['/assets/img/og/contact.png'], // exemple
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact – Alforis',
    description:
      'Découvrez notre approche patrimoniale sur mesure à travers notre page contact.',
    images: ['/assets/img/twitter/contact.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/contact' },
}}

export default function ContactPage() {
  return <PageClient />
}
