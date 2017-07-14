/**
 * Created by ALLIN on 2017/3/15.
 */
function toggleExer(newtime, maxtime) {
    var currentTime = (parseInt(newtime) != 0) ? newtime : 0;
    if (currentTime != 0)
        $(".catalogIte").each(function () {
            var isNowTime = parseInt($(this).attr("data-node"));
            if (isNowTime < currentTime) {
                $(this).addClass("read");
            }
            if (isNowTime > currentTime) {
                $(this).prev().addClass("active");
                return false;
            }
        });
    $(".queite").each(function () {
        var isNowTime = parseInt($(this).attr("data-time"));
        if (isNowTime < maxtime) {
            $(this).attr({"data-showed": "true"});
        }
        if (isNowTime < newtime) {
            course.nowIndex = parseInt($(this).attr("data-nowqueindex"));
            course.nowIndex++;
        }

    });

}