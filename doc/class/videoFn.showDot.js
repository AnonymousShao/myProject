/**
 * Created by ALLIN on 2017/3/15.
 */
function showDot() {
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
        if(leftPer>=100){
            leftPer=99;
        }
        if(leftPer<0){
            leftPer=0.5;
        }
        liStr += "<li class='line-list-iteam' style='left:" + leftPer + "%'></li>";
    }
    liStr += "</ul>";
    var controlBar = $(".vjs-progress-holder");
    if (controlBar.find(".line-list").length == 0) {
        controlBar.append(liStr);
    }

}