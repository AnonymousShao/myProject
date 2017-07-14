/**
 * 功能描述：  讨论消息
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/23.
 */

var MessageLike = function (argument) {
    var that = this;
    this.XHRList = {
        sMsg: "//www.yi-ding.net.cn/call/yiding/customer/message/getMapPerferList/", //内容列表
    };
};

MessageLike.prototype = {
    init: function () {
        var that=this;
        commLog.createBrowse(30,'消息-赞了我的列表页');
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
                active: true,
            }, {
                item: "动态资讯",
                href: "//www.yi-ding.net.cn/pages/message/message_information.html",
                active: false
            }, {
                item: "系统消息",
                href: "//www.yi-ding.net.cn/pages/message/message_index.html",
                active: false
            }]);
            $(".al-mainSidebarList li").removeClass('active').last().addClass('active');
            $("#al-headerTopNav li").show();
            if (localStorage.getItem("userId")) {
                that.messageList();
                mComm.resourceNum();
            }else{
                $(".yd-noContentTips").show();
                $(".yd-noContentTips .btn-primary").show();
                $(".yd-messageHeader").hide();

            }
        }, 10);



    },
    template: {
        messageListTemplate: function (dataArr) {
            // console.log(dataArr)
            return '<section class="yd-msgListItem" data-id="' + dataArr.id + '">' +
                '<header class="yd-msgListTitle">' +
                '<figure class="yd-msgListHeadImg">' +
                '<a href="'+(dataArr.customerId!==localStorage.getItem('userId')?'//www.yi-ding.net.cn/pages/personal/others_index.html?cId='+ dataArr.customerId+'&sourceType=30':'javascript:void(0)')+'" target="_blank">' +
                '<img src="' + dataArr.customerLogoUrl + '" alt="">' +
                '</a>' +
                (dataArr.isRead == 0 ? '<i class="newTips"></i>' : '') +
                '</figure>' +
                '<article class="yd-msgListTitleContent">' +
                '<a href="//www.yi-ding.net.cn/pages/personal/others_index.html?cId=' + dataArr.customerId + '&sourceType=30">' + dataArr.customerName + (dataArr.customerState == 1||dataArr.customerState == 2 ? '<i class="icon-vip"></i>' : '') + '</a>' +
                '<span class="yd-msgListStatus">' +
                '赞了' +
                '</span>' +
                '<span class="yd-msgListTime">' + comm.date.diffDay_one(dataArr.createTime.substr(0, 19), comm.date.local_time()) + '</span>' +
                '</article>' +
                '</header>' +
                '<article class="yd-msgListItemContent">' +
                '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.itemReviewId + '">' + (dataArr.itemContent?(dataArr.itemContent.length > 200 ? dataArr.itemContent.substring(0, 130) + '...' : dataArr.itemContent):'')+ '</a>' +
                '</article>' +
                '</section>';
        }
    },

    // 获取消息列表
    messageList: function () {
        var that = this;
        var data = {};
        function fn() {

            $.ajax({
                url: that.XHRList.sMsg,
                type: 'get',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        customerId: localStorage.getItem("userId"),
                        pageSize: 10,
                        pageIndex: 1
                    })
                },
            })
                .done(function (data) {
                    // console.log("success");
                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        $(".yd-noContentTips").hide();
                        var dataList = data.responseObject.responseData.data_list;
                        $(dataList).each(function (index, el) {
                            $(".yd-msgListPart").append(that.template.messageListTemplate(el));
                        });
                        that.scrollInit();
                    } else {
                        $(".yd-noContentTips").show();
                        $(".EV-selectToDelete").hide();
                    }
                })
                .fail(function () {
                    // console.log("error");
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
    scrollInit: function () {
        var that = this;
        this.wNum = 2;
        var data = {
            customerId: localStorage.getItem("userId"),
            pageIndex: this.wNum,
            pageSize: 10
        };
        $('.yd-msgListPart').off("scroll").scrollPagination({
            'contentPage': that.XHRList.sMsg,
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
                        var dataList = res.responseObject.responseData.data_list;
                        $(dataList).each(function (index, el) {
                            $(".yd-msgListPart").append(that.template.messageListTemplate(el));
                        })

                    }
                }
            }
        });
    }
};

var messageLike = new MessageLike();

messageLike.init();
