<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { computed, ComputedRef } from 'vue'

const store = useStore()
const router = useRouter()

const userSongList: ComputedRef = computed(() => store.state.login.data.userSongList)

//歌单id为参数，跳转到SongList组件
function goSongList(id: number): void {
    //重置store中songList的状态
    store.commit('songList/resetState')
    //重置store中song的状态
    store.commit('song/resetState')
    //携带query参数跳转
    router.push({
        path: '/songlist',
        query: {
            id
        }
    })
}
</script>

<template>
    <div class="ILikeWrap">
        <div class="ILike" v-for="item in userSongList" :key="item.id" @click="goSongList(item.id)">
            <img class="ILikeImg" :src="item.coverImgUrl">
            <span class="ILikeWord">
                <span class="ILikeWordTop">{{ item.name }}</span>
                <span class="ILikeWordBottom">共{{ item.trackCount }}首歌曲</span>
            </span>
        </div>
    </div>
</template>

<style scoped lang="less">
.ILikeWrap{
    margin-bottom: 20rem;
    .ILike {
        height: 12rem;
        border-radius: 3vw;
        background-color: rgba(228, 228, 228, 0.538);
        margin-top: 5vw;
        display: flex;
        align-items: center;
    
        .ILikeImg {
            width: 9rem;
            border-radius: 3vw;
            margin-left: 5vw;
        }
    
        .ILikeWord {
            display: flex;
            flex-direction: column;
            margin-left: 5vw;
    
            .ILikeWordTop {
                width: 65vw;
                font-size: 3.4rem;
                font-weight: 550;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
    
            .ILikeWordBottom {
                font-size: 2.4rem;
            }
        }
    }
}
</style>
