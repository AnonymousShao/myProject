/**
 * Created by ALLIN on 2017/3/15.
 */
function changeHSVideo() {
    var hdUrl = $(".course-video").attr("data-videoHD");
    var sdUrl = $(".course-video").attr("data-videoSD");
    var index = course.video;
    var nowTime = index.currentTime();
    var type = "video/mp4";
    $(".vjs-menu-item").each(function () {
        $(this).unbind("click").bind("click",
            function () {
                var hdStr = $(this).text();
                $(".vjs-menu-item").removeClass("vjs-selected");
                $(this).addClass("vjs-selected");
                var hdOnOff = (hdStr == "高清") ? true : false;
                if (hdOnOff) {
                    commLog.creatEvent({"id":187,"url":window.location.href,"keyword":"课程终端页-高清","browseType":"38"});
                    index.src({
                        type: type,
                        src: hdUrl
                    });

                } else {
                    commLog.creatEvent({"id":188,"url":window.location.href,"keyword":"课程终端页-标清","browseType":"38"});
                    index.src({
                        type: type,
                        src: sdUrl
                    });
                }
                course.video.currentTime(nowTime);
            })
    });
}