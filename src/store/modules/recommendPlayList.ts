function initState() {
    return {
        data: {
            // 记录recommendPlayList滚动位置
            scrollLeft:0,
        }
    }
}
export default {
    namespaced: true,
    state: () => {
        return initState()
    },
    actions: {
    },
    mutations: {
        resetState(state) {
            state.data = initState().data
        }
    },
}