// app/blog/[slug]/page.jsx
import remarkGfm from 'remark-gfm'
import { compileMDX } from 'next-mdx-remote/rsc'
import CTA from '@/components/ui/CallToAction'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'

const components = { CTA }


export async function generateMetadata({ params }) {
  const meta = getContentMeta('Blog', params.slug)
  if (!meta) return { title: 'Blog – Alforis' }

  const title = `${meta.title} – Alforis`
  const description = meta.description || meta.title
  const url = `https://www.alforis.fr/offres/${params.slug}`

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


export async function generateStaticParams() {
  const slugs = getContentSlugs('blog')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function BlogPage({ params }) {
  // 1) Await params for Next.js 15 dynamic routes
  const { slug } = await params

  // 2) Fetch raw MDX & metadata
  const result = await getContentMeta('blog', slug)
  if (!result?.meta) notFound()
  const { meta, content: rawMd } = result

  // 3) Compile MDX with GFM support & custom components
  const { content } = await compileMDX({
    source: rawMd,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  return (
     <>
     <head>
    {/* Breadcrumb ou lien retour */}
  <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
    <a href="/blog" className="inline-flex items-center gap-2 text-anthracite/80 hover:text-orange-430 text-sm font-medium transition">
      <span aria-hidden="true">←</span>
      Retour au blog
    </a>
  </div>
  </head> 
    <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
      {meta.image && (
        <img
          src={meta.image}
          alt={meta.title}
          className="w-full h-auto mb-8 rounded-lg shadow object-cover"
        />
      )}

      <h1 className="text-4xl font-title text-ardoise mb-6 leading-snug">
        {meta.title}
      </h1>

      <article className="prose-alforis">
        {/* Render the compiled MDX React nodes */}
        {content}
      </article>
    </main>
    </>
  )
}
