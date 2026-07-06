<!--  -->
<script setup lang="ts">
import {ref } from 'vue'

const user = ref({
    name:'Jay',
    age:18,
    gender:'男',
    fav:['游泳','健身']
})

function saveUser(){
    console.log(user.value)
}

</script>
<template>
    <div>
        <div>
            <label for="">请输入姓名</label>
            <input type="text" v-model="user.name"/>
        </div>

        <div>
            <label for="">请输入年龄</label>
            <input type="text" v-model="user.age"/>
        </div>

        <label for="">请选择性别</label>
        男<input type="radio" value="男" v-model="user.gender"/>
        女<input type="radio" value="女" v-model="user.gender"/>

        <div>
            <label for="">请选择爱好</label>
            游泳<input type="checkbox" value="游泳" v-model="user.fav"/>
            打球<input type="checkbox" value="打球" v-model="user.fav"/>
            健身<input type="checkbox" value="健身" v-model="user.fav"/>
        </div>

        <div>
            <input type="button" value="保存" @click="saveUser">
        </div>
    </div>
</template>