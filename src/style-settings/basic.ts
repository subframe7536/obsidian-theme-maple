import { descValidCSS, Settings } from './generator'

export default Settings.create('maple-basic', 'Maple Basic').children([
  Settings.of().addVarNumSlider(
    'setting-animation-time',
    {
      title: { en: 'Animation Duration (ms)', zh: '动画持续时间（毫秒）' },
    },
    { default: 200, min: 0, max: 500, step: 50, format: 'ms' },
  ),
  Settings.of().addVarNumSlider(
    'setting-item-line-height',
    {
      title: { en: 'List Item Line Height', zh: '列表行高' },
      desc: {
        en: 'Line height of item in file explorer, outline panel, setting modal sidebar and so on',
        zh: '文件管理器、大纲面板、设置框侧边栏等列表的行高',
      },
    },
    { default: 1.5, min: 1, max: 2, step: 0.1 },
  ),
  Settings.ofLevel(1, { title: { en: 'Colors', zh: '颜色' } })
    .addClassSelect(
      'color-use-custom',
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
              en: 'Custom Highlight Color for Active State',
              zh: '自定义激活状态的高亮色',
            },
          },
          { default: '#', format: 'hsl-split', opacity: false },
        )
        .addVarColor(
          'setting-color-inactive-custom-light',
          {
            title: {
              en: 'Custom Highlight Color for Inactive State',
              zh: '自定义非激活状态的高亮色',
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
              en: 'Custom Highlight Color for Active State',
              zh: '自定义激活状态的高亮色',
            },
          },
          { default: '#', format: 'hsl-split', opacity: false },
        )
        .addVarColor(
          'setting-color-inactive-custom-dark',
          {
            title: {
              en: 'Custom Highlight Color for Inactive State',
              zh: '自定义非激活状态的高亮色',
            },
          },
          { default: '#', format: 'hsl-split', opacity: false },
        ),
    ]),
  Settings.ofLevel(1, {
    title: { en: 'Layout', zh: '布局' },
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
      title: { en: 'Add Border For Card', zh: '为卡片添加边框' },
    })
    .addClassSelect(
      'app-layout-card-bg',
      {
        title: {
          en: 'Background Type',
          zh: '背景类型',
        },
        desc: {
          en: '"gradient" is not effective when color scheme is "Minimal"',
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
