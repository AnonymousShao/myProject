/**
 * Created by 萤火虫 on 2017/1/5.
 */
$(document).ready(function () {

    var course = {
        jumpapp:function(obj){
            function jump(){
                var url = {
                    el: $(this),
                    ios: "yiding://net.yi-ding.ios",
                    ios9: "yiding://net.yi-ding.ios",
                    android: "yiding://cn.net.yiding"
                };
                H5scene.goApp(url, "data={scene:2,type:1,resourceId:" + $("#course-main").attr("data-courseid") + "}");
            }
            obj.unbind("mousedown").bind("mousedown",  function(){
                jump();
            });
            obj.unbind("touchstart").bind("touchstart", function(){
                jump();
            });
            obj.unbind("click").bind("click", function(){
                jump();
            });
        },
        "baseInfo": function () {
            var postData = {
                "courseId": course.courseId,
                "sessionCustomerId": "",
                "attUseFlag": "",
                "isValid": "",
                "visitSiteId": "13",
                "firstResult": 0,
                "maxResult": 10
            };
            this.applyData("point", postData);//初始化加载视频锚点
        },
        "talkInit": function () {
            var disscussData = {
                "reviewType": "1",
                "refId": course.courseId,
                "reviewId": "",
                "sortType": "7",
                "scene": "0",
                "logoUseFlag": "2",
                "pageIndex": "1",
                "pageSize": "10",
                "customerId": "",
                "attUseFlag": "16"
            };
            course.applyData("disscuss",disscussData);
        },
        "init": function () {
            //在最初加载的时候初始化视频
            var myP = videojs("example_video_1", {
                    "defaultVolume": 1,
                },
                function () {
                    var thisVideo = this;
                });
            this.video = myP;//将这个视频保存为一个全局变量
            /*myP.disableProgress({
                autoDisable: true
            });*/
            /*myP.disableProgress.disable();*/
            var recommendData = {
                "resourceId": course.courseId,
                "resourceType": "1",
                "isValid": "1",
                "attUseFlag": "3",
                "firstResult": "0",
                "maxResult": "10"
            };
            commLog.createBrowse(38, "课程终端页-课程页", window.location.href + "?/" + course.courseId + "/" + "3");//页面埋点
            var classThink = {
                "courseId": course.courseId,
                "isValid": "1",
                "firstResult": "0",
                "maxResult": "20"
            };
            this.talkInit();
            if ($(".classDown .maxWidth li").length > 3) {
                course.swipe($(".classDown"), $(".classDown .clear"), $(".classDown .downIcon")[0].clientWidth + 'px', $(".classDown .clear li"), "247px");
            }
            $(".discussAllLast li").each(function(){
                $(this).unbind("click");
                course.jumpapp($(this));
            });
            $(".courseFixed li").each(function(){
                course.jumpapp($(this));
            });
            this.onPlay();
            this.baseInfo();
            this.applyData("recommend", recommendData);//加载视频的相关推荐\
            this.applyData("classThink", classThink);//加载课后思考题
            this.courseTap();//实现切换功能
            this.courseAbstract();//打开页面的展开收起功能
            this.collect();//启动页面的所有收藏功能
            this.courseware();//新页打开课件
        },
        videoEnd: false,
        again: true,
        courseware: function () {
            $(".classDown .maxWidth li").each(function () {
                course.jumpapp($(this));
            })
        },
        courseAbstract: function () { //点击展开收缩
            $(".coursePrepare").each(function () {
                var isHighOnOff = $(this).height();
                if (isHighOnOff > 110) {
                    $(this).addClass("courseHidden").next().show();
                }
            });
            $(".coursePic-right").each(function () {
                $(this).unbind("click").bind("click",
                    function () {
                        $(this).prev().toggleClass("courseHidden");
                        if ($(this).prev().hasClass("courseHidden")) {
                            $(this).html("<i ></i><span>展开</span>").addClass("icon-upMore").removeClass("packUp");
                        } else {
                            $(this).html("<i ></i><span>收起</span>").addClass("packUp").removeClass("icon-upMore");
                        }
                    });
            });
        },
        onPlay: function () {
            course.video.on("play", function () {
                $(".classThink").hide();
                $(".courseCont").show();
                $(".hallTest_cont").hide();

            });
        },
        answerThink: function () {
            $(".answerCourse").each(function () {
                $(this).unbind("click").bind("click", function () {
                    course.jumpapp($(this));
                })
            })

        },
        collect: function () {
            course.jumpapp($(".collProblems"));
            course.jumpapp($(".courseColl-pc"));
            course.jumpapp($(".courseQution-pc"));
        },
        timeUpdata: function () {
            var time = 0;
            course.video.on("timeupdate", function () {
                var testTargetObj = $(".hallTest_cont");
                var shadeObj = $(".hallTestVideoShade");
                var courseObj = $(".courseCont");
                var textShadeObj = $(".hallTestVideoText");
                var nowTime = course.video.currentTime();
                nowTime = parseInt(nowTime);
                course.videoTime = nowTime;//原文在2939，并不理解
                if (time == nowTime) {
                    return;
                } else {
                    time = nowTime;
                }
                !course.again && course.postVideoTime();
                course.again = true;
                course.videoEnd = false;
                if (nowTime >= 180) {
                    var url = {
                        el: $(this),
                        ios: "yiding://net.yi-ding.ios",
                        ios9: "yiding://net.yi-ding.ios",
                        android: "yiding://cn.net.yiding"
                    };
                    H5scene.goApp(url, "data={scene:2,type:1,resourceId:" + $("#course-main").attr("data-courseid") + "}");
                    course.video.currentTime(180);
                    course.video.pause();
                }
            });

        },
        seriesId: null,
        histortinit:function(){
            var historyData = {
                "courseId": course.courseId,
                "customerId": "",
                "videoId": course.videoId,
                "typeId": "1",
                "visitSiteId": "13",
                "isValid": "1",
                "firstResult": "0",
                "maxResult": "10",
                "sortType": "2"
            };
            course.applyData("histroyTime", historyData);
        },
        manageData: function (type, data) {
            var realData = data.responseObject.responseData.data_list;
            var realNoData = ((data.responseObject.responseMessage) == "NO DATA") ? true : false;
            var realStatus = data.responseObject.responseStatus;
            switch (type) {
                case "point":
                    if (realNoData || !realStatus) {
                        return false;
                    } else {
                        var dotData = {};
                        var timeDot = data.responseObject.responseData.data_list[0].courseNodeList;
                        course.videoId = data.responseObject.responseData.data_list[0].videoId;
                        course.videoDuringTime = data.responseObject.responseData.data_list[0].videoPlayTime;
                        var joinOnOff = data.responseObject.responseData.data_list[0].seriesJoin;
                        var nextCourse = data.responseObject.responseData.data_list[0].nextMap;
                        var seriesId = data.responseObject.responseData.data_list[0].seriesId
                        course.seriesId = seriesId;
                        if ($.isEmptyObject(joinOnOff)) {
                            if ($(".coursePc-coll").find(".join-course").length == 0) {
                                $(".coursePc-coll").append("<li class=\"join-course\">加入系列课程</li>");
                            }
                        } else {
                            var joinState = joinOnOff.isValid == "1";
                            if (joinState) {
                                $(".courseQution-pc").show();
                                $(".join-course").hide();
                            } else {
                                if ($(".coursePc-coll").find(".join-course").length == 0) {
                                    $(".coursePc-coll").append("<li class=\"join-course\">加入系列课程</li>");
                                }
                                course.partInCourse();
                            }
                        }
                        if ($.isEmptyObject(nextCourse)) {
                            $(".courseThinkNext").html("没有课程了，离开").unbind("click").bind("click", function () {
                                window.location.href = "https://www.yi-ding.net.cn/";
                            })
                        } else {
                            $(".courseThinkNext").unbind("click").bind("click", function () {
                                window.location.href = "https://" + nextCourse.nextPageStoragePath;
                            })
                        }
                        var list = [];
                        var collectStatus = $.isEmptyObject(data.responseObject.responseData.data_list[0].courseCollection)
                        var exerciseStr = "";
                        var testContainer = $(".hallTest_cont .hallTestTitle");
                        var thinkContainer = $(".classThink .thinkList");
                        var dotIndex = 0;
                        if (collectStatus) {
                            $(".courseColl-pc").html("收藏");
                        } else {
                            $(".courseColl-pc").html("已收藏").attr({"data-collectid": data.responseObject.responseData.data_list[0].courseCollection.id}).addClass("active");
                        }
                        for (var dotNum = 0; dotNum < timeDot.length; dotNum++) {
                            list[dotNum] = {};
                            list[dotNum].iteam = timeDot[dotNum].courseNodeTime;
                            list[dotNum].courseNodeName = timeDot[dotNum].courseNodeName;
                            list[dotNum].courseNodeId = timeDot[dotNum].courseNodeId;
                            if (timeDot[dotNum].exercisesList) {
                                if (timeDot[dotNum].exercisesList.length > 0) {
                                    var exerciseIte = timeDot[dotNum].exercisesList[0];
                                    var title = "";
                                    var typeName = "";
                                    var dataType = "";
                                    var exp = "";
                                    var rightStr = "";
                                    var rightOp = "";
                                    var knowledgeList = "";
                                    var knowledgeListClass = "";
                                    var exerciseId = timeDot[dotNum].exercisesList[0].exercisesId;
                                    var exerciseCollectState = timeDot[dotNum].exercisesList[0].exercisesCollection.isValid;
                                    var collectId = (exerciseCollectState == "1") ? timeDot[dotNum].exercisesList[0].exercisesCollection.id : "";
                                    exp = exerciseIte.exercisesAnswerDesc;
                                    title = exerciseIte.exercisesName;
                                    switch (exerciseIte.exercisesType) {
                                        case "1":
                                            typeName = "单";
                                            dataType = "单选";
                                            break;
                                        case "2":
                                            typeName = "多";
                                            dataType = "多选";
                                            break;
                                        case "3":
                                            typeName = "判";
                                            dataType = "判断";
                                            break;
                                        default:
                                            break;
                                    }
                                    var optionStr = "";
                                    for (var opNum = 0; opNum < timeDot[dotNum].exercisesList[0].optionList.length; opNum++) {
                                        var inopIte = "";
                                        var inopName = "";
                                        var inopId = "";
                                        var rightOnOff = "";
                                        inopIte = timeDot[dotNum].exercisesList[0].optionList[opNum].optionName;
                                        inopId = timeDot[dotNum].exercisesList[0].optionList[opNum].optionId;
                                        switch (timeDot[dotNum].exercisesList[0].optionList[opNum].sortId) {
                                            case "1":
                                                inopName = "A";
                                                break;
                                            case "2":
                                                inopName = "B";
                                                break;
                                            case "3":
                                                inopName = "C";
                                                break;
                                            case "4":
                                                inopName = "D";
                                                break;
                                            case "5":
                                                inopName = "E";
                                                break;
                                            case "6":
                                                inopName = "F";
                                                break;
                                            case "7":
                                                inopName = "G";
                                                break;
                                            case "8":
                                                inopName = "H";
                                                break;
                                            default:
                                                break;
                                        }
                                        if (timeDot[dotNum].exercisesList[0].optionList[opNum].isRight == "1") {
                                            rightOnOff = "true";
                                            rightStr += inopName;
                                            rightOp += timeDot[dotNum].exercisesList[0].optionList[opNum].optionId + ",";
                                        } else {
                                            rightOnOff = "false";
                                        }
                                        optionStr += '<li class=\"clear queShitiOptions\" data-ansId=\'' + inopId + '\' data-judge=\"' + rightOnOff + '\"' + ' data-arrange=\"' + inopName + '\"><div class=\"answerNum\"><span>' + inopName + '</span></div><div class=\"answerText\">' + inopIte + '</div></li>';
                                    }
                                    var knoStr = "";
                                    var knoStrClass = "";
                                    if (exerciseIte.knowledgeList.length > 0) {
                                        for (var koNum = 0; koNum < exerciseIte.knowledgeList.length; koNum++) {
                                            knoStr += "<li>" + exerciseIte.knowledgeList[koNum].knowledgeName + "</li>";
                                        }
                                    } else {
                                        knoStr = "";
                                        knoStrClass = "lucency";
                                    }
                                    rightOp = rightOp.substring(0, rightOp.length - 1);
                                    if (exerciseIte.exercisesType == 2) {
                                        exerciseStr += "<div class=\"checkbox queite\" data-collect=\"" + collectId + "\" data-collect=\"" + exerciseCollectState + "\"   data-time=\"" + list[dotNum].iteam + "\" data-rightOp = \"" + rightOp + "\" data-type=\"" + dataType + "\"  data-exerciseId=\"" + exerciseId + "\"   data-status=\"none\" data-nowqueindex=\"" + dotIndex + "\" data-showed=\"false\">" + "<div class=\"hTestProblems\"><span>" + typeName + "</span>" + title + "</div>" + "<ul class=\"hTestAnswer\">" + optionStr + "</ul>" + "<div class=\"confirmBtn\">确认</div>" + "</div>" + "<div class=\"answerAnalysis\" data-nowansindex=\"" + dotIndex + "\">" + "<div class=\"answerATitle\"><span>答案解析</span></div>" + "<div class=\"aswerDisplay\"><span class=\"trueAswer\">正确答案：" + rightStr + "</span><span class=\"falseAswer\">错误答案：B</span></div>" + "<div class=\"aAnalysis_text\">" + exp + "</div>" + "<div class=\"knowledgePoint\"><div class=\"title " + knoStrClass + "\">知识点：</div><ul class=\"knowledgeList clear\">" + knoStr + "</ul>" + "</div>" + "</div>";
                                    } else {
                                        exerciseStr += "<div class=\"singleSelect queite\"  data-collect=\"" + collectId + "\"  data-collect=\"" + exerciseCollectState + "\"    data-time=\"" + list[dotNum].iteam + "\"  data-rightOp = \"" + rightOp + "\"  data-type=\"" + dataType + "\" data-exerciseId=\"" + exerciseId + "\" data-status=\"none\" data-nowqueindex=\"" + dotIndex + "\" data-showed=\"false\">" + "<div class=\"hTestProblems\"><span>" + typeName + "</span>" + title + "</div>" + "<ul class=\"hTestAnswer\">" + optionStr + "</ul>" + "</div>" + "<div class=\"answerAnalysis\" data-nowansindex=\"" + dotIndex + "\">" + "<div class=\"answerATitle\"><span>答案解析</span></div>" + "<div class=\"aswerDisplay\"><span class=\"trueAswer\">正确答案：" + rightStr + "</span><span class=\"falseAswer\">错误答案：B</span></div>" + "<div class=\"aAnalysis_text\">" + exp + "</div>" + "<div class=\"knowledgePoint\"><div class=\"title " + knoStrClass + "\">知识点：</div><ul class=\"knowledgeList clear\">" + knoStr + "</ul></div>" + "</div>";
                                    }
                                    dotIndex++;
                                    list[dotNum].proFun = function () {
                                        course.dragNode = this.iteam;
                                        course.courseTest();
                                    };
                                }

                            }

                        }
                        var thinkStr = "";
                        for (var thinkDot = 0; thinkDot < timeDot.length; thinkDot++) {
                            if (timeDot[thinkDot].questionList) {
                                for (var thinkNum = 0; thinkNum < timeDot[thinkDot].questionList.length; thinkNum++) {
                                    var thinkName = timeDot[thinkDot].questionList[thinkNum].questionName;
                                    var thinkId = timeDot[thinkDot].questionList[thinkNum].questionId;
                                    thinkStr += "<li class=\"clear\" data-thinkId=\'" + thinkId + "\' >" +
                                        "<div>" + thinkName + "</div>" +
                                        "<span class='answerCourse' data-thinkId=\'" + thinkId + "\' >回答</span>" + "</li>";
                                }
                            }
                        }
                        //thinkContainer.html(thinkStr);
                        function formatSeconds(value) {
                            var lineWidth = "";
                            if (value.split(":").length == 3) {
                                lineWidth = parseInt(parseInt(value.split(":")[0]) * 3600) + parseInt(parseInt(value.split(":")[1]) * 60) + parseInt(parseInt(value.split(":")[2]) * 1);
                            } else if (value.split(":").length == 2) {
                                lineWidth = parseInt(parseInt(value.split(":")[0]) * 60) + parseInt(parseInt(value.split(":")[1]) * 1);
                            } else {
                                lineWidth = parseInt(parseInt(value.split(":")[0]) * 1);
                            }
                            return lineWidth;
                        }

                        var timeWidth = course.videoDuringTime;
                        course.secondVideoTime = formatSeconds(timeWidth);
                        if (testContainer.parent().find(".queite").length == 0) {
                            //testContainer.after(exerciseStr);
                        }
                        course.dotConfig = {
                            "width": timeWidth,
                            "list": list
                        };
                        course.video.play();
                        course.videoFn.showDot(); //视频锚点初始化是在这里开始的
                        course.videoFn.showSubway();//显示目录节点
                        course.timeUpdata();
                        //course.histortinit();
                    }
                    break;
                case "histroyTime":
                        course.dragNode = course.dotConfig.list[0].iteam;
                        /*course.video.disableProgress({
                            autoDisable: true
                        });
*/
                        return false;
                    break;
                case "disscussLine":
                    if (realNoData || !realStatus) {
                        return false;
                    } else {
                        course.disscussLine(data);
                    }
                    break;
                case "recommend":
                    if (realNoData || !realStatus) {
                        $(".recommendContainer").remove();
                    } else {
                        var videoStr = "";
                        for (var videoNum = 0; videoNum < realData.length; videoNum++) {
                            var reName = realData[videoNum].refName;
                            var videoUrl = realData[videoNum].pageStoragePath;
                            var playTime = realData[videoNum].playTime;
                            var isAllin = (realData[videoNum].isAllin == "0") ? false : true;
                            var videoId = realData[videoNum].refId;
                            var imgSrc = realData[videoNum].refAttUrl;
                            var allinStr = "";
                            if (isAllin) {
                                allinStr = "allinIcon";
                            } else {
                                allinStr = "allinIcon lucency";
                            }
                            videoStr += "<li>" + "<div class=\"reImg\"><img src=\"" + imgSrc + "\">" + "<div class=\"playIcon\" data-videoUrl='" + videoUrl + "' data-videoId='" + videoId + "'></div>" + "<div class=\"" + allinStr + "\"></div>" + "<div class=\"timeNum\">" + playTime + "</div></div>" + "<div class=\"reText\">" + reName + "</div>" + "</li>";
                        }
                        $(".recommend ul").html(videoStr);
                        if ($(".recommend ul li").length > 3) {
                            course.swipe($(".recommendCont "), $(".recommendCont  .recommend"), 210 + 'px', $(".recommendCont  .recommend li"), "200px");
                        }
                        if ($(".course-tabite").eq(1).find(".course-active").length > 0) {
                            $(".recommendContainer").show();
                        }
                        course.changeVideo();//转换本页视频
                    }
                    break;
                case "classThink":
                    if (realNoData || !realStatus) {
                        $(".discussAllLastThink").hide();
                    } else {
                        var thinkStr = "";
                        for (var thinkNum = 0; thinkNum < realData.length; thinkNum++) {
                            var title = realData[thinkNum].questionName;
                            var exerciseId = realData[thinkNum].questionId;
                            thinkStr += '<li class="clear" data-thinkId="' + exerciseId + '">' + '<div class="clear"><div class="discussThink">' + title + '</div><i class="icon-upMore ev-icon-upMore" style="display: none;"><span>展开</span></i></div>' + '<div class="clear discussAnswerS">' + '<div class="disscussFunction clear">' + '<div class="aswer" data-thinkId="' + exerciseId + '"><i></i><span>回答</span></div>' + '<div class="praise" data-thinkId="' + exerciseId + '"><i></i><span>点赞</span></div>' + '</div>' + '</div>' + '</li>';
                        }
                        $(".discussAllLastThink").html(thinkStr);
                        course.partInThink();
                        //talk.partInDiss();
                    }
                    break;
                case "disscuss":
                    function loginnone(){
                        $(".all_text").html("全部（" + 0 + "）");
                        $(".commLogin").html("登录查看全部" + 0 + "条评论");
                        $(".loginNone").show();
                        course.jumpapp($(".loginNone"));
                    }
                    function numberLogin(){
                        $(".all_text").html("全部（" + data.responseObject.responseData.total_count + "）");
                        $(".commLogin").html("登录查看全部" + data.responseObject.responseData.total_count + "条评论");
                        $(".loginNone").show();
                        course.jumpapp($(".loginNone"));
                    }
                    if (realNoData || !realStatus) {
                        loginnone()
                    }else{
                        numberLogin();
                    }
                    break;
                case "collectCourse":
                    $(".courseColl-pc").attr("data-collectId", data.responseObject.responsePk);
                    break;
                default:
                    break;
            }
        },
        histroyOnOff: false,
        partInThink: function () {
            //对课后思考题的评论
            $(".discussAllLastThink  .aswer").each(function () {
                course.jumpapp($(this));
            });
            $(".discussAllLastThink .praise").each(function(){
                course.jumpapp($(this));
            });
        },
        courseTap: function () {
            $(".courseBLock").css({
                display: "none"
            }).eq(0).css({
                display: "block"
            });

            $(".course-tab li").unbind("click").bind("click",
                function () {
                    var introObj = $(".synopsisFooter");
                    var nowScrollObj = $(".discuss-content .discussAllList");
                    var index = $(this).index();
                    $('.course-tab li p').removeClass("course-active");
                    $(this).find('p').addClass("course-active");
                    var recommendObj = $(".recommendContainer");
                    switch (index) {
                        case 0:
                            nowScrollObj.attr("scrollPagination", "disabled");
                            introObj.show();
                            recommendObj.hide();
                            break;
                        case 1:
                            nowScrollObj.attr("scrollPagination", "disabled");
                            introObj.hide();
                            recommendObj.show();
                            break;
                        case 2:
                            if (nowScrollObj.attr("data-page")) {
                                //talk.scrollPage($(".discuss-content .discussAllList"));
                            }
                            nowScrollObj.attr("scrollPagination", "enabled");
                            introObj.hide();
                            recommendObj.hide();
                            break;
                    }
                    if (index == 2) {
                        if (nowScrollObj.attr("data-page")) {
                            //talk.scrollPage($(".discuss-content .discussAllList"));
                        }
                    } else {
                        nowScrollObj.attr("scrollPagination", "disabled");
                    }
                    $(".courseBLock").css({
                        display: "none"
                    }).eq(index).css({
                        display: "block"
                    });
                })
        },
        "discussLineId": null,
        videotimer: null,
        changeVideo: function () {
            $(".playIcon").each(function () {
                course.jumpapp($(this));
            });
        },
        applyData: function (type, data) {
            var postData = {paramJson: $.toJSON(data)};
            var postType = "POST";
            var postPort = "";
            switch (type) {
                case "point":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/cms/series/course/baseinfo/getMapById/');
                    break;
                case "partInCourse":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/yiding/customer/join/create/');
                    break;
                case "recommend":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/recommend/resource/item/getMapList/');
                    break;
                case "classThink":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/cms/series/course/question/getMapList/');
                    break;
                case "disscuss":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/customer/review/json_list/');
                    break;
                case "collectCourse":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/customer/collection/create/');
                    break;
                case "deleteCourse":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/customer/collection/delete/');
                    break;
                case "disscussLine":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/customer/review/json_list/');
                    break;
                case "storeWrong":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/customer/exercises/updateResult/');
                    break;
                case "histroyTime":
                    postPort = domain.changeUrl('//www.yi-ding.net.cn/call/customer/video/play/getTimeByCustomer/');
                    break;
                default:
                    break;

            }
            $.ajax({
                url: postPort,
                //请求的url地址
                dataType: "json",
                //返回格式为json
                async: true,
                //请求是否异步，默认为异步，这也是ajax重要特性
                data: postData,
                //参数值
                type: postType,
                //请求方式
                beforeSend: function () {
                    //请求前的处理
                    comm.loading.show();
                },
                success: function (req) {
                    //请求成功时处理
                    comm.loading.hide();
                    course.manageData(type, req);

                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        },
        videoDuringTime: null,
        secondVideoTime: null,
        videoId: null,
        courseId: $("#course-main").attr("data-courseId"),
        "videoTime": "",
        "video": null,
        "discuss": {},
        "test": {},
        "dotConfig": {},
        "videoFn": {
            nowTime: 0,
            "videoFaceInit": function () {
                $videoPanelMenu = $(".vjs-fullscreen-control");
                $videoPanelVolume = $(".vjs-play-control");
                $videoSign = $(".vjs-progress-holder");
                $allPlayTime = $(".vjs-remaining-time");
                $(".vjs-current-time").show();
                $videoPanelMenu.after("<div class=\'vjs-subtitles-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-button-sharpness\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' style=\"display:block;\" aria-haspopup=\'true\' aria-label=\'sharpness\' aria-pressed=\'true\'>" + "<span class=\'vjs-control-text\'>清晰度</span>" + "<div class=\'vjs-menu\'>" + "<ul class=\'vjs-menu-content\'>" + "<li class=\'vjs-menu-item vjs-selected vjs-menu-hd\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' aria-selected=\'true\'>高清" + "<span class=\'vjs-control-text\'></span>" + "</li>" + "<li class=\'vjs-menu-item vjs-menu-hd\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' aria-selected=\'false\'>标清" + "<span class=\'vjs-control-text\'></span>" + "</li></ul>" + "</div>" + "</div>");

            },
            "showDot": function () {
                var liStr = '<ul class="line-list" style="z-index: 10;">';
                var lineWidth = "";
                if (course.dotConfig.width.split(":").length == 3) {
                    lineWidth = parseInt(parseInt(course.dotConfig.width.split(":")[0]) * 3600) + parseInt(parseInt(course.dotConfig.width.split(":")[1]) * 60) + parseInt(parseInt(course.dotConfig.width.split(":")[2]) * 1);
                } else if (course.dotConfig.width.split(":").length == 2) {
                    lineWidth = parseInt(parseInt(course.dotConfig.width.split(":")[0]) * 60) + parseInt(parseInt(course.dotConfig.width.split(":")[1]) * 1);
                } else {
                    lineWidth = parseInt(parseInt(course.dotConfig.width.split(":")[0]) * 1);
                }

                for (var liNum = 0; liNum < course.dotConfig.list.length; liNum++) {
                    /*显示视频断点*/
                    var leftPer = Math.ceil(course.dotConfig.list[liNum].iteam / lineWidth * 100);
                    if(leftPer>100){
                        leftPer=100;
                    }
                    liStr += "<li class='line-list-iteam' style='left:" + leftPer + "%'></li>";
                }
                liStr += "</ul>";
                var controlBar = $(".vjs-progress-holder");
                if (controlBar.find(".line-list").length == 0) {
                    controlBar.append(liStr);
                }

            },
            "showSubway": function () {
                var subWayStr = "<ul>";
                var questionStr = "";
                for (var liNum = 0; liNum < course.dotConfig.list.length; liNum++) {
                    var subNum = liNum % 2;
                    var subName = course.dotConfig.list[liNum].courseNodeName;
                    var subId = course.dotConfig.list[liNum].courseNodeId;
                    var subTime = course.dotConfig.list[liNum].iteam;
                    var lastIteam = course.dotConfig.list.length - 1;
                    /*显示目录地铁图*/
                    if (subNum == 0) {
                        if (liNum == 0) {
                            subWayStr += "<li class=\'single first catalogIte\' data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        } else if (liNum == lastIteam) {
                            if (liNum == 0) {
                                subWayStr += "<li class=\'single last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                            } else {
                                subWayStr += "<li class=\'single last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                            }
                        } else {
                            subWayStr += "<li class=\'single catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        }
                    } else {
                        if (liNum == lastIteam) {
                            subWayStr += "<li class=\'double last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        } else {
                            subWayStr += "<li class=\'double catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        }
                    }
                }
                subWayStr += "</ul>";
                var fullScreenStr = "<aside class=\"continue-look ev-continue\">" +
                    "<span>继续观看</span>" +
                    "</aside>";
                var fullScreenHd = "<section class=\"pcModule return_pc\">" +
                    "        <i></i><span class=\"text\">退出全屏</span>" +
                    "    </section>";
                var courseObj = $(".hallTest_cont .hallTestTitle");
                var videoObj = $(".video-js");
                var topicObj = $("div[data-nowQueIndex=\'" + course.nowIndex + "\']");
                topicObj.addClass("singleSelectActive"); //.attr({"data-showed":"false"});//首次加载时没有显示过的
                $(".catalog-content").html(subWayStr);
                videoObj.append($(".hallTestVideoShade"));
                videoObj.append($(".hallTest_cont").clone());
                videoObj.find(".hallTest_cont").append(fullScreenStr).find(".width92").before(fullScreenHd);
            },
            operate: function (checkTime) {
                for (var timeNum = 0; timeNum < course.dotConfig.list.length; timeNum++) {
                    var setTime = course.dotConfig.list[timeNum].iteam;
                    var beTime = (setTime == checkTime) ? true : false;
                    var videoSignTime = (setTime == checkTime + 5) ? true : false;
                    var catalogObj = $(".catalog-content");
                    var videoSignObj = $(".videoSign");
                    if (beTime) {
                        catalogObj.find("ul .active").removeClass("active");
                        catalogObj.find("ul .read").removeClass("read"); //首先将所有的read制空，然后点亮新的read
                        //点亮新的read
                        catalogObj.find("[data-node='" + setTime + "']").addClass("active");
                        //course.dragNode = parseInt(catalogObj.find("[data-node='" + setTime + "']").next().attr("data-node"));
                        for (var catalogNum = 0; catalogNum < catalogObj.find(".catalogIte").length; catalogNum++) {
                            catalogObj.find(".catalogIte").eq(catalogNum).addClass("read");
                            var breakOnOff = catalogObj.find(".catalogIte").eq(catalogNum).hasClass("active");
                            if (breakOnOff) {
                                if (false) {
                                    course.dotConfig.list[timeNum].proFun && course.dotConfig.list[timeNum].proFun();
                                }
                                break;
                            }
                        }
                        break;
                    }
                    if (videoSignTime) {
                        if (course.dotConfig.list[timeNum].proFun) {
                            var showedOnOff = JSON.parse($("div[data-time=\'" + course.dotConfig.list[timeNum].iteam + "\']").attr("data-showed"));
                            if (!showedOnOff) {
                                var sideBarObj = $(".video-js");
                                videoSignObj.fadeIn(400,
                                    function () {
                                        sideBarObj.removeClass("vjs-user-inactive").addClass("vjs-user-active")
                                    }).delay(1000).fadeOut(400,
                                    function () {
                                        sideBarObj.removeClass("vjs-user-active").addClass("vjs-user-inactive");
                                    });
                            }
                            /*$(".course-video").trigger("mouseover");*/
                        }

                    }
                }
            },
        },
        nowIndex: 0,
        "swipe": function (container, containerImg, Imgwidth, containerLi, height) {
            var nn = containerLi.length - 3;
            var containerParent = container.parent();
            var slider = ' <figure class="slide">' +
                '                                <i class="slideLeft"></i>' +
                '                                <i class="slideRight"></i>' +
                '                            </figure>';
            containerParent.prepend(slider);
            container.css({
                position: "relative",
                height: height,
            })
            containerImg.css({
                position: "absolute",
            })
            if (containerLi.length > 3) {
                container.siblings('.slide').find('.slideLeft').on('mouseover', function () {
                    $(this).addClass('activation');
                })
                container.siblings('.slide').find('.slideLeft').on('mouseout', function () {
                    $(this).removeClass('activation');
                })
                container.siblings('.slide').find('.slideRight').on('mouseover', function () {
                    $(this).addClass('activation');
                })
                container.siblings('.slide').find('.slideRight').on('mouseout', function () {
                    $(this).removeClass('activation');
                })
                container.siblings('.slide').find('.slideRight').click(function () {
                    course.jumpapp($(this));
                });
                container.siblings('.slide').find('.slideLeft').click(function () {
                    course.jumpapp($(this));
                });
            }
        }
    };
    course.init();
});
