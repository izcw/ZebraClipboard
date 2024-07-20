import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDarkTheme: false,
    }),
    actions: {
        // 定义切换主题的函数
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme; // 切换主题状态
            document.body.classList.toggle('dark-theme', this.isDarkTheme); // 根据当前主题状态切换 body 的类名
            localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light'); // 将当前主题状态存储到本地存储
        },
        // 定义初始化主题的函数
        initializeTheme() {
            if (localStorage.getItem('theme') === 'dark') { // 如果本地存储中的主题是 'dark'
                this.isDarkTheme = true; // 设置主题状态为 'dark'
                document.body.classList.add('dark-theme'); // 给 body 添加 'dark-theme' 类名
            }
        },
    },
    persist: {
        storage: window.localStorage,
        paths: ['isDarkTheme'],
        expires: 24 * 60 * 60 * 1000, // 24小时后过期
    }
});