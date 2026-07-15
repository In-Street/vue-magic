<script setup lang="ts">
import axios from '../../../api/request'
import {onMounted, ref} from 'vue'

const count = ref(0)
async function getStudents(){
    // const resp = await axios.get('/api/frontEnd/getAllStudent')  //使用前端代理且原生axios时的访问方式
    const resp = await axios.get('/frontEnd/getAllStudent') // 使用自定义的axios，访问时自带了baseURL
    console.log(resp)
    count.value = (resp.data?.data.length)??0
}

// 在页面组件加载完成后执行
onMounted(()=>{
    getStudents()
})

</script>
<template>
    <h2>人数共计{{ count }}</h2>
</template>