/**
 * Created by ALLIN on 2016/12/2.
 */
/**
 * Created by ALLIN on 2016/11/28.
 */
var creatCarousel2 = {};
creatCarousel2 = {
    creatHtml: function(data) {
        var that=this;
        $('.swiper-wrapper').width(700);
        $('.swiper-container').width(700);
        that.elseClick();
        that.creatSwitch(data);
    },
    creatSwitch: function(data) {
        var that=this;
        for(var i = 0; i < data.length; i++) {
            if(i == 0) {
                var span = $("<span class='swiper-pagination-switch swiper-visible-switch swiper-active-switch'><img/></span>");
                $(".pagination").append(span);
            } else {
                var span = $("<span class='swiper-pagination-switch swiper-visible-switch'><img/></span>");
                $(".pagination").append(span);
            }
            span.find('img').attr('src', data[i].src);
        }
        var nowIndexNum2 = creatCarousel2.GetQueryString("index");
        that.rightAddClass(nowIndexNum2, data);
        that.bigImg(nowIndexNum2 - 1, data);
        that.moveImg(nowIndexNum2, data.length);
        $('.yd-discussarrow-left').on('click', function() {
            that.leftClick(data);
        })

        $('.yd-discussarrow-right').on('click', function() {
            that.rightClick(data);
        });

        $(".swiper-pagination-switch").unbind("click").bind("click", function() {
            nowIndexNum2 = $(this).index() + 1;
            that.moveImg(nowIndexNum2,data.length);
            for(var i = 0; i < data.length; i++) {
                $('.swiper-pagination-switch').removeClass('swiper-active-switch');
            }
            $(this).addClass('swiper-active-switch');
            $(".swiper_top_left").text(nowIndexNum2 + "/" + (data.length));
            that.bigImg(nowIndexNum2 - 1, data);
        })
        $('.yd-discusstop_left').on('click', function() {
            that.leftClick(data);
        })

        $('.yd-discusstop_right').on('click', function() {
            that.rightClick(data);
        });
    },
    elseClick: function() {
        $(".swiper-container").mouseover(function() {
            $(".yd-discussarrow-left").css("display", 'block');
            $(".yd-discussarrow-right").css("display", 'block');
        })
        $(".swiper-container").mouseout(function() {
            $(".yd-discussarrow-left").css("display", 'none');
            $(".yd-discussarrow-right").css("display", 'none');
        })
    },
    bigImg: function(index, data) {

        $('.swiper-wrapper img').attr('src', data[index].src);
    },
    moveImg: function (index) {
        if(index > 6) {
            $(".pagination").css({
                left: -105 * (index - 6),
                transition: "all 1s"
            })
        } else {
            $(".pagination").css({
                left: 30,
                transition: "all 1s"
            })
        }
    },
    viewMoveImg: function(index, len) {
        if(index == len - 1 || index == len) {
            $('.swiper-pagination-switch').eq(len - 1).css({
                left: 0
            })
            index = 0;
        } else {
            $('.swiper-pagination-switch').eq(len - 1).css({
                left: (index - 1) * 105 + 125
            })
        }
    },
    rightAddClass: function(index, data) {
        for(var i = 0; i < data.length; i++) {
            $('.swiper-pagination-switch').removeClass('swiper-active-switch');
        }
        $('.swiper-pagination-switch').eq(index - 1).addClass("swiper-active-switch");
    },
    leftClick: function(data) {
        var that=this;
        nowIndexNum2 = $(".swiper-active-switch").index() + 1;
        nowIndexNum2--;
        if(nowIndexNum2 > 0) {
            that.rightAddClass(nowIndexNum2, data);
            that.moveImg(nowIndexNum2,data.length);
            that.bigImg(nowIndexNum2 - 1, data);
        }
    },
    rightClick: function(data) {
        var that=this;
        nowIndexNum2 = $(".swiper-active-switch").index() + 1;
        nowIndexNum2++;
        if(nowIndexNum2 <= data.length) {
            that.rightAddClass(nowIndexNum2, data);
            that.moveImg(nowIndexNum2,data.length);
            that.bigImg(nowIndexNum2 - 1, data);
        }
    },
    GetQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    init:function(){
        var that=this;
        var discussid=that.GetQueryString("caseId");
        var postData = {
            "attUseFlag":"16",
            "reviewId":discussid
        };
        postData = {"paramJson": $.toJSON(postData)};
        $.ajax({
            url: "//www.yi-ding.net.cn//call/customer/review/json_list_att/",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: postData,    //参数值
            type: "POST",   //请求方式
            beforeSend: function() {
                //请求前的处理
                comm.loading.show();
            },
            success: function(req) {
                //请求成功时处理
                var imgJson = {};
                imgJson.imgData = [];
                if(req.responseObject.responseStatus){
                    comm.loading.hide();
                    for(var attachNum = 0;attachNum<req.responseObject.responseData.data_list.length;attachNum++){
                        imgJson.imgData[attachNum] = {};
                        imgJson.imgData[attachNum].time = req.responseObject.responseData.data_list[attachNum].uploadTime;
                        imgJson.imgData[attachNum].name = "";
                        imgJson.imgData[attachNum].src =req.responseObject.responseData.data_list[attachNum].reviewAttUrl.split('_t')[0]+'.jpg';
                    }
                    that.creatHtml(imgJson.imgData,creatCarousel2.GetQueryString("index"));
                }

            },
            complete: function() {
                //请求完成的处理
            },
            error: function() {
                //请求出错处理
            }
        });
    }
};
$(document).ready(function(){
    creatCarousel2.init();
});
