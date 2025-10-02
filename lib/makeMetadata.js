// lib/makeMetadata.js
export function makeMetadata({ meta, slug, section }) {
  // Correction des chemins selon section
  let sectionPath;
  switch (section) {
    case 'blog':
      sectionPath = 'blog';
      break;
    case 'parcours':
      sectionPath = 'parcours';
      break;
    case 'offres':
    case 'marketplace':
      sectionPath = 'marketplace';
      break;
    case 'studio':
      sectionPath = 'studio';
      break;
    default:
      sectionPath = section;
  }

  const url = `https://www.alforis.fr/${sectionPath}/${slug}`;

  // 🟢 Titre SAFE : Jamais undefined, jamais vide, jamais marque concaténée
  let fallbackTitle;
  switch (sectionPath) {
    case 'blog': fallbackTitle = 'Blog'; break;
    case 'marketplace': fallbackTitle = 'Offre'; break;
    case 'studio': fallbackTitle = 'Studio'; break;
    case 'parcours': fallbackTitle = 'Parcours'; break;
    default: fallbackTitle = 'Alforis';
  }
  const title = meta?.title || fallbackTitle;
  const description = meta?.description || meta?.title || fallbackTitle;

  return {
    title,        // <- PAS DE MARQUE ICI !
    description,
    alternates: { canonical: url },
    openGraph: {
      title,      // <- PAS DE MARQUE ICI non plus (sinon double marque)
      description,
      url,
      siteName: 'Alforis',
      locale: 'fr_FR',
      type: 'article',
      images: meta?.image ? [meta.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: meta?.image ? [meta.image] : [],
    },
  }
}
