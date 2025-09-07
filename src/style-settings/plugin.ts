import { Settings } from './generator'

export default Settings.create('maple-plugin', 'Maple Plugin').children([
  Settings.ofLevel(1, { title: { en: 'Calendar', zh: '日历' } })
    .addClassToggle(
      'calendar-weekend',
      {
        title: { en: 'Highlight Weekend', zh: '突显周末' },
      },
      { enable: true },
    )
    .addClassToggle('calendar-swap-year-month', {
      title: { en: 'Swap Year & Month', zh: '交换年和月的位置' },
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
        title: { en: 'Max Width', zh: '最大宽度' },
        desc: {
          en: 'Support any css max-width property',
          zh: '支持任何 css 的 max-width 属性值',
        },
      },
      { default: '500px' },
    ),
  Settings.ofLevel(1, { title: { en: 'Kanban', zh: '看板' } })
    .addVarThemedColor(
      'setting-kanban-item-color',
      {
        title: { en: 'Kanban Item Font Color', zh: '看板项 文字颜色' },
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
        title: { en: 'Kanban Item Background Color', zh: '看板项 背景色' },
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
          zh: '看板 版面 背景色',
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
    title: { en: 'DataView(WIP)', zh: 'DataView(待完工)' },
  }).addClassToggle('dv-enable', {
    title: { en: 'Enable Dataview Style', zh: '启用 dataview 样式' },
    desc: {
      en: 'Need install version >= 1.1.9',
      zh: '需要安装程序版本 >= 1.1.9',
    },
  }),
])
