/**
 * Created by ALLIN on 2017/3/14.
 */
function collect() {
    $(".collProblems").unbind("click").bind("click", function () {
        var isThis = $(this);
        if ($(".singleSelectActive").attr("data-collect")) {/*//www.yi-ding.net.cn/call/customer/collection/delete/*/
            var cancelId = $(".singleSelectActive").attr("data-collect");
            var cancelData = {"id": cancelId};
            cancelData = {"paramJson": $.toJSON(cancelData)};
            $.ajax({
                url: "//www.yi-ding.net.cn/call/customer/collection/delete/",
                //请求的url地址
                dataType: "json",
                //返回格式为json
                async: true,
                //请求是否异步，默认为异步，这也是ajax重要特性
                data: cancelData,
                //参数值
                type: "POST",
                //请求方式
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (req) {
                    comm.loading.hide();
                    //请求成功时处理/*<i class="collProblems"><span class="collIcon"></span><span>收藏题目</span></i>*/
                    if (req.responseObject.responseStatus) {
                        $(".singleSelectActive").removeAttr("data-collect");
                        isThis.html("<span class=\"collIcon\"></span><span>收藏题目</span>").removeClass("active");

                    }

                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        } else {
            var refId = $(".singleSelectActive").attr("data-exerciseid");
            var topicObj = null;
            $(".queite").each(function(){
                if($(this).css("display")=="block"){
                    topicObj = $(this);
                }
            });
            var customerOp = "";
            topicObj.find(".queShitiOptions").each(function(){
                if($(this).hasClass("false")||$(this).hasClass("true")){
                    customerOp+=$(this).attr("data-ansid")+",";
                }
            });
            customerOp = customerOp.substring(0,customerOp.length-1);
            var collectData = {
                refId: refId,
                collectionType: "2",
                customerId: loginAbout.login.status().userId,
                "collectionAnswer":customerOp
            };
            collectData = {"paramJson": $.toJSON(collectData)};
            $.ajax({
                url: "//www.yi-ding.net.cn/call/customer/collection/create/",
                //请求的url地址
                dataType: "json",
                //返回格式为json
                async: true,
                //请求是否异步，默认为异步，这也是ajax重要特性
                data: collectData,
                //参数值
                type: "POST",
                //请求方式
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (req) {
                    //请求成功时处理
                    comm.loading.hide();
                    if (req.responseObject.responseStatus) {
                        $(".singleSelectActive").attr("data-collect", req.responseObject.responsePk);
                        isThis.html("<span class=\"collIcon\"></span><span>已收藏</span>").addClass("active");

                    }

                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        }

    });
    $(".courseColl-pc").unbind("click").bind("click",
        function () {
            if (loginAbout.login.status().state) {
                var isThis = $(this);
                var postData = {};
                /*$(".courseColl-pc").removeClass("active").html("收藏").removeAttr("data-collectId");*/
                isThis.toggleClass("active");
                if (isThis.hasClass("active")) {
                    isThis.html("已收藏");
                    /* var courseGuideOnOff = localStorage.getItem("collectcourse");
                     if(courseGuideOnOff){
                     localStorage.setItem("collectcourse",true);*/
                    $(".course-guide").addClass('show');
                    $(".course-guide .guideBut").unbind("click").bind("click",function(){
                        $(".course-guide").removeClass('show');
                    });
                    /*}*/
                    postData = {
                        "refId": course.courseId,
                        "collectionType": "3",
                        "customerId": loginAbout.login.status().userId
                    };
                    course.applyData("collectCourse", postData);
                } else {
                    isThis.html("收藏");
                    var cancelId = isThis.attr("data-collectid");
                    postData = {
                        "id": cancelId
                    };
                    course.applyData("deleteCourse", postData);
                }
            } else {
                localStorage.setItem("unActive", "1");
                if(course.browserVerinfoNum!='msie,8.0') {
                    course.video.pause();
                }else {
                    $('.vjs-play-control').click();
                }
                loginAbout.login.show({
                    "success": function () {
                        if(authentication.keyState().state=='1'||authentication.keyState().state=='2'){
                            location.reload();//刷新页面
                        }
                        loginAbout.changeHead();
                        course.baseInfo();
                        course.talkInit();
                        course.histortinit();
                        if(course.browserVerinfoNum!='msie,8.0') {
                            course.video.pause();
                        }else {
                            $('.vjs-play-control').click();
                        }
                        if (true) {
                            if(course.browserVerinfoNum!='msie,8.0') {
                                course.video.pause();
                            }else {
                                $('.vjs-play-control').click();
                            }
                            authentication.init({
                                before: function () {
                                    if(course.browserVerinfoNum!='msie,8.0') {
                                        course.video.pause();
                                    }else {
                                        $('.vjs-play-control').click();
                                    }
                                }, "success": function () {
                                    authentication.exit();
                                    location.reload();//刷新页面
                                }, reload: true
                            })
                        }

                    }
                });
            }
        });
    $(".courseQution-pc").unbind("click").bind("click", function () {
        commLog.creatEvent({"id":68,"url":window.location.href,"keyword":"课程终端页提问呼出讨论","browseType":"38"});
        var isThis = $(this);
        course.judge(function () {
            isThis.toggleClass("active");
            if (isThis.hasClass("active")) {
                isThis.parent().hide();
                var discussId = 0;
                var options = {
                    container: $(".qustionWrite"),
                    refId: course.courseId,
                    position: "inner",
                    parentid: discussId,
                    refBelongId: "",
                    callBack: function (num, dataDiscussid) {

                    }
                };
                talk.public(options);
            }
        }, true)
    });
}