import { spawn } from 'child_process'
import { basename, extname } from 'path'
import which from 'which'

const devVaultRoot = 'D:/note/dev-vault'

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
