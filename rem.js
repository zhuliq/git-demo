//布局函数
function remSize(){
    let width = document.documentElement.clientWidth
    if(width > 750){
        width = 750
    }
    if(width < 320){
        width = 320
    }
    //设置一个rem的大小，rem相对与html宽度
    document.documentElement.style.fontSize = (width / 75) + 'px'
}
// 调用函数
remSize()
//监听，窗口大小改变时调用函数
window.onresize = function(){
    remSize()
}
