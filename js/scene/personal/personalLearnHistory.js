/**
 * 功能描述：  学习历史
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/17.
 */
$(function () {

    var PersonalLearnHistory = function () {
        var that = this;
        this.XHRList = {
            historyList: "//www.yi-ding.net.cn/call/customer/video/play/getHistoryByCustomerId/",
            deleteHistory: "//www.yi-ding.net.cn/call/customer/video/play/update/"
        };
    };

    PersonalLearnHistory.prototype = {
        init: function () {
            commLog.createBrowse(49, '我的-学习历史', window.location.href);
            setTimeout(function () {
                comm.pcSideModule([{
                    item: "",
                    href: "",
                    active: false
                }, {
                    item: "",
                    href: "",
                    active: false,
                }, {
                    item: "",
                    href: "",
                    active: false
                }]);
            }, 100);

            this.getContentList();
            this.historyDelete();
        },
        template: {
            historyList: function (dataArr) {
                var today = "", yestertoday = "", early = "";
                $(dataArr).each(function (index, el) {
                    var dateStrBefore1 = el.createTime.substr(0, 10); //发布时间
                    var dateStrAfter1 = comm.date.local_time().substr(0, 10); //传入系统时间
                    var dateStrBefore2 = dateStrBefore1.replace(/\-/g, '/');
                    var dateStrAfter2 = dateStrAfter1.replace(/\-/g, '/');

                    var days = 1000 * 60 * 60 * 24;
                    var day1 = Date.parse(dateStrBefore2);
                    var day2 = Date.parse(dateStrAfter2);
                    var d = (day2 - day1) / days;
                    // 今天？昨天？更早
                    if (d == 0) {
                        today += list(el);
                    } else if (d == 1) {
                        yestertoday += list(el);
                    } else {
                        early += list(el);
                    }
                });

                function list(el) {
                    return '<article class="yd-historyTimelineContentItem">' +
                        '<article>' +
                        '<a href="//' + el.storagePath + '?trigger=1&sourceType=49" target="_blank"><span>' + el.courseTitle + '</span></a>' +
                        '<p><span class="category">' + el.subMajorName + '</span><span class="time">' +
                        (el.isFinish == 1 ? '已看完' : (el.playTime < 60 ? '观看不足一分钟' : '还剩' + formatSeconds(el.remainTime))) +
                        '</span></p>' +
                        '</article>' +
                        '</article>';
                }

                function formatSeconds(value) {
                    var hour = 0;
                    var minute = 0;

                    var second = value;
                    if (second > 60) {
                        minute = parseInt(second / 60);
                        second = parseInt(second % 60);
                    }
                    if (minute > 60) {
                        hour = parseInt(minute / 60);
                        minute = parseInt(minute % 60);
                    }
                    return (getTwoLength(hour) + ":" + getTwoLength(minute) + ":" + getTwoLength(second));

                    function getTwoLength(data) {
                        if (data < 10) {
                            return "0" + data;
                        } else {
                            return "" + data;
                        }
                    }
                }

                return {
                    result: (today.length === 0 ? '' : '<section class="yd-historyTimeline Ev-historyTimelineToday">' +
                    '<header class="yd-historyTimelineTitle">' +
                    '今天' +
                    '</header>' +
                    '<section class="yd-historyTimelineContent today">' +
                    today +
                    '</section>' +
                    '</section>') +
                    (yestertoday.length === 0 ? '' : '<section class="yd-historyTimeline">' +
                    '<header class="yd-historyTimelineTitle Ev-historyTimelineYestartoday">' +
                    '昨天' +
                    '</header>' +
                    '<section class="yd-historyTimelineContent yestartoday">' +
                    yestertoday +
                    '</section>' +
                    '</section>' ) +
                    (early.length === 0 ? '' : '<section class="yd-historyTimeline">' +
                    '<header class="yd-historyTimelineTitle Ev-historyTimelineEarly">' +
                    '更早' +
                    '</header>' +
                    '<section class="yd-historyTimelineContent early">' +
                    early +
                    '</section>' +
                    '</section>'),
                    today: today,
                    yestertoday: yestertoday,
                    early: early
                };
            }
        },
        // 获取内容
        getContentList: function () {

            var that = this;
            var data = {
                customerId: localStorage.getItem("userId"),
                visitSiteId: 13,
                pageIndex: 1,
                pageSize: 10,
                type:0
            };
            $.ajax({
                url: this.XHRList.historyList,
                type: 'post',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON(data)
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {
                    // console.log("success");
                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        var dataList = data.responseObject.responseData.data_list;
                        if (dataList.length !== 0) {

                            $(".yd-historyTimelineBox").append(that.template.historyList(dataList).result);
                            that.scrollInit();
                            comm.loading.hide();
                        }
                    } else {
                        $(".yd-noContentTips").show();
                        $(".yd-scrollTips").hide();
                        $(".yd-historyTimelineBox").attr('scrollPagination', 'disabled');
                        comm.loading.hide();
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });
        },
        // 清空历史记录
        historyDelete: function () {
            var that = this;
            $(".yd-clearHistory").on("click", function () {
                commLog.creatEvent({"id":130,"url":window.location.href,"keyword":"删除学习历史","browseType":"49"});
                comm.confirmBox({
                    content: "确定清空学习历史吗？删除后将无法恢复",
                    cancel: "取消",
                    ensure: "清空",
                    ensureCallback: function () {
                        $.ajax({
                            url: that.XHRList.deleteHistory,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                paramJson: $.toJSON({
                                    customerId: localStorage.getItem("userId"),
                                    isDelete: 0
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
                                    var status = data.responseObject.responseStatus;
                                    if (status) {
                                        popup({
                                            text: "删除成功"
                                        });
                                        $(".yd-historyTimelineBox").children().remove();
                                        $(".yd-noContentTips").show();
                                        $(".yd-scrollTips").hide();
                                        $(".yd-historyTimelineBox").attr('scrollPagination', 'disabled');
                                        comm.loading.hide();
                                    } else {
                                        popup({text: "删除失败"});
                                    }
                                }
                                comm.loading.hide();
                            })
                            .fail(function () {
                                // console.log("XHR error...");
                                comm.loading.hide();
                            });
                    }
                });
            });
        },
        // 滚动加载
        scrollInit: function () {
            var that = this;
            this.wNum = 2;
            var data = {
                customerId: localStorage.getItem("userId"),
                visitSiteId: 13,
                pageIndex: this.wNum,
                pageSize: 10
            };
            $('.yd-historyTimelineBox').off("scroll").scrollPagination({
                'contentPage': that.XHRList.historyList,
                'contentData': $.extend(true, data, {
                    pageIndex: function () {
                        return that.wNum++;
                    }
                }),
                'scrollTarget': $(window),
                'heightOffset': 0,
                'delaytime': 1000,
                'type': "get",
                'beforeLoad': function () {
                    comm.loading.show();
                },
                'afterLoad': function () {
                    comm.loading.hide();
                },
                'loader': function (res) {
                    if ($.isEmptyObject(res)) {
                        $(".yd-historyTimelineBox").attr('scrollPagination', 'disabled');
                        return false;
                    } else {
                        if ($.isEmptyObject(res.responseObject.responseData) || (res.responseObject.responseData.data_list && res.responseObject.responseData.data_list.length === 0)) {
                            $(".yd-historyTimelineBox").attr('scrollPagination', 'disabled');
                            $(".yd-scrollTips").text("没有更多了")
                            return false;
                        } else {
                            $(".yd-historyTimelineContent.early").append(that.template.historyList(res.responseObject.responseData.data_list).early);

                        }
                    }
                }
            });
        }
    };

    var personalLearnHistory = new PersonalLearnHistory();
    personalLearnHistory.init();

});
