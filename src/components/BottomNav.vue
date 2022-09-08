<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

//ts
//底部导航栏别名
type nav = {
    name: string,
    path: string,
    icon: string
}
//路由跳转接口
interface propObj {
    key: string
    keyPath: Array<string>
}

//reactive
const navItems: Array<nav> = reactive([
    {
        name: '发现',
        path: '/discover',
        icon: "#icon-yinle1",
    },
    {
        name: '播客',
        path: '/podcast',
        icon: "#icon-line-wirelesschargingwuxianchongdian",
    },
    {
        name: '关注',
        path: '/attention',
        icon: "#icon-guanzhu",
    },
    {
        name: '我的',
        path: '/my',
        icon: "#icon-yinle2",
    },
])

//methods
//实现点击路由跳转
const handleClick = (itemMsg: propObj): void => {
    //编程式路由导航
    router.push({ path: itemMsg.keyPath[0] })
}

//computed
//判断当前路由是否为主界面那四个
const isMainPage = computed(()=>{
    const path = router.currentRoute.value.path
    return path == '/discover'|| path == '/podcast'|| path == '/my'|| path == '/attention'
})
</script> 

<template>
    <!-- selectedKeys绑定给当前路由路径，实现刷新高亮效果不会跳转 v-show判断路由展示-->
    <a-menu :selectedKeys="[router.currentRoute.value.path]" mode="horizontal"
        style="width: 100vw; justify-content: space-around;" @click="handleClick" 
        v-show="isMainPage">
        <a-menu-item v-for="item in navItems" :key="item.path"
            style="padding: 0; display: flex;flex-direction: column;align-items: center;">
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
            </template>
            {{ item.name }}
        </a-menu-item>
    </a-menu>
</template>

<style scoped lang="less">
.ant-menu {
    min-height: 35px;
    font-size: 1.5rem;
    line-height: 20px;
    padding-top: 8px;

    :global(.ant-menu-item .ant-menu-item-icon + span) {
        margin: 0;
    }
    .ant-menu-item .ant-menu-item-icon {
        font-size: 3.5rem;
    }

    :global(.ant-menu-item-selected) {
        color: rgb(221, 0, 27) !important;
    }

    :global(.ant-menu-item-active) {
        color: rgb(221, 0, 27) !important;
    }
}

//去除两个伪元素，影响flex布局
.ant-menu::after,
.ant-menu::before {
    content: none;
}
//去除item下方小横杆效果
:deep(.ant-menu-item::after){
    content: none;
}
</style>
