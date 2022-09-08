import { loginByPass, userLevel, userSongList, likeSongList } from "../../api/index";

function initState() {
    return {
        data: {
            isLogin: false,
            userLevel: 0,
            authorization: '',
            cookie: '',
            // 用户资料
            profile: {
                nickname: '去登录',
                avatarUrl: 'https://p3.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg',
            },
            userSongList: [],
            userLikeSongList: [],
        }
    }
}
export default {
    namespaced: true,
    state: () => {
        return initState()
    },
    actions: {
        // 账号密码登录,返回res
        async getLoginByPass(context, value) {
            const res = await loginByPass(value.username, value.password)
            if (res.data.code == 200) {
                //获取用户歌单
                const userSong = await userSongList(res.data.profile.userId)
                context.commit('getUserSongList', userSong)
                // 标记已登录
                context.state.data.isLogin = true
                context.commit('getLoginByPass', res)
            }
            return res
        },
        //获取用户歌单
        async getUserSongList(context, value) {
            const userSong = await userSongList(value)
            context.commit('getUserSongList', userSong)
        },
        //获取用户等级 
        async getUserLevel(context, value) {
            const res = await userLevel(value)
            context.commit('serUserLevel', res)
        },
        // 获取用户喜欢列表
        async getUserLikeSongList(context, value) {
            const res = await likeSongList(value.uid, value.cookie)
            context.commit('getUserLikeSongList', res)
        },

    },
    mutations: {
        getLoginByPass(state, value) {
            // 将token存入本地及state
            state.data.authorization = value.data.token
            // localStorage.setItem('authorization', value.data.token)
            Storage.prototype.setCanExpireLocal('authorization', value.data.token, 1)
            // 将cookie存入本地及state
            state.data.cookie = value.data.cookie
            // localStorage.setItem('login_cookie', value.data.cookie)
            Storage.prototype.setCanExpireLocal('login_cookie', value.data.cookie, 1)

            // 将用户资料存入state
            state.data.profile = value.data.profile
            // value存入本地
            // localStorage.setItem('login_profile', JSON.stringify(value.data.profile))
            Storage.prototype.setCanExpireLocal('login_profile', value.data.profile, 1)

        },
        serUserLevel(state, value) {
            state.data.userLevel = value.data.data.level
        },
        getUserSongList(state, value) {
            state.data.userSongList = value.data.playlist
        },
        getUserLikeSongList(state, value) {
            state.data.userLikeSongList = value.data.ids
        },
        resetState(state) {
            state.data = initState().data
        }
    },
}