// lib/makeMetadata.js
export function makeMetadata({ meta, slug, section }) {
  // Correction des chemins selon section
  let sectionPath
  switch (section) {
    case 'blog':
      sectionPath = 'blog'
      break
    case 'parcours':
      sectionPath = 'parcours'
      break
    case 'offres':
    case 'marketplace':
      sectionPath = 'marketplace'
      break
    case 'studio':
      sectionPath = 'studio'
      break
    default:
      sectionPath = section
  }
  const url = `https://www.alforis.fr/${sectionPath}/${slug}`
  const title = `${meta.title} – Alforis`
  const description = meta.description || meta.title

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Alforis',
      locale: 'fr_FR',
      type: 'article',
      images: meta.image ? [meta.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: meta.image ? [meta.image] : [],
    },
  }
}
