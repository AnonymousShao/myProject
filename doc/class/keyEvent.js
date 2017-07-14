/**
 * Created by ALLIN on 2017/3/15.
 */
function keyEvent() {
    var ansObj = $(".video-js div[data-nowAnsIndex=\'" + course.nowIndex + "\']");
    var testTargetObj = $(".course-main .hallTest_cont");
    var courseObj = $(".courseCont");
    var shadeObj = $(".hallTestVideoShade");
    var pausedOnOff = course.video.paused();
    //在暂停，按下按键的时候出发题目挪动
    $(document).keyup(function (event) {
        var appendOnOff = event.keyCode == 19 ||event.keyCode == 27  ;
        var ansOnOff = ansObj.css("display") == "block";
        if (appendOnOff && pausedOnOff) {
            var videoObj = $("#example_video_1");
            var fullScreenOnOff = videoObj.hasClass("vjs-fullscreen");
            if (fullScreenOnOff) {
                course.showTest("full");
            } else {
                course.showTest("small");

            }
        }
    });
}