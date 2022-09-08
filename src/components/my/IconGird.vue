<script setup lang="ts">
import { reactive } from 'vue'

//ts
//iconList接口
interface iconListType {
    icon: string,
    word: string,
}

function girdItemClick(){
    alert('暂未开发')
}
//reactive
let iconGirdArr: Array<iconListType> = reactive([
    {
        icon: '#icon-shipinbofang',
        word: '最近播放',
    },
    {
        icon: '#icon-batch-download',
        word: '本地/下载',
    },
    {
        icon: '#icon-upload',
        word: '云盘',
    },
    {
        icon: '#icon-qingdanxinxishebeijichuxinxigongdanxinxi',
        word: '已购',
    },
    {
        icon: '#icon-haoyoutuijie',
        word: '我的好友',
    },
    {
        icon: '#icon-shoucangxuanzhong',
        word: '收藏和赞',
    },
    {
        icon: '#icon-line-wirelesschargingwuxianchongdian',
        word: '我的播客',
    },
])

</script>

<template>
    <div class="iconGird">
        <div class="iconGirdItem" v-for="item in iconGirdArr" :key="item.word" @click="girdItemClick">
            <span class="iconGirdItem-icon">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
            </span>
            <span class="iconGirdItem-word">
                {{ item.word }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="less">
.iconGird {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-around;
    border-radius: 3vw;
    background-color: rgba(228, 228, 228, 0.538);
    margin-top: 5vw;
    .iconGirdItem {
        height: 23.25vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .iconGirdItem-icon {
            font-size: 5rem;
            color: #fd4b60;
        }

        .iconGirdItem-word {
            font-size: 2.2rem;
        }
    }
}
</style>
