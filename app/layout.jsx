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
    images: ['/assets/img/og/home.png'],
  },
  alternates: { canonical: 'https://www.alforis.fr/' },
}


export default function Layout({ children }) {


  return (
    <html lang="fr">
      <head>
        {/* 3) Votre script vh mobile-first */}
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

      <body className="scroll-smooth">
        <Suspense fallback={null}>
          <RootClientLayout>
            {children}
          </RootClientLayout>
        </Suspense>
      </body>
    </html>
  )
}
