/**
 * Created by zhanghongda on 2017/3/14.
 */

//历史记录点击事件
function hisCli(){
    var t = this;
    $(".history").on("click","li",function(){
        var txt = $(this).text();
        $(".ev-phoneNum").val(txt);
        $(".history").css("display","none");
    });
}

