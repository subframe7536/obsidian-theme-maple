import { descValidCSS, Settings } from './generator'

export default Settings.create('maple-editor', 'Maple Editor').children([
  Settings.ofLevel(1, {
    title: { en: 'Editor Background Pattern', zh: '编辑器背景图案' },
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
        title: { en: 'Editor Background Dot Color', zh: '编辑器背景点颜色' },
      },
      { format: 'rgb', opacity: true, defaultLight: '#', defaultDark: '#' },
    )
    .addVarThemedColor(
      'setting-editor-bg-grid-line',
      {
        title: {
          en: 'Editor Background Grid Line Color',
          zh: '编辑器背景网格线颜色',
        },
      },
      { format: 'rgb', opacity: true, defaultLight: '#', defaultDark: '#' },
    )
    .addVarNumSlider(
      'setting-editor-bg-grid-spacing',
      {
        title: {
          en: 'Editor Background Grid Spacing',
          zh: '编辑器背景网格间距',
        },
      },
      { format: 'px', default: 20, min: 10, max: 30, step: 1 },
    )
    .addVarThemedColor(
      'setting-md-container-bg',
      {
        title: {
          en: 'Editor Container Background Color',
          zh: '编辑器容器背景颜色',
        },
        desc: {
          en: 'For elements like quotes, code blocks, and tables',
          zh: '用于引用、代码块、表格等元素',
        },
      },
      'hsl-values',
    ),
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
    .addClassToggle('font-latex-text', {
      title: {
        en: 'Use Text Font in Non-formula Parts of LaTeX',
        zh: '在 LaTeX 非公式部分使用正文字体',
      },
      desc: {
        en: 'Only tested with CJK fonts; may not reconcile with Latin characters',
        zh: '默认字体较丑',
      },
    }),
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
              zh: '文本高亮背景颜色',
            },
            desc: descValidCSS('background'),
          },
          { default: 'rgba(255, 208, 0, 0.4)' },
        )
        .addVarThemedColor(
          'setting-text-highlight-color',
          {
            title: { en: 'Highlight Text Color', zh: '文本高亮文字颜色' },
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
            desc: { en: 'Value in pixels (px)', zh: '单位：像素 (px)' },
          },
          { default: 4, min: 0, max: 8, step: 1 },
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
          'hex',
        )
        .addVarText(
          'setting-text-bold-style',
          {
            title: { en: 'Bold Style', zh: '粗体样式' },
            desc: descValidCSS('text-decoration'),
          },
          { default: 'underline dotted' },
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
          { default: 'underline dotted' },
        )
        .addVarText('setting-text-italic-font', {
          title: { en: 'Italic Font', zh: '斜体字体' },
          desc: descValidCSS('font-family'),
        }),
    ]),
  Settings.ofLevel(1, {
    title: { en: 'Line and Spacing', zh: '行和间距' },
  })
    .addVarNumSlider(
      'setting-editor-p-spacing',
      {
        title: {
          en: 'Editor Paragraph Spacing (px)',
          zh: '编辑器段落间距（px）',
        },
      },
      { default: 4, format: 'px', min: 0, max: 20, step: 1 },
    )
    .addVarNumSlider(
      'setting-editor-p-indent',
      {
        title: { en: 'Editor Paragraph Indent', zh: '编辑器段落缩进' },
        desc: {
          en: 'If "p-indent" exists in properties.cssclasses, all paragraphs will be indented (n times font size)',
          zh: '当文档属性的 cssclasses 中存在 “p-indent” 类时，会为所有段落添加缩进（字体大小的倍数）',
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
        desc: descValidCSS('width'),
      },
      { default: 'clamp(600px, 72%, 850px)' },
    )
    .addClassSelect(
      'line-indicator-enable',
      {
        title: { en: 'Hover Line Indicator', zh: '鼠标悬停行指示器' },
        desc: {
          en: 'Reference: https://github.com/Akifyss/obsidian-border',
          zh: '参考：https://github.com/Akifyss/obsidian-border',
        },
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
    .addClassToggle('fix-line-number', {
      title: { en: 'Fix Line Number Movement', zh: '修复行号移动' },
      desc: { en: 'Will restore "#" size', zh: '将恢复 “#” 的大小' },
    })
    .children([
      Settings.ofLevel(2, {
        title: { en: 'Heading Level Icon', zh: '标题等级图标' },
      })
        .addClassToggle('heading-level-enable', {
          title: { en: 'Enable Level Heading Icon', zh: '启用标题等级图标' },
        })
        .addClassToggle('heading-level-fix', {
          title: { en: 'Always Show Heading Icon', zh: '始终显示图标' },
          desc: { en: 'Highlights on hover', zh: '鼠标悬停时高亮' },
        }),
      Settings.ofLevel(2, {
        title: { en: 'Heading Style Preference', zh: '标题样式偏好' },
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
              en: 'Set Small-caps Font for Heading 6',
              zh: '为六级标题设置小型大写字母样式',
            },
            desc: {
              en: 'All characters are capitalized',
              zh: '所有字母都大写',
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
              { label: 'Text Color', value: 'heading-color-base' },
              { label: 'Accent Color', value: 'heading-color-accent' },
              { label: 'Colorful', value: 'heading-color-colorful' },
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
              'hex',
            )
            .addVarThemedColor(
              'setting-h2-color',
              {
                title: { en: 'H2 Color', zh: '标题 2 颜色' },
              },
              'hex',
            )
            .addVarThemedColor(
              'setting-h3-color',
              {
                title: { en: 'H3 Color', zh: '标题 3 颜色' },
              },
              'hex',
            )
            .addVarThemedColor(
              'setting-h4-color',
              {
                title: { en: 'H4 Color', zh: '标题 4 颜色' },
              },
              'hex',
            )
            .addVarThemedColor(
              'setting-h5-color',
              {
                title: { en: 'H5 Color', zh: '标题 5 颜色' },
              },
              'hex',
            )
            .addVarThemedColor(
              'setting-h6-color',
              {
                title: { en: 'H6 Color', zh: '标题 6 颜色' },
              },
              'hex',
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
          title: { en: 'Add Underline for H1', zh: '为 H1 添加下划线' },
        })
        .addClassToggle(
          'heading-h2-underline',
          {
            title: { en: 'Add Underline for H2', zh: '为 H2 添加下划线' },
          },
          { enable: true },
        )
        .addClassToggle('heading-h3-underline', {
          title: { en: 'Add Underline for H3', zh: '为 H3 添加下划线' },
        })
        .addClassToggle('heading-h4-underline', {
          title: { en: 'Add Underline for H4', zh: '为 H4 添加下划线' },
        })
        .addClassToggle('heading-h5-underline', {
          title: { en: 'Add Underline for H5', zh: '为 H5 添加下划线' },
        })
        .addClassToggle('heading-h6-underline', {
          title: { en: 'Add Underline for H6', zh: '为 H6 添加下划线' },
        }),
      Settings.ofLevel(2, { title: { en: 'Heading Font', zh: '标题字体' } })
        .addVarText('setting-h1-font', {
          title: { en: 'H1 Font', zh: '标题 1 字体' },
          desc: descValidCSS('font-family'),
        })
        .addVarText('setting-h2-font', {
          title: { en: 'H2 Font', zh: '标题 2 字体' },
          desc: descValidCSS('font-family'),
        })
        .addVarText('setting-h3-font', {
          title: { en: 'H3 Font', zh: '标题 3 字体' },
          desc: descValidCSS('font-family'),
        })
        .addVarText('setting-h4-font', {
          title: { en: 'H4 Font', zh: '标题 4 字体' },
          desc: descValidCSS('font-family'),
        })
        .addVarText('setting-h5-font', {
          title: { en: 'H5 Font', zh: '标题 5 字体' },
          desc: descValidCSS('font-family'),
        })
        .addVarText('setting-h6-font', {
          title: { en: 'H6 Font', zh: '标题 6 字体' },
          desc: descValidCSS('font-family'),
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
        desc: {
          en: 'Accented header and line colors; ignore DataView table',
          zh: '加深表头和行的颜色；忽略 DataView 表格',
        },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-table-header-text',
      {
        title: { en: 'Header Text Color', zh: '表头文字颜色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-table-header-bg',
      {
        title: { en: 'Header Background Color', zh: '表头背景颜色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-table-line-bg',
      {
        title: { en: 'Striped Background Color', zh: '斑马纹背景颜色' },
      },
      'hex',
    ),
  Settings.ofLevel(1, { title: { en: 'Embed File', zh: '内嵌文件' } })
    .addClassToggle(
      'embed-enable',
      {
        title: { en: 'Block Style Embed File', zh: '块状内嵌文件' },
      },
      { enable: true },
    )
    .addClassToggle(
      'embed-title-right-top',
      {
        title: {
          en: 'Move Embed Title to Top Right',
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
        desc: {
          en: 'Reference: https://github.com/aaaaalexis/obsidian-cupertino',
          zh: '参考：https://github.com/aaaaalexis/obsidian-cupertino',
        },
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
  Settings.ofLevel(1, { title: { en: 'Quote', zh: '引言' } })
    .addClassToggle('quote-mark', {
      title: {
        en: 'Add Front Quote Mark in Reading View',
        zh: '阅读视图下引言块添加前置引号',
      },
    })
    .addClassSelect(
      'quote-outline-style',
      {
        title: { en: 'Reading View Style', zh: '阅读视图的样式' },
      },
      {
        allowEmpty: false,
        default: 'quote-shadow',
        options: [
          { label: 'None', value: 'quote-none' },
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
        desc: {
          en: 'Only support bullet list in Live Preview mode. Reference: https://gist.github.com/KillyMXI/cbef8edff6dd55d9e6ea4df66567e9b1.',
          zh: '仅支持实时预览模式中的无序列表。参考：https://gist.github.com/KillyMXI/cbef8edff6dd55d9e6ea4df66567e9b1',
        },
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
        .addClassToggle('list-checkbox-line', {
          title: {
            en: 'Remove Strikethrough on Completed Items',
            zh: '移除已完成事项上的删除线',
          },
        })
        .addClassToggle(
          'list-checkbox-alternative',
          {
            title: {
              en: 'Enhanced Checkbox Styles',
              zh: '更多的复选框样式',
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
            title: { en: 'Checkbox Marker Color', zh: '复选框标记颜色' },
          },
          'hex',
        )
        .addVarThemedColor(
          'setting-list-checkbox-color-hover',
          {
            title: {
              en: 'Checkbox Marker Hover Color',
              zh: '复选框标记悬停颜色',
            },
          },
          'hex',
        )
        .addVarThemedColor(
          'setting-list-checkbox-border',
          {
            title: {
              en: 'Checkbox Marker Border Color',
              zh: '复选框标记边框颜色',
            },
          },
          'hex',
        ),
    ]),
  Settings.ofLevel(1, { title: { en: 'Code', zh: '代码' } })
    .addVarThemedColor(
      'setting-code-inline',
      {
        title: { en: 'Inline Code Color', zh: '行内代码文字颜色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-code-bg',
      {
        title: { en: 'Code Block Background Color', zh: '代码块背景颜色' },
      },
      'hex',
    )
    .addClassToggle(
      'code-line-number',
      {
        title: {
          en: 'Add Code Block Line Numbers in Live Preview Mode',
          zh: '在实时预览模式下为代码块添加行号',
        },
        desc: {
          en: "Due to the limitation of Obsidian's render strategy, if the code block has too many lines, line numbering may be incorrect",
          zh: '由于 Obsidian 渲染方式的限制，如果代码块行数过多，行号可能会出现错误',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'code-language',
      {
        title: {
          en: 'Add Code Block Language Indicator in Reading View',
          zh: '在阅读视图下为代码块添加语言标识',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'code-nowrap',
      {
        title: {
          en: "Don't Wrap Line in Reading View Code Blocks",
          zh: '阅读视图下代码过长时不换行',
        },
      },
      { enable: true },
    )
    .addVarText(
      'setting-code-ligature',
      {
        title: { en: 'Monospace Font Features', zh: '等宽字体特性' },
        desc: {
          en: "If using \"Maple Mono\" as monospace, recommend setting to 'calt','cv01','cv02'",
          zh: "如果您使用 “Maple Mono” 作为等宽字体，建议设置为 'calt','cv01','cv02'",
        },
      },
      { default: "'calt'" },
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
        en: 'Add Mac Style Code Block Header in Reading View',
        zh: '在阅读视图下为代码块添加 Mac 风格标题栏',
      },
      desc: { en: 'No code block border', zh: '无代码块边框' },
    })
    .addVarThemedColor(
      'setting-code-language-color',
      {
        title: { en: 'Language Indicator Color', zh: '语言标识颜色' },
      },
      'hex',
    )
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
        title: { en: 'Tag Background Color', zh: '标签背景颜色' },
      },
      'hex',
    )
    .addVarThemedColor(
      'setting-tag-color',
      {
        title: { en: 'Tag Text Color', zh: '标签文字颜色' },
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
  Settings.ofLevel(1, { title: { en: 'PDF', zh: 'PDF' } }).addClassToggle(
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
  ),
  Settings.ofLevel(1, {
    title: { en: 'Properties', zh: '文档属性' },
  })
    .addClassToggle(
      'prop-outline',
      {
        title: { en: 'Add Outline for Property Panel', zh: '属性面板添加边框' },
      },
      { enable: true },
    )
    .addClassToggle('prop-hide-preview', {
      title: {
        en: 'Hide Property Panel in Reading View',
        zh: '阅读视图下隐藏属性面板',
      },
    }),
])
