/**
 * 功能描述：  他人主页
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/21.
 * updata by zhanghongda on 2017/02/09.
 */
$(function () {
    var OthersIndex = function () {
        var that = this;
        this.XHRList = {
            baseMsg: "//www.yi-ding.net.cn/call/yiding/web/user/getMapById/",
            classList: "//www.yi-ding.net.cn/call/yiding/customer/join/json_list/",
            learnNote: "//www.yi-ding.net.cn/call/customer/video/play/getHistoryByCustomerId/",
            release: "//www.yi-ding.net.cn/call/cms/series/course/auth/getPublishById/"

        };
    };
    OthersIndex.prototype = {
        init: function () {
            commLog.createBrowse(65, '他人主页-他人主页');
            comm.pcSideModule([{
                item: "",
                href: "",
                active: false
            }, {
                item: "",
                href: "",
                active: false
            }, {
                item: "",
                href: "",
                active: false
            }]);
            this.othersBaseMsg();
            this.getClassList();
            this.getLearnNotes();

            $("meta[name='keywords']").attr("content", $(".yd-othersMessage h3").text() + "," +
                $(".yd-othersMessage h3").text() + "发表的[" + $(".yd-classItem").eq(0).text() + "]," +
                $(".yd-othersMessage h3").text() + '学习的[' + $("#Ev-studyRecord .contentInnerItem").eq(0).find('.contentInnerContext a').text() +
                ']');

        },
        template: {
            baseMsgTemplate: function (dataArr) {
                document.title = "［" + dataArr.customerName + "］的个人主页－医鼎";
                return '<figure class="yd-othersHeadImg">' +
                    '<a href="">' +
                    '<img src="' + dataArr.customerLogoUrl + '" alt="">' +
                    '</a>' +
                    '<figcaption class="yd-othersMessage">' +
                    '<h3>' + dataArr.customerName + (dataArr.state == 1 || dataArr.state == 2 ? '<icon class="icon-vip"></icon>' : '') + '</h3>' +
                    '<p>' + dataArr.companyName + '</p>' +
                    '</figcaption>' +
                    '</figure>';
            },
            //学习的系列课程
            classListTemplate: function (dataArr) {
                return '<figure class="yd-classItem">' +
                    '<a href="//' + dataArr.storagePath + '" >' +
                    '<img src="' + dataArr.courseMainPicUrl + '" alt="">' +
                    '</a>' +
                    '<figcaption>' +
                    (dataArr.seriesName.length > 8 ? dataArr.seriesName.substring(0, 7) + "..." : dataArr.seriesName) +
                    '</figcaption>' +
                    '</figure>';
            },
            //学习记录
            learnNoteTemplate: function (dataArr) {
                return '<section class="contentInnerItem">' +
                    '<article class="contentInnerContext">' +
                    '<h2><a href="//' + dataArr.storagePath + '" target="_blank">' + dataArr.courseTitle + '</a></h2>' +
                    '<p><span class="user">' + (dataArr.courseAuthorList ? (dataArr.courseAuthorList[0] ? (dataArr.courseAuthorList[0].authorName.length > 4 ? dataArr.courseAuthorList[0].authorName.substring(0, 3) + "..." : dataArr.courseAuthorList[0].authorName) : "") : "") + '</span><span class="hospital">' + (dataArr.courseAuthorList ? (dataArr.courseAuthorList[0] ? (dataArr.courseAuthorList[0].company.length > 12 ? dataArr.courseAuthorList[0].company.substring(0, 11) + "..." : dataArr.courseAuthorList[0].company) : "") : "") + '</span></p>' +
                    '<article class="contentOtherMsg">' +
                    '<span class="resourceType">' + dataArr.subMajorName + '</span>' +
                    '<i class="icon-comment"></i><span>' + ( dataArr.reviewNum ? dataArr.reviewNum.toWK() : "") + '</span>' +
                    '</article>' +
                    '</article>' +
                    '<figure class="contentInnerImg">' +
                    '<img src="' + dataArr.videoAttUrl + '" alt="">' +
                    '</figure>' +
                    '</section>';
            },
            releaseResourceTemplate: function (dataArr) {
                return '<section class="contentInnerItem">' +
                    '<article class="contentInnerContext">' +
                    '<h2><a href="' + dataArr.storagePath + '">' + dataArr.courseTitle + '</a>></h2>' +
                    '<p>' +
                    '<span class="user">' +
                    (dataArr.courseAuthorList[0] ? (dataArr.courseAuthorList[0].authorName.length > 4 ? dataArr.courseAuthorList[0].authorName.substring(0, 3) + "..." : dataArr.courseAuthorList[0].authorName) : "") +
                    '</span>' +
                    '<span class="hospital">' + (dataArr.courseAuthorList[0] ? (dataArr.courseAuthorList[0].company.length > 12 ? dataArr.courseAuthorList[0].company.substring(0, 11) + "..." : dataArr.courseAuthorList[0].company) : "") + '</span>' +
                    '</p>' +
                    '<article class="contentOtherMsg">' +
                    (dataArr.subMajorName.length === 0 ? "" : '<span class="resourceType">' + dataArr.subMajorName + '</span>') +
                    '<i class="icon-comment"></i><span>' + dataArr.reviewNum + '</span>' +
                    '</article>' +
                    '</article>' +
                    '<figure class="contentInnerImg">' +
                    '<img src="' + dataArr.videoAttUrl + '" alt="">' +
                    '</figure>' +
                    '</section>';
            }
        },
        //基本信息
        othersBaseMsg: function () {
            var that = this;
            if (comm.getpara().cId === localStorage.getItem('userId')) {
                window.location.href = "//www.yi-ding.net.cn/pages/personal/personal_index.html";
            }
            $.ajax({
                url: this.XHRList.baseMsg,
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {
                    paramJson: $.toJSON({
                        customerId: comm.getpara().cId,
                        visitSiteId: 13
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
                        $(dataList).each(function (index, el) {
                            $(".yd-othersHeader").append(that.template.baseMsgTemplate(el));
                            $(".yd-jumpAllinPersonal a").attr("href", '//www.allinmd.cn/pages/personal/others_contribution.html?cid=' + comm.getpara().cId);

                            if (el.roleName != '住培学员') {
                                that.getResource();
                                $(".yd-jumpAllinPersonal a").attr("href", '//www.allinmd.cn/pages/personal/others_contribution.html?cid=' + comm.getpara().cId);
                            } else {
                                $(".yd-jumpAllinPersonal").hide();
                                $(".Ev-noReleaseResource").hide();
                                $(".yd-releaseHeader").hide();
                                $("#Ev-releaseResource").hide()
                            }
                        });
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });

        },
        //获取Ta的系列课程
        getClassList: function () {
            var that = this;

            $.ajax({
                url: that.XHRList.classList,
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {
                    paramJson: $.toJSON({
                        customerId: comm.getpara().cId,
                        visitSiteId: 13,

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

                        $(dataList).each(function (index, el) {
                            $(".yd-classItemsBox").append(that.template.classListTemplate(el));
                        });
                    } else {
                        $(".yd-classItemsBox").hide();
                        $(".Ev-noClassItems").show();

                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });
        },
        //获取Ta的学习记录
        getLearnNotes: function () {
            var that = this;
            $.ajax({
                url: this.XHRList.learnNote,
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {
                    paramJson: $.toJSON({
                        customerId: comm.getpara().cId,
                        visitSiteId: 13,
                        pageIndex:1,
                        pageSize:10,
                        type:1
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
                        $(dataList).each(function (index, el) {
                            $("#Ev-studyRecord").append(that.template.learnNoteTemplate(el));
                        });
                    } else {
                        $("#Ev-studyRecord").hide();
                        $(".Ev-noStudyRecord").show();
                        $("#Ev-studyRecord").attr('scrollPagination', 'disabled');
                        $(".yd-scrollTips").hide();
                    }
                    comm.loading.hide();
                    that.scrollInit();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });
        },
        //获取Ta发布的资源
        getResource: function () {
            var that = this;
            var page = 1;
            resource(page);
            $(".yd-releaseCheckMore").off('click').on("click", function () {
                page++;
                resource(page);
            });

            function resource(index) {
                $.ajax({
                    url: that.XHRList.release,
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    data: {
                        paramJson: $.toJSON({
                            customerId: comm.getpara().cId,
                            visitSiteId: 13,
                            pageIndex: index,
                            pageSize: 10,
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
                            $(dataList).each(function (index, el) {
                                $("#Ev-releaseResource>article").append(that.template.releaseResourceTemplate(el));
                            });
                        } else {
                            if (index == 1) {
                                $("#Ev-releaseResource").hide();
                                $(".Ev-noReleaseResource").show();
                            } else {
                                $('.yd-releaseCheckMore').hide();
                            }

                        }
                        comm.loading.hide();
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            }
        },
        scrollInit: function () {
            var that = this;
            this.wNum = 2;
            var data = {
                customerId: comm.getpara().cId,
                visitSiteId: 13,
                pageIndex: this.wNum,
                pageSize: 10,
                type:1
            }
            $('#Ev-studyRecord').off("scroll").scrollPagination({
                'contentPage': this.XHRList.learnNote,
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
                        $("#Ev-studyRecord").attr('scrollPagination', 'disabled');
                        return false;
                    } else {
                        if ($.isEmptyObject(res.responseObject.responseData) || (res.responseObject.responseData.data_list && res.responseObject.responseData.data_list.length === 0)) {

                            $("#Ev-studyRecord").attr('scrollPagination', 'disabled');
                            $(".yd-scrollTips").text("没有更多了");
                            return false;
                        } else {
                            $(res.responseObject.responseData.data_list).each(function (index, ele) {
                                $("#Ev-studyRecord").append(that.template.learnNoteTemplate(ele));

                            });
                        }
                    }
                }
            });
        }
    };

    var othersIndex = new OthersIndex();
    othersIndex.init();
});
