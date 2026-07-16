<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePagination } from 'vue-request';
import axios from '../../../api/request'
import type { AxiosRespPage, StudentInfo, StudentQuery } from '../../../modle/Student';

// 定义响应式变量来绑定用户输入，并设置请求默认值
const studentQuery = ref<StudentQuery>({
    name: '',
    age: [],
    gender: 0,
    pageNum: 1,
    pageSize: 3
})

// age 两个输入框输入绑定最小值和最大值，分开计算函数设置
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
const { data, totalPage, total,run } = usePagination<AxiosRespPage<StudentInfo>, StudentQuery[]>(

    //参数二：设置请求参数配置，请求形式为? & 拼接，?name=xx&gender=xx 
    // d 就是下面defaultParams，会将值传递给此箭头函数
    (d) => axios.get('/frontEnd/getStudentList', { params: d }),

    //参数二：发请求时的选项，对象类型
    {
        //默认参数
        defaultParams: [studentQuery.value],

        //绑定请求对象中的分页相关属性，当前页
        pagination: {
            currentKey: 'pageNum', // 指明当前页属性，与请求体中参数名相同
            pageSizeKey: 'pageSize', //指明页大小属性，与请求体中参数名相同
            totalKey: 'data.total' // 指明总记录数，与接口响应体中的参数名相同
        }
    }
)

const studentFor = computed(() => data.value?.data.data ?? [])

function search(){
    run(studentQuery.value)
}

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
    <input type="button" value="搜索" @click="search">

    <h3 v-if="studentFor.length === 0">暂无数据</h3>
    <h3 v-for="v in studentFor">
        <span>{{ v.id }}</span>
        <span>{{ v.name }}</span>
        <span>{{ v.age }}</span>
        <span>{{ v.gender === 1 ? '男' : '女' }}</span>
    </h3>
    <hr>
    总记录数{{ total }}，总页数{{ totalPage }}
</template>