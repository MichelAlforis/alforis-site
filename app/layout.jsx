// app/layout.jsx
import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/generated-colors.css'
import '@/styles/cookieconsent-theme-alforis.css'
import '@/styles/articles.css'
import '@babylonjs/loaders/glTF/2.0/Extensions/KHR_draco_mesh_compression'

import React, { Suspense } from 'react'
import Head from './head'
import RootClientLayout from './RootClientLayout'
import Script from 'next/script'

// DRACO loader (SSR safe)
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

export default function Layout({ children }) {
  return (
    <html lang="fr">
      <head>
        <Head />

        {/* 1. Charger le bundle cookieconsent.js (public ou CDN) */}
        <Script
          src="/cookieconsent/cookieconsent.min.js"
          strategy="afterInteractive"
        />

        {/* 2. Initialiser le bandeau juste après l'interactive */}
        <Script id="init-cookieconsent" strategy="afterInteractive">
          {`
            window.cookieconsent.initialise({
              palette: {
                popup: { background: "#fff", text: "#333" },
                button: { background: "#f1d600", text: "#000" }
              },
              theme: "alforis",
              content: {
                message: "Nous utilisons des cookies pour améliorer votre expérience.",
                dismiss: "J'accepte",
                link: "En savoir plus",
                href: "/politique-de-cookies"
              },
              onInitialise: function(status) {
                console.log("CookieConsent status:", status);
              },
              onStatusChange: function(status, chosenBefore) {
                console.log("CookieConsent changé :", status);
              }
            });
          `}
        </Script>

        {/* 3. Votre script vh mobile-first */}
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
