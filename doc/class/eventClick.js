/**
 * Created by ALLIN on 2017/3/15.
 */
function eventClick() {
    if($('.loginGo').length>0){
        $('.loginGo').off('click').on('click',function () {
            commLog.creatEvent({"id":141,"url":window.location.href,"keyword":"课程页讨论去登录","browseType":"38"});
        })
    }

    if(window.location.href.indexOf('class=true')>0&&loginAbout.login.status().userId){
        $(".course-tab li").eq(1).trigger("click");
    }
    $('.al-search').off('click').on('click',function () {
        commLog.creatEvent({"id":33,"url":window.location.href,"keyword":"课程终端点击搜索","browseType":"38"});
    })
    $('.vjs-control-bar').append("<div class=\'videoSign2\' style=\"position: absolute;height: 20px;z-index: 1;width: 100%;top:-10px;right: 0\"></div>")
    $('.vjs-control-bar .videoSign2').off('click').on('click',function () {
        $('#example_video_1 .videoSign1').remove();
        $('#example_video_1').append("<section class=\'videoSign1\'>未完整观看不能随意快进</section>")
        setTimeout(function () {
            $('#example_video_1 .videoSign1').remove();
        },1000)
    })
    $('#notLogin').off('click').on('click',function () {
        if($('.vjs-control').hasClass('vjs-playing')){
            $('.vjs-play-control').click();
        }
    })
    $('.course-video').off('click').on('click',function () {
        if($('.vjs-control').hasClass('vjs-paused')){
            course.courseLook(0,course.videoInit);
        }else {
            course.videoInit=Math.floor(course.videoTime);
        }
    })
    $('.vjs-play-control').off('click').on('click',function () {
        if($('.vjs-control').hasClass('vjs-playing')){
            course.courseLook(0,course.videoInit);
        }else {
            Math.floor(course.videoTime)
        }
    })
}