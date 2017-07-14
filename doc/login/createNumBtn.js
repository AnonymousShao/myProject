/**
 * Created by zhanghonda on 2017/3/15.
 */
//快速登录产生随机密码后进行登录
function createNumBtn(){
    var t = this;
    var code = $(".ev-quiCode").val();
    t.ajaxFn({
        url: t.path.checkCode,
        type:"post",
        async:false,
        param:{
            validCode:code,
            id:t.isValid.quicodeKey,
        },
        fn: function(data) {
            var status = data.responseObject.responseStatus;
            var code = data.responseObject.responseCode;
            if(status==false){ //表示验证码验证失败
                if(code=='1A0002'){
                    t.toast("验证码错误,请重新获取", 300,1500);
                }else if(code=='1A0001'){
                    t.toast("验证码已经失效,请重新获取", 300,1500);
                }
            }else{
                var phoneNum = $(".ev-quiNum").val();
                t.ajaxFn({
                    url: t.path.register,
                    type:"get",
                    param:{
                        account:phoneNum,
                        passwd:t.isValid.quiCrePass,
                    },
                    fn:function(data){
                        var status = data.responseObject.responseStatus;
                        var code = data.responseObject.responseCode;
                        t.isValid.userId = data.responseObject.responsePk;
                        if(status){
                            switch (code) {
                                case '0B0004':
                                    localStorage.setItem("userId",t.isValid.userId);
                                    if(localStorage.getItem("phoneNum")){
                                        var histor = localStorage.getItem("phoneNum").split(",");
                                        for (var i = 0;i<histor.length;i++) {
                                            if(phoneNum!=histor[i]){
                                                localStorage.setItem("phoneNum",phoneNum+','+histor);
                                            }
                                        }
                                    }else{
                                        localStorage.setItem("phoneNum",phoneNum);
                                    }
                                    loginAbout.login.exit();
                                    localStorage.setItem("userState","true");
                                    loginAbout.changeHead();
                                    t.objFn.success&&t.objFn.success();
                                    break;
                            }
                        }else{
                            switch (code) {
                                case '9X0003':
                                    //console.log("用户名或密码为空");
                                    break;
                                case '0B0001':
                                //console.log("用户名已存在");
                            }
                        }
                    }
                })
            }
        }
    });
}