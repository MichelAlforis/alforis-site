import path from 'path'
import fs from 'fs'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import CTA from '@/components/ui/CallToAction.jsx'

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(blogDir)

  const paths = files
    .filter((file) => file.endsWith('.js') || file.endsWith('.jsx'))
    .map((file) => ({
      params: { slug: file.replace(/\.jsx?$/, '') },
    }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const mod = await import(`../../content/blog/${slug}.jsx`)
  const meta = mod.meta || {}

  return {
    props: {
      slug,
      meta,
    },
  }
}

const BlogArticle = ({ slug, meta }) => {
  const DynamicComponent = dynamic(() =>
    import(`../../content/blog/${slug}.jsx`).then((mod) => mod.default)
  )

  return (
    <main className="main-content bg-ivoire text-anthracite py-16 px-4 md:px-12">
      <Head>
        <title>{meta.title} | Alforis</title>
        <meta name="description" content={meta.description} />
        {meta.image && <meta property="og:image" content={meta.image} />}
      </Head>

    <article className="max-w-3xl mx-auto fade-anim">
            {/* Titre principal */}
            <h1 className="text-4xl md:text-5xl font-title text-ardoise mb-6 leading-snug mt-40">
              {meta.title}
            </h1>

            {/* Image d’en-tête */}
            {meta.image && (
              <img
                src={meta.image}
                alt={meta.title}
                className="w-full max-h-[400px] h-auto mb-8 rounded-lg shadow object-cover"
              />
            )}
        <DynamicComponent />
        <CTA />
      </article>
    </main>
  )
}

export default BlogArticle
