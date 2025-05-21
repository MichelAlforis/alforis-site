// app/layout.jsx
import '@/styles/globals.css'

import React, { Suspense } from 'react'
import RootClientLayout from './RootClientLayout'
import Script from 'next/script'


export default function Layout({ children }) {


  return (
    <html lang="fr">
      <head>
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
