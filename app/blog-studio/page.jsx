// app/blog-studio/page.jsx
import React from 'react'
import PageLayout from '@/components/page/PageLayout'
import BlogStudioContent from './BlogStudioContent'
import { fetchAllContent } from '@/lib/server/fetchAllContent'

// ─── PAGE CONFIG ─────────────────────────────────────────────────────────────
export const pageConfig = {
  title: 'Blog & Studio',
  description: 'Vision libre et sans filtre du patrimoine – articles, vidéos et réflexions.',
  tabs: [
    { label: 'Tous',      key: 'All'       },
    { label: '🎙️ Studio', key: 'Studio'    },
    { label: '📝 Blog',    key: 'Blog'      },
    { label: '⭐ Favoris',  key: 'Favorites' }
  ]
}

// ─── SEO META (server) ──────────────────────────────────────────────────────
export async function generateMetadata() {
  return {
    title: 'Blog & Studio – Alforis',
    description:
      'Vision libre et sans filtre du patrimoine. Vidéos, réflexions, articles stratégiques.',
    keywords: [
      'studio patrimoine',
      'blog gestion de patrimoine',
      'stratégie patrimoniale',
    ],
    openGraph: {
      title: 'Blog & Studio – Alforis',
      description:
        'Vision libre et sans filtre du patrimoine. Vidéos, réflexions, articles stratégiques.',
      url: 'https://www.alforis.fr/blog-studio',
      siteName: 'Alforis',
      locale: 'fr_FR',
      type: 'website',
      images: ['/assets/img/og/blog-studio.png'],
    },
    alternates: { canonical: 'https://www.alforis.fr/blog-studio' },
  }
}


// ─── PAGE PRINCIPALE (Server Component) ─────────────────────────────────────
export default async function Page() {
  const all     = await fetchAllContent()
  const content = all.filter(item => ['Blog','Studio'].includes(item.type))

  // On ne passe **que** la data au Client Component
  return <BlogStudioContent content={content} />
}
