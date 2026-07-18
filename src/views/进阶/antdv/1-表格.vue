<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRequest } from 'vue-request';
import type { AxiosRespPage, StudentInfo } from '../../../modle/Student';
import axios from '../../../api/request';


const { data } = useRequest<AxiosRespPage<StudentInfo>>(() => axios.get('/frontEnd/getAllStudent'))

const stus = computed(() => {
    const list = data.value?.data.data
    console.log('stus', list)
    return list
})


const columns = [
    {
        title: '编号',
        dataIndex: 'id' //指定接口响应数据中对应的取值
    },
    {
        title: '姓名',
        dataIndex: 'name'
    },
    {
        title: '性别',
        dataIndex: 'genderStr'
    },
    {
        title: '年龄',
        dataIndex: 'age'
    }
]

function rowKey(s:StudentInfo){
    return s.id
}

</script>

<template>
    <!-- 注意： dataSource 是驼峰式，刚开始写成 datasource d导致数据显示不出来 
        rowKey: 官方说不指定时会出现各类奇怪的错误。 可以指定为 字符串或 函数(需要冒号)
    -->
    <!-- <a-table :columns="columns" :dataSource="stus" rowKey="id"></a-table> -->
    <a-table :columns="columns" :dataSource="stus" :rowKey="rowKey"></a-table>
</template>