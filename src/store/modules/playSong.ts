//获取歌曲url的函数
import { getSongUrl, getSongData, getLyric } from '../../api/index'


function initState() {
    return {
        data: {
            audio: new Audio,
            // 是否正在播放
            isPlaying: false,
            // 歌曲名是否滚动
            songNameIsScroll: false,
            // 正在点击播放的歌曲id
            playingSongId: 0,
            // 正在播放的歌曲详情
            singingData: {},
            // 正在播放的歌曲位于走马灯位置
            carouselIndex: 0,
            // 音频播放的当前位置（以秒计算）
            playingTimeStamp: 0,
            // 歌曲的url
            songUrl: '',
            // 切歌方式,默认0:顺序播放sequence，1:单曲循环single, 2:随机播放random
            nextSongWay: 0,
            // 歌词
            lyric:[],
            // 歌曲详情
            songData: [{
                id: 347230,
                songName: '海阔天空',
                singer: 'Beyond',
                picUrl: "https://p1.music.126.net/8y8KJC1eCSO_vUKf2MyZwA==/109951165796899183.jpg",
                songTime: 326,
            }],
        }
    }
}
export default {
    namespaced: true,
    state: () => {
        return initState()
    },
    actions: {
        // 请求url
        async getSongUrl(context, value) {
            const res = await getSongUrl(value.id, value.cookie)
            context.commit('getSongUrl', res)
        },
        //根据歌曲id获取歌曲详情
        async getSongData(context, value) {
            const res = await getSongData(value.id, value.cookie)
            context.commit('getSongData', res)
        },
        //根据歌曲id获取歌词
        async getLyric(context, value) {
            const res = await getLyric(value)
            context.commit('getLyric', res)
        }
    },
    mutations: {
        // 传入id
        getSongUrl(state, value) {
            state.data.songUrl = value.data?.data[0].url
        },
        getSongData(state, value) {
            // 歌手名用/分隔
            function changeSingerName(singerArr:Array<string>):string {
                let result: Array<string> = []
                singerArr.forEach(item => {
                    result.push(item.name)
                });
                return result.join('/')
            }
            const songDataObj = {
                id: state.data.playingSongId,
                picUrl: value.data.songs[0].al.picUrl,
                songName: value.data.songs[0].name,
                singer: changeSingerName(value.data.songs[0].ar),
                // singerArr: value.data.songs[0].ar,
                // 时间毫秒转化为秒
                songTime: Math.round(value.data.songs[0].dt / 1000),
            }
            // 查看数组中有无相同歌曲
            const songIndex = state.data.songData.findIndex(item => item.id == songDataObj.id)
            if (songIndex == -1) {
                state.data.songData.push(songDataObj)
            }
            const singingSongObj = state.data.songData.find(item => item.id == state.data.playingSongId)
            const singingSongIndex = state.data.songData.findIndex(item => item.id == state.data.playingSongId)
            state.data.singingData = singingSongObj
            state.data.carouselIndex = singingSongIndex
        },
        setSingingData(state) {
            const singingSongObj = state.data.songData.find(item => item.id == state.data.playingSongId)
            const singingSongIndex = state.data.songData.findIndex(item => item.id == state.data.playingSongId)
            state.data.singingData = singingSongObj
            state.data.carouselIndex = singingSongIndex
        },
        setPlayingSongId(state, value) {
            state.data.playingSongId = value
        },
        setPlaying(state, value) {
            state.data.isPlaying = value
        },
        setNextSongWay(state, value) {
            state.data.nextSongWay = value
        },
        setPlayingTimeStamp(state, value) {
            // value秒
            state.data.playingTimeStamp = value
        },
        setSongNameIsScroll(state, value) {
            state.data.songNameIsScroll = value
        },
        getLyric(state, value) {
            let lyricStr = value.data.lrc.lyric
            let lyricArr = lyricStr.split(/\n/ig).map((item, index)=>{
                let min = item.slice(1,3)
                let sec = item.slice(4,10)
                // 每段歌词
                let lyric = item.replace(/\[(.+?)\]\s*/g, '')
                // 每段歌词的时间
                let time = parseFloat(sec) + parseInt(min)*60
                return {
                    time,
                    lyric,
                }
            })
            state.data.lyric = lyricArr
        },
    },
}
