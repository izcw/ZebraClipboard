import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'boxicons';

import { useThemeStore } from './stores/theme'; // 主题

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.compilerOptions.isCustomElement = tag => tag === 'box-icon';

app.use(createPinia())
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)

app.mount('#app')

// 在应用启动时初始化主题
const themeStore = useThemeStore();
themeStore.initializeTheme();