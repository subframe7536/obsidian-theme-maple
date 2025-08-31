import { icons as lucide } from '@iconify-json/lucide'
import { icons as bootstrap } from '@iconify-json/bi'
import { icons as tb } from '@iconify-json/tabler'
function encodeSvgForUrl(svg: string) {
  return svg
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ')
}

export function getIconUrl(name: string) {
  let data
  let set
  if (name.startsWith('bi:')) {
    data = bootstrap.icons[name.substring(3)]
    set = bootstrap
  } else if (name.startsWith('tb:')) {
    data = tb.icons[name.substring(3)]
    set = tb
  } else {
    data = lucide.icons[name]
    set = lucide
  }
  if (!data) {
    throw new Error(`No such icon: ${name}`)
  }
  const viewBox = [0, 0, set.width || 16, set.height || 16].join(' ')
  const w = set.width || '1em'
  const h = set.height || '1em'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}">${data.body}</svg>`
  return 'url("data:image/svg+xml,' + encodeSvgForUrl(svg) + '")'
}
