
/**
 * Created by zhanghongda on 2017/3/15.
 */
//验证手机号
function checkPhone(){
    var t = this;
    t.isValid.phoneIsValid = true;
    var phone = $(".ev-regNum");
    var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    var isPhone = phoneReg.test(phone.val());
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
}