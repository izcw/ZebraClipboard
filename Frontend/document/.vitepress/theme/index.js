import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Index from './components/index.vue'
import ClipboardLayout from './components/Clipboard/Layout.vue'
import ClipboardLayoutQuery from './components/Clipboard/LayoutQuery.vue'
import wangEditor from './components/editor/wangEditor.vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 wangeditor 的样式
import QRcode from './components/Clipboard/sidebar/QRcode.vue'
import information from './components/Clipboard/sidebar/information.vue'
import operation from './components/Clipboard/sidebar/operation.vue'
import Uploadfiles from './components/editor/Uploadfiles.vue'
// 引入二维码插件
import VueQrcode from 'vue-qrcode'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 使用 Element Plus
    app.use(ElementPlus)
    // 注册 Element Plus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // 二维码
    app.component('vue-qrcode', VueQrcode)

    // 注册自定义组件
    app.component('Index', Index)
    app.component('ClipboardLayout', ClipboardLayout)
    app.component('ClipboardLayoutQuery', ClipboardLayoutQuery)
    app.component('wangEditor', wangEditor)
    app.component('QRcode', QRcode)
    app.component('information', information)
    app.component('operation', operation)
    app.component('Uploadfiles', Uploadfiles)
  }
}
