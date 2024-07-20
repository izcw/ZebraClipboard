import './styles/main.css';

import { createApp } from 'vue';
import pinia from './stores/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'boxicons/css/boxicons.min.css'; // 确保 Boxicons CSS 被引入
import UUID from 'vue3-uuid';

import { useThemeStore } from './stores/theme'; // 主题管理
import App from './App.vue';
import router from './router';

const app = createApp(App);

// 配置自定义元素
app.config.compilerOptions.isCustomElement = tag => tag === 'box-icon';

// 使用插件
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.use(UUID);

// 注册 ElementPlus 的图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 挂载应用
app.mount('#app');

// 在应用启动时初始化主题
const themeStore = useThemeStore();
themeStore.initializeTheme();
