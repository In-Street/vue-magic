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
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  //配置rewrite去掉前缀。 proxy默认做转发并不会自动去掉/api前缀，如：http://localhost:7070/api/frontEnd/getAllStudent 实际请求后端为 http://localhost:9090/api/frontEnd/getAllStudent 后端接口并没有/api 前缀，除非后端接口统一添加此前缀
      }
    }
  }
})
