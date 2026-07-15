// 自定义 axios，设置后端接口地址

import axios from "axios";

const _axios = axios.create(
    {
        baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL
    }
)

// 请求拦截器
_axios.interceptors.request.use(
    //若请求未出错时的处理
    (config) => {
        config.headers.set('Authorization', 'a.b.c')  // 为每个请求添加请求头
        return config
    },

    //请求出错时的处理
    (error) => {
        return Promise.reject(error) //不处理异常，将异常直接抛出
    },
)

//响应拦截器
_axios.interceptors.response.use(
    //响应成功时的处理。当响应状态吗为2xx
    (reponse) => {
        const { code, data, msg } = reponse.data

        // 当后端返回自定义错误码时
        if (code === 10001) {
            window.location.href = '/login'
            return Promise.reject(new Error(msg || '未登录'))
        }
        if (code === 20001) {
            alert(msg)
            return Promise.reject(new Error(msg || '权限不足'))
        }
        return reponse;
    },

    //响应出错时的处理,当响应状态码 大于2xx。 为了避免在业务代码里每个请求都添加try catch处理，在此处统一处理
    (error) => {
        console.log(error) // 异常处理
        if (error.response.status === 400) {
            //
        }

        return Promise.resolve({}) // 发生异常时，返回一个空对象。 在业务代码中获取结果数据时data不一定存在，所以使用 response.data?.data
    },
)

export default _axios

