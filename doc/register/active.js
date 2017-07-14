/**
 * Created by zhanghongda on 2017/3/15.
 */
//校验注册按钮是否可点击
function active(){
    var t = this;
    var phoneTxt = $(".ev-regNum").val();
    var passTxt = $(".ev-regPas").val();
    var codeTxt = $(".ev-regCode").val();
    if(phoneTxt&&passTxt&&codeTxt){
        if(t.isValid.phoneIsValid&&t.isValid.passIsValid&&t.isValid.codeIsValid&&t.isValid.server){
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
}