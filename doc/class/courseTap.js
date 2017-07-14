/**
 * Created by ALLIN on 2017/3/14.
 */
function courseTap() {
    $(".courseBLock").css({
        display: "none"
    }).eq(0).css({
        display: "block"
    });

    $(".course-tab li").unbind("click").bind("click",
        function () {
            var introObj = $(".synopsisFooter");
            var nowScrollObj = $(".discuss-content .discussAllList");
            var index = $(this).index();
            $('.course-tab li p').removeClass("course-active");
            $(this).find('p').addClass("course-active");
            var recommendObj = $(".recommendContainer");
            switch (index) {
                case 0:
                    nowScrollObj.attr("scrollPagination", "disabled");
                    introObj.show();
                    recommendObj.hide();
                    break;
                case 1:
                    nowScrollObj.attr("scrollPagination", "disabled");
                    introObj.hide();
                    recommendObj.show();
                    break;
                case 2:
                    if (nowScrollObj.attr("data-page")) {
                        talk.scrollPage($(".discuss-content .discussAllList"));
                    }
                    nowScrollObj.attr("scrollPagination", "enabled");
                    introObj.hide();
                    recommendObj.hide();
                    break;
            }
            if (index == 2) {
                if (nowScrollObj.attr("data-page")) {
                    talk.scrollPage($(".discuss-content .discussAllList"));
                }
            } else {
                nowScrollObj.attr("scrollPagination", "disabled");
            }
            $(".courseBLock").css({
                display: "none"
            }).eq(index).css({
                display: "block"
            });
        })
}