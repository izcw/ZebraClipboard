import { h } from 'vue'
import pinia from '../store/store.js'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'// 引入 'element-plus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Editor from './components/editor/Editor.vue'

import VueQrcode from 'vue-qrcode' // 导入二维码插件

import Index from './components/index.vue' // 自定义组件
import ClipboardLayout from './components/Clipboard/Layout.vue'
import ClipboardLayoutQuery from './components/Clipboard/LayoutQuery.vue'
import FooterInfo from './components/Clipboard/FooterInfo.vue'
import QRcode from './components/Clipboard/sidebar/QRcode.vue'
import sidebarIndex from './components/Clipboard/sidebar/index.vue'
import information from './components/Clipboard/sidebar/information.vue'
import Preview from './components/Clipboard/sidebar/Preview.vue'
import Uploadfiles from './components/editor/Uploadfiles.vue'
import UserIndex from './components/User/index.vue'
import login from './components/User/login.vue'
import tests from './components/test.vue'

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
    app.use(pinia)
    // 使用 Element Plus
    app.use(ElementPlus)
    // 注册 Element Plus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    // 二维码
    app.component('vue-qrcode', VueQrcode)

    // Editor
    app.component('Editor', Editor)

    // 注册自定义组件
    app.component('Index', Index)
    app.component('ClipboardLayout', ClipboardLayout)
    app.component('ClipboardLayoutQuery', ClipboardLayoutQuery)
    app.component('FooterInfo', FooterInfo)
    app.component('sidebarIndex', sidebarIndex)
    app.component('QRcode', QRcode)
    app.component('information', information)
    app.component('Preview', Preview)
    app.component('Uploadfiles', Uploadfiles)
    app.component('UserIndex', UserIndex)
    app.component('login', login)
    app.component('TestsIndex', tests)
  }
}
