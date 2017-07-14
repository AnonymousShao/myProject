/**
 * Created by zhanghongda on 2017/3/15.
 */
//验证手机号
function checkPhone2(){
    var t = this;
    t.isValid.phoneIsValid = true;
    var phone = $(".ev-regNum");
    var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    var isPhone = phoneReg.test(phone.val());
    if(isPhone==false){
        t.toast("请填写正确手机号", 300,1500);
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
                        },
                    })
                    t.isValid.phoneIsValid = false;
                }else{
                    t.sendCode();
                }
            }
        });
    }
}