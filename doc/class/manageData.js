/**
 * Created by ALLIN on 2017/3/15.
 */
function manageData(type, data) {
    var realData = data.responseObject.responseData.data_list;
    var realNoData = ((data.responseObject.responseMessage) == "NO DATA") ? true : false;
    var realStatus = data.responseObject.responseStatus;
    switch (type) {
        case "point":
            if (realNoData || !realStatus) {
                return false;
            } else {
                var timeDot = data.responseObject.responseData.data_list[0].courseNodeList;
                course.videoId = data.responseObject.responseData.data_list[0].videoId;
                course.videoDuringTime = data.responseObject.responseData.data_list[0].videoPlayTime;
                var joinOnOff = data.responseObject.responseData.data_list[0].seriesJoin;
                var nextCourse = data.responseObject.responseData.data_list[0].nextMap;
                var seriesId = data.responseObject.responseData.data_list[0].seriesId
                course.seriesId = seriesId;
                if(loginAbout.login.status().state){
                    this.courseStudy();
                }
                if ($.isEmptyObject(joinOnOff)) {
                    if ($(".coursePc-coll").find(".join-course").length == 0) {
                        $(".coursePc-coll").append("<li class=\"join-course\">加入系列课程</li>");
                    }
                    course.partInCourse();
                } else {
                    var joinState = joinOnOff.isValid == "1";
                    if (joinState) {
                        $(".courseQution-pc").show();//显示提问
                        $(".join-course").hide();
                    } else {
                        if ($(".coursePc-coll").find(".join-course").length == 0) {
                            $(".coursePc-coll").append("<li class=\"join-course\">加入系列课程</li>");
                        }
                        course.partInCourse();
                    }
                }
                if ($.isEmptyObject(nextCourse)) {
                    course.nextCourse="https://www.yi-ding.net.cn/"+'?sourceType=38';
                    $(".courseThinkNext").html("没有课程了，离开").unbind("click").bind("click", function () {
                        window.location.href = "https://www.yi-ding.net.cn/"+'?sourceType=38';
                    })
                } else {
                    course.nextCourse="https://" + nextCourse.nextPageStoragePath+'?sourceType=38';
                    $(".courseThinkNext").unbind("click").bind("click", function () {
                        commLog.creatEvent({"id":116,"url":window.location.href,"keyword":"课后思考题学习下一课","browseType":"38"});
                        window.location.href = "https://" + nextCourse.nextPageStoragePath+'?sourceType=38';
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
                            var exerciseId = timeDot[dotNum].exercisesList[0].exercisesId;
                            var exerciseCollectState = timeDot[dotNum].exercisesList[0].exercisesCollection.isValid;
                            var collectId = (exerciseCollectState == "1") ? timeDot[dotNum].exercisesList[0].exercisesCollection.id : "";
                            exp = exerciseIte.exercisesAnswerDesc+course.creatQueImg(exerciseIte.exercisesDescAtt);
                            title = exerciseIte.exercisesName+course.creatQueImg(exerciseIte.exercisesNameAtt);
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
                                inopIte = timeDot[dotNum].exercisesList[0].optionList[opNum].optionName+course.creatQueImg(timeDot[dotNum].exercisesList[0].optionList[opNum].optionDescAtt);
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
                                exerciseStr += "<div class=\"checkbox queite\" data-collect=\"" + collectId + "\" data-collect=\"" + exerciseCollectState + "\"   data-time=\"" + list[dotNum].iteam + "\" data-rightOp = \"" + rightOp + "\" data-type=\"" + dataType + "\"  data-exerciseId=\"" + exerciseId + "\"   data-status=\"none\" data-nowqueindex=\"" + dotIndex + "\" data-showed=\"false\">" + "<div class=\"hTestProblems\"><span>" + typeName + "</span>" + title+ "</div>" + "<ul class=\"hTestAnswer\">" + optionStr + "</ul>" + "<div class=\"confirmBtn\">确认</div>" + "</div>" + "<div class=\"answerAnalysis\" data-nowansindex=\"" + dotIndex + "\">" + "<div class=\"answerATitle\"><span>答案解析</span></div>" + "<div class=\"aswerDisplay\"><span class=\"trueAswer\">正确答案：" + rightStr + "</span><span class=\"falseAswer\">答案：B</span></div>" + "<div class=\"aAnalysis_text\">" + exp + "</div>" + "<div class=\"knowledgePoint\"><div class=\"title " + knoStrClass + "\">知识点：</div><ul class=\"knowledgeList clear\">" + knoStr + "</ul>" + "</div>" + "</div>";
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
                thinkContainer.html(thinkStr);
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
                    testContainer.after(exerciseStr);
                    $(".queImgAlert").each(function(){
                        $(this).unbind("click").bind("click",function(e){
                            e.stopPropagation();
                            var imgData = JSON.parse($(this).parent().attr("data-imgbox"));
                            var nowIndex = parseInt($(this).index())+1;
                            creatCarousel.creatHtml(imgData,nowIndex,"0");
                            $(".swiper_right").hide();
                        })
                    });
                }
                course.dotConfig = {
                    "width": timeWidth,
                    "list": list
                };
                course.histortinit();
            }
            break;
        case "histroyTime":
            if (realNoData || !realStatus) {
                course.dragNode = course.dotConfig.list[0].iteam;
                var vedioMaxTime=localStorage.getItem('vedioMaxTime');
                if(vedioMaxTime<=180){
                    course.video.currentTime(vedioMaxTime);
                    course.videoInit=vedioMaxTime;
                }
                if($('.authentication-out').length==0){
                    if(course.browserVerinfoNum!='msie,8.0') {
                        course.video.play();
                    }else {

                    }
                }else {
                    if($('.vjs-control').hasClass('vjs-playing')){
                        $('.vjs-play-control').click();
                    }
                }
                course.videoFn.showDot(); //视频锚点初始化是在这里开始的
                course.videoFn.showSubway();//显示目录节点
                course.timeUpdata(0);
                return false;
            } else {
                var nowTime = realData[0].maxVideoPlay.playTime;
                var currentTime = (parseInt(realData[0].newVideoPlay.playTime) == parseInt(course.secondVideoTime)) ? 0 : realData[0].newVideoPlay.playTime;
                course.videoFn.nowTime = nowTime;
                course.historyIsfinish=realData[0].maxVideoPlay.isFinish;
                course.historyCurtten=realData[0].newVideoPlay.isFinish;
                if (parseInt(realData[0].maxVideoPlay.isFinish) == 1) {
                    if((typeof course.video.disableProgress)=="function"){
                        localStorage.removeItem("reload");
                    }else{
                        if(localStorage.getItem("reload")){

                        }else{
                            window.location.reload();
                            localStorage.setItem("reload","1");
                        }

                    }

                }
                course.histroyOnOff = true;
                course.dragNode = nowTime;
                if(localStorage.getItem('vedioMaxTime')!=180){
                    if(localStorage.getItem('vedioMaxTime')<=currentTime){
                        if(Math.abs(currentTime-course.video.duration())<1){
                            course.video.currentTime(0);
                        }else if(localStorage.getItem('vedioMaxTime')<=1){
                            course.video.currentTime(currentTime);
                            course.videoInit=currentTime;
                        }else {
                            course.video.currentTime(localStorage.getItem('vedioMaxTime'));
                            course.videoInit=localStorage.getItem('vedioMaxTime');
                        }
                    }else {
                        if(Math.abs(currentTime-course.video.duration())<1){
                            course.video.currentTime(0);
                        }else {
                            course.video.currentTime(currentTime);
                            course.videoInit=currentTime;
                        }
                    }
                }else {
                    course.video.currentTime(180);
                    course.videoInit=180;
                }
                if(course.historyIsfinish==1){
                    $('.vjs-control-bar .videoSign2').width(0+'%');
                }else {
                    $('.vjs-control-bar .videoSign2').width((98-(nowTime/course.video.duration())*100)+'%');
                }

                if($('.authentication-out').length==0){
                    if(course.browserVerinfoNum!='msie,8.0') {
                        course.video.play();
                    }else {

                    }
                }else {
                    if($('.vjs-control').hasClass('vjs-playing')){
                        $('.vjs-play-control').click();
                    }
                }
                course.videoFn.showDot(); //视频初始化是在这里开始的
                course.videoFn.showSubway();//显示目录节点
                course.toggleExer(currentTime, nowTime);
                course.perveTime.push(nowTime);
                course.timeUpdata(nowTime);
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
                    videoStr += "<li>" + "<div class=\"reImg\"><img src=\"" + imgSrc + "\">" + "<div class=\"playIcon\" data-videoUrl='" + videoUrl + "' data-videoId='" + videoId + "'><i class=\"playIconImg\"></i></div>" + "<div class=\"" + allinStr + "\"></div>" + "<div class=\"timeNum\">" + playTime + "</div></div>" + "<div class=\"reText\">" + reName + "</div>" + "</li>";
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
                    var reviewNum = realData[thinkNum].reviewNum;
                    var pre = realData[thinkNum].preferNum;
                    var preStr = "";
                    if(pre=="0"){
                        preStr = "点赞";
                    }else{
                        preStr = talk.toWK(pre);
                    }
                    var reviewStr = "";
                    if(reviewNum=="0"){
                        reviewStr = "回答";
                    }else{
                        reviewStr = talk.toWK(reviewNum);
                    }
                    var selectClass = (realData[thinkNum].customerPrefer.preferNum=="0")?"selected":"";
                    var selectId = (realData[thinkNum].customerPrefer.preferNum=="0")?realData[thinkNum].customerPrefer.id:"";
                    thinkStr += '<li class="clear" data-thinkId="' + exerciseId + '">' + '<div class="clear"><div class="discussThink">' + title + '</div><i class="icon-upMore ev-icon-upMore" style="display: none;"><span>展开</span></i></div>' + '<div class="clear discussAnswerS">' + '<div class="disscussFunction clear">' + '<div class="aswer" data-thinkId="' + exerciseId + '"><i></i><span>'+reviewStr+'</span></div>' + '<div class="praise" data-thinkId="' + exerciseId + '"><i data-praiseid=\"'+selectId+'\" class=\"'+selectClass+'\"></i><span>'+preStr+'</span></div>' + '</div>' + '</div>' + '</li>';
                }
                $(".discussAllLastThink").html(thinkStr);
                course.partInThink();
                talk.partInDiss();
            }
            break;
        case "collectCourse":
            $(".courseColl-pc").attr("data-collectId", data.responseObject.responsePk);
            break;
        default:
            break;
    }
}