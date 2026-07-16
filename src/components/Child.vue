<template>
    <div class="container">
        <div class="card">
            <div>
                <p class="name">{{ name }}</p>
                <p class="location">{{ country }}</p>
            </div>
            <img :src="avatar || '/src/assets/vue.svg'">
        </div>
    </div>

</template>

<script setup lang="ts">

// 原始：子组件中的张三、中国、头像地址 都是固定的
// 给子组件定义属性后，可动态展示父组件中传入的内容【defineProps不是函数，属于 编译宏】
defineProps<{
    name: string,
    country: string,
    avatar?: string  //可选属性
}>()

</script>
<style scoped>
body {
    background-color: #f0f2f5;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.container {
    padding: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1200px;
    /* 为子元素3D变换提供透视效果 */
}

.card {
    background-color: #ffffff;
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 26px 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 420px;
    box-sizing: border-box;
    transition: all 0.35s ease-in-out;
    /* 平滑过渡 */
    cursor: pointer;
    /* 提示可交互 */
    will-change: transform;
    /* 优化性能 */
}

/* 悬停时倾斜效果 */
.card:hover {
    transform: rotateY(-8deg) rotateX(3deg) scale(1.02);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
    /* 阴影加深增强立体感 */
}

.card>div {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.name {
    font-size: 23px;
    font-weight: 700;
    color: #1f2329;
    margin: 0;
}

.location {
    font-size: 15px;
    color: #888;
    margin: 0;
}

img {
    width: 52px;
    height: 52px;
    transition: transform 0.25s ease;
    /* 图片也可微动 */
}

/* 悬停时图片轻微反方向旋转，增加趣味 */
.card:hover img {
    transform: rotateY(8deg) rotateX(-3deg);
}
</style>