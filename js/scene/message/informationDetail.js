/**

 */
$(function () {
    comm.pcSideModule([{
        item: "讨论",
        href: "//www.yi-ding.net.cn/pages/message/message_discuss.html",
        active: false
    }, {
        item: "赞了我的",
        href: "//www.yi-ding.net.cn/pages/message/message_like.html",
        active: false
    }, {
        item: "动态资讯",
        href: "//www.yi-ding.net.cn/pages/message/message_information.html",
        active: true
    }, {
        item: "系统消息",
        href: "//www.yi-ding.net.cn/pages/message/message_index.html",
        active: false
    }]);
    function newTips() {
        $.ajax({
            url: "//www.yi-ding.net.cn/call/yiding/customer/message/getMapCount/",
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
    }
    if (!comm.isPC()) {
        newTips();
    } else {
        mComm.resourceNum();
    }
      // $('.contentInner a').off('click').on('click',function (e) {
      //     e.preventDefault();
      //     var src=$(this).attr('href');
      //     var that=$(this);
      //     if(that.attr('data-is')){
      //         window.location.href=src;
      //     }else {
      //         if($(this).attr('href').indexOf('yi-ding')==-1&&$(this).attr('href').indexOf('pages')==-1&&$(this).attr('href').indexOf('allinmd')==-1&&$(this).attr('href').indexOf('medplus')==-1){
      //             that.attr('data-is','true');
      //             comm.confirmBox({
      //                 "title":"您将打开非医鼎站内链接",
      //                 "content": "请注意您的账号安全",
      //                 "cancel": "留在医鼎",
      //                 "ensure": "继续访问",
      //                 "ensureCallback": function () {
      //                     commLog.creatEvent({"id":179,"url":window.location.href,"keyword":"通知详情页-继续访问"});
      //                     window.location.href=src;
      //                 },
      //                 "cancelCallback": function () {
      //                     commLog.creatEvent({"id":178,"url":window.location.href,"keyword":"通知详情页-留在医鼎"});
      //                     return;
      //                 }
      //             });
      //         }else {
      //             window.location.href=src;
      //         }
      //     }
      //
      // })
});
