$.fn.picShow = function (options) {
    var el = $(this);
    var defaultOptions = {
        repeat:false,        // 是否可循环滚动
        open:-1
    };
    function DrawImage(ImgD,iwidth,iheight){
        //参数(图片,允许的宽度,允许的高度)
        var image=new Image();
        image.src=ImgD.src;
        if(image.width>0 && image.height>0){
            if(image.width/image.height>= iwidth/iheight){
                if(image.width>iwidth){
                    ImgD.width=iwidth;
                    ImgD.height=(image.height*iwidth)/image.width;
                }else{
                    ImgD.width=image.width;
                    ImgD.height=image.height;
                }
            }else{
                if(image.height>iheight){
                    ImgD.height=iheight;
                    ImgD.width=(image.width*iheight)/image.height;
                }else{
                    ImgD.width=image.width;
                    ImgD.height=image.height;
                }
            }
        }
    }
    var opts = $.extend(defaultOptions,options);
    var obj = {
        init: function () {
            var t = this;
           /* t.imgsArr = [];
            t.textArr = [];
            t.currentIndex = 0;
            t.opts = opts;*/
	        if(t.gallery!=null && t.gallery!=undefined){
		        t.gallery.close();
	        }
            if(window.location.href.indexOf("/allin/personal/app")==-1){
            		comm.showAppDownload("img",1550);
            }

            t.currentIndex = 0;
            t.setImgSize();
            if(opts.open>-1){
                t.currentIndex = opts.open;
	            t.showPic();
            }
	        $(window).on("resize", function () {
		        if(t.gallery!=null){
			        t.gallery.updateSize();
		        }
	        });
        },
        /*bindOpenClick:function(){
            var t = this;
            el.find("img:eq(0)").on("vclick",function(){
                $("body").css("overflow","hidden");
                if(!$("#picShowContainer").length){
                    $("body").append('<div id="picShowContainer" class="picshow-container"><div class="return-btn"></div>' +
                        '<div id="picshow-pic-con" class="picshow-pic-con">' +
                        '   <div class="inner-box-1 inner-box"></div>' +
                        '   <div class="inner-box-2 inner-box"></div>' +
                        '   <div class="inner-box-3 inner-box"></div>' +
                        '</div>' +
                        '<div class="num-con"></div>' +
                        '<div id="desc-con" class="desc-con"></div>' +
                        '</div>');

                    $("#picShowContainer .return-btn").on("vclick", function () {
                        t.currentIndex = 0 ;
                        $("#picShowContainer").remove();
                        $("body").css("overflow","scroll");
                        return false;
                    });


                    t.container = $("#picShowContainer");
                    t.initWidthHeight();
                    t.initSlide();
                }
            });
        },
        initWidthHeight: function () {
            var t = this;
            var descHeight = $("#picShowContainer .desc-con").height();
            var screenH =  $("#picShowContainer").height();
            t.conHeight = screenH-descHeight;

            $(".picshow-pic-con").height(t.conHeight);
            $(".picshow-pic-con .inner-box").height(t.conHeight);
        },
        initSlide: function () {
            var t = this;
            t.leftBox =   $("#picshow-pic-con .inner-box-1");
            t.centerBox = $("#picshow-pic-con .inner-box-2");
            t.rightBox =  $("#picshow-pic-con .inner-box-3");
            t.setImg();
            t.bindSlide();
            t.container.find(".desc-con").html(t.textArr[0]);
        },
        bindSlide: function () {
            var t = this;
            $("#picshow-pic-con").on("swipeleft",function(){
                if(t.opts.repeat){
                    t.slide(1);
                }else{
                    if(t.currentIndex != (t.imgsArr.length-1)){
                        t.slide(1);
                    }
                }
            });
            $("#picshow-pic-con").on("swiperight",function(){
                if(t.opts.repeat){
                    t.slide(-1);
                }else{
                    if(t.currentIndex != 0){
                        t.slide(-1);
                    }
                }
            });
        },
        setImg: function () {
            var t = this,leftIndex,rightIndex;
            if(t.currentIndex>=t.imgsArr.length){
                t.currentIndex = 0;
            }
            if(t.currentIndex<0){
                t.currentIndex = t.imgsArr.length-1;
            }
            leftIndex = t.currentIndex-1;
            rightIndex = t.currentIndex + 1 ;

            if(leftIndex<0){
                leftIndex = t.imgsArr.length-1;
            }
            if(rightIndex>=t.imgsArr.length){
                rightIndex = 0;
            }

            t.leftBox.html(createImg(t.imgsArr[leftIndex]));
            if(t.currentIndex==0){
                t.centerBox.html(createImg(t.imgsArr[t.currentIndex]));
            }
            t.rightBox.html(createImg(t.imgsArr[rightIndex]));

            t.leftBox.css("left",-$(window).width());
            t.centerBox.css("left",0);
            t.rightBox.css("left",$(window).width());

            t.setNum(t.currentIndex+1);
            function createImg(src){
                var rst = new Image();
                rst.src = src;
                rst.onload=function(){
                    this.width = $(window).width()-10;
                    if(this.height<t.conHeight){
                        $(this).css("marginTop",(t.conHeight - this.height)/2);
                    }
                };
                return rst;
            }
        },
        slide: function (direction) {
            var t = this;
            if(direction<0){ // right
                t.centerBox.animate({"left":$(window).width()});
                t.leftBox.animate({"left":0},function(){
                    var temp = t.leftBox;
                    t.leftBox = t.rightBox;
                    t.rightBox = t.centerBox;
                    t.centerBox = temp;
                    t.currentIndex--;
                    t.setImg();
                    t.container.find(".desc-con").html(t.textArr[t.currentIndex]);
                });
            }else{      // left
                t.centerBox.animate({"left":-$(window).width()});
                t.rightBox.animate({"left":0}, function () {
                    var temp = t.leftBox;
                    t.leftBox = t.centerBox;
                    t.centerBox = t.rightBox;
                    t.rightBox = temp;
                    t.currentIndex++;
                    t.setImg();
                    t.container.find(".desc-con").html(t.textArr[t.currentIndex]);
                });
            }
        },
        setNum: function (num) {
            var t = this;
            t.container.find(".num-con").html("<span>" + num + "</span>/" + t.count);
        },
        setImgSize: function () {
            var t = this;
            t.images = el.find("img");

            t.count  = t.images.length;
            var $width = $(".imgs").width();
            var $height =  $width*0.639;     // 371 /   580
            if(t.count>0){
                //DrawImage(t.images.eq(0).get(0),$width,$height);
              *//*  t.images.eq(0).get(0).css({
                    width:$width,height:$height
                });*//*
                t.images.each(function (index,obj) {
                    var url = obj.src.match(/(http:\/\/\S+\_c)/);
                    var format =  obj.src.match(/(jpg|jpeg|gif|png|bmp)/ig);
                    t.imgsArr.push(url[0]+"."+format[0]);
                    t.textArr.push(obj.title);
                });
            }
        }*/


        showPic: function () {
            var t = this;
            if(!$(".pswp").length){
                $(".pswp").remove();
                $("body").append('<!-- Root element of PhotoSwipe. Must have class pswp. -->' +
                    '           <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">' +
                    '                    <!-- Background of PhotoSwipe. ' +
                    '                         It,s a separate element as animating opacity is faster than rgba(). -->' +
                    '                <div class="pswp__bg"></div>' +
                    '                    <!-- Slides wrapper with overflow:hidden. -->' +
                    '                <div class="pswp__scroll-wrap">' +
                    '                    <!--   Container that holds slides.' +
                    '                           PhotoSwipe keeps only 3 of them in the DOM to save memory.' +
                    '                           Don t modify these 3 pswp__item elements, data is added later on. -->' +
                    '                    <div class="pswp__container">' +
                    '                            <div class="pswp__item"></div>' +
                    '                            <div class="pswp__item"></div>' +
                    '                            <div class="pswp__item"></div>' +
                    '                    </div>' +
                    '                    <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->' +
                    '                    <div class="pswp__ui pswp__ui--hidden">' +
                    '                        <div class="pswp__top-bar">' +
                    '                                            <!--  Controls are self-explanatory. Order can be changed. -->' +
                    '                            <div class="pswp__counter"></div>' +
                    '                            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
                    //'                            <button class="pswp__button pswp__button--share" title="Share"></button>' +
                    //'                            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>' +
                    '                            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>' +
                    '                            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->' +
                    '                            <!-- element will get class pswp__preloader--active when preloader is running -->' +
                    '                            <div class="pswp__preloader">' +
                    '                                <div class="pswp__preloader__icn">' +
                    '                                    <div class="pswp__preloader__cut">' +
                    '                                        <div class="pswp__preloader__donut"></div>' +
                    '                                    </div>' +
                    '                                </div>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">' +
                    '                           <div class="pswp__share-tooltip"></div>' +
                    '                        </div> ' +
                    '                        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">' +
                    '                           </button>' +
                    '                        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">' +
                    '                           </button>' +
                    '                        <div class="pswp__caption">' +
                    '                            <div class="pswp__caption__center"></div>' +
                    '                        </div>' +
                    '                    </div>' +
                    '                </div>' +
                    '            </div>');
            }

            var pswpElement = document.querySelectorAll('.pswp')[0];
            var options = {
                /* optionName: 'option value'
                 for example:
                 history: false,
                 focus: false,
                 */
                 history: false,
                 showAnimationDuration: 0,
                 hideAnimationDuration: 0,
                allowPanToNext:true,
                clickToCloseNonZoomable:false,
                /*maxSpreadZoom:2,*/
                loop:false,
                pinchToClose:true,
                index: t.currentIndex // start at first slide
            };

            // Initializes and opens PhotoSwipe
	        t.gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, t.items, options);
	        t.gallery.init();
        },

        setImgSize: function () {
            var t = this;
            t.images = el.find("img");
            t.items = [];
            var $width = el.width();
            var $height =  $width*0.639;     // 371 /   580
            var $title = "";
            if(t.images.length>0){
                t.images.each(function (index,obj) {
                    $title = "";
                    if($(obj).attr("attWidth")!="" && $(obj).attr("attWidth")!=undefined){
                        $width = $(obj).attr("attWidth");
                    }else{
                        $width = 580;
                    }
                    if($(obj).attr("attHeight")!="" && $(obj).attr("attHeight")!=undefined){
                        $height = $(obj).attr("attHeight");
                    }else{
                        $height = 371;
                    }
                    if($(obj).attr("title")!="" && $(obj).attr("title")!=undefined){
                        $title = $(obj).attr("title");
                    }
                    var rateOri = $width / $height;
                    var rateWindow = $(window).width() / $(window).height();
                    if(rateOri < rateWindow ){
                        $height = $(window).height();
                        $width = $height * rateOri;
                    }else{
                        $width = $(window).width();
                        $height =$width / rateOri;
                    }
                    DrawImage(t.images.eq(index),$width,$height);
                    var url = obj.src.match(/(\/\/\S+\_c)/);
                    var format =  obj.src.match(/(jpg|jpeg|gif|png|bmp)/ig);

                    if(url!=null && format!=null){
                        t.items.push({
                            src:url[0]+"."+format[0], //url[0]+"."+format[0],
                            msrc:obj.src,
                           title:$title,
                            w:$width,
                            h:$height
                        });
                    }else{
                        //t.imgsArr.push("");
                        //t.textArr.push("");
                    }
                });
            }
        }
    };
    obj.init();
	return obj.gallery;
};