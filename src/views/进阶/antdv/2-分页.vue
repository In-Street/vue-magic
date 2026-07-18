<script setup lang="ts">
import { usePagination } from 'vue-request';
import type { AxiosRespPage, StudentInfo, StudentQuery } from '../../../modle/Student';
import axios from '../../../api/request'
import { computed, ref } from 'vue';
import type { PaginationProps } from 'ant-design-vue';

const queryDto = ref({
    pageNum: 1,
    pageSize: 3
})

const { data, total, run } = usePagination<AxiosRespPage<StudentInfo>, StudentQuery[]>(
    (d) => axios.get('/frontEnd/getStudentList', { params: d }),
    {
        defaultParams: [queryDto.value],
        pagination: {
            currentKey: 'pageNum',
            pageSizeKey: 'pageSize',
            totalKey: 'data.total'
        }
    }
)

const arr = computed(() => {
    const list = data.value?.data.data
    console.log('查询结果', list)
    return list
})

const columns = [
    {
        title: '编号',
        dataIndex: 'id'
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

// 指定<a-tbale> 的pagination属性，绑定当前页、页大小、总记录数的取值，组件就可精确的展示出页码
const pagination = computed<PaginationProps>(() => {
    return {
        current: queryDto.value.pageNum,
        pageSize: queryDto.value.pageSize,
        total: total.value,
        showSizeChanger: true,  // 显示改变页大小的下拉框
        pageSizeOptions: [3,4,5,10] //自定义页大小下拉框的选项。 不配置默认为 10\20\50\100
    }
})

// 当点击页面换页时，参数 pagination会传递进来
function search(pagination: PaginationProps) {

    console.log(pagination) // {"current":2,"pageSize":3,"total":6}
    queryDto.value.pageNum = pagination.current ?? 1
    queryDto.value.pageSize = pagination.pageSize ?? 3
    return run(queryDto.value)
}

</script>
<template>
    <a-table :columns="columns" :dataSource="arr" rowKey="id" :pagination="pagination" @change="search"></a-table>
</template>