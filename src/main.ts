import { createApp } from 'vue'
import './style.css'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// import App from './App.vue'
import E1 from './views/进阶/antdv/2-分页.vue'
// createApp(App).mount('#app')

const app = createApp(E1)
app.use(Antd) // 全局注册 antdv
app.mount('#app') //将自定义的文件替换为根组件，挂在到主页上

console.log(import.meta.env.VITE_BACKEND_API_BASE_URL) // 获取环境变量