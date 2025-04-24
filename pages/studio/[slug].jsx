import path from 'path'
import fs from 'fs'
import Head from 'next/head'
import dynamic from 'next/dynamic'

export async function getStaticPaths() {
  const studioDir = path.join(process.cwd(), 'content/studio')
  const files = fs.readdirSync(studioDir)

  const paths = files
    .filter((file) => file.endsWith('.js') || file.endsWith('.jsx'))
    .map((file) => ({
      params: { slug: file.replace(/\.jsx?$/, '') },
    }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const mod = await import(`../../content/studio/${slug}.jsx`)
  const meta = mod.meta || {}

  return {
    props: {
      slug,
      meta,
    },
  }
}

const StudioArticle = ({ slug, meta }) => {
  const DynamicComponent = dynamic(() =>
    import(`../../content/studio/${slug}.jsx`).then((mod) => mod.default)
  )

  return (
    <main className="main-content bg-ivoire text-anthracite py-16 px-4 md:px-12">
      <Head>
        <title>{meta.title} | Studio Alforis</title>
        <meta name="description" content={meta.description} />
        {meta.image && <meta property="og:image" content={meta.image} />}
      </Head>

      <article className="max-w-3xl mx-auto fade-anim">
        {meta.image && (
          <img
            src={meta.image}
            alt={meta.title}
            className="w-full max-w-[900px] mx-auto h-auto mb-8 rounded-lg shadow"
          />
        )}

        <h1 className="main-title text-center mb-12">{meta.title}</h1>
        <DynamicComponent />
      </article>
    </main>
  )
}

export default StudioArticle
