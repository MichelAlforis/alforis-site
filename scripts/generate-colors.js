
const fs = require("fs");
const path = require("path");
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("../tailwind.config.js")

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme.colors;

// Filtrer uniquement tes couleurs personnalisées (exclut les couleurs par défaut Tailwind)
const customKeys = ["doré", "acier", "ardoise", "ivoire", "anthracite", "beigeClair"];
const customColors = Object.fromEntries(
  Object.entries(colors).filter(([key]) => customKeys.includes(key))
);

const output = "export const couleurs = " + JSON.stringify(customColors, null, 2) + ";\n";
fs.writeFileSync(path.resolve(__dirname, "../styles/colors.js"), output);

console.log("✅ Fichier colors.js mis à jour avec les couleurs personnalisées.");
