/**
 * Created by ALLIN on 2017/3/15.
 */
function courseTest() {
    //在这里有一个开关，就是是否弹出过测试题，如果弹出过，则不再显示，
    var nowTime = Math.floor(course.video.currentTime());
    var topicObj = $("div[data-time=\'" + nowTime + "\']");
    var dialogOnOff = JSON.parse(topicObj.attr("data-showed")); //查看这个题目是否显示过，如果没显示过才会显示
    var testTargetObj = $(".course-main .hallTest_cont");
    var shadeObj = $(".hallTestVideoShade");
    var courseObj = $(".courseCont");
    if (!dialogOnOff) {
        commLog.createBrowse(76,'课程随堂测试',window.location.href)
        commLog.creatEvent({"id":115,"url":window.location.href,"keyword":"课程随堂测试","browseType":"38"});
        $(".singleSelectActive").removeClass("singleSelectActive");
        $(".answerAnalysisActive").removeClass("answerAnalysisActive");
        topicObj.addClass("singleSelectActive").attr({
            "data-showed": "true"
        });
        course.dragNode = topicObj.attr("data-time");
        var collectState = (topicObj.attr("data-collect").length > 0) ? "active" : "";
        $(".hallTestTitle i").each(function () {
            $(this).attr({"class": "collProblems " + collectState});
            if ($(this).hasClass("active")) {
                $(this).find("span").eq(1).html("已收藏");
            } else {
                $(this).find("span").eq(1).html("收藏题目");
            }
        });
        if($('.vjs-control').hasClass('vjs-playing')){
            $('.vjs-play-control').click();
        }
        var pausedOnOff = course.video.paused();
        if (pausedOnOff) {
            var videoObj = $("#example_video_1");
            var fullScreenOnOff = videoObj.hasClass("vjs-fullscreen");
            if (fullScreenOnOff) {
                course.showTest("full");
                course.keyEvent();
                $(".return_pc").unbind("click").bind("click", function () {
                    course.video.cancelFullScreen();
                    course.showTest("small");
                });
                $(".hallTest_cont .Ev-jobSelectorCancel").unbind("click").bind("click", function () {
                    course.showTest("small");
                });
            } else {
                course.showTest("small");
                course.keyEvent();
            }
            courseObj.hide();
            course.testAnswer();
        }
    } else {
        testTargetObj.hide();
        shadeObj.hide();
        courseObj.show();
    }

}