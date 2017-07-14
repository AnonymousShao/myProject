/**
 * 功能描述：点击添加图片，添加至某容器中，
 * 使用方法:  $("#xxx").addRemoveablePic({
 *             container:$("#yyy"),
 *             limit:4
 *          })
 * 注意事件： 依赖上传插件  js/plugin/uploadReplace.js
 * 引入来源：
 *
 * Created by LiuYuTao on 2015/2/28.
 */
$.fn.addRemoveablePicComment = function(obj){
    var defaultOpts = {
        container:null,
        limit:9,
        maxFileSize:10485760,
        html:"",
        existNum:0,// 已上传的数量

        onSizeChange:null,
        deleteImg:null
    };
    var _DomObj = this;     // 当前元素
    var controller = {
        path:{
            upload:"/call/customer/fellowship/attachment/create/"   // 插入评论图片 上传地址      url:"/call/customer/fellowship/attachment/create/", //文件处理的URL
                        //data:{customerId:t.customerId,fellowshipId:fellowshipid,useFlag:'2'},
        },
        el:{

        },
        uploadData:null,    // 上传参数,
        opts:null,
        listContainer:null,
        imgPkList:{},
        limitNum:0,
        /**
         *
         */
        init: function () {
            var t = this;
            t.opts = $.extend(defaultOpts,obj);

            if(t.opts.container === null){
                console.error("图片列表容器不能为空");
                return false;
            }
            //编辑删除图片
            $.each($(defaultOpts.container).find(".comm_close"),function(i,em){
                $(em).off("vclick").on("vclick",function(event){
                    $(this).parents("li").remove();
                    t.limitNum++;
                    t.updateNum();
                    t.opts.deleteImg($(this))&&t.opts.deleteImg($(this));
                    event.stopPropagation();
                    event.preventDefault();
                })
            });
            t.insertContainer();
            if(typeof FileReader != 'undefined') {  // 本地可预览模式
                t.bindDomObj();
                t.listContainer.find("#imgType").val("local");
            }else{
                t.bindRmoteUpload();
                t.listContainer.find("#imgType").val("remote");
            }
            t.uploadData = {         // 上传图片时 参数

            };

            t.limitNum = t.opts.limit - t.opts.existNum;
        },
        template:{
            container: function (kv) {
                return '<div class="add_photo hide">' +
                    '<div class="hn_add">还能添加'+ kv.limit+'张</div>' +
                    '                <ul>' +
                    // '                <li><div class="add_photo_img"><img src="//img00.allinmd.cn/detail/sc_photo.png"><div class="c_close"><img src="//img00.allinmd.cn/detail/c_close.png"></div></div></li>' +
                    '                   <div class="clear"></div>' +
                    '                 </ul>' +
                    '<input type="hidden" id="imgType" />' +
                    '<input type="hidden" id="imgPkList" class="imgPkList" />  ' +
                    '   </div>';
            }
        },
        /**
         * 在规定的父容器中插入 要放置图片列表的 子级容器
          */
        insertContainer: function () {
            var t = this;
            //$(defaultOpts.container).append(t.template.container({limit:defaultOpts.limit}));
            t.listContainer = $(defaultOpts.container);
            t.listContainer.bind(".c_close","click", function () {   // 关闭按钮
                t.removePic(this);
            });
        },
        /**
         * 绑定上传按钮 点击上传
         */
        bindDomObj: function () {
            var t = this;
            _DomObj.html("<input type='file' name='file' /> ");

            var input = _DomObj.find("input[name=file]:last");
            input.replaceInput({
                html: t.opts.html,      // 替换后的DOM代码
                uploadReplaceCss:{//上传控件默认样式
                    width:70,
                    height:70,
                    overflow:'hidden',
                    position:'relative',
                    fontSize:12
                },
                uploadInputCss:{
                    cursor:'pointer',
                    filter:'alpha(opacity=0)',
                    opacity:0,
                    outline:'none',
                    width:70,
                    height:70,
                    fontSize:12,
                    hideFocus:'expression(this.hideFocus=true)'
                },
                onChangeHdl: function () {       // 选中文件后

                    if(t.limitNum>0){   //图片数量不超过限制
                        //预览
                        //var html =  $('<li><div class="add_photo_img"><div class="c_close"><img src="//img00.allinmd.cn/detail/c_close.png"></div></div></li>');
                        var html  = $('<li><div class="add_photo_img"><div class="comm_close "></div></div></li>');
                        var imgWrap = html.find(".add_photo_img");

                        html.insertBefore(t.listContainer.find(".clear"));

                        var close = html.find(".comm_close");
                        close.on("click", function () {     // 移除 此图片

                        		$(this).parent().parent().remove();
                            t.limitNum++;
                            t.updateNum();

                            t.opts.onSizeChange && t.opts.onSizeChange(t.limitNum<t.opts.limit);
                            input.val("");
                        });



                        $.imageFileVisible({           // 显示预览
                            wrapSelector: imgWrap,
                            fileSelector: input
                        });

                        // 将 当前浏览图片按钮 移入刚刚上传的图片中。

                        input.appendTo(imgWrap).hide();
                        t.bindDomObj();
                        t.limitNum--;
                        t.listContainer.show();
                        t.opts.onSizeChange && t.opts.onSizeChange(t.limitNum<t.opts.limit);
                        t.updateNum();

                    }
                }
            });

        },
        bindRmoteUpload: function () {
            var t = this;
            _DomObj.html("<input type='file' name='file' id='removeablePicBtn' /> ");

            var input = _DomObj.find("input");
            czyx.uploadReplace('#removeablePicBtn', {
                url: "/call/comm/upload_attachment/upload/?_=" + Math.random(), //文件处理的URL,
                data: {paramJson: $.toJSON({imageType: "5", domain: "www.allinmd.cn"})},
                uploadReplaceCss: {
                    //设置上传按钮图片
                    //background: 'url(' + picpath + ') center no-repeat',
                    //backgroundSize: '100%',
                    width: "50",             //上传按钮的宽度
                    height: "16",              //上传按钮的高度
                    lineHeight: "12px",              //上传按钮的高度
                    marginRight: "10px",
                    marginTop: "10px",
                    top: 0,
                    right:0
                },
                html:t.opts.html,      // 替换后的DOM代码
                uploadInputCss: {
                    width: "50",             //上传按钮的宽度
                    height: "16",             //上传按钮的高度
                    padding: "0",
                    top: 0,
                    right:0
                },
                uploadBefore: function () {
                    var fileSize = comm.file.getFileSize(document.getElementById("removeablePicBtn"));
                    if (fileSize > 5242880) {
                        alert('图片不能大于' + 5242880 / 1048576 + "M");
                        return false;
                    }
                    if (!/\.((jpg)|(gif)|(png))$/i.test(this.value)) {
                        alert('只允许上传.jpg .gif .png类型的图片文件');
                        return false;
                    }

                    var html =  $('<li><div class="add_photo_img"><div class="c_close comm_close"></div></div></li>');

                    html.insertBefore(t.listContainer.find(".clear"));

                    t.listContainer.show();
                },
                uploadEnd: function (serverJson) {//上传完毕后调用

                    try {
                        serverJson = $.parseJSON(serverJson);
                        if (serverJson && serverJson.responseObject && serverJson.responseObject.responseMessage.url != "") {
                            var pk = serverJson.responseObject.responsePk;
                            t.imgPkList[pk] = "";
                            var html = t.listContainer.find("li:last");

                            var close = html.find(".c_close");
                            close.on("click", function () {     // 移除 此图片
                                var pk = $(this).parent().attr("pk");
                                delete t.imgPkList[pk];
                                $(this).parent().parent().remove();
                                t.limitNum++;
                                t.updateNum();
                                t.opts.onSizeChange && t.opts.onSizeChange(t.limitNum<t.opts.limit);
                                input.val("");
                                t.updatePk();
                            });

                            html.find(".add_photo_img").append("<img src='" + serverJson.responseObject.responseMessage.url +"' />").attr("pk",pk);

                            t.bindDomObj();
                            t.limitNum--;


                            t.updateNum();

                            t.bindRmoteUpload();
                            t.updatePk();
                            t.opts.onSizeChange && t.opts.onSizeChange(t.limitNum<t.opts.limit);
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
        removePic: function (obj) {
            var t = this;
            $(obj).parent().remove();
            t.limitNum++;
            t.updateNum();
        },
        updateNum: function () {
            var t = this;

            t.listContainer.find(".hn_add").text('还能添加'+ t.limitNum+'张').show();
            if(t.limitNum === t.opts.limit){
            	//t.listContainer.hide();

            }
            if(t.limitNum==0){
                _DomObj.find("input").hide();
                _DomObj.on("vclick", function () {
                    comm.attention("您最多只能上传" + t.opts.limit + "张照片", $("#index"),"我知道了");
                });
            }else{
                _DomObj.find("input").show().css("top",0);
                _DomObj.off("vclick");
            }
        },
        updatePk: function () {
            var t = this;
            var pks = [];
            for(var key in t.imgPkList){
                pks.push(key);
            }
            t.listContainer.find(".imgPkList").val(pks);
        }

    };

    controller.init();
    return {getPics:controller.getPics};


};
