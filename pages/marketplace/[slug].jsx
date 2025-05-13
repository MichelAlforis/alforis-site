import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'
import AlforisHead from '@/components/AlforisHead'
import CTA from '@/components/ui/CallToAction'

const components = { CTA }

export default function OffrePage({ source, frontMatter }) {
  return (
    <main className="main-content px-6 py-12 max-w-4xl mx-auto text-anthracite">
      <AlforisHead
        title={`${frontMatter.title} – Alforis`}
        description={frontMatter.description || frontMatter.title}
        path={`/marketplace/${frontMatter.slug}`}
        image={frontMatter.image}
      />

      {frontMatter.image && (
        <img
          src={frontMatter.image}
          alt={frontMatter.title}
          className="w-full h-auto mb-8 rounded-lg shadow object-cover"
        />
      )}

      <h1 className="text-4xl font-title text-ardoise mb-6 leading-snug">
        {frontMatter.title}
      </h1>

      <article className="prose prose-lg max-w-none">
        <MDXRemote {...source} components={components} />
      </article>
    </main>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/offres'))
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(/\.mdx$/, '') }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content/offres', `${params.slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')

  const { content, data } = matter(source)
  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      source: mdxSource,
      frontMatter: { ...data, slug: params.slug }
    }
  }
}
