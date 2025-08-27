import { execSync, spawn } from 'child_process'
import { basename, extname, resolve, join } from 'path'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { homedir, platform } from 'os'

function dev(args: string[]) {
  const [command, ...rest] = args
  const childProcess = spawn(command, rest, { env: process.env });

  childProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  childProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  childProcess.on('error', (error) => {
    console.error('Error:', error);
  });
}

function build(args: string[]) {
  execSync(args.join(' '))
}

function setup(baseDir: string) {
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
}

function main() {
  const devVaultRoot = platform() === 'win32' ? 'D:/note/dev-vault' : homedir() + '/Desktop/note/dev-vault'

  const baseDir = resolve(devVaultRoot, 'test')
  setup(baseDir)
  const input = process.argv?.[2] ?? 'src/index.scss'
  const output = basename(input).replace(extname(input), '.css')

  const isBuild = process.argv?.includes('--build')
  const moduleBinDir = join(process.cwd(), 'node_modules', '.bin')

  const args = process.platform === 'win32'
    ? ['cmd.exe', '/c', join(moduleBinDir, 'sass.exe')]
    : [join(moduleBinDir, 'sass')]

  if (isBuild) {
    build([
      ...args,
      'src/index.scss',
      'theme.css',
      '--no-source-map',
    ])
  } else {
    dev([
      ...args,
      `${input}:${devVaultRoot}/.obsidian/snippets/${output}`,
      '--watch',
      '--no-source-map',
      '--update'
    ])
  }
}

main()