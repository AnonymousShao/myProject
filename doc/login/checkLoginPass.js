/**
 * Created by zhanghongda on 2017/3/15.
 */
/*
 * 校验登录密码,无提示。
 */
function checkLoginPass(){
    var t = this;
    t.isValid.pass = true;
    var passWord = $(".ev-passWord");
    var passReg = /^[0-9a-zA-Z]*$/g;
    var len = passWord.val().length;
    var isPass = passReg.test(passWord.val());
    if(isPass){
        var len = passWord.val().length;
        if(len<6){
            t.isValid.pass = false;
        }else if(len>20){
            t.isValid.pass = false;
        }
    }else{
        t.isValid.pass = false;
    }
}