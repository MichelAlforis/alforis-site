const fs = require('fs');
const path = require('path');
const config = require('../tailwind.config.js');

// 1. Récupération des couleurs personnalisées
const colors = config.theme?.extend?.colors ?? {};
const customKeys = ["doré", "acier", "ardoise", "ivoire", "anthracite", "beigeClair"];
const customColors = Object.fromEntries(
  Object.entries(colors).filter(([key]) => customKeys.includes(key))
);

// 2. Générer un fichier JS à importer dans React (dans /styles)
const jsOutputPath = path.resolve(__dirname, '../styles/generated-colors.js'); // <= OK
const jsContent = `export const couleurs = ${JSON.stringify(customColors, null, 2)};\n`;
fs.writeFileSync(jsOutputPath, jsContent, 'utf8');

// 3. Générer un fichier CSS pour le navigateur (dans /public)
const cssVariables = Object.entries(customColors)
  .map(([key, value]) => `  --${key}: ${value};`)
  .join('\n');

const cssContent = `:root {\n${cssVariables}\n}\n`;
const cssOutputPath = path.resolve(__dirname, '../public/styles/generated-colors.css'); // <= OK
fs.writeFileSync(cssOutputPath, cssContent, 'utf8');
