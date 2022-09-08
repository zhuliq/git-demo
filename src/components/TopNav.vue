<script setup lang="ts">
import { PropType, computed, ComputedRef, ref, Ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
// 接受父组件的props
const props = defineProps({
    iconListLeft: String,
    iconListRight: String,
    middleStyle: String,
    navMiddleSongListBrand: String,
    navMiddleSongListSearch: String,
    // 限定一个返回值为空的函数
    leftClick: Function as PropType<() => void>,
    rightClick: Function as PropType<() => void>,
    middleClick: Function as PropType<() => void>,
    middleKeyup: Function as PropType<() => void>,
    middleClickLeft: Function as PropType<() => void>,
    middleClickRight: Function as PropType<() => void>,
    songName: String,
    singer: String,
})
const singingData: ComputedRef = computed(() => store.state.playSong.data.singingData)
const songNameIsScroll: ComputedRef = computed(() => store.state.playSong.data.songNameIsScroll)

// 检测正在播放的音乐有无变化
watch(() => singingData.value, () => {
    // songName大于一定长度，滚动
    if (singingData.value.songName.length > 18) {
        store.commit('playSong/setSongNameIsScroll', true)
    }else{
        store.commit('playSong/setSongNameIsScroll', false)
    }
})
</script>

<template>
    <div class="topNav">
        <!-- 最左侧icon -->
        <span class="iconListLeft" @click="leftClick">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="iconListLeft"></use>
            </svg>
        </span>
        <!-- dicover -->
        <span class="navMiddleDiscover" v-show="middleStyle == 'discover'" @click="middleClick">
            <input type="text" class="navMiddleInput" placeholder='搜你喜欢的音乐' disabled>
        </span>
        <!-- search -->
        <span class="navMiddleDiscover" v-show="middleStyle == 'search'">
            <input type="text" class="navMiddleInput" placeholder='搜你喜欢的音乐' @keyup.enter="middleKeyup">
        </span>
        <!-- podcast -->
        <span class="navMiddlePodcast" v-show="middleStyle == 'podcast'">
            <span @click="middleClickLeft">推荐</span>
            <span @click="middleClickRight">故事</span>
        </span>
        <!-- attention -->
        <span class="navMiddleAttention" v-show="middleStyle == 'attention'" @click="middleClick">
            <span>动态</span>
        </span>
        <span class="navMiddleAttention" v-show="middleStyle == 'login'" @click="middleClick">
            <span>欢迎登录</span>
        </span>
        <!-- my -->
        <span class="navMiddleMy" v-show="middleStyle == 'my'" @click="middleClick">
            <!-- 展示头像和用户名 -->
        </span>
        <!-- songlist -->
        <span class="navMiddleSongList" v-show="middleStyle == 'songlist'">
            <span class="navMiddleSongListLeft">
                <span>歌单</span>
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="navMiddleSongListBrand"></use>
                </svg>
            </span>
            <span @click="middleClick">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="navMiddleSongListSearch"></use>
                </svg>
            </span>
        </span>
        <!-- playerinterface -->
        <span class="navMiddlePlayerInterface" v-show="middleStyle == 'playerinterface'">
            <span class="navMiddlePlayerInterfaceTop">
                <!-- p中文字length多于一定长度，就增加class -->
                <p  :class="songNameIsScroll ? 'wordScroll' : ''">
                    {{ songName }}
                </p>
            </span>
            <span class="navMiddlePlayerInterfaceBottom">
                {{ singer }}
            </span>
        </span>

        <!-- 最右侧icon -->
        <span class="iconListRight" @click="rightClick">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="iconListRight"></use>
            </svg>
        </span>
    </div>
</template>

<style scoped lang="less">
@keyframes wordScroll {
    from {
        transform: translateX(120%);
    }

    to {
        transform: translateX(-120%);
    }
}

.topNav {
    width: 100%;
    height: 6vh;
    position: fixed;
    top: 0;
    line-height: 5vh;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.7);

    .iconListLeft {
        margin-left: 3.5vw;
        font-size: 4rem;
    }

    .iconListRight {
        margin-right: 3.5vw;
        font-size: 4rem;
    }

    .navMiddleDiscover {
        line-height: 6vh;

        .navMiddleInput {
            width: 80vw;
            min-height: 24px;
            height: 4.5vh;
            border: 0;
            border-radius: 40vw;
            background-color: rgba(202, 202, 202, 0.437);
            text-align: center;

            // 修改input中placeholder的样式
            &::placeholder {
                color: rgb(200, 45, 6);
            }
        }
    }

    .navMiddlePodcast {
        width: 55vw;
        min-height: 24px;
        height: 4.5vh;
        display: flex;
        justify-content: space-around;
        font-size: 3rem;
        font-weight: 550;
        line-height: 6vh;
    }

    .navMiddleAttention {
        font-size: 3rem;
        font-weight: 550;
        line-height: 6vh;
    }



    .navMiddleSongList {
        width: 75vw;
        font-size: 3.5rem;
        font-weight: 500;
        // line-height: 6vh;
        display: flex;
        justify-content: space-between;

        .navMiddleSongListLeft .icon {
            vertical-align: text-top;
            font-size: 2.4rem;
        }
    }

    .navMiddlePlayerInterface {
        display: flex;
        flex-direction: column;
        height: 100%;
        line-height: 3.5vh;
        text-align: center;

        .navMiddlePlayerInterfaceTop {
            height: 3.4vh;
            width: 65vw;
            font-size: 3.3rem;
            font-weight: 550;
            position: relative;
            overflow: hidden;

            .wordScroll {
                white-space: nowrap;
                animation: wordScroll 8s linear infinite normal;
            }
        }

        .navMiddlePlayerInterfaceBottom {
            height: 1.5vh;
            font-size: 1.4rem;
        }
    }
}
</style>

