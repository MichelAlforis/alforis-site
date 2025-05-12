import '@/styles/globals.css';
import '@/styles/navbar.css';  // Importez votre fichier navbar.css
import '@/styles/generated-colors.css'; // Importez votre fichier generated-colors.css
import '@/styles/cookieconsent-theme-alforis.css'; // Importez cookieconsent-theme-alforis.css
// ❌ Ne surtout pas importer les fichiers de /public via import : ils doivent être liés dans `_document.js`, pas ici

import { useEffect } from 'react';
import Layout from '@/app/Layout';
import AlforisHead from '@/components/AlforisHead';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const tryInit = () => {
      if (window.initCookieConsent) {
        const cc = window.initCookieConsent();
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
                description: 'Ce site utilise des cookies pour garantir son bon fonctionnement et analyser la fréquentation. Vous pouvez accepter ou personnaliser vos préférences.',
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
                    description: 'Les cookies sont utilisés pour améliorer votre navigation et analyser le trafic.',
                  },
                  {
                    title: 'Cookies essentiels',
                    description: 'Indispensables au bon fonctionnement du site. Ils ne peuvent pas être désactivés.',
                    toggle: {
                      value: 'necessary',
                      enabled: true,
                      readonly: true,
                    },
                  },
                  {
                    title: 'Cookies de performance',
                    description: 'Permettent d’obtenir des statistiques d’utilisation anonymes.',
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
        });
      } else {
        setTimeout(tryInit, 100); // attend que le script soit chargé
      }
    };
    tryInit();
  }, []);
  
  return (
    <>
      <AlforisHead
        title="_app – Alforis"
        description="Découvrez notre approche patrimoniale sur mesure à travers notre page _app."
        path="/_app"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
