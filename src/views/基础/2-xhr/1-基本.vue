<script setup lang="ts">

// 向后端发起请求方式： fetch 、 xhr [XMLHttpRequest] 发起请求→当接口返回后触发onload事件

const xhr = new XMLHttpRequest()

//绑定事件，当接口返回响应时触发该事件。
xhr.onload = function (){
    //2. 接受响应
    console.log(xhr.response)
}

// 1. 发起请求
// xhr.open('GET','http://localhost:7070/api/frontEnd/getAllStudent')
xhr.open('GET','/api/frontEnd/getAllStudent')

xhr.responseType='json'  //指定响应格式
xhr.send()

</script>
<template></template>