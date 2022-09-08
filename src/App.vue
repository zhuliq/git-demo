<script setup lang="ts">
import { useStore } from 'vuex';
import { watch, computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import BottomNav from './components/BottomNav.vue'
import PlayControl from './components/PlayControl.vue';

//展示PlayControl组件的路径
const notShowArr = ['/discover', '/podcast', '/attention', '/my', '/songlist', '/search']
const store = useStore()
const router = useRouter()
const audio = store.state.playSong.data.audio
const cookie = localStorage.getItem('login_cookie')

// const audioEnded:ComputedRef = computed(()=>audio.ended)
const playingTimeStamp: ComputedRef = computed(() => store.state.playSong.data.playingTimeStamp)
const playingSongId: ComputedRef = computed(() => store.state.playSong.data.playingSongId)
const isPlaying: ComputedRef = computed(() => store.state.playSong.data.isPlaying)

// 歌曲id改变时，调用
watch(() => playingSongId.value, async () => {
        if (isPlaying) {
                //store.dispatch返回的是promise对象
                await store.dispatch('playSong/getSongUrl', { id: store.state.playSong.data.playingSongId, cookie })
                // 获取歌词
                store.dispatch('playSong/getLyric', playingSongId.value)
                //遇到没有版权会报错
                audio.src = store.state.playSong.data.songUrl
                audio.play()
        } else {
                audio.pause()
        }
})
// 控制歌曲播放暂停
watch(() => isPlaying.value, (newVal) => {
        if (newVal) {
                audio.play()
        } else {
                audio.pause()
        }
})

// 对播放中进行监听
audio.ontimeupdate = () => {
        // 更改state中的playingTimeStamp,从而使进度条移动
        store.commit('playSong/setPlayingTimeStamp', audio.currentTime)
        if (audio.ended && store.state.playSong.data.isPlaying == true) {
                store.commit('playSong/setPlaying', false)
        }
}
//method
//指定路由不展示当前组件
function isShow(): boolean {
        return notShowArr.includes(router.currentRoute.value.path)
}
</script>

<template>
        <!-- 缓存路由组件 -->
        <router-view v-slot="{ Component }">
                <keep-alive :include="['Discover']">
                        <component :is="Component" />
                </keep-alive>
        </router-view>
        <!-- <router-view></router-view> -->
        <div class="bottom">
                <PlayControl v-show="isShow()" />
                <BottomNav />
        </div>

</template>
        
<style lang="less">
// 固定到底部
.bottom {
        position: fixed;
        bottom: 0;
}
</style>

