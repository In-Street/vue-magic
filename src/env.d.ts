interface ImportMetaEnv {
    readonly VITE_BACKEND_API_BASE_URL: string
    // 更多的自定义环境变量
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}