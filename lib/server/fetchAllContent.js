import fs from 'fs'
import path from 'path'

export async function fetchAllContent() {
  const folders = ['blog', 'studio', 'parcours']  // Liste des dossiers
  const allContent = []

  console.log("🟢 Début de fetchAllContent")

  // Pour chaque dossier (blog, studio, parcours)
  for (const folder of folders) {
    const dir = path.join(process.cwd(), 'content', folder)  // chemin du dossier
    console.log(`📁 Lecture du dossier : ${dir}`)

    // Vérification si le dossier existe
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️ Dossier introuvable : ${dir}`)
      continue
    }

    const files = fs.readdirSync(dir)  // Lecture des fichiers dans le dossier
    console.log(`📄 Fichiers trouvés dans ${folder}:`, files)

    // Filtrer les fichiers .jsx valides (pas de backups, pas de fichiers cachés)
    const jsxFiles = files.filter(
      (file) =>
        (file.endsWith('.js') || file.endsWith('.jsx')) &&
        !file.startsWith('.') &&
        !file.toLowerCase().includes('backup') &&
        !file.includes('[')
    )

    console.log(`✅ Fichiers valides :`, jsxFiles)

    // Pour chaque fichier valide
    for (const file of jsxFiles) {
      try {
        // Import dynamique du module
        console.log(`📦 Tentative d'import de : ../../content/${folder}/${file}`)
        const mod = await import(`../../content/${folder}/${file}`)
        const meta = mod.meta

        if (meta) {
          const slug = file.replace(/\.jsx?$/, '')  // Génération du slug à partir du nom du fichier
          const type = folder.charAt(0).toUpperCase() + folder.slice(1)  // Nom du type (ex : Blog, Studio, Parcours)
          console.log(`✅ Contenu ajouté : ${slug} (${type})`)

          // Ajouter au tableau global de contenu
          allContent.push({ ...meta, slug, type })
        } else {
          console.warn(`❌ Pas de meta dans : ${file}`)
        }
      } catch (err) {
        console.error(`❌ Erreur d'import pour ${file}:`, err)
      }
    }
  }

  console.log("🟢 Contenu total retourné :", allContent)
  return allContent
}
