// app/parcours/[slug]/page.jsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import ParcoursFormulaire from '@/components/parcours/ParcoursFormulaire'

/* 1. Static params */
export async function generateStaticParams() {
  const dir   = path.join(process.cwd(), 'content/parcours')
  const files = fs.readdirSync(dir)
  return files
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.jsx'))
    .map((f) => ({ slug: f.replace(/\.[^.]+$/, '') }))
}

/* 2. Dynamic metadata */
export async function generateMetadata({ params }) {
  const { slug } = params
  const dir   = path.join(process.cwd(), 'content/parcours')
  const mdxPath = path.join(dir, `${slug}.mdx`)
  const jsxPath = path.join(dir, `${slug}.jsx`)

  let data
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf8')
    data = matter(raw).data
  } else if (fs.existsSync(jsxPath)) {
    const mod = await import(`../../../content/parcours/${slug}.jsx`)
    data = mod.meta || mod.default?.meta
  } else {
    return { title: 'Parcours – Alforis' }
  }

  const title = `${data.title} – Alforis`
  const description = data.description || data.title
  const url = `https://www.alforis.fr/parcours/${slug}`

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
      images: data.image ? [data.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: data.image ? [data.image] : [],
    },
  }
}

/* 3. Page component */
export default async function ParcoursPage({ params }) {
  const { slug } = params
  const dir   = path.join(process.cwd(), 'content/parcours')
  const mdxPath = path.join(dir, `${slug}.mdx`)
  const jsxPath = path.join(dir, `${slug}.jsx`)

  let meta
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf8')
    meta = matter(raw).data
  } else if (fs.existsSync(jsxPath)) {
    const mod = await import(`../../../content/parcours/${slug}.jsx`)
    meta = mod.meta || mod.default?.meta
  } else {
    notFound()
  }

  if (!meta) notFound()

  return <ParcoursFormulaire meta={meta} slug={slug} />
}
