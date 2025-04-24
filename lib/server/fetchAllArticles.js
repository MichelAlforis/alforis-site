import fs from 'fs'
import path from 'path'

export async function fetchAllArticles() {
  const folders = ['blog', 'studio']
  const all = []

  console.log("🟢 Début de fetchAllArticles")

  for (const folder of folders) {
    const dir = path.join(process.cwd(), 'content', folder)
    console.log(`📁 Lecture du dossier : ${dir}`)

    if (!fs.existsSync(dir)) {
      console.warn(`⚠️ Dossier introuvable : ${dir}`)
      continue
    }

    const files = fs.readdirSync(dir)
    console.log(`📄 Fichiers trouvés dans ${folder}:`, files)

    const jsxFiles = files.filter(
      (file) =>
        (file.endsWith('.js') || file.endsWith('.jsx')) &&
        !file.startsWith('.') &&
        !file.toLowerCase().includes('backup') &&
        !file.includes('[')
    )

    console.log(`✅ Fichiers valides :`, jsxFiles)

    for (const file of jsxFiles) {
      try {
        console.log(`📦 Tentative d'import de : ../../content/${folder}/${file}`)
        const mod = await import(`../../content/${folder}/${file}`)
        const meta = mod.meta

        if (meta) {
          const slug = file.replace(/\.jsx?$/, '')
          const type = folder.charAt(0).toUpperCase() + folder.slice(1)
          console.log(`✅ Article ajouté : ${slug} (${type})`)
          all.push({ ...meta, slug, type })
        } else {
          console.warn(`❌ Pas de meta dans : ${file}`)
        }
      } catch (err) {
        console.error(`❌ Erreur d'import pour ${file}:`, err)
      }
    }
  }

  console.log("🟢 Contenu total retourné :", all)
  return all
}
