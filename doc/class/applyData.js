/**
 * Created by ALLIN on 2017/3/14.
 */
function applyData(type, data) {
    var postData = {paramJson: $.toJSON(data)};
    var postType = "POST";
    var postPort = "";
    switch (type) {
        case "point":
            postPort = '//www.yi-ding.net.cn/call/cms/series/course/baseinfo/getMapById/';
            break;
        case "partInCourse":
            postPort = '//www.yi-ding.net.cn/call/yiding/customer/join/create/';
            break;
        case "recommend":
            postPort = '//www.yi-ding.net.cn/call/recommend/resource/item/getMapList/';
            break;
        case "classThink":
            postPort = '//www.yi-ding.net.cn/call/cms/series/course/question/getMapList/';
            break;
        case "disscuss":
            postPort = '//www.yi-ding.net.cn/call/customer/review/json_list/';
            break;
        case "collectCourse":
            postPort = '//www.yi-ding.net.cn/call/customer/collection/create/';
            break;
        case "deleteCourse":
            postPort = '//www.yi-ding.net.cn/call/customer/collection/delete/';
            break;
        case "disscussLine":
            postPort = "//www.yi-ding.net.cn/call/customer/review/json_list/";
            break;
        case "storeWrong":
            postPort = "//www.yi-ding.net.cn/call/customer/exercises/updateResult/";
            break;
        case "histroyTime":
            postPort = "//www.yi-ding.net.cn/call/customer/video/play/getTimeByCustomer/";
            break;
        case "courseStudy":
            postPort = "//www.yi-ding.net.cn/call/customer/exercises/position/create/";
            break;
        default:
            break;

    }
    $.ajax({
        url: postPort,
        //请求的url地址
        dataType: "json",
        //返回格式为json
        async: true,
        //请求是否异步，默认为异步，这也是ajax重要特性
        data: postData,
        //参数值
        type: postType,
        //请求方式
        beforeSend: function () {
            //请求前的处理
            comm.loading.show();
        },
        success: function (req) {
            //请求成功时处理
            comm.loading.hide();
            course.manageData(type, req);

        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
}