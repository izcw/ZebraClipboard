import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDarkTheme = ref(false); // 创建一个响应式变量，用于存储当前主题状态

    // 定义切换主题的函数
    const toggleTheme = () => {
        isDarkTheme.value = !isDarkTheme.value; // 切换主题状态
        document.body.classList.toggle('dark-theme', isDarkTheme.value); // 根据当前主题状态切换 body 的类名
        localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light'); // 将当前主题状态存储到本地存储
    };

    // 定义初始化主题的函数
    const initializeTheme = () => {
        if (localStorage.getItem('theme') === 'dark') { // 如果本地存储中的主题是 'dark'
            isDarkTheme.value = true; // 设置主题状态为 'dark'
            document.body.classList.add('dark-theme'); // 给 body 添加 'dark-theme' 类名
        }
    };

    // 返回 store 中的状态和方法
    return { isDarkTheme, toggleTheme, initializeTheme };
});
