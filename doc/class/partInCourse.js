/**
 * Created by ALLIN on 2017/3/15.
 */
function partInCourse() {
    $(".join-course").unbind("click").bind("click", function () {
        commLog.creatEvent({
            "id": 58,
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
            if($('.vjs-control').hasClass('vjs-playing')){
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
                    if(authentication.keyState().state=='1'||authentication.keyState().state=='2'){
                        location.reload();//刷新页面
                    }
                    loginAbout.changeHead();
                    course.baseInfo();
                    course.talkInit();
                    course.histortinit();
                    authentication.init({
                        type:"trigger",
                        "reload": true, "success": function () {
                            authentication.exit();
                            location.reload();//刷新页面

                        }
                    })
                }
            });
        }
    });
}