/**
 * 功能描述：
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by LiChunHui on 2016/7/19.
 */
comm.columnPage = {};

comm.columnPage.getNum = function (options) {
    var defaultOptions = {
        dataType: "", /* video, case, topic, doc */
        numType: "",
        ids: "",
        className: "",
        objectName: ""
    };


    var optionData = $.extend(defaultOptions, options);
    var urlList = {
        "topic": "/mcall/cms/topic/base/json_list/?topicIdList=" + optionData.ids,
        "video": "/mcall/cms/video/json_list/?videoIdList=" + optionData.ids,
        "doc": "/mcall/cms/doc/json_list/?docIdList=" + optionData.ids,
        "case": "/mcall/case/baseinfo/json_list/?caseIdList=" + optionData.ids
    };
    var objectName = {
        "topic": "cms_topic",
        "video": "cms_video",
        "doc": "customer_doc",//接口名称cms_doc 变更为 customer_doc
        "case": "case_baseinfo"
    };
    var itemIdName = {
        "topic": "topicId",
        "video": "videoId",
        "doc": "docId",
        "case": "caseId"
    };

    $.ajax({
        url: urlList[optionData.dataType],
        type: "GET",
        success: function (data) {
            var rst = comm.getResponseResult(data);
            var lis = $("li[itemId]");
            var obj;
            var li;
            var itemId;
            var objItem;
            rst = rst.data_list;
            if (rst) {
                for (var i = 0; i < rst.length; i++) {      // 条目
                    obj = rst[i];
                    if (typeof obj[objectName[optionData.dataType]] != "undefined") {
                        var arr = optionData.className.split(",");
                        objItem = obj[objectName[optionData.dataType]];
                        itemId = objItem[itemIdName[optionData.dataType]];

                        li = lis.filter("[itemId=" + itemId + "]");
                        if (arr.length) {

                            for (var j = 0; j < arr.length; j++) {  // 样式
                                if (arr[j] == "author") {
                                    for (var prop in obj) {
                                        if (prop.indexOf("customer_auth") >= 0) {
                                            li.find(".author").text(obj[prop].lastName + obj[prop].firstName);

                                        }
                                    }
                                } else {

                                    var num = objItem[arr[j]];
                                    if (num > 999) {
                                        num = Math.floor(num / 1000) + "K+";
                                    }
                                    li.find("." + arr[j]).text(num);
                                }
                            }
                        }
                    }
                }
            } else {
                // TODO:无数据
            }
        }
    });

};
