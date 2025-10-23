import { descReference, descValidCSS, Settings } from './generator'

interface HeadingConfig {
  style?: 'normal' | 'underline' | 'full-line' | 'block'
  align?: 'left' | 'center'
  smallCaps?: boolean
}
const CN_NUMBERS = ['一', '二', '三', '四', '五', '六']
const FONT_WEIGHTS = [750, 700, 600, 550, 550, 500]
function createHeadingSettings(level: number, config: HeadingConfig = {}) {
  const { align = 'left', style = 'normal', smallCaps = false } = config
  return Settings.ofLevel(2, {
    title: {
      en: `Level ${level} Heading`,
      zh: `${CN_NUMBERS[level - 1]}级标题`,
    },
  })
    .addClassSelect(
      `heading-h${level}-style`,
      {
        title: {
          en: `H${level} Style`,
          zh: `H${level} 样式`,
        },
      },
      {
        allowEmpty: false,
        default: `heading-h${level}-${style}`,
        options: [
          { label: 'Normal', value: `heading-h${level}-normal` },
          { label: 'Underline', value: `heading-h${level}-underline` },
          { label: 'Full Line', value: `heading-h${level}-full-line` },
          { label: 'Block', value: `heading-h${level}-block` },
        ],
      },
    )
    .addClassSelect(
      `heading-h${level}-full-line-direction`,
      {
        title: {
          en: `H${level} Full Line Decoration Gradient Direction`,
          zh: `H${level} 整行下划线渐变方向`,
        },
      },
      {
        allowEmpty: false,
        default: `heading-h${level}-full-line-both`,
        options: [
          { label: 'Both', value: `heading-h${level}-full-line-both` },
          { label: 'Left', value: `heading-h${level}-full-line-left` },
          { label: 'Right', value: `heading-h${level}-full-line-right` },
        ],
      },
    )
    .addClassToggle(`heading-h${level}-block-contrast`, {
      title: {
        en: `H${level} Block Decoration Use Higher Contrast Color`,
        zh: `H${level} 块状装饰颜色提高对比度`,
      },
    })
    .addVarThemedColor(
      `setting-h${level}-color`,
      {
        title: {
          en: `H${level} Color`,
          zh: `H${level} 颜色`,
        },
      },
      'rgb-values',
    )
    .addClassToggle(
      `heading-h${level}-center`,
      {
        title: {
          en: `H${level} Centered`,
          zh: `H${level} 居中`,
        },
      },
      { enable: align === 'center' },
    )
    .addClassToggle(`heading-h${level}-italic`, {
      title: {
        en: `H${level} Italic Style`,
        zh: `H${level} 斜体样式`,
      },
    })
    .addVarText(
      `setting-h${level}-font`,
      {
        title: {
          en: `H${level} Font Family`,
          zh: `H${level} 字体`,
        },
        desc: descValidCSS('font-family'),
      },
      { default: '' },
    )
    .addVarText(
      `setting-h${level}-weight`,
      {
        title: {
          en: `H${level} Font Weight`,
          zh: `H${level} 字重`,
        },
        desc: descValidCSS('font-weight'),
      },
      { default: FONT_WEIGHTS[level - 1].toString() },
    )
    .addClassToggle(
      `heading-h${level}-caps`,
      {
        title: {
          en: `H${level} Small Caps Text Variant`,
          zh: `H${level} 文本变体`,
        },
        desc: {
          en: 'Uses the form of uppercase letters but are reduced to the size of lowercase letters',
          zh: '将小写字母转换成大写字母，但字号保持不变',
        },
      },
      { enable: smallCaps },
    )
}

export default Settings.create('maple-editor', 'Maple Editor').children([
  Settings.ofLevel(1, {
    title: { en: 'Background Pattern', zh: '背景图案' },
  })
    .addClassSelect(
      'editor-bg-pattern',
      {
        title: { en: 'Pattern Style', zh: '图案风格' },
      },
      {
        allowEmpty: false,
        default: 'editor-bg-plain',
        options: [
          { label: 'Plain', value: 'editor-bg-plain' },
          { label: 'Dots', value: 'editor-bg-grid-dots' },
          { label: 'Grid', value: 'editor-bg-grid-line' },
        ],
      },
    )
    .addVarThemedColor(
      'setting-editor-bg-grid-dots',
      {
        title: {
          en: 'Dot Color for Editor Background',
          zh: '编辑器背景点颜色',
        },
      },
      { format: 'rgb', opacity: true, defaultLight: '#', defaultDark: '#' },
    )
    .addVarThemedColor(
      'setting-editor-bg-grid-line',
      {
        title: {
          en: 'Grid Line Color for Editor Background',
          zh: '编辑器背景网格线颜色',
        },
      },
      { format: 'rgb', opacity: true, defaultLight: '#', defaultDark: '#' },
    )
    .addVarNumSlider(
      'setting-editor-bg-grid-spacing',
      {
        title: {
          en: 'Grid Spacing for Editor Background',
          zh: '编辑器背景网格间距',
        },
      },
      { format: 'px', default: 20, min: 10, max: 30, step: 1 },
    ),
  Settings.ofLevel(1, {
    title: { en: 'Line and Spacing', zh: '行和间距' },
  })
    .addVarNumSlider(
      'setting-editor-p-spacing',
      {
        title: {
          en: 'Paragraph Spacing (px)',
          zh: '段落间距（px）',
        },
      },
      { default: 8, format: 'px', min: 0, max: 20, step: 1 },
    )
    .addClassToggle('editor-custom-bottom-spacing', {
      title: { en: 'Custom Page Bottom Spacing', zh: '自定义页面底部留白' },
    })
    .addVarNumSlider(
      'setting-editor-bottom-spacing',
      {
        title: {
          en: 'Page Bottom Spacing (vh)',
          zh: '页面底部留白大小（vh）',
        },
      },
      { default: 40, format: 'vh', min: 0, max: 80, step: 5 },
    )
    .addVarNumSlider(
      'setting-editor-p-indent',
      {
        title: { en: 'Paragraph Indent', zh: '段落缩进' },
        desc: {
          en: 'Indent all paragraphs if "p-indent" exists in properties.cssclasses',
          zh: '当文档属性的 cssclasses 中存在 “p-indent” 类时，为所有段落添加缩进',
        },
      },
      { default: 2, min: 0, max: 4, step: 0.2 },
    )
    .addVarNumSlider(
      'setting-line-height',
      {
        title: { en: 'Line Height', zh: '行高' },
        desc: { en: 'Multiple of text size', zh: '文字大小的倍数' },
      },
      { default: 1.8, min: 1.2, max: 2.4, step: 0.1 },
    )
    .addVarText(
      'setting-file-line-width',
      {
        title: { en: 'Line Width', zh: '行宽' },
        desc: descValidCSS('width'),
      },
      { default: 'clamp(600px, 72%, 850px)' },
    )
    .addClassSelect(
      'line-indicator',
      {
        title: { en: 'Hover Line Marker', zh: '鼠标悬停行标记' },
        desc: descReference('https://github.com/Akifyss/obsidian-border'),
      },
      {
        allowEmpty: false,
        default: 'line-indicator-disable',
        options: [
          { label: 'None', value: 'line-indicator-disable' },
          { label: 'Left', value: 'line-indicator-enable' },
          { label: 'Full Line', value: 'line-indicator-full' },
        ],
      },
    )
    .addClassSelect(
      'line-active',
      {
        title: { en: 'Active Line Highlight', zh: '当前行高亮' },
      },
      {
        allowEmpty: false,
        default: 'line-active-enable',
        options: [
          { label: 'None', value: 'line-active-disable' },
          { label: 'Left', value: 'line-active-left' },
          { label: 'Full Line', value: 'line-active-enable' },
        ],
      },
    )
    .addVarThemedColor(
      'setting-line-active-color',
      {
        title: { en: 'Active Line Color', zh: '高亮行颜色' },
      },
      'hsl-values',
    ),
  Settings.ofLevel(1, {
    title: { en: 'Text', zh: '文本' },
  })
    .addVarThemedColor(
      'setting-text-normal',
      {
        title: { en: 'Editor Text Color', zh: '编辑器文本颜色' },
      },
      'hex',
    )
    .addVarNumSlider(
      'setting-underline-offset',
      {
        title: { en: 'Underline Offset', zh: '下划线偏移' },
      },
      { default: 2, format: 'px', min: 0, max: 8, step: 0.5 },
    )
    .children([
      Settings.ofLevel(2, { title: { en: 'Highlight', zh: '高亮' } })
        .addVarText(
          'setting-text-highlight-bg',
          {
            title: {
              en: 'Highlight Text Background Color',
              zh: '文本高亮背景色',
            },
            desc: descValidCSS('background'),
          },
          { default: 'rgba(255, 208, 0, 0.4)' },
        )
        .addVarThemedColor(
          'setting-text-highlight-color',
          {
            title: { en: 'Highlight Text Color', zh: '文本高亮文字色' },
          },
          'hex',
        )
        .addVarNumSlider(
          'setting-text-highlight-radius',
          {
            title: {
              en: 'Highlight Background Radius',
              zh: '高亮背景圆角大小',
            },
            desc: { en: 'Value in pixels (px)', zh: '单位：像素（px）' },
          },
          { default: 4, min: 0, max: 8, step: 1, format: 'px' },
        )
        .addClassToggle(
          'text-highlight-all-round',
          {
            title: {
              en: 'Maintain Radius When Wrapping',
              zh: '换行时保持圆角',
            },
            desc: { en: 'Except during editing', zh: '编辑时除外' },
          },
          { enable: true },
        ),
      Settings.ofLevel(2, { title: { en: 'Bold', zh: '粗体' } })
        .addVarThemedColor(
          'setting-text-bold-color',
          {
            title: { en: 'Bold Text Color', zh: '粗体颜色' },
          },
          'hex',
        )
        .addVarNumSlider(
          'setting-text-bold-weight',
          {
            title: { en: 'Bold Font Weight', zh: '粗体字重' },
          },
          { default: 600, min: 100, max: 800, step: 50 },
        )
        .addVarText(
          'setting-text-bold-style',
          {
            title: { en: 'Bold Style', zh: '粗体样式' },
            desc: descValidCSS('text-decoration'),
          },
          { default: '' },
        )
        .addVarText('setting-text-bold-font', {
          title: { en: 'Bold Font', zh: '粗体字体' },
          desc: descValidCSS('font-family'),
        }),
      Settings.ofLevel(2, { title: { en: 'Italic', zh: '斜体' } })
        .addVarThemedColor(
          'setting-text-italic-color',
          {
            title: { en: 'Italic Text Color', zh: '斜体颜色' },
          },
          'hex',
        )
        .addVarText(
          'setting-text-italic-style',
          {
            title: { en: 'Italic Style', zh: '斜体样式' },
            desc: descValidCSS('text-decoration'),
          },
          { default: '' },
        )
        .addVarText('setting-text-italic-font', {
          title: { en: 'Italic Font', zh: '斜体字体' },
          desc: descValidCSS('font-family'),
        }),
    ]),
  Settings.ofLevel(1, {
    title: { en: 'Font', zh: '字体' },
  })
    .addClassToggle(
      'font-maple',
      {
        title: {
          en: 'Use "Maple Mono" as Monospace Font',
          zh: '使用 “Maple Mono” 作为等宽字体',
        },
        desc: {
          en: 'https://github.com/subframe7536/maple-font',
          zh: 'https://github.com/subframe7536/maple-font',
        },
      },
      { enable: true },
    )
    .addVarText(
      'setting-code-ligature',
      {
        title: { en: 'Monospace Font Features', zh: '等宽字体特性' },
        desc: {
          en: "If using \"Maple Mono\" as monospace font, recommend setting to 'calt','cv01','cv02' to bring back normal glyphs",
          zh: "如果您使用 “Maple Mono” 作为等宽字体，建议设置为 'calt','cv01','cv02' 以改为正常的字形",
        },
      },
      { default: "'calt'" },
    )
    .addClassToggle('font-latex-text', {
      title: {
        en: 'Use Text Font in Non-formula Parts of LaTeX',
        zh: '在 LaTeX 内非公式部分使用正文字体',
      },
      desc: {
        en: 'No effective on Latin letters and numbers',
        zh: '仅修改中文字体',
      },
    }),
  Settings.ofLevel(1, { title: { en: 'Link', zh: '链接' } })
    .addClassToggle('link-hover-expand', {
      title: {
        en: 'Use Underline Animation on Hover',
        zh: '鼠标悬停时启用下划线动画',
      },
    })
    .addClassToggle(
      'link-icon',
      {
        title: {
          en: 'Add Icon Before Link',
          zh: '在链接前添加图标',
        },
        desc: {
          en: '❗The icon will be duplicated if the link text contains space or extra styles',
          zh: '❗如果链接文本包含空格或额外样式，图标将会重复出现',
        },
      },
      { enable: true },
    )
    .addClassToggle('link-heading', {
      title: { en: 'Compatible with Heading Style', zh: '兼容标题样式' },
      desc: {
        en: 'Keep link color consistent with heading, but retain icon',
        zh: '链接颜色与标题颜色保持一致，但保留图标',
      },
    })
    .addClassToggle('link-click-to-edit-in-live-preview', {
      title: {
        en: 'Click to Edit Link in Live Preview Mode',
        zh: '实时预览模式下点击链接进行编辑而非跳转',
      },
      desc: {
        en: '❗Disables hover animation; external link prefix icon will be disabled',
        zh: '❗将禁用悬停动画；外部链接前缀图标将不可用',
      },
    })
    .children([
      Settings.ofLevel(2, { title: { en: 'Link Color', zh: '链接颜色' } })
        .addVarThemedColor(
          'setting-link-internal-color',
          {
            title: { en: 'Internal Link Color', zh: '内部链接颜色' },
          },
          'rgb-values',
        )
        .addVarThemedColor(
          'setting-link-internal-color-underline',
          {
            title: {
              en: 'Internal Link Underline Color',
              zh: '内部链接下划线颜色',
            },
          },
          'rgb',
        )
        .addVarThemedColor(
          'setting-link-external-color',
          {
            title: { en: 'External Link Color', zh: '外部链接颜色' },
          },
          'rgb-values',
        )
        .addVarThemedColor(
          'setting-link-external-color-underline',
          {
            title: {
              en: 'External Link Underline Color',
              zh: '外部链接下划线颜色',
            },
          },
          'rgb',
        ),
    ]),
  Settings.ofLevel(1, { title: { en: 'Heading', zh: '标题' } })
    .addClassSelect(
      'heading-color-style',
      {
        title: { en: 'Heading Color Style', zh: '标题颜色样式' },
      },
      {
        allowEmpty: false,
        default: 'heading-color-colorful',
        options: [
          { label: 'Text Color', value: 'heading-color-base' },
          { label: 'Accent Color', value: 'heading-color-accent' },
          { label: 'Colorful', value: 'heading-color-colorful' },
        ],
      },
    )
    .addClassSelect(
      'heading-indicator',
      {
        title: { en: 'Heading Level Marker', zh: '标题等级标记' },
      },
      {
        allowEmpty: false,
        default: 'heading-indicator-auto',
        options: [
          { label: 'Disable', value: 'heading-indicator-disable' },
          { label: 'Auto hide', value: 'heading-indicator-auto' },
          { label: 'Fixed', value: 'heading-indicator-fixed' },
        ],
      },
    )
    .children([
      createHeadingSettings(1, {
        align: 'center',
      }),
      createHeadingSettings(2, {
        style: 'underline',
      }),
      createHeadingSettings(3),
      createHeadingSettings(4),
      createHeadingSettings(5),
      createHeadingSettings(6, {
        smallCaps: true,
      }),
    ]),
  Settings.ofLevel(1, { title: { en: 'Horizontal Rule', zh: '分隔线' } })
    .addClassToggle(
      'hr-enable',
      {
        title: { en: 'Enable Horizontal Rule Style', zh: '启用分隔线样式' },
      },
      { enable: true },
    )
    .addVarText(
      'setting-hr-icon',
      {
        title: {
          en: 'Set Icon in the Center of Horizontal Rule',
          zh: '分隔线中部图标',
        },
      },
      { default: '⭐', quotes: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Table', zh: '表格' } })
    .addClassToggle(
      'table-full',
      {
        title: { en: 'Full Width Table', zh: '全宽表格' },
      },
      { enable: true },
    )
    .addClassSelect(
      'table-style',
      {
        title: { en: 'Table Style', zh: '表格样式' },
        desc: {
          en: 'Ignore DataView table. Minimal: Academic style with only horizontal lines; Colorful: Accented header and line background colors',
          zh: '忽略 DataView 表格。Minimal: 仅显示横线的学术风格；Colorful: 加深表头和行的背景色',
        },
      },
      {
        allowEmpty: false,
        default: 'table-style-default',
        options: [
          { label: 'Default', value: 'table-style-default' },
          { label: 'Minimal', value: 'table-style-minimal' },
          { label: 'Colorful', value: 'table-style-colorful' },
        ],
      },
    )
    .addClassToggle(
      'table-round',
      {
        title: { en: 'Add Round Corner For Table', zh: '表格添加圆角' },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-table-header-text',
      {
        title: { en: 'Table Header Text Color', zh: '表头文字色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-table-header-bg',
      {
        title: { en: 'Table Header Background Color', zh: '表头背景色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-table-line-bg',
      {
        title: { en: 'Striped Background Color', zh: '斑马纹背景色' },
      },
      'hex',
    ),
  Settings.ofLevel(1, { title: { en: 'Embed Block', zh: '内嵌块' } })
    .addClassToggle('embed-border-hidden', {
      title: { en: "Hide Embed Block's Border", zh: '隐藏内嵌块的边框' },
    })
    .addClassToggle(
      'embed-title-right-top',
      {
        title: {
          en: 'Move Embed File Title to Top Right',
          zh: '内嵌文件标题移至右上角',
        },
        desc: {
          en: 'Visible on hover; disabled when alias is "#", e.g., ![[FileName|#]]',
          zh: '鼠标悬停时显示；别名为 “#” 时禁用，例如：![[文件名|#]]',
        },
      },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Image', zh: '图片' } })
    .addClassToggle(
      'image-alt',
      {
        title: {
          en: 'Add Alt Text Below and Center the Image',
          zh: '在图片底部添加提示文本并居中图片',
        },
        desc: {
          en: 'Example: ![[image.jpg|alt text]]',
          zh: '示例：![[图片.jpg|提示文本]]',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'image-zoom',
      {
        title: { en: 'Click to Zoom Image', zh: '鼠标按下时放大图片' },
        desc: descReference('https://github.com/aaaaalexis/obsidian-cupertino'),
      },
      { enable: true },
    )
    .addClassToggle(
      'image-dark-hover',
      {
        title: {
          en: 'Decrease Brightness in Dark Mode',
          zh: '黑暗模式下降低图片亮度',
        },
        desc: {
          en: 'Brightness increases on hover',
          zh: '鼠标悬停时亮度会增加',
        },
      },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Blockquote', zh: '引言块' } })
    .addClassToggle('quote-italic', {
      title: {
        en: 'Use Italic Style in Blockquote',
        zh: '使用斜体',
      },
    })
    .addClassToggle('quote-mark', {
      title: {
        en: 'Enable Quote Mark Style in Reading View',
        zh: '阅读视图下添加前置大引号',
      },
      desc: {
        en: 'Replace front line border with a quotation mark',
        zh: '用引号替代前置边框',
      },
    })
    .addClassSelect(
      'quote-outline-style',
      {
        title: {
          en: 'Blockquote Style in Reading View',
          zh: '阅读视图中引言的样式',
        },
      },
      {
        allowEmpty: false,
        default: 'quote-shadow',
        options: [
          { label: 'Plain', value: 'quote-none' },
          { label: 'Border', value: 'quote-border' },
          { label: 'Shadow', value: 'quote-shadow' },
        ],
      },
    ),
  Settings.ofLevel(1, { title: { en: 'List', zh: '列表' } })
    .addClassToggle(
      'list-enable',
      {
        title: { en: 'Optimize List Style', zh: '优化列表样式' },
        desc: {
          en: '❗No support for list or task items inside callouts',
          zh: '❗精力有限，暂不适配 Callout 中的列表或待办项',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'list-bullet-thread-style',
      {
        title: {
          en: 'Logseq Bullet Thread Style List',
          zh: 'Logseq Bullet Thread 样式的列表',
        },
        desc: descReference(
          'https://gist.github.com/KillyMXI/cbef8edff6dd55d9e6ea4df66567e9b1',
          {
            en: 'Only support bullet list in Live Preview mode',
            zh: '仅支持实时预览模式中的无序列表',
          },
        ),
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-list-marker',
      {
        title: { en: 'List Marker Color', zh: '列表标记颜色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-list-marker-alt',
      {
        title: { en: 'Alternate List Marker Color', zh: '列表标记颜色2' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-list-guide-color',
      {
        title: { en: 'List Guide Line Color', zh: '列表引导线颜色' },
      },
      'hex',
    )
    .children([
      Settings.ofLevel(2, {
        title: { en: 'Task List (Checkbox)', zh: '待办事项（勾选框）' },
      })
        .addClassSelect(
          'list-checkbox-line',
          {
            title: {
              en: 'Completed Items Decoration Style',
              zh: '已完成事项的样式',
            },
          },
          {
            allowEmpty: false,
            default: 'list-checkbox-decoration-default',
            options: [
              {
                label: 'Strikethrough',
                value: 'list-checkbox-decoration-default',
              },
              {
                label: 'Underline',
                value: 'list-checkbox-decoration-underline',
              },
              { label: 'None', value: 'list-checkbox-decoration-none' },
            ],
          },
        )
        .addClassToggle('list-checkbox-gray', {
          title: {
            en: 'Gray Out Completed Items',
            zh: '已完成的事项使用灰色文字',
          },
        })
        .addClassToggle(
          'list-checkbox-alternative',
          {
            title: {
              en: 'Enhanced Checkbox Styles',
              zh: '更多的勾选框样式',
            },
            desc: {
              en: 'Disable this if you are using your own implementation via a CSS snippet',
              zh: '如果您正在使用自己的 CSS 片段实现，请禁用此选项',
            },
          },
          { enable: true },
        )
        .addVarThemedColor(
          'setting-list-checkbox-color',
          {
            title: { en: 'Checkbox Marker Color', zh: '勾选框标记颜色' },
          },
          'hex',
        )
        .addVarThemedColor(
          'setting-list-checkbox-color-hover',
          {
            title: {
              en: 'Checkbox Marker Hover Color',
              zh: '勾选框标记悬停颜色',
            },
          },
          'hex',
        )
        .addVarThemedColor(
          'setting-list-checkbox-border',
          {
            title: {
              en: 'Checkbox Marker Border Color',
              zh: '勾选框标记边框颜色',
            },
          },
          'hex',
        ),
    ]),
  Settings.ofLevel(1, { title: { en: 'Code', zh: '代码' } })
    .addVarThemedColor(
      'setting-code-inline',
      {
        title: { en: 'Inline Code Color', zh: '行内代码文字色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-code-bg',
      {
        title: { en: 'Code Block Background Color', zh: '代码块背景色' },
      },
      'hex',
    )
    .addClassToggle(
      'code-line-number',
      {
        title: {
          en: 'Enable Code Block Line Numbers in Live Preview Mode',
          zh: '在实时预览模式下启用代码块行号',
        },
        desc: {
          en: "Due to the limitation of Obsidian's render strategy, if the code block has too many lines, line numbering may be incorrect",
          zh: '由于 Obsidian 渲染方式的限制，如果代码块行数过多，行号可能会出现错误',
        },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-code-language-color',
      {
        title: { en: 'Language Indicator Color', zh: '语言标识颜色' },
      },
      'hex',
    )
    .addClassToggle(
      'code-language',
      {
        title: {
          en: 'Enable Code Block Language Indicator in Reading View',
          zh: '在阅读视图下启用代码块语言标识',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'code-nowrap',
      {
        title: {
          en: 'Prevent Code Wrapping in Reading View',
          zh: '阅读视图下代码过长时不换行',
        },
        desc: {
          en: 'Only effective in editor',
          zh: '仅在编辑器内生效',
        },
      },
      { enable: true },
    )
    .addClassToggle('code-preview-bg', {
      title: {
        en: 'Enable Code Block Background in Reading View',
        zh: '在阅读视图下启用代码块背景',
      },
    })
    .addVarText('setting-code-bg-outer', {
      title: {
        en: 'Custom Code Block Background in Reading View',
        zh: '自定义阅读视图下代码块背景',
      },
      desc: descValidCSS('background'),
    })
    .addClassToggle('code-mac-style-header', {
      title: {
        en: 'Add macOS Style Code Block Header in Reading View',
        zh: '在阅读视图下为代码块添加 macOS 风格标题栏',
      },
      desc: {
        en: 'No code block border; No effective when exporting PDF',
        zh: '无代码块边框；导出 PDF 时不生效',
      },
    })
    .addClassToggle(
      'code-theme',
      {
        title: { en: "Use Theme's Color Scheme", zh: '使用主题的代码高亮方案' },
      },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Tag', zh: '标签' } })
    .addClassToggle('tag-click-to-edit', {
      title: {
        en: 'Click to Edit Tags in Live Preview Mode',
        zh: '在实时预览模式下点击标签进行编辑',
      },
      desc: { en: 'Click "#" to jump', zh: '点击 “#” 跳转' },
    })
    .addClassSelect(
      'tag-style',
      {
        title: { en: 'Tag Style', zh: '标签样式' },
        desc: {
          en: 'Tags like "#obsidian", "#todo", "#important", "#progress", and "#complete" will be colorized when using "Outline" or "Fill" styles',
          zh: '当选择 “Outline” 或 “Fill” 样式时，“#obsidian”、“#todo”、“#important”、“#progress”、“#complete” 标签会有额外颜色',
        },
      },
      {
        allowEmpty: false,
        default: 'tag-outline',
        options: [
          { label: 'Default', value: 'tag-default' },
          { label: 'Plain', value: 'tag-plain' },
          { label: 'Outline', value: 'tag-outline' },
          { label: 'Fill', value: 'tag-fill' },
        ],
      },
    )
    .addVarThemedColor(
      'setting-tag-bg',
      {
        title: { en: 'Tag Background Color', zh: '标签背景色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-tag-color',
      {
        title: { en: 'Tag Text Color', zh: '标签文字色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-tag-border',
      {
        title: { en: 'Tag Border Color', zh: '标签边框颜色' },
      },
      'hex',
    ),
  Settings.ofLevel(1, { title: { en: 'Canvas', zh: '白板' } })
    .addClassToggle('canvas-group-hide', {
      title: {
        en: 'Hide Left Canvas Control Buttons',
        zh: '隐藏左侧控制按钮',
      },
      desc: { en: 'Shows on hover', zh: '鼠标移入时显示' },
    })
    .addClassToggle('canvas-center', {
      title: {
        en: 'Center Text in Card When Focus is Lost',
        zh: '卡片失去焦点时居中文本',
      },
    }),
  Settings.ofLevel(1, { title: { en: 'PDF', zh: 'PDF' } })
    .addClassToggle(
      'pdf-dark-hover',
      {
        title: {
          en: 'Decrease Brightness in Dark Mode',
          zh: '黑暗模式下降低图片亮度',
        },
        desc: {
          en: 'Brightness increases on hover',
          zh: '鼠标悬停时亮度会增加',
        },
      },
      { enable: true },
    )
    .addClassToggle('pdf-dark-invert', {
      title: {
        en: 'Invert Colors in Dark Mode',
        zh: '黑暗模式下反转颜色',
      },
    })
    .children([
      Settings.ofLevel(2, {
        title: { en: 'PDF Export', zh: 'PDF 导出' },
        open: true,
      })
        .addClassToggle('pdf-export-transparent', {
          title: {
            en: 'Set Background to Transparent',
            zh: '导出时将页面背景色设置为透明',
          },
        })
        .addClassToggle('pdf-export-page-break', {
          title: {
            en: 'Better Page Break Strategy',
            zh: '更好的分页策略',
          },
          desc: {
            en: 'Always break page before H1 headings; avoid page breaks inside images, tables, and code blocks',
            zh: '在 H1 标题前强制分页；避免在图片、表格和代码块内分页',
          },
        })
        .addClassToggle('pdf-export-standard', {
          title: {
            en: 'Standard Spacing Between Paragraphs and List',
            zh: '标准的段落和列表的间距',
          },
        })
        .addClassToggle('pdf-export-default-hr', {
          title: {
            en: 'Use Default Style for Horizontal Rule',
            zh: '使用默认的水平线样式',
          },
        }),
    ]),
  Settings.ofLevel(1, {
    title: { en: 'Properties', zh: '文档属性' },
  })
    .addClassToggle('prop-outline', {
      title: { en: 'Add Outline for Property Panel', zh: '属性面板添加边框' },
    })
    .addClassToggle('prop-hide-preview', {
      title: {
        en: 'Hide Property Panel in Reading View',
        zh: '阅读视图下隐藏属性面板',
      },
    }),
])
