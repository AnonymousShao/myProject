/**
 * 功能描述：  个人中心首页
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/11.
 *
 * Update by Zhanghongda on 2017/02/05.
 */



$(function () {
    var PersonalIndex = function () {
        var that = this;
        this.XHRList = {
            msgRatio: "//www.yi-ding.net.cn/call/customer/video/play/getProgressByCustomerId/", //学习进度
            classRate: "//www.yi-ding.net.cn/call/customer/video/play/getProgressByCustomerId/", //课程进度
            baseMsg: "//www.yi-ding.net.cn/call/yiding/web/user/getMapById/" ,//基本信息
            emailMag:"//www.yi-ding.net.cn/call/yiding/web/user/getAbstractById/",//获取用户邮箱是否验证
            validateCode: "//www.yi-ding.net.cn/call/yiding/customer/send/code/create/", //短信验证码
        };
    };

    PersonalIndex.prototype = {
        init: function () {
            commLog.createBrowse(42,'我的-用户主页',window.location.href);
            if (!localStorage.getItem('userId')) {
                $("#Ev-learnHistoryEntry").attr("href", "javascript:void(0)");
                $("#Ev-learnHistoryEntry").parent().addClass('off');
                loginAbout.login.init({
                    "ele": $(".yd-personalLoginBtn"),
                    success: function () {
                        window.location = "personal_index.html";
                    },
                });
            }
            this.emailMsg();//验证邮箱
            this.layout();
            this.raderChartData();
            this.basePeronalMsg();
            this.headImgUploader();
            comm.pcSideModule([{
                item: "",
                href: "",
                active: false
            }, {
                item: "",
                href: "",
                active: false
            }, {
                item: "",
                href: "",
                active: false
            }]);
            $(".al-mainSidebarItem").removeClass('active');
            //设置页的跳转
            $(".setting").on("click", function () {
                window.location.href = '//www.yi-ding.net.cn/pages/personal/personal_setting.html?sourceType=42';
                commLog.creatEvent({"id":139,"url":window.location.href,"keyword":"个人资料编辑设置","browseType":"42"});
            });
            //跳转资料编辑页
            $(".contentInner").on("click",".btn-personalIntro", function () {
                window.location.href = '//www.yi-ding.net.cn/pages/personal/personal_introConfig.html?sourceType=42';
                commLog.creatEvent({"id":140,"url":window.location.href,"keyword":"个人资料编辑","browseType":"42"});
            });
        },
        template: {
            classRate: function (dataArr, title, ratio) {
                return '<article class="yd-personalClassItem open">' +
                    '<h2>' + title + '<span>' + ratio + "%" + '</span></h2>' +
                    '<article class="yd-personalClassSecondItem">' +
                    (function (data) {
                        var list = '';
                        $(data).each(function (index, el) {
                            list += '<a>' + el.seriesTitle + '<span>' + (isNaN(el.playTime / el.totalTime) ? '0%' : (el.playTime / el.totalTime * 100).toFixed(2) + '%') + '</span></a>';
                        });
                        return list;
                    })(dataArr) +
                    '</article>' +
                    '</article>';

            },
            baseMsg: function (msgData) {
                $(".yd-personalImg>img").attr("src", msgData.customerLogoUrl);

                return '<figcaption class="yd-personalBaseMessage">' +
                    '<h2><span>' + msgData.customerName + '</span>'+(msgData.state == 1 || msgData.state == 2 ? '<i class="icon-vip"></i>' : '')+'</h2>' +
                    '<p>' +
                    '<span>' + msgData.roleName + '</span>' +
                    '<span>' + msgData.companyName + '</span>' +
                    '</p>' +
                    (function (status) {
                        if (parseInt(status) === 0) {
                            return '<div class="btn-personalIntro yd-personalIntroPerfect" style="cursor: pointer"><i class="icon-introPerfect"></i><span>完善简介</span></div>';
                            //return '<a href="personal_introConfig.html?sourceType=42" class="btn-personalIntro yd-personalIntroPerfect"><i class="icon-introPerfect"></i><span>完善简介</span></a>';
                        } else {
                            return '<div class="btn-personalIntro yd-personalIntroConfig" style="cursor: pointer"><i class="icon-introPerfect"></i><span>编辑资料</span></div>';
                            //return '<a class="btn-personalIntro yd-personalIntroConfig"><i class="icon-introPerfect"></i><span>编辑资料</span></a>';
                        }
                    })(msgData.abstractState) +
                    '</figcaption>';
            }
        },
        //判断是否要显示pc顶部邮箱验证提示
        emailMsg: function () {
            if(localStorage.getItem('userId')){
                var that = this;
                $.ajax({
                    url: this.XHRList.emailMag,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            customerId: localStorage.getItem('userId'),
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                .done(function (data) {
                    var email = data.responseObject.responseData;
                    if(email.data_list[0]){
                        if(email.data_list[0].isCheckEmail==0&&email.data_list[0].email){
                            $(".yd-personalUserNoQualification").show();
                            $(".al-personalUserEmail").text(email.data_list[0].email);

                            function send(){
                                $("#mValidEmailResendBtn").off('click').on('click',function(){
                                    $(".yd-personalUserNoQualification article").text("已经将邮件发送至邮箱，请在邮件中确认。");
                                    $(".yd-personalUserNoQualification article").append('<i class="al-close test_mail_close"><img src="/image/personal/close.png"></i>');
                                    $(".al-close").on("click",function(){
                                        $(".yd-personalUserNoQualification").hide();
                                    })
                                    $.ajax({
                                        url: that.XHRList.validateCode,
                                        type: 'POST',
                                        dataType: 'json',
                                        data: {
                                            paramJson: $.toJSON({
                                                "typeId": 2,
                                                "account": email.data_list[0].email,
                                                "codeLength": 4,
                                                "accountType": 1,
                                                visitSiteId:13,
                                                customerId:localStorage.getItem('userId')
                                            })
                                        },
                                        timeout: 10000,
                                        beforeSend: function () {
                                            comm.loading.show();
                                        },
                                        success:function(data){
                                            comm.loading.hide();
                                            if(data){
                                                //console.log(data);
                                            }
                                        },
                                        error:function(data){
                                            // console.log("Error...");
                                            comm.loading.hide();
                                        },
                                    })
                                });
                            }
                            send();//点击发送
                            function close(){
                                $('.test_mail_close').off('click').on('click', function () {
                                    $(".yd-personalUserNoQualification").hide();
                                })
                            }
                            close();//关闭提示
                            function here(){
                                $("#mValidEmailChangeEmailBtn").off('click').on('click', function () {
                                    window.location.href = '//www.yi-ding.net.cn/pages/personal/personal_setting.html?sourceType=42';
                                    //sessionStorage.setItem("email",1);
                                })
                            }
                            here();//点击这里进入设置
                        }else{
                            $(".yd-personalUserNoQualification").hide();
                        }
                    }
                })
                .fail(function () {
                    //console.log("XHR Error...");
                    comm.loading.show();
                });
            }
        },
        // 布局
        layout: function () {

            if (!comm.isPC()) {
                $(window).scroll(function () {
                    var h = $(".yd-personalHeader").height();
                    var eH = $(".yd-personalEntry").height();
                    if ($(window).scrollTop() > h + eH) {
                        $(".yd-personalScrollHead").addClass('show');
                    } else {
                        $(".yd-personalScrollHead").removeClass('show');
                    }
                });
            }

            if (!localStorage.getItem("userId")) {
                $(".yd-noContentTips").show();
                $(".yd-personalScrollHead").hide();
                $(".yd-personalMessageRatio").hide();
                $(".yd-personalClassRatio").hide();
                $('.yd-personalHeader').addClass('yd-personalNoLogin');
            } else {
                $(".yd-noContentTips").hide();
                $(".yd-personalScrollHead").show();
                $(".yd-personalMessageRatio").show();
                $(".yd-personalClassRatio").show();
                $('.yd-personalHeader').removeClass('yd-personalNoLogin');

            }
        },
        // 头部 基本信息
        basePeronalMsg: function () {
            var that = this;
            $.ajax({
                url: this.XHRList.baseMsg,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        customerId: localStorage.getItem('userId'),
                        visitSiteId: "13"
                    })
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {
                    // console.log("success");
                    if (!$.isEmptyObject(data.responseObject)) {
                        // 无个人信息&id错误 即NO DATA
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.data_list;
                            $(dataList).each(function (index, el) {
                                console.log(el)
                                $('.yd-personalHeader').append(that.template.baseMsg(el));
                                if (el.state == 1 || el.state == 2) {

                                } else if (el.state == 0 || el.state == 4) {
                                    // $(".yd-personalHeader").addClass('yd-personalNoLogin');
                                    // $(".yd-personalLoginBtn").text("去认证");
                                    $(".yd-personalIntroPerfect").hide();
                                    $(".yd-personalLoginBtn").hide();
                                    $(".yd-personalLoginBtn").on("click", function () {
                                        comm.alertBox({
                                            title: "我们已收到您的认证资料，审核周期3-5个工作日，请耐心等待！谢谢您的配合",
                                            ensure: "好的"
                                        })
                                    });
                                } else {
                                    $(".yd-personalHeader").addClass('yd-personalNoLogin');
                                    $(".yd-personalLoginBtn").text("去认证");
                                    $(".yd-personalLoginBtn").on("click",function(){
                                        commLog.creatEvent({"id":15,"url":window.location.href,"keyword":"认证进入","browseType":"14","browseTypeSourceUrl":window.location.href});
                                        console.log(el)
                                        authentication.init({
                                            "type": "trigger",
                                            success: function () {
                                                authentication.exit();
                                                history.go(0);
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR Error...");
                    comm.loading.hide();
                });

        },
        // 雷达图 Canvas加载
        raderChartInit: function (msg) {
            var that = this;
            var canvas = document.getElementById("myChart");
            $(".yd-personalRaderItem").each(function (index, el) {
                $(el).text(msg.title[index]);
                $(el).attr("data-id", msg.id[index]);
                $(el).attr("data-ratio", msg.ratio[index]);
                $(el).attr("data-title", msg.dTitle[index]);
                msg.isJoin[index] == 0 ? $(el).addClass('off') : "";
            });
            if (navigator.appVersion.match(/8./i) == "8.") {
                //IE8版本——将调用Chart.js1.1.1版本
                var data = {
                    labels: "",
                    datasets: [{
                        fillColor: "rgba(255,168,0,0.4)",
                        strokeColor: "rgba(255,194,76,1)",
                        pointColor: "rgba(220,220,220,0)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "#fff",
                        data:msg.ratio,
                        borderColor: "rgba(255,194,76,1)", //覆盖区边框色
                    }]
                };

                var ctx = document.getElementById("myChart").getContext("2d");

                var myNewChart = new Chart(ctx).Radar(data, {
                    scaleOverlay:true,
                    scaleLineColor: "rgba(0,0,0,.1)",
                    pointLabelFontSize: 0,
                    scaleSteps:5,
                    scaleStepWidth : 20,
                    scaleStartValue:0,
                    datasetStroke: false,
                    pointDot: false,

                });

                var angle = 360 / msg.ratio.length;
                $(".yd-personalRaderItem").each(function (index, element) {
                    $(element).css("left", 340 + 250 * Math.sin((angle * index / 180) * Math.PI));
                    $(element).css("top", 250 - 220 * Math.cos((angle * index / 180) * Math.PI));
                });
                $(".yd-personalRaderItem").slice( msg.ratio.length,$(".yd-personalRaderItem").length).hide();
            } else {
                //现代浏览器版本——调用Chart.js 2.5版本
                var data = {
                    labels: msg.title,
                    datasets: [{
                        borderWidth: 1, //雷达线
                        pointRadius: 3, //交点圆心，0不显示
                        backgroundColor: "rgba(255,168,0,0.4)", //覆盖区背景
                        borderColor: "rgba(255,194,76,1)", //覆盖区边框色
                        data: msg.ratio,
                    }]
                };
                Chart.defaults.global.legend.display=false;
                var myRadarChart = new Chart(canvas, {
                    type: 'radar',
                    data: data,
                    options: {
                        scale: {
                            reverse: false, //不反转
                            fontColor: "#666", //标签文本色
                            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", //标签字体
                            fontSize: 24, //标签字号
                            gridLines: {
                                lineWidth: 1,//网格线宽
                                color: "#eeeeee",
                            },
                            ticks: {
                                beginAtZero: true, //刻度从0起始
                                max: 100, //最大最小值
                                min: 0,
                                stepSize: 20, //每一刻度值
                                fontSize: 0, //即不显示刻度
                                fontColor: "transparent"
                            },
                            pointLabels: {
                                fontSize: 0,
                                fontColor: "#555",
                                fontFamily: "'Microsoft YaHei','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

                            },
                            angleLines: {
                                lineWidth: 1,
                                color: "#eee"
                            }
                        },
                    },
                });

                var angle = 360 / msg.ratio.length;
                // console.log(angle)
                $(".yd-personalRaderItem").each(function (index, element) {
                    $(element).css("left", 340 + 250 * Math.sin((angle * index / 180) * Math.PI));
                    $(element).css("top", 250 - 220 * Math.cos((angle * index / 180) * Math.PI));
                });
                $(".yd-personalRaderItem").slice( msg.ratio.length,$(".yd-personalRaderItem").length).hide();
            }
            $(".yd-personalRaderItem").on('click', function (event) {
                event.preventDefault();
                if ($(this).hasClass('off')) {
                    return false;
                } else {
                    $(this).addClass("on").siblings().removeClass('on');
                    if (navigator.appVersion.match(/8./i) != "8.") {
                        var meta = myRadarChart.getDatasetMeta(0);
                        var index = parseInt($(this).attr("data-index"));
                        var x = parseInt(meta.data[index]._model.x);
                        var y = parseInt(meta.data[index]._model.y);
                        $(".yd-raderItemOnCircle").css({
                            top: y + 59 + "px",
                            left: x - 8 + "px",
                            display: "block"
                        });
                    }
                    that.classRateData({
                        id: $(this).attr("data-id"),
                        title: $(this).attr("data-title"),
                        ratio: $(this).attr("data-ratio")
                    });

                }
            });
        },
        // 雷达图 数据获取
        raderChartData: function () {
            var that = this;
            $.ajax({
                url: this.XHRList.msgRatio,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        "customerId": localStorage.getItem('userId'),
                        "visitSiteId": "13"
                    })
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {
                    // console.log("success");
                    if (!$.isEmptyObject(data.responseObject)) {
                        var raderMsg = data.responseObject.responseData.data_list,
                            obj = {
                                ratio: [],
                                title: [],
                                dTitle: [],
                                id: [],
                                isJoin: []
                            };

                        $(raderMsg).each(function (index, el) {
                            if (index >= 10) {
                                return;
                            }
                            obj.ratio.push(function () {
                                if (el.playTime == 0 && el.totalTime == 0) {
                                    return 0;
                                } else {
                                    if ((el.playTime / el.totalTime * 100) >= 100) {
                                        return 100;
                                    } else {
                                        return parseFloat((el.playTime / el.totalTime * 100).toFixed(2));
                                    }
                                }
                            }());
                            obj.title.push(el.seriesTitle.length > 4 ? el.seriesTitle.substring(0, 3) + '...' : el.seriesTitle);
                            obj.id.push(el.seriesId);
                            obj.dTitle.push(el.seriesTitle);
                            obj.isJoin.push(el.isJoin);
                        });
                    }
                    that.raderChartInit(obj);
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR Error...");
                    comm.loading.hide();
                });
        },
        // 课程进度
        classRateData: function (obj) {
            var that = this;
            $.ajax({
                url: this.XHRList.classRate,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        "customerId": localStorage.getItem("userId"),
                        "visitSiteId": "13",
                        "seriesIdList": obj.id
                    })
                },
                timeout: 10000
            })
                .done(function (data) {
                    // console.log("success");
                    $('.yd-personalClassRatio').children().remove();
                    var classList = data.responseObject.responseData.data_list;
                    $('.yd-personalClassRatio').append(that.template.classRate(classList, obj.title, obj.ratio));
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR Error...");
                    comm.loading.hide();
                });
        },
        // 头像上传
        headImgUploader: function () {
            $(".personal_sc_img_but_bg.p_s_l").on("click", function () {
                $(".yd-pcImgSelectorMask").hide();
            });
            $(".personal_sc_img_but_bg.p_s_r").on("click", function () {
                $(".yd-pcImgSelectorMask").hide();
            });
            if (comm.isPC()) {
                $("#Ev-headImgUploadBtn").selectCutUserPic({

                    callback: function (data) {

                        if (data.responseObject && data.responseObject.responseStatus && data.responseObject.responseMessage) {
                            $("#Ev-headImgUploadBtn>img").attr("src", data.responseObject.responseMessage.url);
                            $(".user-header").css("backgroundImage", "url('" + data.responseObject.responseMessage.url + "')");
                        }
                        popup({
                            text: '上传成功'
                        });
                    }
                });
            } else {
                $("#Ev-headImgUploadBtn").on("click", function () {
                    $(".yd-changeImg").show();
                });
                $(".Ev-uploadCancel").on('click', function () {
                    $(".yd-changeImg").hide();
                })
            }
        },
    };
    var personalIndex = new PersonalIndex();
    personalIndex.init();
});
