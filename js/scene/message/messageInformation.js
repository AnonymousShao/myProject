/**
 * Created by ALLIN on 2017/3/1.
 */
$(function () {
    var messageInfar={
        pageNum:0,
        init:function () {
            commLog.createBrowse(77, "动态资讯");
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
            if (localStorage.getItem('userId')){
                messageInfar.showMessage();
            }else{
                $(".yd-noContentTips").show();
                $(".yd-noContentTips .btn-primary").show();
                $(".yd-messageHeader").hide();
            }
            if (!comm.isPC()) {
                messageInfar.newTips();
            } else {
                mComm.resourceNum();
            }
        },
        newTips: function () {
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
        },
        messageAjax: function(url, type,text, callback) {
            comm.loading.show();
            $.ajax({
                url: url,
                type: type,
                dataType: 'json',
                async : false,
                data: text,
                success: function(req) {
                    callback(req);

                },
                error: function(xhr, type, error) {
                    //alert(error);
                }
            });
        },
        showMessage:function () {
            var url="//www.yi-ding.net.cn/call/yiding/customer/message/getMapDynamicList/";
            var postData={
                customerId:localStorage.getItem('userId'),
                firstResult:0,
                maxResult:10,
                isValid:1
            };
            postData = {
                paramJson: $.toJSON(postData)
            };
            messageInfar.messageAjax(url,'GET',postData,function (req) {
                messageInfar.messageData(req);
            })
        },
        messageData:function (req) {
            comm.loading.hide();
            if(req.responseObject.responseStatus){
                $('.yd-msgRemindPart .yd-noContentTips').hide();
                var messageStr='';
                var messageTtileStr='';
                var messageDescStr='';
                var data=req.responseObject.responseData.data_list;
                var container=$('.yd-msgListPart ul');
                for(var i=0;i<data.length;i++){
                    if(data[i].messageName!={}&&data[i].messageName!=''){
                        messageTtileStr='<div class="informationTitle">'+data[i].messageName+'</div>';
                        if(data[i].messageAbstract!={}&&data[i].messageAbstract!=""){
                            messageDescStr=' <div class="informationText">'+data[i].messageAbstract+'</div>';
                        }else {
                            messageDescStr='';
                        }
                    }else {
                        messageTtileStr='';
                        messageDescStr='';
                    }

                    var during=comm.date.diffDay_one(data[i].createTime, comm.date.local_time());
                    messageStr+=' <li class="msgInformation width92 yd-msgListItem" data-id="'+data[i].id+'" data-url="'+data[i].pageStoragePath+'">'+messageTtileStr+messageDescStr+
                        '<div class="informationAds"> <img src="'+data[i].messageCover+'"><div class="times">'+during+'</div> </div>'+
                        '</li>';
                }
                container.append(messageStr);
                messageInfar.viewLagerImg();
                messageInfar.messageScroll();
                mComm.selectDelete(function () {
                    if ($(".yd-msgListItem").size()===0){
                        messageInfar.messageFn();
                    }else{
                        return;
                    }
                });
            }else {
                $('.yd-msgRemindPart .yd-noContentTips').show();
            }
        },
        messageFn:function () {
            messageInfar.pageNum++;
            var data = {
                customerId:localStorage.getItem('userId'),
                firstResult:messageInfar.pageNum*10,
                maxResult:10,
                isValid:1
            };
            var url="//www.yi-ding.net.cn/call/yiding/customer/message/getMapDynamicList/";
            postData = {
                paramJson: $.toJSON(data)
            };
            messageInfar.messageAjax(url,'GET',postData,function (req) {
                messageInfar.messageData(req);
            })

        },
        messageScroll:function () {
            messageInfar.pageNum++;
        var data = {
            customerId:localStorage.getItem('userId'),
            firstResult:messageInfar.pageNum*10,
            maxResult:10,
            isValid:1
        };
        $('.yd-msgListPart ul').off("scroll").scrollPagination({
            'contentPage': "//www.yi-ding.net.cn/call/yiding/customer/message/getMapDynamicList/",
            'contentData': $.extend(data,{

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
                    $('.yd-msgListPart ul').attr('scrollPagination', 'disabled');
                    return false;
                } else {

                    if ($.isEmptyObject(res.responseObject.responseData) || (res.responseObject.responseData.data_list && res.responseObject.responseData.data_list.length === 0)) {

                        $('.yd-msgListPart ul').attr('scrollPagination', 'disabled');
                        return false;
                    } else {
                        messageInfar.messageData(res);
                        mComm.selectDelete(function () {
                            if ($(".yd-msgListItem").size()===0){
                                messageInfar.messageFn();
                            }else{
                                return;
                            }
                        });

                    }
                }

            }
        });
    },
        viewLagerImg:function () {
            $('.yd-msgListPart .yd-msgListItem .informationAds').off('click').on('click',function (e) {
                e.stopPropagation();
                e.preventDefault();
                var deletText=$(".EV-selectToDelete").text();
                if(deletText=='取消'){
                   $(this).parents('.yd-msgListItem').toggleClass('yd-msgListItemDeleteSelected');
                    if ($(".yd-msgListItemDeleteSelected").length !== 0) {
                        $(".yd-msgListDelete").addClass('yd-msgListDeleteHasItem');
                        $(".yd-msgListDelete span").text("(" + $(".yd-msgListItemDeleteSelected").length + ")");
                    } else {
                        $(".yd-msgListDelete").removeClass('yd-msgListDeleteHasItem');
                        $(".yd-msgListDelete span").text("");
                    }
                    return;
                }
                var title=$(this).parents('.yd-msgListItem').find('.informationTitle').length;
                var desc=$(this).parents('.yd-msgListItem').find('.informationText').length;
                if(title==0&&desc==0){
                    var imgSrc=$(this).find('img').attr("src");
                    $('body').addClass('yd_overflow');
                    comm.maskBackground.show("rgba(0,0,0,.6)");
                    var containerBack=$('.yd-maskBackground');
                    containerBack.append('<div class="maskBackInformationAds"> <div class="maskBackImg"><img src="'+imgSrc+'"><div class="yd-bigImg_close"><img src="/image/discuss/close.png"></div></div></div>');
                    $('.yd-maskBackground .yd-bigImg_close').off('click').on('click',function () {
                        containerBack.remove();
                        $('body').removeClass('yd_overflow');
                    })
                }else {
                    if($(this).parents('.yd-msgListItem').attr('data-url').indexOf('www')==-1){
                        return;
                    }
                    window.open($(this).parents('.yd-msgListItem').attr('data-url'));
                }
            })
            $('.yd-msgListPart .yd-msgListItem .informationText').off('click').on('click',function (e) {
                e.stopPropagation();
                e.preventDefault();
                var deletText=$(".EV-selectToDelete").text();
                if(deletText=='取消'){
                    $(this).parents('.yd-msgListItem').toggleClass('yd-msgListItemDeleteSelected');
                    if ($(".yd-msgListItemDeleteSelected").length !== 0) {
                        $(".yd-msgListDelete").addClass('yd-msgListDeleteHasItem');
                        $(".yd-msgListDelete span").text("(" + $(".yd-msgListItemDeleteSelected").length + ")");
                    } else {
                        $(".yd-msgListDelete").removeClass('yd-msgListDeleteHasItem');
                        $(".yd-msgListDelete span").text("");
                    }
                    return;
                }
                if($(this).parents('.yd-msgListItem').attr('data-url').indexOf('www')==-1){
                    return;
                }
                window.open($(this).parents('.yd-msgListItem').attr('data-url'));
            })
            $('.yd-msgListPart .yd-msgListItem .informationTitle').off('click').on('click',function (e) {
                e.stopPropagation();
                e.preventDefault();
                var deletText=$(".EV-selectToDelete").text();
                if(deletText=='取消'){
                    $(this).parents('.yd-msgListItem').toggleClass('yd-msgListItemDeleteSelected');
                    if ($(".yd-msgListItemDeleteSelected").length !== 0) {
                        $(".yd-msgListDelete").addClass('yd-msgListDeleteHasItem');
                        $(".yd-msgListDelete span").text("(" + $(".yd-msgListItemDeleteSelected").length + ")");
                    } else {
                        $(".yd-msgListDelete").removeClass('yd-msgListDeleteHasItem');
                        $(".yd-msgListDelete span").text("");
                    }
                    return;
                }
                if($(this).parents('.yd-msgListItem').attr('data-url').indexOf('www')==-1){
                    return;
                }
                window.open($(this).parents('.yd-msgListItem').attr('data-url'));
            })
        },
    };
    messageInfar.init();

});
