<script setup lang="ts">

// promise 改造。
// await 表示在没有调用resolve 或 reject之前，都会阻塞不会执行后续代码，直到接口响应结束 调用了resolve/reject后才会继续往后执行
// resolve: 异步操作成功时，由resolve处理。 失败错误由reject处理

try {
    const resp = await getRequest('/api/frontEnd/getAllStudent')
    console.log(resp)
} catch (e) {
    console.error(e)
}

function getRequest(url: string): Promise<unknown> {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.response) // 执行完resolve，会将结果给到resp变量
            } else if (xhr.status === 404) {
                reject(xhr.response)
            }
        }

        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.send()
    })

}

</script>
<template></template>