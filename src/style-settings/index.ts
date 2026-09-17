import pkg from '../../package.json' with { type: 'json' }

import basic from './basic.ts'
import editor from './editor.ts'
import mobile from './mobile.ts'
import plugin from './plugin.ts'
import workspace from './workspace.ts'

const settings = `/* Maple Theme v${pkg.version} For Obsidian */
${basic}
${workspace}
${editor}
${plugin}
${mobile}
`

if (!process.argv[1]?.endsWith('compile.ts')) {
  console.log(settings)
}
export default settings
