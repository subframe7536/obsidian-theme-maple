import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// path/to/your/vault/root
const dirs: string[] = []

const vaultRoots = process.env.DIR?.split(',') || dirs

console.log(`choose ${vaultRoots?.length ?? 0} vaults`)

for (const root of vaultRoots) {
  const themeRoot = join(root, '.obsidian', 'themes', 'Maple')

  if (!existsSync(themeRoot)) {
    mkdirSync(themeRoot, { recursive: true })
  }

  copyFileSync('theme.css', join(themeRoot, 'theme.css'))
  copyFileSync('manifest.json', join(themeRoot, 'manifest.json'))

  console.log(`✨ ${root}`)
}
