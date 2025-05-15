import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Récupère les métadonnées pour une page individuelle (MDX ou JS/JSX)
 */
export function getContentMeta(type, slug) {
  const dir = path.join(process.cwd(), 'content', type)

  const mdxPath = path.join(dir, `${slug}.mdx`)
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf8')
    const { data, content } = matter(raw)
    return { meta: data, content }
  }

  const jsPath = path.join(dir, `${slug}.js`)
  const jsxPath = path.join(dir, `${slug}.jsx`)
  const filePath = fs.existsSync(jsPath) ? jsPath : fs.existsSync(jsxPath) ? jsxPath : null
  if (filePath) {
    const mod = require(filePath)
    const meta = mod.meta || mod.default?.meta
    return { meta, content: null }
  }

  return null
}

/**
 * Récupère tous les slugs d’un type (MDX, JS, JSX)
 */
export function getContentSlugs(type) {
  const dir = path.join(process.cwd(), 'content', type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => ['.mdx', '.js', '.jsx'].includes(path.extname(f).toLowerCase()))
    .map(f => ({ slug: f.replace(/\.[^.]+$/, '') }))
}

/**
 * Liste le contenu des répertoires blog, studio et offres (MDX, JS/JSX)
 */
export async function fetchAllContent() {
  const types = ['blog', 'studio', 'offres']
  const list = []

  for (const type of types) {
    const dir = path.join(process.cwd(), 'content', type)
    if (!fs.existsSync(dir)) continue
    const files = fs.readdirSync(dir).filter(f => ['.mdx', '.js', '.jsx'].includes(path.extname(f).toLowerCase()))

    for (const file of files) {
      try {
        const ext = path.extname(file).toLowerCase()
        const slug = file.replace(/\.[^.]+$/, '')
        if (ext === '.mdx') {
          const raw = fs.readFileSync(path.join(dir, file), 'utf8')
          const { data } = matter(raw)
          if (data.title) list.push({ ...data, slug, type: capitalize(type) })
        } else {
          const mod = await import(
            /* webpackInclude: /\\.(js|jsx)$/ */
            `../../content/${type}/${file}`
          )
          const meta = mod.meta || mod.default?.meta
          if (meta.title) list.push({ ...meta, slug, type: capitalize(type) })
        }
      } catch (e) {
        console.error(`Erreur import ${type}/${file}:`, e)
      }
    }
  }

  return list
}

/**
 * Liste le contenu du répertoire parcours (JS/JSX)
 */
export async function fetchAllParcours() {
  const dir = path.join(process.cwd(), 'content', 'parcours')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.js') || f.toLowerCase().endsWith('.jsx'))
  const items = []

  for (const file of files) {
    const slug = file.replace(/\.[^.]+$/, '')
    const filePath = path.join(dir, file)
    try {
      const { pathToFileURL } = await import('url')
      const moduleUrl = pathToFileURL(filePath).href
      const mod = await import(moduleUrl)
      const meta = mod.meta || mod.default?.meta
      if (meta?.title) {
        items.push({ ...meta, slug, type: 'Parcours' })
      }
    } catch (e) {
      console.error(`Erreur import parcours/${file}:`, e)
    }
  }

  return items
}
