/**
 * Created by zhanghongda on 2017/3/15.
 */
//点击注册后进入登录页面
function regBtn(){
    var t = this;
    $(".ev-regSave").off("click").on("click",function(){
        commLog.creatEvent({"id":11,"url":window.location.href,"keyword":"注册提交"});
        if($(this).is(".activation")){
            var phoneNum = $(".ev-regNum").val();
            var passNum = $(".ev-regPas").val();
            var code = $(".ev-regCode").val();
            t.isValid.phoneNum = phoneNum;
            if(t.isValid.phoneNum != t.isValid.sendCodeNum){
                t.toast("验证码输入错误", 300,1500);
            }else{
                t.ajaxFn({
                    url: t.path.checkCode,
                    type:"post",
                    async:false,
                    param:{
                        validCode:code,
                        id:t.isValid.regcodeKey,
                    },
                    fn: function(data) {
                        var status = data.responseObject.responseStatus;
                        var code = data.responseObject.responseCode;
                        if(status){ //表示验证码验证失败
                            t.ajaxFn({
                                url: t.path.register,
                                type:"get",
                                param:{
                                    account:phoneNum,
                                    passwd:passNum,
                                    registType:1,
                                },
                                fn:function(data){
                                    t.isValid.customerId = data.responseObject.responsePk;
                                    var status = data.responseObject.responseStatus;
                                    var code = data.responseObject.responseCode;
                                    if(status){
                                        loginAbout.register.exit();
                                        localStorage.setItem("userId",t.isValid.customerId);
                                        loginAbout.changeHead();
                                        localStorage.setItem("userState","true");
                                        localStorage.setItem("phoneNum",phoneNum);
                                        t.objFn.success&&t.objFn.success(
                                            loginAbout.approve.show({"type":"login", success: function () {
                                                loginAbout.approve.exit();
                                            }})
                                        );
                                    }else{
                                        switch (code) {
                                            case '9X0003':
                                                t.toast("用户名或密码为空");
                                                break;
                                            case '0B0001':
                                                t.toast("用户名已存在");
                                                break;
                                        }
                                        t.objFn.success&&t.objFn.success();
                                    }
                                }
                            });
                        }else{
                            if(code=='1A0002'){
                                t.toast("验证码错误,请重新获取", 300,1500);
                            }else if(code=='1A0001'){
                                t.toast("验证码已经失效,请重新获取", 300,1500);
                            }
                        }
                    }
                });
            }
        }

    });
}