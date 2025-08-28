import { Settings } from './generator'

export default Settings.create(
  'maple-workspace',
  '🌏 Maple Workspace',
).children([
  Settings.ofLevel(1, {
    title: { en: 'Obsidian Titlebar', zh: 'Obsidian 标题栏' },
  })
    .addClassToggle(
      'titlebar-button-style',
      {
        title: { en: 'Styled Window Buttons', zh: '窗体按钮美化' },
        desc: { en: 'For Windows and Linux', zh: '在 Windows 和 Linux 中生效' },
      },
      { enable: true },
    )
    .addClassToggle('titlebar-colorful', {
      title: { en: 'Colorful Titlebar', zh: '多彩 Obsidian 标题栏' },
      desc: {
        en: 'Reference from https://github.com/kepano/obsidian-minimal',
        zh: '参考 https://github.com/kepano/obsidian-minimal',
      },
    }),
  Settings.ofLevel(1, {
    title: { en: 'Wave Background', zh: '波浪背景图' },
    desc: {
      en: 'Will also add in canvas card when card width > 768px',
      zh: '白板的卡片宽度 >768px 时编辑卡片也会添加',
    },
  })
    .addClassSelect(
      'bg-enable',
      {
        title: { en: 'Background Wave Image', zh: '背景波浪图' },
        desc: {
          en: 'Static style reference from https://github.com/hydescarf/Obsidian-Theme-Mado-Miniflow, ❗live style will increase CPU/GPU use',
          zh: '静态图（static）参考 https://github.com/hydescarf/Obsidian-Theme-Mado-Miniflow，❗动态图（live）将提高 CPU/GPU 占用率',
        },
      },
      {
        allowEmpty: false,
        default: 'bg-static',
        options: [
          { label: 'disable', value: 'bg-default' },
          { label: 'static', value: 'bg-static' },
          { label: 'live', value: 'bg-live' },
        ],
      },
    )
    .addVarThemedColor(
      'setting-bg-color',
      { title: { en: 'Wave Color', zh: '波浪颜色' } },
      { format: 'rgb', opacity: false, defaultLight: '#', defaultDark: '#' },
    ),
  Settings.ofLevel(1, { title: { en: 'File Explorer', zh: '文件管理器' } })
    .addClassToggle('explorer-nav-decoration', {
      title: {
        en: 'Add Tail Decorator On Active File',
        zh: '在当前文件末尾添加装饰',
      },
      desc: {
        en: 'Reference from https://github.com/Akifyss/obsidian-border',
        zh: '参考 https://github.com/Akifyss/obsidian-border',
      },
    })
    .addClassToggle('explorer-title-wrap', {
      title: { en: 'Auto Wrap For Long File Name', zh: '为长文件名自动换行' },
    })
    .addVarNumSlider(
      'explorer-item-height',
      { title: { en: 'Item Line Height', zh: '行高' } },
      { default: 1.6, min: 1.2, max: 1.8, step: 0.1 },
    )
    .addClassToggle(
      'explorer-icon',
      {
        title: { en: 'Enable Prefix Icon', zh: '开启前置图标' },
        desc: {
          en: 'If the tree indent is weird, please collpase all the directory and restart Obsidian',
          zh: '如果缩进出现问题，请折叠全部文件夹并重启 Obsidian',
        },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-color-dirs',
      { title: { en: 'Directory Color', zh: '文件夹颜色' } },
      {
        format: 'rgb-values',
        opacity: false,
        defaultLight: 'rgb(245, 180, 0)',
        defaultDark: 'rgb(245, 180, 0)',
      },
    ),
  Settings.ofLevel(1, {
    title: { en: 'Outline Panel', zh: '文档大纲' },
  }).addClassToggle(
    'outline-enable',
    {
      title: {
        en: 'Logseq Bullet Thread Style Outline',
        zh: 'logseq bullet thread 样式的文档视图',
      },
      desc: {
        en: 'Please reload Obsidian after enable it, reference from https://github.com/pengx17/logseq-dev-theme/blob/main/bullet_threading.css',
        zh: '启用后请重启应用 参考 https://github.com/pengx17/logseq-dev-theme/blob/main/bullet_threading.css',
      },
    },
    { enable: true },
  ),
  Settings.ofLevel(1, { title: { en: 'Status Bar', zh: '状态栏' } })
    .addClassToggle(
      'status-bar-enable',
      { title: { en: 'Custom Status Bar Style', zh: '自定义状态栏样式' } },
      { enable: true },
    )
    .addClassToggle(
      'status-bar-style-float',
      { title: { en: 'Round Style Status Bar', zh: '圆角风格的状态栏' } },
      { enable: true },
    )
    .addClassSelect(
      'status-bar-style',
      {
        title: { en: 'Status Bar Animation', zh: '状态栏样式' },
        desc: {
          en: '❗last style only valid when turn on “round status bar”',
          zh: '❗最后一种样式只在开启“圆角风格的状态栏”才生效',
        },
      },
      {
        allowEmpty: false,
        default: 'status-bar-default',
        options: [
          { label: 'default', value: 'status-bar-default' },
          { label: 'show on hover', value: 'status-bar-hidden' },
          { label: 'scroll out on hover', value: 'status-bar-scroll' },
        ],
      },
    )
    .addClassToggle('status-bar-style-center', {
      title: { en: 'Center Status Bar', zh: '状态栏居中' },
    }),
  Settings.ofLevel(1, {
    title: { en: 'Document Search / Replace Panel', zh: '文档内搜索框' },
  }).addClassToggle(
    'search-internal-enable',
    {
      title: {
        en: 'Minimal Document Search / Replace Panel (Like VSCode)',
        zh: '精简的文档内搜索框（和 VSCode 类似）',
      },
    },
    { enable: true },
  ),
  Settings.ofLevel(1, { title: { en: 'Tab', zh: '标签页' } })
    .addClassToggle('tab-float', {
      title: {
        en: 'Float Style Tab (Like Firefox / Microsoft Edge)',
        zh: '浮动的标签页（和 Firefox / Microsoft Edge 类似）',
      },
    })
    .addClassToggle(
      'tab-slide-up',
      {
        title: { en: 'Slide Up Animation On Tab Switch', zh: '标签页切换动画' },
        desc: {
          en: '❗will prevent outline panel update instantly on switch articles',
          zh: '❗会导致切换文章时无法立即更新大纲面板',
        },
      },
      { enable: true },
    )
    .addClassToggle('labeled-nav', {
      title: {
        en: 'Text Labels For Primary Navigation',
        zh: '主导航栏添加文字',
      },
      desc: {
        en: 'Reference from https://github.com/kepano/obsidian-minimal',
        zh: '参考自 https://github.com/kepano/obsidian-minimal',
      },
    })
    .addClassSelect(
      'tab-show-close',
      {
        title: {
          en: 'When To Show Close Button On Tabs',
          zh: '何时显示标签页的关闭按钮',
        },
      },
      {
        allowEmpty: false,
        default: 'tab-show-close-default',
        options: [
          { label: 'default', value: 'tab-show-close-default' },
          { label: 'on hover all tabs', value: 'tab-show-close-all' },
          { label: 'on hover except active tab', value: 'tab-show-close-part' },
        ],
      },
    )
    .children([
      Settings.ofLevel(2, {
        title: { en: 'Tab Title Bar', zh: '标签页标题栏' },
      })
        .addClassToggle('tab-title-bar-round', {
          title: {
            en: 'Enable Tab Title Bar Round Style',
            zh: '开启标签页标题栏圆角样式',
          },
        })
        .addClassToggle('tab-title-bar-shadow', {
          title: {
            en: 'Add Shadow For Active Tab Title Bar',
            zh: '为当前标签页标题栏添加阴影',
          },
        })
        .addClassSelect(
          'tab-title-bar-text',
          {
            title: {
              en: 'File Name On Tab Title Bar',
              zh: '标签页标题栏的文件名',
            },
          },
          {
            allowEmpty: false,
            default: 'tab-title-bar-text-default',
            options: [
              { label: 'default', value: 'tab-title-bar-text-default' },
              { label: 'small size', value: 'tab-title-bar-text-small' },
              { label: 'show on hover', value: 'tab-title-bar-text-hidden' },
            ],
          },
        ),
    ]),
  Settings.ofLevel(1, {
    title: { en: 'Tooltip & Notice', zh: '气泡提示框 & 通知' },
  })
    .addClassToggle('message-tooltip-hide-arrow', {
      title: { en: 'Hide Tooltip Arrow', zh: '隐藏气泡提示框箭头' },
    })
    .addClassToggle('message-tooltip-hide', {
      title: { en: 'Always Hide Tooltip', zh: '永久隐藏气泡提示框' },
    })
    .addClassToggle(
      'message-modify',
      {
        title: {
          en: 'Change Tooltip & Notice Color',
          zh: '修改气泡提示框和消息的颜色',
        },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-message-bg',
      { title: { en: 'Background Color', zh: '背景色' } },
      {
        format: 'hsl-values',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-message-fg',
      { title: { en: 'Foreground Color', zh: '文字色' } },
      {
        format: 'rgb-values',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    ),
  Settings.ofLevel(1, {
    title: { en: 'Modal & Setting Panel', zh: '弹出框 & 设置面板' },
  })
    .addClassToggle(
      'modal-blur',
      {
        title: { en: 'Enable Modal Background Blur', zh: '开启弹出框背景模糊' },
        desc: {
          en: 'If there is a delay in scrolling, try turning this option off',
          zh: '如果滚动时有卡顿，尝试关闭该选项',
        },
      },
      { enable: true },
    )
    .addClassToggle('modal-header', {
      title: { en: 'Add Header For Setting Panel', zh: '为设置面板添加顶部框' },
      desc: {
        en: 'Better with plugin “setting search”, invalid in mobile',
        zh: '配合 setting search 插件使用更佳，移动端无效',
      },
    })
    .addVarText(
      'setting-modal-header-title',
      { title: { en: 'Set Modal Header Title', zh: '设置面板标题' } },
      { default: "'maple 0.8.34'" },
    )
    .addClassToggle(
      'setting-group-title',
      {
        title: {
          en: 'Add Style For Left Navigation Group Title',
          zh: '为左侧选项组标题添加样式',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'setting-nav-decoration',
      { title: { en: 'Styled Active Nav Item', zh: '左侧当前设置项美化' } },
      { enable: true },
    )
    .addClassToggle(
      'modal-slider',
      { title: { en: 'Styled Slider Thumb', zh: '滑动条按钮美化' } },
      { enable: true },
    )
    .addClassSelect(
      'modal-toggle',
      { title: { en: 'Styled Toggle Button', zh: '开关按钮美化' } },
      {
        allowEmpty: false,
        default: 'modal-toggle-default',
        options: [
          { label: 'default', value: 'modal-toggle-default' },
          { label: 'thin', value: 'modal-toggle-thin' },
          { label: 'round', value: 'modal-toggle-round' },
        ],
      },
    )
    .addClassToggle(
      'modal-animation',
      {
        title: { en: 'Modal Bounce Animation', zh: '弹出框抖动动画' },
        desc: {
          en: 'reference from https://github.com/hydescarf/Obsidian-Theme-Mado-Miniflow',
          zh: '参考 https://github.com/hydescarf/Obsidian-Theme-Mado-Miniflow',
        },
      },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Menu Blur', zh: '菜单模糊' } })
    .addClassToggle(
      'menu-normal',
      { title: { en: 'Normal Menu', zh: '普通菜单' } },
      { enable: true },
    )
    .addClassToggle(
      'menu-suggestion',
      { title: { en: 'Suggestion Menu', zh: '提示菜单' } },
      { enable: true },
    )
    .addClassToggle(
      'menu-graph',
      { title: { en: 'Graph Menu', zh: '图谱菜单' } },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Scrollbar', zh: '滚动条' } })
    .addClassToggle('scrollbar-hide', {
      title: { en: 'Always Hide Scrollbar', zh: '不显示滚动条' },
    })
    .addClassSelect(
      'scrollbar-hover',
      { title: { en: 'Scrollbar Hover Action', zh: '鼠标经过时滚动条变化' } },
      {
        allowEmpty: false,
        default: 'scrollbar-hover-default',
        options: [
          { label: 'default', value: 'scrollbar-hover-default' },
          { label: 'accent', value: 'scrollbar-hover-accent' },
          { label: 'expand', value: 'scrollbar-hover-expand' },
        ],
      },
    )
    .addClassToggle(
      'scrollbar-movein-animation-enable',
      {
        title: { en: 'Enable Scrollbar Animation', zh: '启用滚动条动画' },
        desc: {
          en: 'When disabled, always show scrollbar; when enabled, hide scrollbar when the mouse move outside the container',
          zh: '关闭时，一直显示滚动条；开启后，鼠标在容器外时隐藏滚动条',
        },
      },
      { enable: true },
    ),
  Settings.ofLevel(1, { title: { en: 'Graph', zh: '关系图谱' } })
    .addVarThemedColor(
      'setting-graph-node',
      { title: { en: 'Node Color', zh: '普通节点颜色' } },
      {
        format: 'rgb-values',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-graph-node-unresolved',
      { title: { en: 'Unresolved Node Color', zh: '未连接节点颜色' } },
      {
        format: 'rgb-values',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-graph-node-focus',
      { title: { en: 'Focused Node Color', zh: '聚焦节点颜色' } },
      {
        format: 'rgb-values',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    ),
  Settings.ofLevel(1, {
    title: { en: 'PDF Export', zh: 'PDF 导出' },
  }).addClassToggle('export-pdf-transparent', {
    title: { en: 'Transparent Page Background Color', zh: '透明页面背景色' },
  }),
])
