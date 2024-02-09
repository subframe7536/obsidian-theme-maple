import { spawn } from 'child_process'
import { basename, extname, dirname, resolve, join } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import which from 'which'

// const __dirname = dirname(fileURLToPath(import.meta.url))
// const devVaultRoot = resolve(__dirname, '..', 'vault')
const devVaultRoot = 'D:/note/dev-vault'

const baseDir = resolve(devVaultRoot, 'test')
if (!existsSync(baseDir)) {
  mkdirSync(baseDir, { recursive: true })
}

const testFile = join(baseDir, 'index.md')
if (!existsSync(testFile)) {
  writeFileSync(testFile, `---
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

`)
}

const input = process.argv?.[2] ?? 'src/index.scss'
const output = basename(input).replace(extname(input), '.css')

const command = which.sync('pnpm')

const args = [
  'sass',
  `${input}:${devVaultRoot}/.obsidian/snippets/${output}`,
  '--watch',
  '--no-source-map',
  '--update'
]

const childProcess = spawn(command, args, { env: process.env });

childProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

childProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

childProcess.on('error', (error) => {
  console.error('Error:', error);
});
