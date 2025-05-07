// generateFetchData.js
import fs from 'fs';
import path from 'path';

const fetchAllContent = async () => {
  const folders = ['blog', 'studio', 'parcours'];
  const allContent = [];

  for (const folder of folders) {
    const dir = path.join(process.cwd(), 'content', folder);
    const files = fs.readdirSync(dir);
    const jsxFiles = files.filter(file => file.endsWith('.jsx') && !file.startsWith('.'));

    for (const file of jsxFiles) {
      try {
        const mod = await import(`../../content/${folder}/${file}`);
        const meta = mod.meta;
        if (meta) {
          allContent.push({ ...meta, slug: file.replace(/\.jsx?$/, ''), type: folder });
        }
      } catch (err) {
        console.error(`Erreur d'importation de ${file}`, err);
      }
    }
  }

  // Sauvegarde les données dans un fichier JSON
  const fetchDataPath = path.join(process.cwd(), 'data', 'fetchData.json');
  fs.writeFileSync(fetchDataPath, JSON.stringify(allContent, null, 2));
  console.log("Données de fetchData générées avec succès !");
};

fetchAllContent().catch(console.error);
