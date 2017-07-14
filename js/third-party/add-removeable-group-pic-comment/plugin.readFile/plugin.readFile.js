/**
 * 功能描述：
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by LiuYuTao on 2015/3/3.
 */
(function($) {
    $.imageFileVisible = function(options) {
        // 默认选项
        var defaults = {
//包裹图片的元素
            wrapSelector: null,
//<input type=file />元素
            fileSelector:  null ,
            errorMessage: "不是图片",
            isBackground:false
        };
        // Extend our default options with those provided.
        var opts = $.extend(defaults, options);
        //$(opts.fileSelector).on("change",function(){
            //alert(5);
            var file = $(opts.fileSelector).get(0).files[0];
           // alert("LLL" + $(opts.fileSelector).get(0).files.length);
            for(var k in file){
                //alert(k);
                //alert("sss" + file[k]);
            }
            //alert(file.type);
            var imageType = /image.*/;

            if (file.type.match(imageType) || file.name.match(/(jpg|jpeg|gif|png|bmp)/)) {
                var reader = new FileReader();
                reader.onload = function(){
                    if(opts.isBackground){
                        $( opts.wrapSelector).css({"background":"url("+ reader.result +") no-repeat center",backgroundSize:"100%"});
                    }else{
                        var img = new Image();
                        img.src = reader.result;
                        $(img).width( opts.width);
                        $(img).height( opts.height);
                        $( opts.wrapSelector ).append(img);
                    }

                };
                reader.readAsDataURL(file);
            }else{
                alert(opts.errorMessage);
            }
        //});
    };
})(jQuery);