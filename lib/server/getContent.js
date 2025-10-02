// lib/server/getContent.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Liste tous les slugs (.mdx, .js, .jsx) d’un dossier content/{type}
 * @param {'offres'|'parcours'|'studio'|'blog'|'quizz'} type
 * @returns Array<{ slug: string }>
 */
export function getContentSlugs(type) {
  const dir = path.join(process.cwd(), 'content', type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => /\.(mdx|js|jsx)$/i.test(f))
    .map(f => ({ slug: f.replace(/\.[^.]+$/, '') }))
}

/**
 * Récupère les métadonnées et, pour les MDX, le contenu.
 * Pour les .js/.jsx, fait un import dynamique statique
 * @param {'offres'|'parcours'|'studio'|'blog'|'quizz'} type 
 * @param {string} slug 
 * @returns {Promise<{ meta: object, content: string|null } | null>}
 */
export async function getContentMeta(type, slug) {
  const dir = path.join(process.cwd(), 'content', type)

  // -- cas MDX
  const mdxPath = path.join(dir, `${slug}.mdx`)
  if (fs.existsSync(mdxPath)) {
    try {
      const raw = fs.readFileSync(mdxPath, 'utf8')
      const { data: meta, content } = matter(raw)
      return { meta, content }
    } catch (err) {
      console.error(`Erreur lecture MDX ${type}/${slug}:`, err)
      return null
    }
  }

  // -- cas JS ou JSX
  // NOTE : ces import() sont relatifs à CE FICHIER,
  // Webpack sait empaqueter tous les content/{type}/*.js(x)
  try {
    // premièrement on tente .js, si ça échoue on retente .jsx
    const mod = await import(`../../content/${type}/${slug}.js`)
      .catch(() => import(`../../content/${type}/${slug}.jsx`))
    const meta = mod.meta || mod.default?.meta || null
    return { meta, content: null }
  } catch (err) {
    console.error(`Erreur import JS/JSX ${type}/${slug}:`, err)
    return null
  }
}
