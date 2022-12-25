import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// path/to/your/vault/root
const dirs = []

const vaultRoots = existsSync('./dir.js') ? (await import('./dir.js')).dirs : dirs
console.log(`choose ${vaultRoots.length} vaults`)
vaultRoots.forEach(root => {
  let themeRoot = resolve(root, '.obsidian', 'themes', 'Maple')
  !existsSync(themeRoot) && mkdirSync(themeRoot, { recursive: true })
  copyFileSync('theme.css', resolve(themeRoot, 'theme.css'))
  copyFileSync('manifest.json', resolve(themeRoot, 'manifest.json'))
  console.log(`apply to ${root}`)
})
