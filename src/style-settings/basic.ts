import { Settings } from './generator'

export default Settings.create(
  'maple-basic',
  '🛠️ Maple Color And Animation',
).children([
  Settings.ofLevel(1, {
    title: { en: 'Animation', zh: '动画' },
  }).addVarNumSlider(
    'setting-animation-time',
    {
      title: { en: 'Animation Duration (ms)', zh: '动画持续时间（毫秒）' },
    },
    { default: 200, min: 0, max: 500, step: 50, format: 'ms' },
  ),
  Settings.ofLevel(1, { title: { en: 'Accent Color', zh: '高亮颜色' } })
    .addClassToggle(
      'color-use-custom',
      {
        title: { en: 'Use Custom Accent Color', zh: '自定义 accent color' },
        desc: {
          en: "Use style setting accent color instead of Obsidian's accent color",
          zh: '使用 style setting 的颜色，而不是 Obsidian 自带的颜色',
        },
      },
      { enable: false },
    )
    .children([
      Settings.ofLevel(2, { title: { en: 'Light Mode', zh: '浅色模式' } })
        .addVarNumSlider(
          'setting-accent-h-light',
          { title: { en: 'Base Color', zh: '基础颜色' } },
          { default: 35, min: 0, max: 360, step: 5 },
        )
        .addClassSelect(
          'color-active-light',
          { title: { en: 'Highlight Color', zh: '高亮颜色' } },
          {
            allowEmpty: false,
            default: 'color-active-default-light',
            options: [
              { label: 'accent color', value: 'color-active-default-light' },
              { label: 'accent color alt', value: 'color-active-alt-light' },
              { label: 'custom', value: 'color-active-custom-light' },
            ],
          },
        )
        .addVarColor(
          'setting-color-active-custom-light',
          { title: { en: 'Custom Highlight Color', zh: '自定义高亮颜色' } },
          { default: '#', format: 'rgb', opacity: false },
        )
        .children([
          Settings.ofLevel(3, {
            title: { en: 'More Configuration', zh: '更多设置' },
          })
            .addVarNumSlider(
              'setting-accent-s-light',
              {
                title: { en: 'Accent Color Saturation', zh: '高亮颜色饱和度' },
                desc: { en: 'S(aturation) of HSL', zh: 'HSL 中的 S' },
              },
              { default: 32, min: 0, max: 100, step: 1, format: '%' },
            )
            .addVarNumSlider(
              'setting-accent-l-light',
              {
                title: { en: 'Accent Color Lightness', zh: '高亮颜色亮度' },
                desc: { en: 'L(ight) of HSL', zh: 'HSL 中的 L' },
              },
              { default: 58, min: 0, max: 100, step: 1, format: '%' },
            ),
        ]),
      Settings.ofLevel(2, { title: { en: 'Dark Mode', zh: '暗色模式' } })
        .addVarNumSlider(
          'setting-accent-h-dark',
          { title: { en: 'Base Color', zh: '基础颜色' } },
          { default: 207, min: 0, max: 360, step: 5 },
        )
        .addClassSelect(
          'color-active-dark',
          { title: { en: 'Highlight Color', zh: '高亮颜色' } },
          {
            allowEmpty: false,
            default: 'color-active-default-dark',
            options: [
              { label: 'accent color', value: 'color-active-default-dark' },
              { label: 'accent color alt', value: 'color-active-alt-dark' },
              { label: 'custom', value: 'color-active-custom-dark' },
            ],
          },
        )
        .addVarColor(
          'setting-color-active-custom-dark',
          { title: { en: 'Custom Highlight Color', zh: '自定义高亮颜色' } },
          { default: '#', format: 'rgb', opacity: false },
        )
        .children([
          Settings.ofLevel(3, {
            title: { en: 'More Configuration', zh: '更多设置' },
          })
            .addVarNumSlider(
              'setting-accent-s-dark',
              {
                title: { en: 'Accent Color Saturation', zh: '高亮颜色饱和度' },
                desc: { en: 'S(aturation) of hsl', zh: 'HSL 中的 S' },
              },
              { default: 32, min: 0, max: 100, step: 1, format: '%' },
            )
            .addVarNumSlider(
              'setting-accent-l-dark',
              {
                title: { en: 'Accent Color Lightness', zh: '高亮颜色亮度' },
                desc: { en: 'L(ight) of hsl', zh: 'HSL 中的 L' },
              },
              { default: 58, min: 0, max: 100, step: 1, format: '%' },
            ),
        ]),
    ]),
])
