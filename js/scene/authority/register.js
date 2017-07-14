/**
 * 功能描述： 注册模块
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by ZhangHongDa on 2016/11/22.
 *
 */
var registerFn={
    isValid:{
        customerId:'',
        phoneIsValid:true,
        passIsValid:true,
        codeIsValid:true,
        server:true,
        regcodeKey:0,//注册验证码
        phoneNum:0,//注册时用户输入的账号
        sendCodeNum:0,//发送验证码的账号
    },
    path:{
        isExist:"//www.yi-ding.net.cn/call/yiding/web/user/isExist/",
        register:"//www.yi-ding.net.cn/call/yiding/web/user/userRegist/",
        sendCode:"//www.yi-ding.net.cn/call/yiding/customer/send/code/create/",
        checkCode:"//www.yi-ding.net.cn/call/yiding/customer/send/code/update/",//校验验证码
        profile:"//www.yi-ding.net.cn/call/site/profile/getMapById/",//隐私条款
    },
    init:function(fn){
        var t = this;
        t.objFn = fn;
        t.clearNum($(".ev-regNum"));//清除账号
        t.clearPass($(".ev-regPas"));//清除密码
        t.eyeOpen();//密码显隐
        t.cancle();//取消按钮
        t.check();//持续校验是否符合要求并判断注册按钮能否点击
        t.checkSer();//服务条款
    },
    //获取数据
    ajaxFn:function(opt){
        $.ajax({
            type:opt.type,
            url:opt.url,
            data: {paramJson: $.toJSON(opt.param)},
            async:opt.async,
            dataType:"json",
            success:function(data){
                comm.loading.hide();
                if(data){
                    opt.fn(data);
                }
            },
            error:function(data){
                // console.log("Error...");
            },
            beforeSend:function(){
                comm.loading.show();
            },
        });
    },
    //提示框的toast显示,time1:时间间隔，time2:显示时间。
    toast:function(content,time1,time2){
        $(".errorTip").fadeIn();
        $(".errorTip span").text(content);
        setTimeout(function(){
            $(".errorTip").fadeOut();
            $(".errorTip").removeClass("errorTipLong");
        },time2);
    },
    //清除账号
    clearNum:function(dom){
        dom.on("focus",function(){
            var txt = $(this).val();
            $(".password").css("display","none");
            if(txt){
                $(".phone").css("display","inline-block");
                $(".phone .close").on("click",function(){
                    dom.attr("value","");
                    $(".errorTip").css("display","none");
                    $(".phone").css("display","none");
                });
            }else{
                $(this).on("keyup",function(){
                    if($(this).val()){
                        $(".phone").css("display","inline-block");
                        $(".phone .close").on("click",function(){
                            dom.attr("value","");
                            $(".phone").css("display","none");
                        });
                    }else{
                        $(".phone").css("display","none");
                    }
                });
            }
        });
        dom.on("blur",function(){
            (function isClick(){
                var isClick = false;
                $(".phone .close").on("click",function(){
                    isClick = true;
                    return isClick;
                })
                if(isClick){
                    $(".errorTip").css("display","none");
                }
                setTimeout(function(){
                    if(isClick){
                        dom.attr("value","");
                        setTimeout(function(){
                            $(".errorTip").css("display","none");
                        },400);
                        $(".phone").css("display","none");
                    }else{
                        $(".phone").css("display","none");
                    }
                },200);
            }());
            (function isJump(){
                $(".isJump").on("click",function(){
                    var timer = setInterval(function(){
                        $(".errorTip").hide();
                        setTimeout(function(){
                            clearInterval(timer);
                        },1000);
                    },10);
                });
                $(".phone .close").on("click",function(){
                    var timer = setInterval(function(){
                        $(".errorTip").hide();
                        setTimeout(function(){
                            clearInterval(timer);
                        },1000);
                    },10);
                })
                $(".password .close").on("click",function(){
                    var timer = setInterval(function(){
                        $(".errorTip").hide();
                        setTimeout(function(){
                            clearInterval(timer);
                        },1000);
                    },10);
                })
                $(".password .eyeClose").on("click",function(){
                    var timer = setInterval(function(){
                        $(".errorTip").hide();
                        setTimeout(function(){
                            clearInterval(timer);
                        },1000);
                    },10);
                })
                $(".password .eyeOpen").on("click",function(){
                    var timer = setInterval(function(){
                        $(".errorTip").hide();
                        setTimeout(function(){
                            clearInterval(timer);
                        },1000);
                    },10);
                })
            }());
        })
    },
    //清除密码
    clearPass:function(dom){
        dom.on("focus",function(){
            var txt = $(this).val();
            $(".password").css("display","inline-block");
            if(txt){
                $(".password").css("display","inline-block");
                $(".password .close").on("click",function(){
                    dom.attr("value","");
                    $(".password").css("display","none");
                });
            }else{
                $(".password .close").css("height","0");
                $(this).on("keyup",function(){
                    if($(this).val()){
                        $(".password").css("display","inline-block");
                        $(".close").css("height","");
                        $(".password .close").on("click",function(){
                            dom.attr("value","");
                            $(".password").css("display","none");
                        });
                    }else{
                        $(".password .close").css("height","0");
                    }
                });
            }
        });
        dom.on("blur",function(){
            (function isClick(){
                var isClick = false;
                var isPassCli = false;
                $(".password .close").on("click",function(){
                    isClick = true;
                    return isClick;
                })
                $(".password .eyeClose").on("click",function(){
                    isPassCli=true;
                });
                $(".password .eyeOpen").on("click",function(){
                    isPassCli=true;
                });
                setTimeout(function(){
                    if(isClick){
                        setTimeout(function(){
                            $(".errorTip").css("display","none");
                        },400);
                        dom.attr("value","");
                        $(".password").css("display","none");
                    }else if(isPassCli){
                        $(".password").css("display","inline-block");
                    }else{
                        $(".password").css("display","none");
                    }
                },200);
                $(".password .close").on("click",function(){
                    var timer = setInterval(function(){
                        $(".errorTip").hide();
                        setTimeout(function(){
                            clearInterval(timer);
                        },1000);
                    },10);
                })
                $(".password .eyeClose").on("click",function(){
                    var timer = setInterval(function(){
                        $(".errorTip").hide();
                        setTimeout(function(){
                            clearInterval(timer);
                        },1000);
                    },10);
                })
                $(".password .eyeOpen").on("click",function(){
                    var timer = setInterval(function(){
                        $(".errorTip").hide();
                        setTimeout(function(){
                            clearInterval(timer);
                        },1000);
                    },10);
                })
            }());
        })
    },
    //密码的显示隐藏
    eyeOpen:function(){
        $(".eyeOpen").on("click",function(){
            $(this).css("display","none");
            $(".eyeClose").css("display","inline-block");
            $(".ev-regPas").prop("type","text");
        });
        $(".eyeClose").on("click",function(){
            $(this).css("display","none");
            $(".eyeOpen").css("display","inline-block");
            $(".ev-regPas").prop("type","password");
        });
    },

    //取消注册
    cancle:function(){
        var t = this;
        $(".reg-experiencePo").on("click",function(){
            $(".yd-alertModalMask").css("z-index",20);
            comm.confirmBox({
                "title":"确定放弃注册吗?",
                "content":"放弃注册,将无法:<br/>浏览完整系列课程<br/>参与课程讨论",
                "cancel":"放弃",
                "ensure":"继续注册",
                "ensureCallback":function(){
                    $(".yd-confirmModalMask").removeClass('show').remove();
                },
                "cancelCallback":function(){
                    loginAbout.register.exit();
                }
            });
        });
    },
    //验证手机号
    checkPhone:function(){
        var t = this;
        t.isValid.phoneIsValid = true;
        var phone = $(".ev-regNum");
        var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        var isPhone = (phoneReg.test(phone.val()))||(emailReg.test(phone.val()));
        t.isValid.rightPhone = phoneReg.test(phone.val());
        t.isValid.rightEmail = emailReg.test(phone.val());
        switch (true){
            case phoneReg.test(phone.val()):
                $('.ev-fidValue').show();
                break;
            case emailReg.test(phone.val()):
                $('.ev-fidValue').hide();
                break;
            case phone.val().length<=5:
                $('.ev-fidValue').hide();
                break;
            default:
                break;
        }
        if(isPhone==false){
            t.isValid.phoneIsValid = false;
        }else{
            t.ajaxFn({
                url: t.path.isExist,
                async:true,
                param:{
                    account:phone.val()
                },
                type:"get",
                fn: function(data) {
                    var status = data.responseObject.responseStatus;
                    if(status==false){ //表示未注册
                        t.isValid.phoneIsValid = false;
                    }else{
                        t.sendCode();
                    }
                }
            });
        }
    },
    //验证手机号
    checkPhone2:function(){
        var t = this;
        t.isValid.phoneIsValid = true;
        var phone = $(".ev-regNum");
        var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        var isPhone = (phoneReg.test(phone.val()))||(emailReg.test(phone.val()));
        t.isValid.rightPhone = phoneReg.test(phone.val());
        t.isValid.rightEmail = emailReg.test(phone.val());
        switch (true){
            case phoneReg.test(phone.val()):
                $('.ev-fidValue').show();
                break;
            case emailReg.test(phone.val()):
                $('.ev-fidValue').hide();
                break;
            case phone.val().length<=0:
                $('.ev-fidValue').hide();
                break;
            default:
                break;
        }
        if(isPhone==false){
            t.toast("请填写正确手机号或邮箱", 300,1500);
            t.isValid.phoneIsValid = false;
        }else{
            t.ajaxFn({
                url: t.path.isExist,
                async:true,
                param:{
                    account:phone.val()
                },
                type:"get",
                fn: function(data) {
                    var status = data.responseObject.responseStatus;
                    var code = data.responseObject.responseCode
                    if(status==false){ //表示注册
                        $(".yd-alertModalMask").css("z-index",20);
                        comm.confirmBox({
                            "content":"账号已存在，可直接登录",
                            "cancel":"注册新账号",
                            "ensure":"登录",
                            "ensureCallback":function(){
                                loginAbout.register.exit();
                                loginAbout.login.show({"success":function(){
                                    loginAbout.changeHead();
                                    loginAbout.login.exit();
                                    location.reload();
                                }});
                                $(".ev-phoneNum").val(phone.val());
                            },
                            "cancelCallback":function(){
                                $(".ev-regNum").attr("value","");
                            }
                        });
                        t.isValid.phoneIsValid = false;
                    }else{
                        t.sendCode();
                    }
                }
            });
        }
    },
    //验证密码
    checkPassword:function(){
        var t = this;
        t.isValid.passIsValid = true;
        var passWord = $(".ev-regPas");
        var passReg=/^[0-9a-zA-Z]*$/g;
        var isPass = passReg.test(passWord.val());
        if(isPass){
            var len = passWord.val().length;
            if(len<6){
                t.isValid.passIsValid = false;
            }else if(len>20){
                t.isValid.passIsValid = false;
            }
        }else{
            t.isValid.passIsValid = false;
        }
    },
    //验证密码
    checkPassword2:function(){
        var t = this;
        t.isValid.passIsValid = true;
        var passWord = $(".ev-regPas");
        var passReg = /^[0-9a-zA-Z]*$/g;
        var len = passWord.val().length;
        var isPass = passReg.test(passWord.val());
        if(isPass){
            var len = passWord.val().length;
            if(len<6){
                t.toast("密码长度不足6位", 300,1500);
                t.isValid.passIsValid = false;
            }else if(len>20){
                t.toast("密码长度超过20位", 300,1500);
                t.isValid.passIsValid = false;
            }
        }else{
            t.toast("密码格式不正确", 300,1500);
            t.isValid.passIsValid = false;
        }
    },
    //验证验证码
    checkValidCode:function(){
        var t = this;
        t.isValid.codeIsValid = true;
        if($(".ev-regCode").val()==""){
            t.isValid.codeIsValid = false;
        }
    },
    //验证验证码
    checkValidCode2:function(){
        var t = this;
        t.isValid.codeIsValid = true;
        if($(".ev-regCode").val()==""){
            t.toast("验证码不能为空", 300,1500);
            t.isValid.codeIsValid = false;
        }
    },
    //校验服务条款
    checkSer:function(){
        var t = this;
        var flag = true;
        $(".service i").on("click",function(){
            if(flag){
                $(".service i").removeClass("active");
                flag = false;
                t.isValid.server = false;
            }else{
                $(".service i").addClass("active");
                flag = true;
                t.isValid.server = true;
            }
            t.active();
        });
        t.active();
    },
    //校验注册按钮是否可点击
    active:function(){
        var t = this;
        var phoneTxt = $(".ev-regNum").val();
        var passTxt = $(".ev-regPas").val();
        var codeTxt = $(".ev-regCode").val();
        if((phoneTxt&&passTxt&&codeTxt)||(phoneTxt&&passTxt&&$('.ev-fidValue').css('display')=='none')){
            if((t.isValid.phoneIsValid&&t.isValid.passIsValid&&t.isValid.codeIsValid&&t.isValid.server)||(t.isValid.phoneIsValid&&t.isValid.passIsValid&&$('.ev-fidValue').css('display')=='none'&&t.isValid.server)){
                $(".ev-regSave").addClass("activation");
                t.regBtn();//用户点击注册按钮
            }else{
                $(".ev-regSave").removeClass("activation");
                $(".ev-regSave").unbind("click");
            }
        }else{
            $(".ev-regSave").removeClass("activation");
            $(".ev-regSave").unbind("click");
        }
    },
    check:function(){
        var t = this;
        var phone = $(".ev-regNum");
        var passWord = $(".ev-regPas");
        var avlidCode = $(".ev-regCode");
        //验证手机
        phone.on("blur",function(){
            t.checkPhone2();
        });
        //验证密码
        passWord.on("blur",function(){
            t.checkPassword2();
        });
        //验证验证码
        avlidCode.on("blur",function(){
            t.checkValidCode2();
        });
        phone.off("keyup").on('keyup', function() {
            t.checkPhone();
            t.active();
        });
        passWord.off("keyup").on('keyup', function() {
            t.checkPassword();
            t.active();
        });
        avlidCode.off("keyup").on('keyup', function() {
            t.checkValidCode();
            t.active();
        });
    },
    //发送验证码，此时不判断该账号是否注册过
    sendCode:function(){
        var t = this;
        $(".ev-regvalidate").off("click").on("click",function() {
            var phoneNum = $(".ev-regNum").val();//账号
            t.isValid.sendCodeNum = phoneNum;
            var time = 60;
            t.ajaxFn({
                url: t.path.sendCode,
                async:false,
                param:{
                    account: phoneNum,
                    typeId:2,
                    //codeLength:4,
                    siteId:13,
                    resetSite:7
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
    },
    //点击注册后进入登录页面
    regBtn:function(){
        var t = this;
        $(".ev-regSave").off("click").on("click",function(){
            commLog.creatEvent({"id":11,"url":window.location.href,"keyword":"注册提交"});
            if($(this).is(".activation")){
                var phoneNum = $(".ev-regNum").val();
                var passNum = $(".ev-regPas").val();
                var code = $(".ev-regCode").val();
                var postData={},url=t.path.checkCode;
                switch (true){
                    case t.isValid.rightPhone:
                        //手机
                        postData={
                            validCode:code,
                            ref:t.isValid.regcodeKey,
                            mobile:phoneNum,
                            type:'mobile',
                            passwd:passNum
                        };
                        t.isValid.phoneNum = phoneNum;
                        if(t.isValid.phoneNum != t.isValid.sendCodeNum&&t.isValid.rightPhone){
                            t.toast("验证码输入错误", 300,1500);
                        }else{
                            t.ajaxFn({
                                url: url,
                                type:"post",
                                async:false,
                                param:postData,
                                fn: function(data) {
                                    var status = data.responseObject.responseStatus;
                                    var code = data.responseObject.responseCode;
                                    if(status){ //表示验证码验证成功
                                        t.ajaxFn({
                                            url: t.path.register,
                                            type:"get",
                                            param:{
                                                validCode:code,
                                                ref:t.isValid.regcodeKey,
                                                mobile:phoneNum,
                                                type:'mobile',
                                                passwd:passNum,
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
                                                    localStorage.setItem("unActive","1");
                                                    comm.alertBox({
                                                        mTitle: "成功创建唯医通行证",
                                                        title :"您可以使用通行证登录<br/>医鼎、唯医、医栈" ,
                                                        ensure :"知道了",
                                                        ensureCallback: function(){

                                                        }
                                                    });
                                                    localStorage.setItem("loginNum","0");
                                                    t.objFn.success&&t.objFn.success();
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
                        break;
                    case t.isValid.rightEmail:
                       //邮箱
                        t.ajaxFn({
                            url: t.path.register,
                            type:"get",
                            param:{
                                mobile:phoneNum,
                                type:'email',
                                passwd:passNum
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
                                    localStorage.setItem("unActive","1");
                                    comm.alertBox({
                                        mTitle: "成功创建唯医通行证",
                                        title :"您可以使用通行证登录<br/>医鼎、唯医、医栈" ,
                                        ensure :"知道了",
                                        ensureCallback: function(){

                                        }
                                    });
                                    localStorage.setItem("loginNum","0");
                                    t.objFn.success&&t.objFn.success();
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
                        break;
                    default:
                        break;
                }
            }

        });
    },
}
registerFn.init();




















