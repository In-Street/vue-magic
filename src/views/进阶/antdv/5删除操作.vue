<script setup lang="ts">
import { computed, ref } from 'vue';
import type { AxiosRespPage, StudentInfo, StudentQuery } from '../../../modle/Student';
import type { PaginationProps } from 'ant-design-vue';
import { usePagination, useRequest } from 'vue-request';
import _axios from '../../../api/request';
import qs from 'qs';
import type { AxiosStringResult } from '../../../modle/User';


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
    },
    {
        title: '操作',
        dataIndex: 'operation'
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


// 调用删除接口，不需要像获取列表数据一样一进页面就调用，所以设置成手动调用： manual: true  ， run设置别名否则与usePagination的run冲突
// const {run:delStudentById} = useRequest<AxiosStringResult,number[]>(
const { runAsync: delStudentById } = useRequest<AxiosStringResult, number[]>(
    (d) => _axios.post('/frontEnd/delStudentById', null, { params: { ids: d } }),
    {
        manual: true
    }
)

// 调用删除方法后，页面没有刷新，删除的数据仍然存在，需要触发列表接口
// function onDelete(id: number) {
async function onDelete(id: number) {
    console.log('删除学生ID：', id)
    // delStudentById(id)
    await delStudentById(id)
    run(queryDto.value) // 同步调用列表方法时，可能出现列表的响应先返回，del的响应后返回，此时页面还是获取的旧数据，无法控制。 需要等待del响应成功后再调用列表接口，所以将del改为异步,await 等待返回
}

//选中框选中的id
const ids = ref<number[]>([])

function onSelectChange(selectedIds: number[]) {
    console.log('选中删除id：', selectedIds)
    ids.value = selectedIds  // 需要将选中的内容回传给ids，这样页面就可以展示出选中的效果

}

const { runAsync: delByIds } = useRequest<AxiosStringResult, number[][]>(
    (d) => _axios.post('/frontEnd/delStudentById', null, {
        params: { ids: d },
        paramsSerializer: {
            serialize: (params) => qs.stringify(params, { indices: false })
        }
    }),
    {
        manual: true
    }
)

async function onDeleteIds() {
    await delByIds(ids.value)
    ids.value = [] // 删除后，清空已选中的id值
    run(queryDto.value) // 刷新列表数据
}


function onVisibleChange(v: boolean) {
    if (!v) {
        visible.value = false
        return
    }
    visible.value = ids.value.length > 0
}

// 默认弹窗隐藏
const visible = ref(false)

</script>
<template>
    <!-- 一行 包含6列，每列的宽度由:span属性控制，antdv中一行被分成24等份，span=2 表示此列占据 2/24 -->
    <a-row>
        <a-col :span="2">
            <a-button type="primary" size="small">新增</a-button>
            <!-- primary 蓝底白字 -->
        </a-col>

        <a-col :span="2">
            <!-- visible-change: true弹窗可见 false不可见, visible 绑定数据  -->
            <a-popconfirm title="确认删除选中的学生吗？" okText="确认" cancelText="取消" @confirm="onDeleteIds"
                @open-change="onVisibleChange" :open="visible">
                <a-button type="primary" size="small">删除选中</a-button>
                <!-- primary 蓝底白字 -->
            </a-popconfirm>
        </a-col>

        <a-col :span="2">
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

    <!-- row-selection 每条记录前面的选中框， selectedRowKeys 选中的rowKeys数组形式，当选中内容变化时触发onChange事件 -->
    <a-table :columns="columns" :dataSource="stuList" :pagination="pagination" @change="search" rowKey="id"
        :row-selection="{ selectedRowKeys: ids, onChange: onSelectChange }">

        <!-- bodyCell:  自定义单元格name的值， -->
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'name'">
                {{ record.name + (record.genderStr === '男' ? '(M)' : '(W)') }}
            </template>

            <!-- 添加操作列 -->
            <template v-else-if="column.dataIndex === 'operation'">
                <a>修改</a>
                <a-divider type="vertical"></a-divider> <!--添加antdv中的纵向分割符，否则两个a标签是紧挨的-->

                <!-- 添加删除确认框 -->
                <a-popconfirm title="确认删除该学生吗？" ok-text="确认" cancel-text="取消" @confirm="onDelete(record.id)">
                    <a>删除</a>
                </a-popconfirm>

            </template>

        </template>

    </a-table>

</template>