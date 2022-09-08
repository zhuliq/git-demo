import {createStore} from 'vuex'
import banner from './modules/banner'
import recommendPlayList from './modules/recommendPlayList'
import songList from './modules/songList'
import song from './modules/song'
import playSong from './modules/playSong'
import login from './modules/login'
import search from './modules/search'

export default createStore({
    modules:{
        banner,
        recommendPlayList,
        songList,
        song,
        playSong,
        login,
        search,
    }
})