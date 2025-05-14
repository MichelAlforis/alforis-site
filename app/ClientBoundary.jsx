// app/ClientBoundary.jsx
'use client'

import Script from 'next/script'
import Navbar from '@/app/Navbar'
import MobileScrollProgress from '@/components/ui/MobileScrollProgress'

export default function ClientBoundary({ children }) {
  return (
    <>
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
                    'Ce site utilise des cookies pour garantir son bon fonctionnement et analyser la fréquentation. Vous pouvez accepter ou personnaliser vos préférences.',
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
                      description:
                        'Les cookies sont utilisés pour améliorer votre navigation et analyser le trafic.',
                    },
                    {
                      title: 'Cookies essentiels',
                      description:
                        'Indispensables au bon fonctionnement du site. Ils ne peuvent pas être désactivés.',
                      toggle: { value: 'necessary', enabled: true, readonly: true },
                    },
                    {
                      title: 'Cookies de performance',
                      description:
                        'Permettent d’obtenir des statistiques d’utilisation anonymes.',
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
              'CookieConsent non initialisé : initCookieConsent() ni cookieconsent.initialise() non trouvés'
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

      {/* Scroll restoration & Progress */}
      <MobileScrollProgress />

      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-nav">
        <Navbar />
      </header>

      {children}
    </>
  )
}

