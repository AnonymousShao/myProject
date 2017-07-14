/**
 * Created by ALLIN on 2017/3/15.
 */
function postVideoTime() {
    var finishOnOff = "0";
    if (loginAbout.login.status().state) {
        course.videotimer = setInterval(function () {
                var maxPlayTime;
                if(Math.floor(course.videoTime)>course.maxTime){
                    maxPlayTime=Math.floor(course.videoTime)
                }else {
                    maxPlayTime=course.maxTime;
                }
                var courseName=$('.course-head .yd_c_bg .width92 p').text();
                var videoTimeData = {
                    "customerId": loginAbout.login.status().userId,
                    "courseId": course.courseId,
                    // "courseName": courseName,
                    "courseName":'',
                    "videoId": course.videoId,
                    "typeId": "1",
                    "isFinish": finishOnOff,
                    "playTime": Math.floor(course.videoTime),
                    "isValid": "1",
                    "visitSiteId": "13",
                    "maxPlayTime": maxPlayTime,
                    "maxIsFinish": finishOnOff
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
                    type: "POST",
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
            },
            180000);
    }

}