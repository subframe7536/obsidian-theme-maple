import { Settings } from './generator'

export default Settings.create('maple-basic', 'Maple Basic').children([
  Settings.of().addVarNumSlider(
    'setting-animation-time',
    {
      title: { en: 'Animation Duration (ms)', zh: '动画持续时间（毫秒）' },
    },
    { default: 200, min: 0, max: 500, step: 50, format: 'ms' },
  ),
  Settings.of().addVarNumSlider(
    'setting-line-height-item',
    {
      title: { en: 'List Item Line Height', zh: '列表行高' },
    },
    { default: 1.5, min: 1, max: 2, step: 0.1 },
  ),
  Settings.ofLevel(1, { title: { en: 'Theme Color', zh: '主题色' } })
    .addClassToggle(
      'color-use-custom',
      {
        title: { en: 'Use Custom Theme Color', zh: '自定义主题色' },
        desc: {
          en: "Use the Style Setting Plugin's theme color instead of Obsidian's",
          zh: '使用 Style Settings 插件的主题色，而不是 Obsidian 的',
        },
      },
      { enable: false },
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
          { default: '#', format: 'rgb', opacity: false },
        )
        .addVarColor(
          'setting-color-inactive-custom-light',
          {
            title: {
              en: 'Custom Highlight Color for Inactive State',
              zh: '自定义非激活状态的高亮色',
            },
          },
          { default: '#', format: 'rgb', opacity: false },
        )
        .children([
          Settings.ofLevel(3, {
            id: 'title-light-accent-custom',
            title: { en: 'More Configuration', zh: '更多设置' },
          })
            .addVarNumSlider(
              'setting-accent-s-light',
              {
                title: { en: 'Highlight Color Saturation', zh: '高亮色饱和度' },
                desc: { en: 'Saturation (S) in HSL', zh: 'HSL 中的饱和度 (S)' },
              },
              { default: 32, min: 0, max: 100, step: 1, format: '%' },
            )
            .addVarNumSlider(
              'setting-accent-l-light',
              {
                title: { en: 'Highlight Color Lightness', zh: '高亮色亮度' },
                desc: { en: 'Lightness (L) in HSL', zh: 'HSL 中的亮度 (L)' },
              },
              { default: 58, min: 0, max: 100, step: 1, format: '%' },
            ),
        ]),
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
          { default: '#', format: 'rgb', opacity: false },
        )
        .addVarColor(
          'setting-color-inactive-custom-dark',
          {
            title: {
              en: 'Custom Highlight Color for Inactive State',
              zh: '自定义非激活状态的高亮色',
            },
          },
          { default: '#', format: 'rgb', opacity: false },
        )
        .children([
          Settings.ofLevel(3, {
            id: 'title-dark-accent-custom',
            title: { en: 'More Configuration', zh: '更多设置' },
          })
            .addVarNumSlider(
              'setting-accent-s-dark',
              {
                title: { en: 'Highlight Color Saturation', zh: '高亮色饱和度' },
                desc: { en: 'Saturation (S) in HSL', zh: 'HSL 中的饱和度 (S)' },
              },
              { default: 32, min: 0, max: 100, step: 1, format: '%' },
            )
            .addVarNumSlider(
              'setting-accent-l-dark',
              {
                title: { en: 'Highlight Color Lightness', zh: '高亮色亮度' },
                desc: { en: 'Lightness (L) in HSL', zh: 'HSL 中的亮度 (L)' },
              },
              { default: 58, min: 0, max: 100, step: 1, format: '%' },
            ),
        ]),
    ]),
])
