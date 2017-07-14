/**
 * Created by ALLIN on 2017/3/15.
 */
 function courseware() {
    $(".classDown .maxWidth li").each(function () {
        $(this).unbind("click").bind("click", function () {
            window.open($(this).attr("data-atturl")+'?sourceType=38', "_blank");
        })
    })
}