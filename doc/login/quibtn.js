/**
 * Created by zhanghongda on 2017/3/15.
 */
//快速登录按钮
function quiBtn(){
    var t = this;
    $(".ev-quiLoginBtn").off("click").on("click",function(){
        if($(this).is(".activation")){
            if(t.isValid.quiPhoneNum!=t.isValid.quiSendCodeNum){
                t.toast("验证码输入错误", 300, 1500);
            }else{
                t.ajaxFn({
                    url: t.path.checkCode,
                    type:"post",
                    async:false,
                    param:{
                        validCode:$(".ev-quiCode").val(),
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
                            //判断账户是否存在
                            var phone = $(".ev-quiNum").val();
                            t.ajaxFn({
                                url: t.path.isExist,
                                type:"get",
                                async:false,
                                param:{
                                    account:phone
                                },
                                fn: function(data) {
                                    var status = data.responseObject.responseStatus;
                                    t.isValid.quiCustomerId = data.responseObject.responseData.customerUnite.customerId;//找回密码的customerId
                                    t.isValid.userId = data.responseObject.responseData.customerUnite.customerId;
                                    var code = data.responseObject.responseCode;
                                    if(status){
                                        if(code=="0B0010"){
                                            comm.confirmBox({
                                                "content":"该手机尚未注册<br/>是否直接创建新账号？",
                                                "cancel":"取消",
                                                "ensure":"创建账号",
                                                "ensureCallback":function(){
                                                    t.createNumBtn();//用户用不存在的账号进行快速登录，进行校验验证码
                                                },
                                                "cancelCallback":function(){
                                                },
                                            })
                                        }
                                    }else{//如果存在
                                        var phone = $(".ev-quiNum").val();
                                        var code = t.isValid.quiValidCode;
                                        var codeKey = t.isValid.quicodeKey;
                                        t.ajaxFn({
                                            url: t.path.mobLogin,
                                            type:"post",
                                            async:false,
                                            param:{
                                                loginType:"quickLogin",
                                                account:phone,
                                                smsId:codeKey,
                                                validCode:code,
                                            },
                                            fn: function(data) {
                                                if(data){
                                                    var status = data.responseObject.responseStatus;
                                                    if(status){
                                                        commLog.creatEvent({"id":147,"url":window.location.href,"keyword":"手机号快捷登录提交"});
                                                        if(localStorage.getItem("phoneNum")){
                                                            var histor = localStorage.getItem("phoneNum").split(",");
                                                            for (var i = 0;i<histor.length;i++) {
                                                                if(phone!=histor[i]){
                                                                    localStorage.setItem("phoneNum",phone+','+histor);
                                                                }
                                                            }
                                                        }else{
                                                            localStorage.setItem("phoneNum",phone);
                                                        }
                                                        localStorage.setItem("userId",t.isValid.userId);
                                                        loginAbout.login.exit();
                                                        loginAbout.changeHead();
                                                        localStorage.setItem("userState","true");
                                                        t.objFn.success&&t.objFn.success();
                                                    }else{
                                                        t.objFn.error&&t.objFn.error();
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}