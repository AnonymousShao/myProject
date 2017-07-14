/**
 * Created by zhanghongda on 2017/3/14.
 */
//首页内容
function indexCont() {
    var t = this;
    var havFin = false;
    var isFinLen = 0;
    var notFinLen = 0;
    var alFin = "";
    var stu = $("#stuPro");
    var stuC = $(".stuCourse");
    var stuCl = $(".stuClass");
    t.ajaxFn({
        url: t.path.index,
        type: "get",
        async: false,
        param: {
            customerId: t.params.customerId,
        },
        fn: function (data) {
            var status = data.responseObject.responseStatus;
            if (status) {
                var obj = data.responseObject.responseData.data_list;//exercisesCount;
                if (obj.length == 0) {
                    $(".TimeTables").css("display", "none");
                } else {
                    $(".TimeTables").css("display", "block");
                    $("#timetables .bestItem").remove();
                    //课程表
                    if (t.params.customerId != 0) {
                        for (var i = 0; i < obj.length; i++) {
                            var percent = obj[i].studySchedule;
                            if (percent == 100) {
                                //已看完课程
                                havFin = true;
                                isFinLen++;
                                var isFinish = obj[i].seriesCourse.isFinish;
                                var percent = obj[i].studySchedule;
                                if (isFinish == 1) {
                                    var html = "已看完"
                                } else if (obj[i].seriesCourse.restTime == "" || obj[i].seriesCourse.playTime < 60) {
                                    html = "观看不足1分钟"
                                } else {
                                    html = '还剩 <i>' + obj[i].seriesCourse.restTime + '</i>'
                                }
                                if (comm.isPC()) {
                                    jumpUrl = obj[i].seriesCourse.pageStoragePath;
                                } else {
                                    jumpUrl = obj[i].seriesCourse.webStoragePath;
                                }
                                var text2 = '<section class="bestItem ev-bestItem" isFin = "' + isFinish + '" percent="' + percent + '" jumpUrl="' + jumpUrl + '" seriseId="' + obj[i].seriesCourse.courseId + '">' +
                                    '<figure class="classContentName">' +
                                    '<p style="background-color: ' + obj[i].cmsSeries.insideColor + '"><span>' + obj[i].cmsSeries.seriesTitle + '</span></p>' +
                                    '<canvas class="circleBorder" data-index="' + i + '" circle-angle="' + percent * 36 / 10 + '" percent="' + percent + '" cBeg="' + obj[i].cmsSeries.outsideColorBegin + '" cEnd="' + obj[i].cmsSeries.outsideColorEnd + '" ></canvas>' +
                                    '</figure>' +
                                    '<article class="classContentContext">' +
                                    '<h2>' + obj[i].seriesCourse.courseTitle + '</h2>' +
                                    '<p>' +
                                    '<span class="authorName">' + obj[i].courseAuthor.authorName + '</span>' +
                                    '<span>' + obj[i].courseAuthor.company + '</span>' +
                                    '</p>' +
                                    '<span class="time">' + html + '</span>' +
                                    '</article>' +
                                    '</section>'
                                alFin += text2;
                            } else {
                                //未看完课程
                                notFinLen++;
                                var isFinish = obj[i].seriesCourse.isFinish;
                                var percent = obj[i].studySchedule;
                                if (isFinish == 1) {
                                    var html = "已看完"
                                } else if (obj[i].seriesCourse.restTime == "" || obj[i].seriesCourse.playTime < 60) {
                                    html = "观看不足1分钟"
                                } else {
                                    html = '还剩 <i>' + obj[i].seriesCourse.restTime + '</i>'
                                }
                                if (comm.isPC()) {
                                    jumpUrl = obj[i].seriesCourse.pageStoragePath;
                                } else {
                                    jumpUrl = obj[i].seriesCourse.webStoragePath;
                                }
                                var text1 = '<section class="bestItem ev-bestItem" isFin = "' + isFinish + '" percent="' + percent + '" jumpUrl="' + jumpUrl + '" seriseId="' + obj[i].seriesCourse.courseId + '">' +
                                    '<figure class="classContentName">' +
                                    '<p style="background-color: ' + obj[i].cmsSeries.insideColor + '"><span>' + obj[i].cmsSeries.seriesTitle + '</span></p>' +
                                    '<canvas class="circleBorder" data-index="' + i + '" circle-angle="' + 80 * 36 / 10 + '" percent="' + percent + '" cBeg="' + obj[i].cmsSeries.outsideColorBegin + '" cEnd="' + obj[i].cmsSeries.outsideColorBegin + '" circle-angles="50/360"></canvas>' +
                                    '</figure>' +
                                    '<article class="classContentContext">' +
                                    '<h2>' + obj[i].seriesCourse.courseTitle + '</h2>' +
                                    '<p>' +
                                    '<span class="authorName" data-index="' + i + '">' + obj[i].courseAuthor.authorName + ' </span>' +
                                    '<span>' + obj[i].courseAuthor.company + '</span>' +
                                    '</p>' +
                                    '<span class="time">' + html + '</span>' +
                                    '</article>' +
                                    '</section>'
                                $("#timetables").append(text1);
                            }
                            for (var j = 0; j < $(".circleBorder").length; j++) {
                                if (j == i) {
                                    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){

                                    }else{
                                        t.timCir($(".circleBorder[data-index='" + j + "'").attr("cend"), $(".circleBorder[data-index='" + j + "']").attr("cbeg"), j, $(".circleBorder[data-index='" + j + "']").attr("percent"));
                                    }
                                }
                            }
                        }
                    }
                    if (havFin == false) {
                        $(".studyEnd").css("display", "none");
                    } else {
                        $(".studyEnd").css("display", "block");
                    }
                    //展开已完成课程
                    function studyEnd() {
                        var total = $(".ev-bestItem").size();
                        $(".studyEnd").off("click").on("click", function () {
                            $("#timetables").append(alFin);
                            $(alFin).each(function (index, ele) {
                                if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){

                                }else {
                                    t.timCir($(".circleBorder[data-index='" + (total + index) + "']").attr("cbeg"), $(".circleBorder[data-index='" + (total + index) + "']").attr("cend"), (total + index), $(".circleBorder[data-index='" + (total + index) + "']").attr("percent"));
                                }
                            });
                            $(".studyEnd").css("display", "none");
                        });
                    }

                    studyEnd();
                    //名字的超出隐藏
                    for (var z = 0; z < $(".authorName").length; z++) {
                        var aut = $(".authorName[data-index='" + z + "'");
                        if (aut.text().length >= 6) {
                            aut.text(aut.text().substring(0, 4) + '...');
                        }
                    }
                }
            }
            //系列课程
            var contentArea = $("#contentArea");
            $("#contentArea .bestItem").remove();
            $("#contentArea .bestItem").attr("outerHTML","");
            var obj2 = data.responseObject.responseData.recommendList;
            var len = obj2.length;
            if (len == 0) {
                t.params.allAdd = true;
                $(".ev-contentItemHeader").css("display", "none");
                $(".ev-seriesCourses").css("display", "none");
            } else {
                $(".ev-contentItemHeader").css("display", "block");
                $(".ev-seriesCourses").css("display", "block");
                for (var i = 0; i < len; i++) {
                    if (comm.isPC()) {
                        jumpUrl = obj2[i].cmsSeries.pageStoragePath;
                    } else {
                        jumpUrl = obj2[i].cmsSeries.webStoragePath;
                    }
                    var text = '<article class="bestItem" jumpUrl="' + jumpUrl + '" seriseId="' + obj2[i].cmsSeries.seriesId + '">' +
                        '<figure class="bestItemImg">' +
                        '<img src="' + obj2[i].cmsSeries.courseMainPicUrl + '" alt="">' +
                        '</figure>' +
                        '<figcaption class="bestItemMsg">' +
                        '<a href="javascript:void(0)">' + obj2[i].cmsSeries.seriesTitle + '</a>' +
                        '<p>共<b>' + obj2[i].courseNum + '</b>课时</p>' +
                        '</figcaption>' +
                        '<button class="addClass">' +
                        '<i class="icon-addClass"></i>' +
                        '<p>加入</p>' +
                        '</button>' +
                        '</article>'
                    contentArea.append(text);
                }
            }
        }
        // }
    });
}



