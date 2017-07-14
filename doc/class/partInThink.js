/**
 * Created by ALLIN on 2017/3/15.
 */
function partInThink() {
    //对课后思考题的评论
    $(".discussAllLastThink  .aswer").each(function () {
        $(this).unbind("click").bind("click", function () {
            commLog.creatEvent({"id":70,"url":window.location.href,"keyword":"课后题回复呼出讨论","browseType":"38"});
            var isThis = $(this);
            course.judge(function () {
                var options = {
                    container: isThis.parent(),
                    refId: course.courseId,
                    position: "after",
                    parentid: "0",
                    refBelongId: isThis.attr("data-thinkid"),
                    callBack: function () {

                    }
                };
                talk.about = "course";
                talk.public(options);
            }, true);
        })
    });
}