// lib/server/fetchAllContent.js

import fs from 'fs'
import path from 'path'

export async function fetchAllContent() {
  const folders = ['blog', 'studio', 'parcours']  // on ignore volontairement "offres"
  const allContent = []

  for (const folder of folders) {
    const dir = path.join(process.cwd(), 'content', folder)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir)

    // NE GARDER QUE .js ou .jsx
    const jsFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return (ext === '.js' || ext === '.jsx')
    })

    for (const file of jsFiles) {
      try {
        const mod = await import( 
          /* webpackInclude: /\.(js|jsx)$/ */
          `../../content/${folder}/${file}`
        )
        const meta = mod.meta
        if (meta) {
          const slug = file.replace(/\.(js|jsx)$/, '')
          const type = folder.charAt(0).toUpperCase() + folder.slice(1)
          allContent.push({ ...meta, slug, type })
        }
      } catch (err) {
        console.error(`Erreur import ${folder}/${file}:`, err)
      }
    }
  }

  return allContent
}
