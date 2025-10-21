import { descValidCSS, Settings } from './generator'

export default Settings.create('maple-mobile', 'Maple Mobile').children([
  Settings.of().addClassToggle(
    'mobile-floating-button',
    {
      title: {
        en: 'Enable Floating Mode Switch Button',
        zh: '启用浮动的模式切换按钮',
      },
    },
    { enable: true },
  ),
  Settings.ofLevel(1, {
    title: { en: 'Font Settings', zh: '字体设置' },
    desc: {
      en: 'It is inconvenient to install fonts on mobile devices, so maybe you need this option',
      zh: '移动端不方便安装字体，所以有了这个选项',
    },
  })
    .addInfo('info-font-mobile', {
      en: [
        '> [!tip]',
        '1. Reset options in **Appearance > Font** to make this work',
        '2. Type "**maplemono**" if you want to use the theme\'s built-in monospace font Maple Mono',
        '3. External font can load from CSS Snippets.',
      ].join('\n> '),
      zh: [
        '> [!tip]',
        '1. 需要先重置 **外观 > 字体** 中的选项才能生效',
        '2. 如果想使用主题内置的等宽字体 Maple Mono，请输入 **maplemono**',
        '3. 外部字体可以通过 CSS 片段加载',
      ].join('\n> '),
    })
    .addVarText(
      'setting-mobile-font-interface',
      {
        title: { en: 'Interface Font', zh: '页面字体' },
        desc: descValidCSS('font-family'),
      },
      { default: '' },
    )
    .addVarText(
      'setting-mobile-font-text',
      {
        title: { en: 'Text Font', zh: '正文字体' },
        desc: descValidCSS('font-family'),
      },
      { default: '' },
    )
    .addVarText(
      'setting-mobile-font-monospace',
      {
        title: { en: 'Monospace Font', zh: '等宽字体' },
        desc: descValidCSS('font-family'),
      },
      { default: 'maplemono' },
    ),
])
