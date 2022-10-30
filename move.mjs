import { copyFileSync, existsSync, mkdir } from 'fs'
import { resolve } from 'path'
import { dirs } from './dir.js'
dirs.forEach(dir => {
  let base = resolve(dir, '.obsidian', 'snippets')
  !existsSync(base) && mkdir(base)
  copyFileSync('obsidian.css', resolve(base, 'obsidian.css'))
})
