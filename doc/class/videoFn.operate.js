/**
 * Created by ALLIN on 2017/3/15.
 */
function operate(checkTime) {
    for (var timeNum = 0; timeNum < course.dotConfig.list.length; timeNum++) {
        var setTime = course.dotConfig.list[timeNum].iteam;
        var beTime = (setTime<=checkTime) ? true : false;
        var beQurTime = (setTime==checkTime) ? true : false;
        var catalogObj = $(".catalog-content");
        var videoSignObj = $(".videoSign");
        if (loginAbout.login.status().state) {
            for(var i=0;i<course.dotConfig.list.length;i++){
                var videoSignTime = (course.dotConfig.list[i].iteam == checkTime + 5) ? true : false;
                if (videoSignTime) {
                    if (course.dotConfig.list[i].proFun) {
                        var showedOnOff = JSON.parse($("div[data-time=\'" + course.dotConfig.list[i].iteam + "\']").attr("data-showed"));
                        if (!showedOnOff) {
                            var sideBarObj = $(".video-js");
                            videoSignObj.fadeIn(400,
                                function () {
                                    sideBarObj.removeClass("vjs-user-inactive").addClass("vjs-user-active")
                                }).delay(1000).fadeOut(400,
                                function () {
                                    sideBarObj.removeClass("vjs-user-active").addClass("vjs-user-inactive");
                                });


                        }
                    }

                }
            }
        }
        catalogObj.find("ul .active").addClass("active");
        catalogObj.find("ul .catalogText").css({
            "color":"#909090"
        })
        if(course.historyIsfinish==1){
            for(var i=0;i< catalogObj.find("ul .catalogText").length;i++){
                catalogObj.find("ul .catalogText").eq(i).css({
                    "color":"#333"
                })
            }
        }
        catalogObj.find("ul .read").removeClass("read"); //首先将所有的read制空，然后点亮新的read
        for(var i=0;i< catalogObj.find("ul li").length;i++){
            if(catalogObj.find("ul li").eq(i).attr('data-node')<=course.maxTime)
                catalogObj.find("ul .catalogText").eq(i).css({
                    "color":"#333"
                })
        }
        catalogObj.find("[data-node='" + setTime + "']").removeClass("active");
        if (beTime) {
            //点亮新的read
            //course.dragNode = parseInt(catalogObj.find("[data-node='" + setTime + "']").next().attr("data-node"));
            for (var catalogNum = 0; catalogNum < catalogObj.find(".catalogIte").length; catalogNum++) {
                if(catalogObj.find(".catalogIte").eq(catalogNum).attr('data-node')<checkTime){
                    if(catalogNum==0){
                        catalogObj.find(".catalogIte").eq(catalogNum).addClass("read");
                    }else {
                        if(catalogObj.find(".catalogIte").eq(catalogNum-1).hasClass('read')){
                            catalogObj.find(".catalogIte").eq(catalogNum).addClass("read");
                        }
                    }
                    // catalogObj.find(".catalogIte").eq(catalogNum).addClass("read");
                    catalogObj.find(".catalogIte").eq(catalogNum).removeClass("active");
                    for(var i=0;i< catalogObj.find("ul li").length;i++){
                        if(catalogObj.find("ul li").eq(i).attr('data-node')<=course.maxTime)
                            catalogObj.find("ul .catalogText").eq(i).css({
                                "color":"#333"
                            })
                    }
                }
                // var breakOnOff = catalogObj.find(".catalogIte").eq(catalogNum).hasClass("read");
                if (catalogObj.find(".catalogIte").eq(catalogNum).attr('data-node')==checkTime) {
                    if (loginAbout.login.status().state) {
                        course.dotConfig.list[catalogNum].proFun && course.dotConfig.list[catalogNum].proFun();
                    }
                    break;
                }
            }
            break;
        }
    }
}