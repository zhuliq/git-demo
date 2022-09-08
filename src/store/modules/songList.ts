import { getSongListDes } from "../../api/index";
// import {Module, ActionContext} from 'vuex'
// import {RootState} from ''

function initState() {
    return {
        data: {
            // 歌单信息
            playListData: {},
            //歌单创建者
            creatorData: {},
            // 记录songList滚动位置
            scrollTop: 0,
        }
    }
}
export default {
    namespaced: true,
    state: () => {
        return initState()
    },
    actions: {
        async getSongListData(context, value) {
            const res = await getSongListDes(value.id, value.cookie)
            context.commit('getSongListData', res)
        }
    },
    mutations: {
        getSongListData(state, value) {
            state.data.playListData = value.data.playlist,
                state.data.creatorData = value.data.playlist.creator
        },
        resetState(state) {
            state.data = initState().data
        }
    },
}
