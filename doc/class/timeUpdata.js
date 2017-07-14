/**
 * Created by ALLIN on 2017/3/13.
 */
 function timeUpdata(maxTime) {
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
        for (var i=0;i<course.perveTime.length;i++){
            if(course.perveTime[i+1]-course.perveTime[i]>4){
                course.perveTime.pop();
                if(nowTime>Math.max.apply(null, course.perveTime)){
                    course.video.currentTime(Math.max.apply(null, course.perveTime))
                    nowTime=Math.max.apply(null, course.perveTime)
                    $('#example_video_1 .videoSign1').remove();
                    $('#example_video_1').append("<section class=\'videoSign1\'>未完整观看不能随意快进</section>")
                    course.perveTime=[];
                }
                if(course.perveTime[course.perveTime.length-1]-course.perveTime[course.perveTime.length-2]<0){
                    course.video.currentTime(course.perveTime[course.perveTime.length-1])
                }
            }else if(course.perveTime[i]-course.perveTime[i-1]==1){
                course.perveTime.splice(i-1,1);
            }

        }
        course.maxTime=Math.max.apply(null, course.perveTime);
        if(course.historyIsfinish==0||maxTime==0){
            $('.vjs-control-bar .videoSign2').width((98-(course.maxTime/course.video.duration())*100)+'%');
        }
        setTimeout(function () {
            $('#example_video_1 .videoSign1').remove();
        },1000)
        localStorage.setItem('vedioMaxTime',course.maxTime)
        if (nowTime >= 180) {
            var videoObj = $("#example_video_1");
            var fullScreenOnOff = videoObj.hasClass("vjs-fullscreen");
            if (fullScreenOnOff) {
                if (loginAbout.login.status().state) {
                    switch (authentication.keyState().state) {
                        case "-1":
                            course.video.currentTime(180);
                            if(course.browserVerinfoNum!='msie,8.0') {
                                course.video.pause();
                            }else {
                                $('.vjs-play-control').click();
                            }
                            if($('.authentication-out').length==0){
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
                                commLog.creatEvent({"id":16,"url":window.location.href,"keyword":"暂不认证","browseType":"38"});
                                course.video.cancelFullScreen();
                                if(course.browserVerinfoNum!='msie,8.0') {
                                    course.video.pause();
                                }else {
                                    $('.vjs-play-control').click();
                                }
                                course.video.currentTime(180);
                                $(".video-confirmModalMask").remove();
                            });
                            $(".video-confirmModalEnsureBtn").unbind("click").bind("click", function () {
                                commLog.creatEvent({"id":144,"url":window.location.href,"keyword":"视频播放认证进入","browseType":"38"});
                                course.video.cancelFullScreen();
                                if(course.browserVerinfoNum!='msie,8.0') {
                                    course.video.pause();
                                }else {
                                    $('.vjs-play-control').click();
                                }
                                authentication.init({
                                    type:'trigger',
                                    before: function () {
                                        if(course.browserVerinfoNum!='msie,8.0') {
                                            course.video.pause();
                                        }else {
                                            $('.vjs-play-control').click();
                                        }
                                    }, "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                })
                            });
                            break;
                        case "0":
                        case "4":
                            course.video.currentTime(180);
                            if(course.browserVerinfoNum!='msie,8.0') {
                                course.video.pause();
                            }else {
                                $('.vjs-play-control').click();
                            }
                            $("#example_video_1").append("<section class=\"video-confirmModalMask video-alertModalMask\" style=\"background-color:rgba(0,0,0,0.3); \"><section class=\"video-confirmModal\"><article class=\"video-confirmModalContent\"><article><p>很抱歉！我们正在加紧审核您的认证信息，请耐心等待...</p></article></article><div class=\"video-confirmModalBtns\"><button class=\"video-confirmModalEnsureBtn\" style=\"width:100%\">好的</button></div></section></section>");
                            if(course.browserVerinfoNum!='msie,8.0') {
                                course.video.pause();
                            }else {
                                $('.vjs-play-control').click();
                            }
                            $(".video-confirmModalBtns").unbind("click").bind("click", function () {
                                $(".video-confirmModalMask").remove();
                            });
                            break;
                        case "3":
                            course.video.cancelFullScreen();
                            if(course.browserVerinfoNum!='msie,8.0') {
                                course.video.pause();
                            }else {
                                $('.vjs-play-control').click();
                            }
                            authentication.init({
                                before: function () {
                                    if(course.browserVerinfoNum!='msie,8.0') {
                                        course.video.pause();
                                    }else {
                                        $('.vjs-play-control').click();
                                    }
                                }, "success": function () {
                                    authentication.exit();
                                    location.reload();//刷新页面
                                }, reload: true
                            })
                            break;
                    }
                } else {
                    localStorage.setItem("unActive", "1");
                    course.video.cancelFullScreen();
                    if(course.browserVerinfoNum!='msie,8.0') {
                        course.video.pause();
                    }else {
                        $('.vjs-play-control').click();
                    }
                    loginAbout.login.show({
                        "success": function () {
                            if(authentication.keyState().state=='1'||authentication.keyState().state=='2'){
                                location.reload();//刷新页面
                            }
                            loginAbout.changeHead();
                            course.baseInfo();
                            course.talkInit();
                            course.histortinit();
                            if(course.browserVerinfoNum!='msie,8.0') {
                                course.video.pause();
                            }else {
                                $('.vjs-play-control').click();
                            }
                            if (authentication.keyState().state=='1'||authentication.keyState().state=='2') {

                            } else {
                                course.video.currentTime(180);
                                if(course.browserVerinfoNum!='msie,8.0') {
                                    course.video.pause();
                                }else {
                                    $('.vjs-play-control').click();
                                }
                                authentication.init({
                                    before: function () {
                                        if(course.browserVerinfoNum!='msie,8.0') {
                                            course.video.pause();
                                        }else {
                                            $('.vjs-play-control').click();
                                        }
                                    }, "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                })
                            }
                        }
                    });
                }

            } else {
                if (loginAbout.login.status().state) {
                    if (authentication.keyState().state=='1'||authentication.keyState().state=='2') {
                        if(course.browserVerinfoNum!='msie,8.0') {
                            course.video.play();
                        }else {

                        }
                    } else {
                        course.video.currentTime(180);
                        if(course.browserVerinfoNum!='msie,8.0') {
                            course.video.pause();
                        }else {
                            $('.vjs-play-control').click();
                        }
                        switch (authentication.keyState().state) {
                            case "-1":
                                $(".yd-confirmModalMask.yd-alertModalMask").remove();
                                if($('.authentication-out').length==0) {
                                    comm.confirmBox({
                                        "content": "未认证只能观看三分钟，快去认证学习完整视频",
                                        "cancel": "暂不认证",
                                        "ensure": "去认证",
                                        "ensureCallback": function () {
                                            commLog.creatEvent({"id":144,"url":window.location.href,"keyword":"课程播放去认证","browseType":"38"});
                                            if(course.browserVerinfoNum!='msie,8.0') {
                                                course.video.pause();
                                            }else {
                                                $('.vjs-play-control').click();
                                            }
                                            authentication.init({
                                                type:'trigger',
                                                before: function () {
                                                    if(course.browserVerinfoNum!='msie,8.0') {
                                                        course.video.pause();
                                                    }else {
                                                        $('.vjs-play-control').click();
                                                    }
                                                }, "success": function () {
                                                    authentication.exit();
                                                    location.reload();//刷新页面
                                                }, reload: true
                                            })
                                        },
                                        "cancelCallback": function () {
                                            commLog.creatEvent({"id":16,"url":window.location.href,"keyword":"暂不认证","browseType":"38"});
                                            course.video.currentTime(180);
                                            if(course.browserVerinfoNum!='msie,8.0') {
                                                course.video.pause();
                                            }else {
                                                $('.vjs-play-control').click();
                                            }
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
                                        if(course.browserVerinfoNum!='msie,8.0') {
                                            course.video.pause();
                                        }else {
                                            $('.vjs-play-control').click();
                                        }
                                    }
                                });
                                break;
                            case "3":
                                if(course.browserVerinfoNum!='msie,8.0') {
                                    course.video.pause();
                                }else {
                                    $('.vjs-play-control').click();
                                }
                                authentication.init({
                                    before: function () {
                                        if(course.browserVerinfoNum!='msie,8.0') {
                                            course.video.pause();
                                        }else {
                                            $('.vjs-play-control').click();
                                        }
                                    }, "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                })
                                break;
                        }
                    }
                } else {
                    localStorage.setItem("unActive", "1");
                    if(course.browserVerinfoNum!='msie,8.0') {
                        course.video.pause();
                    }else {
                        $('.vjs-play-control').click();
                    }
                    loginAbout.login.show({
                        "success": function () {
                            if(authentication.keyState().state=='1'||authentication.keyState().state=='2'){
                                location.reload();//刷新页面
                            }
                            loginAbout.changeHead();
                            course.baseInfo();
                            course.talkInit();
                            course.histortinit();
                            if(course.browserVerinfoNum!='msie,8.0') {
                                course.video.pause();
                            }else {
                                $('.vjs-play-control').click();
                            }
                            if (authentication.keyState().state=='1'||authentication.keyState().state=='2') {
                                if(course.browserVerinfoNum!='msie,8.0') {
                                    course.video.play();
                                }else {

                                }
                            } else {
                                course.video.currentTime(180);
                                if(course.browserVerinfoNum!='msie,8.0') {
                                    course.video.pause();
                                }else {
                                    $('.vjs-play-control').click();
                                }
                                authentication.init({
                                    before: function () {
                                        if(course.browserVerinfoNum!='msie,8.0') {
                                            course.video.pause();
                                        }else {
                                            $('.vjs-play-control').click();
                                        }
                                    }, "success": function () {
                                        authentication.exit();
                                        location.reload();//刷新页面
                                    }, reload: true
                                })
                            }
                        }
                    });
                }
            }

        }
        if (textShadeObj.attr("data-toggle")) {
            //$(".course-video").data("isChange", false);这个属性并不理解
            var toggleShadeOnOff = JSON.parse(textShadeObj.attr("data-toggle"));
            if (!toggleShadeOnOff) {
                courseObj.show();
                testTargetObj.hide();
                shadeObj.hide();
            }
        }
        course.videoFn.operate(nowTime);//在播放的时候实目录的试试改变
    });

}