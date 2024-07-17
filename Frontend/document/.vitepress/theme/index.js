import { h } from 'vue'
import { createPinia } from 'pinia';
// import { createPersistPlugin } from '../utils/piniaPersistenceStorage.js'; // 引入持久化插件

import { generateEnhancedFingerprint } from '../utils/fingerprint.js'

import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Editor from './components/editor/Editor.vue'
import VueQrcode from 'vue-qrcode'
// import Index from './components/index.vue'
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

const pinia = createPinia();
// pinia.use(createPersistPlugin({ key: 'pinia' })); // 使用持久化插件

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(pinia);
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.component('vue-qrcode', VueQrcode)
    app.component('Editor', Editor)
    // app.component('Index', Index)
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
