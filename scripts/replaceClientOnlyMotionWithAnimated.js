// Script Node.js pour remplacer ClientOnlyMotion par Animated
// + Remplace AnimatedPage par Animated.Page

const fs = require('fs')
const path = require('path')

const targetDir = '.' // 🔁 À adapter selon ton projet

const replacements = [
  'h1', 'h2', 'h3', 'p', 'div', 'section'
]

function capitalize(tag) {
  return tag.charAt(0).toUpperCase() + tag.slice(1)
}

function updateFileContent(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  let updated = false

  // Remplacer tous les ClientOnlyMotion.tag => Animated.Tag
  replacements.forEach((tag) => {
    const regex = new RegExp(`ClientOnlyMotion\\.${tag}`, 'g')
    if (regex.test(content)) {
      content = content.replace(regex, `Animated.${capitalize(tag)}`)
      updated = true
    }
  })

  // Remplacer ClientOnlyMotion.article par ClientOnlyMotion.article (on garde animé, mais pas en Animated)
  // → Pas de remplacement

  // Remplacer AnimatedPage => Animated.Page
  if (content.includes('AnimatedPage')) {
    content = content.replace(/\bAnimatedPage\b/g, 'Animated.Page')
    updated = true
  }

  // Ajouter l'import si manquant
  if (updated && !content.includes("from '@/components/animated/Animated'")) {
    content = `import { Animated } from '@/components/animated/Animated'\n` + content
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`✅ Modifié : ${filePath}`)
  }
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir)
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      processDirectory(fullPath)
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx')) {
      updateFileContent(fullPath)
    }
  })
}

processDirectory(targetDir)
