/**
 * Created by ALLIN on 2017/3/15.
 */
function share() {
    var postData = {
        "sceneType": "3",
        "resourceType": "3",
        "refId": course.courseId,
        "visitSiteId": "13",
        "shareSence": "3"
    };
    postData = {paramJson: $.toJSON(postData)};
    $.ajax({
        url: "//www.yi-ding.net.cn/call/yiding/comm/data/share/getMapList/",
        //请求的url地址
        dataType: "json",
        //返回格式为json
        async: true,
        //请求是否异步，默认为异步，这也是ajax重要特性
        data: postData,
        //参数值
        type: "GET",
        //请求方式
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            //请求成功时处理
            comm.loading.hide();
            if (req.responseObject.responseStatus) {
                var imgUrl = req.responseObject.responseData.data_list[0].share_channel[0].shareImageUrl;
                var h5Url = req.responseObject.responseData.data_list[0].share_channel[0].shareUrl;
                var qqZoneTitle = req.responseObject.responseData.data_list[0].share_channel[2].shareTitle;
                var qqTitle = req.responseObject.responseData.data_list[0].share_channel[3].shareTitle;
                var sinaTitle = req.responseObject.responseData.data_list[0].share_channel[4].shareTitle;
                var qqZoneSummary = req.responseObject.responseData.data_list[0].share_channel[2].shareDesc;
                var sinaSummary = req.responseObject.responseData.data_list[0].share_channel[4].shareDesc;
                var qqSummary = req.responseObject.responseData.data_list[0].share_channel[3].shareDesc;
                var optionShare = {};
                if (imgUrl.length > 0) {
                    optionShare = {
                        url: h5Url,
                        qqTitle: qqTitle,
                        qqZoneSummary: qqZoneSummary,
                        sinaTitle: sinaTitle + "" + sinaSummary,
                        sinaSummary: sinaTitle + "" + sinaSummary,
                        qqZoneTitle: qqZoneTitle,
                        qqSummary: qqSummary,
                        hasH5: true,
                        pic: imgUrl,
                        qqCallback: function () {
                            //qq分享成功回调
                        },
                        qZoneCallback: function () {
                            //qq空间分享成功回调
                        },
                        weiboCallback: function () {
                            //微博分享成功回调
                        }
                    }
                } else {
                    optionShare = {
                        url: h5Url,
                        qqTitle: qqTitle,
                        qqZoneSummary: qqZoneSummary,
                        sinaTitle: sinaTitle + "" + sinaSummary,
                        sinaSummary: sinaTitle + "" + sinaSummary,
                        qqZoneTitle: qqZoneTitle,
                        qqSummary: qqSummary,
                        hasH5: true,
                        qqCallback: function () {
                            //qq分享成功回调
                        },
                        qZoneCallback: function () {
                            //qq空间分享成功回调
                        },
                        weiboCallback: function () {
                            //微博分享成功回调
                        }
                    }
                }


                var share = new ShareAll(optionShare);
            }

        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
}