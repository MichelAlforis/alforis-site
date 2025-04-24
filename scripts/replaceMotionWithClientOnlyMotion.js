// replaceMotionWithClientOnlyMotion.js
const fs = require('fs');
const path = require('path');

const validExtensions = ['.jsx', '.tsx', '.js', '.ts', '.mdx'];
const ignoredDirs = ['node_modules', '.git', '.next', 'public', '.vscode', 'out'];

let modifiedFiles = 0;
let totalMotionTags = 0;

const walkDir = (dir, callback) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        walkDir(fullPath, callback);
      } else {
        console.log(`🚫 Dossier ignoré : ${file}`);
      }
    } else {
      callback(fullPath);
    }
  });
};

const transformFile = (filePath) => {
  const ext = path.extname(filePath);
  if (!validExtensions.includes(ext)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  const motionRegex = /motion\.(\w+)/g;
  let match;
  const tagsFound = [];

  while ((match = motionRegex.exec(content)) !== null) {
    tagsFound.push(match[1]);
  }

  if (tagsFound.length === 0) {
    console.log(`❌ Aucun tag motion.* trouvé dans ${filePath}`);
    return;
  }

  // Remplacement
  content = content.replace(motionRegex, 'ClientOnlyMotion.$1');

  // Ajout de l'import si manquant
  const hasClientOnlyImport = content.includes('ClientOnlyMotion');
  const hasMotionImport = content.match(/import\s+\{[^}]*motion[^}]*\}\s+from\s+['"]framer-motion['"]/);
  const hasUseClient = content.startsWith("'use client'");

  if (!hasClientOnlyImport && hasMotionImport) {
    const lines = content.split('\n');
    const insertIndex = hasUseClient ? 1 : 0;
    lines.splice(insertIndex, 0, `import ClientOnlyMotion from '@/hooks/ClientOnlyMotion'`);
    content = lines.join('\n');
  }

  // Sauvegarde
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.relative('.', filePath)} → Remplacements effectués sur : ${tagsFound.join(', ')}`);
    modifiedFiles++;
    totalMotionTags += tagsFound.length;
  }
};

console.log(`\n🚀 Démarrage du remplacement de motion.* par ClientOnlyMotion.*...\n`);
walkDir('./', transformFile);
console.log(`\n🧾 Résumé : ${modifiedFiles} fichier(s) modifié(s), ${totalMotionTags} balise(s) remplacée(s).`);
