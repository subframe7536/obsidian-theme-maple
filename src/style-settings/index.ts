import basic from './basic'
import editor from './editor'
import plugin from './plugin'
import workspace from './workspace'
import { version } from '../../package.json'

const settings = `/* Maple Theme v${version} For Obsidian */
${basic}
${workspace}
${editor}
${plugin}
`

if (!process.argv[1].endsWith('compile.ts')) {
  console.log(settings)
}
export default settings
