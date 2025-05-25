# Utilitaire `makeMetadata` pour Alforis

## Description

La fonction `makeMetadata` centralise la génération des métadonnées SEO/OG/Twitter pour toutes les pages dynamiques de la plateforme Alforis : blog, parcours, marketplace, studio.  
L’objectif est de garantir :
- une cohérence totale du SEO sur toutes les pages,
- un code DRY, facile à maintenir,
- la compatibilité parfaite avec Next.js 13/14/15 (app directory).

---

## Fonctionnement

```js
/**
 * Construit les métadonnées SEO/OG/Twitter pour une page dynamique.
 * 
 * @param {object}   meta     – Métadonnées du contenu (ex: title, description, image)
 * @param {string}   slug     – Slug dynamique de la page
 * @param {string}   section  – Nom de la section (blog, parcours, marketplace, studio)
 * @returns {object}          – Objet metadata compatible Next.js
 */
export function makeMetadata({ meta, slug, section }) {
  // Harmonisation du chemin URL selon la section
  let sectionPath
  switch (section) {
    case 'blog':
      sectionPath = 'blog'
      break
    case 'parcours':
      sectionPath = 'parcours'
      break
    case 'marketplace':
    case 'offres':
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

## Utilisation dans une page dynamique Next.js

// app/parcours/[slug]/page.jsx
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { makeMetadata } from '@/lib/makeMetadata'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = params
  const meta = await getContentMeta('parcours', slug)
  if (!meta) return { title: 'Parcours – Alforis' }
  return makeMetadata({ meta, slug, section: 'parcours' })
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs('parcours')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Page({ params }) {
  const { slug } = params
  const result = await getContentMeta('parcours', slug)
  if (!result?.meta) notFound()
  // ... rendering logic
}
## Astuces
DRY : Ce helper peut être appelé dans toutes les routes dynamiques (blog, studio, marketplace, parcours, etc).

Centralisation : Si tu veux changer une règle SEO ou OG pour tout le site, modifie une seule fonction.

Sécurité : Si meta est incomplet, la fonction gère le fallback du titre et de la description.

Adaptabilité : Ajoute facilement d’autres sections en éditant le switch.

Exemple d’intégration dans d’autres pages

// app/blog/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const { slug } = params
  const meta = await getContentMeta('blog', slug)
  if (!meta) return { title: 'Blog – Alforis' }
  return makeMetadata({ meta, slug, section: 'blog' })
}

// app/marketplace/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const { slug } = params
  const meta = await getContentMeta('offres', slug)
  if (!meta) return { title: 'Offres – Alforis' }
  return makeMetadata({ meta, slug, section: 'marketplace' })
}

// app/studio/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const { slug } = params
  const meta = await getContentMeta('studio', slug)
  if (!meta) return { title: 'Studio – Alforis' }
  return makeMetadata({ meta, slug, section: 'studio' })
}
## Localisation du helper
Place ce fichier dans /lib/makeMetadata.js ou /lib/makeMetadata.ts selon ton stack.

## Modifications avancées
Pour ajouter des champs OG/Twitter spécifiques, complète l’objet retourné dans la fonction.

Pour adapter la structure des URLs, modifie le switch ou la concaténation du chemin.

## Auteur
Automatisé et documenté par ChatGPT, validé par Michel Marques pour Alforis.
