import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="description" content="Cabinet de conseil patrimonial haut de gamme." />
        {/* ❌ À retirer selon les recommandations Next.js : */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        
        <link rel="canonical" href="https://alforis.fr/" />

        {/* ✅ Feuilles de style côté client */}
        <link rel="stylesheet" href="/styles/cookieconsent-theme-alforis.css" />
        <link rel="stylesheet" href="/styles/generated-colors.css" />
        <link rel="stylesheet" href="/styles/navbar.css" /> {/* Ajout de navbar.css */}

        {/* ✅ Script différé */}
        <script src="/cookieconsent.umd.js" defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
