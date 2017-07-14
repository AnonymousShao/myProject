/**
 * Created by ALLIN on 2017/3/1.
 */
/*http://www.yi-ding.net.cn/pages/exercises/exercise_order_result.html?&sum=39&rightNum=0&wrongNum=0&noneNum=39&status=0&nowGate=1&nextGate=1*/
$(document).ready(function(){
    var orderOptions = {
        "type": {
            "page":2,
            "exam":0
        },
        manage:function(){
            var sumNum = parseInt(exerciseCommon.means.getUrlName("sum"));
            var rightNum = parseInt(exerciseCommon.means.getUrlName("rightNum"));
            var noneNum = parseInt(exerciseCommon.means.getUrlName("noneNum"));
            var status =  parseInt(exerciseCommon.means.getUrlName("status"));
            var wrongNum = parseInt(exerciseCommon.means.getUrlName("wrongNum"));
            var gate = exerciseCommon.means.getUrlName("nowGate");
            var nextGate = exerciseCommon.means.getUrlName("nextGate");
            var forbid = false;
            var nextOnOff = false;
            var startStr = "";
            var againStr= "";
            var resUltStr = "";
            var nextUrl = "//www.yi-ding.net.cn/pages/exercises/exercise_order.html?gateId=";
            var again = (nextGate==gate);
            if(nextGate=="0"){
                forbid = true;
            }
            var wrongOnOff = false;
            if(wrongNum==0){
                wrongOnOff = true;
                $(".queResultCareWr").find("img").attr({"src":"/image/exercises/main_view_results-def@2x.png"}).unbind("click");
            }
            if(nextGate.length>0){
                nextOnOff = true;
                if(again){
                    againStr = "重新挑战";
                }else{
                    againStr = "下一关";
                }
                nextUrl+=nextGate;
            }else{
                againStr = "没有下一关了，离开";
                nextUrl = "//www.yi-ding.net.cn//pages/exercises/exercise_order_begin.html";
            }
            if( status==0|| status==1){
                startStr+="<figure><img src=\"/image/exercises/main_nopoint.png\"> </figure>"+"<figure><img src=\"/image/exercises/main_nopoint.png\"> </figure>"+"<figure><img src=\"/image/exercises/main_nopoint.png\"> </figure>";
            }else if( status==2){
                startStr+="<figure><img src=\"/image/exercises/main_getpoint.png\"></figure>"+"<figure><img src=\"/image/exercises/main_nopoint.png\"> </figure>"+"<figure><img src=\"/image/exercises/main_nopoint.png\"> </figure>";
            }else if( status==3){
                startStr+="<figure><img src=\"/image/exercises/main_getpoint.png\"></figure>"+"<figure><img src=\"/image/exercises/main_getpoint.png\"></figure>"+"<figure><img src=\"/image/exercises/main_nopoint.png\"> </figure>";
            }else{
                startStr+="<figure><img src=\"/image/exercises/main_getpoint.png\"></figure>"+"<figure><img src=\"/image/exercises/main_getpoint.png\"></figure>"+"<figure><img src=\"/image/exercises/main_getpoint.png\"></figure>";
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
                startStr:startStr,
                resUltStr:resUltStr,
                again:again,
                wrongOnOff:wrongOnOff,
                nextGate:{
                    "nextOnOff":nextOnOff,
                    "forbid":forbid,
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