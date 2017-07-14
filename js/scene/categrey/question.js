$(function(){
    /*comm.alertBox({
        mTitle: "成功创建唯医通行证",
        title :"您可以使用通行证登录<br/>医鼎、唯医、医栈" ,
        ensure :"知道了",
        ensureCallback: function(){

        }
    });*/
	comm.pcSideModule([{
        item: "首页",
        href: "//www.yi-ding.net.cn",
        active:false
    }, {
        item: "课程",
        href: "//www.yi-ding.net.cn/pages/curriculum/curriculum.html",
        active:false,
    }, {
        item: "习题",
        href: "//www.yi-ding.net.cn/pages/category/question.html",
        active:true,
    }, {
        item: "",
        href: "//www.yi-ding.net.cn/pages/index/advancedClass.html",
        active: false,
    }]);
    var question = {
        "init":function(){
            commLog.createBrowse(3,"分类-题库（题库入口)");
            $(".orderExQue").unbind("click").bind("click",function(){
                if(question.checkUser()){

                    //window.open("//www.yi-ding.net.cn/pages/exercises/exercise_order_begin.html?sourceType=3", "_blank");
                    comm.jump($(this),"//www.yi-ding.net.cn/pages/exercises/exercise_order_begin.html?sourceType=3",1);
                }else{
                    localStorage.setItem("unActive", "1");
                    loginAbout.login.show({"success":function(){
                        localStorage.setItem("userState","true");
                        loginAbout.changeHead();
                        loginAbout.login.exit();
                        /*authentication.init({
                            "type": "login", success: function () {
                                authentication.exit();
                                localStorage.setItem("unActive", 0);
                            }
                        });*/
                    }});
                }
            });
            $(".specialSonLink").unbind("click").bind("click",function(){
                if(question.checkUser()){

                    //window.open("//www.yi-ding.net.cn/pages/exercises/exercise_project_begin.html?sourceType=3", "_blank");
                    comm.jump($(this),"//www.yi-ding.net.cn/pages/exercises/exercise_project_begin.html?sourceType=3",1);
                }else{
                    localStorage.setItem("unActive", "1");
                    loginAbout.login.show({"success":function(){
                        localStorage.setItem("userState","true");
                        loginAbout.changeHead();
                        loginAbout.login.exit();
                        /*authentication.init({
                            "type": "login", success: function () {
                                authentication.exit();
                                localStorage.setItem("unActive", 0);
                            }
                        });*/
                    }});
                }
            });
            $(".simulateExQue").unbind("click").bind("click",function(){
                if(question.checkUser()){
                    //window.open("//www.yi-ding.net.cn/pages/personal/personal_wrongList.html?sourceType=3", "_blank");
                    comm.jump($(this),"//www.yi-ding.net.cn/pages/personal/personal_wrongList.html?sourceType=3",1);
                }else{
                    localStorage.setItem("unActive", "1");
                    loginAbout.login.show({"success":function(){
                        localStorage.setItem("userState","true");
                        loginAbout.changeHead();
                        loginAbout.login.exit();
                        /*authentication.init({
                            "type": "login", success: function () {
                                authentication.exit();
                                window.location.reload();
                                localStorage.setItem("unActive", 0);
                            }
                        });*/
                    }});
                }
            })
        },
        "checkUser":function(){
            //console.log(loginAbout.login.status().state)
            return question.global.status = loginAbout.login.status().state;
        },
        'global':{
            "status":false
        }
    };
    question.init();
});
