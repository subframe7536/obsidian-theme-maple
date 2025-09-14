import { Settings } from './generator'

export default Settings.create('maple-plugin', 'Maple Plugin').children([
  Settings.ofLevel(1, { title: { en: 'Calendar', zh: '日历' } })
    .addClassToggle(
      'calendar-weekend',
      {
        title: { en: 'Highlight Weekends', zh: '突出显示周末' },
      },
      { enable: true },
    )
    .addClassToggle('calendar-swap-year-month', {
      title: { en: 'Swap Year and Month', zh: '交换年份和月份的位置' },
    })
    .addVarText(
      'setting-calendar-year-suffix',
      {
        title: { en: 'Year Suffix', zh: '年份后缀' },
      },
      { default: "'年'" },
    )
    .addVarText(
      'setting-calendar-max-width',
      {
        title: { en: 'Maximum Width', zh: '最大宽度' },
        desc: {
          en: 'Supports any CSS max-width property.',
          zh: '支持任何 CSS 的 max-width 属性值。',
        },
      },
      { default: '500px' },
    ),
  Settings.ofLevel(1, { title: { en: 'Kanban', zh: '看板' } })
    .addVarThemedColor(
      'setting-kanban-item-color',
      {
        title: { en: 'Kanban Item Font Color', zh: '看板项文字颜色' },
      },
      {
        format: 'hex',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-kanban-item-bg',
      {
        title: { en: 'Kanban Item Background Color', zh: '看板项背景色' },
      },
      {
        format: 'hex',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    )
    .addVarThemedColor(
      'setting-kanban-board-bg',
      {
        title: {
          en: 'Kanban Board Background Color',
          zh: '看板版面背景色',
        },
      },
      {
        format: 'hex',
        opacity: true,
        defaultLight: '#',
        defaultDark: '#',
      },
    ),
  Settings.ofLevel(1, {
    title: { en: 'DataView (WIP)', zh: 'DataView (待完成)' },
  }).addClassToggle('dv-enable', {
    title: { en: 'Enable DataView Style', zh: '启用 DataView 样式' },
    desc: {
      en: 'Requires installation of version >= 1.1.9.',
      zh: '需要安装版本 >= 1.1.9。',
    },
  }),
])
