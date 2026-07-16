<!-- 父组件 -->
<script setup lang="ts">
import { useRequest } from 'vue-request';
import Child from '../../../components/Child.vue';
import type { AxiosResult } from '../../../modle/User.ts';
import axios from 'axios';
import { computed } from 'vue';

// 请求网址，返回3条数据
const { data } = useRequest<AxiosResult>(
    () => axios.get('https://randomuser.me/api/?results=3')
)

const randomUsers = computed(() => {
    return data.value?.data.results || []
})

</script>

<template>
    <!-- 循环结果集， 并分别绑定属性值 -->
    <Child v-for="v of randomUsers" :name="v.name.first" :country="v.location.country" :avatar="v.picture.medium"></Child>
</template>