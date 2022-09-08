<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
//引入获取banner数据的promise对象
import { getRecommendPlaylist } from '../../api/index'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

//ts
//recommendplaylist接口
interface palylistType {
    id: number,
    name: string,
    picUrl: string,
    playCount: number
}

//ref
const playlistArr: Ref<palylistType[]> = ref([])

//生命周期钩子
onMounted(async () => {
    let res = await getRecommendPlaylist()
    //将值赋给变量
    playlistArr.value = res.data.result
})

//method
//将数字转换为万/亿为单位
function getNum(Num: number): string {
    let numString = Num.toString()
    let newNumString = ''
    if (numString.length > 4) {
        if (numString.length > 8) {
            newNumString = Math.trunc(Num / 100000000) + '亿'
        } else {
            newNumString = Math.trunc(Num / 10000) + '万'
        }
    }
    return newNumString
}
//歌单id为参数，跳转到SongList组件
function goSongList(id: number): void {
    //重置store中songList的状态
    store.commit('songList/resetState')
    //重置store中song的状态
    store.commit('song/resetState')
    //携带query参数跳转
    router.push({
        path: '/songlist',
        query: {
            id
        }
    })

}
</script>

<template>
    <div class="recommendWrap">
        <div class="recommendTitle">
            <span class="recommendTitleLeft">推荐歌单</span>
            <span class="recommendTitleRight">
                <span class="recommendTitleMore">
                    更多
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-changyongicon-"></use>
                </svg>
            </span>
        </div>
        <!-- 歌单横向列表 -->
        <div class="recommendPlaylist">
            <div class="recommendPlaylistItem" v-for="item in playlistArr" :key="item.id" @click="goSongList(item.id)">
                <span class="recommendPlaylistItemImg">
                    <span class="recommendPlaylistItemCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang"></use>
                        </svg>
                        {{ getNum(item.playCount) }}
                    </span>
                    <img :src="item.picUrl">
                </span>
                <span class="recommendPlaylistItemName">
                    {{ item.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.recommendWrap {
    .recommendTitle {
        display: flex;
        justify-content: space-between;
        font-weight: 550;
        //间隔线
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid black;

        .recommendTitleLeft {
            font-size: 3rem;
        }

        .recommendTitleRight {
            border: 1px solid black;
            border-radius: 20%/50%;
            font-size: 2.5rem;
            padding-left: 1.5rem;
            padding-right: 1rem;

            .recommendTitleMore,
            .icon {
                vertical-align: middle;
            }
        }
    }

    .recommendPlaylist {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        margin-top: 1.5rem;

        // 隐藏滚动条
        &::-webkit-scrollbar {
            width: 0 !important
        }

        .recommendPlaylistItem {
            margin-right: 10px;
            position: relative;

            .recommendPlaylistItemImg {
                .recommendPlaylistItemCount {
                    font-size: 2.4rem;
                    color: white;
                    position: absolute;
                    top: 1rem;
                    right: 0.5rem;
                    padding: 0 0.8rem;
                    background-color: rgba(121, 121, 121, 0.389);
                    border-radius: 20%/50%;
                }

                img {
                    width: 20rem;
                    height: 20rem;
                    border-radius: 2rem;
                }
            }

            .recommendPlaylistItemName {
                display: inline-block;
                font-size: 2.4rem;
                //多行文本溢出省略号
                overflow: hidden;
                //限制显示文本的行数
                -webkit-line-clamp: 3;
                text-overflow: ellipsis;
                //将对象作为弹性伸缩盒子模型显示
                display: -webkit-box;
                //设置或检索伸缩盒对象的子元素的排列方式
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
