import basic from './basic'
import editor from './editor'
import plugin from './plugin'
import workspace from './workspace'

const settings = `/* Maple Theme For Obsidian */
${basic}
${workspace}
${editor}
${plugin}
`

if (!process.argv[1].endsWith('compile.ts')) {
  console.log(settings)
}
export default settings
