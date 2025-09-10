import { basename, extname, resolve, join, parse } from 'path'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from 'fs'
import { homedir, platform } from 'os'
import { compile, SassString } from 'sass'
import settings from './src/style-settings/index'
import { watch } from 'chokidar'
import { styleText } from 'util'
import { version } from './package.json'

import { icons as lucide } from '@iconify-json/lucide'
import { icons as bootstrap } from '@iconify-json/bi'
import { icons as tb } from '@iconify-json/tabler'

function parseSvgUrl(svg: string, color?: string) {
  if (color) {
    svg = svg.replaceAll('currentColor', Bun.color(color, 'HEX') || '#0000')
  }
  svg = svg
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')

  return 'url("data:image/svg+xml,' + svg + '")'
}

function getIconUrl(name: string, color?: string) {
  let data
  let set
  if (name.startsWith('bi:')) {
    data = bootstrap.icons[name.substring(3)]
    set = bootstrap
  } else if (name.startsWith('tb:')) {
    data = tb.icons[name.substring(3)]
    set = tb
  } else {
    data = lucide.icons[name]
    set = lucide
  }
  const fileIconDir = 'resource/svg'
  const fileIcons = readdirSync(fileIconDir)
  if (!data) {
    if (fileIcons.some((i) => i.startsWith(name))) {
      const svg = readFileSync(fileIconDir + '/' + name + '.svg', 'utf-8')
      return parseSvgUrl(svg, color)
    }
    throw new Error(`No such icon: ${name}`)
  }
  const viewBox = [0, 0, set.width || 16, set.height || 16].join(' ')
  const w = set.width || '1em'
  const h = set.height || '1em'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}">${data.body}</svg>`
  return parseSvgUrl(svg, color)
}

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
      functions: {
        'version()': () => {
          return new SassString(`Maple ${version}`)
        },
        'unescape($str)': ([str]) => {
          return new SassString(str.assertString().text.replace(/\\/g, ''))
        },
        'icon($icon-name, $color: "")': ([name, color]) => {
          return new SassString(
            getIconUrl(name.assertString().text, color.assertString().text),
            {
              quotes: false,
            },
          )
        },
        'img($image-name)': ([name]) => {
          const imageName = name.assertString().text
          const buffer = readFileSync(
            join('./resource/image', imageName + '.webp'),
          )
          const url = 'url("data:image/webp;base64,' + buffer.toBase64() + '")'
          return new SassString(url, { quotes: false })
        },
        'font($style)': ([name]) => {
          const styleVar = name.assertString().text
          const style = styleVar.charAt(0).toUpperCase() + styleVar.slice(1)
          if (style !== 'Regular' && style !== 'Italic') {
            throw new Error('style must be regular or italic')
          }
          const source = readFileSync(
            `resource/font/MapleMono-${style}.woff2`,
          ).toBase64()
          return new SassString(`url("data:font/woff2;base64,${source}")`, {
            quotes: false,
          })
        },
      },
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
  const latestSettings =
    await Bun.$`bun ${process.cwd()}/src/style-settings/index.ts`.text()
  compileCss(out, src, latestSettings)
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

    console.log(`✨ ${root}`)
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
