import { defineConfig } from 'vitepress'
import configuration from './utils/config.js';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "斑马在线剪贴板",
  description: "免费文本、图片临时分享",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.ico",
    nav: [
      { text: '首页', link: '/index' },
      { text: '剪贴板', link: '/clipboard' },
      { text: '查询剪贴板', link: '/query' },
      // { text: '捐赠', link: '/docs/about/Reward.md' },
      // { text: '关于我们', link: '/docs/about/index' },
      { text: '管理面板', link: configuration.admin },
      { text: '登录&nbsp;/&nbsp;注册', link: '/docs/user/login.md' },
    ],

    sidebar: [
      {
        text: '关于我们',
        items: [
          { text: '关于我们', link: '/docs/about/index' },
          { text: '在线支持', link: '/docs/about/Reward' },
          { text: '特别鸣谢', link: '/docs/about/Acknowledgement.md' },
        ]
      },
      {
        text: '举报中心',
        items: [
          { text: '非法内容举报', link: '/docs/report/ContentReport' },
        ]
      },
      {
        text: '服务协议',
        items: [
          { text: '隐私政策', link: '/docs/service/PrivacyPolicy' },
          { text: '用户协议', link: '/docs/service/UserAgreement' },
        ]
      },

    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ],
    sitemap: {
      hostname: 'https://www.zebra.duoyu.link/',
      lastmodDateOnly: true
    },
    footer: {
      message: '<div style="display: flex;justify-content: center;align-items: center;flex-wrap: wrap;">&emsp;<img style="width: 16px;height: 16px;" src="/publicsecurity.png">桂公网安备 45098102000466号&emsp;&emsp;<p>桂ICP备2022009640号-2</p>&emsp;</div>',
      copyright: 'Copyright © 2024 张成威'
    }
  }
})
