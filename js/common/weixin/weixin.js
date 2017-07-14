! function(a, b) {
    function d(a) {
        var e, c = b.createElement("iframe");
        // // var d = "https://open.weixin.qq.com/connect/qrconnect?appid=" + a.appid + "&scope=" + a.scope + "&redirect_uri=" + a.redirect_uri + "&state=" + a.state + "&login_type=jssdk";
        // var d="https://open.weixin.qq.com/connect/qrconnect?appid=" + a.appid  +
        //     "&redirect_uri=" + a.redirect_uri +
        //     "?url=https://www.yi-ding.net.cn/pages/personal/personal_setting.html" +
        //     "&response_type=code"+
        //     "&scope=" + a.scope  +
        //     "&state=" + a.state +
        //     "#wechat_redirect" +
        //     "&customerId="+localStorage.getItem("userId");
        var d="https://open.weixin.qq.com/connect/qrconnect?appid=wx3b347620d468cd89&redirect_uri=http%3a%2f%2fwww.yi-ding.net.cn%2fcall%2fyiding%2finteract%2fregistBind%2f?customerId="+localStorage.getItem('userId')+"&url=http://www.yi-ding.net.cn/&response_type=code&scope=snsapi_login&state=START#wechat_redirect";
        d += a.style ? "&style=" + a.style : "";
        d += a.href ? "&href=" + a.href : "";
        c.src = d;
        c.frameBorder = "0";
        c.allowTransparency = "true";
        c.scrolling = "no";
        c.width = "300px";
        c.height = "400px";
        e = b.getElementById(a.id);
        e.innerHTML = "";
        e.appendChild(c);
    }
    a.WxLogin = d;
}(window, document);
