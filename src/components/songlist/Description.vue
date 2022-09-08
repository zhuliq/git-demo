<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()

//store
//歌单id dispatch actions
store.dispatch('songList/getSongListData', { id: route.query.id, cookie: localStorage.getItem('login_cookie') })

//computed
//计算属性中返回state
const playListData: ComputedRef = computed(() => {
    return store.state.songList.data.playListData
})
const creatorData: ComputedRef = computed(() => {
    return store.state.songList.data.creatorData
})

</script>

<template>
    <!-- 动态增加背景图片 -->
    <div class="description">
        <!-- 滤镜 -->
        <div class="bgFilter" :style="{
            'background-image': `url(${playListData.coverImgUrl})`
        }">
        </div>
        <div class="descriptionImg">
            <img :src="playListData.coverImgUrl">
        </div>
        <div class="descriptionText">
            <span class="descriptionTextTitle">
                {{ playListData.name }}
            </span>
            <span class="descriptionTextCreator">
                <span class="creatorAvator">
                    <img :src="creatorData.avatarUrl">
                </span>
                <span class="creatorNickname">
                    {{ creatorData.nickname }}
                </span>
            </span>
            <span class="descriptionTextCreatorDes">
                {{ playListData.description }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="less">
.description {
    width: 100%;
    height: 30rem;
    display: flex;
    justify-content: space-between;
    .bgFilter {
        width: 100%;
        height: 40rem;
        position: absolute;
        top: 0;
        left: 0; 
        right: 0;
        z-index: -1;
        filter: blur(10px);
        // 完整显示
        background-size: cover;
    }

    .descriptionImg {
        img {
            width: 20rem;
            height: 20rem;
            border-radius: 2rem;
        }
    }

    .descriptionText {
        width: 62vw;
        height: 20rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .descriptionTextTitle {
            font-size: 3.5rem;
            line-height: 4.5rem;
            //多行文本溢出省略号
            overflow: hidden;
            //限制显示文本的行数
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            //将对象作为弹性伸缩盒子模型显示
            display: -webkit-box;
            //设置或检索伸缩盒对象的子元素的排列方式
            -webkit-box-orient: vertical;
        }

        .descriptionTextCreator {
            .creatorAvator {
                img {
                    border-radius: 50%;
                    width: 5rem;
                    height: 5rem;
                }
            }

            .creatorNickname {
                font-size: 2.4rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: 5px;
            }
        }

        .descriptionTextCreatorDes {
            font-size: 2.4rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
