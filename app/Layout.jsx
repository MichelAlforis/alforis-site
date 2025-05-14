// app/layout.jsx
'use client'

import React from 'react'
import { ScrollRestoration } from 'next/navigation'
import Navbar from '@/app/Navbar'
import Footer from '@/app/Footer'
import MobileScrollProgress from '@/components/ui/MobileScrollProgress'
import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="scroll-smooth bg-ivoire text-anthracite">
        {/* Scroll top natif à chaque navigation */}
        <ScrollRestoration />

        {/* Progress bar mobile */}
        <MobileScrollProgress />

        {/* Navbar fixe */}
        <header className="fixed inset-x-0 top-0 z-nav">
          <Navbar />
        </header>

        {/* Contenu principal, avec un padding-top pour laisser place à la navbar */}
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto">
          <Footer />
        </footer>
      </body>
    </html>
  )
}
