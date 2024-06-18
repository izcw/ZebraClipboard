import { defineConfig } from 'vitepress'

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
      { text: '首页', link: '/' },
      { text: '剪贴板', link: '/docs/clipboard/clipboard' },
      { text: '查询剪贴板', link: '/docs/clipboard/query' },
      { text: '在线支持', link: '/docs/about/Reward.md' },
      { text: '关于我们', link: '/docs/about/index' },
      { text: '登录&nbsp;/&nbsp;注册', link: '/markdown-examples' },
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
        text: '服务协议',
        items: [
          { text: '隐私政策', link: '/docs/service/PrivacyPolicy' },
          { text: '用户协议', link: '/docs/service/UserAgreement' },
        ]
      },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    sitemap: {
      hostname: 'https://example.com',
      lastmodDateOnly: false
    },
    footer: {
      message: '<div style="display: flex;justify-content: center;align-items: center;"><img src="/publicsecurity.png">桂公网安备 45098102000466号&emsp;&emsp;桂ICP备2022009640号-2</div>',
      copyright: 'Copyright © 2023-2024 张成威'
    }
  }
})
