<script setup lang="ts">

import { onMounted, ref } from 'vue';
import axios from '../../../api/request'
import type { ListReult, StudentInfo } from '../../../modle/Student';

const studentArray = ref<StudentInfo[]>([])

async function getAllStudents() {

    const resp = await axios.get<ListReult<StudentInfo>>('/frontEnd/getAllStudent')

    studentArray.value = resp.data.data

    console.log(studentArray)
}

onMounted(() => getAllStudents())

</script>
<template>
    <div class="container">
        <h1>学生列表</h1>

        <!-- 表头 -->
        <div class="table-row header-row">
            <div class="cell">编号</div>
            <div class="cell">姓名</div>
            <div class="cell">性别</div>
            <div class="cell">年龄</div>
        </div>

        <!-- 数据行 -->
        <div class="tbody">
            <!-- 条件成立，此div会在页面存在，不成立时div不显示 -->
            <div v-if="studentArray.length ===0 ">暂无数据</div>
            <div class="table-row" v-for="stu of studentArray" v-else>
                <div class="body-cell">{{ stu.id }}</div>
                <div class="body-cell">{{ stu.name }}</div>
                <div class="body-cell">{{ stu.gender === 1 ? '男' : '女' }}</div>
                <div class="body-cell">{{ stu.age }}</div>
            </div>
        </div>
    </div>


</template>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "SimSun", "宋体", serif;
    background-color: #fff;
    color: #000;
    line-height: 1.6;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
}

h1 {
    text-align: center;
    font-size: 28px;
    font-weight: normal;
    margin-bottom: 16px;
    letter-spacing: 4px;
}

/* 表格容器 - 使用 flex 实现网格 */
.table-row {
    display: flex;
    width: 100%;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

.table-row:first-of-type {
    border-top: 1px solid #ccc;
}

.cell {
    flex: 1;
    padding: 20px 10px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    font-size: 20px;
}

.body-cell {
    display: inline-block;
    padding: 10px 20px;
    margin: 5px;
    background: #e3f2fd;
    border: 1px solid #90caf9;
    border-radius: 4px;
}

.cell:last-child {
    border-right: none;
}

/* 表头特殊样式 */
.header-row {
    background-color: #e8e8e8;
}

.header-row .cell {
    font-weight: bold;
    font-size: 18px;
}

/* 悬停效果 */
.table-row:not(.header-row):hover {
    background-color: #f5f5f5;
}

/* 可选：隔行变色 */
.table-row:nth-child(even):not(.header-row) {
    background-color: #fafafa;
}
</style>