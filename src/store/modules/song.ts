import { getSong } from "../../api/index";

function initState() {
    return {
        data: {
            // 歌单里的所有歌曲
            songs:[],
        }
    }
}
export default {
    namespaced: true,
    state: () => {
        return initState()
    },
    actions: {
        async getSongData(context, value) {
            const res = await getSong(value.id, value.cookie)
            context.commit('getSongData', res)
        }
    },
    mutations: {
        getSongData(state, value) {
            state.data.songs = value.data.songs
        },
        resetState(state) {
            state.data = initState().data
        }
    },
}
