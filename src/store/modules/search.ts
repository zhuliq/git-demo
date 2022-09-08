import { searchSong } from "../../api/index";

function initState() {
    return {
        data: {
            // 展示历史记录
            isShowHistory:true,
            // 搜索结果
            searchResult:[],
            //搜索历史
            searchHistory:[],
            // 记录search滚动位置
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
        async getSearchSong(context, value) {
            const res = await searchSong(value.keywords, value.cookie)
            context.commit('getSearchSong', res)
        }
    },
    mutations: {
        setSearchHistory(state, value) {
            state.data.searchHistory.unshift(value)
        },
        setIsShowHistory(state, value){
            state.data.isShowHistory = value
        },
        getSearchSong(state, value){
            state.data.searchResult = value.data.result.songs
        },
        resetState(state) {
            state.data = initState().data
        }
    },
}