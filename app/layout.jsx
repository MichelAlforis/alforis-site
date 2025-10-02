// app/layout.jsx
import '@/styles/globals.css'
import React, { Suspense } from 'react'
import RootClientLayout from './RootClientLayout'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://www.alforis.fr'),
  title: {
    default: 'Alforis – Cabinet de conseil patrimonial haut de gamme',
    template: '%s – Alforis',
  },
  description: 'Découvrez notre approche patrimoniale sur mesure.',
  openGraph: {
    siteName: 'Alforis',
    locale: 'fr_FR',
    type: 'website',
    url: 'https://www.alforis.fr/',
    images: [
      { url: '/assets/img/og/home.png', width: 1200, height: 630, alt: 'Alforis – Conseil patrimonial haut de gamme' },
    ],
  },
  alternates: { canonical: 'https://www.alforis.fr/' },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
}

export default function Layout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Preconnect & preload Google Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

        {/* Favicon et manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Alforis" />
        <meta property="og:url" content="https://www.alforis.fr/" />
        <meta property="og:image" content="https://www.alforis.fr/assets/img/og/home.png" />
        <meta property="og:locale" content="fr_FR" />

        {/* Script vh mobile-first */}
        <Script id="update-vh" strategy="afterInteractive">
          {`
            function updateVh() {
              document.documentElement.style.setProperty(
                '--vh',
                window.innerHeight * 0.01 + 'px'
              );
            }
            window.addEventListener('resize', updateVh);
            updateVh();
          `}
        </Script>
      </head>
      <body className="scroll-smooth font-roboto">
        <Suspense fallback={null}>
          <RootClientLayout>
            {children}
          </RootClientLayout>
        </Suspense>
      </body>
    </html>
  )
}