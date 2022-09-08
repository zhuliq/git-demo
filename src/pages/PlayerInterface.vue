<script setup lang="ts">
import TopNav from '../components/TopNav.vue';
import PlayerWidget from '../components/playerinterface/PlayerWidget.vue'
import { useRouter } from 'vue-router';
import { computed, ComputedRef, onMounted, ref, Ref, watch } from 'vue';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
// 通过ref得到carousel
let songPicCarousel: Ref = ref(null)
let lyricWrap: Ref = ref(null)
let isShowLyric: Ref = ref(false)
// 歌词索引
let isPlayingLyricIndex: Ref = ref(0)

const singingData: ComputedRef = computed(() => store.state.playSong.data.singingData)
const songData: ComputedRef = computed(() => store.state.playSong.data.songData)
const isPlaying: ComputedRef = computed(() => store.state.playSong.data.isPlaying)
const lyric: ComputedRef = computed(() => store.state.playSong.data.lyric)
const playingTimeStamp: ComputedRef = computed(() => store.state.playSong.data.playingTimeStamp)


//走马灯切换到当前歌曲
onMounted(() => {
    songPicCarousel.value.goTo(store.state.playSong.data.carouselIndex)
})

//method
// TopNav点击返回
function leftClick(): void {
    router.go(-1)
}

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

// 传入PlayerWidget组件
function previousSong() {
    let previousIndex: number
    switch (store.state.playSong.data.nextSongWay) {
        // 顺序播放
        case 0:
            previousIndex = store.state.playSong.data.carouselIndex - 1
            break;
        // 单曲循环
        case 1:
            previousIndex = store.state.playSong.data.carouselIndex
            break;
        // 随机播放
        case 2:
            const randomNum = () => Math.floor(Math.random() * store.state.playSong.data.songData.length)
            previousIndex = randomNum()
            while (previousIndex == store.state.playSong.data.carouselIndex) {
                previousIndex = randomNum()
            }
            break;
    }
    if (previousIndex >= 0) {
        // 获取滑动后的歌曲信息
        const currentSongData = store.state.playSong.data.songData[previousIndex]
        //存储歌曲id
        store.commit('playSong/setPlayingSongId', currentSongData.id)
        // 存储当前歌曲详情
        store.commit('playSong/setSingingData')
        // 走马灯切换
        store.state.playSong.data.nextSongWay == 2 ? songPicCarousel.value.goTo(store.state.playSong.data.carouselIndex, true) :
            songPicCarousel.value.goTo(store.state.playSong.data.carouselIndex)
        // 改变播放状态
        store.commit('playSong/setPlaying', true)
    }
}
function nextSong() {
    let nextIndex: number
    switch (store.state.playSong.data.nextSongWay) {
        // 顺序播放
        case 0:
            nextIndex = store.state.playSong.data.carouselIndex + 1
            break;
        // 单曲循环
        case 1:
            nextIndex = store.state.playSong.data.carouselIndex
            break;
        // 随机播放
        case 2:
            const randomNum = () => Math.floor(Math.random() * store.state.playSong.data.songData.length)
            nextIndex = randomNum()
            while (nextIndex == store.state.playSong.data.carouselIndex) {
                nextIndex = randomNum()
            }
            break;
    }
    if (nextIndex <= store.state.playSong.data.songData.length - 1) {
        // 获取滑动后的歌曲信息
        const currentSongData = store.state.playSong.data.songData[nextIndex]
        //存储歌曲id
        store.commit('playSong/setPlayingSongId', currentSongData.id)
        // 存储当前歌曲详情
        store.commit('playSong/setSingingData')
        // 走马灯切换
        store.state.playSong.data.nextSongWay == 2 ? songPicCarousel.value.goTo(store.state.playSong.data.carouselIndex, true) :
            songPicCarousel.value.goTo(store.state.playSong.data.carouselIndex)
    }
    // 改变播放状态
    store.commit('playSong/setPlaying', true)
}
// 图片与歌词之间切换
function changeShowLyric() {
    isShowLyric.value = !isShowLyric.value
}

// 监听播放进度，调整歌词
watch(() => playingTimeStamp.value, () => {
    for (let i = 0; i < lyric.value.length; i++) {
        if ((playingTimeStamp.value >= lyric.value[i].time) && (playingTimeStamp.value < lyric.value[i + 1].time)) {
            isPlayingLyricIndex.value = i
            break
        }else if(lyric.value[i + 1] == null){
            console.log(i)
            isPlayingLyricIndex.value = i
        }
    }
})
watch(()=>isPlayingLyricIndex.value, ()=>{
    lyricWrap.value.scrollTo({top: isPlayingLyricIndex.value*36, behavior: 'smooth'}) 
})
</script>

<template>
    <!-- 顶部导航栏 -->
    <TopNav iconListLeft="#icon-xiala" iconListRight='#icon-fenxiang' middleStyle='playerinterface'
        :songName='singingData.songName' :singer='singingData.singer' :leftClick="leftClick" />
    <!-- 滤镜 -->
    <div class="playerInterfaceBgFilter" :style="{
        'background-image': `url(${singingData.picUrl})`
    }"></div>

    <!-- 中间音乐图片 -->
    <div class="songPicWrap" v-show="!isShowLyric" @click="changeShowLyric">
        <!-- 走马灯，滑动切歌 
            加上:infinite="false"是为了可以动态加上class-->
        <a-carousel :dots="false" ref="songPicCarousel" :infinite="false" :afterChange="afterChange">
            <div class="playInfo" v-for="item in songData" :key="item.id">
                <!-- isPlayingyi 以及id为正在播放的id时，开始旋转动画-->
                <img class="songPic" :src="item.picUrl"
                    :class="isPlaying && (singingData.id == item.id) ? 'runRotate' : 'pauseRotate'" />
            </div>
        </a-carousel>
    </div>

    <!-- 歌词 -->
    <div class="lyricWrap" ref="lyricWrap" v-show="isShowLyric" @click="changeShowLyric">
        <p :class="{lyric:true, choose: (index==isPlayingLyricIndex)}" v-for="(item, index) in lyric" :key="index">
            {{ item.lyric }}
        </p>
    </div>

    <!-- 底部播放控件 -->
    <PlayerWidget :previousSong='previousSong' :nextSong='nextSong' />
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

// 背景图片
.playerInterfaceBgFilter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(150px);
    // 完整显示
    background-size: cover;

}

.songPicWrap {
    height: 75vh;

    .playInfo {
        margin-top: 25vh;


        .songPic {
            display: block;
            width: 30vh;
            height: 30vh;
            border-radius: 50%;
            box-sizing: content-box;
            border: 5vh solid black;
            margin: 0 auto;
            animation: rotate 5s linear infinite;
        }

        .runRotate {
            animation-play-state: running;
        }

        .pauseRotate {
            animation-play-state: paused;
        }
    }
}

.lyricWrap {
    width: 100%;
    height: 70vh;
    margin-top: 7vh;
    padding-top: 30vh;
    padding-bottom: 40vh;
    // background-color: red;
    text-align: center;
    overflow-y: scroll;

    //隐藏滚动条
    &::-webkit-scrollbar {
        width: 0 !important
    }
    .lyric{
        width: 100%;
        height: 22px;
    }
    .choose{
        color: rgb(253, 253, 253);
        font-size: 18px;
    }
}
</style>
