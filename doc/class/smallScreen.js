/**
 * Created by ALLIN on 2017/3/15.
 */
function smallScreen() {
    if(course.browserVerinfoNum!='msie,8.0'){

        $(document).unbind("scroll").bind("scroll", function () {
            var isChange = $(".course-video").data("isChange");
            var videoContainer = $(".course-video");
            var courseObj = $(".course-main");
            if (!comm.browser.msie) {
                var sH=videoContainer.offset().top;
                if ($(document).scrollTop() > 150) {
                    if($('.course-video .courseVideoPupop').length>0){
                        $('.course-video .courseVideoPupop').hide();
                    }
                    videoContainer.addClass("course-video-fixed");
                    courseObj.addClass("course-main-fixed");
                    $("#example_video_1").css({"height": "194px", "width": "344px"});
                    $(".vjs-control-bar").hide();
                } else{
                    if($('.course-video .courseVideoPupop').length>0){
                        $('.course-video .courseVideoPupop').show();
                    }
                    $(".vjs-control-bar").show();
                    videoContainer.removeClass("course-video-fixed")
                    $("#example_video_1").css({"height": "422px", "width": "750px"});

                }
            }

        });
    }
}