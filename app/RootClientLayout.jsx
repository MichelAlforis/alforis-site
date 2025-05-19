'use client'
// app/RootClientLayout.jsx

import React, { useState, useCallback } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import ClientSideScrollRestorer from './ClientSideScrollRestorer'
import Navbar from '@/app/Navbar'
import Footer from '@/app/Footer'
import MobileScrollProgress from '@/components/ui/MobileScrollProgress'
import CookieBannerOffsetHandler from '@/components/CookieBannerOffsetHandler'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootClientLayout({ children }) {
  const pathname = usePathname()
  const [cookieBannerHeight, setCookieBannerHeight] = useState(0)

  const handleBannerHeight = useCallback((height) => {
    setCookieBannerHeight(height)
    document.documentElement.style.setProperty('--cc-banner-height', `${height}px`)
  }, [])

  const initializeCookieConsent = () => {
    try {
      if (window.cookieconsent && typeof window.cookieconsent.initialise === 'function') {
        window.cookieconsent.initialise({
          palette: {
            popup: { background: 'var(--ardoise)', text: 'var(--ivoire)' },
            button: { background: 'var(--doré)', text: 'var(--anthracite)' }
          },
          position: 'top',
          theme: 'classic',
          type: 'opt-in',
          layout: 'basic',
          content: {
            header: 'Gestion des cookies',
            message: 'Ce site utilise des cookies pour vous garantir la meilleure expérience.',
            allow: 'Tout accepter',
            deny: 'Tout refuser',
            link: 'Personnaliser',
            href: '/politique-de-confidentialite'
          },
          onInitialise: (status) => {
            if (['allow', 'deny'].includes(status)) {
              document.body.classList.add('banner-dismissed')
            }
          },
          onStatusChange: (status) => {
            if (['allow', 'deny'].includes(status)) {
              document.body.classList.add('banner-dismissed')
            }
          }
        })
      }
    } catch (err) {
      console.error('Erreur lors de l’initialisation de CookieConsent:', err)
    }
  }

  return (
    <>
      {/* Restauration du scroll côté client */}
      <ClientSideScrollRestorer />

      {/* Progression mobile */}
      <MobileScrollProgress />

      {/* CookieConsent - script et initialisation */}
      <Script
        src="/cookieconsent.js"
        strategy="afterInteractive"
        onLoad={initializeCookieConsent}
        onError={(err) => console.error('CookieConsent script error:', err)}
      />
      <CookieBannerOffsetHandler onChange={handleBannerHeight} />

      {/* Google Tag Manager fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WSJ5RW24"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* En-tête fixe avec décalage dynamiques */}
      <header
        className="fixed inset-x-0 z-nav bg-ivoire/80 backdrop-blur-md transition-top"
        style={{ top: cookieBannerHeight }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-doré text-white p-2 rounded"
        >
          Aller au contenu
        </a>
        <Navbar />
      </header>

      {/* Contenu principal */}
      <main
        id="main-content"
        className={`main-content ${pathname === '/' ? 'home-content' : ''} transition-colors dark:bg-anthracite-900`}
      >
        {children}
      </main>

      {/* Pied de page */}
      <footer className="mt-auto bg-ivoire dark:bg-gray-900">
        <Footer />
      </footer>

      {/* Toasts notifications */}
      <ToastContainer position="bottom-right" theme="light" autoClose={3000} hideProgressBar />

      {/* Décorations et overlays */}
      <div className="fixed inset-0 pointer-events-none z-overlay" />
    </>
  )
}