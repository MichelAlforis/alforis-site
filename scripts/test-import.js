import path from 'path'
import { pathToFileURL } from 'url'

const full = path.resolve('./content/parcours/profilretraite.js')
console.log('Importing from', full)

const mod = await import(pathToFileURL(full).href)
console.log('✔️  Module loaded:', mod.meta || mod.default?.meta)
