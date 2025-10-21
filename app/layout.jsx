// app/layout.jsx
import '@/styles/globals.css'
import React, { Suspense } from 'react'
import RootClientLayout from './RootClientLayout'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { headers } from 'next/headers'

export const metadata = {
  metadataBase: new URL('https://www.alforis.fr'),
  title: { default: 'Alforis — Cabinet de conseil patrimonial haut de gamme', template: '%s — Alforis' },
  description: 'Découvrez notre approche patrimoniale sur mesure.'
}

export default async function Layout({ children, params = {} }) {
  const locale = typeof params.locale === 'string' ? params.locale : 'fr'
  const messages = await getMessages({ locale })
  const headerList = await headers()
  const matchedPath =
    headerList.get('x-invoke-path') ??
    headerList.get('x-matched-path') ??
    ''
  const initialContext = matchedPath.includes('/b2b')
    ? 'b2b'
    : matchedPath.includes('/particulier')
      ? 'particulier'
      : 'particulier'

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <Script id="update-vh" strategy="afterInteractive">{`
          function updateVh(){document.documentElement.style.setProperty('--vh', window.innerHeight*0.01+'px');}
          window.addEventListener('resize', updateVh); updateVh();
        `}</Script>
      </head>
      <body className="scroll-smooth font-roboto">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Suspense fallback={null}>
            <RootClientLayout
              footerMessages={messages?.footer}
              initialContext={initialContext}
            >
              {children}
            </RootClientLayout>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
