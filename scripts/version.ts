import { readFileSync, writeFileSync } from 'fs'
import { version as newVersion } from '../package.json'
import { version as currentVersion } from '../manifest.json'

function replace(filePath: string) {
  const content = readFileSync(filePath, 'utf-8')
  writeFileSync(filePath, content.replace(currentVersion, newVersion), 'utf-8')
}

replace('./src/style-settings/workspace.scss')
replace('./src/workspace/modal.scss')
replace('./manifest.json')