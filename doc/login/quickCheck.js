/**
 * Created by zhanghongda on 2017/3/15.
 */
/*
 * 调用方法
 */
function quickCheck(){
    var t = this;
    $(".ev-quiNum").on("blur",function(){
        t.quiCheckPhone2();
        t.quiActive();
    });
    $(".ev-quiCode").on("blur",function(){
        t.quiCheckCode2();
        t.quiActive();
    });
    $(".ev-quiNum").on("keyup",function(){
        t.quiCheckPhone();
        t.quiActive();
    });
    $(".ev-quiCode").on("keyup",function(){
        t.quiCheckCode();
        t.quiActive();
    });
}