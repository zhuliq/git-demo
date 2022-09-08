<script setup lang="ts">
//引入获取banner数据的promise对象
import { getBanner } from "../../api/index";
import { onMounted, ref, Ref } from 'vue';


//ts
//banner接口
interface bannerType {
    targetId: string
    pic: string
}

//ref
let bannerImgArr: Ref<bannerType[]> = ref([])

//生命周期钩子
onMounted(async () => {
    let res = await getBanner(1)
    //将值赋给变量
    bannerImgArr.value = res.data.banners
})

</script>

<template>
    <a-carousel autoplay :autoplaySpeed="5000">
        <div class="imgWrap" v-for="item in bannerImgArr" :key="item.targetId">
            <img :src="item.pic" style="width: 100%; height: 100%;">
        </div>
    </a-carousel>
</template>

<style scoped lang="less">
.ant-carousel :deep(.slick-dots-bottom) {
    bottom: 0;
}

.ant-carousel :deep(.slick-slide) {
    border-radius: 3vw;
    text-align: center;
    background: #364d79;
    overflow: hidden;
}

.ant-carousel :deep(.slick-slide .imgWrap) {
    height: 26.6rem;
}
.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}
</style>
