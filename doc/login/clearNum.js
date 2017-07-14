/**
 * Created by zhanghongda on 2017/3/14.
 */

//清除账号
function clearNum(dom){
    var t = this;
    dom.on("focus",function(){
        var txt = $(this).val();
        $(".password").css("display","none");
        if(txt){
            $(".phone").css("display","inline-block");
            $(".phone .close").on("click",function(){
                var timer1 = setInterval(function(){
                    $(".errorTip").hide();
                    setTimeout(function(){
                        clearInterval(timer1);
                    },1000);
                },100);
                dom.attr("value","");
                $(".phone").css("display","none");
                $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
                $(".ev-quiLoginBtn").removeClass("activation");//快速登录
                $(".ev-fidNext").removeClass("activation");//找回密码下一步
                $(".ev-passSave").removeClass("activation");//重置密码
                $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
            });
        }else{
            $(this).on("keyup",function(){
                if($(this).val()){
                    $(".phone").css("display","inline-block");
                    $(".phone .close").on("click",function(){
                        dom.attr("value","");
                        $(".phone").css("display","none");
                        $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
                        $(".ev-quiLoginBtn").removeClass("activation");//快速登录
                        $(".ev-fidNext").removeClass("activation");//找回密码下一步
                        $(".ev-passSave").removeClass("activation");//重置密码
                        $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
                    });
                }else{
                    $(".phone").css("display","none");
                }
            });
        }
    });
    dom.on("blur",function(){
        function isClick(){
            var isClick = false;
            $(".phone .close").on("click",function(){
                isClick = true;
                return isClick;
            })
            setTimeout(function(){
                if(isClick){
                    dom.attr("value","");
                    $(".phone").css("display","none");
                    setTimeout(function(){
                        $(".errorTip").css("display","none");
                    },400);
                    $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
                    $(".ev-quiLoginBtn").removeClass("activation");//快速登录
                    $(".ev-fidNext").removeClass("activation");//找回密码下一步
                    $(".ev-passSave").removeClass("activation");//重置密码
                    $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
                }else{
                    $(".phone").css("display","none");
                }
            },200);
        }
        isClick();
        //当点击选择别的登录方式时，不显示错误提示
        (function isJump(){
            $(".isJump").on("click",function(){
                var timer = setInterval(function(){
                    $(".errorTip").hide();
                    setTimeout(function(){
                        clearInterval(timer);
                    },1000);
                },100);
            });
            $(".phone .close").on("click",function(){
                var timer = setInterval(function(){
                    $(".errorTip").hide();
                    setTimeout(function(){
                        clearInterval(timer);
                    },1000);
                },100);
            })
            $(".password .close").on("click",function(){
                var timer = setInterval(function(){
                    $(".errorTip").hide();
                    setTimeout(function(){
                        clearInterval(timer);
                    },1000);
                },100);
            })
        }());
    })
}


