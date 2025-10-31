import { descValidCSS, Settings } from './generator'

export default Settings.create('maple-basic', 'Maple Basic').children([
  Settings.of()
    .addVarNumSlider(
      'setting-animation-time',
      {
        title: { en: 'Animation Duration (ms)', zh: '动画时长（毫秒）' },
      },
      { default: 250, min: 0, max: 1000, step: 50, format: 'ms' },
    )
    .addVarNumSlider(
      'setting-item-line-height',
      {
        title: { en: 'List Item Line Height', zh: '列表行高' },
        desc: {
          en: 'Adjust the line height for items in file explorer, outline panel, and setting modal sidebar.',
          zh: '调整文件管理器、大纲面板和设置面板侧边栏中行高。',
        },
      },
      { default: 1.5, min: 1, max: 2, step: 0.1 },
    )
    .addVarThemedColor(
      'setting-divider-color',
      {
        title: { en: 'Panel Divider Color', zh: '面板分割线颜色' },
      },
      'hsl',
    ),
  Settings.ofLevel(1, { title: { en: 'Colors', zh: '颜色' }, open: true })
    .addClassSelect(
      'color-scheme',
      {
        title: { en: 'Color Scheme', zh: '颜色方案' },
      },
      {
        allowEmpty: false,
        default: 'color-use-custom',
        options: [
          { label: 'Default', value: 'color-use-default' },
          { label: 'Minimal', value: 'color-use-minimal' },
          { label: 'Custom', value: 'color-use-custom' },
        ],
      },
    )
    .children([
      Settings.ofLevel(2, { title: { en: 'Light Mode', zh: '浅色模式' } })
        .addVarNumSlider(
          'setting-accent-h-light',
          { title: { en: 'Base Color', zh: '基础色' } },
          { default: 35, min: 0, max: 360, step: 5 },
        )
        .addClassSelect(
          'color-active-light',
          { title: { en: 'Highlight Color', zh: '高亮色' } },
          {
            allowEmpty: false,
            default: 'color-active-default-light',
            options: [
              { label: 'Theme Color', value: 'color-active-default-light' },
              { label: 'Theme Color Alt', value: 'color-active-alt-light' },
              { label: 'Custom', value: 'color-active-custom-light' },
            ],
          },
        )
        .addVarColor(
          'setting-color-active-custom-light',
          {
            title: {
              en: 'Custom Highlight Color (Active)',
              zh: '自定义高亮色（激活状态）',
            },
          },
          { default: '#', format: 'hsl-split', opacity: false },
        )
        .addVarColor(
          'setting-color-inactive-custom-light',
          {
            title: {
              en: 'Custom Highlight Color (Inactive)',
              zh: '自定义高亮色（非激活状态）',
            },
          },
          { default: '#', format: 'hsl-split', opacity: false },
        ),
      Settings.ofLevel(2, { title: { en: 'Dark Mode', zh: '暗色模式' } })
        .addVarNumSlider(
          'setting-accent-h-dark',
          { title: { en: 'Base Color', zh: '基础色' } },
          { default: 207, min: 0, max: 360, step: 5 },
        )
        .addClassSelect(
          'color-active-dark',
          { title: { en: 'Highlight Color', zh: '高亮色' } },
          {
            allowEmpty: false,
            default: 'color-active-default-dark',
            options: [
              { label: 'Theme Color', value: 'color-active-default-dark' },
              { label: 'Theme Color Alt', value: 'color-active-alt-dark' },
              { label: 'Custom', value: 'color-active-custom-dark' },
            ],
          },
        )
        .addVarColor(
          'setting-color-active-custom-dark',
          {
            title: {
              en: 'Custom Highlight Color (Active)',
              zh: '自定义高亮色（激活状态）',
            },
          },
          { default: '#', format: 'hsl-split', opacity: false },
        )
        .addVarColor(
          'setting-color-inactive-custom-dark',
          {
            title: {
              en: 'Custom Highlight Color (Inactive)',
              zh: '自定义高亮色（非激活状态）',
            },
          },
          { default: '#', format: 'hsl-split', opacity: false },
        ),
    ]),
  Settings.ofLevel(1, {
    title: { en: 'Layout', zh: '布局' },
    open: true,
  })
    .addClassToggle(
      'app-layout-card',
      {
        title: {
          en: 'Enable Card Layout',
          zh: '启用卡片布局',
        },
      },
      { enable: true },
    )
    .addClassToggle('app-layout-card-border', {
      title: { en: 'Add Border to Cards', zh: '为卡片添加边框' },
    })
    .addVarNumSlider(
      'setting-app-layout-spacing',
      {
        title: {
          en: 'Card Spacing',
          zh: '卡片间距',
        },
      },
      { default: 6, max: 16, min: 2, step: 0.5, format: 'px' },
    )
    .addClassSelect(
      'app-layout-card-bg',
      {
        title: {
          en: 'Background Type',
          zh: '背景类型',
        },
        desc: {
          en: '"gradient" is ineffective when the color scheme is "Minimal"',
          zh: '当颜色方案为 "Minimal" 时，"gradient" 不会生效',
        },
      },
      {
        allowEmpty: false,
        default: 'app-layout-card-gradient',
        options: [
          { label: 'Plain', value: 'app-layout-card-plain' },
          { label: 'Gradient', value: 'app-layout-card-gradient' },
          { label: 'Custom', value: 'app-layout-card-custom' },
        ],
      },
    )
    .addVarText(
      'setting-layout-image-light',
      {
        title: {
          en: 'Light Theme Background Image',
          zh: '浅色主题背景图片',
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
          en: 'Dark Theme Background Image',
          zh: '深色主题背景图片',
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
])
