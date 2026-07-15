<script setup lang="ts">
// import axios from 'axios';
import axios from '../../../api/request'
import { ref } from 'vue'


const user = ref({
    name: '',
    gender: '',
    age: 0
})

async function saveUser() {
    console.log(user)
    // const resp = await axios.post('/api/frontEnd/saveUser', user.value) //使用前端代理且原生axios时的访问方式
    const resp = await axios.post('/frontEnd/saveUser', user.value)
    console.log(resp.data.data)
}

</script>
<template>
    <div>
        <div>
            <input type="text" placeholder="请输入姓名" v-model="user.name">
        </div>

        <div>
            <label>请选择性别</label>
            男<input type="radio" value="1" v-model="user.gender">
            女<input type="radio" value="2" v-model="user.gender">
        </div>

        <div>
            <input type="number" placeholder="请输入年龄" v-model="user.age">
        </div>

        <div>
            <input type="button" value="添加" @click="saveUser">
        </div>

    </div>
</template>