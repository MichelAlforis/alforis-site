// app/RootClientLayout.jsx
'use client'

import { ScrollRestoration } from 'next/navigation'
import Script from 'next/script'
import Navbar from '@/app/Navbar'
import Footer from '@/app/Footer'
import MobileScrollProgress from '@/components/ui/MobileScrollProgress'

export default function RootClientLayout({ children }) {
  return (
    <>
      {/* Scroll restoration & Progress */}
      <MobileScrollProgress />

      {/* Cookie Consent */}
      <Script
        src="/cookieconsent.umd.js"
        strategy="lazyOnload"
        onLoad={() => {
          const config = {
            current_lang: 'fr',
            autoclear_cookies: true,
            page_scripts: true,
            gui_options: {
              consent_modal: { layout: 'cloud', position: 'bottom center', transition: 'slide' },
              settings_modal: { layout: 'box', transition: 'slide' },
            },
            languages: {
              fr: {
                consent_modal: {
                  title: '🍪 Gestion des cookies',
                  description:
                    'Ce site utilise des cookies pour garantir son bon fonctionnement et analyser la fréquentation.',
                  primary_btn: { text: 'Accepter tout', role: 'accept_all' },
                  secondary_btn: { text: 'Paramétrer', role: 'settings' },
                },
                settings_modal: {
                  title: 'Préférences de cookies',
                  save_settings_btn: 'Enregistrer',
                  accept_all_btn: 'Tout accepter',
                  reject_all_btn: 'Tout refuser',
                  blocks: [
                    {
                      title: 'Utilisation des cookies 📊',
                      description: 'Amélioration de navigation et analyse de trafic.',
                    },
                    {
                      title: 'Cookies essentiels',
                      description: 'Indispensables. Non désactivables.',
                      toggle: { value: 'necessary', enabled: true, readonly: true },
                    },
                    {
                      title: 'Cookies de performance',
                      description: 'Statistiques anonymes.',
                      toggle: { value: 'analytics', enabled: false, readonly: false },
                    },
                  ],
                },
              },
            },
            theme_css: '/styles/cookieconsent-theme-alforis.css',
          }

          if (typeof window.initCookieConsent === 'function') {
            window.initCookieConsent().run(config)
          } else if (
            window.cookieconsent &&
            typeof window.cookieconsent.initialise === 'function'
          ) {
            window.cookieconsent.initialise(config)
          } else {
            console.error(
              'CookieConsent non initialisé'
            )
          }
        }}
      />

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WSJ5RW24"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Layout */}
      <header className="fixed inset-x-0 top-0 z-nav">
        <Navbar />
      </header>

      <main className="pt-16">{children}</main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    <div className="fixed inset-0 pointer-events-none z-overlay">
          {/* Sceau, décor scrollé, ou effets visuels */}
    </div>
    </>
  )
}
