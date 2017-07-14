
/**
 * Created by zhanghongda on 2017/3/15.
 */
//校验服务条款
function checkSer(){
    var t = this;
    var flag = true;
    $(".service i").on("click",function(){
        if(flag){
            $(".service i").removeClass("active");
            flag = false;
            t.isValid.server = false;
            t.active();
        }else{
            $(".service i").addClass("active");
            flag = true;
            t.isValid.server = true;
            t.active();
        }
    });
    t.active();
}