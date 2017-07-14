/**
 * Created by zhanghongda on 2017/3/14.
 */

/*
 * dom:发送验证码的节点
 * phone:输入验证码的input框
 */
function sendCode(dom,phone,typeId){
    var t = this;
    var time = 60;
    dom.off("click").on("click",function(){
        $(".validate").unbind("click");
        var url = window.location.href;
        if((url).substring((url).indexOf("/"),(url).length)=="//www.yi-ding.net.cn/pages/authority/weixinBindLogin.html"){
            commLog.creatEvent({"id":160,"url":window.location.href,"keyword":"微信授权登录，微信绑定医鼎账号的发送验证码"});
        }
        var phoneNum = phone.val();
        t.isValid.fidSendCodeNum = phoneNum;
        t.isValid.quiSendCodeNum = phoneNum;
        t.isValid.sendBinWei = phoneNum;
        t.isValid.bidCaosSend = phoneNum;
        if(phoneNum){
            t.ajaxFn({
                url: t.path.sendCode,
                async:false,
                param:{
                    account: phoneNum,
                    typeId:typeId,	//表示快速登录
                    codeLength:4,
                    createPasswd:1,//传值生成随机码
                },
                type:"post",
                fn: function(data) {
                    var codeNum=data.responseObject.responseData.codeNum;	//每日获取的验证码次数
                    if(codeNum||codeNum==0){
                        t.isValid.fidcodeKey=data.responseObject.responsePk;
                        t.isValid.quicodeKey=data.responseObject.responsePk;
                        t.isValid.bidcodeKey=data.responseObject.responsePk;//绑定微信主键id
                        t.isValid.regcodeKey=data.responseObject.responsePk;
                        t.isValid.caosCodeKey=data.responseObject.responsePk;
                        t.isValid.quiValidCode=data.responseObject.responseData.validCode;//验证码的信息
                        t.isValid.bidValidCode=data.responseObject.responseData.validCode;//验证码的信息
                        t.isValid.quiCrePass = data.responseObject.responseData.createPasswd;//生成快登录的随机的密码
                        t.isValid.bidWeiPass = data.responseObject.responseData.createPasswd;//微信登录生成随机密码
                        t.isValid.bidCaosCodeKey = data.responseObject.responsePk;//绑定caos的主键id
                        var timer = setInterval(function () {
                            time--;
                            $(".validate").text(time + "s后重新获取");
                            $(".validate").css("color","#ccc");
                            $(".validate").unbind("click");
                            if (time == 0) {
                                clearTimeout(timer);
                                $(".validate").text("点击获取验证码");
                                $(".validate").css("color","#73859e");
                                t.sendCode(dom,phone,typeId);
                            }
                            $(".reg-experiencePo").off("click").on("click",function(){
                                clearTimeout(timer);
                                $(".validate").text("点击获取验证码");
                                $(".validate").css("color","#73859e");
                                loginAbout.register.exit();
                                t.sendCode(dom,phone,typeId);
                            });
                            $(".log-experiencePo").off("click").on("click",function(){
                                clearTimeout(timer);
                                $(".validate").text("点击获取验证码");
                                $(".validate").css("color","#73859e");
                                loginAbout.login.exit();
                                t.sendCode(dom,phone,typeId);
                            });
                            $(".ev-quickReturn").on('click',function(){
                                clearTimeout(timer);
                                $(".validate").text("点击获取验证码");
                                $(".validate").css("color","#73859e");
                                t.sendCode(dom,phone,typeId);
                                $(".ev-login").css("display","block");//登录显示
                                $(".ev-quickLogin").css("display","none");
                                commLog.createBrowse(4, "登录注册-登录页");
                            });
                            $(".ev-findReturn").on('click',function(){
                                clearTimeout(timer);
                                $(".validate").text("点击获取验证码");
                                $(".validate").css("color","#73859e");
                                $(".ev-login").css("display","block");//登录显示
                                $(".ev-findPassword").css("display","none");//找回密码隐藏
                                commLog.createBrowse(4, "登录注册-登录页");
                                t.sendCode(dom,phone,typeId);
                            });
                            $(".ev-bindReturn").on('click',function(){
                                clearTimeout(timer);
                                $(".validate").text("点击获取验证码");
                                $(".validate").css("color","#73859e");
                                t.sendCode(dom,phone,typeId);
                                $(".ev-createBind").css("display","block");//显示
                                $(".ev-bindAllin").css("display","none");
                                commLog.createBrowse(10, "登录注册-唯医账号登录页");
                            });
                        }, 1000);
                    }else{
                        t.toast("每日最多获取3次验证码,请明天再试", 300, 2000);
                    }
                }
            });
        }else{
            t.toast("请填写正确的手机号", 300, 1500);
        }
    });
}