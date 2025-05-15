'use client'

import { useState } from 'react'
import Script from 'next/script'
import Navbar from '@/app/Navbar'
import Footer from '@/app/Footer'
import MobileScrollProgress from '@/components/ui/MobileScrollProgress'
import CookieBannerOffsetHandler from '@/components/CookieBannerOffsetHandler'

export default function RootClientLayout({ children }) {
  const [cookieBannerHeight, setCookieBannerHeight] = useState(0)

  return (
    <>
      <MobileScrollProgress />

      {/* Bandeau CookieConsent injecté dynamiquement */}
      <Script
        src="/cookieconsent.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            if (
              window.cookieconsent &&
              typeof window.cookieconsent.initialise === 'function'
            ) {
              window.cookieconsent.initialise({
                palette: {
                  popup: {
                    background: 'var(--ardoise)',
                    text: 'var(--ivoire)',
                  },
                  button: {
                    background: 'var(--doré)',
                    text: 'var(--anthracite)',
                  },
                },
                position: 'top',
                theme: 'classic',
                type: 'opt-in',
                layout: 'basic',
                content: {
                  header: 'Gestion des cookies',
                  message:
                    'Ce site utilise des cookies pour vous garantir la meilleure expérience.',
                  allow: 'Tout accepter',
                  deny: 'Tout refuser',
                  link: 'Personnaliser',
                  href: '/politique-de-confidentialite',
                },
                onInitialise(status) {
                  if (status === 'allow' || status === 'deny') {
                    document.body.classList.add('banner-dismissed')
                  }
                },
                onStatusChange(status) {
                  if (status === 'allow' || status === 'deny') {
                    document.body.classList.add('banner-dismissed')
                  }
                },
              })
            }
          } catch (err) {
            console.error('Erreur lors de l’initialisation de CookieConsent:', err)
          }
        }}
      />

      {/* Décalage dynamique de la navbar selon la hauteur du bandeau cookie */}
      <CookieBannerOffsetHandler onChange={setCookieBannerHeight} />

      {/* Google Tag Manager fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WSJ5RW24"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Layout global */}
      <header
        className="fixed inset-x-0 z-nav"
        style={{ top: cookieBannerHeight }}
      >
        <Navbar />
      </header>

      <main
        style={{ cookieBannerHeight }}
      >
        {children}
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>

      {/* Décors ou effets scrollés globaux */}
      <div className="fixed inset-0 pointer-events-none z-overlay" />
    </>
  )
}
