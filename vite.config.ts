import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  //端口修改。 选项参考：https://vitejs.cn/config/server-options
  server: {
    port: 7070,
    host: "0.0.0.0",
    proxy: {
      '/api': {  // 以 /api 前缀的请求，都会走代理。
        target: "http://localhost:9090", //代理目标：后端服务器地址
        changeOrigin: true
      }
    }
  }
})
