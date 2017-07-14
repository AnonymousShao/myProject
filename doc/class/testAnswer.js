/**
 * Created by ALLIN on 2017/3/15.
 */
function testAnswer() {
    course.collect();//启动页面的所有收藏功能
    var dwrongData = {};
    var customerOption = "";
    var exerciseId = "";
    $(" .checkbox").each(function () {
        $(this).find(".queShitiOptions").each(function () {
            $(this).unbind("click").bind("click", function () {
                //$(this).toggleClass("selected");
                var ansId = $(this).attr("data-ansid");
                var optionS = $(" li[data-ansid=\'" + ansId + "\']");
                optionS.toggleClass("selected");
                var topicObj = $(" div[data-nowQueIndex=\'" + course.nowIndex + "\']");
                var affirmObj = topicObj.find(".confirmBtn");
                var ansObj = $("div[data-nowAnsIndex=\'" + course.nowIndex + "\']");
                var goOnVideobj = $(".ev-continue");
                var videoTestObj = $(".video-js .hallTest_cont");
                var textShadeObj = $(".hallTestVideoText");
                var lenOnOff = $(this).parent().parent().find(".selected").length > 0;
                if (lenOnOff) {
                    affirmObj.addClass("activation").show();
                } else {
                    affirmObj.removeClass("activation");
                }
                var toggleButtonOnOff = (topicObj.find(".selected").length > 0) ? true : false;
                if (toggleButtonOnOff) {
                    affirmObj.addClass("activation").show();//多选题只是增加确认键效果，不走逻辑
                } else {
                    affirmObj.removeClass("activation");
                }
                topicObj.each(function () {
                    var isThisTopic = $(this);
                    $(this).find(".activation").unbind("click").bind("click", function () {
                        // console.log(affirmObj.hasClass('activation'))
                        if(!affirmObj.hasClass('activation')){
                            return;
                        }
                        //topicObj
                        topicObj.each(function(){
                            $(this).find(" .queShitiOptions").each(function(){
                                // console.log($(this));
                                $(this).unbind("click");
                            });
                        });
                        var confirm = $(" div[data-nowQueIndex=\'" + course.nowIndex + "\']");
                        confirm.each(function () {
                            $(this).find(".activation").hide().removeClass("activation");
                        });
                        var yoursStr = "";
                        var exerciseResult = true;
                        exerciseId = $(this).parent().attr("data-exerciseid");
                        isThisTopic.find(".hTestAnswer .queShitiOptions").each(function (i, ele) {
                            var rightOnOff = JSON.parse($(this).attr("data-judge"));
                            if (rightOnOff) {
                                if (!$(this).hasClass("selected")) {
                                    $(this).unbind("click");
                                    exerciseResult = false;
                                } else {
                                    customerOption += $(this).attr("data-ansid") + ",";
                                    var anstId = $(this).attr("data-ansid");
                                    var optiontS = $(" li[data-ansid=\'" + anstId + "\']");
                                    optiontS.each(function () {
                                        $(this).addClass("true").unbind("click");
                                    });
                                }

                            } else {
                                if ($(this).hasClass("selected")) {
                                    //$(this).addClass("false");
                                    var anssId = $(this).attr("data-ansid");
                                    var optionsS = $(" li[data-ansid=\'" + anssId + "\']");
                                    optionsS.each(function () {
                                        $(this).addClass("false").unbind("click");
                                    });
                                    customerOption += $(this).attr("data-ansid") + ",";
                                    exerciseResult = false;
                                }else{
                                    $(this).unbind("click");
                                }
                            }
                        });
                        isThisTopic.find(".hTestAnswer .selected").each(function () {
                            yoursStr += $(this).attr("data-arrange");
                        });
                        isThisTopic.attr({"data-status": exerciseResult});
                        isThisTopic.find(".queShitiOptions").each(function(){
                            var lastRe = true;
                            var onR = $(this).hasClass("true");
                            var onW = $(this).hasClass("false");
                            if(onR||onW){
                                lastRe = false;
                            }
                            if(lastRe){
                                $(this).addClass("forbid").find(".answerText").css("color","#aeaeae");
                            }
                        });
                        if (exerciseResult) {
                            ansObj.find(".falseAswer").html("你的答案:" + yoursStr).removeClass("falseAswer").addClass("trueAswer");
                            ansObj.addClass("answerAnalysisActive");
                        } else {
                            ansObj.find(".falseAswer").html("你的答案:" + yoursStr);
                            ansObj.addClass("answerAnalysisActive");
                            goOnVideobj.unbind("click").bind("click",
                                function () {
                                    if(!ansObj.hasClass('answerAnalysisActive')){
                                        return;
                                    }
                                    commLog.creatEvent({"id":115,"url":window.location.href,"keyword":"随堂测试继续观看","browseType":"38"});
                                    if(course.browserVerinfoNum!='msie,8.0') {
                                        course.video.play();
                                    }else {

                                    }
                                    videoTestObj.hide();
                                });
                            isThisTopic.find(".queShitiOptions").each(function () {
                                $(this).unbind("click").css({
                                    "cursor": "default"
                                });
                            });

                            //这个属性是用来判断该显示习题还是tab
                        }
                        textShadeObj.attr({
                            "data-toggle": "false"
                        });
                        $(".hallTestVideoShade").hide();
                        customerOption.substring(0, customerOption.length - 1);
                        var status = exerciseResult ? "1" : "0";
                        var iteamQue = [
                            {
                                "answerId": "0",
                                "optionCorrect": topicObj.attr("data-rightop"),
                                "customerOption": customerOption,
                                "answerTime": course.getNowTime(),
                                "exercisesId": topicObj.attr("data-exerciseid"),
                                "status": status
                            }
                        ];
                        customerOption = "";
                        var dRightData = {
                            "customerId": loginAbout.login.status().userId,
                            "exercisesList": JSON.stringify(iteamQue),
                            "type": "10"
                        };
                        course.applyData("storeWrong", dRightData);//在题目答错的时候保存这一道错题
                        course.nowIndex++;
                    });
                });
            })
        });

    });
    $(" .singleSelect .queShitiOptions").each(function () {
        $(this).unbind("click").bind("click",
            function () {
                var topicObj = $("div[data-nowQueIndex=\'" + course.nowIndex + "\']");
                var ansObj = $("div[data-nowAnsIndex=\'" + course.nowIndex + "\']");
                var textShadeObj = $(".hallTestVideoText");
                var goOnVideobj = $(".ev-continue");
                var videoTestObj = $(".video-js .hallTest_cont");
                var exerciseNum = topicObj.attr("data-nowqueindex");
                var checkTypeOnOff = (topicObj.attr("data-type") == "多选") ? true : false;
                var yoursStr = "";
                var ansId = $(this).attr("data-ansid");
                var optionS = $(" li[data-ansid=\'" + ansId + "\']");
                customerOption = $(this).attr("data-ansid");
                exerciseId = $(this).parent().parent().attr("data-exerciseid");
                var exerciseResult = true;
                yoursStr = $(this).attr("data-arrange");
                exerciseResult = JSON.parse($(this).attr("data-judge")); //用来判断对错
                topicObj.attr({"data-status": exerciseResult});
                if (exerciseResult) {
                    $(this).addClass("true");
                    optionS.addClass("true").unbind("click");
                    ansObj.find(".falseAswer").html("你的答案:" + yoursStr).removeClass("falseAswer").addClass("trueAswer");

                } else {
                    $(this).addClass("false");
                    optionS.addClass("false").unbind("click");
                    ansObj.find(".falseAswer").html("你的答案:" + yoursStr);
                    dwrongData = {
                        "customerId": loginAbout.login.status().userId,
                        "exercisesId": exerciseId,
                        "type": "2",
                        "customerOption": customerOption
                    };
                    //course.applyData("storeWrong",dwrongData);//在题目答错的时候保存这一道错题
                }

                ansObj.addClass("answerAnalysisActive");
                goOnVideobj.unbind("click").bind("click",
                    function () {
                        if(course.browserVerinfoNum!='msie,8.0') {
                            course.video.play();
                        }else {

                        }
                        videoTestObj.hide();
                    });
                topicObj.find(".queShitiOptions").each(function () {
                    $(this).unbind("click").css({
                        "cursor": "default"
                    });
                });
                topicObj.find(".queShitiOptions").each(function(){
                    var lastRe = true;
                    var onR = $(this).hasClass("true");
                    var onW = $(this).hasClass("false");
                    if(onR||onW){
                        lastRe = false;
                    }
                    if(lastRe){
                        $(this).addClass("forbid").find(".answerText").css("color","#aeaeae");
                    }
                });
                $(".hallTestVideoShade").hide();
                textShadeObj.attr({
                    "data-toggle": "false"
                }); //这个属性是用来判断该显示习题还是tab
                var status = exerciseResult ? "1" : "0";
                var iteamQue = [
                    {
                        "answerId": "0",
                        "optionCorrect": topicObj.attr("data-rightop"),
                        "customerOption": customerOption,
                        "answerTime": course.getNowTime(),
                        "exercisesId": topicObj.attr("data-exerciseid"),
                        "status": status
                    }
                ];
                customerOption = "";
                var dRightData = {
                    "customerId": loginAbout.login.status().userId,
                    "exercisesList": JSON.stringify(iteamQue),
                    "type": "10"
                };
                course.applyData("storeWrong", dRightData);//在题目答错的时候保存这一道错题
                course.nowIndex++;
            });

    });
}