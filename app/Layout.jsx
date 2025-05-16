// app/layout.jsx
import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/generated-colors.css'
import '@/styles/cookieconsent-theme-alforis.css'
import '@/styles/articles.css'
import '@babylonjs/loaders/glTF/2.0/Extensions/KHR_draco_mesh_compression';

import React from 'react'
import Head from './head'
import RootClientLayout from './RootClientLayout'
import ClientSideScrollRestorer from './ClientSideScrollRestorer';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');


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
