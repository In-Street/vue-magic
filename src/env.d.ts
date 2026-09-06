interface ImportMetaEnv {
    readonly VITE_BACKEND_API_BASE_URL: string
    // 更多的自定义环境变量
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}


/* declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 全局注册antd组件提示
import type { ComponentNames } from 'ant-design-vue/es/components'
declare module 'vue' {
    export interface GlobalComponents {
        // 示例：AButton、ATable...所有antd组件
        AButton: typeof import('ant-design-vue')['Button']
        ATable: typeof import('ant-design-vue')['Table']
        AInput: typeof import('ant-design-vue')['Input']
    }
} */