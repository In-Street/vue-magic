<script setup lang="ts">
import { computed, ref } from 'vue';

const album = ref('太阳之子')
const song = ref('那天下雨了')

// 计算属性。 第一次使用计算属性时，会进入箭头函数内部进行拼接，将结果缓存。 后续使用时，会直接从缓存中取结果，不会再进入箭头函数中进行字符串拼接。
//  当 album、song中任何一个变量值发生变化时，会重新进入箭头函数计算拼接新值
const desc = computed(() => {
    return album.value + ' -> ' + song.value
})

</script>

<template>
    <!-- 代码重复 -->
    <h2>{{ album + ' -> ' + song }}</h2>
    <h2>{{ album + ' -> ' + song }}</h2>

    <!-- 直接取计算属性 -->
    <h2>{{ desc }}</h2>
    <h2>{{ desc }}</h2>
</template>