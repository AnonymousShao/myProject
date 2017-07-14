/**
 * Created by zhanghongda on 2017/3/15.
 */
//判断账户是否登录
function isLogin(){
    var t = this;
    t.ajaxFn({
        url: t.path.islogin,
        type:"post",
        async:false,
        fn: function(data) {
            var status = data.responseObject.responseStatus;
            if(status){

            }else{
                $("#notLogin").css("display","inline-block");
                $("#isLogin").css("display","none");
            }
        }
    });
}