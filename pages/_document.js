// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta
          name="description"
          content="Cabinet de conseil patrimonial haut de gamme."
        />
        <link rel="canonical" href="https://alforis.fr/" />
        <link
          rel="preload"
          as="image"
          href="/assets/img/home/M_intro.webp"
          type="image/webp"
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WSJ5RW24"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
