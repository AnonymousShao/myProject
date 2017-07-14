/**
 * Created by zhanghongda on 2017/3/15.
 */
//返回上一步
function returnText(){
    if($(".ev-login").css("display")=="block"){
        $(".authorityBg").css("display","none")
    }
    var t = this;
    //找回密码的返回
    $(".ev-findReturn").on("click",function(){
        $(".ev-login").css("display","block");//登录显示
        $(".ev-findPassword").css("display","none");//找回密码隐藏
        commLog.createBrowse(4, "登录注册-登录页");
        $(".authorityBg").css("display","none")
    });
    //重置密码的返回
    $(".ev-newReturn").on("click",function(){
        $(".ev-findPassword").css("display","block");//找回密码显示
        $(".ev-newPass").css("display","none");//重置密码隐藏
        commLog.createBrowse(5, "登录注册-找回密码页");
    });
    //手机快捷登录
    $(".ev-quickReturn").on("click",function(){
        $(".ev-login").css("display","block");//登录显示
        $(".ev-quickLogin").css("display","none");
        commLog.createBrowse(4, "登录注册-登录页");
        $(".authorityBg").css("display","none")
    });
    //绑定唯医
    $(".ev-bindReturn").on("click",function(){
        $(".ev-createBind").css("display","block");//显示
        $(".ev-bindAllin").css("display","none");
        commLog.createBrowse(10, "登录注册-唯医账号登录页");
    });
    //微信返回上一步
    $(".ev-bindWeixinReturn").on("click",function(){
        window.location.href=localStorage.getItem("weiUrl");
        loginAbout.login.exit();
        comm.maskBackground.show("rgba(0,0,0,.6)");
        var iframHtml = "<iframe src=\""+t.path.weixinLogin+"\" class=\"weixinLogin\"'>";
        $(".yd-maskBackground").html(iframHtml);
    });
}