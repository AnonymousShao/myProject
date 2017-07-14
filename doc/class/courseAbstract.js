/**
 * Created by ALLIN on 2017/3/14.
 */
function courseAbstract() { //点击展开收缩
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
}