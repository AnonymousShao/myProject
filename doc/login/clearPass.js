/**
 * Created by zhanghongda on 2017/3/14.
 */

//清除密码
function clearPass(dom){
    dom.on("focus",function(){
        var txt = $(this).val();
        $(".password").css("display","inline-block");
        if(txt){
            $(".password").css("display","inline-block");
            $(".password .close").on("click",function(){
                setTimeout(function(){
                    $(".errorTip").css("diaplay","none");
                },500);
                dom.attr("value","");
                $(".password").css("display","none");
                $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
                $(".ev-quiLoginBtn").removeClass("activation");//快速登录
                $(".ev-fidNext").removeClass("activation");//找回密码下一步
                $(".ev-passSave").removeClass("activation");//重置密码
                $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
            });
        }else{
            $(".password .close").css("height","0");
            $(this).on("keyup",function(){
                if($(this).val()){
                    $(".password").css("display","inline-block");
                    $(".close").css("height","");
                    $(".password .close").on("click",function(){
                        dom.attr("value","");
                        $(".password").css("display","none");
                        $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
                        $(".ev-quiLoginBtn").removeClass("activation");//快速登录
                        $(".ev-fidNext").removeClass("activation");//找回密码下一步
                        $(".ev-passSave").removeClass("activation");//重置密码
                        $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
                    });
                }else{
                    $(".password .close").css("height","0");
                }
            });
        }
    });
    dom.on("blur",function(){
        function isClick(){
            var isClick = false;
            var isPassCli = false;
            $(".password .close").on("click",function(){
                isClick = true;
                return isClick;
            })
            $(".password .eyeClose").on("click",function(){
                isPassCli=true;
            });
            $(".password .eyeOpen").on("click",function(){
                isPassCli=true;
            });
            setTimeout(function(){
                if(isClick){
                    setTimeout(function(){
                        $(".errorTip").css("diaplay","none");
                    },500);
                    dom.attr("value","");
                    $(".password").css("display","none");
                    $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
                    $(".ev-quiLoginBtn").removeClass("activation");//快速登录
                    $(".ev-fidNext").removeClass("activation");//找回密码下一步
                    $(".ev-passSave").removeClass("activation");//重置密码
                }else if(isPassCli){
                    $(".password").css("display","inline-block");
                }else{
                    $(".password").css("display","none");
                }
            },200);
            $(".password .close").on("click",function(){
                var timer = setInterval(function(){
                    $(".errorTip").hide();
                    setTimeout(function(){
                        clearInterval(timer);
                    },1000);
                },10);
            })
            $(".password .eyeClose").on("click",function(){
                var timer = setInterval(function(){
                    $(".errorTip").hide();
                    setTimeout(function(){
                        clearInterval(timer);
                    },1000);
                },10);
            })
            $(".password .eyeOpen").on("click",function(){
                var timer = setInterval(function(){
                    $(".errorTip").hide();
                    setTimeout(function(){
                        clearInterval(timer);
                    },1000);
                },10);
            })
        }
        isClick();
    })
}


