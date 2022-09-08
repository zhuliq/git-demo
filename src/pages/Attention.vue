<script setup lang="ts">
import TopNav from '../components/TopNav.vue'

// TopNav左侧图标点击事件
const leftClick = (): void => {
    console.log(3333)
}
// TopNav右侧图标点击事件
const rightClick = (): void => {
    console.log(444)
}

</script>

<template>
    <TopNav iconListLeft="#icon-liebiao" iconListRight='#icon-jiahao2fill' middleStyle='attention'
        :leftClick='leftClick' :rightClick='rightClick' />
    <!-- 背景图片 -->
    <div class="attentionBgFilter"></div>

</template>

<style scoped lang="less">
.attentionBgFilter {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(5px);
    filter: brightness(80%);
    filter: opacity(75%);
    // 完整显示
    background-size: cover;
    background-image: url(../assets/img/leo.jpg);
    background-attachment: fixed;
}
</style>
