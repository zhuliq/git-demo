<script setup lang="ts">
import {reactive} from 'vue'

//ts
//iconList接口
interface iconListType{
    icon:string,
    word:string,
}

//reactive
let iconListArr: Array<iconListType> = reactive([
    {
        icon: '#icon-beijingyinle',
        word: '每日推荐',
    },
    {
        icon: '#icon-iconset0278',
        word: '私人FM',
    },
    {
        icon: '#icon-gedan',
        word: '歌单',
    },
    {
        icon: '#icon-paihangbang',
        word: '排行榜',
    },
])

</script>

<template>
    <div class="iconListWrap">
        <div class="iconListItem" v-for="item in iconListArr" :key="item.word">
            <span class="iconListItem-icon">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
            </span>
            <span class="iconListItem-word">
                {{ item.word }}
            </span>
        </div>
    </div>

</template>

<style scoped lang="less">
.iconListWrap{
    display: flex;
    justify-content: space-between;
    margin-top: 2vh;
    min-width: 185px;
    .iconListItem{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .iconListItem-icon{
            width: 8.25rem;
            height: 8.25rem;
            border-radius: 50%;
            background-color: rgba(253, 191, 191, 0.466);
            font-size: 4.5rem;
            color: #dd001b;
            text-align: center;
            line-height: 8.25rem;
        }
        .iconListItem-word{
            font-size: 1.4rem;
        }
    }
}
</style>
