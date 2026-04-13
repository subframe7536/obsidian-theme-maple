import { readdirSync, readFileSync } from 'node:fs'

import { icons as bootstrap } from '@iconify-json/bi'
import { icons as lucide } from '@iconify-json/lucide'
import { icons as tabler } from '@iconify-json/tabler'
import { SassString } from 'sass'
import type { CustomFunction } from 'sass'

import { version } from '../package.json'

const resourceDir = 'resource'

function getIconUrl(name: string, color?: string) {
  const parseSvgUrl = (svg: string, color?: string) => {
    if (color) {
      svg = svg.replaceAll('currentColor', Bun.color(color, 'HEX') || '#0000')
    }
    svg = svg
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/\s+/g, ' ')
      .replace(/> </g, '><')

    return `url("data:image/svg+xml,${svg}")`
  }

  let data
  let set
  if (name.startsWith('bi:')) {
    data = bootstrap.icons[name.substring(3)]
    set = bootstrap
  } else if (name.startsWith('tb:')) {
    data = tabler.icons[name.substring(3)]
    set = tabler
  } else {
    data = lucide.icons[name]
    set = lucide
  }
  const fileIconDir = `${resourceDir}/svg`
  const fileIcons = readdirSync(fileIconDir)
  if (!data) {
    if (fileIcons.some((i) => i.startsWith(name))) {
      const svg = readFileSync(`${fileIconDir}/${name}.svg`, 'utf-8')
      return parseSvgUrl(svg, color)
    }
    throw new Error(`No such icon: ${name}`)
  }
  const viewBox = [0, 0, set.width || 16, set.height || 16].join(' ')
  const w = set.width || '1em'
  const h = set.height || '1em'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}">${data.body}</svg>`
  return parseSvgUrl(svg, color)
}

export const FUNCTIONS: Record<string, CustomFunction<'sync'>> = {
  'version()': () => {
    return new SassString(`Maple ${version}`)
  },
  'unescape($str)': ([str]) => {
    return new SassString(str!.assertString().text.replace(/\\/g, ''))
  },
  'icon($icon-name, $color: "")': ([name, color]) => {
    return new SassString(getIconUrl(name!.assertString().text, color!.assertString().text), {
      quotes: false,
    })
  },
  'font($style)': ([name]) => {
    const styleVar = name!.assertString().text
    const style = styleVar.charAt(0).toUpperCase() + styleVar.slice(1)
    if (style !== 'Regular' && style !== 'Italic') {
      throw new Error('style must be regular or italic')
    }
    const source = readFileSync(`${resourceDir}/font/MapleMono-${style}.woff2`).toBase64()
    return new SassString(`url("data:font/woff2;base64,${source}")`, {
      quotes: false,
    })
  },
  // 'img($image-name)': ([name]) => {
  //   const imageName = name.assertString().text
  //   const buffer = readFileSync(
  //     join(`${resourceDir}/image${imageName}.webp`),
  //   )
  //   const url = 'url("data:image/webp;base64,' + buffer.toBase64() + '")'
  //   return new SassString(url, { quotes: false })
  // },
}
