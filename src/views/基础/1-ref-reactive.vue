<!-- ref 与 reactive -->
<script setup lang="ts">
import { ref, reactive } from 'vue'

const msg = ref({desc:'Hello,World!!'});

// 需传入对象
const user = reactive({ name: 'Jay' })

function test(){
    console.log(msg.value) // js中获取ref数据， .value
    console.log(user) // js中获取 reactive数据，直接变量名
}
test()
</script>
<template>
    <h2 class="ref">{{ msg.desc }}</h2>
    <h2 class="reactive">{{ user.name }}</h2>

</template>

<style>
.ref {
    color: blue;
}

.reactive {
    color: blueviolet;
}
</style>