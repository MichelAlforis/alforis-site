// lib/server/fetchAllContent.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createRequire } from 'module'

const requireModule = createRequire(import.meta.url)
const CONTENT_DIR = path.join(process.cwd(), 'content')

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Récupère tout le contenu MDX et JS/JSX pour blog, studio et offres
 * @returns {Promise<Array<object>>}
 */
export async function fetchAllContent() {
  const types = ['blog', 'studio', 'offres']
  const all = []

  for (const type of types) {
    const dir = path.join(CONTENT_DIR, type)
    if (!fs.existsSync(dir)) continue

    const files = fs
      .readdirSync(dir)
      .filter((f) =>
        ['.mdx', '.js', '.jsx'].includes(path.extname(f).toLowerCase())
      )

    for (const file of files) {
      const ext = path.extname(file).toLowerCase()
      const slug = file.replace(/\.[^.]+$/, '')
      const filePath = path.join(dir, file)

      try {
        if (ext === '.mdx') {
          const raw = fs.readFileSync(filePath, 'utf8')
          const { data } = matter(raw)
          if (data.title) all.push({ ...data, slug, type: capitalize(type) })
        } else {
          const mod = requireModule(filePath)
          const meta = mod.meta || mod.default?.meta
          if (meta?.title) all.push({ ...meta, slug, type: capitalize(type) })
        }
      } catch (err) {
        console.error(`Erreur chargement ${type}/${file}:`, err)
      }
    }
  }

  return all
}
