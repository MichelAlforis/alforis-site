import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="description" content="Cabinet de conseil patrimonial haut de gamme." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://alforis.fr/" />
        <link rel="stylesheet" href="/styles/cookieconsent-theme-alforis.css" />
        <script src="/cookieconsent.umd.js" defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
