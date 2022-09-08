<script setup lang="ts">
import SongItem from './SongItem.vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, ComputedRef } from 'vue';

const route = useRoute()
const store = useStore()
const cookie = Storage.prototype.getCanExpireLocal('login_cookie')

//通过路由传过来的id获取歌单信息
store.dispatch('song/getSongData', { id: route.query.id, cookie })
const songArr: ComputedRef = computed(() => {
    return store.state.song.data.songs
})

//method
function storeSongId(id: number) {
    //存储歌曲id
    store.commit('playSong/setPlayingSongId', id)
    //播放音乐
    store.commit('playSong/setPlaying', true)
    //歌曲详情
    store.dispatch('playSong/getSongData', { id: store.state.playSong.data.playingSongId, cookie })
}

// 歌手名用/分隔
function changeSingerName(singerArr: Array<string>): string {
    let result: Array<string> = []
    singerArr.forEach(item => {
        result.push(item.name)
    });
    return result.join('/')
}

</script>

<template>
    <div class="songMenuWrap">
        <div class="songItem" v-for="item in songArr" :key="item.id">
            <SongItem :songName='item.name' :singer="changeSingerName(item.ar)" :albumName='item.al.name'
                @click="storeSongId(item.id)" />
        </div>
    </div>
</template>

<style scoped lang="less">
.songMenuWrap {
    width: 100%;
    margin-top: 6rem;
    margin-bottom: 9rem;
}
</style>
