/**
 * Created by zhangheng on 2017/2/23.
 * page页面类型：初始页0，答题页1，结果页2,解析页3
 * exam：
 * 考试类型：
 * 顺序练习0、
 * 专项练习1、
 * 模拟考试2、
 * 能力评估3、
 * 智能组题4,
 * 全部解析5、
 * 错题解析6、
 * 错题本7，
 * 收藏习题8，
 * 习题终端页9
 * record,true,false,是否有继续答题功能
 * login:true,false，是否需要登录状态
 * site:true,false,pc,h5，
 */
var exerciseCommon = {
    means: {
        getNowTime: function () {//答题时间
            var myDate = new Date();
            var timeStr = "";
            var nowMonth = ((myDate.getMonth() + 1) < 10) ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
            var nowDate = ((myDate.getDate()) < 10) ? "0" + (myDate.getDate()) : (myDate.getDate());
            var nowHours = ((myDate.getHours()) < 10) ? "0" + (myDate.getHours()) : (myDate.getHours());
            var nowMinutes = ((myDate.getMinutes()) < 10) ? "0" + (myDate.getMinutes()) : (myDate.getMinutes());
            var nowSeconds = ((myDate.getSeconds()) < 10) ? "0" + (myDate.getSeconds()) : (myDate.getSeconds());
            timeStr += myDate.getFullYear() + "-" + (nowMonth) + "-" + nowDate + " " + nowHours + ":" + nowMinutes + ":" + nowSeconds;
            return timeStr;
        },
        bury: function (options) {
            switch (options.type) {
                case "recommend":
                    switch (exerciseCommon.parameter.exercisesOptions.type.page) {
                        case 1:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                    commLog.creatEvent({
                                        "id": 163,
                                        "url": location.href,
                                        "keyword": "顺序练习相关推荐",
                                        "browseType": "34",
                                        "trackLocation": options.indexNum
                                    });
                                    break;
                                case 1:
                                    if (exerciseCommon.parameter.treeleve == "0") {
                                        commLog.creatEvent({
                                            "id": 164,
                                            "url": location.href,
                                            "keyword": "专项练习(亚专业) 相关推荐",
                                            "browseType": "34",
                                            "trackLocation": options.indexNum
                                        });
                                    } else {
                                        commLog.creatEvent({
                                            "id": 165,
                                            "url": location.href,
                                            "keyword": "专项练习(亚专业下章节) 相关推荐",
                                            "browseType": "34",
                                            "trackLocation": options.indexNum
                                        });
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case 3:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 3:
                                    commLog.creatEvent({
                                        "id": 169,
                                        "url": location.href,
                                        "keyword": "错题本相关推荐",
                                        "browseType": "73",
                                        "trackLocation": options.indexNum
                                    });

                                    break;
                                case 4:
                                    commLog.creatEvent({
                                        "id": 170,
                                        "url": location.href,
                                        "keyword": "收藏相关推荐",
                                        "browseType": "74",
                                        "trackLocation": options.indexNum
                                    });
                                    break;
                                default:
                                    break;
                            }
                            break;
                    }
                    break;
                case "exercise":
                    var exerciseid = $(".queIteam").attr("data-id");
                    switch (exerciseCommon.parameter.exercisesOptions.type.page) {
                        case 1:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                    commLog.createBrowse(68, '顺序练习&' + exerciseCommon.parameter.testId + "&" + exerciseid);
                                    break;
                                case 1:
                                    commLog.createBrowse(69, '专项练习&' + exerciseCommon.parameter.testId + "&" + exerciseid);
                                    break;
                                default:
                                    break;
                            }
                            break;
                    }
                    break;
                case "page":
                    switch (exerciseCommon.parameter.exercisesOptions.type.page) {
                        case 0:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                    commLog.createBrowse(32, "习题-顺序练习列表页");
                                    break;
                                case 1:
                                    commLog.createBrowse(31, "习题-专项练习列表页");
                                    break;
                            }
                            break;
                        case 1:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                case 1:
                                    commLog.createBrowse(34, '习题-习题资源页');
                                    break;
                            }
                            break;
                        case 2:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                case 1:
                                    commLog.createBrowse(35, "习题-答题结果页");
                                    break;
                            }
                            break;
                        case 3:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 3:
                                    commLog.createBrowse(73, "错题本");
                                    break;
                                case 4:
                                    commLog.createBrowse(74, "收藏习题");
                                    break;
                            }
                            break;
                    }
                    break;
                case "share":
                    switch (exerciseCommon.parameter.exercisesOptions.type.page) {
                        case 1:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                    commLog.creatEvent({
                                        "id": 92,
                                        "url": location.href,
                                        "keyword": "顺序练习答题页分享",
                                        "browseType": "34"
                                    });
                                    break;
                                case 1:
                                    commLog.creatEvent({
                                        "id": 94,
                                        "url": location.href,
                                        "keyword": "专项练习答题页分享",
                                        "browseType": "34"
                                    });
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case 2:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                    commLog.creatEvent({
                                        "id": 93,
                                        "url": location.href,
                                        "keyword": "顺序练习结果页分享",
                                        "browseType": "35",
                                    });
                                    break;
                                case 1:
                                    commLog.creatEvent({
                                        "id": 95,
                                        "url": location.href,
                                        "keyword": "专项练习答题页分享",
                                        "browseType": "35"
                                    });
                                    break;
                                default:
                                    break;
                            }
                            break;
                    }
                    break;
                case "openRecord":
                    switch (exerciseCommon.parameter.exercisesOptions.type.page) {
                        case 1:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                    commLog.creatEvent({
                                        "id": 108,
                                        "url": location.href,
                                        "keyword": "顺序练习答题卡呼出",
                                        "browseType": "34",
                                        "browseTypeSourceUrl": location.href
                                    });
                                    break;
                                case 1:
                                    commLog.creatEvent({
                                        "id": 109,
                                        "url": location.href,
                                        "keyword": "专项练习答题卡呼出",
                                        "browseType": "34",
                                        "browseTypeSourceUrl": location.href
                                    });
                                    break;
                                default:
                                    break;
                            }
                            break;
                    }
                    break;
                case "closeRecord":
                    switch (exerciseCommon.parameter.exercisesOptions.type.page) {
                        case 1:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                    commLog.creatEvent({
                                        "id": 112,
                                        "url": location.href,
                                        "keyword": "顺序练习关闭答题卡",
                                        "browseType": "34",
                                        "browseTypeSourceUrl": location.href
                                    });
                                    break;
                                case 1:
                                    commLog.creatEvent({
                                        "id": 113,
                                        "url": location.href,
                                        "keyword": "专项练习关闭答题卡",
                                        "browseType": "34",
                                        "browseTypeSourceUrl": location.href
                                    });
                                    break;
                                default:
                                    break;
                            }
                            break;
                    }
                    break;
                case "handin":
                    switch (exerciseCommon.parameter.exercisesOptions.type.page) {
                        case 1:
                            switch (exerciseCommon.parameter.exercisesOptions.type.exam) {
                                case 0:
                                    commLog.creatEvent({
                                        "id": 110,
                                        "url": location.href,
                                        "keyword": "顺序练习交卷",
                                        "browseType": "34",
                                        "browseTypeSourceUrl": location.href
                                    });
                                    break;
                                case 1:
                                    commLog.creatEvent({
                                        "id": 111,
                                        "url": location.href,
                                        "keyword": "专项练习交卷",
                                        "browseType": "34",
                                        "browseTypeSourceUrl": location.href
                                    });
                                    break;
                                default:
                                    break;
                            }
                            break;
                    }
                    break;
            }
        },
        initProgress: function (value) {
            $('.queResultProgress').radialIndicator({
                barColor: '#fff',
                barWidth: 18,
                radius: 117,
                initValue: value,
                roundCorner: true,
                percentage: true
            });
            $("canvas").attr({"style": "filter:alpha(opacity=75);-moz-opacity:0.75; opacity:0.75;margin-left: 15px;margin-top: 14px;"});
        },
        applyData: function (options) {
            var postType = (options.get) ? "GET" : "POST";//默认是post方式，除非特别传参指名要get方式。
            var postData = {"paramJson": $.toJSON(options.postData)};
            $.ajax({
                url: options.port,    //请求的url地址
                dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                data: postData,    //参数值
                type: postType,   //请求方式
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (data) {
                    //请求成功时处理
                    var realNoData = ((data.responseObject.responseMessage) == "NO DATA") ? true : false;
                    var realStatus = data.responseObject.responseStatus;
                    if (realNoData || !realStatus) {
                        options.failed && options.failed();
                    } else {
                        options.success && options.success(data);
                    }

                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        },
        toggleHeight: function (obj) {
            obj.toggleClass("courseHidden");
            if (obj.hasClass("courseHidden")) {
                obj.next().html("<i ></i><span>展开</span>").addClass("icon-upMore").removeClass("packUp");
            } else {
                obj.next().html("<i ></i><span>收起</span>").addClass("packUp").removeClass("icon-upMore");
            }
            return false;
        },
        demoData: function (options) {
            switch (options.type) {
                case "before":
                    if (options.judge) {
                        options.container.before(options.str);
                    }
                    break;
                case "after":
                    if (options.judge) {
                        options.container.after(options.str);
                    }
                    break;
                case "append":
                    if (options.judge) {
                        options.container.append(options.str);
                    }
                    break;
                case "html":
                    //console.log(options.container)
                    if (options.judge) {
                        options.container.html(options.str);
                    }
                    break;
            }
            options.strCallBack && options.strCallBack();
        },
        clearHtml: function () {
            $(window).off("scroll");
            $(".queShiTiDisNothing").hide();
            $(".discussAllList").html("").removeAttr("scrollpagination").removeAttr("data-page");
            $(".discuss-content").hide();
            $("#quesContainer").addClass("none");
            $(".course-footer").hide();
            $(".exercisesAnalysis").hide();
        },
        share: function () {
            var sharePostData = {};
            if (exerciseCommon.parameter.exercisesOptions.type.page == 2) {

                if (exerciseCommon.parameter.exercisesOptions.type.exam == 0) {
                    sharePostData = {
                        "sceneType": "4",
                        "resourceType": "2",
                        "refId": "",
                        "visitSiteId": "13",
                        "shareSence": "4",
                        "isPass": "1",
                        "exercisesTollgate": exerciseCommon.parameter.testId
                    }
                } else {
                    // console.log(exerciseCommon.parameter.treeleve)
                    sharePostData = {
                        "sceneType": "5",
                        "resourceType": "2",
                        "refId": "",
                        "visitSiteId": "13",
                        "shareSence": "5",
                        "isPass": "1",
                        "seriesDirId": exerciseCommon.parameter.testId,
                        treeLevel: exerciseCommon.parameter.treeleve
                    }
                }
                exerciseCommon.means.applyData({
                    port: exerciseCommon.parameter.applyDataPort.share,
                    postData: sharePostData,
                    success: function (req) {
                        var h5Url = req.responseObject.responseData.data_list[0].share_channel[0].shareUrl;
                        var qqZoneTitle = req.responseObject.responseData.data_list[0].share_channel[2].shareTitle;
                        var qqTitle = req.responseObject.responseData.data_list[0].share_channel[3].shareTitle;
                        var sinaTitle = req.responseObject.responseData.data_list[0].share_channel[4].shareDesc;
                        var qqZoneSummary = req.responseObject.responseData.data_list[0].share_channel[2].shareDesc;
                        var sinaSummary = req.responseObject.responseData.data_list[0].share_channel[4].shareDesc;
                        var qqSummary = req.responseObject.responseData.data_list[0].share_channel[3].shareDesc;
                        // console.log(sinaTitle)
                        var hrefStr='<div class="share rightNav" id="share">' +
                            '<i class="icon-share" style="display: block;"></i>' +
                            '<p class="shareTxt" style="display: none;">分享</p>' +
                            '<article class="sharePic ev-shareBox" id="yd-shareBox">' +
                            '<b class="yd-weixin ev-tweixin"><i class="icon-weixin"></i><em>微信</em></b>'  +
                            '<section class="Ev-shareWeixinCode" style="display: none;position: absolute;bottom: 100%;">' +
                            '<h3>使用微信扫描二维码</h3>' +
                            '</section>' +
                            '<b class="yd-qqFriends ev-tqq">' +
                            '<i class="icon-qq"></i>' +
                            '<em>QQ</em>' +
                            '</b>' +
                            '<b class="yd-qZone ev-tqzone">' +
                            '<i class="icon-zone"></i>' +
                            '<em>QQ空间</em>' +
                            '</b>' +
                            '<b class="yd-weibo ev-tsina">' +
                            '<i class="icon-weibo"></i>' +
                            '<em>微博</em>' +
                            '</b>' +
                            '</article>' +
                            '</div>';
                        pcShare({
                            container:$(".al-rightNav"),//存放分享组件的父级
                            type:6,//默认为1  1：社交分享  2：页面左下角全站分享,3.终端页面的固定分享,4.终端评论区分享，消息的评论我的，只分享到唯医朋友圈, 5:直播分享 ，6:自定义dom结构
                            hrefTemplate:hrefStr,//自定义dom结构
                            h5Url:h5Url,//微信分享生成二维码的链接
                            shareTrend:0,//0:不需要站内动态分享  1：需要站内动态分享
                            url: h5Url,
                            qqTitle: qqTitle,
                            qqZoneSummary: qqZoneSummary,
                            sinaTitle: sinaTitle,
                            sinaSummary: sinaSummary,
                            qqZoneTitle: qqZoneTitle,
                            qqSummary: qqSummary,
                            h5Url: h5Url,
                            hasH5: true,
                            shareQQSuc: function () {
                                //qq分享成功回调
                                commLog.creatEvent({"id":102,"url":window.location.href,"keyword":"QQ分享"});
                            },
                            shareQzoneSuc: function () {
                                //qq空间分享成功回调
                                commLog.creatEvent({"id":103,"url":window.location.href,"keyword":"QQ空间分享"});
                            },
                            shareWeixinSuc:function(){
                                //微信分享成功回调
                                commLog.creatEvent({"id":100,"url":window.location.href,"keyword":"微信分享"});
                            },
                            shareSinaSuc: function () {
                                //微博分享成功回调
                                commLog.creatEvent({"id":104,"url":window.location.href,"keyword":"微博分享"});
                            },
                            clickCallback: function () {
                                exerciseCommon.means.bury({"type": "share"});
                            }
                        });
                    },
                    failed: function () {

                    }
                });
            }
            if ((exerciseCommon.parameter.exercisesOptions.type.page == 1) || (exerciseCommon.parameter.exercisesOptions.type.page == 3)) {
                var hrefStr='<div class="share rightNav" id="share">' +
                    '<i class="icon-share" style="display: block;"></i>' +
                    '<p class="shareTxt" style="display: none;">分享</p>' +
                    '<article class="sharePic ev-shareBox" id="yd-shareBox">' +
                    '<b class="yd-weixin ev-tweixin"><i class="icon-weixin"></i><em>微信</em></b>'  +
                    '<section class="Ev-shareWeixinCode" style="display: none;position: absolute;bottom: 100%;">' +
                    '<h3>使用微信扫描二维码</h3>' +
                    '</section>' +
                    '<b class="yd-qqFriends ev-tqq">' +
                    '<i class="icon-qq"></i>' +
                    '<em>QQ</em>' +
                    '</b>' +
                    '<b class="yd-qZone ev-tqzone">' +
                    '<i class="icon-zone"></i>' +
                    '<em>QQ空间</em>' +
                    '</b>' +
                    '<b class="yd-weibo ev-tsina">' +
                    '<i class="icon-weibo"></i>' +
                    '<em>微博</em>' +
                    '</b>' +
                    '</article>' +
                    '</div>';
                pcShare({
                    container:$(".al-rightNav"),//存放分享组件的父级
                    type:6,//默认为1  1：社交分享  2：页面左下角全站分享,3.终端页面的固定分享,4.终端评论区分享，消息的评论我的，只分享到唯医朋友圈, 5:直播分享 ，6:自定义dom结构
                    hrefTemplate:hrefStr,//自定义dom结构
                    h5Url:window.location.href,//微信分享生成二维码的链接
                    shareTrend:0,//0:不需要站内动态分享  1：需要站内动态分享
                    url: window.location.href,
                    qqTitle: "",
                    qqZoneSummary: "",
                    sinaTitle: "",
                    sinaSummary: "",
                    qqZoneTitle: "",
                    qqSummary: "",
                    hasH5: true,
                    shareQQSuc: function () {
                        //qq分享成功回调
                        commLog.creatEvent({"id":102,"url":window.location.href,"keyword":"QQ分享"});
                    },
                    shareQzoneSuc: function () {
                        //qq空间分享成功回调
                        commLog.creatEvent({"id":103,"url":window.location.href,"keyword":"QQ空间分享"});
                    },
                    shareWeixinSuc:function(){
                        //微信分享成功回调
                        commLog.creatEvent({"id":100,"url":window.location.href,"keyword":"微信分享"});
                    },
                    shareSinaSuc: function () {
                        //微博分享成功回调
                        commLog.creatEvent({"id":104,"url":window.location.href,"keyword":"微博分享"});
                    },
                    clickCallback: function () {
                        exerciseCommon.means.bury({"type": "share"});
                        var isThis = this;
                        var shareDat = {
                            "sceneType": 3,
                            "resourceType": 2,
                            "refId": $(".queIteam").attr("data-id"),
                            "visitSiteId": 13
                        };
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.share,
                            postData: shareDat,
                            success: function (req) {
                                var h5Url = req.responseObject.responseData.data_list[0].share_channel[0].shareUrl;
                                var qqZoneTitle = req.responseObject.responseData.data_list[0].share_channel[2].shareTitle;
                                var qqTitle = req.responseObject.responseData.data_list[0].share_channel[3].shareTitle;
                                var sinaTitle = req.responseObject.responseData.data_list[0].share_channel[4].shareDesc;
                                var qqZoneSummary = req.responseObject.responseData.data_list[0].share_channel[2].shareDesc;
                                var sinaSummary = req.responseObject.responseData.data_list[0].share_channel[4].shareDesc;
                                var qqSummary = req.responseObject.responseData.data_list[0].share_channel[3].shareDesc;
                                // console.log(sinaTitle)
                                isThis.url = h5Url;
                                isThis.h5Url = h5Url;
                                isThis.qqTitle = qqTitle;
                                isThis.qqZoneSummary = qqZoneSummary;
                                isThis.sinaTitle = sinaTitle;
                                isThis.sinaSummary = sinaSummary;
                                isThis.qqZoneTitle = qqZoneTitle;
                                isThis.qqSummary = qqSummary;
                                isThis.hasH5 = true;
                                // console.log(isThis)
                            },
                            failed: function () {

                            }
                        });
                    }
                });
            }

        },
        getUrlName: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        },
        updataExercise: function (type) {
            var lastOnOff = exerciseCommon.parameter.index == exerciseCommon.parameter.exerciseInfo.length - 1;
            if (type) {
                if (exerciseCommon.parameter.exercisesOptions.type.exam == 3) {
                    var removeId = $(".queIteam").attr("data-errorid");
                    var removeData =
                        {"id": removeId, "isValid": "0"};
                    exerciseCommon.means.applyData({
                        port: exerciseCommon.parameter.applyDataPort.removeWrong,
                        postData: removeData,
                        success: function (data) {

                        },
                        failed: function () {

                        }
                    });
                }
            }


            var updataInfo = exerciseCommon.means.deleteData($(".queIteam").attr("data-id"));
            exerciseCommon.parameter.exerciseInfo = updataInfo;
            if (updataInfo.length == 0) {
                if (exerciseCommon.parameter.exercisesOptions.type.exam == 3) {
                    window.location.href = "//www.yi-ding.net.cn/pages/personal/personal_wrongList.html";
                } else if (exerciseCommon.parameter.exercisesOptions.type.exam == 4) {
                    window.location.href = "//www.yi-ding.net.cn/pages/personal/personal_collection.html";
                }
            } else {
                if (lastOnOff) {
                    exerciseCommon.parameter.index = 0;
                }
                exerciseCommon.means.clearHtml();
                exerciseCommon.means.showNowExercise();
            }
        },
        checkExerciseData: function (data) {
            var lastData = [];
            var realData = data.responseObject.responseData.data_list;
            for (var dataNum = 0; dataNum < realData.length; dataNum++) {
                var checkType = Number(realData[dataNum].exercisesType);
                var nowIndex = data.responseObject.responseData.target_exercises == realData[dataNum].exercisesId;
                if (checkType != 4) {
                    var exerciseTitle = realData[dataNum].exercisesName;
                    var ansExp = realData[dataNum].exercisesDesc;
                    var exerciseId = realData[dataNum].exercisesId;
                    var isType = realData[dataNum].exercisesType;
                    var rightIte = realData[dataNum].correctName;
                    var exeSortId = realData[dataNum].exercisesSort;
                    var answerId = realData[dataNum].answerId;
                    var konwledgeDot = realData[dataNum].knowledgeList;
                    var rightId = realData[dataNum].optionCorrect;
                    var customerOption = realData[dataNum].customerOption;
                    var collection = parseInt(realData[dataNum].collection);
                    var collectionId = realData[dataNum].collectionId;
                    var exercisesNameAtt = realData[dataNum].exercisesNameAtt;
                    var exercisesDescAtt = realData[dataNum].exercisesDescAtt;
                    var status = "";
                    if (customerOption.length > 0) {
                        status = realData[dataNum].isRight;
                    } else {
                        status = "2";
                    }
                    var errorId = "";
                    if (realData[dataNum].errorId) {
                        errorId = realData[dataNum].errorId;
                    }
                    var collectiOnOff = false;
                    if (collection == 0) {
                        collectiOnOff = false;
                    } else {
                        collectiOnOff = true;
                    }
                    var optionList = [];
                    for (var optionNum = 0; optionNum < realData[dataNum].optionList.length; optionNum++) {
                        optionList[optionNum] = {};
                        optionList[optionNum].optionDesc = realData[dataNum].optionList[optionNum].optionDesc;
                        optionList[optionNum].optionTitle = realData[dataNum].optionList[optionNum].optionName;
                        optionList[optionNum].optionId = realData[dataNum].optionList[optionNum].optionId;
                        optionList[optionNum].optionDescAtt = realData[dataNum].optionList[optionNum].optionDescAtt;
                        if (rightIte.indexOf(realData[dataNum].optionList[optionNum].optionName) != -1) {
                            optionList[optionNum].isAnswer = 1;
                        } else {
                            optionList[optionNum].isAnswer = 0;
                        }
                    }
                    var dataIteam = {
                        "nowIndex": nowIndex,
                        "title": exerciseTitle,
                        "type": isType,
                        "options": optionList,
                        "exeSortId": exeSortId,
                        "exerciseId": exerciseId,
                        "answerId": answerId,
                        "ansExp": ansExp,
                        "correctName": rightIte,
                        "optionCorrect": rightId,
                        "konwledgeDot": konwledgeDot,
                        "customerOption": customerOption,
                        "collection": collectiOnOff,
                        "errorId": errorId,
                        "collectionId": collectionId,
                        "exercisesNameAtt": exercisesNameAtt,
                        "exercisesDescAtt": exercisesDescAtt,
                        "status": status,
                        "related": false
                    };
                    lastData.push(dataIteam);
                } else {
                    var materialContent = realData[dataNum].exercisesName;
                    var materialNameAtt = realData[dataNum].exercisesNameAtt;
                    for (var materialNum = 0; materialNum < realData[dataNum].exercisesList.length; materialNum++) {
                        var materialTitle = realData[dataNum].exercisesList[materialNum].exercisesName;
                        var materAnsExp = realData[dataNum].exercisesList[materialNum].exercisesDesc;
                        var materexerciseId = realData[dataNum].exercisesList[materialNum].exercisesId;
                        var materIsType = realData[dataNum].exercisesList[materialNum].exercisesType;
                        var materRightIte = realData[dataNum].exercisesList[materialNum].correctName;
                        var materExeSortId = realData[dataNum].exercisesList[materialNum].exercisesSort;
                        var materAnswerId = realData[dataNum].exercisesList[materialNum].answerId;
                        var mkonwledgeDot = realData[dataNum].exercisesList[materialNum].knowledgeList;
                        var mrightId = realData[dataNum].exercisesList[materialNum].optionCorrect;
                        var mcustomerOption = realData[dataNum].exercisesList[materialNum].customerOption;
                        var mcollection = realData[dataNum].exercisesList[materialNum].collection;
                        var mcollectionId = realData[dataNum].exercisesList[materialNum].collectionId;
                        var mexercisesNameAtt = realData[dataNum].exercisesList[materialNum].exercisesNameAtt;
                        var mexercisesDescAtt = realData[dataNum].exercisesList[materialNum].exercisesDescAtt;
                        var mstatus = "";
                        if (mcustomerOption.length > 0) {
                            mstatus = realData[dataNum].exercisesList[materialNum].isRight;
                        } else {
                            mstatus = "2";
                        }
                        if (realData[dataNum].exercisesList[materialNum].errorId) {
                            errorId = realData[dataNum].exercisesList[materialNum].errorId;
                        }
                        var moptionList = [];
                        var mcollectiOnOff = false;
                        if (mcollection == 0) {
                            mcollectiOnOff = false;
                        } else {
                            mcollectiOnOff = true;
                        }
                        for (var moptionNum = 0; moptionNum < realData[dataNum].exercisesList[materialNum].optionList.length; moptionNum++) {
                            moptionList[moptionNum] = {};
                            moptionList[moptionNum].optionDesc = realData[dataNum].exercisesList[materialNum].optionList[moptionNum].optionDesc;
                            moptionList[moptionNum].optionTitle = realData[dataNum].exercisesList[materialNum].optionList[moptionNum].optionName;
                            moptionList[moptionNum].optionId = realData[dataNum].exercisesList[materialNum].optionList[moptionNum].optionId;
                            moptionList[moptionNum].optionDescAtt = realData[dataNum].exercisesList[materialNum].optionList[moptionNum].optionDescAtt;
                            if (materRightIte.indexOf(realData[dataNum].exercisesList[materialNum].optionList[moptionNum].optionName) != -1) {
                                moptionList[moptionNum].isAnswer = 1;
                            } else {
                                moptionList[moptionNum].isAnswer = 0;
                            }
                        }
                        var mateDataIteam = {
                            "nowIndex": nowIndex,
                            "material": materialContent,
                            "materialImg": materialNameAtt,
                            "title": materialTitle,
                            "type": materIsType,
                            "options": moptionList,
                            "exeSortId": materExeSortId,
                            "exerciseId": materexerciseId,
                            "answerId": materAnswerId,
                            "ansExp": materAnsExp,
                            "correctName": materRightIte,
                            "konwledgeDot": mkonwledgeDot,
                            "optionCorrect": mrightId,
                            "customerOption": mcustomerOption,
                            "collection": mcollectiOnOff,
                            "errorId": errorId,
                            "collectionId": mcollectionId,
                            "exercisesNameAtt": mexercisesNameAtt,
                            "exercisesDescAtt": mexercisesDescAtt,
                            "status": mstatus,
                            "related": false
                        };
                        lastData.push(mateDataIteam);
                    }
                    ;
                }
            }

            return lastData;
        },
        inheritExerciseData: function () {
            $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                exerciseCommon.parameter.exerciseBook[index + ""] = {
                    customerOption: this.customerOption,
                    answerTime: exerciseCommon.means.getNowTime(),
                    exercisesId: this.exercisesId,
                    optionCorrect: this.optionCorrect,
                    answerId: this.answerId,
                    "status": this.status
                };
            });
        },
        filterWrongData: function (data) {
            var filterData = [];
            $.each(data, function (index, val) {
                if (this.status == "0") {
                    filterData.push(this);
                }
            });
            return filterData;
        },
        checkLocalData: function (type, id) {
            return (localStorage.getItem(type + id)) ? JSON.parse(localStorage.getItem(type + id)) : false;
        },
        recommend: function () {
            exerciseCommon.means.applyData({
                port: exerciseCommon.parameter.applyDataPort.recommend,
                postData: {"exercisesId": $(".queIteam").attr("data-id")},
                success: function (data) {
                    exerciseCommon.means.demoData({
                        "type": "html",
                        "container": $(".recommendCont ul"),
                        "judge": true,
                        "str": exerciseCommon.template.recommend(data),
                        "strCallBack": function () {
                            var recommendObj = $(".recommendCont");
                            if (recommendObj.find("ul li").length > 0) {
                                $(".course-footer").show();
                                exerciseCommon.means.swipe(recommendObj, $(".recommendCont  .recommend"), 210 + 'px', $(".recommendCont  .recommend li"), "200px");
                            }
                        }
                    });
                }
            });
        },
        postError: function () {
            var fileterData = exerciseCommon.means.statistics.filterExeBook();
            var postData = {
                "customerId": loginAbout.login.status().userId,
                "exercisesList": JSON.stringify(fileterData.isThisResult),
                "seriesDirId": exerciseCommon.parameter.testId,
                "type": "7",
                "treeLevel": exerciseCommon.parameter.treeleve
            };
            exerciseCommon.means.applyData({
                port: exerciseCommon.parameter.applyDataPort.updateResult,
                postData: postData,
                success: function (data) {

                }
            });
        },
        updataResult: function () {
            exerciseCommon.parameter.isHand = false;
            var fileterData = exerciseCommon.means.statistics.filterExeBook();
            var postData = {};
            if (exerciseCommon.parameter.exercisesOptions.type.page == 1 && exerciseCommon.parameter.exercisesOptions.type.exam == 0) {
                postData = {
                    "customerId": localStorage.getItem("userId"),
                    "exercisesList": JSON.stringify(fileterData.lastResult),
                    "tollgate": exerciseCommon.parameter.testId,
                    "type": "1",
                    "isHand": "1"
                };
            } else {
                postData = {
                    "customerId": loginAbout.login.status().userId,
                    "exercisesList": JSON.stringify(fileterData.lastResult),
                    "seriesDirId": exerciseCommon.parameter.testId,
                    "type": "2",
                    "treeLevel": exerciseCommon.parameter.treeleve,
                    "isHand": "1"
                };
            }
            exerciseCommon.means.applyData({
                port: exerciseCommon.parameter.applyDataPort.updateResult,
                postData: postData,
                success: function (data) {
                    exerciseCommon.means.bury({"type": "handin"});
                    var iteData = data.responseObject.responseData.data_list[0];
                    var sumNum = "";
                    var noneNum = "";
                    var rightNum = "";
                    var wrongNum = "";
                    var gate = "";
                    var nextGate = "";
                    var status = "";
                    var nextTreeLevel = "";
                    var reviewExercise = "";
                    if (exerciseCommon.parameter.exercisesOptions.type.page == 1 && exerciseCommon.parameter.exercisesOptions.type.exam == 0) {
                        reviewExercise = JSON.parse(localStorage.getItem("order" + exerciseCommon.parameter.testId));
                        localStorage.setItem("review" + exerciseCommon.parameter.testId, JSON.stringify(reviewExercise));
                        localStorage.removeItem("order" + exerciseCommon.parameter.testId);
                    } else {
                        reviewExercise = JSON.parse(localStorage.getItem("project" + exerciseCommon.parameter.testId));
                        localStorage.setItem("review" + exerciseCommon.parameter.testId, JSON.stringify(reviewExercise));
                        localStorage.removeItem("project" + exerciseCommon.parameter.testId);
                    }
                    if (exerciseCommon.parameter.exercisesOptions.type.page == 1 && exerciseCommon.parameter.exercisesOptions.type.exam == 1) {
                        sumNum = iteData.totalNum;
                        rightNum = iteData.correctNum;
                        noneNum = iteData.notAnswerNum;
                        status = iteData.tollgateStatus;
                        wrongNum = parseInt(sumNum) - parseInt(noneNum) - parseInt(rightNum);
                        gate = exerciseCommon.parameter.testId;
                        nextGate = iteData.seriesDirId;
                        nextTreeLevel = iteData.treeLevel;
                        window.location.href = "//www.yi-ding.net.cn/pages/exercises/exercise_project_result.html?&sum=" + sumNum + "&rightNum=" + rightNum + "&wrongNum=" + wrongNum + "&noneNum=" + noneNum + "&status=" + status + "&nowGate=" + gate + "&nextGate=" + nextGate + "&nextTreeLevel=" + nextTreeLevel+"&nowTreeLevel="+exerciseCommon.parameter.treeleve;
                    } else {
                        sumNum = iteData.totalNum;
                        rightNum = iteData.correctNum;
                        noneNum = iteData.notAnswerNum;
                        status = iteData.tollgateStatus;
                        wrongNum = parseInt(sumNum) - parseInt(noneNum) - parseInt(rightNum);
                        gate = exerciseCommon.parameter.testId;
                        nextGate = iteData.tollgate;
                        window.location.href = "//www.yi-ding.net.cn/pages/exercises/exercise_order_result.html?&sum=" + sumNum + "&rightNum=" + rightNum + "&wrongNum=" + wrongNum + "&noneNum=" + noneNum + "&status=" + status + "&nowGate=" + gate + "&nextGate=" + nextGate;
                    }
                }
            });
        },
        handin: function () {
            var fileterData = exerciseCommon.means.statistics.filterExeBook();
            var lastNone = fileterData.lastNum.none;
            if (lastNone > 0) {

                comm.confirmBox({
                    "title": "您还有" + lastNone + "道题没完成，确定现在交卷吗？",
                    "cancel": "继续答题",
                    "ensure": "交卷",
                    "ensureCallback": function () {
                        exerciseCommon.means.updataResult();
                    },
                    "cancelCallback": function () {

                    }
                });
                $('.yd-confirmModalContent article h2').html("您还有" + lastNone + "道题没完成，确定现在交卷吗？");
                $('.yd-confirmModalContent article p').html("")
            } else {
                exerciseCommon.means.updataResult();
            }
        },
        swipe: function (container, containerImg, Imgwidth, containerLi, height) {
            var nn = containerLi.length - 3;
            container.css({
                position: "relative",
                height: height,
            })
            containerImg.css({
                position: "absolute",
            })
            var containerParent = container.parent();
            var slider = ' <figure class="slide">' +
                '                                <i class="slideLeft"></i>' +
                '                                <i class="slideRight"></i>' +
                '                            </figure>';
            containerParent.prepend(slider);
            if (containerLi.length > 3) {
                container.siblings('.slide').find('.slideLeft').on('mouseover', function () {
                    $(this).addClass('activation');
                })
                container.siblings('.slide').find('.slideLeft').on('mouseout', function () {
                    $(this).removeClass('activation');
                })
                container.siblings('.slide').find('.slideRight').on('mouseover', function () {
                    $(this).addClass('activation');
                })
                container.siblings('.slide').find('.slideRight').on('mouseout', function () {
                    $(this).removeClass('activation');
                })
                // containerImg.on('mouseover',function () {
                //     container.find('.button_left').show();
                //     container.find('.button_right').show();
                // });
                // containerImg.on('mouseout',function () {
                //     container.find('.button_left').hide();
                //     container.find('.button_right').hide();
                // });
                // container.on('mouseover',function () {
                //     container.find('.button_left').show();
                //     container.find('.button_right').show();
                // });
                // container.on('mouseout',function () {
                //     container.find('.button_left').hide();
                //     container.find('.button_right').hide();
                // })
                containerImg.css('left', "30px");
                container.siblings('.slide').find('.slideRight').click(function () {
                    var left_lenght = -(containerLi.length - 4) * parseInt(Imgwidth);
                    if (nn > 0) {
                        containerImg.animate({
                            left: "-=" + Imgwidth
                        }, 1000);
                        nn--;
                    } else {
                        nn = 0;
                    }
                });
                container.siblings('.slide').find('.slideLeft').click(function () {
                    nn++;
                    if (nn <= containerLi.length - 3) {
                        containerImg.animate({
                            left: "+=" + Imgwidth
                        }, 1000);
                    } else {
                        nn = containerLi.length - 3;
                    }
                });
            } else {
                containerParent.find(".slide").remove();
                container.css({
                    position: "",
                    height: "",
                })
                containerImg.css({
                    position: "",
                })
            }
        },
        talk: function () {
            var topicObj = $(".queIteam");
            var talkOption = {
                about: 0,
                refId: topicObj.attr("data-id"),
                type: "disscuss",
                sortType: "7",
                "container": $(".discussAllList"),
                "scene": "0",
                "reviewType": "2",
                postData: {
                    "reviewType": "2",
                    "refId": topicObj.attr("data-id"),
                    "reviewId": "",
                    "sortType": "7",
                    "scene": "0",
                    "logoUseFlag": "2",
                    "pageIndex": "1",
                    "pageSize": "10",
                    "customerId": localStorage.getItem("userId"),
                    "attUseFlag": "16"
                },
                onOperat: function () {
                },
                "success": function (str) {
                    var discussListObj = $(".discussAllList");
                    var htmlOrAppend = discussListObj.find("li").length > 0;
                    if (htmlOrAppend) {
                        discussListObj.append(str);
                    } else {
                        discussListObj.html(str).attr("data-page", "1");
                    }
                    var talkLenStr = "考题讨论&nbsp;&nbsp;(" + talk.discussLen + ")<span class=\"queShiTiPart fr\">参与讨论</span>";
                    $(".queShiTiDisTitle .width92").html(talkLenStr);
                    $(".discuss-content").show();
                    talk.partInDiss();
                    talk.scrollPage(discussListObj, topicObj.attr("data-id"));
                },
                "failed": function () {
                    var discussListObj = $(".discussAllList");
                    var nothingOnOff = discussListObj.find("li").length > 0;
                    if (nothingOnOff) {
                        discussListObj.attr("scrollpagination", "disabled");
                    } else {
                        $(".queShiTiDisNothing").show();
                        var talkLenStr = "考题讨论&nbsp;&nbsp;(" + 0 + ")<span class=\"queShiTiPart fr\">参与讨论</span>";
                        $(".discuss-content").find(".queShiTiDisTitle .width92").html(talkLenStr);
                    }

                    $(".discuss-content").show();
                    talk.partInDiss();
                }
            };
            talk.init(talkOption);
        },
        openRecommend: function (obj) {
            var videoUrl = obj.attr("data-videosrc");
            var indexNum = obj.parents('ul li').index() + 1;
            exerciseCommon.means.bury({
                "type": "recommend",
                "indexNum": indexNum

            });
            window.open("https://" + videoUrl, "_blank");
        },
        openRecommend: function (obj) {
            var videoUrl = obj.attr("data-videosrc");
            var indexNum = obj.parents('ul li').index() + 1;
            exerciseCommon.means.bury({
                "type": "recommend",
                "indexNum": indexNum

            });
            window.open("https://" + videoUrl, "_blank");
        },
        solution: function () {
            exerciseCommon.means.demoData({
                "container": $(".exercisesAnalysis"),
                "type": "html",
                "judge": true,
                "str": exerciseCommon.template.solution(),
                "strCallBack": function () {
                    $(".exercisesAnalysis").show();
                }
            });
        },
        related: function () {
            exerciseCommon.means.solution();
            exerciseCommon.means.recommend();
            exerciseCommon.means.talk();
        },
        statistics: {
            "record": function (options) {
                var nowIndex = exerciseCommon.parameter.index;
                $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                    this.nowIndex = false;
                });
                exerciseCommon.parameter.exerciseInfo[nowIndex].customerOption = options.customerOption;
                exerciseCommon.parameter.exerciseInfo[nowIndex].nowIndex = true;
                exerciseCommon.parameter.exerciseInfo[nowIndex].status = options.status;
                exerciseCommon.parameter.exerciseInfo[nowIndex].answerTime = options.answerTime;
                if (exerciseCommon.parameter.exercisesOptions.type.page == 1 && exerciseCommon.parameter.exercisesOptions.type.exam == 0) {
                    localStorage.setItem("order" + exerciseCommon.parameter.testId, JSON.stringify(exerciseCommon.parameter.exerciseInfo));
                } else {
                    localStorage.setItem("project" + exerciseCommon.parameter.testId, JSON.stringify(exerciseCommon.parameter.exerciseInfo));
                }
            },
            "filterExeBook": function () {
                var statistics = {};
                statistics.lastResult = [];
                statistics.saveResult = [];
                statistics.isThisResult = [];
                statistics.resultStr = "";
                statistics.resultNum = {
                    "right": 0,
                    "wrong": 0,
                    "none": 0
                };
                statistics.lastNum = {
                    "right": 0,
                    "wrong": 0,
                    "none": 0
                };
                $.each(exerciseCommon.parameter.exerciseInfo, function (nowItemNum, val) {
                    var testStaKey = parseInt(nowItemNum) + 1;
                    var nowIndexClass = (this.nowIndex) ? "queShiTiReLiT" : "";
                    var testSwitchType = this.status;
                    var saveData = {
                        'answerId': this.answerId,
                        'optionCorrect': this.optionCorrect,
                        'customerOption': this.customerOption,
                        'answerTime': (this.answerTime) ? this.answerTime : "",
                        'exercisesId': this.exerciseId,
                        "state": this.status
                    };
                    if (this.nowIndex) {
                        statistics.isThisResult.push(saveData);
                    }
                    statistics.lastResult[nowItemNum] = saveData;
                    if (saveData.state != '2') {
                        statistics.saveResult.push(saveData);
                    }
                    switch (testSwitchType) {
                        case "1":
                            statistics.resultStr += '<a href="javascript:;" data-shitiid="' + nowItemNum + '" class=\"queShiTiReLi queShiTiReLiR ' + nowIndexClass + '\">' + testStaKey + '</a>';
                            statistics.resultNum.right++;
                            statistics.lastNum.right++;
                            break;
                        case "0":
                            if (this.customerOption.length > 0) {
                                statistics.resultStr += '<a href="javascript:;" data-shitiid="' + nowItemNum + '" class=\"queShiTiReLi queShiTiReLiW ' + nowIndexClass + '\">' + testStaKey + '</a>';
                                statistics.resultNum.wrong++;
                            } else {
                                statistics.resultStr += '<a href="javascript:;" data-shitiid="' + nowItemNum + '" class=\"queShiTiReLi queShiTiReLiN ' + nowIndexClass + '\">' + testStaKey + '</a>';
                                statistics.resultNum.none++;
                            }
                            statistics.lastNum.wrong++;
                            break;
                        case "2":
                            statistics.resultStr += '<a href="javascript:;" data-shitiid="' + nowItemNum + '" class=\"queShiTiReLi queShiTiReLiN ' + nowIndexClass + '\">' + testStaKey + '</a>';
                            statistics.resultNum.none++;
                            statistics.lastNum.none++;
                            break;
                        default:
                            break
                    }

                });
                //console.log(statistics.resultNum.right)
                /*if(exerciseCommon.parameter.exercisesOptions.type)*/
                if (exerciseCommon.parameter.exercisesOptions.type.page == 1) {
                    statistics.resultStr = '<div class="queShiTiReTitle">' +
                        '<span class="queShiTiReIte queShiTiReIteR">对<i class="queShiTiReR">' + statistics.resultNum.right + '</i></span>' +
                        '<span class="queShiTiReIte queShiTiReIteW">错<i class="queShiTiReW">' + statistics.resultNum.wrong + '</i></span>' +
                        '<span class="queShiTiReIte queShiTiReIteN">未答<i class="queShiTiReN">' + statistics.resultNum.none + '</i></span>' +
                        '<span class="queShiTiReIte queShiTiReIteC">交卷<i class="queShiTiReN"></i></span>' +
                        '<span class="queShiTiReIte"></span>' +
                        '</div>' + "<div class=\"queShiTiReContent\">" + statistics.resultStr + "</div>" + "</div>";
                } else {
                    statistics.resultStr = '<div class="queShiTiReTitle">' +
                        '<span class="queShiTiReIte queShiTiReIteR">对<i class="queShiTiReR">' + statistics.resultNum.right + '</i></span>' +
                        '<span class="queShiTiReIte queShiTiReIteW">错<i class="queShiTiReW">' + statistics.resultNum.wrong + '</i></span>' +
                        '<span class="queShiTiReIte queShiTiReIteN">未答<i class="queShiTiReN">' + statistics.resultNum.none + '</i></span>' +
                        '<span class="queShiTiReIte"></span>' +
                        '</div>' + "<div class=\"queShiTiReContent\">" + statistics.resultStr + "</div>" + "</div>";
                }
                return statistics;
            }

        },
        deleteData: function (id) {
            var updataInfo = [];
            $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                if (this.exerciseId != id) {
                    updataInfo.push(this);
                }
            });
            return updataInfo;
        },
        compareData: function (backStore, localStore) {
            var backStrorNum = 0;
            var localStoreNum = 0;
            var localNoneNum = 0;
            var dataInfo = {};
            dataInfo.goOn = false;
            $.each(backStore, function (index, val) {
                if (this.customerOption.length > 0) {
                    backStrorNum++;
                }
            });
            $.each(localStore, function (index, val) {
                if (this.customerOption.length > 0) {
                    localStoreNum++;
                }
                if (this.status != 2) {
                    localNoneNum++;
                }
            });
            if (backStrorNum >= localStoreNum) {
                if (localNoneNum == 0) {
                    dataInfo.exerciseData = backStore;
                    if (backStrorNum == 0) {
                        if (localStore) {
                            dataInfo.goOn = true;
                        } else {
                            dataInfo.goOn = false;
                        }
                    } else {
                        dataInfo.goOn = true;
                    }

                } else {
                    dataInfo.exerciseData = localStore;
                    dataInfo.goOn = true;
                }
            } else {
                dataInfo.exerciseData = localStore;
                dataInfo.goOn = true;
            }
            return dataInfo;
        },
        clearHistoryData: function () {
            if (exerciseCommon.parameter.exercisesOptions.type.page == 1 && exerciseCommon.parameter.exercisesOptions.type.exam == 0) {
                localStorage.removeItem("order" + exerciseCommon.parameter.testId);
            } else {
                localStorage.removeItem("project" + exerciseCommon.parameter.testId);
            }

            $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                this.nowIndex = false;
                this.status = "2";
                this.customerOption = "";
                this.related = false;
            });
        },
        continueTest: function (options) {
            comm.confirmBox({
                "title": "您有上次未完成的练习，是否继续？",
                "cancel": "重新开始",
                "ensure": "继续",
                "ensureCallback": function () {
                    exerciseCommon.parameter.index = 0;
                    exerciseCommon.means.inheritExerciseData();
                    $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                        if (this.nowIndex) {
                            //console.log(index)
                            exerciseCommon.parameter.index = index;
                        }
                    });
                    $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                        this.nowIndex = false;
                    });
                    exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].nowIndex = true;
                    exerciseCommon.means.demoData({
                        "container": $("#queInnerContent"),
                        "type": "html",
                        "judge": true,
                        "str": exerciseCommon.template.exercise(),
                        "strCallBack": function () {
                            $("#quesContainer").removeClass("none");
                            $("#queBehavior").removeClass("none");
                            exerciseCommon.work.changeIndex();
                            exerciseCommon.work.checkExp();
                            exerciseCommon.work.lookAtQueReco.productRecord();
                            exerciseCommon.means.showNowExercise();
                            if ($(".queIteam").attr("data-status") != "2") {
                                exerciseCommon.work.answerAbout.forbidTest();
                                if ($(".queIteam").attr("data-status") != "0") {
                                    exerciseCommon.means.related();
                                }
                            } else {
                                exerciseCommon.work.answerAbout.test();
                            }
                        }
                    });
                },
                "cancelCallback": function () {
                    exerciseCommon.parameter.index = 0;
                    exerciseCommon.means.clearHistoryData();
                    //console.log(exerciseCommon.parameter.exerciseInfo)
                    $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                        this.nowIndex = false;
                        this.answerId = "0";
                    });
                    exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].nowIndex = true;
                    exerciseCommon.means.demoData({
                        "container": $("#queInnerContent"),
                        "type": "html",
                        "judge": true,
                        "str": exerciseCommon.template.exercise(),
                        "strCallBack": function () {
                            $("#quesContainer").removeClass("none");
                            $("#queBehavior").removeClass("none");
                            exerciseCommon.work.changeIndex();
                            exerciseCommon.work.checkExp();
                            exerciseCommon.work.lookAtQueReco.productRecord();
                            exerciseCommon.means.showNowExercise();
                            exerciseCommon.work.answerAbout.test();
                        }
                    });
                }
            });
        },
        showNowExercise: function () {
            var nowIndex = exerciseCommon.parameter.index + 1;
            var sum = exerciseCommon.parameter.exerciseInfo.length;
            $(".queBehNow .queName").html(nowIndex + "/" + sum);
            $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                this.nowIndex = false;
            });
            exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].nowIndex = true;
            if (exerciseCommon.parameter.exercisesOptions.type.page == 1 && exerciseCommon.parameter.exercisesOptions.type.exam == 0) {
                localStorage.setItem("order" + exerciseCommon.parameter.testId, JSON.stringify(exerciseCommon.parameter.exerciseInfo));
            } else {
                localStorage.setItem("project" + exerciseCommon.parameter.testId, JSON.stringify(exerciseCommon.parameter.exerciseInfo));
            }
            var recordContainer = $("#queShiTiRecord");
            if (!recordContainer.hasClass("none")) {
                exerciseCommon.work.lookAtQueReco.showRecord();
            }
            exerciseCommon.means.demoData({
                "container": $("#queInnerContent"),
                "type": "html",
                judge: true,
                "str": exerciseCommon.template.exercise(),
                "strCallBack": function () {
                    exerciseCommon.means.bury({"type": "exercise"});
                    $("#quesContainer").removeClass("none");
                    if (exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].related) {
                        exerciseCommon.work.answerAbout.forbidTest();
                        exerciseCommon.means.related();
                    } else {
                        exerciseCommon.work.answerAbout.test();
                    }
                    if (exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].status != "2") {
                        exerciseCommon.work.answerAbout.forbidTest();
                    }
                }
            });
            if (nowIndex == 1) {
                $(".queBehPre").addClass("queBehPreGray");
            } else {
                $(".queBehPre").removeClass("queBehPreGray");
            }
            var nextObj = $(".queIcoNextQue");
            if (nowIndex == sum) {
                if (exerciseCommon.parameter.exercisesOptions.type.page == 1) {
                    nextObj.html("<i></i><span class=\"queName\">交卷</span>").attr("data-handin", true);
                } else {
                    nextObj.addClass("queBehNextGray").attr("data-handin", true);
                }
            } else {
                nextObj.html("<i></i><span class=\"queName\">下一题</span>").attr("data-handin", false).removeClass("queBehNextGray");
            }
        }
    },
    work: {
        "answerAbout": {//关于答题的所有方法
            "test": function () {
                var isThis = $(".queIteam");
                var multipleOnOff = isThis.find("#queAffirmButton").length > 0;
                isThis.find(".queShitiOptions").each(function () {
                    $(this).unbind("click").bind("click", function (e) {
                        if (e.target.tagName.toLowerCase() === "img") {
                            return false;
                        }
                        if (multipleOnOff) {
                            $(this).toggleClass("queShitiOptionsN");
                            exerciseCommon.work.answerAbout.toggleAffirm();
                            exerciseCommon.work.answerAbout.affirmTest();
                        } else {
                            var answerOptionsId = "";
                            var isRight = true;
                            answerOptionsId += $(this).attr("data-opid");
                            if (!(JSON.parse($(this).attr("data-judge")))) {
                                isRight = false;
                                $(this).addClass("queShitiOptionsW");
                                exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].related = true;
                                exerciseCommon.means.related();
                                exerciseCommon.work.answerAbout.forbidTest();
                                var wrongData = {
                                    "customerId": localStorage.getItem("userId"),
                                    "exercisesId": isThis.attr("data-id"),
                                    "type": "2",
                                    "customerOption": answerOptionsId
                                };
                                exerciseCommon.means.applyData({
                                    port: exerciseCommon.parameter.applyDataPort.errorExercise,
                                    postData: wrongData,
                                    success: function (data) {

                                    }
                                });
                                if (exerciseCommon.parameter.exercisesOptions.type.page == 1) {
                                    comm.guideUser(0);
                                }
                                if (exerciseCommon.parameter.exercisesOptions.type.exam == 3 && exerciseCommon.parameter.exercisesOptions.type.page == 3) {
                                    exerciseCommon.means.postError();
                                }
                            } else {
                                $(this).addClass("queShitiOptionsR");
                                exerciseCommon.work.answerAbout.forbidTest();
                                clearTimeout(nextQueTimer);
                                var nextQueTimer = setTimeout(function () {

                                    if (exerciseCommon.parameter.exercisesOptions.type.exam == 3 && exerciseCommon.parameter.exercisesOptions.type.page == 3) {
                                        exerciseCommon.means.postError();
                                        exerciseCommon.means.updataExercise(false);
                                        return false;

                                    }
                                    if (exerciseCommon.parameter.index == exerciseCommon.parameter.exerciseInfo.length - 1) {
                                        var recordContainer = $("#queShiTiRecord");
                                        if (recordContainer.hasClass("none")) {
                                            $(".queBehNow").trigger("click");
                                        }
                                        var lockRecordObj = $("#queBehavior");
                                        var topHeight = $("#quesContainer").height();
                                        $("html,body").animate({scrollTop: lockRecordObj.offset().top + topHeight}, 1000);
                                    } else {
                                        $(".queBehNext").trigger("click");
                                    }
                                    ;
                                }, 400);

                            }
                            var storeJson = {
                                customerOption: answerOptionsId,
                                answerTime: exerciseCommon.means.getNowTime(),
                                exercisesId: isThis.attr("data-id"),
                                optionCorrect: isThis.attr("data-correct"),
                                answerId: isThis.attr("data-ansid"),
                                status: ""
                            };
                            if (isRight) {
                                storeJson.status = "1";
                            } else {
                                storeJson.status = "0";
                            }
                            exerciseCommon.means.statistics.record(storeJson);
                        }
                    })
                });
            },
            forbidTest: function () {
                $(".queShitiOptions").each(function () {
                    $(this).unbind("click");
                });
            },
            affirmTest: function () {
                var affirmObj = $(".queButtonBeen");
                var topicObj = $(".queIteam");
                affirmObj.unbind("click").bind("click", function () {
                    var answerOptionsId = "";
                    var isRight = true;
                    $(this).hide();
                    $(".queShitiOptionsN").each(function () {
                        answerOptionsId += $(this).attr("data-opid") + ",";
                        if (!(JSON.parse($(this).attr("data-judge")))) {
                            isRight = false;
                            $(this).addClass("queShitiOptionsW");
                        } else {
                            $(this).addClass("queShitiOptionsR");
                        }
                    });
                    $(".queShitiOptions").each(function () {
                        if (!(JSON.parse($(this).attr("data-judge"))) && ($(this).hasClass("queShitiOptionsN"))) {
                            isRight = false;
                            exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].related = true;
                        }
                        if ((JSON.parse($(this).attr("data-judge"))) && !($(this).hasClass("queShitiOptionsN"))) {
                            isRight = false;
                        }
                    });
                    answerOptionsId = answerOptionsId.substring(0, answerOptionsId.length - 1);
                    var storeJson = {
                        customerOption: answerOptionsId,
                        answerTime: exerciseCommon.means.getNowTime(),
                        exercisesId: topicObj.attr("data-id"),
                        optionCorrect: topicObj.attr("data-correct"),
                        answerId: topicObj.attr("data-ansid"),
                        status: ""
                    };
                    if (isRight) {
                        storeJson.status = "1";
                        exerciseCommon.work.answerAbout.forbidTest();
                        clearTimeout(nextQueTimer);
                        var nextQueTimer = setTimeout(function () {
                            if (exerciseCommon.parameter.exercisesOptions.type.exam == 3 && exerciseCommon.parameter.exercisesOptions.type.page == 3) {
                                exerciseCommon.means.postError();
                                exerciseCommon.means.updataExercise(false);
                                return false;

                            }
                            if (exerciseCommon.parameter.index == exerciseCommon.parameter.exerciseInfo.length - 1) {
                                var recordContainer = $("#queShiTiRecord");
                                if (recordContainer.hasClass("none")) {
                                    $(".queBehNow").trigger("click");
                                }
                                var lockRecordObj = $("#queBehavior");
                                var topHeight = $("#quesContainer").height();
                                $("html,body").animate({scrollTop: lockRecordObj.offset().top + topHeight}, 1000);
                            } else {
                                $(".queBehNext").trigger("click");
                            }
                        }, 400);
                    } else {
                        storeJson.status = "0";
                        exerciseCommon.means.related();
                        exerciseCommon.work.answerAbout.forbidTest();
                        var wrongData = {
                            "customerId": localStorage.getItem("userId"),
                            "exercisesId": topicObj.attr("data-id"),
                            "type": "2",
                            "customerOption": answerOptionsId
                        };
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.errorExercise,
                            postData: wrongData,
                            success: function (data) {

                            }
                        });
                        comm.guideUser(0);
                        if (exerciseCommon.parameter.exercisesOptions.type.exam == 3 && exerciseCommon.parameter.exercisesOptions.type.page == 3) {
                            exerciseCommon.means.postError();
                        }
                    }
                    exerciseCommon.means.statistics.record(storeJson);

                });
            },
            toggleAffirm: function () {
                var affirmOnOff = $(".queShitiOptionsN").length > 0;
                var affirmObj = $("#queAffirmButton");
                if (affirmOnOff) {
                    affirmObj.addClass("queButtonBeen");
                } else {
                    affirmObj.removeClass("queButtonBeen");
                }
            }
        },
        lookAtQueReco: {
            "showRecord": function () {
                var recordContainer = $("#queShiTiRecord");
                var recordStr = exerciseCommon.means.statistics.filterExeBook().resultStr;
                recordContainer.html(recordStr);
                var recoredIteam = $(".queShiTiReLi");
                var handinObj = $(".queShiTiReIteC");
                recoredIteam.each(function () {
                    $(this).unbind("click").bind("click", function () {
                        exerciseCommon.means.clearHtml();
                        exerciseCommon.parameter.index = parseInt($(this).attr("data-shitiid"));
                        $(".queShiTiReLiT").removeClass("queShiTiReLiT");
                        recoredIteam.eq(exerciseCommon.parameter.index).addClass("queShiTiReLiT");
                        $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                            this.nowIndex = false;
                        });
                        exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].nowIndex = true;
                        exerciseCommon.means.demoData({
                            "container": $("#queInnerContent"),
                            "type": "html",
                            judge: true,
                            "str": exerciseCommon.template.exercise(),
                            "strCallBack": function () {
                                exerciseCommon.means.bury({"type": "exercise"});
                                $("#quesContainer").removeClass("none");
                                $("#queBehavior").removeClass("none");
                                exerciseCommon.work.changeIndex();
                                exerciseCommon.work.checkExp();
                                exerciseCommon.work.lookAtQueReco.productRecord();
                                exerciseCommon.work.answerAbout.test();
                                exerciseCommon.means.showNowExercise();
                            }
                        })
                    });
                });
                handinObj.unbind("click").bind("click", function () {
                    exerciseCommon.means.handin();
                });
            },
            productRecord: function () {
                var recordContainer = $("#queShiTiRecord");
                var recordTargetObj = $(".queBehNow");
                recordTargetObj.unbind("click").bind("click", function () {
                    recordContainer.toggleClass("none");
                    if (!recordContainer.hasClass("none")) {
                        exerciseCommon.means.bury({"type": "openRecord"});
                        exerciseCommon.work.lookAtQueReco.showRecord();
                    } else {
                        exerciseCommon.means.bury({"type": "closeRecord"});
                    }

                });
            }
        },
        removeExercise: function () {
            $(".queIcoExeriseDel").unbind("click").bind("click", function () {
                exerciseCommon.means.updataExercise(true);
            });
        },
        "enshrine": function (obj) {
            obj.find("i").toggleClass("active");
            var isThis = obj;
            var topicObj = $(".queIteam");
            var collectId = obj.attr("data-collectid");
            if (obj.find("i").hasClass("active")) {
                exerciseCommon.means.applyData({
                    port: exerciseCommon.parameter.applyDataPort.confirmCollect,
                    postData: {
                        "refId": topicObj.attr("data-id"),
                        "collectionType": "2",
                        "customerId": localStorage.getItem("userId"),
                        "collectionAnswer": exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].customerOption
                    },
                    success: function (data) {
                        var collectId = data.responseObject.responsePk;
                        isThis.attr("data-collectid", collectId);
                        if (exerciseCommon.parameter.exercisesOptions.type.page == 1) {
                            comm.guideUser(1);
                        }
                        exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].collectionId = collectId;
                        exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].collection = true;
                    }
                });
            } else {
                isThis.removeAttr("data-collectid");
                topicObj.removeAttr("data-collectid").attr("data-collect", false);
                exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].collection = false;
                exerciseCommon.means.applyData({
                    port: exerciseCommon.parameter.applyDataPort.abolishCollect,
                    postData: {
                        "id": collectId
                    },
                    success: function (data) {
                        if (exerciseCommon.parameter.exercisesOptions.type.exam == 4 && exerciseCommon.parameter.exercisesOptions.type.page == 3) {
                            exerciseCommon.means.updataExercise(false);
                        }
                    }
                });
            }
        },
        saveProgress: function (obj) {
            var fileterData = exerciseCommon.means.statistics.filterExeBook();
            var isThis = $(".queIteam");
            var postData = {};
            if (exerciseCommon.parameter.exercisesOptions.type.page == 1) {
                if (exerciseCommon.parameter.exercisesOptions.type.exam == 0) {
                    postData = {
                        "customerId": localStorage.getItem("userId"),
                        "exercisesList": JSON.stringify(fileterData.saveResult),
                        "tollgate": exerciseCommon.parameter.testId,
                        "type": "1",
                        "isHand": "0",
                        "targetExercises": isThis.attr("data-id")
                    };
                } else {
                    postData = {
                        "customerId": localStorage.getItem("userId"),
                        "exercisesList": JSON.stringify(fileterData.saveResult),
                        "seriesDirId": exerciseCommon.parameter.testId,
                        "treeLevel": exerciseCommon.parameter.treeleve,
                        "type": "2",
                        "isHand": "0",
                        "targetExercises": isThis.attr("data-id")
                    };
                }
            }
            exerciseCommon.means.applyData({
                port: exerciseCommon.parameter.applyDataPort.updateResult,
                postData: postData,
                success: function (data) {

                }
            });
        },
        checkExp: function () {
            $(".queBehExp").unbind("click").bind("click", function () {
                if ($(".discuss-content").css("display") == "none") {
                    exerciseCommon.means.related();
                    var nowExerciseData = exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index];
                    nowExerciseData.related = true;
                    if (nowExerciseData.status == "2") {
                        nowExerciseData.status = "0";
                        var isThis = $(".queIteam");
                        var wrongData = {
                            "customerId": localStorage.getItem("userId"),
                            "exercisesId": isThis.attr("data-id"),
                            "type": "2",
                            "customerOption": ""
                        };
                        var storeJson = {
                            customerOption: "",
                            answerTime: exerciseCommon.means.getNowTime(),
                            exercisesId: isThis.attr("data-id"),
                            optionCorrect: isThis.attr("data-correct"),
                            answerId: isThis.attr("data-ansid"),
                            status: "0"
                        };
                        exerciseCommon.means.statistics.record(storeJson);
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.errorExercise,
                            postData: wrongData,
                            success: function (data) {
                                isThis.attr({"data-status": "0"});
                                exerciseCommon.work.answerAbout.forbidTest();
                                if($(".queIteam #queAffirmButton").length==1){
                                    $(".queIteam #queAffirmButton").hide();
                                }
                            }
                        });
                    }
                } else {
                    exerciseCommon.parameter.exerciseInfo[exerciseCommon.parameter.index].related = false;
                    $(".discussAllList").html("").removeAttr("scrollpagination").removeAttr("data-page");
                    $(".discuss-content").hide();
                    $(".course-footer").hide().find(".recommendCont ul").html("");
                    $(".exercisesAnalysis").hide().html("");
                }
            });
        },
        changeIndex: function () {
            var preObj = $(".queBehPre");
            var nextObj = $(".queBehNext");
            var sumLen = exerciseCommon.parameter.exerciseInfo.length;
            preObj.unbind("click").bind("click", function () {
                if($("#yd-shareBox").css("display")=="block"){
                    $("#share").trigger("click");
                }
                if ($(this).hasClass("queBehPreGray")) {
                    return false;
                }
                exerciseCommon.parameter.index--;
                if (exerciseCommon.parameter.index < 0) {
                    exerciseCommon.parameter.index = 0;
                }
                exerciseCommon.means.clearHtml();

                exerciseCommon.means.showNowExercise();
            });
            nextObj.unbind("click").bind("click", function () {
                if($("#yd-shareBox").css("display")=="block"){
                    $("#share").trigger("click");
                }
                exerciseCommon.parameter.index++;
                if (exerciseCommon.parameter.index > sumLen - 1) {
                    exerciseCommon.parameter.index = sumLen - 1;
                }
                if ($(this).attr("data-handin")) {
                    if (JSON.parse($(this).attr("data-handin"))) {
                        if (exerciseCommon.parameter.exercisesOptions.type.page == 1) {
                            exerciseCommon.means.handin();
                        } else {
                            return false;
                        }
                    }
                }
                exerciseCommon.means.clearHtml();
                exerciseCommon.means.showNowExercise();
            })


        },
        alertImg: function (obj) {
            var imgData = JSON.parse(obj.parent().attr("data-imgbox"));
            var nowIndex = parseInt(obj.index()) + 1;
            creatCarousel.creatHtml(imgData, nowIndex, "0");
            $(".swiper_right").hide();
            return false;
        },
        "openOrderBegin": function () {
            var lockOrderObj = $(".doneNone");
            if (lockOrderObj.length > 0) {
                var topHeight = lockOrderObj.eq(0).prev().offset().top - $(window).scrollTop() - 88;
                $("html,body").animate({scrollTop: $("#quePracticeBegin").offset().top + topHeight}, 1000);
            }
            $(".ordergate").each(function () {
                $(this).unbind("click").bind("click", function () {
                    var oNOff = JSON.parse($(this).attr("data-lock"));
                    var gateId = $(this).attr("data-orderid");


                    if (oNOff) {
                        //window.location.href = "//www.yi-ding.net.cn/pages/exercises/exercise_order.html?gateId=" + gateId;
                        comm.jump($(this),"//www.yi-ding.net.cn/pages/exercises/exercise_order.html?gateId=" + gateId);
                    } else {
                        popup({"text": "关卡未解锁，请先完成之前关卡"});
                    }
                });
            });
            $("#quePracticeBegin").removeClass("none");
        },
        "projectBegin": function () {
            var projectListObj = $(".queSpeciallyIteamTi");
            $(".queSpeciallyIteamInner").each(function () {
                $(this).hide();
            });
            $("#queSpecially").removeClass("none");
            projectListObj.each(function () {
                $(this).unbind("click").bind("click", function () {
                    $(this).next().toggle(0, function () {
                        $(this).prev().find(".queSpeciallyLiIco").toggleClass("queSpeciallyLiIcoTo");
                        if ($(this).prev().find(".queSpeciallyLiIco").hasClass("queSpeciallyLiIcoTo")) {
                            commLog.creatEvent({
                                "id": 199,
                                "url": location.href,
                                "keyword": "专项练习列表页-课程拓展列表展开",
                                "browseType": "31",

                            });
                        } else {
                            commLog.creatEvent({
                                "id": 198,
                                "url": location.href,
                                "keyword": "专项练习列表页-课程拓展列表收起",
                                "browseType": "31",

                            });
                        }
                    });
                });
            });
            var toggleHeightObj = $(".projectToggleHeight");
            if (toggleHeightObj.length > 0) {
                toggleHeightObj.trigger("click");
            } else {
                projectListObj.eq(0).trigger("click");
            }
            $(".queSpeciAnsIteam").each(function () {
                $(this).unbind("click").bind("click", function (e) {
                    e.stopPropagation();
                    var seriesid = $(this).attr("data-seriesid");//这个变量是用来判断专项练习里面具体的考试科目
                    var treeLevel = $(this).attr("data-treeLevel");
                    if($(this).attr("data-treelevel")=="0"){
                        commLog.creatEvent({
                            "id": 196,
                            "url": location.href,
                            "keyword": "专项练习列表页-系列课回答",
                            "browseType": "31"
                        });

                    }else{
                        commLog.creatEvent({
                            "id": 197,
                            "url": location.href,
                            "keyword": "专项练习列表页-章节回答",
                            "browseType": "31"
                        });
                    }
                    //window.location.href = "//www.yi-ding.net.cn/pages/exercises/exercise_project.html?&gateId=" + seriesid + "&treeLevel=" + treeLevel;
                    comm.jump($(this), "//www.yi-ding.net.cn/pages/exercises/exercise_project.html?&gateId=" + seriesid + "&treeLevel=" + treeLevel);
                });
            });
        }
    },
    template: {
        "exercise": function () {
            var nowIndex = exerciseCommon.parameter.index;
            var nowExerciseData = exerciseCommon.parameter.exerciseInfo[nowIndex];
            var nowExerciseStr = "";
            var exerciseId = nowExerciseData.exerciseId;
            var exerciseTitle = nowExerciseData.title + exerciseCommon.template.richImg(nowExerciseData.exercisesNameAtt);
            var rightId = nowExerciseData.optionCorrect;
            var exerciseCollectState = (nowExerciseData.collectionId.length > 0);
            var exerciseCollectId = nowExerciseData.collectionId;
            var customerOption = nowExerciseData.customerOption;
            var nowType = nowExerciseData.type;
            var answerId = nowExerciseData.answerId;
            var errorId = nowExerciseData.errorId;
            var typeStr = "";
            var materialStr = "";
            var typeHtmlStr = "";
            var exerciseClass = "queOneCheck";
            var optionIcoStr = "queNoStatus";
            var optionsStr = "";
            var affirmStr = "";
            var status = "2";
            var collectOnOff = nowExerciseData.collection;
            if (nowType == 1) {
                typeStr = "1";
                typeHtmlStr = "单";
            } else if (nowType == 2) {
                typeStr = "2";
                typeHtmlStr = "多";
                exerciseClass = "queMoreCheck";
                optionIcoStr = "queNoStatus queMultiple";
                if((exerciseCommon.parameter.exercisesOptions.type.page==1)&&(nowExerciseData.status==2)){
                    affirmStr = "<section id=\'queAffirm\'class=\'queAffirmContainer\'><div id=\'queAffirmButton\'class=\'queButton queButtonReady\'style=\'display: block;\'>确认答案</div></section>";
                }
                if(((exerciseCommon.parameter.exercisesOptions.type.page==3)&&(exerciseCommon.parameter.exercisesOptions.type.exam==3))){
                    affirmStr = "<section id=\'queAffirm\'class=\'queAffirmContainer\'><div id=\'queAffirmButton\'class=\'queButton queButtonReady\'style=\'display: block;\'>确认答案</div></section>";
                }
            } else if (nowType == 3) {
                typeStr = "3";
                typeHtmlStr = "判";
            }
            if (nowExerciseData.material) {
                materialStr += "<article class=\'queMaterial\'>" + nowExerciseData.material + exerciseCommon.template.richImg(nowExerciseData.materialImg) + "</article>";
            }
            if (customerOption.length > 0) {
                status = "1";
                var customerHistory = customerOption.split(",");
            }
            $.each(nowExerciseData.options, function (index, val) {
                var nowData = this;
                var isRightOnOff = (nowData.isAnswer == 1);
                var nowIteam = nowData.optionTitle;
                var nowIteamId = nowData.optionId;
                var optionsClass = "";
                if (status == "1") {
                    $.each(customerHistory, function (index, val) {
                        if (nowIteamId == val) {
                            if (isRightOnOff) {
                                optionsClass = "queShitiOptionsR";
                            } else {
                                status = "0";
                                optionsClass = "queShitiOptionsW";
                            }
                        }
                    });
                }

                var nowIteamTi = nowData.optionDesc + exerciseCommon.template.richImg(nowData.optionDescAtt);
                optionsStr += "<div class=\"queShitiOptions " + optionsClass + "\" data-opId=\"" + nowIteamId + "\" data-judge=\"" + isRightOnOff + "\" data-arrange=\"" + nowIteam + "\"><i class=\"" + optionIcoStr + "\">" + nowIteam + "</i><div class='anwercont'>" + "<div class='answercontText'>" + nowIteamTi + "</div></div></div>";
            });
            var collectClass = "";
            var collectId = "";
            if (collectOnOff) {
                collectClass = "active";
                collectId = exerciseCollectId;
            }
            var saveTimeDis = "";
            saveTimeDis = "none";
            var headerStr = "<header id=\'questionsHd\'class=\'questionsHeader\'><span class=\'queIcoClose mobileMobule\'><i></i></span><span class=\'queHdIteam   queIcoTitle\'>" + exerciseCommon.parameter.exercisesOptions.type.name + "</span><span class=\' queIcoShare mobileMobule\'><i></i></span><span class=\'queIcoCollect\' data-collectId=\'" + collectId + "\'  onclick='exerciseCommon.work.enshrine($(this))'><i class=\'" + collectClass + "\'></i><span class=\'queName\'>收藏</span></span><div class=\'saveTime " + saveTimeDis + "\' onclick='exerciseCommon.work.saveProgress();'><i></i><span>保存</span><span>进度</span></div></header>";
            nowExerciseStr = "<li class=\'queIteam " + exerciseClass + "\' data-collectid=\'" + exerciseCollectId + "\' data-correct=\'" + rightId + "\' data-status=\'" + status + "\' data-errorid=\'" + errorId + "\' data-collect=\'" + exerciseCollectState + "\' data-customeroption=\'" + customerOption + "\' data-ansid=\'" + answerId + "\' data-type=\'" + typeStr + "\' data-id=\'" + exerciseId + "\' data-nowqueindex=\'" + exerciseCommon.parameter.index + "\'>" + headerStr + materialStr + "<article class=\'quesSingle\'><div class=\'queShitiTitle\'><span class=\'queShitiType\'>" + typeHtmlStr + "</span><div class=\'queShiticont\'><div class=\'queShiticontText\'>" + exerciseTitle + "</div></div></div><div class=\'queShitiOptionsContent\'>" + optionsStr + "</div></article>" + affirmStr + "</li>";
            return nowExerciseStr;
        },
        "solution": function () {
            var nowIndex = exerciseCommon.parameter.index;
            var nowExerciseData = exerciseCommon.parameter.exerciseInfo[nowIndex];
            var expStr = (nowExerciseData.ansExp.length > 184) ? "<div class=\'aAnalysis_text\'><span class=\'aAnalysis_textSpan courseHidden\'>" + nowExerciseData.ansExp + "</span><p class=\'coursePic-right icon-upMore\' onclick='exerciseCommon.means.toggleHeight($(this).prev());'><i></i><span>展开</span></p></div>" : "<div class=\'aAnalysis_text\'><span class=\'aAnalysis_textSpan\'>" + nowExerciseData.ansExp + "</span></div>";
            var knoledgeStr = "";
            var rightStr = "";
            var yoursStr = "";
            var youHave = false;
            var wrong = true;
            $(".queShitiOptions").each(function () {
                var rightOnOff = JSON.parse($(this).attr("data-judge"));
                var selectOnOff = $(this).hasClass("queShitiOptionsN") || $(this).hasClass("queShitiOptionsW") || $(this).hasClass("queShitiOptionsR");
                var wrongOnOff = $(this).hasClass("queShitiOptionsW");
                if (rightOnOff) {
                    rightStr += $(this).attr("data-arrange");
                }
                if (selectOnOff) {
                    youHave = true;
                    yoursStr += $(this).attr("data-arrange");
                }
                if (wrongOnOff) {
                    wrong = false;
                }
            });
            var yourResult = "";
            if (youHave) {
                if (wrong) {
                    yourResult = "<span class=\'trueAswer\'>你的答案：" + yoursStr + "</span>";
                } else {
                    yourResult = "<span class=\'falseAswer\'>你的答案：" + yoursStr + "</span>";
                }
            }
            $.each(nowExerciseData.konwledgeDot, function (index, val) {
                knoledgeStr += "<li data-knoId=\"" + this.knowledgeId + "\">" + this.knowledgeName + "</li>";
            });
            var noneOnOff = (nowExerciseData.konwledgeDot.length>0)?"":"none";
            return "<div class=\'answerATitle\'><span>答案解析</span></div><div class=\'aswerDisplay\'><span class=\'trueAswer\'>正确答案：" + rightStr + "</span>" + yourResult + "</div>" + expStr + "<div class=\'knowledgePoint "+noneOnOff+"\' ><div class=\'title\'>知识点：</div><ul class=\'knowledgeList clear\'>" + knoledgeStr + "</ul></div>";

        },
        "recommend": function (data) {
            var realData = data.responseObject.responseData.data_list;
            var recoStr = "";
            $.each(realData, function (index, val) {
                var courseId = this.recommendResource.courseId;
                var imgsrcUrl = this.recommendResource.videoAttUrl;
                var playTime = this.recommendResource.playTime;
                var title = this.recommendResource.courseTitle;
                var videoSrc = this.recommendResource.pageStoragePath;
                recoStr += "<li>" +
                    "<div class=\"reImg videoSrc\" data-courseid=\"" + courseId + "\">" +
                    "<img src=\"" + imgsrcUrl + "\"" +
                    "><div class=\"playIcon\"  data-videoSrc=\"" + videoSrc + "\" onclick='exerciseCommon.means.openRecommend($(this))'></div>" +
                    "<div class=\"timeNum\">" + playTime + "</div>" +
                    "</div>" +
                    "<div class=\"reText\">" + title + "</div>" +
                    "</li>";
            });
            return recoStr;
        },
        "richImg": function (data) {
            var imgListStr = "";
            if (data != undefined && data.length > 0) {
                var imgBox = [];
                var imgList = data.split("|");
                for (var imgNum = 0; imgNum < imgList.length; imgNum++) {
                    imgBox[imgNum] = {};
                    imgBox[imgNum].src = imgList[imgNum];
                    imgListStr += "<li class=\"queImgAlert\" style=\"float: left;margin-right: 10px;\" onclick='exerciseCommon.work.alertImg($(this));'><img src=\"" + imgList[imgNum] + "\" style=\"width: 200px;height: 200px;\"> </li>";
                }
                imgListStr = "<ul style=\"clear: both;\" class=\"clear\" data-imgBox='" + JSON.stringify(imgBox) + "'>" + imgListStr + "</ul>";
            }
            return imgListStr;
        },
        "projectBegin": function (data) {
            var listData = data.responseObject.responseData.data_list;
            var listStr = "";
            var listDataPosiSer = data.responseObject.responseData.position.seriesDirId;
            $.each(listData, function (index, val) {
                var office = this.seriesDirTitle;
                var sumQueNum = this.exercisesNum;
                var seriesId = this.seriesDirId;
                var treeLevel = this.treeLevel;
                var toggleHeightClass = "";
                if (listDataPosiSer == seriesId) {
                    toggleHeightClass = "projectToggleHeight";
                }
                listStr += "<li class=\"queSpeciallyIteam\">" +
                    "<section class=\"queSpeciallyIteamTi " + toggleHeightClass + "\">" +
                    "<div class=\"queSpeciallyIteamNa fl\">" +
                    "<span class=\"queSpeciallyLiName\">" + office + "</span>" +
                    "<span class=\"queSpeciallyLiSum\">(共" + sumQueNum + "题)</span>" +
                    "</div>" +
                    "<div class=\"queSpeciallyIteamAn fr\">" +
                    "<span class=\"queSpeciallyLiAns queSpeciAnsIteam\" " +
                    "data-treeLevel=\"" + treeLevel + "\" data-seriesId=\'" + seriesId + "\'>答题</span>" +
                    "<span class=\"queSpeciallyLiIco\"></span></div>" +
                    "</section>";
                var innerListStr = "";
                if (this.child_map.length > 0) {
                    innerListStr = "<ul class=\"queSpeciallyIteamInner\" data-alcode-sm='content-"+ index +"'>";
                    $.each(this.child_map, function (index, val) {
                        var isThis = this;
                        var innerOffice = isThis.seriesDirTitle;
                        var innerSumQue = isThis.exercisesNum;
                        var innerSeriesId = isThis.seriesDirId;
                        var innertreeLevel = isThis.treeLevel;
                        innerListStr += "<li class=\"queSpeciInnerLi\">" +
                            "<div class=\"queSpeciInnerLiNa fl\">" +
                            "<span class=\"queSpeciInnerLiName\">" + innerOffice + "</span>" +
                            "<span class=\"queSpeciInnerLiSum\">(共" + innerSumQue + "题)</span>" +
                            "</div>" +
                            "<div class=\"queSpeciInnerLiAn fr\">" +
                            "<span class=\"queSpeciInnerLiAns queSpeciAnsIteam\"  data-treeLevel=\"" + innertreeLevel + "\"  data-seriesId=\'" + innerSeriesId + "\'>答题</span>" +
                            "</div>" +
                            "</li>";
                    });
                    innerListStr += "</ul>";
                }
                listStr += innerListStr + "</li>"
            });
            return listStr;
        },
        "orderBegin": function (data) {
            var realData = data.responseObject.responseData.data_list;
            var beginStr = "";
            $.each(realData, function (index, val) {
                var gateStatus = parseInt(this.tollgateStatus);
                var statusStr = "";
                var gateState = true;
                var gateClass = "ordergate";
                var gateId = this.tollgateId;
                var gateName = this.tollgateName;
                if (gateStatus == 0) {
                    gateClass = "ordergate doneNone";
                    gateState = false;
                    statusStr += "<figure class=\"starLight\"><img src=\"/image/categrey/main_lock.png\"> </figure>";
                } else {
                    for (var deftNum = 0; deftNum < gateStatus - 1; deftNum++) {
                        statusStr +=
                            "<figure class=\"starLight\">" +
                            "<img src=\"/image/categrey/main_star.png\">" +
                            "</figure>";
                    }
                    for (var startNum = 0; startNum < 4 - gateStatus; startNum++) {
                        statusStr +=
                            "<figure class=\"starGrey\"><img src=\"/image/categrey/main_star_def.png\"></figure>";
                    }
                }
                beginStr += "<li class='" + gateClass + "'    data-orderid=\"" + gateId + "\" data-lock=\"" + gateState + "\" >" +
                    "<div class=\"passNum\">" + gateName + "</div>" +
                    "<div class=\"passStar\">" +
                    statusStr +
                    "</div>" +
                    "<div class=\"passAnswer\"  data-lock=\"" + gateState + "\" data-orderid=\"" + gateId + "\">回答</div>" +
                    "</li>";
            });
            return beginStr;
        }
    },
    analysis: function (option) {
        exerciseCommon.parameter.exercisesOptions = option;
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
        }, {
            item: "",
            href: "",
            active: false
        }]);
        exerciseCommon.means.bury({"type": "page"});
        switch (option.type.page) {
            case 0://初始页
                switch (option.type.exam) {
                    case 0://顺序练习的开始页
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.orderBegin,
                            postData: option.initData,
                            success: function (data) {
                                exerciseCommon.means.demoData({
                                    "type": "html",
                                    "container": $("#practiceInnerContainer"),
                                    "judge": true,
                                    "str": exerciseCommon.template.orderBegin(data),
                                    "strCallBack": function () {
                                        exerciseCommon.work.openOrderBegin();
                                        var first = $(".ordergate[data-lock='false']").eq(0);
                                        var len = first.offset().top;
                                        $("html,body").animate({scrollTop: len}, 1000);
                                    }
                                });
                            }
                        });
                        break;
                    case 1://专项练习的开始页
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.projectBegin,
                            postData: option.initData,
                            success: function (data) {
                                exerciseCommon.means.demoData({
                                    "type": "html",
                                    "container": $(".queSpeciallyList"),
                                    "judge": true,
                                    "str": exerciseCommon.template.projectBegin(data),
                                    "strCallBack": function () {
                                        exerciseCommon.work.projectBegin();
                                    }
                                });
                            }
                        });
                        break;
                    case 2:
                        break;
                    default:
                        break;
                }
                break;
            case 1://答题页面
                window.Onunload = window.onbeforeunload = function () {
                    if (exerciseCommon.parameter.isHand) {
                        exerciseCommon.work.saveProgress();
                    }
                };
                switch (option.type.exam) {
                    case 0://顺序练习的答题页
                        exerciseCommon.means.share();
                        exerciseCommon.parameter.testId = option.initData.exercisesTollgate;
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.exercise,
                            postData: option.initData,
                            success: function (data) {
                                var backstore = exerciseCommon.means.checkExerciseData(data);
                                var localStore = exerciseCommon.means.checkLocalData("order", option.initData.exercisesTollgate);
                                var exerciseInfo = exerciseCommon.means.compareData(backstore, localStore);
                                exerciseCommon.parameter.exerciseInfo = exerciseInfo.exerciseData;
                                localStorage.setItem("order" + option.initData.exercisesTollgate, JSON.stringify(exerciseCommon.parameter.exerciseInfo));
                                var isContinue = exerciseInfo.goOn;
                                if (isContinue) {
                                    exerciseCommon.means.continueTest();
                                } else {
                                    exerciseCommon.parameter.index = 0;
                                    exerciseCommon.means.demoData({
                                        "container": $("#queInnerContent"),
                                        "type": "html",
                                        judge: true,
                                        "str": exerciseCommon.template.exercise(),
                                        "strCallBack": function () {
                                            $("#quesContainer").removeClass("none");
                                            $("#queBehavior").removeClass("none");
                                            exerciseCommon.work.changeIndex();
                                            exerciseCommon.work.checkExp();
                                            exerciseCommon.work.lookAtQueReco.productRecord();
                                            exerciseCommon.means.showNowExercise();
                                            exerciseCommon.work.answerAbout.test();
                                        }
                                    });
                                }
                            },
                            failed: function () {

                            }

                        });
                        break;
                    case 1://专项练习的答题页
                        exerciseCommon.means.share();
                        exerciseCommon.parameter.testId = option.initData.seriesDirId;
                        exerciseCommon.parameter.treeleve = option.initData.treeLevel;
                        // console.log(exerciseCommon.parameter.treeleve)
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.exercise,
                            postData: option.initData,
                            success: function (data) {
                                var backstore = exerciseCommon.means.checkExerciseData(data);
                                var localStore = exerciseCommon.means.checkLocalData("project", option.initData.seriesDirId);
                                var exerciseInfo = exerciseCommon.means.compareData(backstore, localStore);
                                exerciseCommon.parameter.exerciseInfo = exerciseInfo.exerciseData;
                                localStorage.setItem("project" + option.initData.seriesDirId, JSON.stringify(exerciseCommon.parameter.exerciseInfo));
                                var isContinue = exerciseInfo.goOn;
                                if (isContinue) {
                                    exerciseCommon.means.continueTest();
                                } else {
                                    exerciseCommon.parameter.index = 0;
                                    exerciseCommon.means.demoData({
                                        "container": $("#queInnerContent"),
                                        "type": "html",
                                        judge: true,
                                        "str": exerciseCommon.template.exercise(),
                                        "strCallBack": function () {
                                            $("#quesContainer").removeClass("none");
                                            $("#queBehavior").removeClass("none");
                                            exerciseCommon.work.changeIndex();
                                            exerciseCommon.work.checkExp();
                                            exerciseCommon.work.lookAtQueReco.productRecord();
                                            exerciseCommon.means.showNowExercise();
                                            exerciseCommon.work.answerAbout.test();
                                        }
                                    });
                                }
                            },
                            failed: function () {

                            }

                        });
                        break;
                    case 2:
                        break;
                    default:
                        break;
                }
                break;
            case 2://结果页展示页
                var hdTitleObj = $(".queResultProCoTitle");
                var startObj = $(".resultStar");
                var allExpObj = $(".queResultCareRe");
                var againObj = $(".queResultShareMor");
                switch (option.type.exam) {
                    case 0://顺序练习的答题结果页
                        exerciseCommon.parameter.testId = option.initData.exercisesTollgate;
                        exerciseCommon.means.share();
                        if (option.initData.radial.isIe) {
                            $(".queResultProCoHd").before("<div class=\"queResultImg\"><img src=\"/image/exercises/answerresult" + option.initData.radial.ieBack + ".png\"> </div>");
                        } else {
                            exerciseCommon.means.initProgress(option.initData.radial.angle);
                        }
                        ;
                        hdTitleObj.html(option.initData.resUltStr);
                        startObj.html(option.initData.startStr);
                        againObj.html(option.initData.nextGate.againStr).attr({"data-url": option.initData.nextGate.nextUrl}).unbind("click").bind("click", function () {

                            //window.location.href = $(this).attr("data-url");
                            comm.jump($(this),$(this).attr("data-url"));
                        });
                        allExpObj.unbind("click").bind("click", function () {
                            //window.location.href = "//www.yi-ding.net.cn/pages/exercises/exercise_suit_exhibition.html?gateId=" + option.initData.nextGate.nowGate;
                            comm.jump($(this),"//www.yi-ding.net.cn/pages/exercises/exercise_suit_exhibition.html?gateId=" + option.initData.nextGate.nowGate);
                        });
                        if (option.initData.wrongOnOff) {
                            $(".queResultCareWr").find("img").attr({"src": "/image/exercises/main_view_results-def@2x.png"}).unbind("click");
                        } else {
                            $(".queResultCareWr").unbind("click").bind("click", function () {

                                //window.location.href = "//www.yi-ding.net.cn/pages/exercises/exercise_suit_wrong.html?gateId=" + option.initData.nextGate.nowGate;
                                comm.jump($(this),"//www.yi-ding.net.cn/pages/exercises/exercise_suit_wrong.html?gateId=" + option.initData.nextGate.nowGate);

                            });
                        }
                        againObj.unbind("click").bind("click", function () {
                            if (option.initData.nextGate.forbid) {
                                popup({"text": "关卡未解锁，请先完成之前关卡"});
                            } else {
                              //  window.location.href = $(this).attr("data-url");
                                comm.jump($(this), $(this).attr("data-url"));
                            }
                        });
                        break;
                    case 1://专项练习的答题页
                        exerciseCommon.parameter.testId = option.initData.exercisesTollgate;
                        exerciseCommon.parameter.treeleve = option.initData.treeLevel;
                        // console.log(exerciseCommon.parameter.treeleve)
                        exerciseCommon.means.share();
                        if (option.initData.radial.isIe) {
                            $(".queResultProCoHd").before("<div class=\"queResultImg\"><img src=\"/image/exercises/answerresult" + option.initData.radial.ieBack + ".png\"> </div>");
                        } else {
                            exerciseCommon.means.initProgress(option.initData.radial.angle);
                        }
                        hdTitleObj.html(option.initData.resUltStr);
                        againObj.html(option.initData.nextGate.againStr).attr({"data-url": option.initData.nextGate.nextUrl}).unbind("click").bind("click", function () {
                            //window.location.href = $(this).attr("data-url");
                            comm.jump($(this), $(this).attr("data-url"));
                        });
                        allExpObj.unbind("click").bind("click", function () {
                            //window.location.href = "//www.yi-ding.net.cn/pages/exercises/exercise_suit_exhibition.html?gateId=" + option.initData.nextGate.nowGate;
                            comm.jump($(this), "//www.yi-ding.net.cn/pages/exercises/exercise_suit_exhibition.html?gateId=" + option.initData.nextGate.nowGate);
                        });
                        if (option.initData.wrongOnOff) {
                            $(".queResultCareWr").find("img").attr({"src": "/image/exercises/main_view_results-def@2x.png"}).unbind("click");
                        } else {
                            $(".queResultCareWr").unbind("click").bind("click", function () {

                                //window.location.href = "//www.yi-ding.net.cn/pages/exercises/exercise_suit_wrong.html?gateId=" + option.initData.nextGate.nowGate;
                                comm.jump($(this), "//www.yi-ding.net.cn/pages/exercises/exercise_suit_wrong.html?gateId=" + option.initData.nextGate.nowGate);

                            });
                        }
                        againObj.unbind("click").bind("click", function () {

                            //window.location.href = $(this).attr("data-url");
                            comm.jump($(this), $(this).attr("data-url"));
                        });
                        break;
                    case 2:
                        break;
                    default:
                        break;
                }
                break;
            case 3://展示页
                switch (option.type.exam) {
                    case 1://全部解析
                        exerciseCommon.means.share();
                        exerciseCommon.parameter.testId = option.initData.exercisesTollgate;
                        exerciseCommon.parameter.exerciseInfo = exerciseCommon.means.checkLocalData("review", option.initData.exercisesTollgate);
                        $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                            this.related = true;
                        });
                        exerciseCommon.parameter.index = 0;
                        exerciseCommon.means.demoData({
                            "container": $("#queInnerContent"),
                            "type": "html",
                            judge: true,
                            "str": exerciseCommon.template.exercise(),
                            "strCallBack": function () {
                                exerciseCommon.means.bury({"type": "exercise"});
                                $("#quesContainer").removeClass("none");
                                $("#queBehavior").removeClass("none");
                                exerciseCommon.work.changeIndex();
                                exerciseCommon.work.checkExp();
                                exerciseCommon.work.lookAtQueReco.productRecord();
                                exerciseCommon.means.showNowExercise();
                                exerciseCommon.work.answerAbout.forbidTest();
                            }
                        });
                        break;
                    case 2://错题解析
                        exerciseCommon.means.share();
                        exerciseCommon.parameter.testId = option.initData.exercisesTollgate;
                        exerciseCommon.parameter.exerciseInfo = exerciseCommon.means.filterWrongData(exerciseCommon.means.checkLocalData("review", option.initData.exercisesTollgate));
                        $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                            this.related = true;
                        });
                        exerciseCommon.parameter.index = 0;
                        exerciseCommon.means.demoData({
                            "container": $("#queInnerContent"),
                            "type": "html",
                            judge: true,
                            "str": exerciseCommon.template.exercise(),
                            "strCallBack": function () {
                                exerciseCommon.means.bury({"type": "exercise"});
                                $("#quesContainer").removeClass("none");
                                $("#queBehavior").removeClass("none");
                                exerciseCommon.work.changeIndex();
                                exerciseCommon.work.checkExp();
                                exerciseCommon.work.lookAtQueReco.productRecord();
                                exerciseCommon.means.showNowExercise();
                                exerciseCommon.work.answerAbout.forbidTest();
                            }
                        });
                        break;
                    case 3://错题本
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.exercise,
                            postData: option.initData,
                            success: function (data) {
                                exerciseCommon.parameter.exerciseInfo = exerciseCommon.means.checkExerciseData(data);
                                exerciseCommon.parameter.index = 0;
                                exerciseCommon.means.demoData({
                                    "container": $("#queInnerContent"),
                                    "type": "html",
                                    judge: true,
                                    "str": exerciseCommon.template.exercise(),
                                    "strCallBack": function () {
                                        exerciseCommon.means.bury({"type": "exercise"});
                                        $("#quesContainer").removeClass("none");
                                        $("#queBehavior").removeClass("none");
                                        exerciseCommon.work.changeIndex();
                                        exerciseCommon.work.checkExp();
                                        exerciseCommon.work.lookAtQueReco.productRecord();
                                        exerciseCommon.means.showNowExercise();
                                        exerciseCommon.work.answerAbout.test();
                                        exerciseCommon.work.removeExercise();
                                    }
                                });
                            },
                            failed: function () {

                            }

                        });
                        break;
                    case 4://收藏题
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.exercise,
                            postData: option.initData,
                            success: function (data) {
                                exerciseCommon.parameter.exerciseInfo = exerciseCommon.means.checkExerciseData(data);
                                $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                                    this.related = true;
                                });
                                exerciseCommon.parameter.index = 0;
                                exerciseCommon.means.demoData({
                                    "container": $("#queInnerContent"),
                                    "type": "html",
                                    judge: true,
                                    "str": exerciseCommon.template.exercise(),
                                    "strCallBack": function () {
                                        exerciseCommon.means.bury({"type": "exercise"});
                                        $("#quesContainer").removeClass("none");
                                        $("#queBehavior").removeClass("none");
                                        exerciseCommon.work.changeIndex();
                                        exerciseCommon.work.checkExp();
                                        exerciseCommon.work.lookAtQueReco.productRecord();
                                        exerciseCommon.means.showNowExercise();
                                        exerciseCommon.work.answerAbout.forbidTest();
                                    }
                                });
                            },
                            failed: function () {

                            }

                        });
                        break;
                    case 5://h5一道题
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.h5exercise,
                            postData: option.initData,
                            success: function (data) {
                                exerciseCommon.parameter.exerciseInfo = exerciseCommon.means.checkExerciseData(data);
                                exerciseCommon.parameter.index = 0;
                                exerciseCommon.means.demoData({
                                    "container": $("#queInnerContent"),
                                    "type": "html",
                                    judge: true,
                                    "str": exerciseCommon.template.exercise(),
                                    "strCallBack": function () {
                                        exerciseCommon.means.bury({"type": "exercise"});
                                        $("#quesContainer").removeClass("none");
                                        $("#questionsHd").remove();
                                        exerciseCommon.work.answerAbout.forbidTest();
                                        if (pcOrH5.pc()) {
                                            return false;
                                        } else {
                                            $(document).unbind("click").bind("click", function () {
                                                var url = {
                                                    el: $(this),
                                                    ios: "yiding://net.yi-ding.ios",
                                                    ios9: "https://app.yi-ding.net.cn/applinks.html",
                                                    android: "yiding://cn.net.yiding"
                                                };
                                                H5scene.goApp(url, option.appData);
                                            });
                                        }

                                    }
                                });
                            },
                            failed: function () {

                            }

                        });
                        break;
                    case 6://h5一套题
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.h5exercise,
                            postData: option.initData,
                            success: function (data) {
                                exerciseCommon.parameter.exerciseInfo = exerciseCommon.means.checkExerciseData(data);
                                exerciseCommon.parameter.index = 0;
                                exerciseCommon.means.demoData({
                                    "container": $("#queInnerContent"),
                                    "type": "html",
                                    judge: true,
                                    "str": exerciseCommon.template.exercise(),
                                    "strCallBack": function () {
                                        exerciseCommon.means.bury({"type": "exercise"});
                                        $("#quesContainer").removeClass("none");
                                        $("#questionsHd").remove();
                                        exerciseCommon.work.answerAbout.forbidTest();
                                        if (pcOrH5.pc()) {
                                            return false;
                                        }else{
                                            $(document).unbind("click").bind("click", function () {
                                                var url = {
                                                    el: $(this),
                                                    ios: "yiding://net.yi-ding.ios",
                                                    ios9: "https://app.yi-ding.net.cn/applinks.html",
                                                    android: "yiding://cn.net.yiding"
                                                };
                                                H5scene.goApp(url, option.appData);
                                            });
                                        }
                                    }
                                });
                            },
                            failed: function () {

                            }

                        });
                        break;
                    case 9://单一题目终端
                        exerciseCommon.means.applyData({
                            port: exerciseCommon.parameter.applyDataPort.exercise,
                            postData: option.initData,
                            success: function (data) {
                                exerciseCommon.parameter.exerciseInfo = exerciseCommon.means.checkExerciseData(data);
                                $.each(exerciseCommon.parameter.exerciseInfo, function (index, val) {
                                    this.related = true;
                                });
                                exerciseCommon.parameter.index = 0;
                                exerciseCommon.means.demoData({
                                    "container": $("#queInnerContent"),
                                    "type": "html",
                                    judge: true,
                                    "str": exerciseCommon.template.exercise(),
                                    "strCallBack": function () {
                                        exerciseCommon.means.bury({"type": "exercise"});
                                        $("#quesContainer").removeClass("none");
                                        exerciseCommon.work.checkExp();
                                        exerciseCommon.means.showNowExercise();
                                        exerciseCommon.work.answerAbout.forbidTest();
                                    }
                                });
                            },
                            failed: function () {

                            }

                        });
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    },
    parameter: {
        applyDataPort: {
            "removeWrong": "//www.yi-ding.net.cn/call/customer/exercises/updateError/",
            "share": "//www.yi-ding.net.cn/call/yiding/comm/data/share/getMapList/",
            "h5exercise": domain.changeUrl("//m.yi-ding.net.cn/mcall/customer/exercises/createExampaper/"),
            "confirmCollect": "//www.yi-ding.net.cn/call/customer/collection/create/",
            "abolishCollect": "//www.yi-ding.net.cn/call/customer/collection/delete/",
            "errorExercise": "//www.yi-ding.net.cn/call/customer/exercises/createError/",
            "projectBegin": "//www.yi-ding.net.cn/call/cms/series/dir/getSpecialMapList/",
            "orderBegin": "//www.yi-ding.net.cn/call/customer/exercises/getSequenceMapList/",
            "exerciseContinue": "//www.yi-ding.net.cn/call/customer/exercises/getCustomerStatus/",
            "recommend": '//www.yi-ding.net.cn/call/customer/exercises/getRecommendList/',
            "exercise": "//www.yi-ding.net.cn/call/customer/exercises/createExampaper/",
            "updateResult": "//www.yi-ding.net.cn/call/customer/exercises/updateResult/",
            "exercisesOptions": {}
        },
        isHand: true,
        "treeleve": "",
        "testId": "",
        exerciseInfo: [],
        exerciseBook: {},
        index: ""

    }
};
