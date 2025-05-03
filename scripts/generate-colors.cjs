const fs = require('fs');
const path = require('path');
const config = require('../tailwind.config.js');

const colors = config.theme?.extend?.colors ?? {};
const customKeys = ["doré", "acier", "ardoise", "ivoire", "anthracite", "beigeClair"];
const customColors = Object.fromEntries(
  Object.entries(colors).filter(([key]) => customKeys.includes(key))
);

// 1. Générer colors.js pour React
const jsOutputPath = path.resolve(__dirname, '../lib/colors.js');
const jsContent = `export const couleurs = ${JSON.stringify(customColors, null, 2)};\n`;
fs.writeFileSync(jsOutputPath, jsContent, 'utf8');
console.log('✅ Fichier JS colors.js généré.');

// 2. Générer generated-cookieconsent.css
const cssVariables = Object.entries(customColors)
  .map(([key, value]) => `  --${key}: ${value};`)
  .join('\n');

const cssContent = `:root {\n${cssVariables}\n}\n`;

const cssOutputPath = path.resolve(__dirname, '../public/generated-cookieconsent.css');
fs.writeFileSync(cssOutputPath, cssContent, 'utf8');
console.log('✅ Fichier CSS generated-cookieconsent.css généré.');
