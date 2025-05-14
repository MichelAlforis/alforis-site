import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import CTA from '@/components/ui/CallToAction'

const components = { CTA }

/* -------------------------------------------------------------------------- */
/* 1. Génération statique des chemins                                         */
/* -------------------------------------------------------------------------- */
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/offres')
  const files = fs.readdirSync(dir)

  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

/* -------------------------------------------------------------------------- */
/* 3. Page composant (server component)                                       */
/* -------------------------------------------------------------------------- */
export default async function OffrePage({ params }) {
  const filePath = path.join(process.cwd(), 'content/offres', `${params.slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)

  return (
    <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-auto mb-8 rounded-lg shadow object-cover"
        />
      )}

      <h1 className="text-4xl font-title text-ardoise mb-6 leading-snug">
        {data.title}
      </h1>

      <article className="prose prose-lg max-w-none">
        <MDXRemote source={content} components={components} />
      </article>
    </main>
  )
}
