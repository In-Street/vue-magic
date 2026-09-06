import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          // resolveIcons: true   // 如果要自动注册图标组件 <AIcon />，开这个
          importStyle: false,
        })
      ],
      dts: 'src/components.d.ts'   // 生成 components 类型声明，关键！
    })
  ],

  //端口修改。 选项参考：https://vitejs.cn/config/server-options
  server: {
    port: 7070,
    host: "0.0.0.0",
    /* proxy: {  //交由后端进行跨域处理比前端处理跨域的接口响应时间少
      '/api': {  // 以 /api 前缀的请求，都会走代理。
        target: "http://localhost:9090", //代理目标：后端服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  //配置rewrite去掉前缀。 proxy默认做转发并不会自动去掉/api前缀，如：http://localhost:7070/api/frontEnd/getAllStudent 实际请求后端为 http://localhost:9090/api/frontEnd/getAllStudent 后端接口并没有/api 前缀，除非后端接口统一添加此前缀
      }
    } */
  }
})
