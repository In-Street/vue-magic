<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template> -->


<script setup lang="ts">// 固定属性 setup lang

import { ref } from 'vue'

let msg = ref('hello') // 把值变成响应式
function change() {
  msg.value = 'world'  // js中通过 .value 获取值
}

</script>

<template>

  <h1>{{ msg }}</h1> <!-- html中访问变量使用 {{xx}} -->
  <input type="button" value="修改" @click="change"> <!-- @click点击事件，对应函数名-->
</template>