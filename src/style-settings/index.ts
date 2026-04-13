import { version } from '../../package.json'

import basic from './basic'
import editor from './editor'
import mobile from './mobile'
import plugin from './plugin'
import workspace from './workspace'

const settings = `/* Maple Theme v${version} For Obsidian */
${basic}
${workspace}
${editor}
${plugin}
${mobile}
`

if (!process.argv[1].endsWith('compile.ts')) {
  console.log(settings)
}
export default settings
