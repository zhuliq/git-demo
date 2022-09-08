<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue';

const store = useStore()

const collectNum:ComputedRef<number> =  computed(():number=> store.state.songList.data.playListData.subscribedCount) 
const reviewNum:ComputedRef<number> =  computed(():number=> store.state.songList.data.playListData.commentCount) 
const shareNum:ComputedRef<number> =  computed(():number=> store.state.songList.data.playListData.shareCount) 
</script>

<template>
    <div class="commentWrap">
        <div class="collect">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shangpinshoucangcollect"></use>
            </svg>
            <span class="collectNum">{{collectNum}}</span>
        </div>
        <div class="line"></div>
        <div class="review">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
            </svg>
            <span class="reviewNum">{{reviewNum}}</span>
        </div>
        <div class="line"></div>
        <div class="share">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span class="shareNum">{{shareNum}}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.commentWrap {
    width: 60rem;
    height: 8rem;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 6%/50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    //定位
    position: absolute;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    
    .icon {
        font-size: 3.5rem;
    }
    .collectNum, .reviewNum, .shareNum{
        margin-left: 1rem;
        font-size: 3rem;
    }
    .line {
        width: 1px;
        height: 4rem;
        background-color: black;
    }
}
</style>
