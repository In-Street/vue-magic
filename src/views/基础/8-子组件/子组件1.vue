<!-- 父组件 -->
<script setup lang="ts">
import Child from '../../../components/Child.vue';
</script>

<template>
    <!-- import Child 后， 依据子组件中的属性进行值的设定 -->
    <Child name="Jay" country="中国" avatar="/src/assets/vue.svg"></Child>
    <Child name="说好的幸福呢" country="中国" avatar="/favicon.svg"></Child>  
    <Child name="西西里" country="太原" ></Child>  
</template>