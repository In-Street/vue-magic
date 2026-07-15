<script setup lang="ts">
import { ref, watch } from 'vue';

const name = ref(sessionStorage.getItem("nameKey") ?? '');

// 参数1: 要监听的数据 、参数2: 数据变化时执行的箭头函数
watch(name, (newValue) => {
    console.log(`用户名变为 ${newValue} `)
    sessionStorage.setItem('nameKey', newValue)
})

//localStorage : 即使浏览器关掉，下次打开数据还在
//sessionStorage: 浏览器关闭，数据丢失。工作在浏览器活动期间


</script>
<template>
    <input type="text" v-model="name">
</template>