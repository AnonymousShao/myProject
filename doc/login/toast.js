/**
 * Created by zhanghongda on 2017/3/14.
 */

function toast(content,time1,time2){
    setTimeout(function(){
        $(".errorTip").fadeIn();
        $(".errorTip span").text(content);
        setTimeout(function(){
            $(".errorTip").fadeOut();
            setTimeout(function(){
                $(".errorTip").removeClass("errorTipLong");
            },1000);
        },time2);
    },time1);
}


