<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue'
import SongItem from '../songlist/SongItem.vue'


const store = useStore()
const cookie = Storage.prototype.getCanExpireLocal('login_cookie')

const searchResultArr: ComputedRef = computed(() => store.state.search.data.searchResult)

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
    <div class="searchResultListWrap">
        <div class="resultItem" v-for="item in searchResultArr" :key="item.id">
            <SongItem :songName='item.name' :singer="changeSingerName(item.ar)" :albumName='item.al.name'
                @click="storeSongId(item.id)" />
        </div>
    </div>
</template>

<style scoped lang="less">
.searchResultListWrap {
    margin-bottom: 18rem;
}
</style>
