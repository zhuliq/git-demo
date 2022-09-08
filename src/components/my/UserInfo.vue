<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import {computed, ComputedRef} from 'vue'

const router = useRouter()
const store = useStore()

const profile:ComputedRef = computed(()=>store.state.login.data.profile)
const userLevel:ComputedRef = computed(()=>store.state.login.data.userLevel)
const isLogin:ComputedRef = computed(()=>store.state.login.data.isLogin)

function goLogin() {
    router.push({
        path: '/login'
    })
}
</script>

<template>
    <div class="userInfoWrap">
        <img class="userHeadshot" :src="profile.avatarUrl">
        <div class="userNickname" @click="goLogin">{{profile.nickname}} ></div>
        <!-- 登录后显示 -->
        <div class="userState" v-show="isLogin">
            <span class="userAttention">{{profile.follows}} 关注</span>
            <span class="userFans">{{profile.followeds}} 粉丝</span>
            <span class="userLevel">Lv.{{userLevel}}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.userInfoWrap {
    width: 100%;
    margin-top: 12vh;
    background-color: rgba(228, 228, 228, 0.538);
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    .userHeadshot {
        width: 14rem;
        height: 14rem;
        border-radius: 50%;
        transform: translateY(-50%);
    }

    .userNickname {
        margin-top: -5rem;
        font-size: 3.8rem;
        font-weight: 600;
    }

    .userState {
        padding-bottom: 3rem;
        width: 40%;
        font-size: 2.8rem;
        display: flex;
        justify-content: space-between;
    }
}
</style>
