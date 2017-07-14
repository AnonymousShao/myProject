/**
 * 功能描述：  设置
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/23.
 *
 * Update by Zhanghongda on 2017/02/05.
 */
$(function () {
    var PersonalSetting = function () {
        var that = this;
        this.XHRList = {
            baseMsg: "//www.yi-ding.net.cn/call/yiding/web/user/getAbstractById/", //基本信息
            unBindWeixin: "//www.yi-ding.net.cn/call/yiding/interact/cancleBind/",//微信解绑
            allin: "//www.yi-ding.net.cn/call/yiding/web/user/bindAllin/", //绑定唯医
            update: "//www.yi-ding.net.cn/call/yiding/web/user/updateUniteInfo/", //修改手机/邮箱
            password: "//www.yi-ding.net.cn/call/yiding/web/user/update_passwd/", //修改密码
            validateCode: "//www.yi-ding.net.cn/call/yiding/customer/send/code/create/", //短信验证码
            validatePwd: "//www.yi-ding.net.cn/call/yiding/web/user/validatePassword/", //验证旧密码正确
            validateValidator: "//www.yi-ding.net.cn/call/yiding/customer/send/code/update/", //验证发送的验证码是否正确
            isExist: "//www.yi-ding.net.cn/call/yiding/web/user/isExist/", //邮箱/手机是否已有
            quit: "//www.yi-ding.net.cn/call/yiding/web/user/logout/"
        };
    };

    PersonalSetting.prototype = {
        init: function () {
            $('.yd-pageBackBtn').off('click').on('click',function () {
                commLog.creatEvent({"id":181,"url":window.location.href,"keyword":"设置页-返回","browseType":"52"});
            })
            commLog.createBrowse(52, '我的-设置页', window.location.href);
            comm.pcSideModule([{
                item: "",
                href: "",
                active: false
            }, {
                item: "",
                href: "",
                active: false,
            }, {
                item: "",
                href: "",
                active: false
            }]);
            this.getBindMsg();
            this.bindWeixin();
            this.changeAllinmdData();
            this.changeMobile();
            this.changeMailBox();
            this.changePwd();
            this.quitLogin();
            this.isEmail();
        },
        isEmail: function () {
            if(localStorage.getItem("userId")&&sessionStorage.getItem('email')==1){
                $(".Ev-bindMailBoxContent").show();
                this.changeMailBox();
            }
            sessionStorage.removeItem('email');
        },
        getBindMsg: function () {
            $.ajax({
                url: this.XHRList.baseMsg,
                type: 'POST',
                dataType: 'json',
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                },
                data: {
                    paramJson: $.toJSON({
                        customerId: localStorage.getItem("userId")
                    })
                },
            })
                .done(function (data) {
                    // console.log("success");
                    var msg = data.responseObject.responseData.data_list[0];
                    $("#allinAccount").val('');
                    $("#allinPwd").val('');
                    if (msg.mobile.length !== 0) {
                        $(".Ev-bindMobileContentNumber em").text(msg.mobile.substring(0, 3) + '****' + msg.mobile.substring(7, 11));
                        $(".Ev-bindMobileContentNumber button").text("更换");
                    }
                    if (msg.email.length !== 0) {
                        $(".Ev-bindMailBoxContentNumber em").text(msg.email.substring(0, 2) + '****' + msg.email.substring(msg.email.indexOf("@"), msg.email.length));
                        $(".Ev-bindMailBoxContentNumber button").text("更换");
                    }

                    if (msg.uniteFlagAllin == 1) {
                        if (msg.allinName.indexOf("@") == -1) {
                            $(".Ev-bindAllinmdContentNumber em").text(msg.allinName.substring(0, 3) + '****' + msg.allinName.substring(7, 11));
                        } else {
                            $(".Ev-bindAllinmdContentNumber em").text(msg.allinName.substring(0, 2) + '****' + msg.allinName.substring(msg.allinName.indexOf("@"), msg.allinName.length));
                        }
                        $(".Ev-bindAllinmdContentNumber button").remove().text("更换");
                    }

                    if (msg.uniteFlagWeixin == 1) {
                        $(".Ev-bindWeixin em").text('已绑定');
                        $(".Ev-bindWeixin button").attr('data-bind', 1).text("解绑");
                    } else {
                        $(".Ev-bindWeixin button").attr('data-bind', 0);
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                });

        },
        bindWeixin: function () {
            var that = this;
            var qr = "https://open.weixin.qq.com/connect/qrconnect?appid=wx3b347620d468cd89&" + "" +
                "redirect_uri=http%3a%2f%2fwww.yi-ding.net.cn%2fcall%2fyiding%2finteract%2fregistBind%2f" + "" +
                "?url=https://www.yi-ding.net.cn/pages/personal/personal_setting.html" + "" +
                "&response_type=code" +
                "&scope=snsapi_login" + "" +
                "&state=START" +
                "#wechat_redirect" + "" +
                "&customerId=" + localStorage.getItem("userId");
            var arr = qr.split("?");
            var obj = new WxLogin({
                id: "Ev-erweiCode",
                appid: arr[1].split("&")[0].split("=")[1],
                scope: arr[2].split("&")[2].split("=")[1],
                redirect_uri: encodeURIComponent(window.location.href),
                state: arr[2].split("&")[3].split("=")[1],
            });
            if (comm.getpara().state) {
                switch (parseInt(comm.getpara().state)) {
                    case 1:
                        popup({
                            text: "缺少参数..."
                        });
                        break;
                    case 2:
                        popup({
                            text: "该微信号已绑定过其它账号!"
                        });
                        break;
                    case 3:
                        popup({
                            text: "该账号已绑定过微信!"
                        });
                        break;
                    case 4:
                        popup({
                            text: "绑定失败..."
                        });
                        break;
                }
            }

            $(".Ev-bindWeixinContent").on('click', function () {
                if ($(this).text() == "解绑") {
                    $.ajax({
                        url: that.XHRList.unBindWeixin,
                        type: 'POST',
                        dataType: 'json',
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {
                            // console.log("success");
                            popup({
                                text: "解除绑定成功！"
                            })
                            $(".Ev-bindWeixin span em").text("未绑定");
                            $(".Ev-bindWeixinContent").text("绑定");
                            comm.loading.hide();
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });
                } else {
                    $(".ev-weixinPopWindow").show();
                }
            })


        },
        // 点击开始编辑信息/确认保存信息
        clickToConfigMsg: function (ele, callback) {
            var that = this;
            ele.on('click', function (event) {

                event.preventDefault();
                var box = $(this).parents(".yd-settingContentItem");
                box.find('.yd-detailedTableItem').show();
                box.find(".yd-personalAdviceCancel").off('click').on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    box.find('.yd-detailedTableItem').hide();
                    box.find('input').val('');
                    box.find(".yd-tableErrorTips").each(function (index, ele) {
                        that.hideErrorTips($(ele));
                    })
                });
                box.find(".yd-personalAdviceSubmit").off('click').on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    callback && callback();
                });
            });
        },
        // 验证手机
        validateMobile: function (value) {
            var mobileReg = /^(127|13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
            if (mobileReg.test(value)) {
                return true;
            } else {
                return false;
            }
        },
        // 验证邮箱
        validateMailbox: function (value) {
            var mailBoxReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (mailBoxReg.test(value)) {
                return true;
            } else {
                return false;
            }
        },
        // 发送短信验证码
        sendValidateCode: function (phone) {
            var number = phone,
                sendNum = 0,
                count = 60,
                that = this;
            this.vId = "";
            var data = {
                "typeId": 2,
                "account": $("#phone_number").val(),
                "codeLength": 4,
                "operateType": 1,
                "accountType": 0,
            };
            $.ajax({
                url: this.XHRList.validateCode,
                type: 'POST',
                dataType: 'json',
                data: {paramJson: $.toJSON(data)},
                async: false,
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {
                    // console.log("success");
                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        dataList = data.responseObject.responseData;
                        if (data.responseObject.responseStatus) {
                            comm.loading.hide();
                            var time = setInterval(function () {
                                count--;
                                $("#Ev-sendValidCode").text(count + "秒后重发");
                                $("#Ev-sendValidCode").attr("data-status", 1);
                                if (count == 0) {
                                    $("#Ev-sendValidCode").text("发送验证码");
                                    $("#Ev-sendValidCode").attr("data-status", 0);
                                    clearInterval(time);
                                    return;
                                }
                            }, 1000);

                            that.vId = data.responseObject.responsePk;
                            $(".Ev-validCodeError").removeClass('showIb').find("span").text('');
                        } else {
                            switch (data.responseObject.responseCode) {
                                case '0B0003':
                                    $(".Ev-validCodeError").addClass('showIb').find("span").text('您输入的账户不存在！');
                                    break;
                                case '0B0008':
                                    $(".Ev-validCodeError").addClass('showIb').find("span").text('您输入的账户当前失效！');
                                    break;
                                case 'ERR_001':
                                    $(".Ev-validCodeError").addClass('showIb').find("span").text('一天只能发送3次！');
                                    break;
                                case '10001':
                                    $(".Ev-validCodeError").addClass('showIb').find("span").text('短信内容为空！');
                                    break;
                                case 'SMS0002':
                                    $(".Ev-validCodeError").addClass('showIb').find("span").text('短信发送失败...');
                                    that.vId = data.responseObject.responsePk;
                                    break;
                            }

                            $("#Ev-sendValidCode").attr("data-status", false);
                        }
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("error");
                    comm.loading.hide();
                });
        },
        // 打印错误信息
        // 真不是懒，降低method颗粒度
        showErrorTips: function (ele, text) {
            ele.addClass('showIb').find('span').text(text);
        },
        // 隐藏错误信息
        hideErrorTips: function (ele) {
            ele.removeClass('showIb').find('span').text('');
        },
        // 绑定/解绑唯医
        changeAllinmdData: function () {
            var that = this;

            var number;
            if (number) {
                $(".Ev-bindAllinmdContentNumber em").text(number);
                $(".Ev-bindAllinmdConfig").text("更换");
            } else {
                $(".Ev-bindAllinmdContentNumber em").text('未绑定');
                $(".Ev-bindAllinmdConfig").text("绑定");
            }

            this.clickToConfigMsg($(".Ev-bindAllinmdConfig"), function () {
                if ($("#allinAccount").val().length === 0) {
                    that.showErrorTips($(".Ev-allinAccountErrorTips"), "请输入allin账号");
                } else {
                    if (!(that.validateMobile($("#allinAccount").val()) || that.validateMailbox($("#allinAccount").val()))) {
                        that.showErrorTips($(".Ev-allinAccountErrorTips"), "请输入正确的邮箱或手机号码");
                        return;
                    } else {
                        that.hideErrorTips($(".Ev-allinAccountErrorTips"));
                    }
                }

                if ($("#allinPwd").val().length === 0) {
                    that.showErrorTips($(".Ev-allinPwdErrorTips"), "请输入allin密码");
                } else {
                    that.hideErrorTips($(".Ev-allinPwdErrorTips"));
                }
                if ($("#allinAccount").val().length === 0 || $("#allinPwd").val().length === 0) {
                    return;
                }
                var data = {
                    "accountAllin": $("#allinAccount").val(),
                    "passwdAllin": $("#allinPwd").val(),
                    "customerId": localStorage.getItem("userId")
                };
                $.ajax({
                    url: that.XHRList.allin,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON(data)
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // console.log("success");
                        var msg = data.responseObject.responseMessage,
                            status = data.responseObject.responseStatus;
                        if (status) {
                            popup({
                                text: "绑定成功"
                            });
                            $(".Ev-bindAllinmdContent").hide();
                            if ($("#allinAccount").val().indexOf("@") == -1) {
                                $(".Ev-bindAllinmdContentNumber em").text($("#allinAccount").val().substring(0, 3) + '****' + $("#allinAccount").val().substring(7, 11));
                            } else {
                                $(".Ev-bindAllinmdContentNumber em").text($("#allinAccount").val().substring(0, 2) + '****' + $("#allinAccount").val().substring($("#allinAccount").val().indexOf("@"), $("#allinAccount").val().length));
                            }
                            $(".Ev-bindAllinmdContentNumber .btn-normal").text("更换");
                            $(".Ev-allinPwdErrorTips").css('display', "none").find("span").text('');
                        } else {
                            $(".Ev-allinPwdErrorTips").css('display', "inline-block").find("span").text(msg);
                        }
                        comm.loading.hide();
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });
        },
        // 绑定手机号码
        changeMobile: function () {
            var that = this;
            // 点击发送验证码...
            $("#Ev-sendValidCode").on('click', function (event) {
                if ($(this).attr('data-status') == 1) {
                    return;
                }
                if ($("#phone_number").val().length === 0) {
                    that.showErrorTips($(".Ev-mobilePhoneError"), "请输入手机号码");
                    return false;
                } else {
                    if (that.validateMobile($("#phone_number").val())) {
                        that.hideErrorTips($(".Ev-mobilePhoneError"));
                        if ($(this).attr('data-status')) {
                            event.preventDefault();
                            that.sendValidateCode();
                        } else {
                            return false;
                        }
                    } else {
                        that.showErrorTips($(".Ev-mobilePhoneError"), "请输入格式正确的号码");
                        return false;
                    }
                }
            });
            // 已发送，输入后点击保存...
            this.clickToConfigMsg($(".Ev-bindMobileConfig"), function () {
                var inputBox = $(".Ev-bindAllinmdContent");
                if ($("#phone_number").val().length === 0) {
                    that.showErrorTips($(".Ev-mobilePhoneError"), "请输入手机号码");
                    return;
                } else {
                    if (that.validateMobile($("#phone_number").val())) {
                        that.hideErrorTips($(".Ev-mobilePhoneError"));

                    } else {
                        that.showErrorTips($(".Ev-mobilePhoneError"), "请输入格式正确的号码");
                        return;
                    }
                }
                if ($("#validCode").val().length === 0) {
                    that.showErrorTips($(".Ev-validCodeError"), "请输入验证码");
                    return;
                } else {
                    that.hideErrorTips($(".Ev-validCodeError"));
                }
                if ($("#phone_pwd").val().length === 0) {
                    that.showErrorTips($(".Ev-mobilePhonePwdError"), "请输入当前密码");
                    return;
                } else if ($("#phone_pwd").val().length < 6 || $("#phone_pwd").val().length > 20) {
                    that.showErrorTips($(".Ev-mobilePhonePwdError"), "密码长度请保持在6-20位");
                    return;
                } else {
                    if (!(/^[0-9a-zA-Z]+$/.test($("#phone_pwd").val()))) {
                        that.showErrorTips($(".Ev-mobilePhonePwdError"), "密码不能包含特殊字符");
                        return;
                    } else {
                        that.hideErrorTips($(".Ev-mobilePhonePwdError"));
                    }
                }
                if ($("#phone_number").val().length === 0 || $("#validCode").val().length === 0) {
                    return false;
                }

                // 验证填写验证码是否正确...
                $.ajax({
                    url: that.XHRList.validateValidator,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            validCode: $("#validCode").val(),
                            id: that.vId,
                            isValid: "1"
                        })
                    },
                })
                    .done(function (data) {
                        // console.log("success");
                        if (data.responseObject.responseStatus) {
                            // 验证码正确，密码是否正确...
                            that.hideErrorTips($(".Ev-validCodeError"));
                            $.ajax({
                                url: that.XHRList.validatePwd,
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    paramJson: $.toJSON({
                                        passwd: $("#phone_pwd").val()
                                    })
                                },
                                timeout: 10000,
                                beforeSend: function () {
                                    comm.loading.show();
                                }
                            })
                                .done(function (data) {
                                    // console.log("success");
                                    if (data.responseObject.responseStatus) {
                                        that.hideErrorTips($(".Ev-mobilePhonePwdError"));
                                        //密码正确，手机号是否绑定过...
                                        $.ajax({
                                            url: that.XHRList.isExist,
                                            type: 'POST',
                                            dataType: 'json',
                                            data: {
                                                paramJson: $.toJSON({
                                                    account: $("#phone_number").val()
                                                })
                                            }
                                        })
                                            .done(function (data) {
                                                // console.log("success");
                                                if (data.responseObject.responseStatus) {
                                                    //验证全部通过，开始提交...
                                                    $.ajax({
                                                        url: that.XHRList.update,
                                                        type: 'POST',
                                                        dataType: 'json',
                                                        data: {
                                                            paramJson: $.toJSON({
                                                                customerId: localStorage.getItem("userId"),
                                                                mobile: $("#phone_number").val()
                                                            })
                                                        }
                                                    })
                                                        .done(function (data) {
                                                            // console.log("success");
                                                            if (data.responseObject.responseStatus) {
                                                                that.hideErrorTips($(".Ev-mobilePhoneError"));
                                                                popup({
                                                                    text: "绑定成功"
                                                                });
                                                                $(".Ev-bindMobileContentNumber em").text($("#phone_number").val().substring(0, 3) + '****' + $("#phone_number").val().substring(7, 11));
                                                                $(".Ev-bindMobileContent").hide();

                                                                $("#phone_pwd").val('');
                                                                $("#phone_number").val('');
                                                                $("#validCode").val('');

                                                                that.hideErrorTips($(".Ev-mobilePhonePwdError"));
                                                                that.hideErrorTips($(".Ev-validCodeError"));
                                                                that.hideErrorTips($(".Ev-mobilePhoneError"));
                                                            }
                                                        })
                                                        .fail(function () {
                                                            // console.log("XHR error...");
                                                        });
                                                } else {
                                                    that.showErrorTips($(".Ev-mobilePhoneError"), "该手机号已被绑定过");
                                                }
                                            })
                                            .fail(function () {
                                                // console.log("error");
                                            })

                                    } else {
                                        that.showErrorTips($(".Ev-mobilePhonePwdError"), "密码验证失败");
                                    }
                                })
                                .fail(function () {
                                    // console.log("XHR error...");
                                });
                        }
                        else {
                            that.showErrorTips($(".Ev-validCodeError"), "验证码错误...");
                        }
                        comm.loading.hide();
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });


            });
        },

        changeMailBox: function () {
            var that = this;
            var mailBox;

            if (mailBox) {
                $(".Ev-bindMailBoxContentNumber em").text(number);
                $(".Ev-bindMailBoxConfig").text("更换");
            } else {
                $(".Ev-bindMailBoxContentNumber em").text('未绑定');
                $(".Ev-bindMailBoxConfig").text("绑定");
            }
            this.clickToConfigMsg($(".Ev-bindMailBoxConfig"), function () {

                if ($("#email_upa").val().length === 0) {
                    that.showErrorTips($(".Ev-emailErrorTips"), "请输入邮箱");
                } else {
                    if (!(that.validateMailbox($("#email_upa").val()))) {
                        that.showErrorTips($(".Ev-emailErrorTips"), "请输入正确的邮箱");
                        return;
                    } else {
                        that.hideErrorTips($(".Ev-emailErrorTips"));
                    }
                }

                if ($("#email_upa").val().length === 0) {
                    return;
                }
                $.ajax({
                    url: that.XHRList.isExist,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            account: $("#email_upa").val()
                        })
                    },
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        if (data.responseObject.responseStatus) {
                            that.hideErrorTips($(".Ev-emailErrorTips"));
                            $.ajax({
                                url: that.XHRList.update,
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    paramJson: $.toJSON({
                                        customerId: localStorage.getItem("userId"),
                                        email: $("#email_upa").val()
                                    })
                                },
                                beforeSend: function () {
                                    comm.loading.show();
                                }
                            })
                                .done(function (data) {
                                    // console.log("success");
                                    if (data.responseObject.responseStatus) {
                                        that.hideErrorTips($(".Ev-emailErrorTips"));
                                        comm.alertBox({
                                            mTitle: "绑定成功！",
                                            title: "验证链接邮件已发送至邮箱，验证后能帮助你快速找回密码",
                                            ensure: "知道了"
                                        });


                                        that.hideErrorTips($(".Ev-emailErrorTips"));
                                        comm.loading.hide();
                                        $.ajax({
                                            url: that.XHRList.validateCode,
                                            type: 'POST',
                                            dataType: 'json',
                                            data: {
                                                paramJson: $.toJSON({
                                                    "typeId": 2,
                                                    "account": $("#email_upa").val(),
                                                    "codeLength": 4,
                                                    "accountType": 1,
                                                    visitSiteId:13,
                                                    customerId:localStorage.getItem('userId')
                                                })
                                            },
                                        })
                                            .done(function (data) {
                                                // console.log("success");
                                                $(".Ev-bindMailBoxContent").hide();
                                                $(".Ev-bindMailBoxContentNumber em").text($("#email_upa").val().substring(0, 2) + '****' + $("#email_upa").val().substring($("#email_upa").val().indexOf("@"), $("#email_upa").val().length));
                                                $("#email_upa").val('');
                                            })
                                            .fail(function () {
                                                // console.log("error");
                                            })
                                    } else {
                                        that.showErrorTips($(".Ev-emailErrorTips"), data.responseObject.responseMessage);
                                    }
                                })
                                .fail(function () {
                                    // console.log("XHR error...");
                                });
                        } else {
                            that.showErrorTips($(".Ev-emailErrorTips"), "该邮箱已绑定过");
                            comm.loading.hide();
                        }
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                    });

            });
        },
        // 修改密码
        changePwd: function () {
            var that = this;
            this.clickToConfigMsg($("#Ev-changePwdBtn"), function () {
                    if ($("#password").val().length === 0) {
                        that.showErrorTips($(".Ev-passwordErrorTips"), "请输入当前密码");
                        return;
                    } else if ($("#password").val().length < 6 || $("#password").val().length > 20) {
                        that.showErrorTips($(".Ev-passwordErrorTips"), "密码长度请保持在6-20位");
                        return;
                    } else {
                        if (!(/^[0-9a-zA-Z]+$/.test($("#password").val()))) {
                            that.showErrorTips($(".Ev-passwordErrorTips"), "密码不能包含特殊字符");
                            return;
                        } else {
                            that.hideErrorTips($(".Ev-passwordErrorTips"));
                        }
                    }

                    if ($("#newpassword").val().length === 0) {
                        that.showErrorTips($(".Ev-newpasswordErrorTips"), "请输入新密码");
                        return;
                    } else if ($("#newpassword").val().length < 6 || $("#password").val().length > 20) {
                        that.showErrorTips($(".Ev-newpasswordErrorTips"), "密码长度请保持在6-20位");
                        return;
                    }
                    if ($("#password").val() === $("#newpassword").val()) {
                        that.showErrorTips($(".Ev-newpasswordErrorTips"), "新密码请不要与旧密码一致");
                        return;
                    } else {
                        that.hideErrorTips($(".Ev-newpasswordErrorTips"));
                    }
                    if ($("#repassword").val().length === 0) {
                        that.showErrorTips($(".Ev-repasswordErrorTips"), "请重新输入新密码");
                        return;
                    } else if ($("#repassword").val().length < 6 || $("#password").val().length > 20) {
                        that.showErrorTips($(".Ev-repasswordErrorTips"), "密码长度请保持在6-20位");
                        return;
                    } else {
                        if (!(/^[0-9a-zA-Z]+$/.test($("#newpassword").val()))) {
                            that.hideErrorTips($(".Ev-repasswordErrorTips"));
                            that.showErrorTips($(".Ev-newpasswordErrorTips "), "密码不能包含特殊字符");
                            return;
                        } else {
                            if ($("#newpassword").val() !== $("#repassword").val()) {
                                that.showErrorTips($(".Ev-repasswordErrorTips"), "两次输入新密码不同");
                                return;
                            } else {
                                that.hideErrorTips($(".Ev-newpasswordErrorTips"));
                            }

                        }

                    }

                    if ($("#password").val().length === 0 || $("#newpassword").val().length === 0 || $("#repassword").val().length === 0) {
                        return false;
                    }
                    var data = {
                        "password": $("#password").val(),
                        "newpassword": $("#newpassword").val(),
                        "repassword": $("#repassword").val()
                    };
                    // 验证密码存在……
                    $.ajax({
                        url: that.XHRList.validatePwd,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON({
                                passwd: data.password
                            })
                        },
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {
                            // console.log("success");
                            if (data.responseObject.responseStatus) {
                                that.hideErrorTips($(".Ev-passwordErrorTips"));
                                $.ajax({
                                    url: that.XHRList.password,
                                    type: 'POST',
                                    dataType: 'json',
                                    data: {
                                        paramJson: $.toJSON({
                                            customerId: localStorage.getItem("userId"),
                                            passwd: $("#newpassword").val(),
                                        })
                                    },
                                })
                                    .done(function (data) {
                                        // console.log("success");
                                        if (data.responseObject.responseStatus) {
                                            setTimeout(function () {
                                                $(".ev-commTips").parent(".al-middleTipsBox").css("zIndex",0);
                                            },100);
                                            popup({
                                                text: "密码修改成功!"
                                            });
                                            setTimeout(function () {
                                                $(".ev-commTips").parent(".al-middleTipsBox").css("zIndex",-10);
                                            },2000);
                                            $(".Ev-bindPasswordContent").hide();
                                            $("#password").val('');
                                            $("#newpassword").val('');
                                            $("#repassword").val('');
                                            that.hideErrorTips($(".Ev-passwordErrorTips"));
                                            that.hideErrorTips($(".Ev-newpasswordErrorTips"));
                                            that.hideErrorTips($(".Ev-repasswordErrorTips"));
                                        }
                                    })
                                    .fail(function () {
                                        // console.log("error");
                                    })

                            }
                            else {
                                that.showErrorTips($(".Ev-passwordErrorTips "), data.responseObject.responseMessage);
                            }
                            comm.loading.hide();
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });
                }
            );
        },
        quitLogin: function () {
            var that = this;
            $(".yd-quitLogin").on("click", function () {
                $(".yd-alertModalMask").remove();
                comm.confirmBox({
                    title: '确定退出吗？',
                    content: '退出登录后，你将无法正常学习课程',
                    ensure: "退出登录",
                    cancel: "取消",
                    ensureCallback: function () {
                        commLog.creatEvent({"id":180,"url":window.location.href,"keyword":"设置页-退出登录","browseType":"52"});
                        $.ajax({
                            url: that.XHRList.quit,
                            type: 'POST',
                            dataType: 'json',
                            timeout: 10000,
                            beforeSend: function () {
                                comm.loading.show()
                            }
                        })
                            .done(function (data) {
                                // console.log("success");
                                if (data.responseObject.responseStatus) {
                                    localStorage.removeItem('userState');
                                    localStorage.removeItem('userInfo');
                                    localStorage.removeItem('userId');
                                    localStorage.removeItem('userAuth');
                                    localStorage.removeItem('approveInfo');
                                    if(localStorage.getItem('vedioMaxTime')){
                                        localStorage.removeItem('vedioMaxTime');
                                    }
                                    window.location.href = '//www.yi-ding.net.cn';
                                }
                                comm.loading.hide()
                            })
                            .fail(function () {
                                // console.log("XHR error...");
                            })
                    }

                })
            })
        }
    };


    var personalSetting = new PersonalSetting();
    personalSetting.init();
})
;
