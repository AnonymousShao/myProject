/**
 * Created by ALLIN on 2017/3/15.
 */
function talkInit() {
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
}