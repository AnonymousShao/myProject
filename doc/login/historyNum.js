/**
 * Created by zhanghongda on 2017/3/14.
 */
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