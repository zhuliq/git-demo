<script setup lang="ts">
import TopNav from '../components/TopNav.vue'
import UserInfo from '../components/my/UserInfo.vue';
import IconGird from '../components/my/IconGird.vue'
import ILike from '../components/my/ILike.vue';
import { useStore } from 'vuex';
import { computed, ComputedRef, watchEffect } from 'vue'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const isLogin: ComputedRef = computed(() => store.state.login.data.isLogin)


// TopNav左侧图标点击事件
const leftClick = (): void => {
    alert('暂未开发')
}
// TopNav右侧图标点击事件
const rightClick = (): void => {
    router.push({
        path: '/search'
    })
}

// 监听isLogin
watchEffect(() => {
    // isLogin为true，cookie为空时发送请求
    if ((store.state.login.data.isLogin == true) && (store.state.login.data.cookie == '')) {
        // 请求登录并获取歌单
        const uid = store.state.login.data.profile.userId
        const cookie = Storage.prototype.getCanExpireLocal('login_cookie')
        // 获取用户歌单
        store.dispatch('login/getUserSongList', uid)
        // 获取用户等级
        store.dispatch('login/getUserLevel', cookie)
    }
})
</script>

<template>
    <TopNav iconListLeft="#icon-liebiao" iconListRight='#icon-sousuo' middleStyle='my' :leftClick='leftClick'
        :rightClick='rightClick' />
    <!-- 背景图片 -->
    <div class="myBgFilter"></div>
    <div class="content">
        <!-- 用户信息 -->
        <UserInfo />
        <!-- icon列表 -->
        <IconGird />
        <!-- 我喜欢 -->
        <ILike v-if="isLogin" />
    </div>
</template>

<style scoped lang="less">
.myBgFilter {
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

.content {
    height: 100%;
    margin: 0 3.5vw;
    overflow-y: scroll;

    //隐藏滚动条
    &::-webkit-scrollbar {
        width: 0 !important
    }
}
</style>
