<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePagination } from 'vue-request';
import axios from '../../../api/request'
import type { ListReult, StudentInfo, StudentQuery } from '../../../modle/Student';

// 定义响应式变量来绑定用户输入，并设置请求默认值
const studentQuery = ref<StudentQuery>({
    name: '',
    age: [0, 99],
    gender: 0,
    pageNum: 1,
    pageSize: 3
})

const ageLow = computed({
    get: () => studentQuery.value.age?.[0] ?? 0,
    set: (val) => {
        if (studentQuery.value.age) {
            studentQuery.value.age[0] = val
        }
        studentQuery.value.age = [val, 99]
    }
})

const ageHigh = computed({
    get: () => studentQuery.value.age?.[1] ?? 99,
    set: (val) => {
        if (studentQuery.value.age) {
            studentQuery.value.age[1] = val
        }
        studentQuery.value.age = [0, val]
    }
})

//泛型参数一：响应类型，ListReult
//泛型参数二：请求类型,注意是数组
const { data } = usePagination<ListReult<StudentInfo>, StudentQuery[]>(

    //参数二：设置请求参数配置，请求形式为? & 拼接，?name=xx&gender=xx 
    // d 就是下面defaultParams，会将值传递给此箭头函数
    (d) => axios.get('/frontEnd/getStudentList', { params: d }),  

    //参数二：发请求时的选项，对象类型
    {
        //默认参数
        defaultParams: [studentQuery.value],

        //绑定请求对象中的分页相关属性，当前页
        pagination: {
            currentKey: 'pageNum', // 指明当前页属性
            pageSizeKey: 'pageSize' //指明页大小属性
        }
    }
)

</script>
<template>
    <input type="text" placeholder="请输入姓名" v-model="studentQuery.name">
    <br>
    <select v-model="studentQuery.gender">
        <option value="">请选择性别</option>
        <option value=1>男</option>
        <option value=2>女</option>
    </select>
    <br>
    <input type="number" placeholder="请输入年龄范围" v-model="ageLow">
    <input type="number" placeholder="请输入年龄范围" v-model="ageHigh">
    <br>
    <input type="text" placeholder="请输入页码" v-model="studentQuery.pageNum">
    <input type="text" placeholder="请输入页大小" v-model="studentQuery.pageSize">
    <input type="button" value="搜索">
</template>