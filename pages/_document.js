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
        <link rel="stylesheet" href="/styles/generated-colors.css" />

        {/* ✅ Script différé */}
        <script src="/cookieconsent.umd.js" defer></script>

        {/* ✅ Image en Preload */}
        <link rel="preload" as="image" href="/assets/img/home/M_intro.webp" type="image/webp"/>
        
        {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'}); var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WSJ5RW24');`
            }}
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
