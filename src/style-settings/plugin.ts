import { descValidCSS, Settings } from './generator'

const pluginList = [
  'Better Command Palette',
  'Calendar',
  'Obsidian Git',
  'MySnippets',
  'Quite Outline',
  'Recent Files',
  'Settings Search',
  'Shiki Highlighter',
].map((name) => `> - ${name}`)

export default Settings.create('maple-plugin', 'Maple Plugin').children([
  Settings.of().addInfo('plugin-intro', {
    en:
      'If you find any plugin not displaying properly, please open an issue at the [GitHub repository](https://github.com/subframe7536/obsidian-theme-maple).\n> [!info]- Adapted plugins\n' +
      pluginList.join('\n'),
    zh:
      '如果您发现某个插件显示不正常，请前往 [GitHub 仓库](https://github.com/subframe7536/obsidian-theme-maple) 提交 issue。\n> [!info]- 已适配的插件\n' +
      pluginList.join('\n'),
  }),
  Settings.ofLevel(1, { title: { en: 'Calendar', zh: '日历' } })
    .addClassSelect(
      'calendar-weekend',
      {
        title: { en: 'Highlighted Weekend Column', zh: '高亮周末列' },
      },
      {
        allowEmpty: false,
        default: 'calendar-end-disable',
        options: [
          { label: 'Disable', value: 'calendar-end-disable' },
          { label: 'Column 1 and 2', value: 'calendar-end-1-2' },
          { label: 'Column 2 and 3', value: 'calendar-end-2-3' },
          { label: 'Column 3 and 4', value: 'calendar-end-3-4' },
          { label: 'Column 4 and 5', value: 'calendar-end-4-5' },
          { label: 'Column 5 and 6', value: 'calendar-end-5-6' },
          { label: 'Column 6 and 7', value: 'calendar-end-6-7' },
          { label: 'Column 7 and 1', value: 'calendar-end-7-1' },
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
