import { descValidCSS, Settings } from './generator'
import { version } from '../../package.json'

export default Settings.create('maple-workspace', 'Maple Workspace').children([
  Settings.ofLevel(1, {
    title: { en: 'Titlebar & Background Image', zh: '标题栏和背景图片' },
  })
    .addClassToggle(
      'titlebar-button-style',
      {
        title: { en: 'Styled Window Buttons', zh: '美化窗体按钮' },
        desc: {
          en: 'Applies to Windows and Linux',
          zh: '在 Windows 和 Linux 系统中生效',
        },
      },
      { enable: true },
    )
    .addClassToggle('titlebar-colorful', {
      title: { en: 'Colorful Titlebar', zh: '多彩 Obsidian 标题栏' },
      desc: {
        en: 'Reference: https://github.com/kepano/obsidian-minimal',
        zh: '参考项目：https://github.com/kepano/obsidian-minimal',
      },
    })
    .addClassToggle('app-bg-image-enable', {
      title: {
        en: 'Add Background Image In Workspace',
        zh: '添加应用的背景图片',
      },
      desc: {
        en: 'Only works in Desktop Version',
        zh: '只在桌面端生效',
      },
    })
    .addVarText(
      'setting-app-bg-image-light',
      {
        title: {
          en: 'Light Theme Background Image URL',
          zh: '浅色主题背景图片地址',
        },
        desc: descValidCSS('background-image'),
      },
      { default: '' },
    )
    .addVarNumSlider(
      'setting-app-bg-opacity-light',
      {
        title: {
          en: 'Light Theme Background Opacity',
          zh: '浅色主题背景不透明度',
        },
      },
      { default: 0.6, max: 0.9, min: 0.1, step: 0.05 },
    )
    .addVarText(
      'setting-app-bg-image-dark',
      {
        title: {
          en: 'Dark Theme Background Image URL',
          zh: '深色主题背景图片地址',
        },
        desc: descValidCSS('background-image'),
      },
      { default: '' },
    )
    .addVarNumSlider(
      'setting-app-bg-opacity-dark',
      {
        title: {
          en: 'Dark Theme Background Opacity',
          zh: '深色主题背景不透明度',
        },
      },
      { default: 0.6, max: 0.9, min: 0.1, step: 0.05 },
    ),
  Settings.ofLevel(1, {
    title: { en: 'File Explorer Panel', zh: '文件管理器面板' },
  })
    .addClassToggle('explorer-title-wrap', {
      title: { en: 'Auto Wrap Long File Names', zh: '长文件名自动换行' },
    })
    .addVarNumSlider(
      'explorer-item-height',
      { title: { en: 'Line Height', zh: '行高' } },
      { default: 1.6, min: 1.2, max: 1.8, step: 0.1 },
    )
    .addClassToggle(
      'explorer-icon',
      {
        title: { en: 'Enable Prefix Icons', zh: '启用前置图标' },
        desc: {
          en: 'If the tree indentation appears incorrect, please collapse all directories and restart Obsidian',
          zh: '如果缩进显示异常，请折叠所有文件夹并重启 Obsidian',
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
    title: { en: 'Outline Panel', zh: '文档大纲面板' },
  })
    .addClassToggle('outline-enable', {
      title: {
        en: 'Logseq Bullet Thread Style Outline',
        zh: 'Logseq 样式的文档大纲视图',
      },
      desc: {
        en: 'Please reload Obsidian after enabling this feature. Reference: https://github.com/pengx17/logseq-dev-theme/blob/main/bullet_threading.css',
        zh: '启用此功能后请重启 Obsidian。参考项目：https://github.com/pengx17/logseq-dev-theme/blob/main/bullet_threading.css',
      },
    })
    .addVarNumSlider(
      'setting-outline-width',
      {
        title: {
          en: 'Guide Line Width',
          zh: '引导线宽度',
        },
      },
      {
        default: 2,
        min: 1,
        max: 4,
        step: 0.5,
        format: 'px',
      },
    )
    .addVarThemedColor(
      'setting-outline-line-color',
      {
        title: {
          en: 'Guide Line Color',
          zh: '引导线颜色',
        },
      },
      {
        defaultLight: '#',
        defaultDark: '#',
        format: 'hsl',
        opacity: true,
      },
    )
    .addVarThemedColor(
      'setting-outline-dot-color',
      {
        title: {
          en: 'Guide Dot Color',
          zh: '引导点颜色',
        },
      },
      {
        defaultDark: '#',
        defaultLight: '#',
        format: 'hsl',
        opacity: true,
      },
    ),
  Settings.ofLevel(1, { title: { en: 'Status Bar', zh: '状态栏' } })
    .addClassToggle(
      'status-bar-enable',
      { title: { en: 'Custom Status Bar Style', zh: '自定义状态栏样式' } },
      { enable: true },
    )
    .addClassToggle(
      'status-bar-style-float',
      { title: { en: 'Enable Float Style', zh: '启用浮动样式' } },
      { enable: true },
    )
    .addClassSelect(
      'status-bar-style',
      {
        title: { en: 'Status Bar Animation', zh: '状态栏动画效果' },
        desc: {
          en: 'Note: The last style option is only valid when "rounded status bar" is enabled',
          zh: '注意：最后一种样式选项仅在启用"圆角状态栏"时生效',
        },
      },
      {
        allowEmpty: false,
        default: 'status-bar-default',
        options: [
          { label: 'Default', value: 'status-bar-default' },
          { label: 'Show on hover', value: 'status-bar-hidden' },
          { label: 'Scroll out on hover', value: 'status-bar-scroll' },
        ],
      },
    )
    .addClassToggle('status-bar-style-center', {
      title: { en: 'Center Status Bar', zh: '状态栏居中显示' },
    }),
  Settings.ofLevel(1, {
    title: {
      en: 'Search and Replace Panel',
      zh: '搜索和替换面板',
    },
  })
    .addClassToggle(
      'search-internal-enable',
      {
        title: {
          en: 'Float Panel (VSCode Style)',
          zh: '浮动面板（VSCode 风格）',
        },
      },
      { enable: true },
    )
    .addClassToggle('search-remove-button', {
      title: {
        en: 'Remove Rarely Used Buttons',
        zh: '移除不常用的按钮',
      },
      desc: {
        en: 'Removed buttons: Find All',
        zh: '已移除的按钮：查找全部',
      },
    }),
  Settings.ofLevel(1, { title: { en: 'Tab', zh: '标签页' } })
    .addClassToggle('tab-float', {
      title: {
        en: 'Float Style Tab (Like Firefox / Microsoft Edge)',
        zh: '浮动的标签页（和 Firefox / Microsoft Edge 类似）',
      },
    })
    .addClassToggle('tab-slide-up', {
      title: {
        en: 'Enable Tab Slide Up Animation',
        zh: '启用标签页切换动画',
      },
      desc: {
        en: '❗Turning on will prevent some panels updating instantly while switching tabs',
        zh: '❗开启后会导致部分面板无法立即更新',
      },
    })
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
          { label: 'Default', value: 'tab-show-close-default' },
          { label: 'On hover', value: 'tab-show-close-all' },
          { label: 'On hover except active tab', value: 'tab-show-close-part' },
        ],
      },
    )
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
          { label: 'Default', value: 'tab-title-bar-text-default' },
          { label: 'Small size', value: 'tab-title-bar-text-small' },
          { label: 'Show on hover', value: 'tab-title-bar-text-hidden' },
        ],
      },
    ),
  Settings.ofLevel(1, {
    title: { en: 'Tooltip & Notice', zh: '气泡提示框与通知' },
  })
    .addClassToggle('message-tooltip-hide-arrow', {
      title: { en: 'Hide Tooltip Arrow', zh: '隐藏气泡提示框箭头' },
    })
    .addClassToggle('message-tooltip-hide', {
      title: { en: 'Always Hide Tooltip', zh: '始终隐藏气泡提示框' },
    })
    .addClassToggle(
      'message-modify',
      {
        title: {
          en: 'Change Tooltip & Notice Color',
          zh: '修改气泡提示框和通知的颜色',
        },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-message-bg',
      { title: { en: 'Background Color', zh: '背景颜色' } },
      {
        format: 'hsl-values',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-message-fg',
      { title: { en: 'Foreground Color', zh: '文字颜色' } },
      {
        format: 'rgb-values',
        opacity: false,
        defaultLight: '#',
        defaultDark: '#',
      },
    ),
  Settings.ofLevel(1, {
    title: { en: 'Modal & Setting Panel', zh: '模态框与设置面板' },
  })
    .addClassToggle(
      'modal-blur',
      {
        title: { en: 'Enable Modal Background Blur', zh: '启用模态框背景模糊' },
        desc: {
          en: 'If scrolling experiences delay, try disabling this option',
          zh: '如果滚动时出现卡顿，请尝试关闭此选项',
        },
      },
      { enable: true },
    )
    .addClassToggle('modal-header', {
      title: {
        en: 'Add Header To Setting Panel',
        zh: '为设置面板添加顶部标题',
      },
      desc: {
        en: 'Works best with the "Setting Search" plugin; not valid on mobile',
        zh: '配合“设置搜索”插件使用效果更佳，移动端无效',
      },
    })
    .addVarText(
      'setting-modal-header-title',
      { title: { en: 'Set Modal Header Title', zh: '设置模态框标题' } },
      { default: `'maple ${version}'` },
    )
    .addClassToggle(
      'enable-group-title',
      {
        title: {
          en: 'Add Icons For Left Navigation Group Title',
          zh: '为左侧导航组标题添加图标',
        },
      },
      { enable: true },
    )
    .addClassToggle(
      'modal-slider',
      { title: { en: 'Styled Slider Thumb', zh: '美化滑动条按钮' } },
      { enable: true },
    )
    .addClassSelect(
      'modal-toggle',
      { title: { en: 'Styled Toggle Button', zh: '美化开关按钮' } },
      {
        allowEmpty: false,
        default: 'modal-toggle-default',
        options: [
          { label: 'Default', value: 'modal-toggle-default' },
          { label: 'Thin', value: 'modal-toggle-thin' },
          { label: 'Round', value: 'modal-toggle-round' },
        ],
      },
    )
    .addClassToggle(
      'modal-animation',
      {
        title: { en: 'Modal Show Up Animation', zh: '模态框进入动画' },
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
      title: { en: 'Always Hide Scrollbar', zh: '始终隐藏滚动条' },
    })
    .addClassToggle(
      'scrollbar-enable',
      { title: { en: 'Enable Styled Scrollbar', zh: '启用美化滚动条' } },
      { enable: true },
    )
    .addClassSelect(
      'scrollbar-hover',
      { title: { en: 'Scrollbar Hover Action', zh: '鼠标悬停时滚动条变化' } },
      {
        allowEmpty: false,
        default: 'scrollbar-hover-accent',
        options: [
          { label: 'None', value: 'scrollbar-hover-default' },
          { label: 'Accent', value: 'scrollbar-hover-accent' },
          { label: 'Expand', value: 'scrollbar-hover-expand' },
        ],
      },
    )
    .addClassToggle(
      'scrollbar-movein-animation-enable',
      {
        title: { en: 'Enable Scrollbar Animation', zh: '启用滚动条动画' },
        desc: {
          en: 'When disabled, the scrollbar is always visible; when enabled, the scrollbar hides when the mouse moves outside the container',
          zh: '禁用时，滚动条始终可见；启用后，当鼠标移出容器时滚动条将隐藏',
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
    title: {
      en: 'Set Background to Transparent When Exporting',
      zh: '导出时将页面背景颜色设置为透明',
    },
  }),
])
