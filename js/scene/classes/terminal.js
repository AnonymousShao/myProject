/**
 * Created by ALLIN on 2017/4/18.
 */
$(document).ready(function () {
    var terminal = {
        "authority": {
            loginOnOff: localStorage.getItem('userId'),
            auState: (localStorage.getItem('approveInfo')) ? parseInt(JSON.parse(localStorage.getItem('approveInfo')).state) : -1
        },
        parameter: {
            "courseId": $("#course-main").attr("data-courseId"),
            pointData: {},
            seriesId: null,
            videoId: null,
            videoPlayTime: null,
            joinInfo: {},
            nextMap: {},
            historyTime: [],
            playTime: [],
            video: null,
            maxTime: 0,
            finishOnOff: 0,
            exerciseData: [{"state": "none", customerOptions: ""}],
            playOnOff: false,
            pauseTime: 0,
            articulation:{HD:"高清",SD:"标清"}
        },
        ele: {
            "courseWare": $(".classDown .maxWidth li"),
            "tab": $(".course-tab li"),
            "videoBox": $(".course-video"),
            "subWay": $(".catalog-content"),
            "afterClass": $(".discussAllLastThink"),
            "askCourse": $(".coursePc-coll"),
            collect: $(".courseColl-pc"),
            "testContainer": $(".hallTest_cont .width92"),
            "courseCtn": $(".courseCont"),
            "lastThink": $(".classThink .thinkList"),
            "nextClass": $(".courseThinkNext")
        },
        courseAbstract: function () { //点击展开收缩
            var t = this;
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
            return t;
        },
        manageData: {
            applyData: function (options) {
                var t = terminal;
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
                return t;
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
            analysisPoint: function (data, cb) {
                var t = terminal;
                var itemData = data.responseObject.responseData.data_list[0];
                t.parameter.seriesId = itemData.seriesId;
                t.parameter.videoId = itemData.videoId;
                t.parameter.videoPlayTime = itemData.videoPlayTime;
                t.parameter.joinInfo = itemData.seriesJoin;
                t.parameter.nextMap = itemData.nextMap;
                t.parameter.pointData = itemData.courseNodeList;
                cb && cb();
                return t;
            }
        },
        tab: function () {
            var t = this;
            $(".courseBLock").css({
                display: "none"
            }).eq(0).css({
                display: "block"
            });
            $('.al-search').off('click').on('click', function () {
                commLog.creatEvent({"id": 33, "url": window.location.href, "keyword": "课程终端点击搜索", "browseType": "38"});
            });
            t.ele.tab.unbind("click").bind("click", function () {
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
            });
            return t;
        },
        changeRecommend: function () {
            var t = this;
            t.ele.courseWare.length > 3 ? t.swipe($(".classDown"), $(".classDown .clear"), $(".classDown .downIcon")[0].clientWidth + 'px', $(".classDown .clear li"), "247px") : "";
            return t;
        },
        swipe: function (container, containerImg, Imgwidth, containerLi, height) {
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
            });
            containerImg.css({
                position: "absolute",
            });
            if (containerLi.length > 3) {
                container.siblings('.slide').find('.slideLeft').on('mouseover', function () {
                    $(this).addClass('activation');
                });
                container.siblings('.slide').find('.slideLeft').on('mouseout', function () {
                    $(this).removeClass('activation');
                });
                container.siblings('.slide').find('.slideRight').on('mouseover', function () {
                    $(this).addClass('activation');
                });
                container.siblings('.slide').find('.slideRight').on('mouseout', function () {
                    $(this).removeClass('activation');
                });
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
        },
        initDot: function () {
            var t = terminal;
            t.ele.subWay.html(t.template.subway());
            if(t.authority.loginOnOff){
                $(".catalogIte").on("click",function(){
                    t.parameter.video.player.currentTime($(this).attr("data-node"));
                });
            }

            return t;
        },
        videoInit: function (options) {
            var t = terminal;
            var player2 = null;
            var nodeArr = [];
            console.log(t.parameter.pointData)
            $.each(t.parameter.pointData, function (index) {
                nodeArr[index] = {time: parseInt(this.courseNodeTime)};
            });
            player2 = new AllinmdPlayer('example_video_2', {
                width: 750,
                height: 422,
                controls: true,
                autoplay: true,
                //播放之前需要放置的海报图片
                poster: "",
                //IE8下使用的swf地址
                flash: {
                    swf: '/js/third-party/videojs-allinmd/allinmdplayer.swf'
                }, //需要使用的插件，清晰度切换  (videoJsResolutionSwitcher)，关键点显示(progress)
                plugins: {
                    videoJsResolutionSwitcher: {"default": 'high', dynamicLabel: "true"},
                    progress: nodeArr
                },
                limitPlayTime: {
                    allow: ((t.authority.auState == 1) || (t.authority.auState == 2)) ? false : true,
                    value: ((t.authority.auState == 1) || (t.authority.auState == 2)) ? 1 : 80
                },//设置允许最大的快进时长，用于限制用户拖拽至不允许播放的时间点，使用时需保证allow值为true
                setMaxPlayTime: {
                    allow: options.setOnOff,
                    value: options.dragNode
                }
            }, function () {

                player2.player.updateSrc([
                    {
                        src: t.ele.videoBox.attr("data-videosd"),
                        type: 'video/mp4',
                        label: '标清',
                        res: 360
                    },
                    {
                        src: t.ele.videoBox.attr("data-videoHD"),
                        type: 'video/mp4',
                        label: '高清',
                        res: 720
                    }
                ]);
                player2.player.currentTime(options.nowTime);//初始化设置冲突，不能放在清晰度上面
                player2.player.on(player2.EVENT_TYPE.LIMIT_EVENT, function () {
                    //console.log("触发三分钟事件");
                    t.parameter.video = player2;
                    t.threeFn();
                });
                player2.player.on(player2.EVENT_TYPE.MAX_PLAY_TIME_EVENT, function () {
                    player2.ModalDialog(false, "<section class=\'videoSign1\'>未完整观看不能随意快进</section>");
                    player2.ModalDialogObj().fadeIn(400).delay(400).fadeOut(400);
                });
                player2.player.on("pause", function () {
                    t.parameter.pauseTime = (t.parameter.pauseTime == t.parameter.video.player.currentTime()) ? t.parameter.pauseTime : t.parameter.video.player.currentTime();
                    t.manageData.applyData({
                        port: t.ajaxPort.postVideoTime,
                        postData: {
                            "customerId": t.authority.loginOnOff,
                            "courseId": t.parameter.courseId,
                            "courseName": "",
                            "videoId": t.parameter.videoId,
                            "typeId": "1",
                            "isFinish": t.parameter.finishOnOff,
                            "playTime": t.parameter.video.player.currentTime(),
                            "isValid": "",
                            "visitSiteId": "",
                            "maxPlayTime": t.parameter.maxTime,
                            "maxIsFinish": t.parameter.finishOnOff,
                            "playTimeLength": t.parameter.pauseTime,
                            "isSaveLength": 1
                        },
                        success: function (data) {
                        },
                        failed: function () {
                        }
                    });
                });
                player2.player.on("resolutionchange",function(){
                    if($(".vjs-resolution-button-label").html()==t.parameter.articulation.HD){
                        commLog.creatEvent({
                            "id": 187,
                            "url": window.location.href,
                            "keyword": "课程终端页-高清",
                            "browseType": "38"
                        });
                    }else{
                        commLog.creatEvent({
                            "id": 188,
                            "url": window.location.href,
                            "keyword": "课程终端页-标清",
                            "browseType": "38"
                        });
                    }
                });
                player2.player.on("play", function () {
                    t.ele.courseCtn.show();
                    t.ele.testContainer.parent().hide();
                    t.parameter.video.ModalDialog(false, "");
                    t.parameter.playOnOff = false;
                    t.parameter.exerciseData = [{"state": "none", customerOptions: ""}];
                    console.log("开始");
                    console.log("执行")
                });
                player2.player.on("ended", function () {
                    var pointLen = t.parameter.pointData.length;
                    t.parameter.finishOnOff = 1;
                    if (t.parameter.pointData[pointLen - 1].questionList) {
                        t.ele.lastThink.html(t.template.lastQue());

                    }
                    $(".answerCourse").each(function () {//视频结束后的课后思考题
                        $(this).unbind("click").bind("click", function () {
                            commLog.creatEvent({
                                "id": 69,
                                "url": window.location.href,
                                "keyword": "课程终端页课后题呼出回复",
                                "browseType": "38"
                            });
                            var options = {
                                container: $(this).parent(),
                                refId: t.parameter.courseId,
                                position: "append",
                                parentid: "0",
                                refBelongId: $(this).parent().attr("data-thinkid"),
                                callBack: function (num, dataDiscussid) {

                                }
                            };
                            talk.public(options);
                        })
                    });
                    if (t.parameter.video.player.isFullScreen) {
                        t.parameter.video.player.exitFullscreen();
                    }
                    var nextUrl = "";
                    var nextText = "";
                    if ($.isEmptyObject(t.parameter.nextMap)) {
                        nextUrl = "https://www.yi-ding.net.cn/" + '?sourceType=38';
                        nextText = "没有课程了，离开";
                    } else {
                        nextText = "学习下一课";
                        nextUrl = "//" + t.parameter.nextMap + '?sourceType=38';
                    }
                    t.postVideoTime();//视频结束上传一次播放进度
                    $(".classThinkClose").unbind("click").bind("click", function () {//关闭思考题弹窗
                        commLog.creatEvent({
                            "id": 117,
                            "url": window.location.href,
                            "keyword": "课后思考题关闭",
                            "browseType": "38"
                        });
                        $(".classThink").hide();
                        t.ele.courseCtn.show();
                    });
                    $(".catalog-content .active").removeClass("active");
                    $(".catalogIte:last").addClass("active read").siblings().addClass("read");
                    if ($.isEmptyObject(t.parameter.joinInfo)) {//未加入系列课程有一个提示
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
                                $(".join-course").trigger("click");

                            },
                            "cancelCallback": function () {

                            }
                        });
                    }
                    t.ele.nextClass.html(nextText).attr({"data-href": nextUrl}).addClass("lernNextCourse");//跳转下一课的文案和链接展示
                    t.parameter.video.ModalDialog(true, '<section class="courseVideoPupop" style="background-color:rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000,endColorstr=#99000000);">' +
                        '                    <ul>' +
                        '                        <li class="repeat">' +
                        '                            <i></i>' +
                        '                            <span>重播</span>' +
                        '                        </li>' +
                        '                        <li class="learnNext lernNextCourse" data-href="' + nextUrl + '">' +
                        '                            <i></i>' +
                        '                            <span>' + nextText + '</span>' +
                        '                        </li>' +
                        '                    </ul>' +
                        '                </section>');
                    $(".lernNextCourse").unbind("click").bind("click", function () {
                        commLog.creatEvent({
                            "id": 116,
                            "url": window.location.href,
                            "keyword": "课后思考题学习下一课",
                            "browseType": "38"
                        });
                        window.location.href = $(this).attr("data-href");
                    });
                    $(".repeat").unbind("click").bind("click", function () {
                        window.location.reload();//重播是对页面做一次刷新
                    });
                });
            });
            t.parameter.video = player2;
            t.initDot();
            return t;
        },
        threeFn: function () {
            var t = terminal;
            var fullOnOff = t.parameter.video.player.isFullscreen();
            if (!fullOnOff) {
                if (t.authority.loginOnOff) {
                    if (((t.authority.auState == 1) || (t.authority.auState == 2))) {
                        return false;
                    } else {
                        authentication.init({
                            type: "trigger",
                            "success": function () {
                                authentication.exit();
                                location.reload();//刷新页面
                            }, reload: true
                        })
                    }
                } else {
                    t.loginFn(true);
                }
            } else {
                if (t.authority.loginOnOff) {
                    if (((t.authority.auState == 1) || (t.authority.auState == 2))) {
                        return false;
                    } else {
                        t.paused();
                        switch (authentication.keyState().state) {
                            case "-1":
                                if ($('.authentication-out').length == 0) {
                                    t.parameter.video.ModalDialog(true, '<section class="video-confirmModalMask" style="background-color:rgba(0,0,0,0.3); ">' +
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
                                    t.parameter.video.player.exitFullscreen();
                                    $(".video-confirmModalMask").remove();
                                });
                                $(".video-confirmModalEnsureBtn").unbind("click").bind("click", function () {
                                    commLog.creatEvent({
                                        "id": 144,
                                        "url": window.location.href,
                                        "keyword": "视频播放认证进入",
                                        "browseType": "38"
                                    });
                                    t.parameter.video.player.exitFullscreen();
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
                                t.parameter.video.ModalDialog(true, "<section class=\"video-confirmModalMask video-alertModalMask\" style=\"background-color:rgba(0,0,0,0.3); \"><section class=\"video-confirmModal\"><article class=\"video-confirmModalContent\"><article><p>很抱歉！我们正在加紧审核您的认证信息，请耐心等待...</p></article></article><div class=\"video-confirmModalBtns\"><button class=\"video-confirmModalEnsureBtn\" style=\"width:100%\">好的</button></div></section></section>");
                                $(".video-confirmModalBtns").unbind("click").bind("click", function () {
                                    $(".video-confirmModalMask").remove();
                                });
                                break;
                            case "3":
                                authentication.init({
                                    type: 'trigger',
                                    "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                });
                                break;
                        }
                    }
                } else {
                    t.parameter.video.player.exitFullscreen();
                    t.loginFn(true);
                }
            }
            return t;
        },
        checkLogin: function () {
            var t = terminal;
            if (t.authority.loginOnOff) {//只有在登录的时候才记录用户的播放时间
                window.Onunload = window.onbeforeunload = function () {
                    t.postVideoTime();
                };
                var newPlayTime = 0;
                t.manageData.applyData({//用户是登录状态获取其历史观看记录
                    port: t.ajaxPort.historyTime,
                    postData: {
                        "courseId": t.parameter.courseId,
                        "customerId": t.authority.loginOnOff,
                        "videoId": t.parameter.videoId,
                        "typeId": "1",
                        "visitSiteId": "13",
                        "isValid": "1",
                        "firstResult": "0",
                        "maxResult": "10",
                        "sortType": "2"
                    },
                    success: function (data) {
                        //console.log(data);
                        t.parameter.historyTime = data.responseObject.responseData.data_list[0];
                        if (localStorage.getItem("videoPlayTime")) {//如果本地有关于时间的历史记录缓存要做一个对比，求的最精准的
                            var localPlayJson = JSON.parse(localStorage.getItem("videoPlayTime"));
                            if ((parseInt(localPlayJson.courseId) == parseInt(t.parameter.courseId)) && ((parseInt(localPlayJson.userId) == parseInt(t.authority.loginOnOff)))) {
                                var videoPlayJson = localPlayJson;
                                newPlayTime = (parseInt(t.parameter.historyTime.newVideoPlay.playTime) > parseInt(videoPlayJson.nowTime)) ? parseInt(t.parameter.historyTime.newVideoPlay.playTime) : parseInt(videoPlayJson.nowTime);
                            }else{
                                newPlayTime = parseInt(t.parameter.historyTime.newVideoPlay.playTime);
                            }
                            var maxPlayTime = parseInt(t.parameter.historyTime.maxVideoPlay.playTime);

                            t.parameter.finishOnOff = t.parameter.historyTime.maxVideoPlay.isFinish;
                            //t.parameter.video.player.currentTime(newPlayTime)
                        } else {
                            newPlayTime = parseInt(t.parameter.historyTime.newVideoPlay.playTime);
                            maxPlayTime = 0;
                        }
                        //console.log(newPlayTime)
                        t.parameter.maxTime = (t.parameter.historyTime.maxVideoPlay.playTime > maxPlayTime) ? t.parameter.historyTime.maxVideoPlay.playTime : maxPlayTime;
                        t.videoInit({
                            setOnOff: t.parameter.historyTime.maxVideoPlay.isFinish === 0,//如果用户没有观看完毕，也就是isfinish是0的时候，打开禁止拖拽功能
                            dragNode: t.parameter.maxTime,//用户没有观看完毕，禁止拖拽的最大时间是最大播放记录
                            nowTime: newPlayTime
                        });
                        t.talkInit();//因为用户登录完成，可以展示讨论数据
                        t.loginInit();//走登录状态的一套逻辑
                    },
                    failed: function () {
                        //获取观看记录的数据失败，也就是用户没有观看记录，此时的禁止拖拽肯定要打开，且初始化最大拖拽点是0
                        //console.log("失败")
                        newPlayTime = 0;
                        //t.parameter.video.player.currentTime(0);
                        t.parameter.maxTime = 0;
                        t.videoInit({
                            setOnOff: true,
                            dragNode: 0,
                            nowTime: newPlayTime
                        });
                        //console.log(newPlayTime)
                        t.talkInit();
                        t.loginInit();
                    }
                });

            } else {
                //console.log(newPlayTime)
                t.videoInit({
                    "setOnOff": true,//因为用户没有登录，此时全程禁止拖拽，禁止拖拽点从0开始
                    dragNode: 0,
                    nowTime: 0
                });
                t.talkInit();//此时也初始化讨论，但是仅仅展示了讨论个数，然后显示的是登录按钮
                t.notLoginInit();//走未登录下的一整套逻辑
            }
            return t;
        },
        "paused": function () {
            var t = terminal;
            if ($('.vjs-control').hasClass('vjs-playing')) {
                $('.vjs-play-control').click();
            }
            ;
            t.parameter.video.player.pause();
        },
        subway: function () {//点亮地铁图
            var t = terminal;
            $(".catalogIte").each(function () {
                if ((parseInt($(this).attr("data-node")) < t.parameter.video.player.currentTime())) {
                    $(this).addClass("read").prevAll().addClass("read");
                } else {
                   $(this).nextAll(".read").removeClass("read");
                    $(this).nextAll(".active").removeClass("active");
                     /*$(this).prev().addClass("active");*/
                    return false;
                }
            });
        },
        postVideoTime: function () {
            var t = terminal;
            var storageCourse = {
                courseId: t.parameter.courseId,
                nowTime: t.parameter.video.player.currentTime(),
                maxTime: t.parameter.maxTime,
                isFnish: t.parameter.finishOnOff,
                userId: t.authority.loginOnOff
            };
            localStorage.setItem("videoPlayTime", JSON.stringify(storageCourse));
            t.manageData.applyData({
                port: t.ajaxPort.postVideoTime,
                postData: {
                    "customerId": t.authority.loginOnOff,
                    "courseId": t.parameter.courseId,
                    // "courseName": courseName,
                    "courseName": '',
                    "videoId": t.parameter.videoId,
                    "typeId": "1",
                    "isFinish": t.parameter.finishOnOff,
                    "playTime": t.parameter.video.player.currentTime(),
                    "isValid": "1",
                    "visitSiteId": "13",
                    "maxPlayTime": t.parameter.maxTime,
                    "maxIsFinish": t.parameter.finishOnOff
                },
                success: function (data) {

                },
                failed: function () {
                }
            });
            return t;
        },
        fullScreenToggle: function () {
            var t = terminal;
            t.parameter.video.player.on("fullscreenchange", function () {
                //console.log(t.parameter.exerciseData);
                var nowItem = false;
                $.each(t.parameter.pointData, function () {
                    if (parseInt(this.courseNodeTime) == parseInt(t.parameter.video.player.currentTime())) {
                        nowItem = true;
                    }
                });
                //console.log(t.parameter.playOnOff);
                if (t.parameter.playOnOff) {
                    if (t.parameter.video.player.paused() && nowItem) {
                        if (t.parameter.video.player.isFullscreen()) {
                            var continueClass = "";
                            var shadeStyle = "";
                            continueClass = ((t.parameter.exerciseData[0].state == "none") || (t.parameter.exerciseData[0].state == undefined)) ? "none" : "block";
                            shadeStyle = (t.parameter.exerciseData[0].state == "none") ? "block" : "none";
                            t.parameter.video.ModalDialog(true, "<aside class=\"hallTest_cont\" style='display: block;'>" +
                                "<section class=\"pcModule return_pc\">" +
                                "        <i></i><span class=\"text\">退出全屏</span>" +
                                "    </section>" +
                                "<aside class=\"width92\">" +
                                t.template.exercise(t.parameter.exerciseData) +
                                "</aside>" +
                                "<aside class=\"continue-look ev-continue\" style='display: " + continueClass + "'>" +
                                "<span>继续观看</span>" +
                                "</aside>" +
                                "</aside>" +
                                "<header class=\"hallTestVideo hallTestVideoShade\" style='display: " + shadeStyle + ";'></header>" +
                                "<div class=\"hallTestVideoText hallTestVideoShade\" style='display: " + shadeStyle + ";top: 50%;'>" +
                                "	答题结束可继续观看视频" +
                                "</div>");
                        } else {
                            //console.log(t.parameter.exerciseData[0].state);
                            if ((t.parameter.exerciseData[0].state == "none") || (t.parameter.exerciseData[0].state == undefined)) {
                                t.parameter.video.ModalDialog(true, "<header class=\"hallTestVideo hallTestVideoShade\" style='display: block;'></header>" +
                                    "<div class=\"hallTestVideoText hallTestVideoShade\" style='display: block;'>" +
                                    "	答题结束可继续观看视频" +
                                    "</div>");
                            } else {
                                t.parameter.video.ModalDialog(false, "");
                            }

                            t.ele.testContainer.html(t.template.exercise(t.parameter.exerciseData));
                        }
                        t.testAnswerInit();
                        t.affirmTest();
                    }
                }


            });
            return t;
        },
        loginFn: function (au) {
            var t = terminal;
            t.paused();
            localStorage.setItem("unActive", "1");
            loginAbout.login.show({
                "success": function () {
                    if (au) {
                        if (authentication.keyState().state == '1' || authentication.keyState().state == '2') {
                            location.reload();//刷新页面
                        }
                        $(".loginNone").hide();
                        $(".discussNone").hide();
                        loginAbout.changeHead();
                        authentication.init({
                            type: "trigger",
                            "success": function () {
                                authentication.exit();
                                location.reload();//刷新页面
                            }, reload: true
                        })
                    }

                }
            });
            return t;
        },
        testAnswer: function () {
            var t = terminal;
            var time = 0;
            $(".discussAllLastThink  .aswer").each(function () {//回答tab栏下的课后思考题
                $(this).unbind("click").bind("click", function () {
                    commLog.creatEvent({
                        "id": 70,
                        "url": window.location.href,
                        "keyword": "课后题回复呼出讨论",
                        "browseType": "38"
                    });
                    var isThis = $(this);
                    var options = {
                        container: isThis.parent(),
                        refId: t.parameter.courseId,
                        position: "after",
                        parentid: "0",
                        refBelongId: isThis.attr("data-thinkid"),
                        callBack: function () {

                        }
                    };
                    talk.about = "course";
                    talk.public(options);
                })
            });
            t.parameter.video.player.on("timeupdate", function () {
                var nowTime = t.parameter.video.player.currentTime();
                nowTime = parseInt(nowTime);
                if (time == nowTime) {
                    return;
                } else {
                    time = nowTime;
                }
                t.subway();
                if (nowTime > t.parameter.maxTime) {
                    t.parameter.maxTime = nowTime;
                }
                //console.log(t.parameter.maxTime)
                if (nowTime < t.parameter.maxTime) {
                    t.ele.courseCtn.show();
                    t.ele.testContainer.parent().hide().html("");
                    t.parameter.video.ModalDialog(false, "");
                    return false;
                } else {
                    $.each(t.parameter.pointData, function () {
                        if ((parseInt(this.courseNodeTime) == nowTime) && (this.state === undefined)) {
                            t.paused();
                            t.parameter.playOnOff = true;
                            t.ele.courseCtn.hide();
                            t.ele.testContainer.parent().show();
                            t.parameter.exerciseData = this.exercisesList;
                            commLog.creatEvent({"id": 115, "url": window.location.href, "keyword": "课程随堂测试", "browseType": "38"});
                            var fullOnOff = t.parameter.video.player.isFullscreen();
                            if (fullOnOff) {
                                t.parameter.video.ModalDialog(true, "<aside class=\"hallTest_cont\" style='display: block;'>" +
                                    "<section class=\"pcModule return_pc\">" +
                                    "        <i></i><span class=\"text\">退出全屏</span>" +
                                    "    </section>" +
                                    "<aside class=\"width92\">" +
                                    t.template.exercise(t.parameter.exerciseData) +
                                    "</aside>" +
                                    "<aside class=\"continue-look ev-continue\" style='display: none;'>" +
                                    "<span>继续观看</span>" +
                                    "</aside>" +
                                    "</aside>" +
                                    "<header class=\"hallTestVideo hallTestVideoShade\" style='display: block;'></header>" +
                                    "<div class=\"hallTestVideoText hallTestVideoShade\" style='display: block;top: 50%;'>" +
                                    "	答题结束可继续观看视频" +
                                    "</div>"
                                );
                            } else {
                                t.parameter.video.ModalDialog(true,
                                    "<header class=\"hallTestVideo hallTestVideoShade\" style='display: block;'></header>" +
                                    "<div class=\"hallTestVideoText hallTestVideoShade\" style='display: block;'>" +
                                    "	答题结束可继续观看视频" +
                                    "</div>"
                                );
                                t.ele.testContainer.html(t.template.exercise(t.parameter.exerciseData));

                            }
                            t.testAnswerInit();

                        } else {

                        }

                    });
                }
            });
        },
        toggleAffirm: function () {
            var t = terminal;
            var selectObj = $(".hallTest_cont .selected");
            var affirmOnOff = selectObj.length > 0;
            var cusStr = "";
            var affirmObj = $(".confirmBtn");
            if (affirmOnOff) {
                affirmObj.addClass("activation");
                selectObj.each(function () {
                    cusStr += $(this).attr("data-ansid") + ",";
                });
                var newCusStr = cusStr.substring(0, cusStr.length - 1);
                t.parameter.exerciseData[0].customerOptions = newCusStr;
                t.parameter.exerciseData[0].state = "none";
                //cusStr = "";
            } else {
                affirmObj.removeClass("activation");
            }


            /*t.fullScreenToggle();*/
        },
        affirmTest: function () {
            var t = terminal;
            $(".activation").unbind("click").bind("click", function () {
                var answerOptionsId = "";
                var customerStr = "";
                var ansObj = $(".answerAnalysis");
                var isRight = true;
                var yourObj = $(".aswerDisplay");
                $(this).hide();
                $(".hallTest_cont .selected").each(function () {
                    answerOptionsId += $(this).attr("data-ansid") + ",";
                    customerStr += $(this).attr("data-arrange") + ",";
                    if (!(JSON.parse($(this).attr("data-judge")))) {
                        isRight = false;
                        $(this).addClass("false");
                    } else {
                        $(this).addClass("true");
                    }
                });
                $(".queShitiOptions").each(function () {
                    if (!(JSON.parse($(this).attr("data-judge"))) && ($(this).hasClass("selected"))) {
                        isRight = false;
                    }
                    if ((JSON.parse($(this).attr("data-judge"))) && !($(this).hasClass("selected"))) {
                        isRight = false;
                    }
                });
                var newAnswerOptionsId = answerOptionsId.substring(0, answerOptionsId.length - 1);
                var newCustomerStr = customerStr.substring(0, customerStr.length - 1);
                t.parameter.exerciseData[0].customerOptions = newAnswerOptionsId;
                t.parameter.exerciseData[0].state = isRight;
                t.storePointData(t.parameter.exerciseData);
                if (!isRight) {
                    var wrongData = {
                        "customerId": t.authority.loginOnOff,
                        "exercisesId": t.parameter.exerciseData[0].exercisesId,
                        "type": $(".queite").attr("data-type"),
                        "customerOption": answerOptionsId
                    };
                    t.manageData.applyData({
                        port: t.ajaxPort.errorExercise,
                        postData: wrongData,
                        success: function (data) {

                        }
                    });
                    yourObj.append("<span class=\"falseAswer\">答案：" + newCustomerStr + "</span>");
                } else {
                    yourObj.append("<span class=\"trueAswer\">答案：" + customerStr + "</span>");
                }
                $(".hallTestVideoShade").remove();
                if (t.parameter.video.player.isFullscreen()) {
                    $(".ev-continue").show().unbind("click").bind("click", function () {
                        t.parameter.video.player.play();
                        commLog.creatEvent({
                            "id": 115,
                            "url": window.location.href,
                            "keyword": "随堂测试继续观看",
                            "browseType": "38"
                        });
                        t.parameter.video.ModalDialog(false, "");
                    });
                } else {
                    t.parameter.video.ModalDialog(false, "");
                }
                ansObj.show();
                t.fullScreenToggle();
                /*t.fullScreenToggle();*/
            });
        },
        storePointData: function (data) {
            var t = terminal;
            var newArrarData = [];
            $.each(t.parameter.pointData, function (index, v) {
                if (this.courseNodeTime == data.courseNodeTime) {
                    newArrarData.push(data);
                } else {
                    newArrarData.push(this);
                }
            });
            t.parameter.pointData = newArrarData;
            return t;
        },
        testAnswerInit: function () {
            var t = terminal;
            t.collect();
            $(".return_pc").unbind("click").bind("click", function () {
                t.fullScreenToggle();
                t.parameter.video.player.exitFullscreen();

            });
            $(".ev-continue").unbind("click").bind("click", function () {
                t.parameter.video.player.play();
                t.parameter.video.ModalDialog(false, "");
            });
            $(".queShitiOptions").each(function () {
                $(this).unbind("click").bind("click", function () {
                    var exType = parseInt($(".queite").attr("data-type"));
                    if (exType == 2) {
                        $(this).toggleClass("selected");
                        t.toggleAffirm();
                        t.affirmTest();
                    } else {
                        var isRight = JSON.parse($(this).attr("data-judge"));
                        var ansObj = $(".answerAnalysis");
                        var newCustomerStr = $(this).attr("data-arrange");
                        t.parameter.exerciseData[0].customerOptions = $(this).attr("data-ansid");
                        t.parameter.exerciseData[0].state = isRight;
                        t.storePointData(t.parameter.exerciseData);
                        $(this).addClass(isRight + "");
                        var yourObj = $(".aswerDisplay");
                        if (!isRight) {
                            var wrongData = {
                                "customerId": t.authority.loginOnOff,
                                "exercisesId": t.parameter.exerciseData[0].exercisesId,
                                "type": $(".queite").attr("data-type"),
                                "customerOption": $(this).attr("data-ansid")
                            };
                            t.manageData.applyData({
                                port: t.ajaxPort.errorExercise,
                                postData: wrongData,
                                success: function (data) {

                                }
                            });
                            yourObj.append("<span class=\"falseAswer\">答案：" + newCustomerStr + "</span>");
                        } else {
                            yourObj.append("<span class=\"trueAswer\">答案：" + newCustomerStr + "</span>");
                        }
                        $(".hallTestVideoShade").remove();
                        if (t.parameter.video.player.isFullscreen()) {
                            $(".ev-continue").show().unbind("click").bind("click", function () {
                                t.parameter.video.player.play();
                                t.parameter.video.ModalDialog(false, "");
                            });
                        } else {
                            t.parameter.video.ModalDialog(false, "");
                        }
                        ansObj.show();
                        t.fullScreenToggle();
                        /*if(isRight){

                         }else{

                         }*/
                    }
                });
            });
            return t;
        },
        askQue: function () {
            var askObj = $(".courseQution-pc");
            //console.log(askObj)
            var t = terminal;
            commLog.creatEvent({
                "id": 68,
                "url": window.location.href,
                "keyword": "课程终端页提问呼出讨论",
                "browseType": "38"
            });
            askObj.show().unbind("click").bind("click", function () {
                var discussId = 0;
                var options = {
                    container: $(".qustionWrite"),
                    refId: t.parameter.courseId,
                    position: "inner",
                    parentid: discussId,
                    refBelongId: "",
                    callBack: function (num, dataDiscussid) {

                    }
                };
                talk.public(options);
            })
        },
        loginInit: function () {
            var t = terminal;
            t.testAnswer();//在登录状态下弹题
            t.collect();//在登录状态下可以执行任何收藏
            if ($.isEmptyObject(t.parameter.joinInfo)) {
                t.ele.askCourse.append("<li class=\"join-course\">加入系列课程</li>");
                $(".join-course").unbind("click").bind("click", function () {
                    var isThis = $(this);
                    t.manageData.applyData({
                        port: t.ajaxPort.join,
                        postData: {
                            customerId: t.authority.loginOnOff,
                            joinType: 1,
                            refId: t.parameter.courseId
                        },
                        success: function (data) {
                            //t.parameter.pointData = data;
                            isThis.remove();
                            t.askQue();


                        },
                        failed: function () {
                        }
                    });
                });
            } else {
                t.askQue();
            }
            return t;
        },
        notLoginInit: function () {
            var t = terminal;
            t.ele.askCourse.append("<li class=\"join-course\">加入系列课程</li>");
            $(".loginGo").unbind("mousedown").bind("mousedown",function(){
                commLog.creatEvent({
                    "id": 141,
                    "url": window.location.href,
                    "keyword": "课程页讨论去登录",
                    "browseType": "38"
                });
            });
            $(".join-course").unbind("click").bind("click", function () {
                t.loginFn(false);
                commLog.creatEvent({
                    "id": 142,
                    "url": window.location.href,
                    "keyword": "加入系列课程去登录",
                    "browseType": "38"
                });
            });
            $(".discussAllLastThink  .aswer").unbind("click").bind("click", function () {
                t.loginFn(false);
            });
            t.ele.collect.unbind("click").bind("click", function () {
                t.loginFn(false);
            });
            t.parameter.video.player.on("timeupdate",function(){
                t.subway();
            });
            return t;
        },
        ajaxPort: {
            "postVideoTime": "//www.yi-ding.net.cn/call/customer/video/play/create/",
            "share": "//www.yi-ding.net.cn/call/yiding/comm/data/share/getMapList/",
            "point": "//www.yi-ding.net.cn/call/cms/series/course/baseinfo/getMapById/",
            "recommend": "//www.yi-ding.net.cn/call/recommend/resource/item/getMapList/",
            "historyTime": "//www.yi-ding.net.cn/call/customer/video/play/getTimeByCustomer/",
            "afterClass": "//www.yi-ding.net.cn/call/cms/series/course/question/getMapList/",
            "removeCollect": "//www.yi-ding.net.cn/call/customer/collection/delete/",
            "collect": "//www.yi-ding.net.cn/call/customer/collection/create/",
            "errorExercise": "//www.yi-ding.net.cn/call/customer/exercises/updateResult/",
            "join": "//www.yi-ding.net.cn/call/yiding/customer/join/create/"
        },
        openRecommend: function () {
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
        template: {
            "lastQue": function () {
                var t = terminal;
                var pointLen = t.parameter.pointData.length;
                var thinkStr = "";
                if (t.parameter.pointData[pointLen - 1].questionList) {
                    for (var thinkNum = 0; thinkNum < t.parameter.pointData[pointLen - 1].questionList.length; thinkNum++) {
                        var thinkName = t.parameter.pointData[pointLen - 1].questionList[thinkNum].questionName;
                        var thinkId = t.parameter.pointData[pointLen - 1].questionList[thinkNum].questionId;
                        thinkStr += "<li class=\"clear\" data-thinkId=\'" + thinkId + "\' >" +
                            "<div>" + thinkName + "</div>" +
                            "<span class='answerCourse' data-thinkId=\'" + thinkId + "\' >回答</span>" + "</li>";
                    }
                }
                return thinkStr;
            },
            "subway": function () {
                var t = terminal;
                var subWayStr = "<ul>";
                var questionStr = "";
                for (var liNum = 0; liNum < t.parameter.pointData.length; liNum++) {
                    var subNum = liNum % 2;
                    var subName = t.parameter.pointData[liNum].courseNodeName;
                    var subId = t.parameter.pointData[liNum].courseNodeId;
                    var subTime = t.parameter.pointData[liNum].courseNodeTime;
                    var lastIteam = t.parameter.pointData.length - 1;
                    /*显示目录地铁图*/
                    if (subNum == 0) {
                        if (liNum == 0) {
                            subWayStr += "<li class=\'single first catalogIte\' data-nodeId=\'" + subId + "\' data-node=\'" + subTime + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        } else if (liNum == lastIteam) {
                            if (liNum == 0) {
                                subWayStr += "<li class=\'single last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + subTime + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                            } else {
                                subWayStr += "<li class=\'single last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + subTime + "\'><div class=\'width92 clear\'><div class=\'catalogTime \'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                            }
                        } else {
                            subWayStr += "<li class=\'single catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + subTime + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        }
                    } else {
                        if (liNum == lastIteam) {
                            subWayStr += "<li class=\'double last catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + subTime + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        } else {
                            subWayStr += "<li class=\'double catalogIte\'  data-nodeId=\'" + subId + "\' data-node=\'" + subTime + "\'><div class=\'width92 clear\'><div class=\'catalogTime\'>" + subTime + "</div><div class=\'catalogText\'>" + subName + "</div></div><div class=\'live_pointer\'></div></li>";
                        }
                    }
                }
                subWayStr += "</ul>";
                return subWayStr;
            },
            "recommend": function (data) {
                var realData = data.responseObject.responseData.data_list;
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
                return videoStr;
            },
            afterClass: function (data) {
                var thinkStr = "";
                var realData = data.responseObject.responseData.data_list;
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
                return thinkStr;
            },
            "exercise": function (data) {
                if (data) {
                    var exerciseStr = "";
                    if (data.length > 0) {

                        var exerciseIte = data[0];
                        var title = "";
                        var typeName = "";
                        var dataType = "";
                        var exp = "";
                        var rightStr = "";
                        var rightOp = "";
                        var knowledgeList = "";
                        var exerciseId = data[0].exercisesId;
                        var exerciseCollectState = data[0].exercisesCollection.isValid;
                        var collectId = (exerciseCollectState == "1") ? data[0].exercisesCollection.id : "";
                        exp = exerciseIte.exercisesAnswerDesc /*+ course.creatQueImg(exerciseIte.exercisesDescAtt)*/;
                        title = exerciseIte.exercisesName /*+ course.creatQueImg(exerciseIte.exercisesNameAtt)*/;
                        switch (exerciseIte.exercisesType) {
                            case "1":
                                typeName = "单";
                                dataType = exerciseIte.exercisesType;
                                break;
                            case "2":
                                typeName = "多";
                                dataType = exerciseIte.exercisesType;
                                break;
                            case "3":
                                typeName = "判";
                                dataType = exerciseIte.exercisesType;
                                break;
                            default:
                                break;
                        }
                        var optionStr = "";
                        var customerStr = [];
                        terminal.parameter.exerciseData[0].state = exerciseIte.state;
                        if (exerciseIte.customerOptions) {
                            if (exerciseIte.customerOptions.length > 0) {
                                customerStr = exerciseIte.customerOptions.split(",");
                            }
                        }
                        for (var opNum = 0; opNum < data[0].optionList.length; opNum++) {
                            var inopIte = "";
                            var inopName = "";
                            var inopId = "";
                            var rightOnOff = "";
                            var ansClass = "";
                            inopIte = data[0].optionList[opNum].optionName /*+ course.creatQueImg(data[0].optionList[opNum].optionDescAtt)*/;
                            inopId = data[0].optionList[opNum].optionId;
                            switch (data[0].optionList[opNum].sortId) {
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
                            if (data[0].optionList[opNum].isRight == "1") {
                                rightOnOff = "true";
                                rightStr += inopName;
                                rightOp += data[0].optionList[opNum].optionId + ",";
                            } else {
                                rightOnOff = "false";
                            }
                            if (((typeof  exerciseIte.state) == "boolean") || ((typeof  exerciseIte.state) == "string")) {
                                if (exerciseIte.state == "none") {
                                    if (exerciseIte.customerOptions.length > 0) {
                                        $.each(customerStr, function (index, val) {
                                            if (val == inopId) {
                                                ansClass = "selected";
                                            }
                                        })
                                    }
                                } else {
                                    if (exerciseIte.customerOptions.length > 0) {
                                        $.each(customerStr, function (index, val) {
                                            if (val == inopId) {
                                                if (JSON.parse(rightOnOff)) {
                                                    ansClass = "true";
                                                } else {
                                                    ansClass = "false";
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                            optionStr += '<li class=\"clear queShitiOptions ' + ansClass + '\" data-ansId=\'' + inopId + '\' data-judge=\"' + rightOnOff + '\"' + ' data-arrange=\"' + inopName + '\"><div class=\"answerNum\"><span>' + inopName + '</span></div><div class=\"answerText\">' + inopIte + '</div></li>';
                        }
                        /*console.log();
                         console.log(exerciseIte.state);*/
                        var affirmClass = "";
                        if (exerciseIte.customerOptions) {
                            if (exerciseIte.customerOptions.length > 0) {

                                if (exerciseIte.state == "none") {
                                    affirmClass = "activation";
                                } else {
                                    affirmClass = "lucency";
                                }

                            }
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
                        var collectClass = (parseInt(exerciseCollectState) === 1) ? "active" : "";
                        var titleStr = "<div class=\"hallTestTitle\">" +
                            "	随堂测试<i class=\"collProblems " + collectClass + "\" data-collectid='" + collectId + "' ><span class=\"collIcon\"></span><span>收藏题目</span></i>" +
                            "</div>";
                        rightOp = rightOp.substring(0, rightOp.length - 1);
                        if (exerciseIte.exercisesType == 2) {
                            exerciseStr += "<div class=\"checkbox queite\" data-collect=\"" + collectId + "\" data-collect=\"" + exerciseCollectState + "\"     data-rightOp = \"" + rightOp + "\" data-type=\"" + dataType + "\"  data-exerciseId=\"" + exerciseId + "\"     style='display: block;'>" + "<div class=\"hTestProblems\"><span class=\'exerciseTypeSpan\'>" + typeName + "</span>" + title + "</div>" + "<ul class=\"hTestAnswer\">" + optionStr + "</ul>" + "<div class=\"confirmBtn " + affirmClass + "\">确认</div>" + "</div>" + "<div class=\"answerAnalysis\">" + "<div class=\"answerATitle\"><span>答案解析</span></div>" + "<div class=\"aswerDisplay\"><span class=\"trueAswer\">正确答案：" + rightStr + "</span></div>" + "<div class=\"aAnalysis_text\">" + exp + "</div>" + "<div class=\"knowledgePoint\"><div class=\"title " + knoStrClass + "\">知识点：</div><ul class=\"knowledgeList clear\">" + knoStr + "</ul>" + "</div>" + "</div>";
                        } else {
                            exerciseStr += "<div class=\"singleSelect queite\"  data-collect=\"" + collectId + "\"  data-collect=\"" + exerciseCollectState + "\"       data-rightOp = \"" + rightOp + "\"  data-type=\"" + dataType + "\" data-exerciseId=\"" + exerciseId + "\"   style='display: block;'>" + "<div class=\"hTestProblems\"><span class=\'exerciseTypeSpan\'>" + typeName + "</span>" + title + "</div>" + "<ul class=\"hTestAnswer\">" + optionStr + "</ul>" + "</div>" + "<div class=\"answerAnalysis\">" + "<div class=\"answerATitle\"><span>答案解析</span></div>" + "<div class=\"aswerDisplay\"><span class=\"trueAswer\">正确答案：" + rightStr + "</span></div>" + "<div class=\"aAnalysis_text\">" + exp + "</div>" + "<div class=\"knowledgePoint\"><div class=\"title " + knoStrClass + "\">知识点：</div><ul class=\"knowledgeList clear\">" + knoStr + "</ul></div>" + "</div>";
                        }
                    }
                    return titleStr + exerciseStr;

                }
            }
        },
        collect: function () {
            var t = terminal;
            $(".collProblems").unbind("click").bind("click", function () {
                var isThis = $(this);
                if (isThis.hasClass("active")) {/*//www.yi-ding.net.cn/call/customer/collection/delete/*/
                    var cancelData = {"id": isThis.attr("data-collectId")};
                    t.manageData.applyData({
                        port: t.ajaxPort.removeCollect,
                        postData: cancelData,
                        success: function (data) {
                            isThis.removeClass("active");
                        },
                        failed: function () {
                        }
                    });
                } else {
                    var collectData = {
                        refId: t.parameter.exerciseData[0].exercisesId,
                        collectionType: "2",
                        customerId: t.authority.loginOnOff,
                        "collectionAnswer": t.parameter.exerciseData[0].customerOptions
                    };
                    t.manageData.applyData({
                        port: t.ajaxPort.collect,
                        postData: collectData,
                        success: function (data) {
                            isThis.addClass("active");
                            isThis.attr({"data-collectId": data.responseObject.responsePk})
                        },
                        failed: function () {
                        }
                    });
                }
            });
            $(".courseColl-pc").unbind("click").bind("click", function () {
                var isThis = $(this);
                if (isThis.hasClass("active")) {/*//www.yi-ding.net.cn/call/customer/collection/delete/*/
                    var cancelData = {"id": isThis.attr("data-collectId")};
                    t.manageData.applyData({
                        port: t.ajaxPort.removeCollect,
                        postData: cancelData,
                        success: function (data) {
                            isThis.removeClass("active");
                        },
                        failed: function () {
                        }
                    });
                } else {
                    var collectData = {
                        refId: t.parameter.courseId,
                        collectionType: "3",
                        customerId: t.authority.loginOnOff,
                    };
                    t.manageData.applyData({
                        port: t.ajaxPort.collect,
                        postData: collectData,
                        success: function (data) {
                            isThis.addClass("active");
                            isThis.attr({"data-collectId": data.responseObject.responsePk});
                        },
                        failed: function () {
                        }
                    });
                }
            });
        },
        iScroll: function () {
            var t = terminal;
            $(document).unbind("scroll").bind("scroll", function () {
                var videoContainer = $(".course-video");
                var courseObj = $(".course-main");
                var topH = $("#al-headerTopNav").innerHeight();
                var pupop = $('.course-video .courseVideoPupop');
                var scrollH = $(window).scrollTop();
                var controlBar = $(".vjs-control-bar");
                var toTop = $("#toTop");
                if (scrollH >= topH) {
                    toTop.fadeIn(500); //淡入淡出效果
                } else {
                    toTop.fadeOut(500);
                }
                if ($(document).scrollTop() > 188) {
                    if (pupop.length > 0) {
                        pupop.hide();
                    }
                    videoContainer.addClass("course-video-fixed");
                } else {
                    if (pupop.length > 0) {
                        pupop.show();
                    }
                    videoContainer.removeClass("course-video-fixed");
                }

            });
            return t;
        },
        talkInit: function () {
            var t = terminal;
            var disscussData = {
                "reviewType": "1",
                "refId": t.parameter.courseId,
                "reviewId": "",
                "sortType": "7",
                "scene": "0",
                "logoUseFlag": "2",
                "pageIndex": "1",
                "pageSize": "10",
                "customerId": t.authority.loginOnOff,
                "attUseFlag": "16"
            };
            var discussOption = {
                "container": $(".discuss-content .discussAllList"),
                "postData": disscussData,
                refId: t.parameter.courseId,
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
                                t.paused();
                                localStorage.setItem("unActive", "1");
                            },
                            "success": function () {
                            }
                        })
                    }
                },
                onOperate: function () {
                    t.paused();
                },
                type: "disscuss",
                failed: function () {
                    t.paused();
                    var nowScrollObj = $(".discuss-content .discussAllList");
                    var quanbuOnOff = $(".all_text").html().length > 0;
                    if (loginAbout.login.status().state) {
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
        init: function () {
            var t = this;
            //localStorage.setItem("userId", "1483952395925");
            //初始化依次执行的顺序，给课件添加swipe效果，课程tab栏点击效果，课程简介文字部分的展开收起效果，小屏下移效果，获取相关推荐的数据，获取tab栏课后思考题的数据，//获取视频锚点数据，初始化分享数据，以上操作与用户的登录状态无关，不管登录与否都要展示的
            t.changeRecommend().tab().courseAbstract().iScroll().manageData.applyData({
                port: t.ajaxPort.recommend,
                postData: {
                    "resourceId": t.parameter.courseId,
                    "resourceType": "1",
                    "isValid": "1",
                    "attUseFlag": "3",
                    "firstResult": "0",
                    "maxResult": "20"
                },
                success: function (data) {
                    t.manageData.demoData({
                        "type": "html",
                        "container": $(".recommend ul"),
                        "judge": true,
                        "str": t.template.recommend(data),
                        "strCallBack": function () {
                            if ($(".recommend ul li").length > 3) {
                                t.swipe($(".recommendCont "), $(".recommendCont  .recommend"), 210 + 'px', $(".recommendCont  .recommend li"), "200px");
                            }
                            if ($(".course-tabite").eq(1).find(".course-active").length > 0) {
                                $(".recommendContainer").show();
                            }
                            t.openRecommend();//转换本页视频
                        }
                    });
                },
                failed: function () {
                }
            }).manageData.applyData({
                port: t.ajaxPort.afterClass,
                postData: {
                    "courseId": t.parameter.courseId,
                    "isValid": "1",
                    "firstResult": "0",
                    "maxResult": "20"
                },
                success: function (data) {
                    t.ele.afterClass.html(t.template.afterClass(data));
                },
                failed: function () {
                    t.ele.afterClass.hide();
                }
            }).manageData.applyData({
                port: t.ajaxPort.point,
                postData: {
                    "courseId": t.parameter.courseId,
                    "sessionCustomerId": t.authority.loginOnOff,
                    "attUseFlag": "",
                    "isValid": "",
                    "visitSiteId": "13",
                    "firstResult": 0,
                    "maxResult": 10
                },
                success: function (data) {
                    //t.parameter.pointData = data;
                    t.manageData.analysisPoint(data, t.checkLogin);//获取用户的登录状态，未登录一套逻辑，登录一套逻辑
                },
                failed: function () {
                }
            }).manageData.applyData({
                port: t.ajaxPort.share,
                postData: {
                    "sceneType": "3",
                    "resourceType": "3",
                    "refId": t.parameter.courseId,
                    "visitSiteId": "13",
                    "shareSence": "3"
                },
                success: function (req) {
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
                                shareWeixinSuc:function(){
                                    //微信分享成功回调
                                    commLog.creatEvent({"id":100,"url":window.location.href,"keyword":"微信分享"});
                                },
                                shareSinaSuc: function () {
                                    //微博分享成功回调
                                    commLog.creatEvent({"id":104,"url":window.location.href,"keyword":"微博分享"});
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
                failed: function () {
                }
            });

        }
    };
    terminal.init();
});