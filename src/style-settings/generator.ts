import { stringify } from 'yaml'

function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function convertKeysToKebabCase(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToKebabCase(item))
  }

  const newObj: Record<string, any> = {}

  for (const [key, value] of Object.entries(obj)) {
    const kebabKey = kebabCase(key)

    if (typeof value === 'object' && value !== null) {
      newObj[kebabKey] = convertKeysToKebabCase(value)
    } else {
      newObj[kebabKey] = value
    }
  }

  return newObj
}

type Translate = {
  en: string
  zh: string
}
type Doc = {
  title: Translate
  desc?: Translate
}
type AltFormat = {
  id: string
  format: ColorFormat
}

type ColorFormat =
  | 'hex'
  | 'rgb'
  | 'hsl'
  | 'rgb-values'
  | 'rgb-split'
  | 'hsl-values'
  | 'hsl-split'
  | 'hsl-split-decimal'
function flattenDoc(doc: Doc) {
  const result: Record<string, string> = {
    title: doc.title.en,
    'title.zh': doc.title.zh,
  }
  if (doc.desc) {
    result.description = doc.desc.en
    result['description.zh'] = doc.desc.zh
  }
  return result
}

export class Settings {
  private items: any[]
  private constructor(public level: number, public doc: Doc) {
    this.items = [
      {
        id: `title-${doc.title.en
          .split('-')
          .map((s) => s.toLowerCase())
          .join('')}`,
        ...flattenDoc(doc),
        type: 'heading',
        level,
        collapsed: true,
      },
    ]
  }

  static ofLevel(level: number, doc: Doc) {
    return new Settings(level, doc)
  }

  children(items: Settings[]) {
    this.items.push(...items.flatMap((i) => i.items))
    return this
  }

  addInfo(text: Translate) {
    this.items.push({
      id: `info-${text}`,
      type: 'info-text',
      description: text.en,
      'description.zh': text.zh,
      markdown: true,
    })
    return this
  }
  addClassToggle(id: string, doc: Doc, opt: { enable?: boolean }) {
    this.items.push({
      id,
      type: 'class-toggle',
      ...flattenDoc(doc),
      default: opt?.enable,
    })
    return this
  }
  addClassSelect(
    id: string,
    doc: Doc,
    opt: {
      default?: string
      allowEmpty: boolean
      options: { label: string; value: string }[]
    },
  ) {
    this.items.push({
      id,
      type: 'class-select',
      ...flattenDoc(doc),
      ...opt,
    })
    return this
  }
  addVarText(id: string, doc: Doc, opt: { default: string; quotes?: boolean }) {
    this.items.push({
      id,
      type: 'variable-text',
      ...flattenDoc(doc),
      ...opt,
    })
    return this
  }
  addVarNum(id: string, doc: Doc, opt: { default: number; format?: string }) {
    this.items.push({
      id,
      type: 'variable-number',
      ...flattenDoc(doc),
      ...opt,
    })
    return this
  }
  addVarNumSlider(
    id: string,
    doc: Doc,
    opt: {
      default: number
      min: number
      max: number
      step: number
      format?: string
    },
  ) {
    this.items.push({
      id,
      type: 'variable-number-slider',
      ...flattenDoc(doc),
      ...opt,
    })
    return this
  }
  addVarSelect(
    id: string,
    doc: Doc,
    opt: {
      default?: string
      options: { label: string; value: string }[]
    },
  ) {
    this.items.push({
      id,
      type: 'variable-select',
      ...flattenDoc(doc),
      ...opt,
    })
    return this
  }
  addVarColor(
    id: string,
    doc: Doc,
    opt: {
      default: string
      format: ColorFormat
      opacity?: boolean
      altFormat?: AltFormat[]
    },
  ) {
    this.items.push({
      id,
      type: 'variable-color',
      ...flattenDoc(doc),
      ...opt,
    })
    return this
  }
  addVarThemedColor(
    id: string,
    doc: Doc,
    opt: {
      format: ColorFormat
      opacity?: boolean
      defaultLight: string
      defaultDark: string
    },
  ) {
    this.items.push({
      id,
      type: 'variable-themed-color',
      ...flattenDoc(doc),
      ...opt,
    })
    return this
  }
  addColorGradient(
    id: string,
    doc: Doc,
    opt: {
      from: string
      to: string
      step: number
      pad?: number
      format: 'hex' | 'rgb' | 'hsl'
    },
  ) {
    this.items.push({
      id,
      type: 'color-gradient',
      ...flattenDoc(doc),
      ...opt,
    })
    return this
  }
  build(id: string, name: string) {
    const data = stringify(
      convertKeysToKebabCase({
        id,
        name,
        settings: this.items,
      }),
      { indent: 4 },
    )
    return `/* @settings\n${data}*/`
  }
}
