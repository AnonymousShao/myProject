/**
 * Created by ALLIN on 2017/3/10.
 */
$(document).ready(function(){
    var orderOptions = {
        "type": {
            "page":2,
            "exam":1
        },
        manage:function(){
            var sumNum = parseInt(exerciseCommon.means.getUrlName("sum"));
            var rightNum = parseInt(exerciseCommon.means.getUrlName("rightNum"));
            var noneNum = parseInt(exerciseCommon.means.getUrlName("noneNum"));
            var status =  parseInt(exerciseCommon.means.getUrlName("status"));
            var wrongNum = parseInt(exerciseCommon.means.getUrlName("wrongNum"));
            var gate = exerciseCommon.means.getUrlName("nowGate");
            var nextGate = exerciseCommon.means.getUrlName("nextGate");
            var nexttreeLevel = exerciseCommon.means.getUrlName("nextTreeLevel");
            var nowTreeLevel = exerciseCommon.means.getUrlName("nowTreeLevel");
            // console.log(nowTreeLevel)
            var againStr= "";
            var resUltStr = "";
            var nextUrl = "//www.yi-ding.net.cn/pages/exercises/exercise_project.html?&gateId="+nextGate+"&treeLevel="+nexttreeLevel;
            var again = (nextGate==gate);
            var wrongOnOff = false;
            if(wrongNum==0){
                wrongOnOff = true;
                $(".queResultCareWr").find("img").attr({"src":"/image/exercises/main_view_results-def@2x.png"}).unbind("click");
            }
            if(nextGate.length>0){
                if(nexttreeLevel=="0"){
                    againStr = ("继续下一系列课程");
                }else{
                    againStr = ("继续下一章节");
                }
            }else{
                againStr = "没有下一系列课程了，离开";
                nextUrl = "//www.yi-ding.net.cn//pages/exercises/exercise_project_begin.html";
            }
            resUltStr = ""+ rightNum+"<span class=\"queResultProCoSum\">"+"/"+""+sumNum+"题"+"</span>";
            var circleOnOff = rightNum>0;
            orderOptions.initData = {
                sum:sumNum,
                right:rightNum,
                exercisesTollgate:gate,
                radial:{
                    isIe:comm.isIe8(),
                    onOff:circleOnOff,
                    angle:Math.floor((rightNum/sumNum)*100),
                    ieBack:Math.ceil((Math.ceil((rightNum/sumNum)*360))/14.4)
                },
                treeLevel:nowTreeLevel,
                resUltStr:resUltStr,
                again:again,
                wrongOnOff:wrongOnOff,
                nextGate:{
                    "nextGate":nextGate,
                    "nowGate":gate,
                    "againStr":againStr,
                    "nextUrl":nextUrl
                }
            }

        },
        initData: {
        },
        "record": true,
        "login":true,
        "site":true
    };
    orderOptions.manage();
    exerciseCommon.analysis(orderOptions);
});