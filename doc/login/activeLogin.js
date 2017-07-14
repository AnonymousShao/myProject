/**
 * Created by zhanghongda on 2017/3/15.
 */
/*
 * 校验登录按钮可否点击
 */
function activeLogin(){
    var t = this;
    if(($(".ev-phoneNum").val())&&($(".ev-passWord").val())){
        if(t.isValid.phone&&t.isValid.pass){
            $(".ev-loginBtn").addClass("activation");
            t.loginBtn();//登录按钮可以点击
        }else{
            $(".ev-loginBtn").removeClass("activation");
            $(".ev-loginBtn").unbind("click");
        }
    }else{
        $(".ev-loginBtn").removeClass("activation");
        $(".ev-loginBtn").unbind("click");
    }
}