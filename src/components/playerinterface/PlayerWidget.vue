<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ComputedRef, defineProps, ref } from 'vue';
import moment from 'moment'
import { likeSong } from '../../api/index'

interface widgetType {
    // 上一首
    previousSong(): void,
    // 下一首
    nextSong(): void,
}

const store = useStore()
const props = defineProps<widgetType>()
const singingData: ComputedRef = computed(() => store.state.playSong.data.singingData)
const isPlaying: ComputedRef = computed(() => store.state.playSong.data.isPlaying)
const nextSongWay: ComputedRef = computed(() => store.state.playSong.data.nextSongWay)
const audio = store.state.playSong.data.audio
// v-model和vuex结合
const playingTimeStamp = computed({
    get() {
        return store.state.playSong.data.playingTimeStamp
    },
    set(value) {
        store.commit('playSong/setPlayingTimeStamp', value)
    }
})
// 毫秒化分秒格式
const formatSongTime: ComputedRef = computed(() => moment.utc(store.state.playSong.data.singingData.songTime * 1000).format('mm:ss'))
const formatSilderValue: ComputedRef = computed(() => moment.utc(store.state.playSong.data.playingTimeStamp * 1000).format('mm:ss'))
const cookie = Storage.prototype.getCanExpireLocal('login_cookie')
const profile = Storage.prototype.getCanExpireLocal('login_profile')


// 改变isPlaying状态
function handlePlay(): void {
    store.commit('playSong/setPlaying', true)
}
function handlePause(): void {
    store.commit('playSong/setPlaying', false)
}
// 改变changeNextSongWay
function changeNextSongWay() {
    let num = store.state.playSong.data.nextSongWay
    num++
    if (num > 2) {
        num = 0
    }
    store.commit('playSong/setNextSongWay', num)
}

// slider
// 滑动条change回调
function sliderChange(value: number) {
    // 清除监听
    audio.ontimeupdate = ''
    // 静音
    audio.muted = true
}
// 滑动条change结束后回调
function sliderAfterChange() {
    // 跳转到指定位置
    audio.currentTime = playingTimeStamp.value
    // 重新增加监听
    audio.ontimeupdate = () => {
        store.commit('playSong/setPlayingTimeStamp', audio.currentTime)
        if (audio.ended && store.state.playSong.data.isPlaying == true) {
            store.commit('playSong/setPlaying', false)
        }
    }
    // 取消静音
    audio.muted = false
}

async function likeSongClick() {
    // 获取喜欢列表
    await store.dispatch('login/getUserLikeSongList', { uid: profile.userId, cookie })
    const playingSongId = store.state.playSong.data.playingSongId
    const userLikeSongList = store.state.login.data.userLikeSongList
    if (userLikeSongList.includes(playingSongId)) {
        // 取消like请求
        likeSong(playingSongId, cookie, false)
        console.log('取消')
        store.dispatch('login/getUserLikeSongList', { uid: profile.userId, cookie })
    } else {
        // like请求
        likeSong(playingSongId, cookie, true)
        console.log('添加')
        store.dispatch('login/getUserLikeSongList', { uid: profile.userId, cookie })
    }

}
</script>

<template>
    <div class="playWidgetWrap">
        <div class="playWidgetTop">
            <svg class="icon" aria-hidden="true" @click="likeSongClick">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-lingsheng"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-diandian"></use>
            </svg>
        </div>
        <!-- 滑动条 -->
        <div class="playWidgetSlider">
            <span class="playWidgetSliderOrigin">{{ formatSilderValue }}</span>
            <div class="slider">
                <a-slider :tip-formatter="null" v-model:value="playingTimeStamp" :min="0" :max="singingData.songTime"
                    @change='sliderChange' @afterChange="sliderAfterChange" :step='0.5' />
            </div>
            <span class="playWidgetSliderTerminus">{{ formatSongTime }}</span>
        </div>
        <div class="playWidgetBottom">
            <!-- 顺序播放 -->
            <svg class="icon" aria-hidden="true" v-show="nextSongWay == 0" @click="changeNextSongWay">
                <use xlink:href="#icon-liebiaoxunhuan"></use>
            </svg>
            <!-- 单曲循环 -->
            <svg class="icon" aria-hidden="true" v-show="nextSongWay == 1" @click="changeNextSongWay">
                <use xlink:href="#icon-danquxunhuan"></use>
            </svg>
            <!-- 随机播放 -->
            <svg class="icon" aria-hidden="true" v-show="nextSongWay == 2" @click="changeNextSongWay">
                <use xlink:href="#icon-suiji"></use>
            </svg>
            <!-- 上一首 -->
            <svg class="icon" aria-hidden="true" @click="previousSong">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <!-- 动态展示播放暂停 -->
            <svg class="icon" aria-hidden="true" v-show="!isPlaying" @click="handlePlay">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="isPlaying" @click="handlePause">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <!-- 下一首 -->
            <svg class="icon" aria-hidden="true" @click="nextSong">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
        </div>

    </div>
</template>

<style scoped lang="less">
.playWidgetWrap {
    width: 100%;
    padding: 0 3.5vw;
    position: fixed;
    bottom: 0;
    background-color: transparent;

    .playWidgetTop {
        width: 65vw;
        color: rgb(255, 255, 255);
        margin: 0 auto;
        font-size: 4.3rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .playWidgetSlider {
        display: flex;
        align-items: center;
        font-size: 2rem;

        .slider {
            width: 75vw;
            margin: 0 8px;
        }
    }

    .playWidgetBottom {
        width: 70vw;
        color: rgb(255, 255, 255);
        margin: 20px auto;
        font-size: 5rem;
        display: flex;
        justify-content: space-between;
    }

}
</style>
