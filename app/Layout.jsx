'use client'
import Navbar from '@/app/Navbar'
import Footer from '@/app/Footer'
import IntroOverlay from '@/components/animated/IntroOverlay'
import ScrollManager from '@/components/animated/ScrollManager'
import MobileScrollProgress from '@/components/ui/MobileScrollProgress'
import React, { useState, useEffect } from 'react'

export default function Layout({ children }) {


  return (
    <>

    <body className="relative bg-ivoire text-anthracite">
      <div id="app-root" className="relative z-base">
        <header className="relative z-nav">
          <Navbar />
        </header>

        <main className="relative z-base">
          {children}
        </main>

        <footer className="relative z-footer">
          <Footer />
        </footer>

        {/* Eléments visuels par-dessus le contenu (ex: sceau, cookie, modales) */}
        <div className="fixed inset-0 pointer-events-none z-overlay">
          {/* Sceau, décor scrollé, ou effets visuels */}
        </div>
      </div>
    </body>
    </>
  );
}
