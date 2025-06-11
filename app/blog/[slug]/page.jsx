import remarkGfm from 'remark-gfm'
import { compileMDX } from 'next-mdx-remote/rsc'
import CTA from '@/components/ui/CallToAction'
import { getContentMeta, getContentSlugs } from '@/lib/server/getContent'
import { notFound } from 'next/navigation'
import { makeMetadata } from '@/lib/makeMetadata'

const components = { CTA }

export async function generateMetadata({ params }) {
  console.log('>>> METADATA PARAMS', params)
  const { slug } = params
  const meta = await getContentMeta('blog', slug)
  return makeMetadata({ meta: meta || {}, slug, section: 'blog' })
}

export async function generateStaticParams() {
  const slugs = await getContentSlugs('blog')
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function Page({ params }) {
  const { slug } = params; // <-- The fix is applied here
  const result = await getContentMeta('blog', slug);
  if (!result?.meta) notFound();
  const { meta, content: rawMd } = result;

  const { content } = await compileMDX({
    source: rawMd,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <>
      <section>
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
          <a href="/blog" className="inline-flex items-center gap-2 text-anthracite/80 hover:text-orange-430 text-sm font-medium transition">
            <span aria-hidden="true">←</span>
            Retour au blog
          </a>
        </div>
      </section>
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
          {content}
        </article>
      </main>
    </>
  );
}