import { descValidCSS, Settings } from './generator'

export default Settings.create('maple-plugin', 'Maple Plugin').children([
  Settings.ofLevel(1, { title: { en: 'Calendar', zh: '日历' } })
    .addClassSelect(
      'calendar-weekend',
      {
        title: { en: 'Highlight Weekends', zh: '突出显示周末' },
      },
      {
        allowEmpty: false,
        default: 'calendar-end-disable',
        options: [
          { label: 'Disable', value: 'calendar-end-disable' },
          { label: 'Day 1 and Day 2', value: 'calendar-end-1-2' },
          { label: 'Day 2 and Day 3', value: 'calendar-end-2-3' },
          { label: 'Day 3 and Day 4', value: 'calendar-end-3-4' },
          { label: 'Day 4 and Day 5', value: 'calendar-end-4-5' },
          { label: 'Day 5 and Day 6', value: 'calendar-end-5-6' },
          { label: 'Day 6 and Day 7', value: 'calendar-end-6-7' },
          { label: 'Day 7 and Day 1', value: 'calendar-end-7-1' },
        ],
      },
    )
    .addClassToggle('calendar-swap-year-month', {
      title: { en: 'Swap Year and Month Display', zh: '交换年份和月份显示' },
    })
    .addVarText(
      'setting-calendar-year-suffix',
      {
        title: { en: 'Year Suffix Text', zh: '年份后缀文本' },
      },
      { default: '年', quotes: true },
    )
    .addVarText(
      'setting-calendar-max-width',
      {
        title: { en: 'Calendar Maximum Width', zh: '日历最大宽度' },
        desc: descValidCSS('max-width'),
      },
      { default: '500px' },
    ),
])
