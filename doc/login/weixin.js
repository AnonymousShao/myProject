/**
 * Created by zhanghongda on 2017/3/15.
 */
function weixin(){
    var t = this;
    $(".weixin").off("click").on("click",function(){
        commLog.creatEvent({"id":5,"url":window.location.href,"keyword":"微信登录"});
        t.isValid.weiUrl = window.location.href;
        localStorage.setItem("weiUrl",window.location.href);
        loginAbout.login.exit();
        comm.maskBackground.show("rgba(0,0,0,.6)");
        var iframHtml = "<iframe src=\"//open.weixin.qq.com/connect/qrconnect?appid=wx3b347620d468cd89&redirect_uri=https%3a%2f%2fwww.yi-ding.net.cn%2fcall%2fyiding%2finteract%2fweixinLogin%2f?url="+t.isValid.weiUrl+"&response_type=code&scope=snsapi_login&state=START#wechat_redirect\" class=\"weixinLogin\" >";
        $(".yd-maskBackground").html(iframHtml);
    });
    t.sendCode($(".ev-bindWeixinValidate"),$(".ev-bindWeixinNum"),2);
    var url = window.location.href;
    if((url).substring((url).indexOf("/"),(url).length)=="//www.yi-ding.net.cn/pages/authority/weixinBindLogin.html?isFreeze=1"){
        comm.alertBox({
            "title":"账号已被冻结，请更换账号",
            "ensure":"好的",
            "ensureCallback":function(){
                loginAbout.register.exit();
                loginAbout.login.exit();
                window.location.href = localStorage.getItem("weiUrl");
            },
        });
    }
}