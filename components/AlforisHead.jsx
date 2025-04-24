import Head from 'next/head'

export default function AlforisHead({
  title = 'Alforis – Le patrimoine commence par l’humain',
  description = 'Un cabinet de design de trajectoire de vie. Découvrez notre approche centrée sur l’humain, la stratégie et la liberté patrimoniale.',
  path = '',
  image = '/assets/img/og-cover.jpg',
}) {
  const fullUrl = `https://www.alforis.fr${path}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
    </Head>
  )
}
