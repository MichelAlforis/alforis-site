// app/head.jsx

export const dynamic = 'force-static'

export const metadataBase = new URL('https://www.alforis.fr')

export const metadata = {
  title: {
    default: 'Alforis – Cabinet de conseil patrimonial haut de gamme',
    template: '%s | Alforis',
  },
  description:
    'Alforis est un cabinet de design de trajectoire de vie, alliant expertise patrimoniale, indépendance et approche humaine.',
  keywords: [
    'Alforis',
    'conseil patrimonial',
    'gestion de patrimoine',
    'cabinet haut de gamme',
  ],
  authors: [{ name: 'Alforis', url: 'https://www.alforis.fr' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.alforis.fr/',
    title: 'Alforis – Cabinet de conseil patrimonial haut de gamme',
    description:
      'Alforis est un cabinet de design de trajectoire de vie, alliant expertise patrimoniale, indépendance et approche humaine.',
    siteName: 'Alforis',
    images: ['/assets/img/og-image.png'], // image fallback
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alforis – Cabinet de conseil patrimonial haut de gamme',
    description:
      'Alforis est un cabinet de design de trajectoire de vie, alliant expertise patrimoniale, indépendance et approche humaine.',
    images: ['/assets/img/twitter-card.png'],
  },
  alternates: {
    canonical: 'https://www.alforis.fr/',
  },
}

export default function Head() {
  return (
    <>
      {/* Canonical explicite */}
      <link rel="canonical" href="https://www.alforis.fr/" />

      {/* Préchargement image principale */}
      <link
        rel="preload"
        as="image"
        href="/assets/img/home/M_hero.webp"
        type="image/webp"
      />

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css"
      />
    </>
  )
}
