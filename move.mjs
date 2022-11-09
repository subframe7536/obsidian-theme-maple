import { copyFileSync, existsSync, mkdir } from 'fs'
import { resolve } from 'path'
/**
 * in dir.js:
 *
 * ```js
 * export const dirs = ['/path/to/your/vault/root']
 * ```
 */
if (existsSync('./dir.js')) {
  const { dirs } = await import('./dir.js')
  console.log(`choose ${dirs.length} vaults`)
  dirs.forEach(dir => {
    let vaultRoot = resolve(dir, '.obsidian', 'snippets')
    !existsSync(vaultRoot) && mkdir(vaultRoot)
    copyFileSync('obsidian.css', resolve(vaultRoot, 'obsidian.css'))
    console.log(`apply to ${dir}`)
  })
} else {
  console.log('no assigned vault')
}
