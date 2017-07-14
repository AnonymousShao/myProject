/**
 * Created by zhanghongda on 2017/3/14.
 */
//历史手机号
function hisPhone(){
    var t = this;
    if(localStorage.getItem("phoneNum")){
        var phoneNum = localStorage.getItem("phoneNum").split(",");
        var len = phoneNum.length;
        for(var i = 0;i<len;i++){
            $(".history").css("display","block");
            var html = '<li>'+phoneNum[i]+'</li>';
            $(".history").append(html);
        }
    }
}
//历史记录点击事件
function hisCli(){
    var t = this;
    $(".history").on("click","li",function(){
        var txt = $(this).text();
        $(".ev-phoneNum").val(txt);
        $(".history").css("display","none");
        t.hisPhone();
    });
}
//出现历史账号
function historyNum(){
    $(".ev-phoneNum").on("keyup",function(){
        if($(this).val()){
            if(localStorage.getItem("phoneNum")){
                var con = localStorage.getItem("phoneNum").split(",");
                for (var i = 0;i<con.length;i++) {
                    if($(this).val()==con[i].substring(0,$(this).val().length)){
                        $(".history").show();
                        $(".history li").eq(i).css("display","block");
                    }else{
                        $(".history").hide();
                        $(".history li").eq(i).css("display","none");
                    }
                }
            }
        }
    });
}