/**
 * Created by ALLIN on 2017/3/15.
 */
function showTest(type) {
    var testTargetObj = $(".course-main .hallTest_cont");
    var videoTestObj = $(".video-js .hallTest_cont");
    var shadeObj = $(".hallTestVideoShade");
    var courseObj = $(".course-main");
    switch (type) {
        case "full":
            videoTestObj.show();
            testTargetObj.hide();
            if ($(".singleSelectActive").attr("data-status") == "none") {
                shadeObj.show();
            }

            break;
        case "small":
            videoTestObj.hide();
            testTargetObj.show();
            if ($(".singleSelectActive").attr("data-status") == "none") {
                shadeObj.show();
            }
            courseObj.removeClass("course-main-fixed");
            break;
        default:
            break;
    }
}