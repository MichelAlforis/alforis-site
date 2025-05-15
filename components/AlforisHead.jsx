'use client'
// components/AlforisHead.jsx


import Head from 'next/head'
import { usePathname } from 'next/navigation'

const defaultTitle = "Alforis – Conseil haut de gamme"
const defaultDescription = "Alforis est un cabinet de design de trajectoire de vie, alliant expertise patrimoniale, indépendance et approche humaine."
const baseUrl = "https://www.alforis.fr"

export default function AlforisHead({ title = defaultTitle, description = defaultDescription, path, image }) {
  const pathname = usePathname()
  const fullPath = path || pathname
  const canonicalUrl = `${baseUrl}${fullPath}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Alforis" />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
    </Head>
  )
}
