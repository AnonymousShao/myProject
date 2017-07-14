/**
 * 功能描述：帮助与反馈列表js
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by ZhangHongda on 2017/03/02
 */
$(function () {
    comm.pcSideModule([{
        item: "",
        href: "",
        active: false,
    }, {
        item: "",
        href: "",
        active: false,
    }, {
        item: "",
        href: "",
        active: false,
    }]);
    $(".Ev-sidebarHelp").removeClass('active').last().addClass('active');

    var con = {
        param:{
            imgId:0,
        },
        init:function(){
            var t = this;
            t.IteCli();
            t.btnCli();
        },
        IteCli:function(){
            var t = this;
            $(".helpFeedbackItem").on("click",function(e){
                var html = "";
                e = e||window.event;
                $(this).parents('li').find(".feedbackAswer .Isfeedback").remove();
                $(this).parents('li').find(".feedbackAswer .ev-feedbackThanks").remove();
                if($(this).attr("data-open")==="0"){
                    $(this).attr("data-open",1);
                    $(this).children("span").animate({fontSize: 18}, 300);
                    $(this).parent("li").addClass("active");
                    $(this).next(".feedbackAswer").removeClass("none");
                    html = '<div class="Isfeedback">'+
                        '<div class="feedbackAswerText ">以上信息是否解决了您的问题？</div>'+
                        '<div class="feedbackBtn">'+
                        '<button>是</button>'+
                        '<button>否</button>'+
                        '</div>'+
                        '</div>'+
                        '<div class="feedbackAswerText ev-feedbackThanks none">感谢您的反馈！</div>';
                    $(this).next(".feedbackAswer").append(html);
                    $(this).next(".feedbackAswer .Isfeedback").removeClass("none");
                    $(this).next(".feedbackAswer .ev-feedbackThanks").addClass("none");
                }else{
                    $(this).attr("data-open",0);
                    $(this).children("span").animate({fontSize: 16}, 300);
                    $(this).parent("li").removeClass("active");
                    $(this).next(".feedbackAswer").addClass("none");
                    $(this).next(".feedbackAswer .ev-feedbackThanks").addClass("none");
                    $(this).parent().find(".myFeedback").addClass("none");
                }
            })
        },
        //按钮是否的点击
        btnCli: function () {
            var t = this;
            var html = '';
            $(".feedbackAswer").on("click",".feedbackBtn button", function () {
                if($(this).text()=="是"){
                    $(this).parent().parent(".Isfeedback").addClass("none");
                    $(this).parent().parent().next(".ev-feedbackThanks").removeClass("none");
                }else{
                    t.param.imgId = "",
                    html = '<div class="myFeedback">'+
                        '<header>请输入您要反馈的内容：</header>'+
                        '<textarea placeholder="">'+
                        '</textarea>'+
                        ' <div class="uploadPhotoButton">'+
                        '<div class="uploadPhoto"><i></i><span>上传图片</span>'+
                        '<figure class="yd-loading"><img src="/image/personal/loading_big@2x.png" alt=""></figure>'+
                        '<form class="uploadIcon uploadPic" method="POST" enctype="multipart/form-data"><input type="file" class="postPicButton" name="file"></form></div>'+
                        '<div class="uploadBtn">'+
                        '<button class="submit">提交</button>'+
                        '</div>'+
                        '</div>'+
                        '</div>',
                    $(this).parent().parent().parent().parent().append(html);
                    $(this).parent().next(".Isfeedback").addClass("none");
                    $(this).parent().parent().addClass("none");
                    t.imgLoad();
                    t.submit();
                }
            })
        },
        imgLoad:function () {
            var t=this;
            $(".uploadPhotoButton .postPicButton").unbind("change").bind("change", function () {
                var fileText = $(this).val().split('.')[1].toUpperCase();
                if (fileText == "BMP" ||fileText == "PNG" || fileText == "GIF" || fileText == "JPG"|| fileText == "JPEG") {
                    var browser=commLog.getBrowserInfo();
                    var verinfoNum='';
                    var verinfo=''
                    if(browser){
                        verinfoNum = (browser + "").replace(/[^0-9.]/ig, "");
                        verinfo = (browser + "").replace(/[^a-zA-Z]/ig, "")+','+verinfoNum;
                    }
                    if(verinfo=='msie,8.0'){
                        var postData = {
                            "imageType": "2",
                            "visitSiteId": "13"
                        };
                        postData = {paramJson: $.toJSON(postData)};
                        $('.yd-loading').addClass('show');
                        $(this).parent().ajaxSubmit({
                            url: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/",
                            dataType: 'text',
                            data: postData,
                            type: "post",
                            clearForm: true,
                            success: function (data) {
                               t.uploadImg(data);
                            },
                            error: function () {

                            }
                        });
                    }else {
                        $('.yd-loading').addClass('show');
                        var fileSize = (this.files[0].size)/1048576;
                        if (fileSize < 5 ) {
                            var postData ={
                                "imageType": "6",
                                "visitSiteId": "13"
                            };
                            postData = {paramJson:$.toJSON(postData)};
                            $(this).parent().ajaxSubmit({
                                url: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/",
                                dataType: 'text',
                                data: postData,
                                type: "post",
                                clearForm: true,
                                success: function (data) {
                                    t.uploadImg(data);
                                },
                                error: function () {

                                }
                            });
                        } else {
                            popup({
                                // "hasImg":false,
                                "text": "图片不能大于5MB"
                            });
                            // alert("图片不大于50MB。");
                        }
                    }
                } else {
                    popup({
                        // "hasImg":false,
                        "text": "图片限于bmp,png,gif,jpg,jpeg格式"
                    });
                    // alert("图片限于bmp,png,gif,jpg格式");

                }
            })
        },
        uploadImg:function (data){
            var t = this;
            $('.yd-loading').removeClass('show');
            var resultStr = $.parseJSON(data.replace(/<.*?>/ig,""));
            if(resultStr.responseObject.responseStatus){
                t.param.imgId = resultStr.responseObject.responsePk;
                var imgSrc = resultStr.responseObject.responseMessage.url;
                $('.uploadPhoto').attr('attPath', resultStr.responseObject.responseMessage.path);
                $('.uploadPhoto i').css({
                    "background": "transparent url(" + imgSrc + ") center center no-repeat",
                    "background-size": "100% 100%"
                })
            }else {

            }
        },
        //提交按钮
        submit: function () {
            var t = this;
            $(".feedbackAswer").parent().find(".submit").on("click",function(){
                var that=$(this);
                var thisTextarea=$(this).parents('.myFeedback').find('textarea').val();
                var uploadPhotoButton=$(this).parents('.uploadPhotoButton').find('.uploadPhoto i').css('background-image').replace('url("', '').replace('")', '');
                if(uploadPhotoButton.indexOf('help/add_pic.png')!=-1&&!thisTextarea){
                    return;
                }
                $.ajax({
                    type: 'post',
                    url: "//www.yi-ding.net.cn/call/yiding/customer/suggestion/create/",
                    data: {paramJson: $.toJSON({
                        "customerId":localStorage.getItem("userId"),
                        "siteId":"13",
                        "systemVersion":"1.1.3",
                        "equipmentVersion":"",
                        "visitSiteId":"13",
                        "networkEnvironment":"",
                        "suggestion":thisTextarea,
                        "suggestionStatus":"0",
                        "uploadType":0,
                        "imageId": t.param.imgId,

                    })},
                    dataType: "json",
                    jsonp: "callback",
                    success: function (data) {
                        comm.loading.hide();
                        if (data) {
                            if(data.responseObject.responseStatus){
                                that.parents('.myFeedback').addClass("none");
                                that.parents('li').find('.feedbackAswer .ev-feedbackThanks').removeClass("none");
                            }
                        }
                    },
                    error: function (data) {

                    },
                    beforeSend: function () {
                        comm.loading.show();
                    },
                });
            })
        },
    }
    con.init();
});




