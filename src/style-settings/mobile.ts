import { Settings } from './generator'

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
])
