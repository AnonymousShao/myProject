/**
 * 功能描述：  我的收藏
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
            classList: "//www.yi-ding.net.cn/call/customer/collection/course_list/",
            exerciseList: "//www.yi-ding.net.cn/call/customer/collection/exercises_list/",
            collectionCancel: "//www.yi-ding.net.cn/call/customer/collection/delete/"
        };
    };

    PeronsalMyDiscuss.prototype = {
        init: function () {
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
            if(localStorage.getItem('vedioMaxTime')){
                localStorage.removeItem('vedioMaxTime');
            }
            this.getContentList();
            this.navbarClickHandle();
            if ($(".Ev-contentChangeItems.on").attr('data-role')=='class'){
                commLog.createBrowse(47,'我的-收藏-课程',window.location.href);
            }else{
                commLog.createBrowse(48,'我的-收藏-习题',window.location.href);
            }
        },
        template: {
            classList: function (dataArr) {
                return '<section class="contentInnerItem" data-id="' + dataArr.id + '">' +
                    '<article class="contentInnerContext">' +
                    '<h2><a href="//' + dataArr.storagePath + '?sourceType=47" target="_blank">' + (dataArr.courseTitle ? dataArr.courseTitle : "") + '</a></h2>' +
                    '<p><span class="user">' + (dataArr.courseAuthorList.length !== 0 ? dataArr.courseAuthorList[0].authorName : "") + '</span><span class="hospital">' + (dataArr.courseAuthorList.length !== 0 ? dataArr.courseAuthorList[0].company : "") + '</span></p>' +
                    '<article class="contentOtherMsg">' +
                    (dataArr.subMajorName.length !== 0 ? '<span class="resourceType">' + dataArr.subMajorName + '</span>' : "") +
                    '<i class="icon-comment"></i><span>' + dataArr.reviewNum + '</span>' +
                    '<p class="yd-collectCancel">取消收藏</p>' +
                    '</article>' +
                    '</article>' +
                    '<figure class="contentInnerImg">' +
                    '<img src="' + dataArr.videoAttUrl + '" alt="">' +
                    '</figure>' +
                    '</section>';
            },
            exerciseList: function (dataArr) {
                return '<article class="yd-titleItem">' +
                    '<a href="//www.yi-ding.net.cn//pages/exercises/exercise_enshrine.html?&type=enshrine&subMajorId='+ dataArr.subMajorId + '&sourceType=48" target="_blank">' + dataArr.subMajorName + '</a>' +
                    '<span>' + dataArr.exercisesNum + '题</span>' +
                    '</article>';
            }
        },
        // 内容列表
        getContentList: function (container) {
            var that = this;

            var cData = {
                    "customerId": localStorage.getItem('userId'),
                    pageIndex: 1,
                    pageSize: 10
                },
                eData = {
                    "customerId": localStorage.getItem('userId')
                };
            $.ajax({
                url: this.XHRList.classList,
                type: 'POST',
                dataType: 'json',
                async:false,
                data: {
                    paramJson: $.toJSON(cData)
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
                                $(".contentItem[data-role='class']").append(that.template.classList(el));
                                that.scrollInit();
                            });
                        }
                    } else {
                        $(".contentItem[data-role='class']").find(".yd-noContentTips").show();
                        $(".contentItem[data-role='exercise']").show();
                        $(".contentItem[data-role='class']").hide();
                        $(".Ev-contentChangeItems[data-role='exercise']").addClass('on')
                        $(".Ev-contentChangeItems[data-role='class']").removeClass('on');
                        $(".contentItem[data-role='class']").attr('scrollPagination', 'disabled');

                    }
                    comm.loading.hide();
                    $(".yd-collectCancel").off().on('click', function (event) {
                        event.preventDefault();
                        that.collectionCancel($(this).parents(".contentInnerItem").attr("data-id"));
                    });
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });

            $.ajax({
                url: this.XHRList.exerciseList,
                type: 'POST',
                dataType: 'json',
                async:false,
                data: {
                    paramJson: $.toJSON(eData)
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
                                $(".contentItem[data-role='exercise']").append(that.template.exerciseList(el));
                            });
                        }
                    } else {
                        $(".contentItem[data-role='exercise']").find(".yd-noContentTips").show();
                        $(".contentItem[data-role='class']").show();
                        $(".contentItem[data-role='exercise']").hide();
                        $(".Ev-contentChangeItems[data-role='class']").addClass('on')
                        $(".Ev-contentChangeItems[data-role='exercise']").removeClass('on');
                        $(".contentItem[data-role='class']").attr('scrollPagination', 'disabled');
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });

        },
        // 取消收藏
        collectionCancel: function (id) {
            $.ajax({
                url: this.XHRList.collectionCancel,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        id: id
                    })

                },
            })
                .done(function (data) {
                    // console.log("success");
                    popup({
                        text: "成功取消收藏！"
                    })
                    $(".contentInnerItem[data-id='" + id + "']").remove();
                    if($(".contentInnerItem").length==0){
                        window.location.reload();
                    }
                })
                .fail(function () {
                    // console.log("error");
                })
                .always(function () {
                    // console.log("complete");
                });

        },
        // 导航点击
        navbarClickHandle: function () {
            var that = this;

            $(".Ev-contentChangeItems").on("click", function () {
                var role = $(this).data("role");
                $(this).addClass('on').siblings().removeClass('on');
                $(".yd-contentChangeBox .contentItem").hide();
                $(".yd-contentChangeBox .contentItem[data-role='" + role + "']").show();
            });
        },
        // 滚动加载
        scrollInit: function () {
            var that = this;
            this.wNum = 2;
            var data = {
                "customerId": localStorage.getItem('userId'),
                pageIndex: this.wNum,
                pageSize: 10
            };
            $(".contentItem[data-role='class']").off("scroll").scrollPagination({
                'contentPage': this.XHRList.classList,
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
                        $(".contentItem[data-role='class']").attr('scrollPagination', 'disabled');
                        return false;
                    } else {

                        if ($.isEmptyObject(res.responseObject.responseData) || (res.responseObject.responseData.data_list && res.responseObject.responseData.data_list.length === 0)) {
                            $(".contentItem[data-role='class']").attr('scrollPagination', 'disabled');
                            return false;
                        } else {
                            $(res.responseObject.responseData.data_list).each(function (index, ele) {
                                $(".contentItem[data-role='class']").append(that.template.classList(ele));
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
