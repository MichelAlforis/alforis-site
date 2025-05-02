// pages/parcours/index.jsx
import fs from 'fs'
import path from 'path'
import ParcoursGrid from '@/components/parcours/ParcoursGrid'

export async function getStaticProps() {
  const directory = path.join(process.cwd(), 'content/parcours')
  const files = fs.readdirSync(directory)

  const parcours = files.map((filename) => {
    const slug = filename.replace('.jsx', '')
    const module = require(`@/content/parcours/${slug}.jsx`)
    return {
      ...module.metadata,
      slug,
      type: 'Parcours',
    }
  })

  return {
    props: {
      content: parcours,
    },
  }
}

export default function ParcoursPage({ content }) {
  return <ParcoursGrid content={content} />
}
