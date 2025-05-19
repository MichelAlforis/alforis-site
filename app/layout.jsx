// app/layout.jsx
import '@/styles/globals.css'



import React, { Suspense } from 'react'
import Head from './head'
import RootClientLayout from './RootClientLayout'
import Script from 'next/script'



export default function Layout({ children }) {
  return (
    <html lang="fr">
      <head>
        <Head />

        {/* 1) Charger le bundle cookieconsent */}
        <Script
          src="/cookieconsent.js"
          strategy="afterInteractive"
        />

        {/* 2) Initialiser COOKIECONSENT via un inline script */}
        <Script
          id="init-cookieconsent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var cc = window.initCookieConsent();
                cc.run({
                  current_lang: 'fr',
                  autoclear_cookies: true,
                  theme_css: 'alforis',
                  palette: {
                    popup: { background: '#fff', text: '#333' },
                    button: { background: '#f1d600', text: '#000' }
                  },
                  content: {
                    message: 'Nous utilisons des cookies pour améliorer votre expérience.',
                    dismiss: "J'accepte",
                    link: 'En savoir plus',
                    href: '/politique-de-cookies'
                  },
                  onInitialise: function(status) {
                    console.log('CookieConsent status:', status);
                  },
                  onStatusChange: function(status, chosenBefore) {
                    console.log('CookieConsent changé :', status);
                  }
                });
              })();
            `
          }}
        />

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
