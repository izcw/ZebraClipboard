import { defineStore } from 'pinia';
export const useTokenStore = defineStore('token', {
    state: () => ({
        token: '',
    }),
    actions: {
        sessionStoragesetItem(val) {
            this.token = val;
        },
    },
    persist: {
        storage: window.sessionStorage, // 使用 localStorage
        // paths: ['token'],
        expires: 24 * 60 * 60 * 1000, // 24小时后过期
    }
});