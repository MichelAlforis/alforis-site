'use client'
import AlforisHead from '@/components/AlforisHead'

import { useEffect } from 'react'
import Script from 'next/script'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.initCookieConsent) {
      const cc = window.initCookieConsent()

      cc.run({
        current_lang: 'fr',
        autoclear_cookies: true,
        page_scripts: true,
        gui_options: {
          consent_modal: {
            layout: 'cloud',
            position: 'bottom center',
            transition: 'slide',
          },
          settings_modal: {
            layout: 'box',
            transition: 'slide',
          },
        },
        languages: {
          fr: {
            consent_modal: {
              title: '🍪 Gestion des cookies',
              description:
                'Ce site utilise des cookies pour garantir son bon fonctionnement et analyser la fréquentation. Vous pouvez accepter ou personnaliser vos préférences.',
              primary_btn: {
                text: 'Accepter tout',
                role: 'accept_all',
              },
              secondary_btn: {
                text: 'Paramétrer',
                role: 'settings',
              },
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
                  toggle: {
                    value: 'necessary',
                    enabled: true,
                    readonly: true,
                  },
                },
                {
                  title: 'Cookies de performance',
                  description:
                    'Permettent d’obtenir des statistiques d’utilisation anonymes.',
                  toggle: {
                    value: 'analytics',
                    enabled: false,
                    readonly: false,
                  },
                },
              ],
            },
          },
        },
        theme_css: '/styles/cookieconsent-theme-alforis.css',
      })
    }
  }, [])

  return (
    <>
      <AlforisHead title="_app – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page _app." path="/_app" />
<Script src="/cookieconsent.umd.js" strategy="beforeInteractive" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
