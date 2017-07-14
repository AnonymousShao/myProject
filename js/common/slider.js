/**
 * $.MobileSlider
 * @charset utf-8
 * @extends jquery.1.9.1
 * @fileOverview 创建一个焦点轮播插件，兼容PC端和移动端，若引用请保留出处，谢谢！
 * @author 李春辉
 * @version 1.0
 * @date 2015-6-16
 * @example
 * $(".container").MobileSlider();
 */
(function($){
    $.fn.MobileSlider = function(settings){
        var defaultSettings = {
            width: 640, //容器宽度
            height: 320, //容器高度
            during: 5000, //间隔时间
            speed:30 //滑动速度
        }
        settings = $.extend(true, {}, defaultSettings, settings);
        return this.each(function(){
            var _this = $(this), s = settings;
            var startX = 0, startY = 0; //触摸开始时手势横纵坐标 
            var temPos; //滚动元素当前位置
            var iCurr = 0; //当前滚动屏幕数
            var timer = null; //计时器
            var oMover = $("ul", _this).eq(0); //滚动元素
            var oLi = $("li", oMover); //滚动单元
            var num = oLi.length; //滚动屏幕数
            var oPosition = {}; //触点位置
            var moveWidth = s.width; //滚动宽度
            //初始化主体样式
            _this.width(s.width).height(s.height).css({
                position: 'relative',
                overflow: 'hidden',
				margin:'0 auto'
            }); //设定容器宽高及样式
            oMover.css({
                position: 'absolute',
                left: 0
            });
            oLi.css({
                float: 'left',
                display: 'inline'
            });
            $("img", oLi).css({
                width: '100%',
                height: '100%'
            });
            //初始化焦点容器及按钮
            _this.append('<div class="carousel-pagination"><ul></ul></div>');
            var oFocusContainer = $(".carousel-pagination");
            for (var i = 0; i < num; i++) {
                $("ul", oFocusContainer).append("<li></li>");
            }
            var oFocus = $("li", oFocusContainer);
            oFocus.first().addClass("carousel-pagination-active");
            //页面加载或发生改变
            $(window).bind('resize load', function(){
                if (isMobile()) {
                    mobileSettings();
                    bindTochuEvent();
                }
                oLi.width(_this.width()).height(_this.height());//设定滚动单元宽高
                oMover.width(num * oLi.width());
                _this.fadeIn(300);
            });
            //页面加载完毕BANNER自动滚动
            autoMove();
            //PC机下焦点切换
            if (!isMobile()) {
                oFocus.hover(function(){
                    iCurr = $(this).index() - 1;
                    stopMove();
                    doMove();
                }, function(){
                    autoMove();
                })
            }
            //自动运动
            function autoMove(){
                timer = setInterval(doMove, s.during);
            }
            //停止自动运动
            function stopMove(){
                clearInterval(timer); timer=null;
            }
            //运动效果
            function doMove(){
                oMover.stop();
                iCurr = iCurr >= num - 1 ? 0 : iCurr + 1;
                doAnimate(-moveWidth * iCurr);
            }
            //绑定触摸事件
            function bindTochuEvent(){
                oMover.on("vmousedown",function(){
                    stopMove();
                });
                oMover.on("vmouseup",function(){
                    stopMove();
                    autoMove();
                });
            	oMover.on("swipeleft",function(){
                    swipeLeft();
            		return false;
            	});
            	oMover.on("swiperight",function(){
            		swipeRight();
            		return false;
            	});
            }
           
            //右划
            function swipeLeft(){
            	stopMove();
            	iCurr++;
                if (iCurr < num && iCurr >= 0) {
                    var moveX = iCurr * moveWidth;
                    doAnimate(-moveX);
                }
                else {
                	doAnimate(0);
                    iCurr = 0;
                }
            }
           //左划
            function swipeRight(){
            	stopMove();
            	iCurr--;
                if (iCurr >= 0) {
                    var moveX = iCurr * moveWidth;
                    doAnimate(-moveX);
                }
                else {
                	iCurr = num - 1;
                    doAnimate(-(num - 1) * moveWidth);
                }
            }
            //移动设备基于屏幕宽度设置容器宽高
            function mobileSettings(){
                moveWidth = $(window).width();
                var iScale = $(window).width() / s.width;
                _this.height(s.height * iScale).width($(window).width());
                oMover.css({
                    left: -iCurr * moveWidth
                });
            }
            //动画效果
            function doAnimate(iTarget, fn){
                oMover.stop().animate({
                    left: iTarget
                }, _this.speed , function(){
                	oFocus.eq(iCurr).addClass("carousel-pagination-active").siblings().removeClass("carousel-pagination-active");
                    if (fn) 
                        fn();
                });
            }
            //判断是否是移动设备
            function isMobile(){
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPod') != -1 || navigator.userAgent.indexOf('iPad') != -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    }
})(jQuery);
