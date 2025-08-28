import { spawn } from 'child_process'
import { basename, extname, resolve, join } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { homedir, platform } from 'os'
import { compile } from 'sass'
import settings from '../src/style-settings/index'
import { watch } from 'chokidar'

function build(src: string, out: string, fontDir: string) {
  const { css } = compile(src, {
    sourceMap: false,
    importers: [
      {
        findFileUrl(url) {
          if (url.includes('dev-variable')) {
            return new URL('data:,')
          }
          return null
        },
      },
    ],
  })
  const mapleRegular = readFileSync(
    join(fontDir, 'MapleMono-Regular.woff2'),
  ).toBase64()
  const mapleItalic = readFileSync(
    join(fontDir, 'MapleMono-Italic.woff2'),
  ).toBase64()
  const result = css
    .replace('$regular$', 'data:font/woff2;base64,' + mapleRegular)
    .replace('$italic$', 'data:font/woff2;base64,' + mapleItalic)
    .replace('@charset "UTF-8";\n', '')
  writeFileSync(out, settings + '\n' + result, 'utf-8')
}

function setup(baseDir: string) {
  if (!existsSync(baseDir)) {
    mkdirSync(baseDir, { recursive: true })
  }
  const testFile = join(baseDir, 'index.md')
  if (!existsSync(testFile)) {
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
}

async function updateSettings(outputStyleSettings: string) {
  await Bun.$`bun ${process.cwd()}/src/style-settings/index.ts -- -- > ${outputStyleSettings}`
  console.log('Update Style Settings')
}

function main() {
  const devVaultRoot =
    platform() === 'win32'
      ? 'D:/note/dev-vault'
      : homedir() + '/Desktop/note/dev-vault'

  const baseDir = resolve(devVaultRoot, 'test')
  setup(baseDir)
  const input = process.argv?.[2] ?? 'src/index.scss'
  const output =
    `${devVaultRoot}/.obsidian/snippets/` +
    basename(input).replace(extname(input), '.css')
  const outputStyleSettings = output.replace(/\.css$/g, '-settings.css')
  const isBuild = process.argv?.includes('--build')

  if (isBuild) {
    build('src/index.scss', 'theme.css', 'fonts')
    return
  }

  void updateSettings(outputStyleSettings)
  watch(join(process.cwd(), 'src', 'style-settings')).on('change', () =>
    updateSettings(outputStyleSettings),
  )

  const moduleBinDir = join(process.cwd(), 'node_modules', '.bin')
  const args =
    process.platform === 'win32'
      ? ['cmd.exe', '/c', join(moduleBinDir, 'sass.exe')]
      : [join(moduleBinDir, 'sass')]
  args.push(`${input}:${output}`, '--watch', '--no-source-map', '--update')
  const [command, ...rest] = args
  spawn(command, rest, {
    env: process.env,
    stdio: 'inherit',
  })
}

main()
