/**
 * Created by ALLIN on 2017/3/14.
 */
 function changeVideo() {
    $(".playIcon").each(function () {
        $(this).unbind("click").bind("click",
            function () {
                var indexNum=$(this).parents('ul li').index()+1;
                commLog.creatEvent({"id":75,"url":window.location.href,"keyword":"课程推荐","browseType":"38","trackLocation":indexNum});
                var url = $(this).attr("data-videourl");
                if ($(this).next().hasClass("lucency")) {
                    window.location.href = "https://" + url+'?sourceType=38';
                } else {
                    window.open("" + url+'?sourceType=38');
                }
            });
    });
}