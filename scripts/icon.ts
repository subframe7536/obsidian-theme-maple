import { icons } from '@iconify-json/lucide'
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
  const data = icons.icons[name]
  if (!data) {
    throw new Error(`No such icon in lucide: ${name}`)
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icons.width} ${icons.height}">${data.body}</svg>`
  return 'url("data:image/svg+xml,' + encodeSvgForUrl(svg) + '")'
}
