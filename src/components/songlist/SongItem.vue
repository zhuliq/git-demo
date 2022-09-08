<script setup lang="ts">

//ts
//props接口
interface propsType {
    songName: string,
    singer: string,
    albumName: string,
}

//prop
//接受父组件中传入的值
const props = defineProps<propsType>()

</script>

<template>
    <div class="songItemWrap">
        <div class="song">
            <div class="songName">
                {{ props.songName }}
            </div>
            <div class="singer">
                {{ `${props.singer}-${props.albumName}` }}
            </div>
        </div>
        <div class="playIcon">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg>
        </div>
        <div class="threeDot">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-diandian"></use>
            </svg>
        </div>
    </div>
</template>

<style scoped lang="less">
.songItemWrap {
    width: 100%;
    height: 11rem;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .song {
        width: 55rem;
        display: flex;
        flex-direction: column;
        font-size: 3.2rem;

        .songName {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .singer {
            font-size: 2.4rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .playIcon {
        font-size: 3.5rem;
    }

    .threeDot {
        font-size: 3.5rem;
    }
}
</style>
