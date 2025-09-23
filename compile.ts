import { basename, extname, resolve, join, parse } from 'path'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs'
import { homedir, platform } from 'os'
import { compile } from 'sass'
import settings from './src/style-settings/index'
import { watch } from 'chokidar'
import { styleText } from 'util'
import { version } from './package.json'
import { FUNCTIONS } from './src/custom-functions'

function setup(baseDir: string) {
  if (!existsSync(baseDir)) {
    mkdirSync(baseDir, { recursive: true })
  }
  const testFile = join(baseDir, 'index.md')
  if (existsSync(testFile)) {
    return
  }
  writeFileSync(
    testFile,
    `---
tags:
- test
---

**Please install "Style Settings" plugin for further develop**

## Heading 2

> Quote
>> text

- list
- list
- sublist
- sublist

### Heading 3

1. asd
2. asdasd
3. asdasdasd

---

[URL](https://github.com/subframe7536/obsidian-theme-maple)

| table1 | table2 |
| ------ | ------ |
| cell1  | cell2  |

`,
  )
}

function compileCss(output: string, src: string, prepend?: string) {
  try {
    let { css } = compile(src, {
      sourceMap: false,
      functions: FUNCTIONS,
      charset: false,
    })

    css = css.replace(/\s+[\w-]+\b:\s*ignore;/g, '')

    writeFileSync(output, prepend ? prepend + '\n' + css : css, 'utf-8')
    console.log(
      styleText('gray', new Date().toLocaleTimeString(['zh'])),
      styleText('greenBright', 'Compile to ' + output),
    )
  } catch (err) {
    console.error(err)
  }
}

function build(src: string, out: string) {
  const manifestPath = 'manifest.json'
  const manifest = readFileSync(manifestPath, 'utf-8')
  writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        ...JSON.parse(manifest),
        version,
      },
      null,
      2,
    ),
  )
  compileCss(out, src, settings)
}

function test(src: string) {
  const p = parse(src)
  compileCss(p.dir + '/' + p.name + '.css', src)
}

async function dev(src: string, out: string) {
  try {
    const latestSettings =
      await Bun.$`bun ${process.cwd()}/src/style-settings/index.ts`.text()
    compileCss(out, src, latestSettings)
  } catch (err) {
    console.error(err)
  }
}

function move() {
  const vaultRoots = process.env.VAULT_DIRS?.split(',').filter(Boolean)
  if (!vaultRoots?.length) {
    console.log('No chosen vault, skip moving')
    return
  }
  console.log(`choose ${vaultRoots?.length ?? 0} vaults`)

  for (const root of vaultRoots) {
    const themeRoot = join(root, '.obsidian', 'themes', 'Maple')

    if (!existsSync(themeRoot)) {
      mkdirSync(themeRoot, { recursive: true })
    }

    copyFileSync('theme.css', join(themeRoot, 'theme.css'))
    copyFileSync('manifest.json', join(themeRoot, 'manifest.json'))

    console.log(`> ${root}`)
  }
}

function main() {
  const devVaultRoot =
    platform() === 'win32'
      ? 'D:/note/dev-vault'
      : homedir() + '/Desktop/note/dev-vault'

  const baseDir = resolve(devVaultRoot, 'test')
  setup(baseDir)
  const input =
    process.argv?.filter((s) => !s.startsWith('--'))[2] ?? 'src/index.scss'
  const output =
    `${devVaultRoot}/.obsidian/snippets/` +
    basename(input).replace(extname(input), '.css')
  const isBuild = process.argv?.includes('--build')
  const isTest = process.argv?.includes('--test')

  if (isBuild) {
    build(input, 'theme.css')
    move()
    return
  }
  if (isTest) {
    test(input)
    return
  }

  void dev(input, output)
  watch(join(process.cwd(), 'src')).on('change', () => dev(input, output))
  watch(join(process.cwd(), 'compile.ts')).on('change', () =>
    dev(input, output),
  )
}

main()
