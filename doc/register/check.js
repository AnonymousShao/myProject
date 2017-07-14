/**
 * Created by zhanghongda on 2017/3/15.
 */
function check(){
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
}