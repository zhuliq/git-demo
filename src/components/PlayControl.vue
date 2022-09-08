<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ComputedRef, watch, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const songData: ComputedRef = computed(() => store.state.playSong.data.songData)
const isPlaying: ComputedRef = computed(() => store.state.playSong.data.isPlaying)
const singingData: ComputedRef = computed(() => store.state.playSong.data.singingData)

// 通过ref得到carousel
let playerControlCarousel: Ref = ref(null)

// 监测carouselIndex
watch(() => store.state.playSong.data.carouselIndex, () => {
    // carousel切到指定位置
    playerControlCarousel.value?.goTo(store.state.playSong.data.carouselIndex, true)
}, { deep: true })

//method
//走马灯切换回调
function afterChange(currentIndex: number): void {
    // 获取滑动后的歌曲信息
    const currentSongData = store.state.playSong.data.songData[currentIndex]
    //存储歌曲id
    store.commit('playSong/setPlayingSongId', currentSongData.id)
    // 存储当前歌曲详情
    store.commit('playSong/setSingingData')
    // isPlaying状态改为true
    store.commit('playSong/setPlaying', true)

}

//跳转到路由playerinterface
function goPlayerInterface(): void {
    //携带query参数跳转
    router.push({
        path: '/playerinterface',
    })

}

// 改变isPlaying状态
function handlePlay(): void {
    store.commit('playSong/setPlaying', true)
}
function handlePause(): void {
    store.commit('playSong/setPlaying', false)
}

function listClick() {
    alert('暂未开发')
}
</script>

<template>
    <!-- v-show判断路由展示-->
    <div class="playControlWrap">
        <div class="songInf">
            <!-- 走马灯，滑动切歌 -->
            <a-carousel :dots="false" ref="playerControlCarousel" :afterChange="afterChange" :infinite="false">
                <div class="playInfo" v-for="item in songData" :key="item.id" @click="goPlayerInterface()">
                    <!-- isPlayingyi 以及id为正在播放的id时，开始旋转动画-->
                    <img class=" songPic" :src="item.picUrl"
                        :class="isPlaying && (singingData.id == item.id) ? 'runRotate' : 'pauseRotate'" />
                    <span class="songNameAndSinger">
                        <span class="songName">{{ item.songName }}</span>
                        <span class="singer"> - {{ item.singer }}</span>
                    </span>
                </div>
            </a-carousel>
        </div>
        <div class="playIcon">
            <svg class="icon" aria-hidden="true" v-show="!isPlaying" @click="handlePlay">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="isPlaying" @click="handlePause">
                <use xlink:href="#icon-zanting"></use>
            </svg>
        </div>
        <div class="listIcon" @click="listClick">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
        </div>
    </div>
</template>

<style scoped lang="less">
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.playControlWrap {
    width: 100vw;
    height: 9rem;
    background-color: rgb(187, 178, 172);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 3.5vw;

    .songInf {
        width: 75vw;

        .playInfo {
            padding-left: 3.5vw;
            border-top: 3rem solid transparent;


            .songPic {
                display: inline-block;
                width: 7rem;
                height: 7rem;
                border-radius: 50%;
                box-sizing: content-box;
                border: 1.3rem solid black;
                margin-bottom: 7rem;
                animation: rotate 5s linear infinite;
            }

            .runRotate {
                animation-play-state: running;
            }

            .pauseRotate {
                animation-play-state: paused;
            }


            .songNameAndSinger {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 3rem;
                padding-left: 3.2vw;
                width: 55vw;

                .singer {
                    font-size: 2.3rem;
                }
            }
        }
    }

    .playIcon {
        width: 5.3rem;
        height: 5.3rem;
        border: 1px solid rgba(222, 222, 222, 0.595);
        border-radius: 50%;
        font-size: 1.9rem;
        color: rgb(245, 245, 245);
        text-align: center;
        line-height: 4.5rem;
    }

    .listIcon {
        font-size: 5rem;
        color: rgb(245, 245, 245);
    }
}
</style>
