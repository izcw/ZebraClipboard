import { h } from 'vue'
import pinia from '../store/store.js'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'// 引入 'element-plus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import wangEditor from './components/editor/wangEditor.vue'// 引入 wangeditor
import '@wangeditor/editor/dist/css/style.css' 
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

import VueQrcode from 'vue-qrcode' // 导入二维码插件

import Index from './components/index.vue' // 自定义组件
import ClipboardLayout from './components/Clipboard/Layout.vue'
import ClipboardLayoutQuery from './components/Clipboard/LayoutQuery.vue'
import QRcode from './components/Clipboard/sidebar/QRcode.vue'
import information from './components/Clipboard/sidebar/information.vue'
import operation from './components/Clipboard/sidebar/operation.vue'
import Uploadfiles from './components/editor/Uploadfiles.vue'
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

    // wangEditor编辑器
    app.component('wangEditor', wangEditor)
    app.component('Editor',Editor)
    app.component('Toolbar',Toolbar)

    // 注册自定义组件
    app.component('Index', Index)
    app.component('ClipboardLayout', ClipboardLayout)
    app.component('ClipboardLayoutQuery', ClipboardLayoutQuery)
    app.component('QRcode', QRcode)
    app.component('information', information)
    app.component('operation', operation)
    app.component('Uploadfiles', Uploadfiles)
    app.component('TestsIndex', tests)
  }
}
