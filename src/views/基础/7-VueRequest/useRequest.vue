<script setup lang="ts">
import { useRequest } from 'vue-request';
import axios from '../../../api/request'
import type { ListReult, StudentInfo } from '../../../modle/Student';
import { computed } from 'vue';

// data 为 axios的响应对象，无需像在学生列表.vue中定义额外的 ref变量来接收
const {data} = useRequest(() => axios.get<ListReult<StudentInfo>>('/frontEnd/getAllStudent') )

const stu = computed(()=>{
    return data.value?.data.data ?? []
})
</script>
<template>

    <!-- 多次使用 data?.data.data ，替换为计算函数结果 -->
    <!-- <h3 v-if="data?.data.data.length === 0">暂无数据</h3> -->
    <!-- <h3 v-for="s of data?.data.data" :key="s.id"> -->

    <h3 v-if="stu.length === 0">暂无数据</h3>
    <h3 v-for="s of stu" :key="s.id">
        <span>{{ s.id }}</span>
        <span>{{ s.name }}</span>
        <span>{{s.age}}</span>
        <span>{{ s.gender === 1 ? '男' : '女' }}</span>
    </h3>
</template>