/**
 * Created by zhanghongda on 2017/3/15.
 */
//发送验证码，此时不判断该账号是否注册过
function sendCode(){
    var t = this;
    $(".ev-regvalidate").off("click").on("click",function() {
        var phoneNum = $(".ev-regNum").val();//账号
        t.isValid.sendCodeNum = phoneNum;
        var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        var isPhone = phoneReg.test(phoneNum);
        var time = 60;
        t.ajaxFn({
            url: t.path.sendCode,
            async:false,
            param:{
                account: phoneNum,
                typeId:2,
                codeLength:4,
            },
            type:"post",
            fn: function(data) {
                var codeNum = data.responseObject.responseData.codeNum;	//每日获取的验证码次数
                t.isValid.regcodeKey = data.responseObject.responsePk;
                if(codeNum){
                    var timer = setInterval(function () {
                        time--;
                        $(".validate").text(time + "s后重新获取");
                        $(".validate").css("color","#ccc");
                        $(".validate").unbind("click");
                        if (time == 0) {
                            clearTimeout(timer);
                            $(".validate").text("点击获取验证码");
                            $(".validate").css("color","#73859e");
                            t.sendCode();
                        }
                        $(".returnText").off('click').on('click',function(){
                            clearTimeout(timer);
                            $(".validate").text("点击获取验证码");
                            $(".validate").css("color","#73859e");
                            loginAbout.register.show();
                            loginAbout.login.show();
                            t.sendCode();
                        });
                        $(".reg-experiencePo").on("click",function(){
                            commLog.creatEvent({"id":14,"url":"","keyword":"注册关闭"});
                            comm.confirmBox({
                                "title":"确定放弃注册吗?",
                                "content":"放弃注册,将无法拥有以下权限:浏览完整系列课程,参与课程问答。",
                                "cancel":"放弃",
                                "ensure":"继续注册",
                                "ensureCallback":function(){
                                    //console.log("继续注册");
                                },
                                "cancelCallback":function(){
                                    //window.location.href="//www.yi-ding.net.cn/pages/index/index.html";//跳转首页
                                    loginAbout.login.exit();
                                    clearTimeout(timer);
                                    $(".validate").text("点击获取验证码");
                                    $(".validate").css("color","#73859e");
                                }
                            });
                            t.sendCode();
                        })
                        $(".log-experiencePo").off("click").on("click",function(){
                            clearTimeout(timer);
                            $(".validate").text("点击获取验证码");
                            $(".validate").css("color","#73859e");
                            t.sendCode();
                        })
                    }, 1000);
                }else{
                    t.toast("每日最多获取3次验证码,请明天再试", 300, 2000);
                }
            }
        })
    });
}