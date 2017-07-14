/**
 * Created by 萤火虫 on 2017/1/5.
 */
$(document).ready(function () {

    var course = {
        maxTime: null,
        browserVerinfoNum: null,
        nextCourse: null,
        browserVerinfo: function () {
            var browser = commLog.getBrowserInfo();
            var verinfoNum = '';
            var verinfo = ''
            if (browser) {
                verinfoNum = (browser + "").replace(/[^0-9.]/ig, "");
                verinfo = (browser + "").replace(/[^a-zA-Z]/ig, "") + ',' + verinfoNum;
            }
            course.browserVerinfoNum = verinfo;
        },
        "baseInfo": function () {
            var postData = {
                "courseId": course.courseId,
                "sessionCustomerId": localStorage.getItem('userId'),
                "attUseFlag": "",
                "isValid": "",
                "visitSiteId": "13",
                "firstResult": 0,
                "maxResult": 10
            };
            this.applyData("point", postData);//初始化加载视频锚点
        },
        "talkInit": function () {
            var disscussData = {
                "reviewType": "1",
                "refId": course.courseId,
                "reviewId": "",
                "sortType": "7",
                "scene": "0",
                "logoUseFlag": "2",
                "pageIndex": "1",
                "pageSize": "10",
                "customerId": localStorage.getItem('userId'),
                "attUseFlag": "16"
            };
            var discussOption = {
                "container": $(".discuss-content .discussAllList"),
                "postData": disscussData,
                refId: course.courseId,
                reviewType: "1",
                about: "course",
                sortType: "7",
                "success": function (str) {
                    $(".loginNone").hide();
                    $(".discussNone").hide();
                    var nowScrollObj = $(".discuss-content .discussAllList");
                    if (loginAbout.login.status().state) {
                        if (this.container.attr("data-page")) {
                            this.container.append(str).show().attr({
                                "scrollpagination": "enabled"
                            });
                        } else {
                            this.container.html(str).show().attr({
                                "scrollpagination": "enabled",
                                "data-page": 1
                            });
                        }
                        $(".all_text").html("全部（" + talk.discussLen + "）");
                        $(".commLogin").html("登录查看全部" + talk.discussLen + "条评论");
                        talk.scrollPage(this.container);
                        if ($(".discuss-content").css("display") == "none") {
                            $(".discussAllList").attr({"scrollpagination": "disabled"});
                        } else {
                            $(".discussAllList").attr({"scrollpagination": "enabled"});
                        }
                        talk.partInDiss();
                    } else {

                        $(".all_text").html("全部（" + talk.discussLen + "）");
                        $(".commLogin").html("登录查看全部" + talk.discussLen + "条评论");
                        if (nowScrollObj.attr("data-page")) {
                            nowScrollObj.attr('scrollPagination', 'disabled').hide();
                        } else {
                            nowScrollObj.attr('scrollPagination', 'disabled').hide();
                        }
                        $(".loginNone").show();
                        loginAbout.login.init({
                            "ele": $(".loginGo"),
                            "before": function () {
                                localStorage.setItem("unActive", "1");
                                if ($('.vjs-control').hasClass('vjs-playing')) {
                                    $('.vjs-play-control').click();
                                }
                            },
                            "success": function () {
                                if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                                    location.reload();//刷新页面
                                }
                                $(".loginNone").hide();
                                $(".discussNone").hide();
                                loginAbout.changeHead();
                                course.baseInfo();
                                course.talkInit();
                                course.histortinit();
                                authentication.init({
                                    type: "trigger",
                                    "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                })
                            }
                        })
                    }
                },
                onOperate: function () {
                    if ($('.vjs-control').hasClass('vjs-playing')) {
                        $('.vjs-play-control').click();
                        course.video.pause();
                    }
                },
                type: "disscuss",
                failed: function () {
                    if ($('.vjs-control').hasClass('vjs-playing')) {
                        $('.vjs-play-control').click();
                    }
                    var nowScrollObj = $(".discuss-content .discussAllList");
                    if (loginAbout.login.status().state) {
                        var quanbuOnOff = $(".all_text").html().length > 0;
                        if (!quanbuOnOff) {
                            $(".all_text").html("全部（" + 0 + "）");
                            $(".commLogin").html("登录查看全部" + 0 + "条评论");
                        }
                        nowScrollObj.attr('scrollPagination', 'disabled');
                        var appendOnOff = ($(".discuss-content .discussAllList li").length > 0);
                        if (!appendOnOff) {
                            $(".loginNone").hide();
                            $(".discussNone").show();
                        }
                    } else {
                        var quanbuOnOff = $(".all_text").html().length > 0;
                        if (!quanbuOnOff) {
                            $(".all_text").html("全部（" + 0 + "）");
                            $(".commLogin").html("登录查看全部" + 0 + "条评论");
                        }
                        if (nowScrollObj.attr("data-page")) {
                            nowScrollObj.attr('scrollPagination', 'disabled').hide();
                        } else {
                            nowScrollObj.attr('scrollPagination', 'disabled').hide();
                        }
                        $(".loginNone").show();
                        loginAbout.login.init({
                            "ele": $(".loginGo"),
                            "success": function () {
                                if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                                    location.reload();//刷新页面
                                }
                                $(".loginNone").hide();
                                $(".discussNone").hide();
                                loginAbout.changeHead();
                                course.baseInfo();
                                course.talkInit();
                                course.histortinit();
                                authentication.init({
                                    type: "trigger",
                                    "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                })
                            },
                            "before": function () {
                                localStorage.setItem("unActive", "1");
                            }
                        })
                    }
                }
            };
            talk.init(discussOption);
        },
        "init": function () {
            this.eventDefault();//默认执行事件
            this.browserVerinfo();//获取浏览器版本，用来区分IE8
            this.removeHead();//初始化加载视频的时候将头部置空
            //在最初加载的时候初始化视频
            var myP = videojs("example_video_1", {
                    "defaultVolume": 1,
                },
                function () {
                    var thisVideo = this;
                });
            commLog.createBrowse(38, "课程终端页-课程页", window.location.href + "?/" + course.courseId + "/" + "3");//页面埋点
            this.video = myP;//将这个视频保存为一个全局变量
            this.video.play();
            var recommendData = {
                "resourceId": course.courseId,
                "resourceType": "1",
                "isValid": "1",
                "attUseFlag": "3",
                "firstResult": "0",
                "maxResult": "20"
            };
            var classThink = {
                "courseId": course.courseId,
                "isValid": "1",
                "firstResult": "0",
                "maxResult": "20"
            };
            this.talkInit();
            this.onPlay();
            this.onEnded();
            this.smallScreen();
            this.share();//开启分享功能
            this.videoFn.videoFaceInit();//初始化高清标清界面
            this.baseInfo();

            this.applyData("recommend", recommendData);//加载视频的相关推荐\
            this.applyData("classThink", classThink);//加载课后思考题
            this.courseTap();//实现切换功能
            this.courseAbstract();//打开页面的展开收起功能
            this.collect();//启动页面的所有收藏功能
            this.postVideoTime();//视频播放的时候上传视频播放时间
            this.courseware();//新页打开课件
            this.eventClick();
            this.keyEvent();
        },
        videoInit: 0,
        videoEnd: false,
        again: true,
        eventDefault: function () {
            if (!window.name) {
                window.name = 'test';
                if (localStorage.getItem('vedioMaxTime')) {
                    localStorage.removeItem('vedioMaxTime');
                }
            }
            $('.course-video .courseVideoPupop').remove();
            if ($(".classDown .maxWidth li").length > 3) {
                course.swipe($(".classDown"), $(".classDown .clear"), $(".classDown .downIcon")[0].clientWidth + 'px', $(".classDown .clear li"), "247px");
            }
            ;
        },
        eventClick: function () {
            if ($('.loginGo').length > 0) {
                $('.loginGo').off('click').on('click', function () {
                    commLog.creatEvent({
                        "id": 141,
                        "url": window.location.href,
                        "keyword": "课程页讨论去登录",
                        "browseType": "38"
                    });
                })
            }

            if (window.location.href.indexOf('class=true') > 0 && loginAbout.login.status().userId) {
                $(".course-tab li").eq(1).trigger("click");
            }
            $('.al-search').off('click').on('click', function () {
                commLog.creatEvent({"id": 33, "url": window.location.href, "keyword": "课程终端点击搜索", "browseType": "38"});
            });
            $('.vjs-control-bar').append("<div class=\'videoSign2\' style=\"position: absolute;height: 20px;z-index: 1;width: 100%;top:-10px;right: 0\"></div>");
            $('.vjs-control-bar .videoSign2').off('click').on('click', function () {
                $('#example_video_1 .videoSign1').remove();
                $('#example_video_1').append("<section class=\'videoSign1\'>未完整观看不能随意快进</section>")
                setTimeout(function () {
                    $('#example_video_1 .videoSign1').remove();
                }, 1000)
            });
            $('#notLogin').off('click').on('click', function () {
                if ($('.vjs-control').hasClass('vjs-playing')) {
                    $('.vjs-play-control').click();
                }
            });
            $('.vjs-tech').off('click').on('click', function () {
                if ($('.vjs-control').hasClass('vjs-paused')) {
                    course.courseLook(0, course.videoInit);
                } else {
                    course.videoInit = Math.floor(course.videoTime);
                }
            });
            $('.vjs-play-control').off('click').on('click', function () {
                if ($('.vjs-control').hasClass('vjs-playing')) {
                    course.courseLook(0, course.videoInit);
                } else {
                    course.videoInit = Math.floor(course.videoTime);
                }
            });
            $('.vjs-progress-control').off('mousedown').on('mousedown', function () {
                if ($('.vjs-control').hasClass('vjs-playing')) {
                    course.courseLook(0, course.videoInit);
                }
            });
            $('.vjs-progress-control').off('mouseup').on('mouseup', function () {
                course.videoInit = Math.floor(course.videoTime);
            });
        },

        courseLook: function (isFinish, playTimeLength) {
            if (localStorage.getItem('userId')) {
                var playTime = Math.floor(course.videoTime) - playTimeLength;
                var maxPlayTime;
                if (Math.floor(course.videoTime) > course.maxTime) {
                    maxPlayTime = Math.floor(course.videoTime)
                } else {
                    maxPlayTime = course.maxTime;
                }
                var videoTimeData = {
                    "customerId": loginAbout.login.status().userId,
                    "courseId": course.courseId,
                    "courseName": "",
                    "videoId": course.videoId,
                    "typeId": "1",
                    "isFinish": isFinish,
                    "playTime": Math.floor(course.videoTime),
                    "isValid": "",
                    "visitSiteId": "",
                    "maxPlayTime": maxPlayTime,
                    "maxIsFinish": isFinish,
                    "playTimeLength": playTime,
                    "isSaveLength": 1
                };
                videoTimeData = {
                    "paramJson": $.toJSON(videoTimeData)
                };
                $.ajax({
                    url: "//www.yi-ding.net.cn/call/customer/video/play/create/",
                    //请求的url地址
                    dataType: "json",
                    //返回格式为json
                    async: true,
                    //请求是否异步，默认为异步，这也是ajax重要特性
                    data: videoTimeData,
                    //参数值
                    type: "GET",
                    //请求方式
                    beforeSend: function () {
                        //请求前的处理
                    },
                    success: function (req) {
                        //请求成功时处理
                    },
                    complete: function () {
                        //请求完成的处理
                    },
                    error: function () {
                        //请求出错处理
                    }
                });
            }
        },
        courseStudy: function () {
            var postData = {
                customerId: loginAbout.login.status().userId,
                type: 5,
                tollgateId: course.courseId,
                examId: course.seriesId,
            };
            course.applyData("courseStudy", postData);
        },
        courseware: function () {
            $(".classDown .maxWidth li").each(function () {
                $(this).unbind("click").bind("click", function () {
                    if (loginAbout.login.status().state) {
                        var isThis = $(this);
                        if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                            window.open($(this).attr("data-atturl") + '?sourceType=38', "_blank");
                        } else {
                            if ($('.vjs-control').hasClass('vjs-playing')) {
                                $('.vjs-play-control').click();
                            }
                            authentication.init({
                                type: "trigger",
                                "reload": true, "success": function () {
                                    authentication.exit();
                                    location.reload();//刷新页面

                                }
                            })
                        }

                    } else {
                        localStorage.setItem("unActive", "1");
                        if ($('.vjs-control').hasClass('vjs-playing')) {
                            $('.vjs-play-control').click();
                        }
                        loginAbout.login.show({
                            "success": function () {
                                commLog.creatEvent({
                                    "id": 142,
                                    "url": window.location.href,
                                    "keyword": "加入系列课程去登录",
                                    "browseType": "38"
                                });
                                if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                                    location.reload();//刷新页面
                                }
                                loginAbout.changeHead();
                                course.baseInfo();
                                course.talkInit();
                                course.histortinit();
                                authentication.init({
                                    type: "trigger",
                                    "reload": true, "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面

                                    }
                                })
                            }
                        });
                    }
                })
            })
        },
        courseAbstract: function () { //点击展开收缩
            $(".coursePrepare").each(function () {
                var isHighOnOff = $(this).height();
                if (isHighOnOff > 110) {
                    $(this).addClass("courseHidden").next().show();
                }
            });
            $(".coursePic-right").each(function () {
                $(this).unbind("click").bind("click",
                    function () {
                        $(this).prev().toggleClass("courseHidden");
                        if ($(this).prev().hasClass("courseHidden")) {
                            $(this).html("<i ></i><span>展开</span>").addClass("icon-upMore").removeClass("packUp");
                        } else {
                            $(this).html("<i ></i><span>收起</span>").addClass("packUp").removeClass("icon-upMore");
                        }
                    });
            });
        },
        onPlay: function () {
            course.video.on("play", function () {
                $(".classThink").hide();
                $(".courseCont").show();
                $(".hallTest_cont").hide();
                $(".singleSelectActive").each(function () {
                    $(this).hide();
                });
            });
        },
        answerThink: function () {
            $(".answerCourse").each(function () {
                $(this).unbind("click").bind("click", function () {
                    commLog.creatEvent({
                        "id": 69,
                        "url": window.location.href,
                        "keyword": "课程终端页课后题呼出回复",
                        "browseType": "38"
                    });
                    var options = {
                        container: $(this).parent(),
                        refId: course.courseId,
                        position: "append",
                        parentid: "0",
                        refBelongId: $(this).parent().attr("data-thinkid"),
                        callBack: function (num, dataDiscussid) {

                        }
                    };
                    talk.public(options);
                })
            })

        },
        onEnded: function () {
            course.video.on("ended", function () {
                clearInterval(course.videotimer);
                course.videotimer = null;
                var courseObj = $(".courseCont");
                if (loginAbout.login.status().state && !course.videoEnd) {
                    course.videoEnd = true;
                    course.again = false;
                    var playTime = Math.floor(course.videoTime) - course.videoInit;
                    course.videoInit = 0;
                    var videoTimeData = {
                        "customerId": loginAbout.login.status().userId,
                        "courseId": course.courseId,
                        "courseName": "",
                        "videoId": course.videoId,
                        "typeId": "1",
                        "isFinish": "1",
                        "playTime": Math.floor(course.videoTime),
                        "isValid": "",
                        "visitSiteId": "",
                        "maxPlayTime": Math.floor(course.videoTime),
                        "maxIsFinish": "1",
                        "playTimeLength": playTime,
                        "isSaveLength": 1
                    };
                    videoTimeData = {
                        "paramJson": $.toJSON(videoTimeData)
                    };
                    $.ajax({
                        url: "//www.yi-ding.net.cn/call/customer/video/play/create/",
                        //请求的url地址
                        dataType: "json",
                        //返回格式为json
                        async: true,
                        //请求是否异步，默认为异步，这也是ajax重要特性
                        data: videoTimeData,
                        //参数值
                        type: "GET",
                        //请求方式
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            //请求成功时处理
                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });
                }
                if ($(".classThink").length > 0) {
                    $(".classThink").show();
                    course.answerThink();
                    courseObj.hide();
                    $(".classThinkClose").unbind("click").bind("click", function () {
                        commLog.creatEvent({
                            "id": 117,
                            "url": window.location.href,
                            "keyword": "课后思考题关闭",
                            "browseType": "38"
                        });
                        $(".classThink").hide();
                        courseObj.show();
                    })
                }
                var fullScreenOnOff = $("#example_video_1").hasClass("vjs-fullscreen");
                if (fullScreenOnOff) {
                    $('.vjs-fullscreen-control').click();
                }
                $('.course-video .courseVideoPupop').remove();
                var courseVideoPupopStr = '<section class="courseVideoPupop" style="background-color:rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000,endColorstr=#99000000);">' +
                    '                    <ul>' +
                    '                        <li class="repeat">' +
                    '                            <i></i>' +
                    '                            <span>重播</span>' +
                    '                        </li>' +
                    '                        <li class="learnNext">' +
                    '                            <i></i>' +
                    '                            <span>学习下一课</span>' +
                    '                        </li>' +
                    '                    </ul>' +
                    '                </section>';
                $('.course-video').append(courseVideoPupopStr);
                var textThink = $('.classThink .courseThinkNext').text();
                $('.classThink .courseThinkNext').hide();
                if (textThink == '没有课程了，离开') {
                    $('.course-video .courseVideoPupop li').eq(1).removeClass('learnNext').addClass('courseNone');
                }
                $('.course-video .courseVideoPupop li').eq(1).find('span').text(textThink);
                $('.course-video .courseVideoPupop .repeat').off('click').on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $('.course-video .courseVideoPupop').remove();
                    course.video.play();
                })
                $('.course-video .courseVideoPupop li').eq(1).off('click').on('click', function () {
                    window.location.href = course.nextCourse;
                })
                if ($(".coursePc-coll").find(".join-course").length == 1) {
                    comm.confirmBox({
                        "title": "您还未加入系列课程",
                        "content": "将无法记录您的完整学习历史",
                        "cancel": "暂不加入",
                        "ensure": "加入系列课程",
                        "ensureCallback": function () {
                            commLog.creatEvent({
                                "id": 58,
                                "url": window.location.href,
                                "keyword": "课程终端页弹窗加入系列课程",
                                "browseType": "38",

                            });
                            $(".courseQution-pc").show();
                            $(".join-course").hide();
                            var postData = {
                                customerId: loginAbout.login.status().userId,
                                joinType: 1,
                                refId: course.seriesId,
                            };
                            course.applyData("partInCourse", postData);

                        },
                        "cancelCallback": function () {

                        }
                    });
                }
            });
        },
        collect: function () {
            $(".collProblems").unbind("click").bind("click", function () {
                var isThis = $(this);
                if ($(".singleSelectActive").attr("data-collect")) {/*//www.yi-ding.net.cn/call/customer/collection/delete/*/
                    var cancelId = $(".singleSelectActive").attr("data-collect");
                    var cancelData = {"id": cancelId};
                    cancelData = {"paramJson": $.toJSON(cancelData)};
                    $.ajax({
                        url: "//www.yi-ding.net.cn/call/customer/collection/delete/",
                        //请求的url地址
                        dataType: "json",
                        //返回格式为json
                        async: true,
                        //请求是否异步，默认为异步，这也是ajax重要特性
                        data: cancelData,
                        //参数值
                        type: "POST",
                        //请求方式
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            comm.loading.hide();
                            //请求成功时处理/*<i class="collProblems"><span class="collIcon"></span><span>收藏题目</span></i>*/
                            if (req.responseObject.responseStatus) {
                                $(".singleSelectActive").removeAttr("data-collect");
                                isThis.html("<span class=\"collIcon\"></span><span>收藏题目</span>").removeClass("active");

                            }

                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });
                } else {
                    var refId = $(".singleSelectActive").attr("data-exerciseid");
                    var topicObj = null;
                    $(".queite").each(function () {
                        if ($(this).css("display") == "block") {
                            topicObj = $(this);
                        }
                    });
                    var customerOp = "";
                    topicObj.find(".queShitiOptions").each(function () {
                        if ($(this).hasClass("false") || $(this).hasClass("true")) {
                            customerOp += $(this).attr("data-ansid") + ",";
                        }
                    });
                    customerOp = customerOp.substring(0, customerOp.length - 1);
                    var collectData = {
                        refId: refId,
                        collectionType: "2",
                        customerId: loginAbout.login.status().userId,
                        "collectionAnswer": customerOp
                    };
                    collectData = {"paramJson": $.toJSON(collectData)};
                    $.ajax({
                        url: "//www.yi-ding.net.cn/call/customer/collection/create/",
                        //请求的url地址
                        dataType: "json",
                        //返回格式为json
                        async: true,
                        //请求是否异步，默认为异步，这也是ajax重要特性
                        data: collectData,
                        //参数值
                        type: "POST",
                        //请求方式
                        beforeSend: function () {
                            //请求前的处理
                        },
                        success: function (req) {
                            //请求成功时处理
                            comm.loading.hide();
                            if (req.responseObject.responseStatus) {
                                $(".singleSelectActive").attr("data-collect", req.responseObject.responsePk);
                                isThis.html("<span class=\"collIcon\"></span><span>已收藏</span>").addClass("active");

                            }

                        },
                        complete: function () {
                            //请求完成的处理
                        },
                        error: function () {
                            //请求出错处理
                        }
                    });
                }

            });
            $(".courseColl-pc").unbind("click").bind("click",
                function () {
                    if (loginAbout.login.status().state) {
                        var isThis = $(this);
                        var postData = {};
                        isThis.toggleClass("active");
                        if (isThis.hasClass("active")) {
                            isThis.html("已收藏");
                            // $(".course-guide").addClass('show');
                            // $(".course-guide .guideBut").unbind("click").bind("click",function(){
                            //     $(".course-guide").removeClass('show');
                            // });
                            comm.guideUser(2);
                            postData = {
                                "refId": course.courseId,
                                "collectionType": "3",
                                "customerId": loginAbout.login.status().userId
                            };
                            course.applyData("collectCourse", postData);
                        } else {
                            isThis.html("收藏");
                            var cancelId = isThis.attr("data-collectid");
                            postData = {
                                "id": cancelId
                            };
                            course.applyData("deleteCourse", postData);
                        }
                    } else {
                        localStorage.setItem("unActive", "1");
                        if ($('.vjs-control').hasClass('vjs-playing')) {
                            $('.vjs-play-control').click();
                        }
                        loginAbout.login.show({
                            "success": function () {
                                if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                                    location.reload();//刷新页面
                                }
                                loginAbout.changeHead();
                                course.baseInfo();
                                course.talkInit();
                                course.histortinit();
                                authentication.init({
                                    type: "trigger",
                                    "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                })

                            }
                        });
                    }
                });
            $(".courseQution-pc").unbind("click").bind("click", function () {
                commLog.creatEvent({
                    "id": 68,
                    "url": window.location.href,
                    "keyword": "课程终端页提问呼出讨论",
                    "browseType": "38"
                });
                var isThis = $(this);
                course.judge(function () {
                    isThis.toggleClass("active");
                    if (isThis.hasClass("active")) {
                        isThis.parent().hide();
                        var discussId = 0;
                        var options = {
                            container: $(".qustionWrite"),
                            refId: course.courseId,
                            position: "inner",
                            parentid: discussId,
                            refBelongId: "",
                            callBack: function (num, dataDiscussid) {

                            }
                        };
                        talk.public(options);
                    }
                }, true)
            });
        },
        perveTime: [],
        timeUpdata: function (maxTime) {
            var time = 0;
            // <div class="vjs-loading-spinner" style="display: none;"></div>
            course.video.on("timeupdate", function () {
                var testTargetObj = $(".hallTest_cont");
                var shadeObj = $(".hallTestVideoShade");
                var courseObj = $(".courseCont");
                var textShadeObj = $(".hallTestVideoText");
                var nowTime = course.video.currentTime();
                nowTime = parseInt(nowTime);
                course.videoTime = nowTime;//原文在2939，并不理解
                if (time == nowTime) {
                    return;
                } else {
                    time = nowTime;
                }
                !course.again && course.postVideoTime();
                course.again = true;
                course.videoEnd = false;
                course.videoFn.changeHSVideo();//实现高清标清界面切换
                course.perveTime.push(nowTime);
                for (var i = 0; i < course.perveTime.length; i++) {
                    if (course.perveTime[i + 1] - course.perveTime[i] > 4) {
                        var popTime = course.perveTime.pop();
                        if (popTime <= Math.max.apply(null, course.perveTime)) {
                            course.perveTime.push(popTime);
                        }
                        if (nowTime > Math.max.apply(null, course.perveTime)) {
                            course.video.currentTime(Math.max.apply(null, course.perveTime))
                            nowTime = Math.max.apply(null, course.perveTime)
                            $('#example_video_1 .videoSign1').remove();
                            $('#example_video_1').append("<section class=\'videoSign1\'>未完整观看不能随意快进</section>")
                            course.perveTime = [];
                        }
                        if (course.perveTime[course.perveTime.length - 1] - course.perveTime[course.perveTime.length - 2] < 0) {
                            course.video.currentTime(course.perveTime[course.perveTime.length - 1])
                        }
                    } else if (course.perveTime[i] - course.perveTime[i - 1] == 1) {
                        course.perveTime.splice(i - 1, 1);
                    }

                }
                course.maxTime = Math.max.apply(null, course.perveTime);
                if (course.historyIsfinish == 0 || maxTime == 0) {
                    $('.vjs-control-bar .videoSign2').width((98 - (course.maxTime / course.video.duration()) * 100) + '%');
                }
                setTimeout(function () {
                    $('#example_video_1 .videoSign1').remove();
                }, 1000)
                localStorage.setItem('vedioMaxTime', course.maxTime)
                if (nowTime > 180) {
                    var videoObj = $("#example_video_1");
                    var fullScreenOnOff = videoObj.hasClass("vjs-fullscreen");
                    if (fullScreenOnOff) {
                        if (loginAbout.login.status().state) {
                            switch (authentication.keyState().state) {
                                case "-1":
                                    course.video.currentTime(180);
                                    if ($('.vjs-control').hasClass('vjs-playing')) {
                                        $('.vjs-play-control').click();
                                    }
                                    if ($('.authentication-out').length == 0) {
                                        $("#example_video_1").append('<section class="video-confirmModalMask" style="background-color:rgba(0,0,0,0.3); ">' +
                                            '<section class="video-confirmModal">' +
                                            '<article class="video-confirmModalContent">' +
                                            '<article>' +
                                            '<h2>' + "" + '</h2>' +
                                            '<p>' + "未认证只能观看三分钟，快去认证学习完整视频" + '</p>' +
                                            '</article>' +
                                            '</article>' +
                                            '<div class="video-confirmModalBtns">' +
                                            '<button class="video-confirmModalCancelBtn">' + "暂不认证" + '</button>' +
                                            '<button class="video-confirmModalEnsureBtn">' + "去认证" + '</button>' +
                                            '</div>' +
                                            '</section>' +
                                            '</section>');
                                    }
                                    $(".video-confirmModalCancelBtn").unbind("click").bind("click", function () {
                                        commLog.creatEvent({
                                            "id": 16,
                                            "url": window.location.href,
                                            "keyword": "暂不认证",
                                            "browseType": "38"
                                        });
                                        course.video.cancelFullScreen();
                                        $(".video-confirmModalMask").remove();
                                    });
                                    $(".video-confirmModalEnsureBtn").unbind("click").bind("click", function () {
                                        commLog.creatEvent({
                                            "id": 144,
                                            "url": window.location.href,
                                            "keyword": "视频播放认证进入",
                                            "browseType": "38"
                                        });
                                        course.video.cancelFullScreen();
                                        authentication.init({
                                            type: 'trigger',
                                            "success": function () {
                                                authentication.exit();
                                                location.reload();//刷新页面
                                            }, reload: true
                                        })
                                    });
                                    break;
                                case "0":
                                case "4":
                                    course.video.currentTime(180);
                                    if ($('.vjs-control').hasClass('vjs-playing')) {
                                        $('.vjs-play-control').click();
                                    }
                                    $("#example_video_1").append("<section class=\"video-confirmModalMask video-alertModalMask\" style=\"background-color:rgba(0,0,0,0.3); \"><section class=\"video-confirmModal\"><article class=\"video-confirmModalContent\"><article><p>很抱歉！我们正在加紧审核您的认证信息，请耐心等待...</p></article></article><div class=\"video-confirmModalBtns\"><button class=\"video-confirmModalEnsureBtn\" style=\"width:100%\">好的</button></div></section></section>");
                                    $(".video-confirmModalBtns").unbind("click").bind("click", function () {
                                        $(".video-confirmModalMask").remove();
                                    });
                                    break;
                                case "3":
                                    course.video.cancelFullScreen();
                                    course.video.currentTime(180);
                                    if ($('.vjs-control').hasClass('vjs-playing')) {
                                        $('.vjs-play-control').click();
                                    }
                                    authentication.init({
                                        type: 'trigger',
                                        "success": function () {
                                            authentication.exit();
                                            location.reload();//刷新页面
                                        }, reload: true
                                    })
                                    break;
                            }
                        } else {
                            localStorage.setItem("unActive", "1");
                            course.video.cancelFullScreen();
                            course.video.currentTime(180);
                            if ($('.vjs-control').hasClass('vjs-playing')) {
                                $('.vjs-play-control').click();
                            }
                            loginAbout.login.show({
                                "success": function () {
                                    if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                                        location.reload();//刷新页面
                                    }
                                    loginAbout.changeHead();
                                    course.baseInfo();
                                    course.talkInit();
                                    course.histortinit();
                                    authentication.init({
                                        type: "trigger",
                                        "success": function () {
                                            authentication.exit();
                                            location.reload();//刷新页面
                                        }, reload: true
                                    })
                                }
                            });
                        }

                    } else {
                        if (loginAbout.login.status().state) {
                            if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {

                            } else {
                                course.video.currentTime(180);
                                if ($('.vjs-control').hasClass('vjs-playing')) {
                                    $('.vjs-play-control').click();
                                }
                                switch (authentication.keyState().state) {
                                    case "-1":
                                        $(".yd-confirmModalMask.yd-alertModalMask").remove();
                                        if ($('.authentication-out').length == 0) {
                                            comm.confirmBox({
                                                "content": "未认证只能观看三分钟，快去认证学习完整视频",
                                                "cancel": "暂不认证",
                                                "ensure": "去认证",
                                                "ensureCallback": function () {
                                                    commLog.creatEvent({
                                                        "id": 144,
                                                        "url": window.location.href,
                                                        "keyword": "课程播放去认证",
                                                        "browseType": "38"
                                                    });
                                                    authentication.init({
                                                        type: 'trigger',
                                                        "success": function () {
                                                            authentication.exit();
                                                            location.reload();//刷新页面
                                                        }, reload: true
                                                    })
                                                },
                                                "cancelCallback": function () {
                                                    commLog.creatEvent({
                                                        "id": 16,
                                                        "url": window.location.href,
                                                        "keyword": "暂不认证",
                                                        "browseType": "38"
                                                    });
                                                    $(".value").remove();
                                                }
                                            });
                                        }
                                        break;
                                    case "0":
                                    case "4":
                                        $(".yd-confirmModalMask.yd-alertModalMask").remove();
                                        comm.alertBox({
                                            "title": "很抱歉！我们正在加紧审核您的认证信息，请耐心等待...",
                                            "ensure": "好的",
                                            "ensureCallback": function () {

                                            }
                                        });
                                        break;
                                    case "3":
                                        authentication.init({
                                            type: 'trigger',
                                            "success": function () {
                                                authentication.exit();
                                                location.reload();//刷新页面
                                            }, reload: true
                                        })
                                        break;
                                }
                            }
                        } else {
                            localStorage.setItem("unActive", "1");
                            course.video.currentTime(180);
                            if ($('.vjs-control').hasClass('vjs-playing')) {
                                $('.vjs-play-control').click();
                            }
                            loginAbout.login.show({
                                "success": function () {
                                    if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                                        location.reload();//刷新页面
                                    }
                                    loginAbout.changeHead();
                                    course.baseInfo();
                                    course.talkInit();
                                    course.histortinit();
                                    authentication.init({
                                        type: 'trigger',
                                        "success": function () {
                                            authentication.exit();
                                            location.reload();//刷新页面
                                        }, reload: true
                                    })
                                }
                            });
                        }
                    }

                }
                if (textShadeObj.attr("data-toggle")) {
                    var toggleShadeOnOff = JSON.parse(textShadeObj.attr("data-toggle"));
                    if (!toggleShadeOnOff) {
                        courseObj.show();
                        testTargetObj.hide();
                        shadeObj.hide();
                    }
                }
                course.videoFn.operate(nowTime);//在播放的时候实目录的试试改变
            });

        },

        partInCourse: function () {
            $(".join-course").unbind("click").bind("click", function () {
                commLog.creatEvent({
                    "id": 57,
                    "url": window.location.href,
                    "keyword": "课程终端页底部加入系列课程",
                    "browseType": "38"
                });
                if (loginAbout.login.status().state) {
                    var isThis = $(this);
                    $(".courseQution-pc").show();
                    $(".join-course").hide();
                    isThis.hide();
                    var postData = {
                        customerId: loginAbout.login.status().userId,
                        joinType: 1,
                        refId: course.seriesId,
                    };
                    course.applyData("partInCourse", postData);
                } else {
                    localStorage.setItem("unActive", "1");
                    if ($('.vjs-control').hasClass('vjs-playing')) {
                        $('.vjs-play-control').click();
                    }
                    loginAbout.login.show({
                        "success": function () {
                            commLog.creatEvent({
                                "id": 142,
                                "url": window.location.href,
                                "keyword": "加入系列课程去登录",
                                "browseType": "38"
                            });
                            if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                                location.reload();//刷新页面
                            }
                            loginAbout.changeHead();
                            course.baseInfo();
                            course.talkInit();
                            course.histortinit();
                            authentication.init({
                                type: "trigger",
                                "reload": true, "success": function () {
                                    authentication.exit();
                                    location.reload();//刷新页面

                                }
                            })
                        }
                    });
                }
            });
        },
        seriesId: null,
        historyIsfinish: null,
        historyCurtten: null,
        histortinit: function () {
            var historyData = {
                "courseId": course.courseId,
                "customerId": loginAbout.login.status().userId,
                "videoId": course.videoId,
                "typeId": "1",
                "visitSiteId": "13",
                "isValid": "1",
                "firstResult": "0",
                "maxResult": "10",
                "sortType": "2"
            };
            course.applyData("histroyTime", historyData);
        },
        creatQueImg: function (data) {
            var imgListStr = "";
            if (data != undefined && data.length > 0) {
                var imgBox = [];
                var imgList = data.split("|");
                for (var imgNum = 0; imgNum < imgList.length; imgNum++) {
                    imgBox[imgNum] = {};
                    imgBox[imgNum].src = imgList[imgNum];
                    imgListStr += "<li class=\"queImgAlert\" style=\"float: left;margin-right: 10px;\"><img src=\"" + imgList[imgNum] + "\" style=\"width: 200px;height: 200px;\"> </li>";
                }
                imgListStr = "<ul style=\"clear: both;\" class=\"clear\" data-imgBox='" + JSON.stringify(imgBox) + "'>" + imgListStr + "</ul>";
            }
            return imgListStr;
        },
        manageData: function (type, data) {
            var realData = data.responseObject.responseData.data_list;
            var realNoData = ((data.responseObject.responseMessage) == "NO DATA") ? true : false;
            var realStatus = data.responseObject.responseStatus;
            switch (type) {
                case "point":
                    if (realNoData || !realStatus) {
                        return false;
                    } else {
                        var timeDot = data.responseObject.responseData.data_list[0].courseNodeList;
                        course.videoId = data.responseObject.responseData.data_list[0].videoId;
                        course.videoDuringTime = data.responseObject.responseData.data_list[0].videoPlayTime;
                        var joinOnOff = data.responseObject.responseData.data_list[0].seriesJoin;
                        var nextCourse = data.responseObject.responseData.data_list[0].nextMap;
                        var seriesId = data.responseObject.responseData.data_list[0].seriesId
                        course.seriesId = seriesId;
                        if (loginAbout.login.status().state) {
                            this.courseStudy();
                        }
                        if ($.isEmptyObject(joinOnOff)) {
                            if ($(".coursePc-coll").find(".join-course").length == 0) {
                                $(".coursePc-coll").append("<li class=\"join-course\">加入系列课程</li>");
                            }
                            course.partInCourse();
                        } else {
                            var joinState = joinOnOff.isValid == "1";
                            if (joinState) {
                                $(".courseQution-pc").show();//显示提问
                                $(".join-course").hide();
                            } else {
                                if ($(".coursePc-coll").find(".join-course").length == 0) {
                                    $(".coursePc-coll").append("<li class=\"join-course\">加入系列课程</li>");
                                }
                                course.partInCourse();
                            }
                        }
                        if ($.isEmptyObject(nextCourse)) {
                            course.nextCourse = "https://www.yi-ding.net.cn/" + '?sourceType=38';
                            $(".courseThinkNext").html("没有课程了，离开").unbind("click").bind("click", function () {
                                window.location.href = "https://www.yi-ding.net.cn/" + '?sourceType=38';
                            })
                        } else {
                            course.nextCourse = "https://" + nextCourse.nextPageStoragePath + '?sourceType=38';
                            $(".courseThinkNext").unbind("click").bind("click", function () {
                                commLog.creatEvent({
                                    "id": 116,
                                    "url": window.location.href,
                                    "keyword": "课后思考题学习下一课",
                                    "browseType": "38"
                                });
                                window.location.href = "https://" + nextCourse.nextPageStoragePath + '?sourceType=38';
                            })
                        }
                        var list = [];
                        var collectStatus = $.isEmptyObject(data.responseObject.responseData.data_list[0].courseCollection)
                        var exerciseStr = "";
                        var testContainer = $(".hallTest_cont .hallTestTitle");
                        var thinkContainer = $(".classThink .thinkList");
                        var dotIndex = 0;
                        if (collectStatus) {
                            $(".courseColl-pc").html("收藏");
                        } else {
                            $(".courseColl-pc").html("已收藏").attr({"data-collectid": data.responseObject.responseData.data_list[0].courseCollection.id}).addClass("active");
                        }
                        for (var dotNum = 0; dotNum < timeDot.length; dotNum++) {
                            list[dotNum] = {};
                            list[dotNum].iteam = timeDot[dotNum].courseNodeTime;
                            list[dotNum].courseNodeName = timeDot[dotNum].courseNodeName;
                            list[dotNum].courseNodeId = timeDot[dotNum].courseNodeId;
                            if (timeDot[dotNum].exercisesList) {
                                if (timeDot[dotNum].exercisesList.length > 0) {
                                    var exerciseIte = timeDot[dotNum].exercisesList[0];
                                    var title = "";
                                    var typeName = "";
                                    var dataType = "";
                                    var exp = "";
                                    var rightStr = "";
                                    var rightOp = "";
                                    var knowledgeList = "";
                                    var exerciseId = timeDot[dotNum].exercisesList[0].exercisesId;
                                    var exerciseCollectState = timeDot[dotNum].exercisesList[0].exercisesCollection.isValid;
                                    var collectId = (exerciseCollectState == "1") ? timeDot[dotNum].exercisesList[0].exercisesCollection.id : "";
                                    exp = exerciseIte.exercisesAnswerDesc + course.creatQueImg(exerciseIte.exercisesDescAtt);
                                    title = exerciseIte.exercisesName + course.creatQueImg(exerciseIte.exercisesNameAtt);
                                    switch (exerciseIte.exercisesType) {
                                        case "1":
                                            typeName = "单";
                                            dataType = "单选";
                                            break;
                                        case "2":
                                            typeName = "多";
                                            dataType = "多选";
                                            break;
                                        case "3":
                                            typeName = "判";
                                            dataType = "判断";
                                            break;
                                        default:
                                            break;
                                    }
                                    var optionStr = "";
                                    for (var opNum = 0; opNum < timeDot[dotNum].exercisesList[0].optionList.length; opNum++) {
                                        var inopIte = "";
                                        var inopName = "";
                                        var inopId = "";
                                        var rightOnOff = "";
                                        inopIte = timeDot[dotNum].exercisesList[0].optionList[opNum].optionName + course.creatQueImg(timeDot[dotNum].exercisesList[0].optionList[opNum].optionDescAtt);
                                        inopId = timeDot[dotNum].exercisesList[0].optionList[opNum].optionId;
                                        switch (timeDot[dotNum].exercisesList[0].optionList[opNum].sortId) {
                                            case "1":
                                                inopName = "A";
                                                break;
                                            case "2":
                                                inopName = "B";
                                                break;
                                            case "3":
                                                inopName = "C";
                                                break;
                                            case "4":
                                                inopName = "D";
                                                break;
                                            case "5":
                                                inopName = "E";
                                                break;
                                            case "6":
                                                inopName = "F";
                                                break;
                                            case "7":
                                                inopName = "G";
                                                break;
                                            case "8":
                                                inopName = "H";
                                                break;
                                            default:
                                                break;
                                        }
                                        if (timeDot[dotNum].exercisesList[0].optionList[opNum].isRight == "1") {
                                            rightOnOff = "true";
                                            rightStr += inopName;
                                            rightOp += timeDot[dotNum].exercisesList[0].optionList[opNum].optionId + ",";
                                        } else {
                                            rightOnOff = "false";
                                        }
                                        optionStr += '<li class=\"clear queShitiOptions\" data-ansId=\'' + inopId + '\' data-judge=\"' + rightOnOff + '\"' + ' data-arrange=\"' + inopName + '\"><div class=\"answerNum\"><span>' + inopName + '</span></div><div class=\"answerText\">' + inopIte + '</div></li>';
                                    }
                                    var knoStr = "";
                                    var knoStrClass = "";
                                    if (exerciseIte.knowledgeList.length > 0) {
                                        for (var koNum = 0; koNum < exerciseIte.knowledgeList.length; koNum++) {
                                            knoStr += "<li>" + exerciseIte.knowledgeList[koNum].knowledgeName + "</li>";
                                        }
                                    } else {
                                        knoStr = "";
                                        knoStrClass = "lucency";
                                    }
                                    rightOp = rightOp.substring(0, rightOp.length - 1);
                                    if (exerciseIte.exercisesType == 2) {
                                        exerciseStr += "<div class=\"checkbox queite\" data-collect=\"" + collectId + "\" data-collect=\"" + exerciseCollectState + "\"   data-time=\"" + list[dotNum].iteam + "\" data-rightOp = \"" + rightOp + "\" data-type=\"" + dataType + "\"  data-exerciseId=\"" + exerciseId + "\"   data-status=\"none\" data-nowqueindex=\"" + dotIndex + "\" data-showed=\"false\">" + "<div class=\"hTestProblems\"><span class=\'exerciseTypeSpan\'>" + typeName + "</span>" + title + "</div>" + "<ul class=\"hTestAnswer\">" + optionStr + "</ul>" + "<div class=\"confirmBtn\">确认</div>" + "</div>" + "<div class=\"answerAnalysis\" data-nowansindex=\"" + dotIndex + "\">" + "<div class=\"answerATitle\"><span>答案解析</span></div>" + "<div class=\"aswerDisplay\"><span class=\"trueAswer\">正确答案：" + rightStr + "</span><span class=\"falseAswer\">答案：B</span></div>" + "<div class=\"aAnalysis_text\">" + exp + "</div>" + "<div class=\"knowledgePoint\"><div class=\"title " + knoStrClass + "\">知识点：</div><ul class=\"knowledgeList clear\">" + knoStr + "</ul>" + "</div>" + "</div>";
                                    } else {
                                        exerciseStr += "<div class=\"singleSelect queite\"  data-collect=\"" + collectId + "\"  data-collect=\"" + exerciseCollectState + "\"    data-time=\"" + list[dotNum].iteam + "\"  data-rightOp = \"" + rightOp + "\"  data-type=\"" + dataType + "\" data-exerciseId=\"" + exerciseId + "\" data-status=\"none\" data-nowqueindex=\"" + dotIndex + "\" data-showed=\"false\">" + "<div class=\"hTestProblems\"><span class=\'exerciseTypeSpan\'>" + typeName + "</span>" + title + "</div>" + "<ul class=\"hTestAnswer\">" + optionStr + "</ul>" + "</div>" + "<div class=\"answerAnalysis\" data-nowansindex=\"" + dotIndex + "\">" + "<div class=\"answerATitle\"><span>答案解析</span></div>" + "<div class=\"aswerDisplay\"><span class=\"trueAswer\">正确答案：" + rightStr + "</span><span class=\"falseAswer\">错误答案：B</span></div>" + "<div class=\"aAnalysis_text\">" + exp + "</div>" + "<div class=\"knowledgePoint\"><div class=\"title " + knoStrClass + "\">知识点：</div><ul class=\"knowledgeList clear\">" + knoStr + "</ul></div>" + "</div>";
                                    }
                                    dotIndex++;
                                    list[dotNum].proFun = function () {
                                        course.dragNode = this.iteam;
                                        course.courseTest();
                                    };
                                }

                            }

                        }
                        var thinkStr = "";
                        for (var thinkDot = 0; thinkDot < timeDot.length; thinkDot++) {
                            if (timeDot[thinkDot].questionList) {
                                for (var thinkNum = 0; thinkNum < timeDot[thinkDot].questionList.length; thinkNum++) {
                                    var thinkName = timeDot[thinkDot].questionList[thinkNum].questionName;
                                    var thinkId = timeDot[thinkDot].questionList[thinkNum].questionId;
                                    thinkStr += "<li class=\"clear\" data-thinkId=\'" + thinkId + "\' >" +
                                        "<div>" + thinkName + "</div>" +
                                        "<span class='answerCourse' data-thinkId=\'" + thinkId + "\' >回答</span>" + "</li>";
                                }
                            }
                        }
                        thinkContainer.html(thinkStr);
                        function formatSeconds(value) {
                            var lineWidth = "";
                            if (value.split(":").length == 3) {
                                lineWidth = parseInt(parseInt(value.split(":")[0]) * 3600) + parseInt(parseInt(value.split(":")[1]) * 60) + parseInt(parseInt(value.split(":")[2]) * 1);
                            } else if (value.split(":").length == 2) {
                                lineWidth = parseInt(parseInt(value.split(":")[0]) * 60) + parseInt(parseInt(value.split(":")[1]) * 1);
                            } else {
                                lineWidth = parseInt(parseInt(value.split(":")[0]) * 1);
                            }
                            return lineWidth;
                        }

                        var timeWidth = course.videoDuringTime;
                        course.secondVideoTime = formatSeconds(timeWidth);
                        if (testContainer.parent().find(".queite").length == 0) {
                            testContainer.after(exerciseStr);
                            $(".queImgAlert").each(function () {
                                $(this).unbind("click").bind("click", function (e) {
                                    e.stopPropagation();
                                    var imgData = JSON.parse($(this).parent().attr("data-imgbox"));
                                    var nowIndex = parseInt($(this).index()) + 1;
                                    creatCarousel.creatHtml(imgData, nowIndex, "0");
                                    $(".swiper_right").hide();
                                })
                            });
                        }
                        course.dotConfig = {
                            "width": timeWidth,
                            "list": list
                        };
                        course.histortinit();
                    }
                    break;
                case "histroyTime":
                    if (realNoData || !realStatus) {
                        course.dragNode = course.dotConfig.list[0].iteam;
                        var vedioMaxTime = JSON.parse(localStorage.getItem('vedioMaxTime'));
                        if (vedioMaxTime <= 180) {
                            course.video.currentTime(vedioMaxTime);
                            course.videoInit = vedioMaxTime;
                        }
                        if ($('.authentication-out').length == 0) {
                            course.video.play();
                        } else {
                            if ($('.vjs-control').hasClass('vjs-playing')) {
                                $('.vjs-play-control').click();
                            }
                        }
                        course.videoFn.showDot(); //视频锚点初始化是在这里开始的
                        course.videoFn.showSubway();//显示目录节点
                        course.timeUpdata(0);
                        return false;
                    } else {
                        var nowTime = realData[0].maxVideoPlay.playTime;
                        var currentTime = (parseInt(realData[0].newVideoPlay.playTime) == parseInt(course.secondVideoTime)) ? 0 : realData[0].newVideoPlay.playTime;
                        course.videoFn.nowTime = nowTime;
                        course.historyIsfinish = realData[0].maxVideoPlay.isFinish;
                        course.historyCurtten = realData[0].newVideoPlay.isFinish;
                        if (parseInt(realData[0].maxVideoPlay.isFinish) == 1) {
                            if ((typeof course.video.disableProgress) == "function") {
                                localStorage.removeItem("reload");
                            } else {
                                if (localStorage.getItem("reload")) {

                                } else {
                                    window.location.reload();
                                    localStorage.setItem("reload", "1");
                                }

                            }

                        }
                        course.histroyOnOff = true;
                        course.dragNode = nowTime;
                        var vedioMaxTime = JSON.parse(localStorage.getItem('vedioMaxTime'));
                        if (vedioMaxTime != 180) {
                            if (vedioMaxTime <= currentTime) {
                                if (Math.abs(currentTime - course.video.duration()) < 1) {
                                    course.video.currentTime(0);
                                } else if (vedioMaxTime <= 1) {
                                    course.video.currentTime(currentTime);
                                    course.videoInit = currentTime;
                                } else {
                                    course.video.currentTime(vedioMaxTime);
                                    course.videoInit = vedioMaxTime;
                                }
                            } else {
                                if (Math.abs(currentTime - course.video.duration()) < 1) {
                                    course.video.currentTime(0);
                                } else {
                                    course.video.currentTime(currentTime);
                                    course.videoInit = currentTime;
                                }
                            }
                        } else {
                            course.video.currentTime(180);
                            course.videoInit = 180;
                        }
                        if (course.historyIsfinish == 1) {
                            $('.vjs-control-bar .videoSign2').width(0 + '%');
                        } else {
                            $('.vjs-control-bar .videoSign2').width((98 - (nowTime / course.video.duration()) * 100) + '%');
                        }

                        if ($('.authentication-out').length == 0) {
                            course.video.play();
                        } else {
                            if ($('.vjs-control').hasClass('vjs-playing')) {
                                $('.vjs-play-control').click();
                            }
                        }
                        course.videoFn.showDot(); //视频初始化是在这里开始的
                        course.videoFn.showSubway();//显示目录节点
                        course.toggleExer(currentTime, nowTime);
                        course.perveTime.push(nowTime);
                        course.timeUpdata(nowTime);
                    }
                    break;
                case "recommend":
                    if (realNoData || !realStatus) {
                        $(".recommendContainer").remove();
                    } else {
                        var videoStr = "";
                        for (var videoNum = 0; videoNum < realData.length; videoNum++) {
                            var reName = realData[videoNum].refName;
                            var videoUrl = realData[videoNum].pageStoragePath;
                            var playTime = realData[videoNum].playTime;
                            var isAllin = (realData[videoNum].isAllin == "0") ? false : true;
                            var videoId = realData[videoNum].refId;
                            var imgSrc = realData[videoNum].refAttUrl;
                            var allinStr = "";
                            if (isAllin) {
                                allinStr = "allinIcon";
                            } else {
                                allinStr = "allinIcon lucency";
                            }
                            videoStr += "<li>" + "<div class=\"reImg\"><img src=\"" + imgSrc + "\">" + "<div class=\"playIcon\" data-videoUrl='" + videoUrl + "' data-videoId='" + videoId + "'><i class=\"playIconImg\"></i></div>" + "<div class=\"" + allinStr + "\"></div>" + "<div class=\"timeNum\">" + playTime + "</div></div>" + "<div class=\"reText\">" + reName + "</div>" + "</li>";
                        }
                        $(".recommend ul").html(videoStr);
                        if ($(".recommend ul li").length > 3) {
                            course.swipe($(".recommendCont "), $(".recommendCont  .recommend"), 210 + 'px', $(".recommendCont  .recommend li"), "200px");
                        }
                        if ($(".course-tabite").eq(1).find(".course-active").length > 0) {
                            $(".recommendContainer").show();
                        }
                        course.changeVideo();//转换本页视频
                    }
                    break;
                case "classThink":
                    if (realNoData || !realStatus) {
                        $(".discussAllLastThink").hide();
                    } else {
                        var thinkStr = "";
                        for (var thinkNum = 0; thinkNum < realData.length; thinkNum++) {
                            var title = realData[thinkNum].questionName;
                            var exerciseId = realData[thinkNum].questionId;
                            var reviewNum = realData[thinkNum].reviewNum;
                            var pre = realData[thinkNum].preferNum;
                            var preStr = "";
                            if (pre == "0") {
                                preStr = "点赞";
                            } else {
                                preStr = talk.toWK(pre);
                            }
                            var reviewStr = "";
                            if (reviewNum == "0") {
                                reviewStr = "回答";
                            } else {
                                reviewStr = talk.toWK(reviewNum);
                            }
                            var selectClass = (realData[thinkNum].customerPrefer.preferNum == "0") ? "selected" : "";
                            var selectId = (realData[thinkNum].customerPrefer.preferNum == "0") ? realData[thinkNum].customerPrefer.id : "";
                            thinkStr += '<li class="clear" data-thinkId="' + exerciseId + '">' + '<div class="clear"><div class="discussThink">' + title + '</div><i class="icon-upMore ev-icon-upMore" style="display: none;"><span>展开</span></i></div>' + '<div class="clear discussAnswerS">' + '<div class="disscussFunction clear">' + '<div class="aswer" data-thinkId="' + exerciseId + '"><i></i><span>' + reviewStr + '</span></div>' + '<div class="praise" data-thinkId="' + exerciseId + '"><i data-praiseid=\"' + selectId + '\" class=\"' + selectClass + '\"></i><span>' + preStr + '</span></div>' + '</div>' + '</div>' + '</li>';
                        }
                        $(".discussAllLastThink").html(thinkStr);
                        course.partInThink();
                        talk.partInDiss();
                    }
                    break;
                case "collectCourse":
                    $(".courseColl-pc").attr("data-collectId", data.responseObject.responsePk);
                    break;
                default:
                    break;
            }
        },
        toggleExer: function (newtime, maxtime) {
            var currentTime = (parseInt(newtime) != 0) ? newtime : 0;
            if (currentTime != 0)
                $(".catalogIte").each(function () {
                    var isNowTime = parseInt($(this).attr("data-node"));
                    if (isNowTime < currentTime) {
                        $(this).addClass("read");
                    }
                    if (isNowTime > currentTime) {
                        $(this).prev().addClass("active");
                        return false;
                    }
                });
            $(".queite").each(function () {
                var isNowTime = parseInt($(this).attr("data-time"));
                if (isNowTime < maxtime) {
                    $(this).attr({"data-showed": "true"});
                }
                if (isNowTime < newtime) {
                    course.nowIndex = parseInt($(this).attr("data-nowqueindex"));
                    course.nowIndex++;
                }

            });

        },
        histroyOnOff: false,
        partInThink: function () {
            //对课后思考题的评论
            $(".discussAllLastThink  .aswer").each(function () {
                $(this).unbind("click").bind("click", function () {
                    commLog.creatEvent({
                        "id": 70,
                        "url": window.location.href,
                        "keyword": "课后题回复呼出讨论",
                        "browseType": "38"
                    });
                    var isThis = $(this);
                    course.judge(function () {
                        var options = {
                            container: isThis.parent(),
                            refId: course.courseId,
                            position: "after",
                            parentid: "0",
                            refBelongId: isThis.attr("data-thinkid"),
                            callBack: function () {

                            }
                        };
                        talk.about = "course";
                        talk.public(options);
                    }, true);
                })
            });
        },
        courseTest: function () {
            //在这里有一个开关，就是是否弹出过测试题，如果弹出过，则不再显示，
            var nowTime = Math.floor(course.video.currentTime());
            if (nowTime < course.catalogTimeIndex) {
                nowTime = course.catalogTimeIndex;
            }
            var topicObj = $("div[data-time=\'" + nowTime + "\']");
            var dialogOnOff = JSON.parse(topicObj.attr("data-showed")); //查看这个题目是否显示过，如果没显示过才会显示
            var testTargetObj = $(".course-main .hallTest_cont");
            var shadeObj = $(".hallTestVideoShade");
            var courseObj = $(".courseCont");
            if (!dialogOnOff) {
                commLog.createBrowse(76, '课程随堂测试', window.location.href)
                commLog.creatEvent({"id": 115, "url": window.location.href, "keyword": "课程随堂测试", "browseType": "38"});
                $(".singleSelectActive").removeClass("singleSelectActive");
                $(".answerAnalysisActive").removeClass("answerAnalysisActive");
                topicObj.addClass("singleSelectActive").attr({
                    "data-showed": "true"
                });
                course.dragNode = topicObj.attr("data-time");
                var collectState = (topicObj.attr("data-collect").length > 0) ? "active" : "";
                $(".hallTestTitle i").each(function () {
                    $(this).attr({"class": "collProblems " + collectState});
                    if ($(this).hasClass("active")) {
                        $(this).find("span").eq(1).html("已收藏");
                    } else {
                        $(this).find("span").eq(1).html("收藏题目");
                    }
                });
                if ($('.vjs-control').hasClass('vjs-playing')) {
                    $('.vjs-play-control').click();
                }
                var pausedOnOff = course.video.paused();
                if (pausedOnOff) {
                    var videoObj = $("#example_video_1");
                    var fullScreenOnOff = videoObj.hasClass("vjs-fullscreen");
                    if (fullScreenOnOff) {
                        course.showTest("full");
                        //course.keyEvent();
                        /*course.video.on("fullscreenchange",function(){
                         if(course.video.isFullScreen()){
                         course.showTest("full");
                         }else{
                         console.log("进入小屏")
                         course.showTest("small");
                         }
                         });*/
                        /*course.keyEvent();
                         $(".return_pc").unbind("click").bind("click", function () {
                         course.video.cancelFullScreen();
                         course.showTest("small");
                         });
                         $(".vjs-fullscreen-control").unbind("click").bind("click", function () {
                         course.video.cancelFullScreen();
                         course.showTest("small");
                         });

                         $(".hallTest_cont .Ev-jobSelectorCancel").unbind("click").bind("click", function () {
                         course.showTest("small");
                         });*/

                    } else {
                        course.showTest("small");
                        //course.keyEvent();
                        /*course.video.on("fullscreenchange",function(){
                         console.log(course.video.isFullScreen())
                         console.log(course.nowIndex)
                         if(course.video.isFullScreen()){
                         course.showTest("full");
                         console.log("进入全屏")
                         }else{

                         }
                         });
                         */

                        /*course.keyEvent();*/
                    }
                    courseObj.hide();
                    course.testAnswer();
                }
            } else {
                testTargetObj.hide();
                shadeObj.hide();
                courseObj.show();
            }

        },
        getNowTime: function () {
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
        testAnswer: function () {
            course.collect();//启动页面的所有收藏功能
            var dwrongData = {};
            var customerOption = "";
            var exerciseId = "";
            $(" .checkbox").each(function () {
                $(this).find(".queShitiOptions").each(function () {
                    $(this).unbind("click").bind("click", function () {
                        //$(this).toggleClass("selected");
                        var ansId = $(this).attr("data-ansid");
                        var optionS = $(" li[data-ansid=\'" + ansId + "\']");
                        optionS.toggleClass("selected");
                        var topicObj = $(" div[data-nowQueIndex=\'" + course.nowIndex + "\']");
                        var affirmObj = topicObj.find(".confirmBtn");
                        var ansObj = $("div[data-nowAnsIndex=\'" + course.nowIndex + "\']");
                        var goOnVideobj = $(".ev-continue");
                        var videoTestObj = $(".video-js .hallTest_cont");
                        var textShadeObj = $(".hallTestVideoText");
                        var lenOnOff = $(this).parent().parent().find(".selected").length > 0;
                        if (lenOnOff) {
                            affirmObj.addClass("activation").show();
                        } else {
                            affirmObj.removeClass("activation");
                        }
                        var toggleButtonOnOff = (topicObj.find(".selected").length > 0) ? true : false;
                        if (toggleButtonOnOff) {
                            affirmObj.addClass("activation").show();//多选题只是增加确认键效果，不走逻辑
                        } else {
                            affirmObj.removeClass("activation");
                        }
                        topicObj.each(function () {
                            var isThisTopic = $(this);
                            $(this).find(".activation").unbind("click").bind("click", function () {
                                // console.log(affirmObj.hasClass('activation'))
                                if (!affirmObj.hasClass('activation')) {
                                    return;
                                }
                                //topicObj
                                topicObj.each(function () {
                                    $(this).find(" .queShitiOptions").each(function () {
                                        // console.log($(this));
                                        $(this).unbind("click");
                                    });
                                });
                                var confirm = $(" div[data-nowQueIndex=\'" + course.nowIndex + "\']");
                                confirm.each(function () {
                                    $(this).find(".activation").hide().removeClass("activation");
                                });
                                var yoursStr = "";
                                var exerciseResult = true;
                                exerciseId = $(this).parent().attr("data-exerciseid");
                                isThisTopic.find(".hTestAnswer .queShitiOptions").each(function (i, ele) {
                                    var rightOnOff = JSON.parse($(this).attr("data-judge"));
                                    if (rightOnOff) {
                                        if (!$(this).hasClass("selected")) {
                                            $(this).unbind("click");
                                            exerciseResult = false;
                                        } else {
                                            customerOption += $(this).attr("data-ansid") + ",";
                                            var anstId = $(this).attr("data-ansid");
                                            var optiontS = $(" li[data-ansid=\'" + anstId + "\']");
                                            optiontS.each(function () {
                                                $(this).addClass("true").unbind("click");
                                            });
                                        }

                                    } else {
                                        if ($(this).hasClass("selected")) {
                                            //$(this).addClass("false");
                                            var anssId = $(this).attr("data-ansid");
                                            var optionsS = $(" li[data-ansid=\'" + anssId + "\']");
                                            optionsS.each(function () {
                                                $(this).addClass("false").unbind("click");
                                            });
                                            customerOption += $(this).attr("data-ansid") + ",";
                                            exerciseResult = false;
                                        } else {
                                            $(this).unbind("click");
                                        }
                                    }
                                });
                                isThisTopic.find(".hTestAnswer .selected").each(function () {
                                    yoursStr += $(this).attr("data-arrange");
                                });
                                topicObj.each(function () {
                                    $(this).attr({"data-status": exerciseResult});
                                });
                                isThisTopic.find(".queShitiOptions").each(function () {
                                    var lastRe = true;
                                    var onR = $(this).hasClass("true");
                                    var onW = $(this).hasClass("false");
                                    if (onR || onW) {
                                        lastRe = false;
                                    }
                                    if (lastRe) {
                                        $(this).addClass("forbid").find(".answerText").css("color", "#aeaeae");
                                    }
                                });
                                if (exerciseResult) {
                                    ansObj.find(".falseAswer").html("你的答案:" + yoursStr).removeClass("falseAswer").addClass("trueAswer");
                                    ansObj.addClass("answerAnalysisActive");
                                } else {
                                    ansObj.find(".falseAswer").html("你的答案:" + yoursStr);
                                    ansObj.addClass("answerAnalysisActive");

                                    //这个属性是用来判断该显示习题还是tab
                                }
                                goOnVideobj.unbind("click").bind("click",
                                    function () {
                                        if (!ansObj.hasClass('answerAnalysisActive')) {
                                            return;
                                        }
                                        commLog.creatEvent({
                                            "id": 115,
                                            "url": window.location.href,
                                            "keyword": "随堂测试继续观看",
                                            "browseType": "38"
                                        });
                                        course.video.play();
                                        videoTestObj.hide();
                                    });
                                isThisTopic.find(".queShitiOptions").each(function () {
                                    $(this).unbind("click").css({
                                        "cursor": "default"
                                    });
                                });
                                textShadeObj.attr({
                                    "data-toggle": "false"
                                });
                                $(".hallTestVideoShade").hide();
                                customerOption.substring(0, customerOption.length - 1);
                                var status = exerciseResult ? "1" : "0";
                                var iteamQue = [
                                    {
                                        "answerId": "0",
                                        "optionCorrect": topicObj.attr("data-rightop"),
                                        "customerOption": customerOption,
                                        "answerTime": course.getNowTime(),
                                        "exercisesId": topicObj.attr("data-exerciseid"),
                                        "status": status
                                    }
                                ];
                                customerOption = "";
                                var dRightData = {
                                    "customerId": loginAbout.login.status().userId,
                                    "exercisesList": JSON.stringify(iteamQue),
                                    "type": "10"
                                };
                                course.applyData("storeWrong", dRightData);//在题目答错的时候保存这一道错题
                                course.nowIndex++;
                            });
                        });
                    })
                });

            });
            $(" .singleSelect .queShitiOptions").each(function () {
                $(this).unbind("click").bind("click",
                    function () {
                        var topicObj = $("div[data-nowQueIndex=\'" + course.nowIndex + "\']");
                        var ansObj = $("div[data-nowAnsIndex=\'" + course.nowIndex + "\']");
                        var textShadeObj = $(".hallTestVideoText");
                        var goOnVideobj = $(".ev-continue");
                        var videoTestObj = $(".video-js .hallTest_cont");
                        var exerciseNum = topicObj.attr("data-nowqueindex");
                        var checkTypeOnOff = (topicObj.attr("data-type") == "多选") ? true : false;
                        var yoursStr = "";
                        var ansId = $(this).attr("data-ansid");
                        var optionS = $(" li[data-ansid=\'" + ansId + "\']");
                        customerOption = $(this).attr("data-ansid");
                        exerciseId = $(this).parent().parent().attr("data-exerciseid");
                        var exerciseResult = true;
                        yoursStr = $(this).attr("data-arrange");
                        exerciseResult = JSON.parse($(this).attr("data-judge")); //用来判断对错
                        topicObj.attr({"data-status": exerciseResult});
                        if (exerciseResult) {
                            $(this).addClass("true");
                            optionS.addClass("true").unbind("click");
                            ansObj.find(".falseAswer").html("你的答案:" + yoursStr).removeClass("falseAswer").addClass("trueAswer");

                        } else {
                            $(this).addClass("false");
                            optionS.addClass("false").unbind("click");
                            ansObj.find(".falseAswer").html("你的答案:" + yoursStr);
                            dwrongData = {
                                "customerId": loginAbout.login.status().userId,
                                "exercisesId": exerciseId,
                                "type": "2",
                                "customerOption": customerOption
                            };
                            //course.applyData("storeWrong",dwrongData);//在题目答错的时候保存这一道错题
                        }

                        ansObj.addClass("answerAnalysisActive");
                        goOnVideobj.unbind("click").bind("click",
                            function () {
                                if (!ansObj.hasClass('answerAnalysisActive')) {
                                    return;
                                }
                                commLog.creatEvent({
                                    "id": 115,
                                    "url": window.location.href,
                                    "keyword": "随堂测试继续观看",
                                    "browseType": "38"
                                });
                                course.video.play();
                                videoTestObj.hide();
                            });
                        topicObj.find(".queShitiOptions").each(function () {
                            $(this).unbind("click").css({
                                "cursor": "default"
                            });
                        });
                        topicObj.find(".queShitiOptions").each(function () {
                            var lastRe = true;
                            var onR = $(this).hasClass("true");
                            var onW = $(this).hasClass("false");
                            if (onR || onW) {
                                lastRe = false;
                            }
                            if (lastRe) {
                                $(this).addClass("forbid").find(".answerText").css("color", "#aeaeae");
                            }
                        });
                        $(".hallTestVideoShade").hide();
                        textShadeObj.attr({
                            "data-toggle": "false"
                        }); //这个属性是用来判断该显示习题还是tab
                        var status = exerciseResult ? "1" : "0";
                        var iteamQue = [
                            {
                                "answerId": "0",
                                "optionCorrect": topicObj.attr("data-rightop"),
                                "customerOption": customerOption,
                                "answerTime": course.getNowTime(),
                                "exercisesId": topicObj.attr("data-exerciseid"),
                                "status": status
                            }
                        ];
                        customerOption = "";
                        var dRightData = {
                            "customerId": loginAbout.login.status().userId,
                            "exercisesList": JSON.stringify(iteamQue),
                            "type": "10"
                        };
                        course.applyData("storeWrong", dRightData);//在题目答错的时候保存这一道错题
                        course.nowIndex++;
                    });

            });
        },
        keyEvent: function () {
            var ansObj = $(".video-js div[data-nowAnsIndex=\'" + course.nowIndex + "\']");
            var testTargetObj = $(".course-main .hallTest_cont");
            var courseObj = $(".courseCont");
            var shadeObj = $(".hallTestVideoShade");
            var pausedOnOff = course.video.paused();
            /*//在暂停，按下按键的时候出发题目挪动
             course.video.on('fullscreenchange',function () {
             if ( pausedOnOff) {
             var videoObj = $("#example_video_1");
             var fullScreenOnOff = videoObj.hasClass("vjs-fullscreen");
             if (fullScreenOnOff) {
             course.showTest("full");
             } else {
             course.showTest("small");

             }
             }
             });*/
            /*$(document).keyup(function (event) {
             var appendOnOff = event.keyCode == 19 ||event.keyCode == 27  ;
             var ansOnOff = ansObj.css("display") == "block";
             if (appendOnOff && pausedOnOff) {
             var videoObj = $("#example_video_1");
             var fullScreenOnOff = videoObj.hasClass("vjs-fullscreen");
             if (fullScreenOnOff) {
             course.showTest("full");
             } else {
             course.showTest("small");

             }
             }
             });*/
            if (loginAbout.login.status().state) {
                course.video.on("fullscreenchange", function () {
                    var onTestOnOff = false;
                    $(".singleSelectActive").each(function () {
                        if ($(this).css("display") == "block") {
                            //console.log(parseInt($(this).attr("data-time"))+":::::;;;;;;"+course.video.currentTime())
                            if(parseInt($(this).attr("data-time"))===parseInt(course.video.currentTime())){
                                onTestOnOff = true;
                            }
                        }
                    });
                    //console.log((!pausedOnOff))
                    //console.log(onTestOnOff)
                    if ((!pausedOnOff) && onTestOnOff) {
                        //console.log("全屏"+course.video.isFullScreen())
                        if (course.video.isFullScreen()) {
                            //console.log("进入大屏");
                            course.showTest("full");
                        } else {
                            //console.log("进入小屏")
                            course.showTest("small");
                        }
                    }

                });
            }
        },
        showTest: function (type) {
            var testTargetObj = $(".course-main .hallTest_cont");
            var videoTestObj = $(".video-js .hallTest_cont");
            var shadeObj = $(".hallTestVideoShade");
            var courseObj = $(".course-main");
            switch (type) {
                case "full":
                    videoTestObj.show();
                    testTargetObj.hide();
                    $(".return_pc").unbind("click").bind("click", function () {
                        course.video.cancelFullScreen();
                    });
                    if ($(".singleSelectActive").attr("data-status") == "none") {
                        shadeObj.show();
                    }

                    break;
                case "small":
                    videoTestObj.hide();
                    testTargetObj.show();
                    if ($(".singleSelectActive").attr("data-status") == "none") {
                        shadeObj.show();
                    }
                    courseObj.removeClass("course-main-fixed");
                    break;
                default:
                    break;
            }
        },
        courseTap: function () {
            $(".courseBLock").css({
                display: "none"
            }).eq(0).css({
                display: "block"
            });

            $(".course-tab li").unbind("click").bind("click",
                function () {
                    var introObj = $(".synopsisFooter");
                    var nowScrollObj = $(".discuss-content .discussAllList");
                    var index = $(this).index();
                    $('.course-tab li p').removeClass("course-active");
                    $(this).find('p').addClass("course-active");
                    var recommendObj = $(".recommendContainer");
                    switch (index) {
                        case 0:
                            nowScrollObj.attr("scrollPagination", "disabled");
                            introObj.show();
                            recommendObj.hide();
                            break;
                        case 1:
                            nowScrollObj.attr("scrollPagination", "disabled");
                            introObj.hide();
                            recommendObj.show();
                            break;
                        case 2:
                            if (nowScrollObj.attr("data-page")) {
                                talk.scrollPage($(".discuss-content .discussAllList"));
                            }
                            nowScrollObj.attr("scrollPagination", "enabled");
                            introObj.hide();
                            recommendObj.hide();
                            break;
                    }
                    if (index == 2) {
                        if (nowScrollObj.attr("data-page")) {
                            talk.scrollPage($(".discuss-content .discussAllList"));
                        }
                    } else {
                        nowScrollObj.attr("scrollPagination", "disabled");
                    }
                    $(".courseBLock").css({
                        display: "none"
                    }).eq(index).css({
                        display: "block"
                    });
                })
        },
        judge: function (callBack, ap) {
            var approveInfo = JSON.parse(localStorage.getItem('approveInfo'));
            if (localStorage.getItem('userId')) {
                if (approveInfo.state == '1' || approveInfo.state == '2') {
                    callBack && callBack();
                } else {
                    if (ap) {
                        $(".yd-confirmModalMask.yd-alertModalMask").remove();
                        if ($('.vjs-control').hasClass('vjs-playing')) {
                            $('.vjs-play-control').click();
                        }
                        if (approveInfo.state == "0" || approveInfo.state == "4") {
                            comm.alertBox({
                                "title": "很抱歉！我们正在加紧审核您的认证信息，请耐心等待...",
                                "ensure": "好的",
                                "ensureCallback": function () {
                                }
                            });
                        } else {
                            if ($('.authentication-out').length == 0) {
                                if (approveInfo.state == "3") {
                                    authentication.init({
                                        type: "trigger",
                                        "success": function () {
                                            authentication.exit();
                                            location.reload();//刷新页面
                                        }, reload: true
                                    })
                                } else {
                                    comm.confirmBox({
                                        "content": "认证后才能参与课程讨论</br>快去认证，获取完整权限",
                                        "cancel": "暂不认证",
                                        "ensure": "去认证",
                                        "ensureCallback": function () {
                                            commLog.creatEvent({
                                                "id": 15,
                                                "url": window.location.href,
                                                "keyword": "去认证",
                                                "browseType": "38"
                                            });
                                            authentication.init({
                                                type: 'trigger',
                                                "success": function () {
                                                    authentication.exit();
                                                    location.reload();//刷新页面
                                                }, reload: true
                                            })
                                        },
                                        "cancelCallback": function () {
                                            commLog.creatEvent({
                                                "id": 16,
                                                "url": window.location.href,
                                                "keyword": "暂不认证",
                                                "browseType": "38"
                                            });
                                            $(".value").remove();
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                localStorage.setItem("unActive", "1");
                if ($('.vjs-control').hasClass('vjs-playing')) {
                    $('.vjs-play-control').click();
                }
                loginAbout.login.show({
                        "success": function () {
                            if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                                location.reload();//刷新页面
                            }
                            loginAbout.changeHead();
                            course.baseInfo();
                            course.talkInit();
                            course.histortinit();
                            if (ap) {
                                if ($('.vjs-control').hasClass('vjs-playing')) {
                                    $('.vjs-play-control').click();
                                }
                                authentication.init({
                                    type: "trigger",
                                    "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                })
                            }

                        }
                    }
                );
            }
        },
        "discussLineId": null,
        share: function () {
            var postData = {
                "sceneType": "3",
                "resourceType": "3",
                "refId": course.courseId,
                "visitSiteId": "13",
                "shareSence": "3"
            };
            postData = {paramJson: $.toJSON(postData)};
            $.ajax({
                url: "//www.yi-ding.net.cn/call/yiding/comm/data/share/getMapList/",
                //请求的url地址
                dataType: "json",
                //返回格式为json
                async: true,
                //请求是否异步，默认为异步，这也是ajax重要特性
                data: postData,
                //参数值
                type: "GET",
                //请求方式
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (req) {
                    //请求成功时处理
                    comm.loading.hide();
                    if (req.responseObject.responseStatus) {
                        var imgUrl = req.responseObject.responseData.data_list[0].share_channel[0].shareImageUrl;
                        var h5Url = req.responseObject.responseData.data_list[0].share_channel[0].shareUrl;
                        var qqZoneTitle = req.responseObject.responseData.data_list[0].share_channel[2].shareTitle;
                        var qqTitle = req.responseObject.responseData.data_list[0].share_channel[3].shareTitle;
                        var sinaTitle = req.responseObject.responseData.data_list[0].share_channel[4].shareTitle;
                        var qqZoneSummary = req.responseObject.responseData.data_list[0].share_channel[2].shareDesc;
                        var sinaSummary = req.responseObject.responseData.data_list[0].share_channel[4].shareDesc;
                        var qqSummary = req.responseObject.responseData.data_list[0].share_channel[3].shareDesc;
                        var optionShare = {};
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
                        if (imgUrl.length > 0) {
                            optionShare = {
                                container:$(".al-rightNav"),//存放分享组件的父级
                                type:6,//默认为1  1：社交分享  2：页面左下角全站分享,3.终端页面的固定分享,4.终端评论区分享，消息的评论我的，只分享到唯医朋友圈, 5:直播分享 ，6:自定义dom结构
                                hrefTemplate:hrefStr,//自定义dom结构
                                h5Url:h5Url,//微信分享生成二维码的链接
                                shareTrend:0,//0:不需要站内动态分享  1：需要站内动态分享
                                url: h5Url,
                                qqTitle: qqTitle,
                                qqZoneSummary: qqZoneSummary,
                                sinaTitle: sinaTitle + "" + sinaSummary,
                                sinaSummary: sinaTitle + "" + sinaSummary,
                                qqZoneTitle: qqZoneTitle,
                                qqSummary: qqSummary,
                                hasH5: true,
                                pic: imgUrl,
                                shareQQSuc: function () {
                                    //qq分享成功回调
                                    commLog.creatEvent({"id":102,"url":window.location.href,"keyword":"QQ分享"});
                                },
                                shareQzoneSuc: function () {
                                    //qq空间分享成功回调
                                    commLog.creatEvent({"id":103,"url":window.location.href,"keyword":"QQ空间分享"});
                                },
                                shareSinaSuc: function () {
                                    //微博分享成功回调
                                    commLog.creatEvent({"id":104,"url":window.location.href,"keyword":"微博分享"});
                                },
                                shareWeixinSuc:function(){
                                    //微信分享成功回调
                                    commLog.creatEvent({"id":100,"url":window.location.href,"keyword":"微信分享"});
                                }
                            }
                        } else {
                            optionShare = {
                                container:$(".al-rightNav"),//存放分享组件的父级
                                type:6,//默认为1  1：社交分享  2：页面左下角全站分享,3.终端页面的固定分享,4.终端评论区分享，消息的评论我的，只分享到唯医朋友圈, 5:直播分享 ，6:自定义dom结构
                                hrefTemplate:hrefStr,//自定义dom结构
                                h5Url:h5Url,//微信分享生成二维码的链接
                                shareTrend:0,//0:不需要站内动态分享  1：需要站内动态分享
                                url: h5Url,
                                qqTitle: qqTitle,
                                qqZoneSummary: qqZoneSummary,
                                sinaTitle: sinaTitle + "" + sinaSummary,
                                sinaSummary: sinaTitle + "" + sinaSummary,
                                qqZoneTitle: qqZoneTitle,
                                qqSummary: qqSummary,
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
                                }
                            }
                        }


                        //var share = new ShareAll(optionShare);
                        pcShare(optionShare)
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
        changeVideo: function () {
            $(".playIcon").each(function () {
                $(this).unbind("click").bind("click",
                    function () {
                        var indexNum = $(this).parents('ul li').index() + 1;
                        commLog.creatEvent({
                            "id": 75,
                            "url": window.location.href,
                            "keyword": "课程推荐",
                            "browseType": "38",
                            "trackLocation": indexNum
                        });
                        var url = $(this).attr("data-videourl");
                        if ($(this).next().hasClass("lucency")) {
                            window.location.href = "https://" + url + '?sourceType=38';
                        } else {
                            window.open("" + url + '?sourceType=38');
                        }
                    });
            });
        },
        videotimer: null,
        postVideoTime: function () {
            var finishOnOff = "0";
            if (loginAbout.login.status().state) {
                course.videotimer = setInterval(function () {
                        var maxPlayTime;
                        if (Math.floor(course.videoTime) > course.maxTime) {
                            maxPlayTime = Math.floor(course.videoTime)
                        } else {
                            maxPlayTime = course.maxTime;
                        }
                        var courseName = $('.course-head .yd_c_bg .width92 p').text();
                        var videoTimeData = {
                            "customerId": loginAbout.login.status().userId,
                            "courseId": course.courseId,
                            // "courseName": courseName,
                            "courseName": '',
                            "videoId": course.videoId,
                            "typeId": "1",
                            "isFinish": finishOnOff,
                            "playTime": Math.floor(course.videoTime),
                            "isValid": "1",
                            "visitSiteId": "13",
                            "maxPlayTime": maxPlayTime,
                            "maxIsFinish": finishOnOff
                        };
                        videoTimeData = {
                            "paramJson": $.toJSON(videoTimeData)
                        };
                        $.ajax({
                            url: "//www.yi-ding.net.cn/call/customer/video/play/create/",
                            //请求的url地址
                            dataType: "json",
                            //返回格式为json
                            async: true,
                            //请求是否异步，默认为异步，这也是ajax重要特性
                            data: videoTimeData,
                            //参数值
                            type: "POST",
                            //请求方式
                            beforeSend: function () {
                                //请求前的处理
                            },
                            success: function (req) {
                                //请求成功时处理
                            },
                            complete: function () {
                                //请求完成的处理
                            },
                            error: function () {
                                //请求出错处理
                            }
                        });
                    },
                    180000);
            }

        },
        dragNode: null,
        applyData: function (type, data) {
            var postData = {paramJson: $.toJSON(data)};
            var postType = "POST";
            var postPort = "";
            switch (type) {
                case "point":
                    postPort = '//www.yi-ding.net.cn/call/cms/series/course/baseinfo/getMapById/';
                    break;
                case "partInCourse":
                    postPort = '//www.yi-ding.net.cn/call/yiding/customer/join/create/';
                    break;
                case "recommend":
                    postPort = '//www.yi-ding.net.cn/call/recommend/resource/item/getMapList/';
                    break;
                case "classThink":
                    postPort = '//www.yi-ding.net.cn/call/cms/series/course/question/getMapList/';
                    break;
                case "disscuss":
                    postPort = '//www.yi-ding.net.cn/call/customer/review/json_list/';
                    break;
                case "collectCourse":
                    postPort = '//www.yi-ding.net.cn/call/customer/collection/create/';
                    break;
                case "deleteCourse":
                    postPort = '//www.yi-ding.net.cn/call/customer/collection/delete/';
                    break;
                case "disscussLine":
                    postPort = "//www.yi-ding.net.cn/call/customer/review/json_list/";
                    break;
                case "storeWrong":
                    postPort = "//www.yi-ding.net.cn/call/customer/exercises/updateResult/";
                    break;
                case "histroyTime":
                    postPort = "//www.yi-ding.net.cn/call/customer/video/play/getTimeByCustomer/";
                    break;
                case "courseStudy":
                    postPort = "//www.yi-ding.net.cn/call/customer/exercises/position/create/";
                    break;
                default:
                    break;

            }
            $.ajax({
                url: postPort,
                //请求的url地址
                dataType: "json",
                //返回格式为json
                async: true,
                //请求是否异步，默认为异步，这也是ajax重要特性
                data: postData,
                //参数值
                type: postType,
                //请求方式
                beforeSend: function () {
                    //请求前的处理
                    comm.loading.show();
                },
                success: function (req) {
                    //请求成功时处理
                    comm.loading.hide();
                    course.manageData(type, req);

                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        },
        videoDuringTime: null,
        secondVideoTime: null,
        videoId: null,
        courseId: $("#course-main").attr("data-courseId"),
        "videoTime": "",
        "video": null,
        "discuss": {},
        "test": {},
        smallScreen: function () {
            if (course.browserVerinfoNum != 'msie,8.0') {

                $(document).unbind("scroll").bind("scroll", function () {
                    var isChange = $(".course-video").data("isChange");
                    var videoContainer = $(".course-video");
                    var courseObj = $(".course-main");
                    var topH = $("#al-headerTopNav").innerHeight();
                    var scrollH = $(window).scrollTop();
                    if (scrollH >= topH) {
                        $("#toTop").fadeIn(500); //淡入淡出效果
                    } else {
                        $("#toTop").fadeOut(500);
                    }
                    if (!comm.browser.msie) {
                        var sH = videoContainer.offset().top;
                        if ($(document).scrollTop() > 150) {
                            if ($('.course-video .courseVideoPupop').length > 0) {
                                $('.course-video .courseVideoPupop').hide();
                            }
                            videoContainer.addClass("course-video-fixed");
                            courseObj.addClass("course-main-fixed");
                            $("#example_video_1").css({"height": "194px", "width": "344px"});
                            $(".vjs-control-bar").hide();
                        } else {
                            if ($('.course-video .courseVideoPupop').length > 0) {
                                $('.course-video .courseVideoPupop').show();
                            }
                            $(".vjs-control-bar").show();
                            videoContainer.removeClass("course-video-fixed")
                            $("#example_video_1").css({"height": "422px", "width": "750px"});

                        }
                    }

                });
            }
        },
        "removeHead": function () {
            $(".al-headerTopNav").html("");
            $(".al-mainSidebarList .active").each(function () {
                $(this).removeClass("active");
            });
        },
        "dotConfig": {},
        catalogTimeIndex: 0,
        "videoFn": {
            nowTime: 0,
            "videoFaceInit": function () {
                $videoPanelMenu = $(".vjs-fullscreen-control");
                $videoPanelVolume = $(".vjs-play-control");
                $videoSign = $(".vjs-progress-holder");
                $allPlayTime = $(".vjs-remaining-time");
                $(".vjs-current-time").show();
                $videoPanelMenu.after("<div class=\'vjs-subtitles-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-button-sharpness\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' style=\"display:block;\" aria-haspopup=\'true\' aria-label=\'sharpness\' aria-pressed=\'true\'>" + "<span class=\'vjs-control-text\'>清晰度</span>" + "<div class=\'vjs-menu\' style=\'z-index:2\'>" + "<ul class=\'vjs-menu-content\'>" + "<li class=\'vjs-menu-item vjs-selected vjs-menu-hd\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' aria-selected=\'true\'>高清" + "<span class=\'vjs-control-text\'></span>" + "</li>" + "<li class=\'vjs-menu-item vjs-menu-hd\' tabindex=\'0\' role=\'button\' type=\'button\' aria-live=\'polite\' aria-selected=\'false\'>标清" + "<span class=\'vjs-control-text\'></span>" + "</li></ul>" + "</div>" + "</div>");
                if ($videoSign.find(".videoSign").length == 0) {
                    $videoSign.append("<section class=\'videoSign\'>答题马上开始</section>");
                }

            },
            "showDot": function () {
                var liStr = '<ul class="line-list" style="z-index: 10;">';
                var lineWidth = "";
                if (course.dotConfig.width.split(":").length == 3) {
                    lineWidth = parseInt(parseInt(course.dotConfig.width.split(":")[0]) * 3600) + parseInt(parseInt(course.dotConfig.width.split(":")[1]) * 60) + parseInt(parseInt(course.dotConfig.width.split(":")[2]) * 1);
                } else if (course.dotConfig.width.split(":").length == 2) {
                    lineWidth = parseInt(parseInt(course.dotConfig.width.split(":")[0]) * 60) + parseInt(parseInt(course.dotConfig.width.split(":")[1]) * 1);
                } else {
                    lineWidth = parseInt(parseInt(course.dotConfig.width.split(":")[0]) * 1);
                }

                for (var liNum = 0; liNum < course.dotConfig.list.length; liNum++) {
                    /*显示视频断点*/
                    var leftPer = course.dotConfig.list[liNum].iteam / lineWidth * 100;
                    if (leftPer >= 100) {
                        leftPer = 99;
                    }
                    if (leftPer < 0) {
                        leftPer = 0.5;
                    }
                    liStr += "<li class='line-list-iteam' style='left:" + leftPer + "%'></li>";
                }
                liStr += "</ul>";
                var controlBar = $(".vjs-progress-holder");
                if (controlBar.find(".line-list").length == 0) {
                    controlBar.append(liStr);
                }

            },
            "showSubway": function () {
                var subWayStr = "<ul>";
                var questionStr = "";
                for (var liNum = 0; liNum < course.dotConfig.list.length; liNum++) {
                    var subNum = liNum % 2;
                    var subName = course.dotConfig.list[liNum].courseNodeName;
                    var subId = course.dotConfig.list[liNum].courseNodeId;
                    var subTime = course.dotConfig.list[liNum].iteam;
                    var lastIteam = course.dotConfig.list.length - 1;
                    /*显示目录地铁图*/
                    if (subNum == 0) {
                        if (liNum == 0) {
                            subWayStr += "<li class=\'single first catalogIte\' data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        } else if (liNum == lastIteam) {
                            if (liNum == 0) {
                                subWayStr += "<li class=\'single last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                            } else {
                                subWayStr += "<li class=\'single last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                            }
                        } else {
                            subWayStr += "<li class=\'single catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        }
                    } else {
                        if (liNum == lastIteam) {
                            subWayStr += "<li class=\'double last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        } else {
                            subWayStr += "<li class=\'double catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + course.dotConfig.list[liNum].iteam + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        }
                    }
                }
                subWayStr += "</ul>";
                var fullScreenStr = "<aside class=\"continue-look ev-continue\">" +
                    "<span>继续观看</span>" +
                    "</aside>";
                var fullScreenHd = "<section class=\"pcModule return_pc\">" +
                    "        <i></i><span class=\"text\">退出全屏</span>" +
                    "    </section>";
                var courseObj = $(".hallTest_cont .hallTestTitle");
                var videoObj = $(".video-js");
                var topicObj = $("div[data-nowQueIndex=\'" + course.nowIndex + "\']");
                topicObj.addClass("singleSelectActive"); //.attr({"data-showed":"false"});//首次加载时没有显示过的
                $(".catalog-content").html(subWayStr);
                $('.catalog-content .catalogIte').each(function () {
                    $(this).unbind("click").bind("click",
                        function () {
                            if (course.historyIsfinish == 1) {
                                course.catalogTimeIndex = $(this).attr('data-node');
                                course.video.currentTime($(this).attr('data-node'));
                                if ($('.vjs-control').hasClass('vjs-playing')) {
                                    course.courseLook(0, course.videoInit);
                                }
                                course.videoInit = Math.floor(course.videoTime);
                            }
                        })
                })
                videoObj.append($(".hallTestVideoShade"));
                videoObj.append($(".hallTest_cont").clone());
                videoObj.find(".hallTest_cont").append(fullScreenStr).find(".width92").before(fullScreenHd);
            },
            changeHSVideo: function () {
                var hdUrl = $(".course-video").attr("data-videoHD");
                var sdUrl = $(".course-video").attr("data-videoSD");
                var index = course.video;
                var nowTime = index.currentTime();
                var type = "video/mp4";
                $(".vjs-menu-item").each(function () {
                    $(this).unbind("click").bind("click",
                        function () {
                            var hdStr = $(this).text();
                            $(".vjs-menu-item").removeClass("vjs-selected");
                            $(this).addClass("vjs-selected");
                            var hdOnOff = (hdStr == "高清") ? true : false;
                            if (hdOnOff) {
                                commLog.creatEvent({
                                    "id": 187,
                                    "url": window.location.href,
                                    "keyword": "课程终端页-高清",
                                    "browseType": "38"
                                });
                                index.src({
                                    type: type,
                                    src: hdUrl
                                });

                            } else {
                                commLog.creatEvent({
                                    "id": 188,
                                    "url": window.location.href,
                                    "keyword": "课程终端页-标清",
                                    "browseType": "38"
                                });
                                index.src({
                                    type: type,
                                    src: sdUrl
                                });
                            }
                            course.video.currentTime(nowTime);
                        })
                });
            },
            operate: function (checkTime) {
                for (var timeNum = 0; timeNum < course.dotConfig.list.length; timeNum++) {
                    var setTime = course.dotConfig.list[timeNum].iteam;
                    var beTime = (setTime <= checkTime) ? true : false;
                    var beQurTime = (setTime == checkTime) ? true : false;
                    var catalogObj = $(".catalog-content");
                    var videoSignObj = $(".videoSign");
                    if (loginAbout.login.status().state) {
                        for (var i = 0; i < course.dotConfig.list.length; i++) {
                            var videoSignTime = (course.dotConfig.list[i].iteam == checkTime + 5) ? true : false;
                            if (videoSignTime) {
                                if (course.dotConfig.list[i].proFun) {
                                    var showedOnOff = JSON.parse($("div[data-time=\'" + course.dotConfig.list[i].iteam + "\']").attr("data-showed"));
                                    if (!showedOnOff) {
                                        var sideBarObj = $(".video-js");
                                        videoSignObj.fadeIn(400,
                                            function () {
                                                //sideBarObj.removeClass("vjs-user-inactive").addClass("vjs-user-active")
                                                course.video.trigger("mousemove");
                                            }).delay(1000).fadeOut(400,
                                            function () {
                                                //sideBarObj.removeClass("vjs-user-active").addClass("vjs-user-inactive");
                                            });


                                    }
                                }

                            }
                        }
                    }
                    catalogObj.find("ul .active").addClass("active");
                    catalogObj.find("ul .catalogText").css({
                        "color": "#909090"
                    })
                    if (course.historyIsfinish == 1) {
                        for (var i = 0; i < catalogObj.find("ul .catalogText").length; i++) {
                            catalogObj.find("ul .catalogText").eq(i).css({
                                "color": "#333"
                            })
                        }
                    }
                    catalogObj.find("ul .read").removeClass("read"); //首先将所有的read制空，然后点亮新的read
                    for (var i = 0; i < catalogObj.find("ul li").length; i++) {
                        if (catalogObj.find("ul li").eq(i).attr('data-node') <= course.maxTime)
                            catalogObj.find("ul .catalogText").eq(i).css({
                                "color": "#333"
                            })
                    }
                    catalogObj.find("[data-node='" + setTime + "']").removeClass("active");
                    if (beTime) {
                        //点亮新的read
                        //course.dragNode = parseInt(catalogObj.find("[data-node='" + setTime + "']").next().attr("data-node"));
                        for (var catalogNum = 0; catalogNum < catalogObj.find(".catalogIte").length; catalogNum++) {
                            if (catalogObj.find(".catalogIte").eq(catalogNum).attr('data-node') < checkTime) {
                                if (catalogNum == 0) {
                                    catalogObj.find(".catalogIte").eq(catalogNum).addClass("read");
                                } else {
                                    if (catalogObj.find(".catalogIte").eq(catalogNum - 1).hasClass('read')) {
                                        catalogObj.find(".catalogIte").eq(catalogNum).addClass("read");
                                    }
                                }
                                // catalogObj.find(".catalogIte").eq(catalogNum).addClass("read");
                                catalogObj.find(".catalogIte").eq(catalogNum).removeClass("active");
                                for (var i = 0; i < catalogObj.find("ul li").length; i++) {
                                    if (catalogObj.find("ul li").eq(i).attr('data-node') <= course.maxTime)
                                        catalogObj.find("ul .catalogText").eq(i).css({
                                            "color": "#333"
                                        })
                                }
                            }
                            // var breakOnOff = catalogObj.find(".catalogIte").eq(catalogNum).hasClass("read");
                            if (catalogObj.find(".catalogIte").eq(catalogNum).attr('data-node') == checkTime) {
                                if (loginAbout.login.status().state) {
                                    course.dotConfig.list[catalogNum].proFun && course.dotConfig.list[catalogNum].proFun();
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
            },
        },
        nowIndex: 0,
        "swipe": function (container, containerImg, Imgwidth, containerLi, height) {
            var nn = containerLi.length - 3;
            var containerParent = container.parent();
            var slider = ' <figure class="slide">' +
                '                                <i class="slideLeft"></i>' +
                '                                <i class="slideRight"></i>' +
                '                            </figure>';
            containerParent.prepend(slider);
            container.css({
                position: "relative",
                height: height,
            })
            containerImg.css({
                position: "absolute",
            })
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
            }
        }
    };
    course.init();
});