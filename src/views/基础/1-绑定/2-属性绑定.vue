<!-- 属性绑定 -->
<script setup lang="ts">
import {ref} from 'vue'

// const path = ref('/src/assets/hero.png') // src下文件地址写法，需写完整路径
const path = ref('/favicon.svg') // public 下文件地址写法

</script>
<template>
    <!-- :src 表示该属性要和响应式数据绑定，不加:表示普通属性 -->
    <img :src="path" alt="">
</template>