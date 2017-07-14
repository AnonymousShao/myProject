/**
 * 功能描述：首页
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by ZhangHongda
 */
$(function () {
    comm.pcSideModule([{
        item: "首页",
        href: "//www.yi-ding.net.cn",
        active: true,
    }, {
        item: "课程",
        href: "//www.yi-ding.net.cn/pages/curriculum/curriculum.html",
        active: false,
    }, {
        item: "习题",
        href: "//www.yi-ding.net.cn/pages/category/question.html",
        active: false,
    }, {
        item: "",
        href: "",
        active: false,
    }]);
    var controller = {
        params: {
            customerId: "",
            allAdd: false,
        },
        path: {
            //userId: "//www.yi-ding.net.cn/call/yiding/web/user/getMapById/",
            addClass: "//www.yi-ding.net.cn/call/yiding/customer/join/create/",
            index: "//www.yi-ding.net.cn/call/yiding/customer/home/page/getMapHomeListByRedis/",//课程表
            niceClass: "//www.yi-ding.net.cn/call/cms/series/course/baseinfo/getFineMapList/",
            userMes: "//www.yi-ding.net.cn/call/cms/series/baseinfo/getMapCustomerStatistics/",//获取用户的信息
            userCon:"//www.yi-ding.net.cn/call/yiding/customer/home/page/getCustomerStudy/",//用户统计
            //index:"//www.yi-ding.net.cn/call/cms/series/baseinfo/getMapHomeListByRedis/"//课程表
        },
        init: function () {
            var t = this;
            $(".Ev-sidebarIndex").removeClass('active').last().addClass('active');
            commLog.createBrowse(24, "首页-首页");
            t.isLogin(); //是否登录
            t.indexCont();//首页的内容
            t.niceClass();//精品课程
            t.serCli();//系列课程
            t.tabCli();//课程表的点击
            //t.stuCli();//点击进入个人中心
        },
        //是否登录
        isLogin: function () {
            var t = this;
            var userId = localStorage.getItem("userId");
            if(localStorage.getItem("vedioMaxTime")){
                localStorage.removeItem("vedioMaxTime");
            }
            if (userId) {
                t.params.customerId = userId;
                $(".ev-notLogin").css("display", "none");
                $(".ev-isLogin").css("display", "block");
                $(".classAdd").find("button").on("click", function () {
                    commLog.creatEvent({
                        "id": 51, "url": window.location.href, "keyword": "首页顶部加入系列课程", "browseType": "24"
                    });
                    //window.location.href = "//www.yi-ding.net.cn/pages/curriculum/curriculum.html?sourceType=24";
                    comm.jump($(this), "//www.yi-ding.net.cn/pages/curriculum/curriculum.html?sourceType=24");
                });
                t.userMes();
            } else {
                $(".ev-notLogin").css("display", "block");
                $(".ev-isLogin").css("display", "none");
                $(".classAdd").find("button").on("click", function () {
                    commLog.creatEvent({
                        "id": 51, "url": window.location.href, "keyword": "首页顶部加入系列课程", "browseType": "24"
                    });
                    //window.location.href = "//www.yi-ding.net.cn/pages/curriculum/curriculum.html?sourceType=24";
                    comm.jump($(this), "//www.yi-ding.net.cn/pages/curriculum/curriculum.html?sourceType=24");
                });
            }
        },
        //获取数据
        ajaxFn: function (opt) {
            $.ajax({
                type: opt.type,
                url: opt.url,
                data: {paramJson: $.toJSON(opt.param)},
                async: opt.async,
                dataType: "json",
                jsonp: "callback",
                cache:false,
                success: function (data) {
                    comm.loading.hide();
                    if (data) {
                        opt.fn(data);
                    }
                },
                error: function (data) {
                    // console.log("Error...");
                },
                beforeSend: function () {
                    comm.loading.show();
                },
            });
        },
        //展开课程表的点击
        studyEnd: function () {
            var t = this;
            $(".studyEnd").off("click").on("click", function () {
                $(this).css("display", "none");
            });
        },

        //学习进度点击跳转个人中心
        stuCli: function () {
            var t = this;
            if(t.params.customerId != ''){
                $("#stuPro").on("click", function () {

                    comm.jump($(this), "//www.yi-ding.net.cn/pages/personal/personal_index.html?cId=" + t.params.customerId);
                    //window.location.href = "//www.yi-ding.net.cn/pages/personal/personal_index.html?cId=" +
                    // t.params.customerId;
                });
                $(".isLoginbg").on("click", function () {
                    //window.location.href = "//www.yi-ding.net.cn/pages/personal/personal_index.html?cId=" +
                    // t.params.customerId;
                    comm.jump($(this), "//www.yi-ding.net.cn/pages/personal/personal_index.html?cId=" + t.params.customerId);
                });
            } else {
                $(".isLoginbg").on("click", function () {
                    comm.jump($(this), "//www.yi-ding.net.cn/pages/personal/personal_index.html");
                    //window.location.href = "//www.yi-ding.net.cn/pages/personal/personal_index.html";
                })
            }
        },
        //精品课程内容
        niceClass: function () {
            t = this;
            t.ajaxFn({
                url: t.path.niceClass,
                type: "get",
                param: {
                    customerId: t.params.customerId,
                    visitSiteId: 13,
                    pageIndex: 1,
                    pageSize: 10,
                    attUseFlag: 3,
                    sortType: 2,
                },
                fn: function (data) {
                    var obj = data.responseObject.responseData.data_list;
                    var quality = $("#quality");
                    var len = obj.length;
                    for (var i = 0; i < len; i++) {
                        if (comm.isPC()) {
                            courseJump = obj[i].pageStoragePath;
                        } else {
                            courseJump = obj[i].webStoragePath;
                        }
                        var text = '<section class="contentInnerItem" courseJump="' + courseJump + '">' +
                            '<article class="contentInnerContext">' +
                            '<h2>' + obj[i].courseTitle + '</h2>' +
                            '<p><span class="user">' + obj[i].courseAuth.authorName + '</span><span class="hospital">' + obj[i].courseAuth.company + '</span></p>' +
                            '<article class="contentOtherMsg">' +
                            '<span class="resourceType">' + obj[i].seriesTitle + '</span>' +
                            '<i class="icon-comment"></i>' +
                            '<span>' + obj[i].reviewNum + '</span>' +
                            '</article>' +
                            '</article>' +
                            '<figure class="contentInnerImg">' +
                            '<img src="' + obj[i].videoAttUrl + '" alt="">' +
                            '</figure>' +
                            '</section>'
                        quality.append(text);
                    }
                }
            })
            t.claCli(); //点击进入课程详情页
            t.more(); //跳转更多精品课程页
        },
        //精品课程的点击进入课程详情页
        claCli: function () {
            var qua = $("#quality");
            qua.on("click", ".contentInnerItem", function (e) {
                e.stopPropagation();
                comm.jump($(this),"//" + $(this).attr("courseJump") + "?sourceType=24",true);
                //window.open("//" + $(this).attr("courseJump") + "?sourceType=24")//跳转到相关的课程终端页
            });
        },
        //更多精品课程
        more: function () {
            var t = this;
            var more = $(".moreNiceClass p");
            if (comm.isPC() == true) {
                more.text("更多精品课程");
                more.on("click", function () {
                    commLog.creatEvent({
                        "id": 186, "url": window.location.href, "keyword": "首页-更多精品课程", "browseType": "24"
                    });
                    //window.location.href = "//www.yi-ding.net.cn/pages/index/niceClass.html?sourceType=24";
                    comm.jump($(this), "//www.yi-ding.net.cn/pages/index/niceClass.html?sourceType=24");
                })
            } else {
                more.text("前往医鼎App");
                more.on("click", function () {
                    comm.alertBoxClo({
                        "mTitle": '<img style="height: 80px; width: 152px;" src="/image/index/bigLogo.png"/>',
                        "title": "该内容需在医鼎APP上查看",
                        "ensure": "前往医鼎APP",
                        "ensureCallback": function () {
                        },
                        "cancelCallback": function () {
                        }
                    });
                })
            }
        },
        //用户信息
        userMes: function () {
            var t = this;
            var stu = $("#stuPro");
            var stuCl = $(".stuClass");
            t.ajaxFn({
                url: t.path.userCon,
                type: "get",
                async: true,
                param: {
                    customerId: t.params.customerId,
                },
                fn: function (data) {
                    var status = data.responseObject.responseStatus;
                    if (status) {
                        var obj = data.responseObject.responseData.data_list;
                        var alreadyAdd = obj.joinSeriesNum;
                        if (alreadyAdd == 0) {
                            $(".classAdd").css("display", "block");
                            $(".isLoginbg").css("display", "none");
                        } else {
                            $(".classAdd").css("display", "none");
                            $(".isLoginbg").css("display", "block");
                            stu.find(".stuCourse p").text(obj.sumCourseNum);
                            stu.find(".stuCourse span").text(obj.studyCourseNum);
                            stuCl.find("li").eq(0).find("span").text(obj.joinSeriesNum);
                            stuCl.find("li").eq(0).find("p").text(obj.sumSeriesNum);
                            stuCl.find("li").eq(1).find("span").text(obj.exercisesCount);//正确率
                            stuCl.find("li").eq(2).find("span").text(obj.studyTime);
                        }
                    }
                }
            });
        },
        //课程表的圆弧显示
        timCir: function (cBeg, cEnd, i) {
            var t = this;
            var canvas = document.querySelectorAll(".circleBorder");
            // for (var i = 0; i < canvas.length; i++) {
            var w = canvas[i].parentNode.querySelector('p').offsetWidth,
                h = canvas[i].parentNode.querySelector('p').offsetHeight;
            canvas[i].width = w;
            canvas[i].height = h;
            var angle = parseInt(canvas[i].getAttribute('percent')) / 100 * 360;
            var color = canvas[i].getAttribute('circle-color');
            //var angles = canvas[i].getAttribute('circle-angles');
            var ctx = canvas[i].getContext("2d");
            var grd = ctx.createLinearGradient(0, 0, w, h);
            ctx.beginPath();
            ctx.lineWidth = "2";
            //ctx.strokeStyle = color;
            ctx.strokeStyle = grd;
            var angles = angle / 360;
            grd.addColorStop(angles, cEnd);
            grd.addColorStop("0", cBeg);
            ctx.arc(w / 2, h / 2, w / 2 - 1.5, 0, toA(angle), false);
            ctx.stroke();
            // }
            function toA(a) {
                return a / 180 * Math.PI;
            }
        },
        //首页内容
        indexCont: function () {
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
        },
        //系列课程的点击，跳转到科室页，添加系列课程。
        serCli: function () {
            var t = this;

            $(".ev-classSuggest").on("click", ".bestItem", function (e) {
                var that = this;
                var jumpUrl = $(that).find(".bestItem").attr("jumpUrl");
                var refId = $(that).attr("seriseId");
                // if ($(e.target).parent().hasClass("addClass")||$(e.srcElement).parent().hasClass("addClass")) {
                if ($(e.target).text()=='加入'||$(e.srcElement).text()=='加入') {
                    if (comm.isPC()) {
                        var userId = localStorage.getItem("userId");
                        e.stopPropagation();
                        if (userId) {
                            commLog.creatEvent({"id":52,"url":window.location.href,"keyword":"首页课程推荐加入系列课程","browseType":"24"});
                            t.ajaxFn({
                                url: t.path.addClass,
                                type: "post",
                                param: {
                                    customerId: t.params.customerId,
                                    joinType: 1,
                                    refId: refId,
                                },
                                fn: function (data) {
                                    var status = data.responseObject.responseStatus;
                                    var addId = data.responseObject.responsePk;
                                    $("#TimeTables").css("display", "block");
                                    if (status) {
                                        if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
                                            $.cookie('the_cookie', '', { expires: -1 });
                                        }
                                        if (t.params.allAdd == true) {
                                            $(".ev-contentItemHeader").css("display", "none");
                                            $(".ev-seriesCourses").css("display", "none");
                                        }
                                        $(this).css("display", "none");
                                        $(".isLoginbg").css("display", "block");
                                        $(".addClassBtn").css("display", "none");
                                        t.indexCont();
                                        t.userMes();
                                    }
                                }
                            })
                        } else {
                            localStorage.setItem("unActive", "1");
                            commLog.creatEvent({"id":142,"url":window.location.href,"keyword":"加入系列课程去登录","browseType":"24"});
                            loginAbout.login.show({
                                success: function () {
                                    loginAbout.login.exit();
                                    location.reload();
                                }
                            });
                        }
                    } else {
                        comm.alertBoxClo({
                            "mTitle": '<img style="height: 80px; width: 152px;" src="/image/index/bigLogo.png"/>',
                            "title": "该内容需在医鼎APP上查看",
                            "ensure": "前往医鼎APP",
                            "ensureCallback": function () {
                            },
                            "cancelCallback": function () {
                            }
                        });
                    }
                } else {
                    //window.location.href = "//" + $(this).attr('jumpUrl')+"?sourceType=24";//跳转到科室页
                    comm.jump($(this), "//" + $(this).attr('jumpUrl') + "?sourceType=24");
                }
            })
            // $(".ev-classSuggest").on("click", ".bestItem .addClass",function (e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     alert('dsf')
            // })
        },
        //课程表的点击
        tabCli: function () {
            var t = this;
            $("#timetables").on("click", ".ev-bestItem", function () {
                var jumpUrl = $(this).attr("jumpUrl");
                comm.jump($(this), "//" + jumpUrl + '?class=true&sourceType=24',true);
                //window.open("//" + jumpUrl+'?class=true&sourceType=24');
            });
        },
    };
    controller.init();
});
