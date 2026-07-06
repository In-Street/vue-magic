import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import E1 from './views/基础/5-计算属性.vue'

// createApp(App).mount('#app')
createApp(E1).mount('#app') //将自定义的文件替换为根组件，挂在到主页上
