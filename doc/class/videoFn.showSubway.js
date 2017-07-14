/**
 * Created by ALLIN on 2017/3/15.
 */
function showSubway() {
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
                if(course.historyIsfinish==1){
                    course.video.currentTime($(this).attr('data-node'));
                }
            })
    })
    videoObj.append($(".hallTestVideoShade"));
    videoObj.append($(".hallTest_cont").clone());
    videoObj.find(".hallTest_cont").append(fullScreenStr).find(".width92").before(fullScreenHd);
}