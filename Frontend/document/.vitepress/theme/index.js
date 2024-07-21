import { h } from 'vue'
import { createPinia } from 'pinia';

import { generateEnhancedFingerprint } from '../utils/fingerprint.js';
import { NewDataUser } from './hooks/newUser.js';

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
// import tests from './components/test.vue'

import './style.css'

// 浏览器指纹变量
let fingeMark = '';
const getGenerateEnhanced = async () => {
  try {
    // 检查localStorage中是否已存在指纹
    let existingFingerprint;
    if (typeof window !== 'undefined') {
      existingFingerprint = localStorage.getItem("fingeMark");
    }

    // 如果存在指纹，则不再生成新的指纹
    if (existingFingerprint) {
      fingeMark = existingFingerprint;
      console.log("浏览器指纹（已存在）:", fingeMark);
    } else {
      // 如果不存在指纹，则生成新的指纹
      const fingerprint = await generateEnhancedFingerprint();
      fingeMark = fingerprint;
      console.log("浏览器指纹（新生成）:", fingeMark);
      if (typeof window !== 'undefined') {
        localStorage.setItem("fingeMark", fingeMark);
      }
    }
    NewDataUser()
  } catch (error) {
    console.error('生成指纹时出错：', error);
  }
};
getGenerateEnhanced();

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
    // app.component('TestsIndex', tests)
    // Fingerverificode()
  }
}
