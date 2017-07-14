/**
 * Created by ALLIN on 2017/1/12.
 */


$(document).ready(function(){
    comm.pcSideModule([{
        item: "",
        href: "",
        active: false
    }, {
        item: "",
        href: "",
        active: false
    }, {
        item: "",
        href: "",
        active: false
    }]);
    //loginAbout.login.show();
    /*$(".al-indexHeader").remove();
    $(".al-mainSidebar").remove();
    $(".yd-mainFooter").remove();
    $(".al-middleTipsBox").remove();
    $(".al-rightNav").remove();*/
    $(".closeWeixinBind").unbind("click").bind("click",function () {
        window.location.href=localStorage.getItem("weiUrl")?localStorage.getItem("weiUrl"):'//www.yi-ding.net.cn/';
    });
    $(".ev-creatAllinmdAuth").unbind("click").bind("click",function(){
        $(".yd-mainInner .loginMain").hide();
        loginAbout.register.show({
            "success":function(){
                comm.alertBox({
                    mTitle: "成功创建唯医通行证",
                    title :"您可以使用通行证登录<br/>医鼎、唯医、医栈" ,
                    ensure :"知道了",
                    ensureCallback: function(){
                        window.location.href = '//www.yi-ding.net.cn/';
                    }
                });
            }
        });
        var bindStr = "<div class=\"binding bindPass\">创建唯医通行证，下次就可以使用微信快速登录</div>";
        var nextObj = $(".ev-register .authorityTitle");
        if(!(nextObj.next().hasClass("bindPass"))){
            nextObj.after(bindStr);
        }
        $(".reg-experiencePo").unbind("mousedown").bind("mousedown",function () {
            clearTimeout(giveup);
            var giveup = setTimeout(function(){
                var giveUpObj = $(".yd-confirmModalCancelBtn");
                //console.log(giveUpObj)
                if(giveUpObj.length>0){
                    giveUpObj.unbind("mousedown").bind("mousedown",function () {
                        $(".yd-mainInner .loginMain").show();
                        window.location.reload();
                    });
                }
            },500);
        })


    })
});
