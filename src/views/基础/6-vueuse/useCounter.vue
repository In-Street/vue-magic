<!-- 计数器 -->
<script setup lang="ts">
import { useCounter } from '@vueuse/core';

const {count,inc,dec} = useCounter()

</script>

<template>
<h3>{{ count }}</h3>
<input type="button" value="+" @click="inc()">
<input type="button" value="-" @click="dec()">
</template>