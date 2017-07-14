/**
 * 功能描述：  消息通用功能
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/29.
 */

var mComm = {
    XHRList: {
        mDelete: '//www.yi-ding.net.cn/call/yiding/customer/message/delete/',
        readed: '//www.yi-ding.net.cn/call/yiding/customer/message/update/',
        num: '//www.yi-ding.net.cn/call/yiding/customer/message/getMapCount/'
    },
    selectDelete: function (deleteCallback) {
        var that = this;
        if (navigator.appVersion.match(/8./i) == "8.") {
            $(".yd-msgListDeleteBtns").hide();
        }
        $(".EV-selectToDelete").off('click').on("click", function () {
            if ($(".yd-msgListPart").hasClass('yd-msgListConfigType')) {
                $(".yd-msgListPart").removeClass('yd-msgListConfigType');
                $(".yd-msgListSelectorAll").hide();
                $(".yd-msgListDeleteBtns").removeClass('show');
                if (navigator.appVersion.match(/8./i) == "8.") {
                    $(".yd-msgListDeleteBtns").hide();
                }
                switch (mComm.pageName()[0]) {
                    case "message_discuss":
                        commLog.creatEvent({"id": 136, "url": location.href, "keyword": "取消讨论我的消息", "browseType": "29",});
                        break;
                    case "message_like":
                        commLog.creatEvent({"id": 137, "url": location.href, "keyword": "取消赞了我的消息", "browseType": "30",});
                        break;
                    case "message_index":
                        commLog.creatEvent({"id": 138, "url": location.href, "keyword": "取消系统消息", "browseType": "27",});
                        break;
                }
                $(this).text("编辑");
            } else {
                $(".yd-msgListPart").addClass('yd-msgListConfigType');
                $(".yd-msgListDeleteBtns").addClass('show');
                if (navigator.appVersion.match(/8./i) == "8.") {
                    $(".yd-msgListDeleteBtns").show();
                }
                switch (mComm.pageName()[0]) {
                    case "message_discuss":
                        commLog.creatEvent({"id": 120, "url": location.href, "keyword": "编辑讨论我的消息", "browseType": "29",});
                        break;
                    case "message_like":
                        commLog.creatEvent({"id": 121, "url": location.href, "keyword": "编辑赞了我的消息", "browseType": "30",});
                        break;
                    case "message_index":
                        commLog.creatEvent({"id": 201, "url": location.href, "keyword": "编辑系统消息", "browseType": "27",});
                        break;
                    case "message_information":
                        commLog.creatEvent({"id":122,"url":window.location.href,"keyword":"编辑动态咨询消息", "browseType": "77"});
                        break;
                }
                $(this).text("取消");
                $('.yd-msgListItem').removeClass('yd-msgListItemDeleteSelected');
                $(".yd-msgListDelete").removeClass("yd-msgListDeleteHasItem").find("span").text("");
                $('.yd-msgListSelectorAll').removeClass('yd-msgListItemDeleteSelected');
                $(".yd-msgListReaded").removeClass('yd-msgListHasReaded');
                $(".yd-msgListReaded span").text("");
                $(".yd-msgListSelectorAll").show();
            }
        });
        //单选
        $(".yd-msgListPart").on("click", ".yd-msgListItem", function (e) {
            if (!$(".yd-msgListPart").hasClass('yd-msgListConfigType')) {
                if ($(e.target).hasClass('checkDiscuss')) {
                    //正文点击不标记已读
                    if (!$(e.target).parent().hasClass('yd-msgListClass')){
                        //已读的不再重复请求
                        if ($(e.target).parents(".yd-msgListItem").find('.newTips').size()!==0){
                            var idArr = $(e.target).parents('.yd-msgListItem').attr('data-id');
                            that.readedResource(idArr, false);
                        }
                    }
                    if (e.target.nodeName.toLowerCase() == 'a') {
                        var discussId = $(e.target).attr('data-discussid');
                    } else if (e.target.nodeName.toLowerCase() == 'p') {
                        var discussId = $(e.target).attr('data-discussid');
                    }
                    comm.maskBackground.show("rgba(0,0,0,.6)");
                    var postData = {
                        "reviewId": discussId,
                        "sortType": "1",
                        "scene": "4",
                        "logoUseFlag": "2",
                        "pageIndex": "1",
                        "pageSize": "10"
                    };
                    postData = {"paramJson": $.toJSON(postData)};
                    $.ajax({
                        url: '//www.yi-ding.net.cn/call/customer/review/json_list/',    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                        data: postData,    //参数值
                        type: "GET",   //请求方式
                        beforeSend: function () {
                            //请求前的处理
                            comm.loading.show();
                        },
                        success: function (req) {
                            //请求成功时处理

                            if (req.responseObject.responseStatus) {
                                comm.loading.hide();
                                // showReview(req, "discuss");
                                disscussLine(req);
                                $(".yd-timelineContent .yd-timelineContentItemBox").eq($(".yd-timelineContent .yd-timelineContentItemBox").length - 1).addClass('last')
                                $(".yd-timelineContent .yd-timelineContentItemBox").eq(0).addClass('first')
                            }
                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    })
                }

            } else {
                if ($(this).hasClass('yd-msgListItemDeleteSelected')) {
                    $(this).removeClass('yd-msgListItemDeleteSelected');
                    $('.yd-msgListSelectorAll').removeClass('yd-msgListItemDeleteSelected');
                } else {
                    $(this).addClass('yd-msgListItemDeleteSelected');
                }
                if ($(".yd-msgListItemDeleteSelected").length !== 0) {
                    $(".yd-msgListDelete").addClass('yd-msgListDeleteHasItem');
                    $(".yd-msgListDelete span").text("(" + $(".yd-msgListItemDeleteSelected").length + ")");
                } else {
                    $(".yd-msgListDelete").removeClass('yd-msgListDeleteHasItem');
                    $(".yd-msgListDelete span").text("");
                }
                if ($(".yd-msgListItemDeleteSelected .newTips").length !== 0) {
                    $(".yd-msgListReaded").addClass('yd-msgListHasReaded');
                    $(".yd-msgListReaded span").text("(" + $(".yd-msgListItemDeleteSelected .newTips").length + ")");
                } else {
                    $(".yd-msgListReaded").removeClass('yd-msgListHasReaded');
                    $(".yd-msgListReaded span").text("");
                }
                that.deleteListItem();
                return false;
            }
        });
        //全选
        $(".yd-msgListSelectorAll span").on('click', function (event) {
            if (!$(this).parent().hasClass('yd-msgListItemDeleteSelected')) {
                $(".yd-msgListItem").addClass("yd-msgListItemDeleteSelected");
                $(this).parent().addClass("yd-msgListItemDeleteSelected");
                $(".yd-msgListDelete").addClass('yd-msgListDeleteHasItem');
                $(".yd-msgListDelete span").text("(" + $(".yd-msgListItem.yd-msgListItemDeleteSelected").length + ")");
                $(".yd-msgListReaded").addClass('yd-msgListHasReaded');
                $(".yd-msgListReaded span").text("(" + $(".yd-msgListItemDeleteSelected .newTips").length + ")");
            } else {
                $(".yd-msgListItem").removeClass("yd-msgListItemDeleteSelected");
                $(this).parent().removeClass("yd-msgListItemDeleteSelected");
                $(".yd-msgListDelete").removeClass('yd-msgListDeleteHasItem');
                $(".yd-msgListReaded").removeClass('yd-msgListHasReaded');
                $(".yd-msgListDelete span").text("");
                $(".yd-msgListReaded span").text("");
            }
            that.deleteListItem(deleteCallback);
        });
    },
        pageName: function ()
        {
        var a = location.href;
        var b = a.split("/");
        var c = b.slice(b.length-1, b.length).toString(String).split(".");
        return c.slice(0, 1);
        },
    // 点击删除
    deleteListItem: function (deleteCallback) {
        var that = this;
        var data = {};
        var idArr = [];
        $(".yd-msgListDelete").off('click').on('click', function (event) {
            switch (mComm.pageName()[0]) {
                case "message_discuss":
                    commLog.creatEvent({"id": 131, "url": location.href, "keyword": "删除讨论我的消息", "browseType": "29",});
                    break;
                case "message_like":
                    commLog.creatEvent({"id": 132, "url": location.href, "keyword": "删除赞了我的消息", "browseType": "30",});
                    break;
                case "message_index":
                    commLog.creatEvent({"id": 200, "url": location.href, "keyword": "删除系统消息", "browseType": "27",});
                    break;
                case "message_information":
                    commLog.creatEvent({"id":133,"url":window.location.href,"keyword":"删除动态咨询消息","browseType": "77"});
                    break;
            }
            var num = $(".yd-msgListItemDeleteSelected").length;
            if(num==0){
                return;
            }
            if($('.yd-msgListSelectorAll').hasClass('yd-msgListItemDeleteSelected')){
                num-=1;
            }
            $(".yd-msgListItemDeleteSelected").each(function (index, el) {
                idArr.push($(this).attr("data-id"));
            })
            comm.confirmBox({
                title: "确定删除该" + (num === 1 ? '' : num) + "条消息吗？",
                content: "删除后将无法恢复",
                cancel: "取消",
                ensure: "删除",
                cancelCallback: function () {
                    return false;
                },
                ensureCallback: function () {
                    $.ajax({
                        url: that.XHRList.mDelete,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON({
                                idList: idArr.join(","),
                                isValid: 0
                            })
                        },
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {
                            // console.log("success");
                            if (data.responseObject.responseStatus) {
                                popup({
                                    text: "删除成功！"
                                });
                                $(".yd-msgListItem.yd-msgListItemDeleteSelected").remove();
                                $(".yd-msgListDelete").removeClass('yd-msgListDeleteHasItem');
                                $(".yd-msgListDelete span").text("");
                                $(".yd-msgListPart").removeClass('yd-msgListConfigType');
                                $(".yd-msgListSelectorAll").hide();
                                $(".yd-msgListSelectorAll").removeClass('yd-msgListItemDeleteSelected');
                                $(".yd-msgListDeleteBtns").removeClass('show');
                                if (navigator.appVersion.match(/8./i) == "8.") {
                                    $(".yd-msgListDeleteBtns").hide();
                                }
                                $('.EV-selectToDelete').text("编辑");
                                deleteCallback&&deleteCallback();
                                comm.loading.hide();
                                if($(".yd-msgListItem").length==0){
                                    window.location.reload();
                                }
                            }
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });
                }
            });
        });
    },
    //标为已读
    tipsReaded: function () {
        var that = this;
        var idArr = [];
        $(".yd-msgListReaded").off("click").on("click", function () {
            /*125-标记已读讨论我的消息
             126-标记已读赞了我的消息
             128-标记已读动态咨询消息*/
            function pageName()
            {
                var a = location.href;
                var b = a.split("/");
                var c = b.slice(b.length-1, b.length).toString(String).split(".");
                return c.slice(0, 1);
            }
            switch (pageName()[0]){
                case "message_discuss":
                    commLog.creatEvent({"id":125,"url":location.href,"keyword":"标记已读讨论我的消息","browseType":"29"});
                    break;
                case "message_like":
                    commLog.creatEvent({"id":126,"url":location.href,"keyword":"标记已读赞了我的消息","browseType":"30"});
                    break;
                case "message_information":
                    commLog.creatEvent({"id":128,"url":location.href,"keyword":"标记已读动态咨询消息","browseType":"77"});
                    break;
                default:
                    break;
            }
            if(!$(this).hasClass("yd-msgListHasReaded")){
                return false;
            }
            $(".yd-msgListItemDeleteSelected .newTips").each(function (index, el) {
                idArr.push($(this).parents('.yd-msgListItem').attr("data-id"));
                that.readedResource(idArr, true);
            })
            $(".yd-msgListPart").removeClass('yd-msgListConfigType');
            $(".yd-msgListSelectorAll").hide();
            $(".yd-msgListDeleteBtns").removeClass('show');
            if (navigator.appVersion.match(/8./i) == "8.") {
                $(".yd-msgListDeleteBtns").hide();
            }
            $('.EV-selectToDelete').text("编辑");
            $(".yd-msgListItem").removeClass('yd-msgListItemDeleteSelected');
            $(".yd-msgListDelete").removeClass("yd-msgListDeleteHasItem").find("span").text("");
        })
    },
    readedResource: function (id, type) {
        var that = this;
        if (type) {
            $.ajax({
                url: that.XHRList.readed,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        idList: id.join(","),
                        isValid: 0,
                        isRead: 1
                    })
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {
                    // console.log("success");
                    if (data.responseObject.responseStatus) {
                        popup({
                            text: "标记已读成功！"
                        });
                        $(id).each(function (index, el) {

                            $(".yd-msgListItem[data-id='" + el + "']").find(".newTips").remove();
                            $(".yd-msgListReaded").removeClass('yd-msgListHasReaded');
                            $(".yd-msgListReaded span").text("");
                        })
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });
        } else {
            $.ajax({
                url: that.XHRList.readed,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        idList: id,
                        isValid: 0,
                        isRead: 1
                    })
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {
                    // console.log("success");
                    if (data.responseObject.responseStatus) {
                        $(".yd-msgListItem[data-id='" + id + "']").find(".newTips").remove();
                        $(".yd-msgListReaded").removeClass('yd-msgListHasReaded');
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });
        }

    },
    //资源数
    resourceNum: function () {
        $.ajax({
            url: this.XHRList.num,
            type: 'get',
            dataType: 'json',
            data: {
                paramJson: $.toJSON({
                    customerId: localStorage.getItem('userId'),//localStorage.getItem("userId"),
                })
            },
            timeout: 10000,
            beforeSend: function () {
                comm.loading.show();
            }
        })
            .done(function (data) {
                // console.log("success");

                if (!$.isEmptyObject(data.responseObject.responseData)) {
                    var dataList = data.responseObject.responseData.data_list[0];

                    if (dataList.reviewNum != 0) {
                        $("#al-headerTopNav li").eq(0).append("<span class='yd-newsNum'>" + (parseInt(dataList.reviewNum) > 99 ? '...' : dataList.reviewNum) + "</span>");
                    }
                    if (dataList.preferNum != 0) {
                        $("#al-headerTopNav li").eq(1).append("<span class='yd-newsNum'>" + (parseInt(dataList.preferNum) > 99 ? '...' : dataList.preferNum) + "</span>");
                    }
                    if (dataList.sysNum != 0) {
                        $("#al-headerTopNav li").eq(3).append("<span class='yd-newsNum'>" + (parseInt(dataList.sysNum) > 99 ? '...' : dataList.sysNum) + "</span>");
                    }
                }
                comm.loading.hide();
            })
            .fail(function () {
                // console.log("error");
                comm.loading.hide();
            });
    }
};
