const fs = require('fs');
const path = require('path');

const appDir = path.resolve(__dirname, 'app');
const pageFileRegex = /page\.(jsx?|tsx?)$/;

function findAllFiles(dir, filter = /.*/) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(findAllFiles(full, filter));
    } else if (filter.test(file)) {
      results.push(full);
    }
  });
  return results;
}

// 1. Trouve tous les fichiers marqués "use client"
const allJsFiles = findAllFiles(appDir, /\.(jsx?|tsx?)$/);
const clientModules = allJsFiles.filter(f =>
  fs.readFileSync(f, 'utf8').match(/['"]use client['"]/)
);

// 2. Trouve tous les fichiers page.jsx/tsx
const pageFiles = allJsFiles.filter(f => pageFileRegex.test(f));

// 3. Check si un page.jsx importe un composant "use client"
let found = [];
pageFiles.forEach(page => {
  const code = fs.readFileSync(page, 'utf8');
  clientModules.forEach(clientFile => {
    // Basename sans extension
    const base = path.basename(clientFile).replace(/\.(jsx?|tsx?)$/, '');
    // Cherche un import
    if (code.match(new RegExp(`from ['"][./]+.*${base}['"]`))) {
      found.push({
        page,
        clientFile,
        base
      });
    }
  });
});

if (!found.length) {
  console.log('✅ Aucun import direct de composant "use client" dans une page.');
} else {
  console.log('❌ Problèmes détectés :\n');
  found.forEach(({ page, clientFile, base }) => {
    console.log(
      `- ${page}\n    ↳ importe directement le composant client "${base}" (${clientFile})\n`
    );
  });
  console.log(
    '\n⛔ **Déplace l\'appel du composant client dans un composant intermédiaire SANS hook next, ou fais un import dynamique avec { ssr: false } dans un composant layout client !**\n'
  );
}

