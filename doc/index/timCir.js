/**
 * Created by zhanghongda on 2017/3/14.
 */
var index = {};
//课程表的圆弧显示
index.timCir = function (cBeg, cEnd, i) {
    var t = this;
    var canvas = document.querySelectorAll(".circleBorder");
    var w = canvas[i].parentNode.querySelector('p').offsetWidth,//得到需要画出的圆环的宽
        h = canvas[i].parentNode.querySelector('p').offsetHeight;//得到需要画出的圆环的高
    canvas[i].width = w;//赋值
    canvas[i].height = h;//赋值
    var angle = parseInt(canvas[i].getAttribute('percent')) / 100 * 360;//将百分比的数据转换成角度
    var ctx = canvas[i].getContext("2d");
    var grd = ctx.createLinearGradient(0, 0, w, h);
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = grd;//填充的颜色
    var angles = angle / 360;
    grd.addColorStop(angles, cEnd);//结束的最大角度和结束的颜色
    grd.addColorStop("0", cBeg);//开始的角度（0）和开始的颜色
    ctx.arc(w / 2, h / 2, w / 2 - 1.5, 0, toA(angle), false);//开始画圆环false表示顺时针，
    ctx.stroke();
    function toA(a) {//将角度计算成弧度
        return a / 180 * Math.PI;
    }
}
 /*
 不兼容IE8在IE8中不显示
  */
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){

}else{
    //在圆环的dom结构中加入自定义属性
    t.timCir($(".circleBorder[data-index='" + j + "'").attr("cend"), $(".circleBorder[data-index='" + j + "']").attr("cbeg"), j);
}

