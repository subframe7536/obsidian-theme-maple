import packageJson from '../package.json' assert { type: 'json' }
import manifestJson from '../manifest.json' assert { type: 'json' }
import { readFileSync, writeFileSync } from "fs";

const currentVersion = manifestJson.version
const newVersion = packageJson.version

function replace(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  writeFileSync(filePath, content.replace(currentVersion, newVersion), 'utf-8')
}

replace('./src/style-settings/workspace.scss')
replace('./src/workspace/modal.scss')
replace('./manifest.json')