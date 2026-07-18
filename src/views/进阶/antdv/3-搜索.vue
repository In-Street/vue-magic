<script setup lang="ts">
import { computed, ref } from 'vue';
import type { AxiosRespPage, StudentInfo, StudentQuery } from '../../../modle/Student';
import type { PaginationProps } from 'ant-design-vue';
import { usePagination } from 'vue-request';
import _axios from '../../../api/request';


const queryDto = ref<StudentQuery>({
    name: '',
    ageMin: 0,
    ageMax: 99,
    gender: 0,
    pageNum: 1,
    pageSize: 3
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

const { data, total, run } = usePagination<AxiosRespPage<StudentInfo>, StudentQuery[]>(
    (d) => _axios.get('/frontEnd/getStudentList', { params: d }),
    {
        defaultParams: [queryDto.value],
        pagination: {
            currentKey: 'pageNum',
            pageSizeKey: 'pageSize',
            totalKey: 'data.total'
        }
    }
)

const pagination = computed<PaginationProps>(() => {
    return {
        current: queryDto.value.pageNum,
        pageSize: queryDto.value.pageSize,
        total: total.value,
        showSizeChanger: true,
        pageSizeOptions: [3, 5, 10],
        showTotal: (total) => (`总共${total}条`)
    }
})

/* const pagination = ref<PaginationProps>( {
        current: queryDto.value.pageNum,
        pageSize: queryDto.value.pageSize,
        total: total.value,
        showSizeChanger: true,
        pageSizeOptions: [3, 5, 10]
    }
) */

const stuList = computed(() => {
    return data.value?.data.data
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
    <!-- 一行 包含6列，每列的宽度由:span属性控制，antdv中一行被分成24等份，span=2 表示此列占据 2/24 -->
    <a-row>
        <a-col :span="2">
            <a-button type="primary" size="small">新增</a-button>
            <!-- primary 蓝底白字 -->
        </a-col>

        <a-col :span="4">
        </a-col>

        <a-col :span="4">
            <a-input placeholder="输姓名" size="small" v-model:value="queryDto.name"></a-input>
            <!-- primary 蓝底白字，和之前使用 v-model 不同的是，antdv组件绑定时，使用 v-model:value -->
        </a-col>

        <a-col :span="4">
            <a-select placeholder="选性别" :allowClear="true" size="small" v-model:value="queryDto.gender">
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="2">女</a-select-option>
            </a-select>
        </a-col>

        <a-col :span="4">
            <a-input placeholder="输最小年龄" size="small" v-model:value="queryDto.ageMin"></a-input>
        </a-col>

        <a-col :span="4">
            <a-input placeholder="输最大年龄" size="small" v-model:value="queryDto.ageMax"></a-input>
        </a-col>

        <a-col :span="2">
            <a-button type="primary" size="small" @click="search">搜索</a-button>
        </a-col>
    </a-row>

    <a-table :columns="columns" :dataSource="stuList" :pagination="pagination" @change="search"></a-table>
</template>