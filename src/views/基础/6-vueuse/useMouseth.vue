<!-- 获取鼠标X Y坐标值 -->
<script setup lang="ts">
import { useMouse } from '@vueuse/core';

const { x, y } = useMouse()

</script>

<template>
    <h3>X坐标值：{{ x }}</h3>
    <h3>Y坐标值：{{ y }}</h3>
</template>