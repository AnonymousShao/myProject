/**
 * 功能描述：  我的讨论
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/17.
 */

$(function () {
    var PeronsalMyDiscuss = function () {
        var that = this;

        this.XHRList = {
            contentList: "//www.yi-ding.net.cn/call/customer/review/json_list/",
            disDelete: "//www.yi-ding.net.cn/call/customer/review/delete/"
        };
    };

    PeronsalMyDiscuss.prototype = {
        init: function () {
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
            if(localStorage.getItem('vedioMaxTime')){
                localStorage.removeItem('vedioMaxTime');
            }
            this.getContentList();

        },
        template: {
            contentList: function (dataArr) {
                return '<section class="yd-commentItem" data-id="' + dataArr.id + '">' +
                    '<figure class="yd-commentImg">' +
                    '<a href="' + (dataArr.customerId !== localStorage.getItem('userId') ? '//www.yi-ding.net.cn/pages/personal/others_index.html?cId=' + dataArr.customerId : 'javascript:void(0)') + '"><img src="' + dataArr.customerLogoUrl + '" alt=""></a>' +
                    '</figure>' +
                    '<figcaption class="yd-commentContext">' +
                    '<h2><em>' + dataArr.customerName + '</em>' + (parseInt(dataArr.customerState) === 1 || parseInt(dataArr.customerState) === 2 ? '<i class="icon-vip"></i>' : '') + '<span>' + comm.date.diffDay_one(dataArr.createTime.substr(0, 19), comm.date.local_time()) + '</span></h2>' +
                    '<p><span class="yd-classMark">' +
                    (function (sData) {
                        var type = "";
                        if (sData.refBelongId.length == 0) {
                            switch (parseInt(sData.reviewType)) {
                                case 1:
                                    type = "课程" + (parseInt(sData.parentId) === 0 ? "" : "讨论");
                                    break;
                                case 2:
                                    type = "习题" + (parseInt(sData.parentId) === 0 ? "" : "讨论");
                                    break;
                            }
                        } else {
                            return '<span>课程讨论</span>';
                        }

                        return type;
                    })(dataArr) +
                    '</span>' +
                    (function () {
                        //非讨论 资源
                        if (dataArr.refBelongId.length!=0){
                            if(dataArr.parentId.toString().length>5){
                                return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId+ '" data-parentid="' + dataArr.parentId+ '"  data-reviewType="' + dataArr.reviewType+ '" data-refBelongId="' + dataArr.refBelongId+ '" data-refId="' + dataArr.refId+ '">' + comm.htmlToString(dataArr.parentReviewContent) + '</a>'
                            }else {
                                if(dataArr.parentId==0){
                                    return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId+ '" data-parentid="' + dataArr.refBelongId+ '" data-reviewType="' + dataArr.reviewType+ '" data-refBelongId="' + dataArr.refBelongId+ '" data-refId="' + dataArr.refId+ '">' + comm.htmlToString(dataArr.parentReviewContent) + '</a>'
                                }else {
                                    return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId+ '">' + comm.htmlToString(dataArr.parentReviewContent) + '</a>'
                                }
                            }
                            // return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId+ '" data-reviewType="' + dataArr.reviewType+ '" data-refBelongId="' + dataArr.refBelongId+ '" data-refId="' + dataArr.refId+ '">' + dataArr.parentReviewContent + '</a>'
                        }else{
                            if (dataArr.parentId == 0) {
                                //课程——API提供templateUrl
                                if (dataArr.reviewType == 1) {
                                    return '<a href="//' + dataArr.refUrl + '" target="_blank">' + dataArr.refName + '</a>';
                                }
                                else if (dataArr.reviewType == 2) {
                                    return '<a href="//www.yi-ding.net.cn/pages/classes/one_exercise.html?exerciseId=' + dataArr.refId + '" target="_blank">' + dataArr.refName + '</a>';
                                }
                            } else if (dataArr.parentId != 0){
                                return '<a href="javascript:void(0)" class="checkDiscuss" data-discussid="' + dataArr.parentId + '">' + comm.htmlToString(dataArr.parentReviewContent) + '</a>'
                            }
                        }
                    })() +
                    (dataArr.reviewStatus == 1 ? '<em class="yd-commentDelete">删除讨论</em></p>' : '') +
                    (function () {
                        var result = "";
                        switch (parseInt(dataArr.reviewStatus)) {
                            case 1:
                                    result = '<article>' +
                                        '<a class="checkDiscuss" href="javascript:void(0)" data-discussid="' + dataArr.id + '">' + comm.htmlToString(dataArr.reviewContent) + '</a>' +
                                        '</article>';

                                // if(dataArr.parentId==0){
                                //     result = '<article>' +
                                //         '<a class="checkDiscuss" href="javascript:void(0)" data-discussid="' + dataArr.id + '">' + dataArr.reviewContent + '</a>' +
                                //         '</article>';
                                // }else if(dataArr.parentId!=0){
                                //     result = '<article>' +
                                //         '<a class="checkDiscuss" href="javascript:void(0)" data-discussid="' + dataArr.parentId + '">' + dataArr.reviewContent + '</a>' +
                                //         '</article>';
                                // }

                                break;
                            case 2:
                                result = '<article class="yd-contentDeleted">' +
                                    '<ahref="javascript:void(0)">' + comm.htmlToString(dataArr.reviewContent) + '</a>' +
                                    '</article>';
                                break;
                            case 3:
                                result = '<article class="yd-contentDeleted">' +
                                    '<ahref="javascript:void(0)">' + comm.htmlToString(dataArr.reviewContent) + '</a>' +
                                    '</article>';
                                break;
                            case 4:
                                result = '<article>' +
                                    '<a class="checkDiscuss" href="javascript:void(0)" data-discussid="' + dataArr.id + '">' + comm.htmlToString(dataArr.reviewContent) + '</a>' +
                                    '</article>';
                                break;
                        }
                        return result;
                    })() +

                    '</figcaption>' +
                    '</section>';
            }
        },
        // 内容列表
        getContentList: function () {
            commLog.createBrowse(43, '我的-我的讨论', window.location.href);
            var that = this;
            var data = {
                visitSiteId: 13,
                logoUseFlag: 3,
                customerId: localStorage.getItem('userId'),
                scene: 1,
                reviewStatus: 1,
                pageIndex: 1,
                pageSize: 20
            };
            $.ajax({
                url: this.XHRList.contentList,
                type: 'POST',
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
                            $(dataList).each(function (index, el) {
                                $('.yd-commentBox').append(that.template.contentList(el));


                            });
                            $(".yd-commentBox").on("click",".checkDiscuss", function () {
                                // data-reviewType="' + dataArr.reviewType+ '" data-refBelongId="' + dataArr.refBelongId+ '" data-refId="' + dataArr.refId+ '"
                                commLog.creatEvent({"id":118,"url":window.location.href,"keyword":"编辑我的评论","browseType":"43"});
                                var discussId = $(this).attr('data-discussid');
                                var reviewType = $(this).attr('data-reviewType');
                                var refBelongId = $(this).attr('data-refBelongId');
                                var refId = $(this).attr('data-refId');
                                var postData={};
                                var url='';
                                if(discussId==0){
                                    postData = {
                                        "visitSiteId": 13,
                                        "scene": '0',
                                        "logoUseFlag": "3",
                                        "customerId": localStorage.getItem('userId'),
                                        "refId": refId,
                                        refBelongId:refBelongId
                                    };
                                    url="//www.yi-ding.net.cn/call/customer/review/json_list/"
                                }else {
                                    postData = {
                                        "reviewId": discussId,
                                        "sortType": "7",
                                        "scene": '4',
                                        "logoUseFlag": "2",
                                        "pageIndex": "1",
                                        "pageSize": "10",
                                        refBelongId:''
                                    };
                                    url="//www.yi-ding.net.cn/call/customer/review/json_list/"
                                }
                                $('body').addClass('yd_overflow');
                                comm.maskBackground.show("rgba(0,0,0,.6)");
                                var discussStr = "";
                                postData = {"paramJson": $.toJSON(postData)};
                                $.ajax({
                                    url: url,    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                                    data: postData,    //参数值
                                    type: "post",   //请求方式
                                    beforeSend: function () {
                                        //请求前的处理
                                        comm.loading.show();
                                    },
                                    success: function (req) {
                                        //请求成功时处理

                                        if (req.responseObject.responseStatus) {
                                            comm.loading.hide();
                                            /* showReview(req, "discuss");*/
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
                                });

                            })
                            that.scrollInit();
                            comm.loading.hide();
                        }
                    }else {
                        $(".yd-noContentTips").show();
                    }
                    comm.loading.hide();

                    $(".contentInner").on("click", ".yd-commentDelete",function () {
                        commLog.creatEvent({"id":129,"url":window.location.href,"keyword":"删除我的评论","browseType":"43"});
                        that.deleteComment($(this).parents(".yd-commentItem").attr("data-id"));
                    });
                })
                .fail(function () {
                    // console.log("XHR Error...");
                    comm.loading.hide();

                });
        },
        // 删除评论
        deleteComment: function (id) {
            $.ajax({
                url: this.XHRList.disDelete,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        id: id
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
                        })
                        $(".yd-commentItem[data-id='" + id + "']").remove();
                        if($('.yd-commentItem').length==0){
                            location.reload();//刷新页面
                        }
                    } else {
                        popup({
                            text: "删除失败..."
                        })
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("error");
                });

        },
        // 滚动加载
        scrollInit: function () {
            var that = this;

            this.wNum = 2;
            var data = {
                visitSiteId: 13,
                logoUseFlag: 3,
                customerId: localStorage.getItem('userId'),
                reviewStatus: 1,
                scene: 1,
                pageIndex: this.wNum,
                pageSize: 20
            };
            $('.yd-commentBox').off("scroll").scrollPagination({
                'contentPage': this.XHRList.contentList,
                'contentData': $.extend(data, {
                    pageIndex: function () {
                        return that.wNum++;
                    },
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
                        $(".yd-commentBox").attr('scrollPagination', 'disabled');
                        return false;
                    } else {

                        if ($.isEmptyObject(res.responseObject.responseData) || (res.responseObject.responseData.data_list && res.responseObject.responseData.data_list.length === 0)) {

                            $(".yd-commentBox").attr('scrollPagination', 'disabled');
                            return false;
                        } else {
                            $(res.responseObject.responseData.data_list).each(function (index, ele) {
                                $('.yd-commentBox').append(that.template.contentList(ele));
                            });
                        }
                    }

                }
            });
        }
    };
    var personalMyDiscuss = new PeronsalMyDiscuss();
    personalMyDiscuss.init();
});
