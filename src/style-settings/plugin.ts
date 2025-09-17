import { descValidCSS, Settings } from './generator'

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
        desc: descValidCSS('max-width'),
      },
      { default: '500px' },
    ),
])
