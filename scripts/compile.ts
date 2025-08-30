import { basename, extname, resolve, join } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { homedir, platform } from 'os'
import { compile, SassString } from 'sass'
import settings from '../src/style-settings/index'
import { watch } from 'chokidar'
import { getIconUrl } from './icon'
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export function compileCss(src: string) {
  const { css } = compile(src, {
    sourceMap: false,
    functions: {
      'icon($icon-name)': ([name]) => {
        return new SassString(getIconUrl(name.assertString().text), {
          quotes: false,
        })
      },
      'font($style)': ([name]) => {
        const style = capitalize(name.assertString().text)
        if (style !== 'Regular' && style !== 'Italic') {
          throw new Error('style must be regular or italic')
        }
        const source = readFileSync(`fonts/MapleMono-${style}.woff2`).toBase64()
        return new SassString(`url("data:font/woff2;base64,${source}")`, {
          quotes: false,
        })
      },
    },
    charset: false,
  })
  return css
}

function build(src: string, out: string) {
  writeFileSync(out, settings + '\n' + compileCss(src), 'utf-8')
}

async function dev(src: string, out: string) {
  const settings =
    await Bun.$`bun ${process.cwd()}/src/style-settings/index.ts`.text()
  writeFileSync(out, settings + '\n' + compileCss(src), 'utf-8')
  console.log('File Updated')
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
  const isBuild = process.argv?.includes('--build')

  if (isBuild) {
    build('src/index.scss', 'theme.css')
    return
  }

  void dev(input, output)
  watch(join(process.cwd(), 'src')).on('change', () => dev(input, output))
}

main()
