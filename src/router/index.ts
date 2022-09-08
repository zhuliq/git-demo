// import { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from "vue-router";
import store from '../store/index'


//创建路由表
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/discover',
        component: () => import('../pages/Discover.vue'),
        children: [],
    },
    {
        path: '/discover',
        name: "Discover",
        component: () => import('../pages/Discover.vue'),
        meta: {
            title: '发现',
            scrollLeft: true,
            isLogin: false,
        }
    },
    {
        path: '/podcast',
        component: () => import('../pages/Podcast.vue'),
        meta: {
            title: '播客',
            isLogin: false,
        }
    },
    {
        path: '/attention',
        component: () => import('../pages/Attention.vue'),
        meta: {
            title: '关注',
            isLogin: false,
        }
    },
    {
        path: '/my',
        component: () => import('../pages/My.vue'),
        meta: {
            title: '我的',
            isLogin: true,
        }
    },
    {
        path: '/songlist',
        component: () => import('../pages/SongList.vue'),
        meta: {
            title: '歌单',
            songlistScrollTop: true,
            isLogin: false,
        }
    },
    {
        path: '/playerinterface',
        component: () => import('../pages/PlayerInterface.vue'),
        meta: {
            title: '歌曲播放',
            isLogin: false,
        }
    },
    {
        path: '/login',
        component: () => import('../pages/Login.vue'),
        meta: {
            title: '登录',
            isLogin: false,
        }
    },
    {
        path: '/search',
        component: () => import('../pages/Search.vue'),
        meta: {
            title: '搜索',
            searchScrollTop: true,
            isLogin: false,
        }
    },

]
//创建路由
const router = createRouter({
    history:createWebHashHistory(),
    routes: routes,
})

router.afterEach((to, from) => {
    //修改网页的title
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '听你想听'
    }
    // 记录左右滚动位置
    if (from.meta.scrollLeft) {
        const content = document.querySelector('.recommendPlaylist'); // 列表的外层容器
        const scrollLeft = content ? content.scrollLeft : 0;
        // // 修改recommendPlayList中的state
        store.state.recommendPlayList.data.scrollLeft = scrollLeft
    }
    // 记录上下滚动位置
    if (from.meta.songlistScrollTop) {
        const content = document.querySelector('.songListDistance'); // 列表的外层容器
        const scrollTop = content ? content.scrollTop : 0;
        // // 修改recommendPlayList中的state
        store.state.songList.data.scrollTop = scrollTop
    }
    // 记录上下滚动位置
    if (from.meta.searchScrollTop) {
        const content = document.querySelector('.searchDistance'); // 列表的外层容器
        const scrollTop = content ? content.scrollTop : 0;
        // // 修改recommendPlayList中的state
        store.state.search.data.scrollTop = scrollTop
    }

})
//全局前置路由守卫————初始化的时候、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    // 是否需要登录，没登陆跳转到登录页面
    if (to.meta.isLogin) {
        if (localStorage.getItem('login_cookie')) {
            const loginProfile = Storage.prototype.getCanExpireLocal('login_profile')
            // 修改login中的state
            store.state.login.data.profile = loginProfile
            store.state.login.data.isLogin = true
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
});
export default router