import { descReference, descValidCSS, Settings } from './generator'
import { version } from '../../package.json'

export default Settings.create('maple-workspace', 'Maple Workspace').children([
  Settings.ofLevel(1, {
    title: { en: 'Titlebar and Background Image', zh: '标题栏和背景图片' },
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
      'setting-layout-image-light',
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
      'setting-layout-opacity-light',
      {
        title: {
          en: 'Light Theme Background Opacity',
          zh: '浅色主题背景不透明度',
        },
      },
      { default: 0.6, max: 0.9, min: 0.1, step: 0.05 },
    )
    .addVarText(
      'setting-layout-image-dark',
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
      'setting-layout-opacity-dark',
      {
        title: {
          en: 'Dark Theme Background Opacity',
          zh: '深色主题背景不透明度',
        },
      },
      { default: 0.6, max: 0.9, min: 0.1, step: 0.05 },
    ),
  Settings.ofLevel(1, {
    title: { en: 'File Explorer', zh: '文件管理器' },
  })
    .addClassToggle('explorer-title-wrap', {
      title: { en: 'Auto Wrap Long File Names', zh: '长文件名自动换行' },
    })
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
    .addClassToggle('explorer-folder-bold', {
      title: { en: 'Bolder Folder Title', zh: '加粗文件夹标题' },
    })
    .addVarThemedColor(
      'setting-color-dirs',
      { title: { en: 'Directory Color', zh: '文件夹颜色' } },
      {
        format: 'hsl',
        opacity: false,
        defaultLight: 'hsl(46, 81%, 45%)',
        defaultDark: 'hsl(46, 81%, 45%)',
      },
    ),
  Settings.ofLevel(1, {
    title: { en: 'Outline', zh: '大纲' },
  })
    .addClassToggle('outline-enable', {
      title: {
        en: 'Logseq Bullet Thread Style Outline',
        zh: 'Logseq 样式的文档大纲视图',
      },
      desc: descReference(
        'https://github.com/pengx17/logseq-dev-theme/blob/main/bullet_threading.css',
        {
          en: 'Please reload Obsidian after enabling this feature',
          zh: '启用此功能后请重启 Obsidian',
        },
      ),
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
      'hsl',
    )
    .addVarThemedColor(
      'setting-outline-dot-color',
      {
        title: {
          en: 'Guide Dot Color',
          zh: '引导点颜色',
        },
      },
      'hsl',
    ),

  Settings.ofLevel(1, {
    title: {
      en: 'Search and Replace',
      zh: '搜索和替换',
    },
  })
    .addClassToggle(
      'search-internal-enable',
      {
        title: {
          en: 'Enable Floating Style',
          zh: '启用浮动风格',
        },
        desc: {
          en: "Similar to VSCode's document search widget",
          zh: '和 VSCode 的文档搜索框类似',
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
  Settings.ofLevel(1, { title: { en: 'Graph', zh: '关系图谱' } })
    .addVarThemedColor(
      'setting-graph-node',
      { title: { en: 'Normal Node Color', zh: '普通节点颜色' } },
      'hex',
    )
    .addVarThemedColor(
      'setting-graph-node-unresolved',
      { title: { en: 'Unresolved Node Color', zh: '未连接节点颜色' } },
      'hex',
    )
    .addVarThemedColor(
      'setting-graph-node-focus',
      { title: { en: 'Focused Node Color', zh: '聚焦节点颜色' } },
      'hex',
    ),
  Settings.ofLevel(1, {
    title: { en: 'Modal and Setting Panel', zh: '模态框和设置面板' },
  })
    .addClassToggle(
      'modal-blur',
      {
        title: {
          en: 'Enable Blurred Modal Background',
          zh: '启用模态框背景模糊',
        },
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
      { title: { en: 'Setting Panel Header Title', zh: '设置面板标题' } },
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
    ),
  Settings.ofLevel(1, {
    title: { en: 'Tab and Navigation Bar', zh: '标签页和导航栏' },
  })
    .addClassToggle('labeled-nav', {
      title: {
        en: 'Enable Labeled Navigation Bar',
        zh: '启用带文字的导航栏',
      },
      desc: descReference(
        'https://github.com/kepano/obsidian-minimal/blob/master/src/scss/features/labeled-nav.scss',
      ),
    })
    .addClassToggle(
      'tab-float',
      {
        title: {
          en: 'Enable Floating Style',
          zh: '启用浮动风格',
        },
      },
      { enable: true },
    )
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
          { label: 'Always', value: 'tab-show-close-default' },
          { label: 'Hover only', value: 'tab-show-close-all' },
          { label: 'Hover only or active tab', value: 'tab-show-close-part' },
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
          { label: 'Hover only', value: 'tab-title-bar-text-hidden' },
        ],
      },
    ),
  Settings.ofLevel(1, { title: { en: 'Status Bar', zh: '状态栏' } })
    .addClassToggle(
      'status-bar-style-float',
      { title: { en: 'Enable Floating Style', zh: '启用浮动风格' } },
      { enable: true },
    )
    .addClassSelect(
      'status-bar-style',
      {
        title: { en: 'Status Bar Animation', zh: '状态栏动画效果' },
        desc: {
          en: 'Note: The "Auto scroll in" option is only effective when "Enable Floating Style" is on',
          zh: '注意：“自动滚入”选项仅在"启用浮动风格"开启时生效',
        },
      },
      {
        allowEmpty: false,
        default: 'status-bar-default',
        options: [
          { label: 'Default', value: 'status-bar-default' },
          { label: 'Auto hide', value: 'status-bar-hidden' },
          { label: 'Auto scroll in', value: 'status-bar-scroll' },
        ],
      },
    )
    .addClassToggle('status-bar-style-center', {
      title: { en: 'Centered Status Bar', zh: '状态栏居中显示' },
    }),
  Settings.ofLevel(1, {
    title: { en: 'Tooltip and Notice', zh: '提示框和通知' },
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
          en: 'Modify Tooltip and Notice Color',
          zh: '修改气泡提示框和通知的颜色',
        },
      },
      { enable: true },
    )
    .addVarThemedColor(
      'setting-message-bg',
      { title: { en: 'Background Color', zh: '背景颜色' } },
      'hex',
    )
    .addVarThemedColor(
      'setting-message-fg',
      { title: { en: 'Foreground Color', zh: '文字颜色' } },
      'hex',
    ),

  Settings.ofLevel(1, { title: { en: 'Blurred Menu', zh: '菜单模糊效果' } })
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
      { title: { en: 'Scrollbar Hover Action', zh: '鼠标悬停时滚动条的变化' } },
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
])
