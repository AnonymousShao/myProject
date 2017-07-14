/**评论图片展示 */
$.fn.picShowComment = function (options) {
    var el = $(this);
    var defaultOptions = {
        repeat:false,        // 是否可循环滚动
        open:-1
    };
    var gallery;
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
            t.currentIndex = 0;
            t.setImgSize();
            
            if(window.location.href.indexOf("/allin/personal/app")==-1){
            		//comm.showAppDownload("img",1550);
            }
            
            if(opts.open>-1){
                t.currentIndex = opts.open;
                t.showPic();
            }
        },
        showPic: function () {
            var t = this;

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
                    '                            <div class="pswp__item" style="z-index:1500"></div>' +
                    '                            <div class="pswp__item" style="z-index:1500"></div>' +
                    '                            <div class="pswp__item" style="z-index:1500"></div>' +
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


            var pswpElement = document.querySelectorAll('.pswp')[0];
            // define options (if needed)
            var options = {
                // optionName: 'option value'
                // for example:
               /* history: false,
                focus: false,
                                */
                history: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0,
                allowPanToNext:true,
                /*maxSpreadZoom:2,*/
                loop:false,
                pinchToClose:true,
                clickToCloseNonZoomable:false,
                index: t.currentIndex // start at first slide
            };

            // Initializes and opens PhotoSwipe
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, t.items, options);
            gallery.init();
        },

        setImgSize: function () {
            var t = this;
            t.images = el.parents(".ev-picList").find('img');
            t.items = [];
            var $width = el.width();
            var $height =  $width*0.639;     // 371 /   580
            var $title = "";
            if(t.images.length>0){
                t.images.each(function (index,obj) {
                    if($(obj).attr('data-attwidth')!=''&&$(obj).attr('data-attwidth')!=undefined){
                        $width = $(obj).attr("data-attwidth");
                    }else if($(obj).attr("attWidth")!="" && $(obj).attr("attWidth")!=undefined){
                        $width = $(obj).attr("attWidth");
                    }else{
                        $width = 580;
                    }
                    if($(obj).attr('data-attheight')!=''&&$(obj).attr('data-attheight')!=undefined){
                        $height = $(obj).attr("data-attheight");
                    }else if($(obj).attr("attHeight")!="" && $(obj).attr("attHeight")!=undefined){
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
                    //DrawImage(t.images.eq(index),$width,$height);
                    var url = obj.src.match(/(\/\/\S+\_c)/);
                    var format =  obj.src.match(/(jpg|jpeg|gif|png|bmp)/ig);
                    if(url!=null && format!=null){
                        t.items.push({
                            src:url[0]+"."+format[0], //url[0]+"."+format[0],
                            //msrc:"//img50.allinmd.cn/case/loading.gif",//obj.src,
                            /*title:$title,*/
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
}
