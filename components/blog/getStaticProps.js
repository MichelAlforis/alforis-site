// pages/blog-studio.jsx
import BlogStudioGrid from '@/components/blog/BlogStudioGrid'
import { fetchAllArticles } from '@/lib/server/fetchAllArticles'

export async function getStaticProps() {
  const content = await fetchAllArticles()
  console.log('✅ Articles chargés :', content)
  return { props: { content } }
}

export default function BlogStudioPage({ content }) {
  return <BlogStudioGrid content={content} />
}
