/**
 * Created by ALLIN on 2017/3/15.
 */
function courseLook(isFinish,playTimeLength) {
    if(localStorage.getItem('userId')){
        var playTime=Math.floor(course.videoTime)-playTimeLength;
        var videoTimeData = {
            "customerId": loginAbout.login.status().userId,
            "courseId": course.courseId,
            "courseName": "",
            "videoId": course.videoId,
            "typeId": "1",
            "isFinish": isFinish,
            "playTime": Math.floor(course.videoTime),
            "isValid": "",
            "visitSiteId": "",
            "maxPlayTime": Math.floor(course.videoTime),
            "maxIsFinish": isFinish,
            "playTimeLength":playTime,
            "isSaveLength":1
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
}