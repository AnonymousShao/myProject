
/**
 * Created by zhanghongda on 2017/3/15.
 */
//验证验证码
function checkValidCode(){
    var t = this;
    t.isValid.codeIsValid = true;
    if($(".ev-regCode").val()==""){
        t.isValid.codeIsValid = false;
    }
}