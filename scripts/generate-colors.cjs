const fs = require('fs');
const path = require('path');
const config = require('../tailwind.config.js');

const colors = config.theme?.extend?.colors ?? {};
const customKeys = ["doré", "acier", "ardoise", "ivoire", "anthracite", "beigeClair"];
const customColors = Object.fromEntries(
  Object.entries(colors).filter(([key]) => customKeys.includes(key))
);

const outputPath = path.resolve(__dirname, '../styles/colors.js');
fs.writeFileSync(outputPath, `export const couleurs = ${JSON.stringify(customColors, null, 2)};\n`);

console.log('✅ Fichier colors.js généré avec succès.');
