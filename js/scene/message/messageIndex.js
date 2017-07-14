/**
 * 功能描述：  移动端消息首页/PC端系统消息
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/23.
 */

var MessageIndex = function (argument) {
    var that = this;
    this.XHRList = {
        newTips: "//www.yi-ding.net.cn/call/yiding/customer/message/getMapCount/",
        sMsg: "//www.yi-ding.net.cn/call/yiding/customer/message/getMapSystemList/",
        readed: '//www.yi-ding.net.cn/call/yiding/customer/message/update/',
    };
};
MessageIndex.prototype = {
    pageNum:0,
    init: function () {
        var that=this;
        setTimeout(function () {
            loginAbout.login.init({
                "ele":  $(".yd-noContentTips .btn-primary"),
                success: function () {
                    $(".yd-noContentTips").hide();
                    $(".yd-noContentTips .btn-primary").hide();
                    $(".yd-messageHeader").show();
                    if(authentication.keyState().state=='1'||authentication.keyState().state=='2'){
                        location.reload();//刷新页面
                    }
                    authentication.init({
                        type:'trigger',
                        "success": function () {
                            authentication.exit();
                            location.reload();//刷新页面
                        }, reload: true
                    })
                },
            });

            comm.pcSideModule([{
                item: "讨论",
                href: "//www.yi-ding.net.cn/pages/message/message_discuss.html",
                active: false
            }, {
                item: "赞了我的",
                href: "//www.yi-ding.net.cn/pages/message/message_like.html",
                active: false,
            }, {
                item: "动态资讯",
                href: "//www.yi-ding.net.cn/pages/message/message_information.html",
                active: false
            },{
                item: "系统消息",
                href: "//www.yi-ding.net.cn/pages/message/message_index.html",
                active: true
            }]);
            $(".al-mainSidebarList li").removeClass('active').last().addClass('active');
            $("#al-headerTopNav li").show();
            if (localStorage.getItem('userId')){
                that.systemMessage();
            }else{
                $(".yd-noContentTips").show();
                $(".yd-noContentTips .btn-primary").show();
                $(".yd-messageHeader").hide();
            }
            if (!comm.isPC()) {
                that.newTips();
            } else {
                mComm.resourceNum();
            }

        }, 10);


        $(".al-mainSidebarList li").removeClass('active').last().addClass('active');
        commLog.createBrowse(27,'消息-消息列表页');
    },
    template: {

        systemMessageTemplate: function (dataArr) {
            var labelColorleft = dataArr.messageBody.substring(0,dataArr.messageBody.indexOf("【"));
            var labelColorRight = dataArr.messageBody.substring(dataArr.messageBody.indexOf("】")+1,dataArr.messageBody.length-1);
            var labelColor = "";
            var messageBodyStr ="";
            if((dataArr.messageBody.indexOf("【")>-1)&&(dataArr.messageBody.indexOf("】")>-1)){
                labelColor = dataArr.messageBody.substring(dataArr.messageBody.indexOf("【"),dataArr.messageBody.indexOf("】")+1);
                messageBodyStr = labelColorleft+"<span style=\'color:#748FAA;\'>"+labelColor+"</span>"+labelColorRight
            }else{
                messageBodyStr = dataArr.messageBody;
            }
            /*if(dataArr.messageBody.length>0||dataArr.messageName.length>0){*/
                return '<section class="yd-msgListItem" data-id="'+dataArr.id+'">' +
                    '<figure class="yd-msgRemindIcon">' +
                    '<i class="icon-system"></i>' + (dataArr.isRead == 0 ? '<i class="newTips"></i>' : '') +
                    '</figure>' +
                    '<article class="yd-msgRemindContent">' +
                    '<h2 class="yd-msgRemindTitle">' +
                    dataArr.messageName + '<span class="yd-msgRemindTime">' + comm.date.diffDay_one(dataArr.createTime.substr(0, 19), comm.date.local_time()) + '</span>' +
                    '</h2>' +
                        /*                '<p class="yd-msgRemindContentTextHide">' +
                         '查看详情<i class="icon-messageMore"></i>' +
                         '</p>' +*/
                    '<a class="yd-msgRemindContentText" href="'+(dataArr.pageStoragePath.length===0?'javascript:void(0)':dataArr.pageStoragePath+"?sourceType=27")+'">' +
                    messageBodyStr +
                    (dataArr.pageStoragePath.length===0?'':'<i class="icon-msgItemArrow"></i>') +
                    '</a>' +
                    '</article>' +
                    '</section>';
           /* }*/

        },
    },
    tipsReaded:function () {
        var that=this;
        var id="";
        $(".yd-msgListItem").each(function (index,ele) {
           id+=$(ele).attr('data-id')+",";
        });
        $.ajax({
            url: this.XHRList.readed,
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
                comm.loading.hide();
            })
            .fail(function () {
                // console.log("XHR error...");
                comm.loading.hide();
            });
    },
    systemMessage: function () {
        var that = this;
        function fn() {
            $.ajax({
                url: that.XHRList.sMsg,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        customerId: localStorage.getItem('userId'),//localStorage.getItem("userId"),
                        pageIndex: 1,
                        pageSize: 10
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
                        var dataList = data.responseObject.responseData.data_list;
                        if (dataList.length !== 0) {
                            if($(".yd-msgListItem").length==0){
                                $('.yd-msgListPart').attr({"data-page":"1"});
                            }
                            $(dataList).each(function (index, el) {
                                $(".Ev-msgRemindBox").append(that.template.systemMessageTemplate(el));
                            });
                            that.tipsReaded();
                        }
                        that.scrollInit();
                    } else {
                        $(".yd-noContentTips").show();
                        $(".yd-messageHeader").hide();
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });
        }
        fn();
        mComm.selectDelete(function () {
            if ($(".yd-msgListItem").size()===0){
                fn();
            }else{
                return;
            }
        });
        mComm.tipsReaded();
    },
    newTips: function () {
        $.ajax({
            url: this.XHRList.newTips,
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
                        $("#Ev-discussEntra .yd-newsNum").show().text(dataList.reviewNum > 99 ? "..." : dataList.reviewNum);
                    }
                    if (dataList.preferNum != 0) {
                        $("#Ev-likeEntra .yd-newsNum").show().text(dataList.preferNum > 99 ? "..." : dataList.preferNum);
                    }
                } else {
                    $(".yd-noContentTips").show();
                }
                comm.loading.hide();
            })
            .fail(function () {
                // console.log("error");
                comm.loading.hide();
            });
    },
    scrollInit: function () {
        var that = this;
        var container = $('.yd-msgListPart');
        var scrollOption = {
            /*请求地址*/
            'contentPage': that.XHRList.sMsg,
            /*refid习题id*/
            'contentData': $.extend({
                customerId: localStorage.getItem("userId"),
                pageIndex: 1,
                pageSize: 10
            }, {
                pageIndex: function () {
                    var isPage = parseInt(container.attr("data-page"));
                    isPage++;
                    container.attr({"data-page":isPage});
                    return isPage;
                }
            }),
            'scrollTarget': $(window),
            'heightOffset': 0,
            'delaytime': 1000,
            'type': "post",
            'beforeLoad': function () {
                comm.loading.show();
            },
            'afterLoad': function (elementsLoaded) {
                comm.loading.hide();
            },
            'loader': function (res) {
                if ($.isEmptyObject(res)) {
                    $(".yd-msgListPart").attr('scrollPagination', 'disabled');
                    return false;
                } else {
                    if ($.isEmptyObject(res.responseObject.responseData) || (res.responseObject.responseData.data_list && res.responseObject.responseData.data_list.length === 0)) {
                        $(".yd-msgListPart").attr('scrollPagination', 'disabled');
                        if ($(".yd-msgListItem").size()===0){
                            $(".yd-noContentTips").show();
                            $(".EV-selectToDelete").hide();
                        }
                        return false;
                    } else {
                        // dataArr.messageBody.length>0||dataArr.messageName.length>0
                        var dataList = res.responseObject.responseData.data_list;
                        $(dataList).each(function (index, el) {
                            $(".yd-msgListPart").append(that.template.systemMessageTemplate(el));
                        });

                        that.scrollInit();

                    }
                }
            }
        };
        $(window).off("scroll");
        container.scrollPagination(scrollOption);
    }
};

var messageIndex = new MessageIndex();

messageIndex.init();
