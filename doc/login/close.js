/**
 * Created by zhanghongda on 2017/3/15.
 */
//页面关闭按键
function close(){
    var t = this;
    $(".log-experiencePo").on("click",function(){
        loginAbout.login.exit();
    });
}