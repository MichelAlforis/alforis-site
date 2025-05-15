// app/layout.jsx
import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/generated-colors.css'
import '@/styles/cookieconsent-theme-alforis.css'
import '@/styles/articles.css'

import React from 'react'
import Head from './head'
import RootClientLayout from './RootClientLayout'
import ClientSideScrollRestorer from './ClientSideScrollRestorer';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" >
      <head><Head /></head>
      <body className="scroll-smooth">
        <ClientSideScrollRestorer />
        <RootClientLayout>
          {children}
        </RootClientLayout>
      </body>
    </html>
  )
}
