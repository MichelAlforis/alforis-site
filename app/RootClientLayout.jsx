'use client'
// app/RootClientLayout.jsx

import React, { useState, useCallback, useEffect } from 'react'
import Script from 'next/script'
import ClientSideScrollRestorer from './ClientSideScrollRestorer'
import Navbar from './Navbar'
import MobileScrollProgress from '@/components/ui/MobileScrollProgress'
import Footer from '@/app/Footer'
import CookieBannerOffsetHandler from '@/components/cookie/CookieBannerOffsetHandler'
import { ThemeProvider } from '@/styles/ThemeDark'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function RootClientLayout({ children }) {

  const [cookieBannerHeight, setCookieBannerHeight] = useState(0)

  const handleBannerHeight = useCallback((height) => {
    setCookieBannerHeight(height)
    document.documentElement.style.setProperty(
      '--cc-banner-height',
      `${height}px`
    )
  }, [])


  const initializeCookieConsent = () => {
    // 1. on empêche la bannière de s'afficher si l'utilisateur a déjà choisi
    const existing = window.localStorage.getItem('cookieconsent_status');
    if (existing) return;

    // 2. ON PATCH : on neutralise applyRevokeButton
    if (window.cookieconsent?.Popup?.prototype) {
      window.cookieconsent.Popup.prototype.applyRevokeButton = function() {
        // plus rien ici = plus de bouton injecté
      }
    }

    try {
      window.cookieconsent.initialise({
        palette: {
          popup:  { background: 'var(--ardoise)', text: 'var(--ivoire)' },
          button: { background: 'var(--doré)',   text: 'var(--anthracite)' }
        },
        position: 'top',
        theme: 'classic',
        type: 'opt-in',
        layout: 'basic',
        content: { /* … */ },
        onInitialise:   s => ['allow','deny'].includes(s) && document.body.classList.add('banner-dismissed'),
        onStatusChange: s => ['allow','deny'].includes(s) && document.body.classList.add('banner-dismissed')
      });

      // ← Patch : récupère la dernière instance créée
      setTimeout(() => {
        // Cherche la propriété contenant l'instance du popup
        for (let key in window.cookieconsent) {
          // On ne veut pas cc.hasInitialised ni cc.utils
          if (
            window.cookieconsent[key] &&
            typeof window.cookieconsent[key] === "object" &&
            typeof window.cookieconsent[key].revokeChoice === "function"
          ) {
            window.cc_popup = window.cookieconsent[key];
            break;
          }
        }
      }, 100); // petit délai pour laisser le temps à l'init
    } catch (err) {
      console.error('Erreur lors de l’initialisation de CookieConsent :', err)
    }

  }


  return (
    <>
      {/* Scroll ultrafin */}
      <ClientSideScrollRestorer />

      {/* Dark theme */}
      <ThemeProvider>
        
      {/* CookieConsent */}
      <Script
        src="/cookieconsent.js"
        strategy="afterInteractive"
        onLoad={initializeCookieConsent}
        onError={(err) => console.error('CookieConsent script error:', err)}
      />
      <CookieBannerOffsetHandler onChange={handleBannerHeight} />

      {/* GTM fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WSJ5RW24"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>


      {/* En-tête globale */}
        <Navbar />
        <MobileScrollProgress/>

      {/* Contenu des routes */}
      <main
        id="main-Rootclient"
        className={`transition-colors dark:bg-anthracite/90`}
      >
        {children}
      </main>

      {/* Pied de page */}
        <Footer />

      {/* Notifications toast */}
      <ToastContainer
        position="top-center"
        z-100 max-w-90
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Décor & overlays */}
      <div 
        id="global-overlay"
        className="fixed inset-0 pointer-events-none z-overlay"
      />
      </ThemeProvider>
    </>
  )
}
