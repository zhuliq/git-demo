import axios from "axios";

let baseUrl = 'http://116.62.122.158:3000'

//获取 banner数据，type:资源类型,对应以下类型,默认为 0 即 PC
export function getBanner(type: number = 0) {
    return axios.get(`${baseUrl}/banner?type=${type}`)
}
//获取推荐歌单,limit: 取出数量 , 默认为 30 (不支持 offset)
export function getRecommendPlaylist(limit:number = 30){
    return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}
//根据歌单id获取歌单信息，必选参数 : id : 歌单id， 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
export function getSongListDes(id:string, cookie?:string, s:number = 8){
    return axios.get(`${baseUrl}/playlist/detail?id=${id}&s=${s}&cookie=${cookie}`)
}
//根据歌单id获取对应的所有歌曲，必选参数 : id : 歌单 id， 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量， 可选参数 : offset : 默认值为0
export function getSong(id:string, cookie?:string, offset:number = 0){
    return axios.get(`${baseUrl}/playlist/track/all?id=${id}&limit=&offset=${offset}&cookie=${cookie}`)
}
//根据歌曲id获取对应歌曲url
export function getSongUrl(id:number, cookie?:string){
    return axios.get(`${baseUrl}/song/url?id=${id}&cookie=${cookie}`)
}
//根据歌曲id获取对应歌曲详情
export function getSongData(id:number, cookie?:string){
    return axios.get(`${baseUrl}/song/detail?ids=${id}&cookie=${cookie}`)
}
//根据手机号密码获取token和cookie,必选参数 :phone: 手机号码, password: 密码
export function loginByPass(phone:string, password:string){
    return axios.post(`${baseUrl}/login/cellphone?phone=${phone}&password=${password}`)
}
//根据用户cookie，获取用户等级信息
export function userLevel(cookie:string){
    return axios.get(`${baseUrl}/user/level?cookie=${cookie}`)
}
//根据用户id，获取用户歌单
export function userSongList(uid:string){
    return axios.get(`${baseUrl}/user/playlist?uid=${uid}`)
}
//根据关键词，搜索歌曲  必选参数 : keywords : 关键词  关键词可以多个 , 以空格隔开
export function searchSong(keywords:string, cookie?:string){
    return axios.get(`${baseUrl}/cloudsearch?keywords=${keywords}&cookie=${cookie}`)
}
//根据歌曲id，喜欢/取消喜欢歌曲  必选参数 : id: 歌曲 id 可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
export function likeSong(id:string, cookie?:string, isLike?:boolean){
    return axios.get(`${baseUrl}/like?id=${id}&cookie=${cookie}&like=${isLike}`)
}
//根据用户id，喜欢音乐列表  必选参数 : uid: 用户 id
export function likeSongList(uid:string, cookie?:string){
    return axios.get(`${baseUrl}/likelist?uid=${uid}&cookie=${cookie}`)
}
//根据歌曲id，获得对应音乐的歌词 必选参数 : id: 音乐 id
export function getLyric(id:string){
    return axios.get(`${baseUrl}/lyric?id=${id}`)
}
