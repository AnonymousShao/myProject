/**
 * Created by ALLIN on 2017/3/15.
 */
function onEnded() {
    course.video.on("ended", function () {
        clearInterval(course.videotimer);
        course.videotimer = null;
        var courseObj = $(".courseCont");
        if (loginAbout.login.status().state && !course.videoEnd) {
            course.videoEnd = true;
            course.again = false;
            var videoTimeData = {
                "customerId": loginAbout.login.status().userId,
                "courseId": course.courseId,
                "courseName": "",
                "videoId": course.videoId,
                "typeId": "1",
                "isFinish": "1",
                "playTime": Math.floor(course.videoTime),
                "isValid": "",
                "visitSiteId": "",
                "maxPlayTime": Math.floor(course.videoTime),
                "maxIsFinish": "1"
            };
            videoTimeData = {
                "paramJson": $.toJSON(videoTimeData)
            };
            $.ajax({
                url: "//www.yi-ding.net.cn/call/customer/video/play/create/",
                //请求的url地址
                dataType: "json",
                //返回格式为json
                async: true,
                //请求是否异步，默认为异步，这也是ajax重要特性
                data: videoTimeData,
                //参数值
                type: "GET",
                //请求方式
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (req) {
                    //请求成功时处理
                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        }
        if ($(".classThink").length > 0) {
            $(".classThink").show();
            course.answerThink();
            courseObj.hide();
            $(".classThinkClose").unbind("click").bind("click", function () {
                commLog.creatEvent({"id":117,"url":window.location.href,"keyword":"课后思考题关闭","browseType":"38"});
                $(".classThink").hide();
                courseObj.show();
            })
        }
        var fullScreenOnOff = $("#example_video_1").hasClass("vjs-fullscreen");
        if(fullScreenOnOff){
            $('.vjs-fullscreen-control').click();
        }
        $('.course-video .courseVideoPupop').remove();
        var courseVideoPupopStr='<section class="courseVideoPupop" style="background-color:rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000,endColorstr=#99000000);">'+
            '                    <ul>'+
            '                        <li class="repeat">'+
            '                            <i></i>'+
            '                            <span>重播</span>'+
            '                        </li>'+
            '                        <li class="learnNext">'+
            '                            <i></i>'+
            '                            <span>学习下一课</span>'+
            '                        </li>'+
            '                    </ul>'+
            '                </section>';
        $('.course-video').append(courseVideoPupopStr);
        var textThink=$('.classThink .courseThinkNext').text();
        $('.classThink .courseThinkNext').hide();
        if(textThink=='没有课程了，离开'){
            $('.course-video .courseVideoPupop li').eq(1).removeClass('learnNext').addClass('courseNone');
        }
        $('.course-video .courseVideoPupop li').eq(1).find('span').text(textThink);
        if(course.browserVerinfoNum!='msie,8.0') {
            course.video.pause();
        }else {
            // $('.vjs-play-control').click();
        }
        $('.course-video .courseVideoPupop .repeat').off('click').on('click',function (e) {
            e.stopPropagation();
            e.preventDefault();
            $('.course-video .courseVideoPupop').remove();
            if(course.browserVerinfoNum!='msie,8.0') {
                course.video.play();
            }else {
                $('.vjs-play-control').click();
            }
        })
        $('.course-video .courseVideoPupop li').eq(1).off('click').on('click',function () {
            window.location.href=course.nextCourse;
        })
        if ($(".coursePc-coll").find(".join-course").length == 1) {
            comm.confirmBox({
                "title": "您还未加入系列课程",
                "content": "将无法记录您的完整学习历史",
                "cancel": "暂不加入",
                "ensure": "加入系列课程",
                "ensureCallback": function () {
                    commLog.creatEvent({
                        "id": 58,
                        "url": window.location.href,
                        "keyword": "课程终端页弹窗加入系列课程",
                        "browseType": "38",

                    });
                    $(".courseQution-pc").show();
                    $(".join-course").hide();
                    var postData = {
                        customerId: loginAbout.login.status().userId,
                        joinType: 1,
                        refId: course.seriesId,
                    };
                    course.applyData("partInCourse", postData);

                },
                "cancelCallback": function () {

                }
            });
        }
    });
}