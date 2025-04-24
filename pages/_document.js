'use client'
import AlforisHead from '@/components/AlforisHead'
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <AlforisHead title="ApprochePersonnalisee – Alforis" description="Découvrez notre approche patrimoniale sur mesure à travers notre page approchepersonnalisee." path="/ApprochePersonnalisee" />
<Head>
        <title>Approche personnalisée de gestion patrimoniale | Alforis</title>
        <meta
          name="description"
          content="Découvrez la méthode Alforis : une approche structurée et humaine de la gestion patrimoniale."
        />
        <meta
          name="keywords"
          content="approche gestion de patrimoine, stratégie patrimoniale, modélisation patrimoniale"
        />
        <link rel="canonical" href="https://www.alforis.fr/approche-personnalisee" />
      </Head>
      
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
