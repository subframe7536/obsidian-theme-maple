import { Settings } from './generator'

export default Settings.create('maple-editor', '✏️ Maple Editor').children([
  Settings.ofLevel(1, { title: { en: 'Background', zh: '背景' } })
    .addVarThemedColor(
      'setting-editor-bg',
      {
        title: { en: 'Editor Background Color', zh: '编辑器背景色' },
      },
      {
        format: 'hsl-values',
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-md-container-bg',
      {
        title: {
          en: 'Editor Container Background Color',
          zh: '编辑器容器背景色',
        },
        desc: {
          en: 'Quote, code block, table and so on',
          zh: '引用、代码块、表格等',
        },
      },
      {
        format: 'hsl-values',
        defaultLight: '#',
        defaultDark: '#',
      },
    ),
  Settings.ofLevel(1, {
    title: { en: 'Text & Font & Line', zh: '文字 & 字体 & 行' },
  })
    .addClassToggle(
      'font-maple',
      {
        title: {
          en: 'Use "Maple Mono" As Monospace Font',
          zh: '使用 Maple Mono 作为等宽字体',
        },
        desc: {
          en: 'https://github.com/subframe7536/Maple-font',
          zh: 'https://github.com/subframe7536/Maple-font',
        },
      },
      { enable: true },
    )
    .addVarText(
      'setting-code-ligature',
      {
        title: {
          en: 'OpenType Feature Config For Monospace Font',
          zh: '等宽字体的 OpenType 特性配置',
        },
      },
      { default: '"calt"' },
    )
    .addClassToggle('font-fix-latex', {
      title: { en: 'Fix Latex Italic Absent', zh: '修复 latex 斜体问题' },
      desc: {
        en: 'Latex in my vault often wrong rendered, so i make this setting. If wrong rendered, just toggle it',
        zh: '在我的仓库里经常渲染失败，只能自己打包一份字体进主题了。只要字体不正常，开关一次即可',
      },
    })
    .addClassToggle('font-latex-text', {
      title: {
        en: 'Use "Text Font" In Non-formula Parts Of Latex',
        zh: '在 latex 非公式部分使用正文字体',
      },
      desc: {
        en: '❗only tested in CJK font, maybe not reconcile with latin characters',
        zh: '默认的字体比较丑',
      },
    })
    .addVarNumSlider(
      'setting-editor-p-spacing',
      {
        title: {
          en: 'Editor Paragraph Spacing (px)',
          zh: '编辑器段落间隔（px）',
        },
      },
      { default: 4, format: 'px', min: 0, max: 20, step: 1 },
    )
    .addVarNumSlider(
      'setting-editor-p-indent',
      {
        title: { en: 'Editor Paragraph Indent', zh: '编辑器段落缩进' },
        desc: {
          en: "If 'p-indent' exist in properties.cssclasses, all paragraph will add indent(n times of font size)",
          zh: "在文档属性的cssclasses中存在 'p-indent' 类时，会为段落添加缩进（字体大小的倍数）",
        },
      },
      { default: 2, min: 0, max: 4, step: 0.2 },
    )
    .addVarNumSlider(
      'setting-line-height',
      {
        title: { en: 'Editor Line Height', zh: '编辑器行高' },
        desc: { en: 'Multiple of the text size', zh: '文字大小的倍数' },
      },
      { default: 1.8, min: 1.2, max: 2.4, step: 0.1 },
    )
    .addVarText(
      'setting-file-line-width',
      {
        title: { en: 'Editor Line Width', zh: '编辑器行宽' },
        desc: {
          en: 'Dynamic width — clamp(MinWidth, WidthPercent, MaxWidth)',
          zh: '动态宽度 — clamp(最小值, 宽度百分比, 最大值)',
        },
      },
      { default: 'clamp(600px, 72%, 850px)' },
    )
    .addVarNumSlider(
      'setting-underline-offset',
      {
        title: { en: 'Underline Offset', zh: '下划线间距' },
      },
      { default: 2, format: 'px', min: 0, max: 8, step: 0.5 },
    )
    .addClassSelect(
      'line-indicator-enable',
      {
        title: { en: 'Hover Line Indicator', zh: '鼠标经过行指示器' },
        desc: {
          en: 'Reference from https://github.com/Akifyss/obsidian-border, need install version>=1.1.9',
          zh: '参考自 https://github.com/Akifyss/obsidian-border, 需要安装版本>=1.1.9',
        },
      },
      {
        allowEmpty: false,
        default: 'line-indicator-disable',
        options: [
          { label: 'none', value: 'line-indicator-disable' },
          { label: 'left', value: 'line-indicator-enable' },
          { label: 'full line', value: 'line-indicator-full' },
        ],
      },
    )
    .addClassSelect(
      'line-active',
      {
        title: { en: 'Active Line Hightlight', zh: '当前行高亮' },
      },
      {
        allowEmpty: false,
        default: 'line-active-enable',
        options: [
          { label: 'none', value: 'line-active-disable' },
          { label: 'left', value: 'line-active-left' },
          { label: 'full line', value: 'line-active-enable' },
        ],
      },
    )
    .addVarThemedColor(
      'setting-line-active-color',
      {
        title: { en: 'Active Line Color', zh: '高亮行颜色' },
      },
      {
        format: 'hsl-values',
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-text-normal',
      {
        title: { en: 'Editor Text Color', zh: '编辑器文字颜色' },
      },
      {
        format: 'hex',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
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
            desc: {
              en: 'The value can be the value of any background attribute in css',
              zh: '填写的值可以为css中任意 background 属性的值',
            },
          },
          { default: 'rgba(255, 208, 0, 0.4)' },
        )
        .addVarThemedColor(
          'setting-text-highlight-color',
          {
            title: { en: 'Highlight Text Color', zh: '文本高亮文字颜色' },
          },
          {
            format: 'hex',
            opacity: true,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarNumSlider(
          'setting-text-highlight-radius',
          {
            title: {
              en: 'Highlight Background Radius',
              zh: '高亮背景色圆角大小',
            },
            desc: { en: 'Format px', zh: '单位 px' },
          },
          { default: 4, min: 0, max: 8, step: 1 },
        )
        .addClassToggle(
          'text-highlight-all-round',
          {
            title: { en: 'Keep Radius When Wrap', zh: '换行时保持圆角' },
            desc: { en: 'Except when edit', zh: '除了编辑的时候' },
          },
          { enable: true },
        )
        .addClassToggle('text-highlight-margin', {
          title: { en: 'Add Spacing Around Highlight', zh: '增加高亮周围边距' },
        }),
      Settings.ofLevel(2, { title: { en: 'Bold', zh: '粗体' } })
        .addVarThemedColor(
          'setting-text-bold-color',
          {
            title: { en: 'Bold Text Color', zh: '粗体颜色' },
          },
          {
            format: 'hex',
            opacity: true,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarText(
          'setting-text-bold-style',
          {
            title: { en: 'Bold Style', zh: '粗体样式' },
            desc: {
              en: 'Support any css text-decoration property',
              zh: '支持任何 css 的 text-decoration 属性值',
            },
          },
          { default: 'underline dotted' },
        )
        .addVarText(
          'setting-text-bold-font',
          {
            title: { en: 'Bold Font', zh: '粗体字体' },
          },
          { default: "''" },
        ),
      Settings.ofLevel(2, { title: { en: 'Italic', zh: '斜体' } })
        .addVarThemedColor(
          'setting-text-italic-color',
          {
            title: { en: 'Italic Text Color', zh: '斜体颜色' },
          },
          {
            format: 'hex',
            opacity: true,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarText(
          'setting-text-italic-style',
          {
            title: { en: 'Italic Style', zh: '斜体样式' },
            desc: {
              en: 'Support any css text-decoration property',
              zh: '支持任何 css 的 text-decoration 属性值',
            },
          },
          { default: 'underline dotted' },
        )
        .addVarText(
          'setting-text-italic-font',
          {
            title: { en: 'Italic Font', zh: '斜体字体' },
          },
          { default: "''" },
        ),
    ]),
  Settings.ofLevel(1, { title: { en: 'Link', zh: '链接' } })
    .addClassToggle('link-hover-expand', {
      title: {
        en: 'Use Underline Animation On Hover',
        zh: '鼠标经过时开启下划线动画',
      },
    })
    .addClassToggle(
      'link-icon',
      {
        title: {
          en: 'Add Icon Before Link In Editor',
          zh: '编辑器内链接前添加图标',
        },
      },
      { enable: true },
    )
    .addClassToggle('link-heading', {
      title: { en: 'Compatible With Heading Style', zh: '兼容标题样式' },
      desc: {
        en: 'Keep link color with heading, but keep icon',
        zh: '链接颜色改为标题颜色，保留图标',
      },
    })
    .addClassToggle('link-click-to-edit-in-live-preview', {
      title: {
        en: 'Click To Edit Link In Live-Preview',
        zh: '实时预览 模式时点击链接进行编辑而不是跳转',
      },
      desc: {
        en: '❗will disable hover animation, external link prefix icon will be diabled',
        zh: '❗鼠标经过动画会消失，外部链接的前置图标会消失',
      },
    })
    .children([
      Settings.ofLevel(2, { title: { en: 'Link Color', zh: '链接颜色' } })
        .addVarThemedColor(
          'setting-link-internal-color',
          {
            title: { en: 'Internal Link Color', zh: '内部链接颜色' },
          },
          {
            format: 'rgb-values',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarThemedColor(
          'setting-link-internal-color-underline',
          {
            title: {
              en: 'Internal Link Underline Color',
              zh: '内部链接下划线颜色',
            },
          },
          {
            format: 'rgb',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarThemedColor(
          'setting-link-external-color',
          {
            title: { en: 'External Link Color', zh: '外部链接颜色' },
          },
          {
            format: 'rgb-values',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarThemedColor(
          'setting-link-external-color-underline',
          {
            title: {
              en: 'External Link Underline Color',
              zh: '外部链接下划线颜色',
            },
          },
          {
            format: 'rgb',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        ),
    ]),
  Settings.ofLevel(1, { title: { en: 'Heading', zh: '标题' } })
    .addClassToggle('fix-line-number', {
      title: { en: 'Fix Line Number Movement', zh: '修复行号的移动' },
      desc: { en: "Will increase '#' size", zh: "将增加 '#' 的大小" },
    })
    .children([
      Settings.ofLevel(2, {
        title: { en: 'Heading Level Icon', zh: '标题等级图标' },
      })
        .addClassToggle('heading-level-enable', {
          title: { en: 'Level Heading Icon', zh: '标题等级图标' },
        })
        .addClassToggle('heading-level-fix', {
          title: { en: 'Always Show Heading Icon', zh: '总是显示图标' },
          desc: { en: 'Highlight on hover', zh: '鼠标经过时高亮' },
        }),
      Settings.ofLevel(2, {
        title: { en: 'Heading Style Preference', zh: '标题样式设置' },
      })
        .addClassToggle(
          'heading-h1-center',
          {
            title: { en: 'Centered Heading 1', zh: '居中一级标题' },
          },
          { enable: true },
        )
        .addClassToggle('heading-underline-thin', {
          title: { en: 'Thinner Heading Underline', zh: '标题下划线变细' },
        })
        .addClassToggle(
          'heading-h6-variant',
          {
            title: {
              en: 'Set Font Small-caps For Heading 6',
              zh: '为六级标题设置 small-caps 样式',
            },
            desc: {
              en: 'All characters are capitalized',
              zh: '所有字母都是大写',
            },
          },
          { enable: true },
        ),
      Settings.ofLevel(2, { title: { en: 'Heading Color', zh: '标题颜色' } })
        .addClassSelect(
          'heading-color-style',
          {
            title: { en: 'Heading Color Style', zh: '标题颜色样式' },
          },
          {
            allowEmpty: false,
            default: 'heading-color-colorful',
            options: [
              { label: 'text color', value: 'heading-color-base' },
              { label: 'accent color', value: 'heading-color-accent' },
              { label: 'colorful', value: 'heading-color-colorful' },
            ],
          },
        )
        .children([
          Settings.ofLevel(3, {
            title: { en: 'Custom Heading Color', zh: '自定义标题颜色' },
          })
            .addVarThemedColor(
              'setting-h1-color',
              {
                title: { en: 'H1 Color', zh: '标题 1 颜色' },
              },
              {
                format: 'hex',
                opacity: false,
                defaultLight: '#',
                defaultDark: '#',
              },
            )
            .addVarThemedColor(
              'setting-h2-color',
              {
                title: { en: 'H2 Color', zh: '标题 2 颜色' },
              },
              {
                format: 'hex',
                opacity: false,
                defaultLight: '#',
                defaultDark: '#',
              },
            )
            .addVarThemedColor(
              'setting-h3-color',
              {
                title: { en: 'H3 Color', zh: '标题 3 颜色' },
              },
              {
                format: 'hex',
                opacity: false,
                defaultLight: '#',
                defaultDark: '#',
              },
            )
            .addVarThemedColor(
              'setting-h4-color',
              {
                title: { en: 'H4 Color', zh: '标题 4 颜色' },
              },
              {
                format: 'hex',
                opacity: false,
                defaultLight: '#',
                defaultDark: '#',
              },
            )
            .addVarThemedColor(
              'setting-h5-color',
              {
                title: { en: 'H5 Color', zh: '标题 5 颜色' },
              },
              {
                format: 'hex',
                opacity: false,
                defaultLight: '#',
                defaultDark: '#',
              },
            )
            .addVarThemedColor(
              'setting-h6-color',
              {
                title: { en: 'H6 Color', zh: '标题 6 颜色' },
              },
              {
                format: 'hex',
                opacity: false,
                defaultLight: '#',
                defaultDark: '#',
              },
            ),
        ]),
      Settings.ofLevel(2, { title: { en: 'Heading Size', zh: '标题大小' } })
        .addVarNumSlider(
          'setting-h1-size',
          {
            title: { en: 'H1 Font Size', zh: '标题 1 字体大小' },
          },
          { default: 1.6, min: 1, max: 2.4, step: 0.1 },
        )
        .addVarNumSlider(
          'setting-h2-size',
          {
            title: { en: 'H2 Font Size', zh: '标题 2 字体大小' },
          },
          { default: 1.5, min: 1, max: 2.4, step: 0.1 },
        )
        .addVarNumSlider(
          'setting-h3-size',
          {
            title: { en: 'H3 Font Size', zh: '标题 3 字体大小' },
          },
          { default: 1.4, min: 1, max: 2.4, step: 0.1 },
        )
        .addVarNumSlider(
          'setting-h4-size',
          {
            title: { en: 'H4 Font Size', zh: '标题 4 字体大小' },
          },
          { default: 1.3, min: 1, max: 2.4, step: 0.1 },
        )
        .addVarNumSlider(
          'setting-h5-size',
          {
            title: { en: 'H5 Font Size', zh: '标题 5 字体大小' },
          },
          { default: 1.2, min: 1, max: 2.4, step: 0.1 },
        )
        .addVarNumSlider(
          'setting-h6-size',
          {
            title: { en: 'H6 Font Size', zh: '标题 6 字体大小' },
          },
          { default: 1.1, min: 1, max: 2.4, step: 0.1 },
        ),
      Settings.ofLevel(2, {
        title: { en: 'Heading Underline', zh: '标题下划线' },
      })
        .addClassToggle('heading-h1-underline', {
          title: { en: 'Add Underline For H1', zh: '添加 h1 下划线' },
        })
        .addClassToggle(
          'heading-h2-underline',
          {
            title: { en: 'Add Underline For H2', zh: '添加 h2 下划线' },
          },
          { enable: true },
        )
        .addClassToggle('heading-h3-underline', {
          title: { en: 'Add Underline For H3', zh: '添加 h3 下划线' },
        })
        .addClassToggle('heading-h4-underline', {
          title: { en: 'Add Underline For H4', zh: '添加 h4 下划线' },
        })
        .addClassToggle('heading-h5-underline', {
          title: { en: 'Add Underline For H5', zh: '添加 h5 下划线' },
        })
        .addClassToggle('heading-h6-underline', {
          title: { en: 'Add Underline For H6', zh: '添加 h6 下划线' },
        }),
      Settings.ofLevel(2, { title: { en: 'Heading Font', zh: '标题字体' } })
        .addVarText(
          'setting-h1-font',
          {
            title: { en: 'H1 Font', zh: '标题 1 字体' },
          },
          { default: "''" },
        )
        .addVarText(
          'setting-h2-font',
          {
            title: { en: 'H2 Font', zh: '标题 2 字体' },
          },
          { default: "''" },
        )
        .addVarText(
          'setting-h3-font',
          {
            title: { en: 'H3 Font', zh: '标题 3 字体' },
          },
          { default: "''" },
        )
        .addVarText(
          'setting-h4-font',
          {
            title: { en: 'H4 Font', zh: '标题 4 字体' },
          },
          { default: "''" },
        )
        .addVarText(
          'setting-h5-font',
          {
            title: { en: 'H5 Font', zh: '标题 5 字体' },
          },
          { default: "''" },
        )
        .addVarText(
          'setting-h6-font',
          {
            title: { en: 'H6 Font', zh: '标题 6 字体' },
          },
          { default: "''" },
        ),
    ]),
  Settings.ofLevel(1, { title: { en: 'Hr', zh: '分隔行' } })
    .addClassToggle(
      'hr-enable',
      {
        title: { en: 'Enable Hr Style', zh: '开启分割线样式' },
      },
      { enable: true },
    )
    .addVarText(
      'setting-hr-icon',
      {
        title: { en: 'Set Icon In The Center Of Hr', zh: '分割行中部图标' },
      },
      { default: "'⭐'" },
    ),
  Settings.ofLevel(1, { title: { en: 'Table', zh: '表格' } })
    .addClassToggle(
      'table-full',
      {
        title: { en: 'Full Width Table', zh: '全宽表格' },
      },
      { enable: true },
    )
    .addClassToggle(
      'table-colorful',
      {
        title: { en: 'Colorful Table', zh: '多彩表格' },
        desc: { en: 'Accent header and line color', zh: '添加表头和行的颜色' },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-table-header-text',
      {
        title: { en: 'Header Text Color', zh: '表头文字色' },
      },
      {
        format: 'hex',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-table-header-bg',
      {
        title: { en: 'Header Background Color', zh: '表头背景色' },
      },
      {
        format: 'hex',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-table-line-bg',
      {
        title: { en: 'Alt Line Color', zh: '交错行背景色' },
      },
      {
        format: 'hex',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    ),
  Settings.ofLevel(1, { title: { en: 'Embed File', zh: '内嵌文档' } })
    .addClassToggle(
      'embed-enable',
      {
        title: { en: 'Block Style Embed File', zh: '块状的内嵌文档' },
      },
      { enable: true },
    )
    .addClassToggle(
      'embed-title-right-top',
      {
        title: {
          en: 'Move Embed Title To Right Top',
          zh: '内嵌文档标题移至右上角',
        },
        desc: {
          en: "Visiable on hover, disabled when alias is '#', Example ![[FileName|#]]",
          zh: "鼠标经过时显示；别名为'#'时禁用，例：![[文件名|#]]",
        },
      },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Image', zh: '图片' } })
    .addClassToggle(
      'image-alt',
      {
        title: {
          en: 'Add Alt Text Below And Center The Image',
          zh: '在图片底部添加提示文本并居中图片',
        },
        desc: {
          en: 'Example ![[image.jpg|alt text]]',
          zh: '样例 ![[图片.jpg|提示文本]]',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'image-zoom',
      {
        title: { en: 'Click To Zoom Out Image', zh: '鼠标按下时放大图片' },
        desc: {
          en: 'Invalid in source view or Live-Preview',
          zh: '在 源码模式 或者 实时预览 模式不生效',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'image-zoom-out',
      {
        title: {
          en: 'Zoom Out The Image To Full Screen',
          zh: '图片放大到全屏',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'image-dark-hover',
      {
        title: {
          en: 'Decrease Brightness In Dark Mode',
          zh: '黑暗模式下降低图片亮度',
        },
        desc: {
          en: 'Hover will increase brightness',
          zh: '鼠标经过时会增加亮度',
        },
      },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Quote', zh: '引言' } })
    .addClassToggle(
      'quote-theme',
      {
        title: { en: 'Alternative Quote Style', zh: '另一种引言样式' },
        desc: { en: 'With thick guide line', zh: '宽引导线' },
      },
      { enable: true },
    )
    .addClassToggle('quote-mark', {
      title: {
        en: 'Add Front Quote Mark In Preview Mode',
        zh: '阅读模式 引言块添加前置引号',
      },
    })
    .addClassSelect(
      'quote-outline-style',
      {
        title: { en: 'Preview Mode Outline Style', zh: '阅读模式 外部样式' },
      },
      {
        allowEmpty: false,
        default: 'quote-shadow',
        options: [
          { label: 'none', value: 'quote-none' },
          { label: 'border', value: 'quote-border' },
          { label: 'shadow', value: 'quote-shadow' },
        ],
      },
    ),
  Settings.ofLevel(1, { title: { en: 'List', zh: '列表' } })
    .addClassToggle(
      'list-enable',
      {
        title: { en: 'Optimize List Style', zh: '优化列表样式' },
        desc: {
          en: '❗no support for list or task items inside callout',
          zh: '❗精力有限，不打算适配 callout 中的列表或者代办项',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'list-bullet-thread-style',
      {
        title: {
          en: 'Logseq Bullet Thread Style List',
          zh: 'logseq bullet thread 样式的列表',
        },
        desc: { en: '❗WIP', zh: '❗待完成' },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-list-marker',
      {
        title: { en: 'List Marker Color', zh: '列表标号颜色' },
      },
      {
        format: 'hex',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-list-marker-alt',
      {
        title: { en: 'List Marker Alt Color', zh: '列表标号颜色 2' },
      },
      {
        format: 'hex',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .children([
      Settings.ofLevel(2, {
        title: { en: 'Task List (checkbox)', zh: '待办事项（勾选框）' },
      })
        .addClassToggle('list-checkbox-line', {
          title: {
            en: 'Remove Middle Line In Completed Item',
            zh: '移除已完成事项上的删除线',
          },
        })
        .addClassToggle('list-checkbox-alternative', {
          title: { en: 'Enable Alternative Checkboxes', zh: '增加勾选框样式' },
          desc: {
            en: 'Disable this if you are using your own implementation via a CSS Snippet.',
            zh: '如果你用了其他勾选框 CSS 片段，可以关闭',
          },
        })
        .addVarThemedColor(
          'setting-list-checkbox-color',
          {
            title: { en: 'Checkbox Marker Color', zh: '勾选框颜色' },
          },
          {
            format: 'hex',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarThemedColor(
          'setting-list-checkbox-color-hover',
          {
            title: {
              en: 'Checkbox Marker Hover Color',
              zh: '勾选框鼠标经过色',
            },
          },
          {
            format: 'hex',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarThemedColor(
          'setting-list-checkbox-border',
          {
            title: { en: 'Checkbox Marker Border', zh: '勾选框边框' },
          },
          {
            format: 'hex',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        ),
    ]),
  Settings.ofLevel(1, { title: { en: 'Code', zh: '代码' } })
    .addVarThemedColor(
      'setting-code-inline',
      {
        title: { en: 'Inline Code Color', zh: '行内代码文字色' },
      },
      {
        format: 'hex',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-code-bg',
      {
        title: { en: 'Code Block Background Color', zh: '代码块背景色' },
      },
      {
        format: 'hex',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addClassToggle(
      'code-line-number',
      {
        title: {
          en: 'Add Code Block Line Number In Live Preview Mode',
          zh: '为 实时预览模式 代码块添加行号',
        },
        desc: {
          en: 'If the code block lines are too large, the line number will have error',
          zh: '如果代码块行数太多，行号会出现错误',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'code-language',
      {
        title: {
          en: 'Add Code Block Language Indicator In Preview Mode',
          zh: '为 阅读模式 代码块添加语言标识',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'code-nowrap',
      {
        title: { en: 'No Wrap In Preview Mode', zh: '阅读模式 代码块不换行' },
      },
      { enable: true },
    )
    .addVarText(
      'setting-code-ligature',
      {
        title: { en: 'Monospace Font Feature', zh: '等宽字体字体特性' },
        desc: {
          en: "If you use “Maple Mono” as monospace, recommend to set 'calt','cv02'",
          zh: "如果你使用“Maple Mono”作为等宽字体，推荐设置为 'calt','cv02'",
        },
      },
      { default: "'calt'" },
    )
    .addClassToggle('code-preview-bg', {
      title: {
        en: 'Enable Codeblock Background In Preview Mode',
        zh: '在 阅读模式 开启代码块背景',
      },
      desc: {
        en: 'Need install version >= 1.1.9',
        zh: '需要安装程序版本 >= 1.1.9',
      },
    })
    .addVarText(
      'setting-code-bg-outer',
      {
        title: {
          en: 'Custom Codeblock Background In Preview Mode',
          zh: '修改 阅读模式 代码块背景',
        },
        desc: {
          en: 'Need install version >= 1.1.9, image is supported(eg. \'url("/your/image/uri")\'), it can be all the css value that supported by background-image',
          zh: '需要安装程序版本 >= 1.1.9，支持图片（\'url("图片地址")\'），可以是 css background-image 支持的所有的值',
        },
      },
      { default: "''" },
    )
    .addClassToggle('code-mac-style-header', {
      title: {
        en: 'Add Mac Style Code Block Header In Preview Mode',
        zh: '为 阅读模式 代码块添加mac的标题栏',
      },
      desc: { en: 'No code block border', zh: '没有代码块边框' },
    })
    .addVarThemedColor(
      'setting-code-language-color',
      {
        title: { en: 'Language Indicator Color', zh: '语言标识颜色' },
      },
      {
        format: 'hex',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addClassToggle(
      'code-theme',
      {
        title: { en: "Use Theme's Color Schema", zh: '使用主题的代码高亮' },
      },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Tag', zh: '标签' } })
    .addClassToggle('tag-click-to-edit', {
      title: {
        en: 'Click To Edit Tags In Live-Preview Mode',
        zh: '点击标签进行编辑',
      },
      desc: { en: "Click '#' to jump", zh: "点击'#'跳转" },
    })
    .addClassSelect(
      'tag-style',
      {
        title: { en: 'Tag Style', zh: '标签样式' },
        desc: {
          en: 'Tags of obsidian / todo / important / progress / complete will be colorized when use outline or fill',
          zh: '当选择 outline 或者 fill 时，obsidian / todo / important / progress / complete 标签会有额外颜色',
        },
      },
      {
        allowEmpty: false,
        default: 'tag-outline',
        options: [
          { label: 'default', value: 'tag-default' },
          { label: 'plain', value: 'tag-plain' },
          { label: 'outline', value: 'tag-outline' },
          { label: 'fill', value: 'tag-fill' },
        ],
      },
    )
    .addVarThemedColor(
      'setting-tag-bg',
      {
        title: { en: 'Tag Background Color', zh: '标签背景颜色' },
      },
      {
        format: 'hex',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .children([
      Settings.ofLevel(2, {
        title: { en: 'Outline Style Setting', zh: '边框模式设置' },
      })
        .addVarThemedColor(
          'setting-tag-color',
          {
            title: { en: 'Tag Text Color', zh: '标签文字颜色' },
          },
          {
            format: 'hex',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        )
        .addVarThemedColor(
          'setting-tag-border',
          {
            title: { en: 'Tag Border Color', zh: '标签边框颜色' },
          },
          {
            format: 'hex',
            opacity: false,
            defaultLight: '#',
            defaultDark: '#',
          },
        ),
    ]),
  Settings.ofLevel(1, { title: { en: 'Canvas', zh: '白板' } })
    .addClassToggle('canvas-group-hide', {
      title: {
        en: 'Hide Left Canvas Control Buttons',
        zh: '隐藏左侧的控制按钮',
      },
      desc: { en: 'Show on hover', zh: '鼠标移入时显示' },
    })
    .addClassToggle('canvas-center', {
      title: {
        en: 'Center Text In Card When Blur Focus',
        zh: '卡片失去焦点时居中文本',
      },
    }),
  Settings.ofLevel(1, { title: { en: 'PDF', zh: 'PDF' } }).addClassToggle(
    'pdf-dark-hover',
    {
      title: {
        en: 'Decrease Brightness In Dark Mode',
        zh: '黑暗模式下降低图片亮度',
      },
      desc: {
        en: 'Hover will increase brightness',
        zh: '鼠标经过时会增加亮度',
      },
    },
    { enable: true },
  ),
  Settings.ofLevel(1, {
    title: { en: 'Properties', zh: '文档属性' },
  }).addClassToggle(
    'prop-outline',
    {
      title: { en: 'Add Outlint For Property Panel', zh: '属性面板添加边框' },
    },
    { enable: true },
  ),
])
