/**
 * Created by ALLIN on 2017/3/15.
 */
function onPlay() {
    course.video.on("play", function () {
        $(".classThink").hide();
        $(".courseCont").show();
        $(".hallTest_cont").hide();

    });
}