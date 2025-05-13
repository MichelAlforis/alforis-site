import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function fetchAllOffres() {
  const dir = path.join(process.cwd(), 'content/offres')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map((file) => {
    const source = fs.readFileSync(path.join(dir, file), 'utf8')
    const { data } = matter(source)
    return { ...data, slug: file.replace(/\.mdx$/, ''), type: 'Offre' }
  })
}
