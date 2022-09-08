<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import {computed, ComputedRef, onMounted} from 'vue'
import SearchHistory from '../components/search/SearchHistory.vue'
import SearchResultList from '../components/search/SearchResultList.vue'

const store = useStore()
const router = useRouter()
const isShowHistory:ComputedRef = computed(()=> store.state.search.data.isShowHistory)
const cookie = Storage.prototype.getCanExpireLocal('login_cookie')

// 跳转后依然保留滚动位置
onMounted(() => {
    const scrollTop = store.state.search.data.scrollTop
    const content = document.querySelector('.searchDistance');
    if (scrollTop && content) {
        content.scrollTop = scrollTop;
    }
})

//method
// TopNav点击返回 
function leftClick(): void {
    router.go(-1)
}
// 搜索框按下enter事件函数
function middleKeyup(e: any) {
    // 隐藏历史记录
    store.commit('search/setIsShowHistory', false)
    // input的value值
    const value = e.currentTarget.value
    // state中存入input的value值
    store.commit('search/setSearchHistory', value)
    // 搜索请求
    store.dispatch('search/getSearchSong', {keywords:value, cookie})
}
</script>

<template>
    <!-- 顶部导航栏 -->
    <TopNav iconListLeft="#icon-xiala" middleStyle='search' :leftClick='leftClick' :middleKeyup='middleKeyup' />
    <div class="content searchDistance">
        <!-- 搜索历史 -->
        <SearchHistory v-if="isShowHistory"/>
        <!-- 搜索结果 -->
        <SearchResultList v-if="!isShowHistory"/>
    </div>
</template>

<style scoped lang="less">
.content {
    height: 100%;
    margin: 0 3.5vw;
    overflow-y: scroll;
    margin-top: 6vh;
    //隐藏滚动条
    &::-webkit-scrollbar {
        width: 0 !important
    }
}
</style>
