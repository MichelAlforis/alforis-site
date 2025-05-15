// app/blog/[slug]/page.jsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import CTA from '@/components/ui/CallToAction'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'


const components = { CTA }

export async function generateStaticParams() {
  return getContentSlugs('blog')
}

export default async function BlogPage({ params }) {
  const result = getContentMeta('blog', params.slug)
  if (!result || !result.meta) notFound()

  const { meta, content } = result

  return (
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

      <article className="prose prose-lg max-w-none">
        {content && <MDXRemote source={content} components={components} />}
      </article>
    </main>
  )
}
