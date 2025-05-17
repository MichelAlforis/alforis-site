'use client'
// app/RootClientLayout.jsx

import React, { useState, useEffect, useCallback } from 'react'
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

  const handleBannerHeight = useCallback(height => {
    setCookieBannerHeight(height)
    document.documentElement.style.setProperty('--cc-banner-height', `${height}px`)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cookieconsent) {
      window.cookieconsent.initialise({
        palette: {
          popup: { background: 'var(--ardoise)', text: 'var(--ivoire)' },
          button: { background: 'var(--doré)', text: 'var(--anthracite)' }
        },
        position: 'top', theme: 'classic', type: 'opt-in', layout: 'basic',
        content: {
          header: 'Gestion des cookies',
          message: 'Ce site utilise des cookies pour vous garantir la meilleure expérience.',
          allow: 'Tout accepter', deny: 'Tout refuser',
          link: 'Personnaliser', href: '/politique-de-confidentialite'
        },
        onInitialise: status => {
          if (['allow','deny'].includes(status)) document.body.classList.add('banner-dismissed')
        },
        onStatusChange: status => {
          if (['allow','deny'].includes(status)) document.body.classList.add('banner-dismissed')
        }
      })
    }
  }, [])

  return (
    <>
      {/* Restoration du scroll (ne sera jamais SSR) */}
      <ClientSideScrollRestorer />

      {/* Progression mobile */}
      <MobileScrollProgress />

      {/* CookieConsent */}
      <Script
        src="/cookieconsent.js"
        strategy="afterInteractive"
        onError={err => console.error('CookieConsent script error:', err)}
      />
      <CookieBannerOffsetHandler onChange={handleBannerHeight} />

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WSJ5RW24"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

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

      <main
        id="main-content"
        className={`main-content ${pathname === '/' ? 'home-content' : ''} transition-colors dark:bg-anthracite-900`}
      >
        {children}
      </main>

      <footer className="mt-auto bg-ivoire dark:bg-gray-900">
        <Footer />
      </footer>

      <ToastContainer position="bottom-right" theme="light" autoClose={3000} hideProgressBar />

      <div className="fixed inset-0 pointer-events-none z-overlay" />
    </>
  )
}
