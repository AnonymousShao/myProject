
/**
 * Created by zhanghongda on 2017/3/15.
 */
/*
 * 校验登录密码，有错误提示
 */
function checkLoginPass2(){
    var t = this;
    t.isValid.pass = true;
    var passWord = $(".ev-passWord");
    var passReg = /^[0-9a-zA-Z]*$/g;
    var len = passWord.val().length;
    var isPass = passReg.test(passWord.val());
    if(isPass){
        var len = passWord.val().length;
        if(len<6){
            t.toast("密码长度不足6位", 300,1500);
            t.isValid.pass = false;
        }else if(len>20){
            t.toast("密码长度超过20位", 300,1500);
            t.isValid.pass = false;
        }
    }else{
        t.toast("密码格式不正确", 300,1500);
        t.isValid.pass = false;
    }
}