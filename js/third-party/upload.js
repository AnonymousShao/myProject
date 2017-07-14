/**
 * 功能描述：选择并截取用户头像  截取未开发
 * 使用方法:
 * 注意事件：
 * 引入来源：  依赖 v2/js/plugins/add-removeable-group-pic/plugin.replaceInput/plugin.replaceInput.js
 *               v2/js/plugins/add-removeable-group-pic/plugin.readFile/plugin.readFile.js
 *               ajaxSubmit.js
 * 作用：
 *
 * Created by LiuYuTao on 2015/4/7.
 * Fixed in Yiding by QiangKaiLiang on 2016/11/16
 */

$.fn.selectCutUserPic = function(Obj) {
    var defaults = {

    };


    var picpath = "";
    var options = $.extend(defaults, Obj);
    var _thisEl = $(this);
    var controller = {
        path: {
            upload: "//www.yi-ding.net.cn/call/yiding/upload/logo/attachment/upload/"
        },
        template: {
            main: '<section class="yd-pcImgSelectorMask pcModule">' +
                '        <section class="personal_sc">' +
                '            <figure class="personal_top_title_sc">编辑个人头像' +
                '                <p class="personal_pupop_close"></p>' +
                '            </figure>' +
                '            <section class="personal_img_cont_sc">' +
                '                <form id="uploadPic" method="post" enctype="multipart/form-data">' +
                '                    <section class="personal_img_cont_sc_left">' +
                '                         <input type="file" id="uploadPersonalImg" style="font-size: 72px; cursor: pointer; position: absolute; right: 0px; opacity: 0; outline: none; width: 375px; height: 375px; top: 0px;">' +
                '                    </section>' +
                '                </form>' +
                '                <section class="personal_img_cont_sc_right">' +
                '                    <p class="personal_img_cont_sc_right01">预览</p>' +
                '                    <figure class="personal_img_cont_sc_right02 showWrap big-wrap" id="bigWrap"><img src="//plugins.allinmd.cn/select-cut-user-pic/images/user_img110.png"></figure>' +
                '                    <article class="personal_img_cont_sc_right03">100 x 100</article>' +
                '                    <figure class="personal_img_cont_sc_right02 showWrap middle-wrap" id="middleWrap"><img src="//plugins.allinmd.cn/select-cut-user-pic/images/user_img65.png"></figure>' +
                '                    <article class="personal_img_cont_sc_right03">65 x 65</article>' +
                '                    <figure class="personal_img_cont_sc_right02 showWrap small-wrap" id="samllWrap"><img src="//plugins.allinmd.cn/select-cut-user-pic/images/user_img40.png"></figure>' +
                '                    <article class="personal_img_cont_sc_right03">40 x 40</article>' +
                '                </section>' +
                '                <section class="personal_mb"></section>' +
                '            </section>' +
                '            <section class="personal_sc_img_but">' +
                '                <p class="personal_sc_img_but_bg p_s_l cursor" id="saveBtn">发布</p>' +
                '                <p class="personal_sc_img_but_bg p_s_r cursor" id="cancelBtn">取消</p>' +
                '            </section>' +
                '        </section>' +
                '    </section>'
        },

        init: function(Obj) {
            var t = this;
            t.bindInit();
        },
        bindInit: function() {
            var t = this;
            _thisEl.on("click", function() {

                t.openDialog();
            });
        },
        //弹层
        openDialog: function() {
            if (window.location.href.indexOf('personal_index')!=-1){
                commLog.createBrowse(63,'我的-添加头像提示',window.location.href);
            }

            var t = this;
            t.dialog = $(t.template.main);
            $("body").append(t.dialog);
            // comm.setCenter(t.dialog);

            t.bindDialog();
        },
        html: '<section class="first" style="width: 375px; height: 375px; overflow: hidden; position: relative; opacity: 1;">' +
        '           <figure class="show personal_img_cont_sc_l_center choicePicture"> <span>选择图片</span>' +
        '           </figure>' +
        '           <article class="show personal_img_cont_sc_l_bottom">只支持JPG、PNG，大小不超过5M</article>' +
        '           <figure class="showWrap hide previewBox"></figure>' +
        '           <section class="uploading hide">' +
        '               <figure class="personal_img_cont_sc_l_top"><img src="//plugins.allinmd.cn/select-cut-user-pic/images/loading.gif"></figure>' +
        '               <figcaption class="personal_img_cont_sc_l_center upload-font">正在上传</figcaption>' +
        '           </section>' +
        '       </section>',
        bindDialog: function() {
            var t = this;
            // 关闭 取消
            t.dialog.find(".personal_pupop_close,#cancelBtn").on("click", function() {
                $(".yd-pcImgSelectorMask").hide();
                t.dialog.remove();
            });
            var input = t.dialog.find("#uploadPersonalImg");
            // 选择图片


            if (typeof FileReader != 'undefined') { // 本地可预览模式
                t.dialog.find("#uploadPersonalImg").replaceInput({
                    uploadReplaceCss: { width: 375, height: 375 },
                    uploadInputCss: {
                        fontSize: 72,
                        cursor: 'pointer',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        filter: 'alpha(opacity=0)',
                        opacity: 0,
                        outline: 'none',
                        width: 375,
                        height: 375,
                        hideFocus: 'expression(this.hideFocus=true)'
                    },
                    //MAX_FILE_SIZE:5242880,
                    html: t.html,

                    onChangeHdl: function() {
                        var fileSize = comm.file.getFileSize(document.getElementById("uploadPersonalImg"));
                        if (fileSize > 5242880) {
                            alert('图片不能大于' + 5242880 / 1048576 + "M");
                            return false;
                        }
                        $("#uploadPersonalImgTemp").remove();
                        var origin = $("#uploadPersonalImg");
                        var newImg = origin.clone();
                        newImg.attr("id", "uploadPersonalImg");
                        origin.attr("name", "file");
                        origin.attr("id", "uploadPersonalImgTemp");
                        origin.hide();
                        newImg.appendTo(origin.parent());
                        $(".showWrap").empty();
                        t.dialog.find(".first .show").hide();
                        t.dialog.find(".previewBox").show();

                        $.imageFileVisible({
                            wrapSelector: ".showWrap",
                            fileSelector: "#uploadPersonalImgTemp",
                            isBackground: true
                        });
                    }
                });
            } else { // 远程上传模式
                t.bindRemoteUpload();
            }
            // 上传过程
            t.bindUpload();
        },
        bindRemoteUpload: function() {
            $("#uploadPersonalImg").attr("name", "file");
            var t = this;
            czyx.uploadReplace("#uploadPersonalImg", {
                url: "//www.yi-ding.net.cn/call/yiding/upload/logo/attachment/upload/?_=" + Math.random(), //文件处理的URL,
                data: { paramJson: $.toJSON({ imageType: "0", domain: "www.yi-ding.net.cn" }) },
                uploadReplaceCss: {
                    //设置上传按钮图片
                    background: 'url(' + (picpath == "" ? "" : picpath) + ') center no-repeat',
                    backgroundSize: '100%',
                    width: "375", //上传按钮的宽度
                    height: "375", //上传按钮的高度
                    marginRight: "10px",
                    marginTop: "10px",
                    borderRadius: (picpath == "" ? 0 : "50%")
                },
                html: (picpath == "" ? t.html : ""), // 替换后的DOM代码
                uploadInputCss: {
                    width: "375", //上传按钮的宽度
                    height: "375", //上传按钮的高度
                    top: 0,
                    padding: "0",
                    borderRadius: (picpath == "" ? 0 : "200px")
                },
                uploadBefore: function() {
                    var fileSize = comm.file.getFileSize(document.getElementById("removeablePicBtn"));
                    if (fileSize > 5242880) {
                        alert('图片不能大于' + 5242880 / 1048576 + "M");
                        return false;
                    }
                    if (!/\.((jpg)|(gif)|(png))$/i.test(this.value)) {
                        alert('只允许上传.jpg .gif .png类型的图片文件');
                        return false;
                    }
                },
                uploadEnd: function(serverJson) { //上传完毕后调用
                    try {
                        serverJson = $.parseJSON(serverJson);
                        if (serverJson && serverJson.responseObject && serverJson.responseObject.responseMessage.url != "") {
                            $(".personal_img_cont_sc_left").html(
                                ' <input type="file" id="uploadPersonalImg" />');
                            picpath = serverJson.responseObject.responseMessage.url;
                            t.uploadResult = serverJson.responseObject.responseMessage;
                            $(".showWrap img").attr("src", picpath);
                            t.bindRemoteUpload();
                        } else {
                            if (serverJson.message) {
                                alert(serverJson.message);
                            } else {
                                alert("上传失败");
                            }
                        }
                    } catch (e) {
                        alert("上传失败")
                            //t.img = null;
                        return;
                    }
                }
            });
        },
        bindUpload: function() {
            var t = this;
            t.dialog.find("#saveBtn").on("click", function() {
                t.dialog.find(".previewBox").hide();
                t.dialog.find(".uploading").show(); // 上传中
                if (typeof FileReader != 'undefined') { // 本地可预览模式

                    var uploadOptions = {
                        url: t.path.upload,
                        data: {
                            paramJson: $.toJSON({
                                "imageType": "1",
                                customerId: localStorage.getItem("userId"),

                            })
                        },
                        headers:{
                            "Access-Control-Allow-Origin":"www.yi-ding.net.cn",
                        },
                        type: "POST",
                        success: function(result) {

                            if (result.responseObject.responseStatus) {
                                options.callback && options.callback(result);
                                $(".yd-pcImgSelectorMask").remove();
                                // comm.LightBox.hide();
                                // t.dialog.remove();
                            } else {
                                // 上传失败 TODO
                            }
                        }
                    };
                    t.dialog.find("form").ajaxSubmit(uploadOptions);
                } else { // 上传图片模式
                    //  保存操作
                    if (!t.uploadResult) {
                        return
                    }

                    $.ajax({
                        url: "//www.yi-ding.net.cn/call/yiding/upload/logo/attachment/upload/",
                        data: {
                            paramJson: $.toJSON({
                                uploadType: 0,
                                logoType: 10,
                                imageType: 1,
                                logoSize: t.uploadResult.logoSize,
                                logoWidth: t.uploadResult.logoWidth,
                                logoHeight: t.uploadResult.logoHeight,
                                dynaWidth: t.uploadResult.dynaWidth,
                                dynaHeight: t.uploadResult.dynaHeight,
                                logoUrl: t.uploadResult.url
                            })
                        },
                        type: "post",
                        success: function(result) {
                            if (result.responseObject.responseStatus) {
                                options.callback && options.callback(result);
                                comm.LightBox.hide();
                                t.dialog.remove();
                            } else {
                                // 上传失败 TODO
                            }
                        }
                    })
                }

            });
        }
    };

    controller.init(Obj);

};

(function($) {
    $.imageFileVisible = function(options) {
        // 默认选项
        var defaults = {
            //包裹图片的元素
            wrapSelector: null,
            //<input type=file />元素
            fileSelector: null,
            errorMessage: "不是图片",
            isBackground: false
        };
        // Extend our default options with those provided.
        var opts = $.extend(defaults, options);
        //$(opts.fileSelector).on("change",function(){
        var file = $(opts.fileSelector).get(0).files[0];
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            var reader = new FileReader();
            reader.onload = function() {
                if (opts.isBackground) {
                    $(opts.wrapSelector).css({ "background": "url(" + reader.result + ") no-repeat center", backgroundSize: "100%" });
                } else {
                    var img = new Image();
                    img.src = reader.result;
                    $(img).width(opts.width);
                    $(img).height(opts.height);
                    $(opts.wrapSelector).append(img);
                }

            };
            reader.readAsDataURL(file);
        } else {
            //alert(opts.errorMessage);
            return false;
        }
        //});
    };
})(jQuery);

$.fn.replaceInput = function(param) {
    param = param || {};
    param = $.extend(true, {}, {
        uploadReplaceCss: { //上传控件默认样式
            width: 80,
            height: 20,
            overflow: 'hidden',
            position: 'relative'

        },
        uploadInputCss: {
            fontSize: 72,
            cursor: 'pointer',
            position: 'absolute',
            right: 0,
            //bottom:0,
            filter: 'alpha(opacity=0)',
            opacity: 0,
            outline: 'none',
            width: 80,
            height: 20,
            hideFocus: 'expression(this.hideFocus=true)'
        },
        cssClass: {}
    }, param);
    param.url = param.url || window.location.href || '';
    param.MAX_FILE_SIZE = !-[1, ] && param.MAX_FILE_SIZE;
    return $(this).each(function() {
        //绑定click只是让效果看上去更好，与上传功能无关
        var jThis = $(this).click(function() {
            $(this).parent().css({
                opacity: 1,
                filter: 'alpha(opacity=100)'
            });
        });

        if (jThis.is('input[type="file"]')) {

            var html = param.html || "<div />";
            var div = $(html)
                .insertBefore(jThis.css(param.uploadInputCss))
                .css(param.uploadReplaceCss)
                .addClass(param.cssClass)
                .hover(function() {
                    $(this).css({
                        opacity: 1,
                        filter: 'alpha(opacity=100)'
                    });
                }, function() {
                    $(this).css({
                        opacity: 1,
                        filter: 'alpha(opacity=100)'
                    });
                });

            //有一篇文章说，IE浏览器可以设置最大字节数，那么我就加上这句的
            //<input type="hidden" name="MAX_FILE_SIZE" value="30000" />
            //MAX_FILE_SIZE 隐藏字段（单位为字节）必须先于文件输入字段，其值为接收文件的最大尺寸。
            //这是对浏览器的一个建议，PHP 也会检查此项。
            //在浏览器端可以简单绕过此设置，因此不要指望用此特性来阻挡大文件。
            //实际上，PHP 设置中的上传文件最大值是不会失效的。
            //但是最好还是在表单中加上此项目，
            //因为它可以避免用户在花时间等待上传大文件之后才发现文件过大上传失败的麻烦。
            //详见：http://www.ugia.cn/?p=73
            if (param.MAX_FILE_SIZE) {
                this.MAX_FILE_SIZE = param.MAX_FILE_SIZE;
            }

            jThis.change(function() { // 选中文件
                if (this.value !== "") {
                    if (param.onChangeHdl.call(this) === false) {
                        return false;
                    }
                }
            });
        }
    });
};
