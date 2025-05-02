// pages/blog-studio.jsx
import BlogStudioGrid from '@/components/blog/BlogStudioGrid'
import { fetchAllContent } from '@/lib/server/fetchAllContent'

export async function getStaticProps() {
  const content = await fetchAllContent()
  console.log('✅ Articles chargés :', content)
  return { props: { content } }
}

export default function BlogStudioPage({ content }) {
  return <BlogStudioGrid content={content} />
}
