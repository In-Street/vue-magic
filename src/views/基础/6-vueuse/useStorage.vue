<!-- 获取鼠标X Y坐标值 -->
<script setup lang="ts">
import { useStorage } from '@vueuse/core';


//第三个参数不传，默认使用 localStorage
const n = useStorage('nk','')
</script>

<template>
    <input type="text" v-model="n">
</template>