<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from "vue";
import { useStore } from "vuex";
import TopNav from "../components/TopNav.vue"
import Description from "../components/songlist/Description.vue";
import Comment from "../components/songlist/Comment.vue";
import SongMenu from '../components/songlist/SongMenu.vue'

const router = useRouter()
const store = useStore()
//method
//返回上一级
function leftClick(): void {
    router.go(-1)
}
function middleClick(): void {
    router.push({
        path:'/search'
    })
}

// 跳转后依然保留滚动位置
onMounted(() => {
    const scrollTop = store.state.songList.data.scrollTop
    const content = document.querySelector('.songListDistance');
    if (scrollTop && content) {
        content.scrollTop = scrollTop; 
    }
})

</script>

<template>
    <TopNav iconListLeft="#icon-xitongfanhui" iconListRight='#icon-diandian' middleStyle='songlist'
        navMiddleSongListBrand="#icon-pinpaishangbiao" navMiddleSongListSearch='#icon-sousuo' :leftClick='leftClick' 
        :middleClick="middleClick"/>
    <!-- 歌单 -->
    <div class="content songListDistance">
        <!-- 歌单简介 -->
        <Description />
        <!-- 收藏评价分享 -->
        <Comment />
        <!-- 歌曲单 -->
        <SongMenu />
    </div>
</template>

<style scoped lang="less">
.content {
    height: 100%;
    padding-top: 7vh;
    padding-left: 3.5vw;
    padding-right: 3.5vw;
    position: relative;
    overflow-y: scroll;

    //隐藏滚动条
    &::-webkit-scrollbar {
        width: 0 !important
    }

}
</style>
