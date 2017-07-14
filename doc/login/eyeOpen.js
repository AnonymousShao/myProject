/**
 * Created by zhanghongda on 2017/3/14.
 */
//密码的显示隐藏
function eyeOpen(){
    $(".eyeOpen").on("click",function(){
        $(".password").css("display","inline-block");
        $(this).css("display","none");
        $(".eyeClose").css("display","inline-block");
        $(".ev-passWord").prop("type","text");
        $(".ev-caosPas").prop("type","text");
    });
    $(".eyeClose").on("click",function(){
        $(".password").css("display","inline-block");
        $(this).css("display","none");
        $(".eyeOpen").css("display","inline-block");
        $(".ev-passWord").prop("type","password");
        $(".ev-caosPas").prop("type","password");
    });
}