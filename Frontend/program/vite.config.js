import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4013  // 指定开发服务器端口
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue({
      // 配置选项
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'box-icon',
        },
      },
    }),
  ],
})
