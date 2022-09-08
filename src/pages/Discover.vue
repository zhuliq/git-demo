<script setup lang="ts">
import { onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
//引入TopNav组件
import TopNav from '../components/TopNav.vue'
//引入IconList组件
import Banner from '../components/discover/Banner.vue'
//引入IconList组件
import IconList from '../components/discover/IconList.vue'
//引入RecommendPlaylist组件
import RecommendPlaylist from '../components/discover/RecommendPalylist.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()
//methods
// TopNav左侧图标点击事件
function toSearchPage(): void {
    // 显示历史记录
    store.commit('search/setIsShowHistory', true)
    router.push({
        path: '/search'
    })
}
function leftClick() {
    alert('暂未开发')
}
function rightClick() {
    alert('暂未开发')
}
//路由钩子，路由组件被激活时触发
// 跳转后依然保留滚动位置
onActivated(() => {
    const scrollLeft = store.state.recommendPlayList.data.scrollLeft
    const content = document.querySelector('.recommendPlaylist');
    if (scrollLeft && content) {
        content.scrollLeft = scrollLeft;
    }
})
</script>

<template>
    <!-- 顶部导航栏 -->
    <TopNav iconListLeft="#icon-liebiao" iconListRight='#icon-maikefeng' middleStyle='discover'
        :middleClick='toSearchPage' :leftClick="leftClick" :rightClick="rightClick" />
    <!-- 背景图片 -->
    <div class="discoverBgFilter"></div>
    <!-- 内容区 -->
    <div class="discoverContent">
        <!-- banner -->
        <Banner />
        <!-- icon分类表 -->
        <IconList />
        <!-- RecommendPlaylist推荐歌单 -->
        <RecommendPlaylist ref='recommendPlaylist' />
    </div>

</template>

<style scoped lang="less">
// 内容区
.discoverContent {
    margin-top: 7vh;
    padding-left: 3.5vw;
    padding-right: 3.5vw;
    overflow-y: scroll;

    //隐藏滚动条
    &::-webkit-scrollbar {
        width: 0 !important
    }

}

// 背景图片
.discoverBgFilter {
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
