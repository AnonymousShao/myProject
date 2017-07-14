$(function () {
    // FastClick加载
    if (typeof FastClick == "function") {
        FastClick.attach(document.body); //防止点击事件点透

    }
    comm.pcSideModule([{
        item: "首页",
        href: "//www.yi-ding.net.cn/",
        active: true
    }, {
        item: "课程",
        href: "//www.yi-ding.net.cn/pages/curriculum/curriculum.html",
        active: false
    }, {
        item: "习题",
        href: "//www.yi-ding.net.cn/pages/category/question.html",
        active: false
    }, {
        item: "",
        href: "",
        active: false
    }]);
    var isIndex = /\S*\index.html$/.test(window.location.href);
    var mainLeftList = $('.al-mainSidebarList .al-mainSidebarItem').eq(0);
    if (isIndex) {
        mainLeftList.addClass('active');
    } else {
        mainLeftList.removeClass('active');
    }
    comm.pcFooterModule();
    comm.hoverSidebarChange();
    //初始化头部栏登录注册功能
    if(pcOrH5.pc()){
        loginAbout.init({
            loginPass: function () {
                location.reload();
            }, registerPass: function () {
                location.reload();
            }
        });
    }
    //提交反馈
    submitSuggestion();
    //消息数量
    if (localStorage.getItem('userId')) {
        msgNum();
    }

    function submitSuggestion() {
        var that = this;
        this.suggestion = "//www.yi-ding.net.cn/call/yiding/customer/suggestion/create/";
        $("#suggestion").on('click', function (event) {
            event.preventDefault();
            $(".yd-suggestionBox").show();
        });
        $(".yd-suggestionBoxClose").on('click', function (event) {
            event.preventDefault();
            $(".yd-suggestionBox").hide();
        });
        $("#Ev-suggestionText").on("keyup", function () {
            var tips = $(this).parent().find('span');
            tips.text($(this).val().length);
            if ($(this).val().length >= 450) {
                tips.show();
            } else {
                tips.hide();
            }
            if ($(this).val().length >= 500) {
                $(this).val($(this).val().substring(0, 500));
            }
        });
        $(".yd-suggestionBtn button").on("click", function () {
            var text = $("#Ev-suggestionText").val();

            if (text.length === 0) {
                return;
            } else {
                $.ajax({
                    url: that.suggestion,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            "customerId": localStorage.getItem('userId'),
                            "siteId": "13",
                            "visitSiteId": "13",
                            "suggestion": $("#Ev-suggestionText").val(),
                            "suggestionStatus": "0"
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        if (data.responseObject.responseStatus) {
                            popup({
                                text: "提交成功"
                            })

                        } else {
                            popup({
                                text: "提交失败"
                            })
                        }
                        $("#Ev-suggestionText").val("");
                        $(".yd-suggestionBox").hide();
                        comm.loading.hide();
                    })
                    .fail(function () {
                        comm.loading.hide();
                    });
            }
        })
    }

    function msgNum() {
        $.ajax({
            url: '//www.yi-ding.net.cn/call/yiding/customer/message/getMapCount/',
            type: 'get',
            dataType: 'json',
            data: {
                paramJson: $.toJSON({
                    customerId: localStorage.getItem('userId')
                })
            },
            timeout: 10000,
            beforeSend: function () {
                comm.loading.show();
            }
        })
            .done(function (data) {
                if (!$.isEmptyObject(data.responseObject.responseData)) {
                    var dataList = data.responseObject.responseData.data_list[0];
                    $(".Ev-sidebarMessage").append("<span class='yd-newsNum'>" + (parseInt(dataList.totalNum) > 99 ? '...' : dataList.totalNum) + "</span>");

                }
                comm.loading.hide();
            })
            .fail(function () {
                comm.loading.hide();
            });

    }
});