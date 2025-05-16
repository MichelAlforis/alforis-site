const fs = require('fs');
const path = require('path');

// Liste des hooks Next à traquer
const hooks = [
  'useSearchParams',
  'useRouter',
  'usePathname',
  'useSelectedLayoutSegments',
  'useSelectedLayoutSegment',
];

// Recherche récursive
function searchFiles(dir, report = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      searchFiles(filePath, report);
    } else if (/page\.(js|jsx|ts|tsx)$/.test(file)) {
      const content = fs.readFileSync(filePath, 'utf8');
      // 1. On check "use client"
      const isClient = content.match(/['"]use client['"]/);
      // 2. On check hook Next interdit
      hooks.forEach(hook => {
        if (content.includes(hook)) {
          report.push({
            file: filePath,
            hook,
            isClient,
          });
        }
      });
    }
  });
  return report;
}

const appDir = path.resolve(__dirname, 'app');
const badPages = searchFiles(appDir);

if (badPages.length === 0) {
  console.log('✅ Aucun usage dangereux de hooks client dans les pages !');
} else {
  console.log('❌ Problèmes détectés :\n');
  badPages.forEach(({ file, hook, isClient }) => {
    console.log(`- ${file} utilise ${hook}${isClient ? ' (avec "use client")' : ''}`);
  });
  console.log('\n⛔ Corrige ces fichiers :\n→ Déplace les hooks dans un composant enfant client !');
}
