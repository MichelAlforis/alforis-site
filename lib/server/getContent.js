import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Récupère les métadonnées et le contenu d’un fichier .mdx ou .jsx
 * @param {'offres'|'parcours'|'studio'|'blog'|'quizz'} type - Dossier dans /content
 * @param {string} slug - Nom du fichier sans extension
 * @returns {{ meta: object, content: string|null } | null}
 */
export function getContentMeta(type, slug) {
  const dir = path.join(process.cwd(), 'content', type)
  const mdxPath = path.join(dir, `${slug}.mdx`)
  const jsxPath = path.join(dir, `${slug}.jsx`)

  if (fs.existsSync(mdxPath)) {
    try {
      const raw = fs.readFileSync(mdxPath, 'utf8')
      const { data, content } = matter(raw)
      return { meta: data, content }
    } catch (err) {
      console.error(`Erreur lecture ${type}/${slug}.mdx:`, err)
      return null
    }
  }

  if (fs.existsSync(jsxPath)) {
    try {
      const mod = require(`../../content/${type}/${slug}.jsx`)
      const meta = mod.meta || mod.default?.meta || null
      return { meta, content: null }
    } catch (err) {
      console.error(`Erreur import ${type}/${slug}.jsx:`, err)
      return null
    }
  }

  return null
}

/**
 * Récupère la liste des slugs disponibles dans un dossier
 * @param {'offres'|'parcours'|'studio'|'blog'|'quizz'} type
 * @returns {Array<{ slug: string }>}
 */
export function getContentSlugs(type) {
  const dir = path.join(process.cwd(), 'content', type)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir)

  return files
    .filter(f => f.endsWith('.mdx') || f.endsWith('.jsx'))
    .map(f => ({ slug: f.replace(/\.[^.]+$/, '') }))
}
