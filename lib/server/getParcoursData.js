import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getParcoursData() {
  const contentDir = path.join(process.cwd(), 'content/quizz')
  const files = fs.readdirSync(contentDir)

  return files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(contentDir, filename), 'utf-8')
    const { data: meta } = matter(fileContent)
    return { ...meta, slug: `/quizz/${meta.slug}` }
  })
}
