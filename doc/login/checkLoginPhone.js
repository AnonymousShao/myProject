/**
 * Created by zhanghongda on 2017/3/15.
 */
/*
 * 校验登录账号，输入时检测没有错误提示
 */
function checkLoginPhone(){
    var t = this;
    t.isValid.phone = true;
    var phone = $(".ev-phoneNum");
    var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    var isPhone = phoneReg.test(phone.val());
    if(isPhone==false){
        t.isValid.phone = false;
    }else{
        t.ajaxFn({
            url: t.path.isExist,
            type:"get",
            async:false,
            param:{
                account:phone.val()
            },
            fn: function(data) {
                var status = data.responseObject.responseStatus;
                if(status){ //表示没有注册
                    t.isValid.phone = false;
                }else{
                    t.isValid.userId = data.responseObject.responseData.customerUnite.customerId;
                }
            }
        });
    }
}