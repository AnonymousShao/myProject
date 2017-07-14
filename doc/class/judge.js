/**
 * Created by ALLIN on 2017/3/15.
 */
function judge(callBack,ap) {
    var approveInfo = JSON.parse(localStorage.getItem('approveInfo'));
    if (localStorage.getItem('userId')) {
        if (approveInfo.state=='1'||approveInfo.state=='2') {
            callBack && callBack();
        } else {
            if (ap) {
                $(".yd-confirmModalMask.yd-alertModalMask").remove();
                if($('.vjs-control').hasClass('vjs-playing')){
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
                    if($('.authentication-out').length==0) {
                        if(approveInfo.state == "3"){
                            authentication.init({
                                type:"trigger",
                                "success": function () {
                                    authentication.exit();
                                    location.reload();//刷新页面
                                }, reload: true
                            })
                        }else {
                            comm.confirmBox({
                                "content": "认证后才能参与课程讨论</br>快去认证，获取完整权限",
                                "cancel": "暂不认证",
                                "ensure": "去认证",
                                "ensureCallback": function () {
                                    commLog.creatEvent({"id":15,"url":window.location.href,"keyword":"去认证","browseType":"38"});
                                    authentication.init({
                                        type:'trigger',
                                        "success": function () {
                                            authentication.exit();
                                            location.reload();//刷新页面
                                        }, reload: true
                                    })
                                },
                                "cancelCallback": function () {
                                    commLog.creatEvent({"id":16,"url":window.location.href,"keyword":"暂不认证","browseType":"38"});
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
        if($('.vjs-control').hasClass('vjs-playing')){
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
                    if (ap) {
                        if($('.vjs-control').hasClass('vjs-playing')){
                            $('.vjs-play-control').click();
                        }
                        authentication.init({
                            type:"trigger",
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
}