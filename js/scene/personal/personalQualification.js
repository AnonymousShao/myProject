/**
 * 功能描述：  认证信息
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang and ZhengHui on 2016/11/22.
 *
 * update by zhanghongda on 2017/02/20
 */
$(function () {
    var PersonalQualification = function () {
        var that = this;
        this.XHRList = {
            baseMsg: "//www.yi-ding.net.cn/call/yiding/customer/auth/getMapById/", //获取认证信息
            fixAuth: "//www.yi-ding.net.cn/call/log/customer/auth/revise/create/", //修改认证信息
            certificate: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/", //证书上传
            baseList: "//www.yi-ding.net.cn/call/comm/data/baseinfo/getBaseList/", //基地列表
            hospitalList: "//www.yi-ding.net.cn/call/comm/data/baseinfo/getHospitalList/" //医院列表
        };
    };
    var clickIndex = 0;
    PersonalQualification.prototype = {
        init: function () {
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
            this.getBaseMsg();
            this.getImgList();
            this.getBaseList();
            this.getHospitalList();
            this.uploadImg();
            this.addPhotos();
            $('.yd-tableQuMsgFull').hide();
        },

        getBaseMsg: function () {
            var that = this;
            var data = {
                customerId: localStorage.getItem('userId'),
                isValid: 1
            };
            $.ajax({
                url: this.XHRList.baseMsg,
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
                    // console.log(data);
                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        var el = data.responseObject.responseData.data_list[0];
                        $(".Ev-userName").text(el.customerAuth.fullName);
                        $(".Ev-profession").text(comm.cutLine(el.customerAuth.areasExpertise, '_', ','));
                        $(".Ev-medicalTitle").text(comm.cutLine(el.customerAuth.medicalTitle, '_', ','));
                        $(".Ev-jobHospital").attr("hospitalid", el.customerAuth.id).text(el.customerAuth.company);
                        $(".Ev-studyHospital").text(el.customerAuth.baseName);
                        $(".Ev-studyHospital").attr("baseid", el.customerAuth.baseId);
                        that.applyFixAuthMsg(el.customerAuth);
                    }

                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });
        },

        // 申请更改认证信息
        applyFixAuthMsg: function (obj) {
            var that = this;
            $(".yd-fixAuthMsg").on('click', function (event) {
                event.preventDefault();
                var data = {
                    customerId: localStorage.getItem('userId'),
                    isValid: '1',
                    state: '0'
                }
                var text = {
                    paramJson: $.toJSON(data)
                };
                $.ajax({
                    url: '//www.yi-ding.net.cn/call/log/customer/auth/revise/getMapList/',
                    type: 'GET',
                    dataType: 'json',
                    data: text,
                    success: function (req) {
                        // console.log(req)
                        if (req.responseObject.responseStatus) {
                            comm.alertBox({
                                "mTitle":"信息变更已提交",
                                "title":"您的申请我们会尽快处理，<br>随后通过消息通知您。<br>感谢您对医鼎的支持。",
                                "ensure":"知道了",
                                "ensureCallback":function(){
                                    //$(".Ev-inputPart").show();
                                },
                            });
                            //$(".yd-changeInfoPop").show();
                            //$(".ev-iKnow").on('click', function (event) {
                            //    event.preventDefault();
                            //    $(".yd-changeInfoPop").hide();
                            //});
                        } else {
                            var pcModuleStr = '';
                            var medicalNameStr = '';
                            $(".Ev-inputPart").hide();
                            $("#tagSelectorBox .ev-medicalLiList").removeClass('active');
                            $(".ev-applyAuthConent").show();
                            $("#fullName01").val(obj.fullName);
                            $("#hospitalName01").attr('hospitalid', obj.id).val(obj.company);
                            $("#baseName01").attr('baseid', obj.baseId).val(obj.baseName);
                            $("#medicalName01").val(comm.cutLine(obj.medicalTitle, '_', ','));
                            medicalNameStr = obj.medicalTitle;
                            $("#professionalName01").val(comm.cutLine(obj.areasExpertise, '_', ','));
                            pcModuleStr = obj.areasExpertise;
                            $("#professionalName01").off('click').on('click', function () {
                                $('#pcModule').show();
                                $('#tagSelectorBox').hide();
                                var button = $("#pcModule .yd-tagSelectorItem button");
                                $('#pcModule .yd-personalAdviceCancel').off('click').on('click', function () {
                                    $('#pcModule').hide();
                                    $("#pcModule .yd-tagSelectorItem button").removeClass('active');
                                    var professionalName = $('#professionalName01').val().split(',');
                                    for (var i = 0; i < professionalName.length; i++) {
                                        for (var j = 0; j < button.length; j++) {
                                            if (button.eq(j).text() == professionalName[i]) {
                                                button.eq(j).addClass('active');
                                            }
                                        }
                                    }
                                })
                                button.each(function () {
                                    $(this).unbind("click").bind("click", function () {
                                        $(this).toggleClass("active");
                                        var selectOnOff = $(this).hasClass("active");
                                        var chooseAllOnOff = ($(this).attr("tagid") == "1") ? true : false;
                                        if (selectOnOff) {
                                            var tagSelectorItemBtn = $(".yd-tagSelectorItem button");
                                            if (chooseAllOnOff) {
                                                tagSelectorItemBtn.addClass('active');
                                            } else {
                                                var j = 0;
                                                for (var i = 1; i < tagSelectorItemBtn.length; i++) {
                                                    if (tagSelectorItemBtn.eq(i).hasClass('active')) {
                                                        j++;
                                                    }
                                                }
                                                if (j == tagSelectorItemBtn.length - 1) {
                                                    tagSelectorItemBtn.eq(0).addClass('active');
                                                }
                                            }
                                        } else {
                                            if (chooseAllOnOff) {
                                                var tagSelectorItemBtn1 = $(".yd-tagSelectorItem button");
                                                $(".yd-tagSelectorItem button").removeClass('active');
                                            } else {
                                                var tagSelectorItemBtn1 = $(".yd-tagSelectorItem button");
                                                tagSelectorItemBtn1.eq(0).removeClass('active');
                                            }
                                        }

                                    })
                                });
                                $('#pcModule .yd-personalAdviceSubmit').off('click').on('click', function () {
                                    $('#pcModule').hide();
                                    pcModuleStr = '';
                                    $('#professionalName01').val('');
                                    for (var i = 0; i < button.length; i++) {
                                        if (button.eq(i).hasClass('active') && i != 0) {
                                            var text = button.eq(i).text();
                                            var tagId = button.eq(i).attr('tagid');
                                            pcModuleStr += tagId + '_' + text + ',';
                                        }
                                    }
                                    pcModuleStr = pcModuleStr.slice(0, pcModuleStr.length - 1);
                                    $('#professionalName01').val(comm.cutLine(pcModuleStr, '_', ','));
                                })
                                $('#pcModule .yd-tagSelectorBoxCloseBtn').off('click').on('click', function () {
                                    $('#pcModule').hide();
                                    $("#pcModule .yd-tagSelectorItem button").removeClass('active');
                                    var professionalName = $('#professionalName01').val().split(',');
                                    for (var i = 0; i < professionalName.length; i++) {
                                        for (var j = 0; j < button.length; j++) {
                                            if (button.eq(j).text() == professionalName[i]) {
                                                button.eq(j).addClass('active');
                                            }
                                        }
                                    }
                                })
                            });
                            $('#fullName01').on('click', function () {
                                $('#tagSelectorBox').hide();
                                $('#pcModule').hide();
                            })
                            var isTrue = true;
                            $('#fullName01').blur(function () {
                                var s = $(this).val();
                                if (s.length > 0) {
                                    if (/^\s|^\.|^\▪|^\·|\s$|\.$|\▪$|\·$/.test(s)) {
                                        $("#re_con01").addClass("showIb").find("span").text("请输入姓名！");
                                        $("#re_con01").hide().find("i").show();
                                        isTrue = false;
                                        return;

                                    } else {
                                        if (/^[\u4e00-\u9fa5\s\.\▪\·]{1,25}$|^[A-Za-z\s\.\▪\·]{1,50}$|^([A-Za-z\s\.\▪\·]|[\u4e00-\u9fa5\s\.\▪\·]){1,50}$/.test(s)) {
                                            for(var i=0;i<s.length;i++){
                                                if(s[i]==' '&&s[i+1]==' '){
                                                    $("#re_con01").hide().find("i").show();
                                                    $("#re_con01").addClass("showIb").find("span").text("请输入正确姓名！");
                                                    isTrue = false;
                                                    return;
                                                }
                                            }
                                            $("#re_con01").hide().find("span").text("");
                                            $("#re_con01").hide().find("i").hide()
                                            isTrue = true;
                                        } else {
                                            $("#re_con01").hide().find("i").show();
                                            $("#re_con01").addClass("showIb").find("span").text("请输入正确姓名！");
                                            isTrue = false;
                                            return;
                                        }
                                    }
                                } else {
                                    $("#re_con01").hide().find("i").hide();
                                    $("#re_con01").hide().find("span").text("");
                                    isTrue = true;
                                }
                            });
                            $('#hospitalName01').on('click', function () {
                                $('#tagSelectorBox').hide();
                                $('#pcModule').hide();
                            })
                            $('#baseName01').on('click', function () {
                                $('#tagSelectorBox').hide();
                                $('#pcModule').hide();
                            })
                            var text2 = {
                                isValid: '1',
                                typeId: '2',
                                roleId: '7',
                                visitSiteId: '13'
                            }
                            text2 = {
                                paramJson: $.toJSON(text2)
                            }
                            $.ajax({
                                url: '//www.yi-ding.net.cn/call/comm/data/baseinfo/getRoleConfigList/',
                                type: 'GET',
                                dataType: 'json',
                                data: text2,
                                success: function (req) {
                                    var data = req.responseObject.responseData.data_list;
                                    // console.log(req)
                                    var dataList1 = '';
                                    var dataList2 = '';
                                    var dataList3 = '';
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].sortId == 1) {
                                            dataList1 += '<span class="ev-medicalLiList" select-status="false" medicalid="' + data[i].refId + '">' + data[i].refValue + '</span>';
                                        } else if (data[i].sortId == 2) {
                                            dataList2 += '<span class="ev-medicalLiList" select-status="false" medicalid="' + data[i].refId + '">' + data[i].refValue + '</span>';
                                        } else if (data[i].sortId == 3) {
                                            dataList3 += '<span class="ev-medicalLiList" select-status="false" medicalid="' + data[i].refId + '">' + data[i].refValue + '</span>';
                                        }
                                    }
                                    dataList1 += '<span class="ev-medicalLiList" select-status="false" medicalid="0">其他</span>';
                                    $('#tagSelectorList1').html(dataList1);
                                    $('#tagSelectorList2').html(dataList2);
                                    $('#tagSelectorList3').html(dataList3);
                                    var medicalName = $("#medicalName01").val().split(',');
                                    var medicalLiList0 = $('#tagSelectorBox .ev-medicalLiList');
                                    medicalLiList0.removeClass('active');
                                    for (var i = 0; i < medicalName.length; i++) {
                                        for (var j = 0; j < medicalLiList0.length; j++) {
                                            if (medicalLiList0.eq(j).text() == medicalName[i]) {
                                                medicalLiList0.eq(j).addClass('active');
                                            }
                                        }
                                    }
                                },
                                error: function (xhr, type, error) {
                                    //alert(error);
                                }
                            });
                            $("#medicalName01").off('click').on('click', function () {
                                $('#tagSelectorBox').show();
                                $('#pcModule').hide();
                                var medicalLiList = $('#tagSelectorBox .ev-medicalLiList');
                                $('#tagSelectorBox .al-tagSelectorBoxCloseBtn').off('click').on('click', function () {
                                    $('#tagSelectorBox').hide();
                                    var medicalName = $("#medicalName01").val().split(',');
                                    medicalLiList.removeClass('active');
                                    for (var i = 0; i < medicalName.length; i++) {
                                        for (var j = 0; j < medicalLiList.length; j++) {
                                            if (medicalLiList.eq(j).text() == medicalName[i]) {
                                                medicalLiList.eq(j).addClass('active');
                                            }
                                        }
                                    }
                                })
                                $('#tagSelectorBox .al-personalAdviceCancel').off('click').on('click', function () {
                                    $('#tagSelectorBox').hide();
                                    var medicalName = $("#medicalName01").val().split(',');
                                    medicalLiList.removeClass('active');
                                    for (var i = 0; i < medicalName.length; i++) {
                                        for (var j = 0; j < medicalLiList.length; j++) {
                                            if (medicalLiList.eq(j).text() == medicalName[i]) {
                                                medicalLiList.eq(j).addClass('active');
                                            }
                                        }
                                    }
                                })
                                medicalLiList.each(function () {
                                    $(this).unbind("click").bind("click", function () {
                                        var medicalId = $(this).attr('medicalid');
                                        if (medicalId != 0) {
                                            if (medicalId >= 3 && medicalId != 10) {
                                                $('#tagSelectorList2').show();
                                                $('#tagSelectorList3').show();
                                            } else {
                                                $('#tagSelectorList2').hide();
                                                $('#tagSelectorList3').hide();
                                            }
                                            if (medicalId < 5 || medicalId == 10) {
                                                if ($(this).hasClass('active')) {
                                                    $(this).removeClass('active');
                                                } else {
                                                    $("#tagSelectorList1 .ev-medicalLiList").removeClass('active');
                                                    $(this).addClass('active');
                                                }
                                            } else if (medicalId >= 5 && medicalId < 8) {
                                                if ($(this).hasClass('active')) {
                                                    $(this).removeClass('active');
                                                } else {
                                                    $("#tagSelectorList2 .ev-medicalLiList").removeClass('active');
                                                    $(this).addClass('active');
                                                }
                                            } else if (medicalId >= 8) {
                                                if ($(this).hasClass('active')) {
                                                    $(this).removeClass('active');
                                                } else {
                                                    $("#tagSelectorList3 .ev-medicalLiList").removeClass('active');
                                                    $(this).addClass('active');
                                                }
                                            }
                                        } else {
                                            $('#tagSelectorList2').show();
                                            $('#tagSelectorList3').show();
                                        }
                                    })
                                })
                                $('#tagSelectorBox .al-personalAdviceSubmit').off('click').on('click', function () {
                                    $('#tagSelectorBox').hide();
                                    $("#medicalName01").val('');
                                    medicalNameStr = '';
                                    for (var i = 0; i < medicalLiList.length; i++) {
                                        if (medicalLiList.eq(i).hasClass('active')) {
                                            var text = medicalLiList.eq(i).text();
                                            var medicalId = medicalLiList.eq(i).attr('medicalid');
                                            medicalNameStr += medicalId + '_' + text + ',';
                                        }
                                    }
                                    medicalNameStr = medicalNameStr.slice(0, medicalNameStr.length - 1);
                                    $("#medicalName01").val(comm.cutLine(medicalNameStr, '_', ','));
                                })
                            });
                            var text = {
                                isValid: '1',
                                treeLevels: '1,2',
                                platformId: '1',
                                firstResult: '0',
                                maxResult: '20'
                            }
                            text = {
                                paramJson: $.toJSON(text)
                            };
                            $.ajax({
                                url: '//www.yi-ding.net.cn/call/comm/data/baseinfo/getTagList/',
                                type: 'GET',
                                dataType: 'json',
                                data: text,
                                success: function (req) {
                                    // console.log(req)
                                    var data = req.responseObject.responseData.data_list;
                                    $('.yd-tagSelectorItem').html('');
                                    for (var i = 0; i < data.length; i++) {
                                        var button = $("<button></button>");
                                        button.text(data[i].tagName);
                                        button.attr('tagid', data[i].id);
                                        $('.yd-tagSelectorItem').append(button);
                                    }
                                    var professionalName1 = $('#professionalName01').val().split(',');
                                    var button1 = $("#pcModule .yd-tagSelectorItem button");
                                    var buttonIndex = 0
                                    for (var i = 0; i < professionalName1.length; i++) {
                                        for (var j = 0; j < button1.length; j++) {
                                            if (button1.eq(j).text() == professionalName1[i]) {
                                                button1.eq(j).addClass('active');
                                                buttonIndex++;
                                            }
                                        }
                                    }
                                    if (buttonIndex == button1.length - 1) {
                                        button1.eq(0).addClass('active');
                                    }
                                },
                                error: function (xhr, type, error) {
                                    //alert(error);
                                }
                            });
                            // var medicalName1=$("#medicalName01").val().split(',');
                            // var medicalLiList1=$('#tagSelectorBox .ev-medicalLiList');
                            // for(var i=0;i<medicalName1.length;i++){
                            //     for(var j=0;j<medicalLiList1.length;j++){
                            //         if(medicalLiList1.eq(j).text()==medicalName1[i]){
                            //             medicalLiList1.eq(j).addClass('active');
                            //         }
                            //     }
                            // }
                            $("#ev-applyAuthCancel").on('click', function (event) {
                                event.preventDefault();
                                $(".ev-applyAuthConent").hide();
                                $(".Ev-inputPart").show();
                            });
                            $("#ev-applyAuthSave").off('click').on('click', function (event) {
                                event.preventDefault();
                                if (isTrue) {
                                    var flag = true;
                                    var data = {
                                        customerId: localStorage.getItem('userId'),
                                        updateFullName: $("#fullName01").val(),
                                        updateBaseId: (function(){
                                            if ($("#baseName01").val()==$("#baseName01").attr("data-name")){
                                                return $("#baseName01").attr('baseid');
                                            }else{
                                                return 0;
                                            }
                                        })(),
                                        updateBaseName: $("#baseName01").val(),
                                        updateAreasExpertise: pcModuleStr,
                                        updateCompanyId:(function(){
                                            if ($("#hospitalName01").val()==$("#hospitalName01").attr("data-name")){
                                                return $("#hospitalName01").attr('hospitalid');
                                            }else{
                                                return 0;
                                            }
                                        })(),
                                        updateCompany: $("#hospitalName01").val(),
                                        updateMedicalTitle: medicalNameStr,
                                        visitSiteId: 13,
                                    };
                                    // console.log(data)
                                    if ($("#fullName01").val().length === 0) {
                                        $("#re_con01").addClass("showIb").find("span").text("请输入姓名！");
                                        flag = false;
                                        return;
                                    } else {
                                        $("#re_con01").hide().find("span").text("");
                                        flag = true;
                                    }

                                    if ($("#medicalName01").val().length === 0) {
                                        $("#med_error01").addClass("showIb").find("span").text("请选择职称！");
                                        flag = false;
                                        return;
                                    } else {
                                        $("#med_error01").hide().find("span").text("");
                                        flag = true;
                                    }
                                    if ($("#professionalName01").val().length === 0) {
                                        $("#area_error01").addClass("showIb").find("span").text("请选择专业领域！");
                                        flag = false;
                                        return;
                                    } else {
                                        $("#area_error01").hide().find("span").text("");
                                        flag = true;
                                    }
                                    if ($("#hospitalName01").val().length === 0) {
                                        $("#hos_error01").addClass("showIb").find("span").text("请填写就职医院！");
                                        flag = false;
                                        return;
                                    } else {
                                        $("#hos_error01").hide().find("span").text("");
                                        flag = true;
                                    }
                                    if ($("#baseName01").val().length === 0) {
                                        $("#base_error01").addClass("showIb").find("span").text("请填写住培基地！");
                                        flag = false;
                                        return;
                                    } else {
                                        $("#base_error01").hide().find("span").text("");
                                        flag = true;
                                    }
                                    // console.log(!flag)
                                    if (!flag) {
                                        return false;
                                    }
                                    $.ajax({
                                        url: that.XHRList.fixAuth,
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
                                            // console.log(data);
                                            if (data.responseObject.responseStatus) {
                                                comm.alertBox({
                                                    "mTitle":"信息变更已提交",
                                                    "title":"您的申请我们会尽快处理，<br>随后通过消息通知您。<br>感谢您对医鼎的支持。",
                                                    "ensure":"知道了",
                                                    "ensureCallback":function(){
                                                        $(".ev-applyAuthConent").hide();
                                                        $(".Ev-inputPart").show();
                                                    },
                                                });
                                                comm.loading.hide();
                                                //$(".yd-changeInfoPop").show();
                                                //$(".ev-iKnow").on('click', function (event) {
                                                //    event.preventDefault();
                                                //    $(".yd-changeInfoPop").hide();
                                                //    $(".ev-applyAuthConent").hide();
                                                //    $(".Ev-inputPart").show();
                                                //});
                                            } else {
                                                popup("修改失败");
                                            }
                                        })
                                        .fail(function () {
                                            // console.log("XHR error...");
                                            comm.loading.hide();
                                        });
                                }
                            });
                        }
                    },
                    error: function (xhr, type, error) {
                        //alert(error);
                    }
                });
            })
        },
        getImgList: function () {
            var data = {
                customerId: localStorage.getItem('userId'),
            };
            var postData = {
                paramJson: $.toJSON(data)
            };
            $.ajax({
                url: '//www.yi-ding.net.cn/call/yiding/customer/auth_attachment/getAuthAttachments/',    //请求的url地址
                dataType: "json",   //返回格式为json
                data: postData,    //参数值
                type: "post",   //请求方式
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (req) {
                    // console.log(req)
                    //请求成功时处理
                    if (req.responseObject.responseStatus) {
                        var reqMes = req.responseObject.responseMessage;
                        var tableModuleItem = $('.ev-authList .yd-tableModuleItem');
                        // console.log(tableModuleItem)
                        for (var i = 0; i < tableModuleItem.length; i++) {
                            for (var j = 0; j < reqMes.length; j++) {
                                if (tableModuleItem.eq(i).find('h3').attr('tagId') == reqMes[j].attType) {
                                    tableModuleItem.eq(i).find('.yd-tableQuMsgFull').show();
                                    tableModuleItem.eq(i).find('.yd-tableQuMsgAdd').hide();
                                    tableModuleItem.eq(i).find('.yd-tableQuMsgFull img').attr('src', reqMes[j].attPath);
                                    if (tableModuleItem.find('.yd-credentIalsTitle').length > 1) {
                                        tableModuleItem.eq(i).find('.yd-tableQuMsgFull p').text(reqMes[j].attCode);
                                    }
                                }

                            }
                        }
                    }

                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        },
        // 获得基地列表
        getBaseList: function () {
            $("#baseName01").lenovo({
                url: this.XHRList.baseList,
                showName: "baseName",
                extend: [{
                    id: "baseId", //自定义属性值
                    hiddenId: "baseId", //自定义属性
                },{
                    id:"baseName",
                    hiddenId:"data-name"
                }],
                type: "b"
            });
        },
        // 获得医院列表
        getHospitalList: function () {
            $("#hospitalName01").lenovo({
                url: this.XHRList.hospitalList,
                showName: "hospitalName",
                extend: [{
                    id: "id", //自定义属性值
                    hiddenId: "hospitalId", //自定义属性
                },{
                    id:"hospitalName",
                    hiddenId:"data-name"
                }],
                type: "h"
            });
        },
        // 添加证件照
        addPhotos: function () {
            $(".yd-tableQuMsgAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(this).parents('.yd-tableModuleItem').find('.yd-tableQuMsgBox').show();
                var container = $(this).parents('.yd-tableModuleItem');
                if (container.find('.yd-credentIalsTitle').length > 1) {
                    container.find('input').eq(0).keyup(function () {
                        var s = $(this).val();
                        if (s.length > 0) {
                            if (/^[A-Za-z0-9]{1,50}$/.test(s)) {
                                container.find('.yd-tableErrorTips').eq(0).addClass('hide');
                            } else {
                                container.find('.yd-tableErrorTips').eq(0).removeClass('hide');
                                container.find('.yd-tableErrorTips').eq(0).find('span').html('请填写正确证件号码！')
                            }
                        }
                    })
                }
            });
            $('.yd-personalAdviceSubmit').on('click', function (event) {
                event.preventDefault();
                if ($(this).hasClass('none')){
                    return false;
                }
                var container = $(this).parents('.yd-tableModuleItem');
                // console.log(container.find('.yd-credentIalsTitle'))
                if (container.find('.yd-credentIalsTitle').length > 1) {
                    container.find('input').eq(0).keyup(function () {
                        container.find('.yd-tableErrorTips').eq(0).addClass('hide');
                        var s = $(this).val();
                        if (s.length > 0) {
                            if (/^[A-Za-z0-9]{1,50}$/.test(s)) {
                                container.find('.yd-tableErrorTips').eq(0).addClass('hide');
                            } else {
                                container.find('.yd-tableErrorTips').eq(0).removeClass('hide');
                            }
                        }
                    })
                    var tableModuleItem = container.find('.yd-tableModuleUploadImg').css('background-image').replace('url("', '').replace('")', '');
                    var value = container.find('input').eq(0).val();
                    var hasHide = container.find('.yd-tableErrorTips').eq(0).hasClass('hide');
                    var attType = container.find('h3').attr('tagId');
                    var attPath = container.find('.yd-tableModuleUploadImg').attr('attPath');
                    if (hasHide && tableModuleItem.indexOf('list_photo_up@2x.png')==-1) {
                        comm.loading.show();
                        var data = {
                            customerId: localStorage.getItem('userId'),
                            "attType": attType,
                            "attPath": attPath,
                            "attCode": value
                        };
                        var postData = {
                            paramJson: $.toJSON(data)
                        };
                        $.ajax({
                            url: '//www.yi-ding.net.cn/call/yiding/customer/auth_attachment/updateAuthAttachment/',    //请求的url地址
                            dataType: "json",   //返回格式为json
                            data: postData,    //参数值
                            type: "post",   //请求方式
                            beforeSend: function () {
                                //请求前的处理
                            },
                            success: function (req) {
                                comm.loading.hide();
                                // console.log(req)
                                //请求成功时处理
                                if (req.responseObject.responseStatus) {
                                    var tableQuMsgFull = container.find('.yd-tableQuMsgFull');
                                    tableQuMsgFull.find('p').text(container.find('input').eq(0).val());
                                    tableQuMsgFull.find('img').attr('src', tableModuleItem);
                                    tableQuMsgFull.show();
                                    container.find('.yd-tableQuMsgBox').hide();
                                    container.find('.yd-tableErrorTips').eq(0).addClass('hide');
                                    container.find('.yd-tableErrorTips').eq(1).addClass('hide');
                                    var tableQuMsgAdd = $('.ev-authList .yd-tableQuMsgAdd');
                                    var tableFull = $('.ev-authList .yd-tableQuMsgFull');
                                    // console.log(tableFull)
                                    for (var i = 0; i < tableQuMsgAdd.length; i++) {
                                        if (tableFull.eq(i).css('display') == 'none') {
                                            tableQuMsgAdd.eq(i).show();
                                        }
                                    }
                                }

                            },
                            complete: function () {
                                //请求完成的处理
                            },
                            error: function () {
                                //请求出错处理
                            }
                        });


                    } else {
                        if (tableModuleItem.indexOf('list_photo_up@2x.png')==-1) {
                            container.find('.yd-tableErrorTips').eq(1).removeClass('hide');
                            container.find('.yd-tableErrorTips').eq(1).find('span').html('请上传证件照！')
                        } else {

                        }

                    }
                } else {
                    var tableModuleItem = container.find('.yd-tableModuleUploadImg').css('background-image').replace('url("', '').replace('")', '');
                    var attType = container.find('h3').attr('tagId');
                    var attPath = container.find('.yd-tableModuleUploadImg').attr('attPath');
                    if (tableModuleItem.indexOf('list_photo_up@2x.png')==-1) {
                        comm.loading.show();
                        var data = {
                            customerId: localStorage.getItem('userId'),
                            "attType": attType,
                            "attPath": attPath,
                            "attCode": ''
                        };
                        var postData = {
                            paramJson: $.toJSON(data)
                        };
                        $.ajax({
                            url: '//www.yi-ding.net.cn/call/yiding/customer/auth_attachment/updateAuthAttachment/',    //请求的url地址
                            dataType: "json",   //返回格式为json
                            data: postData,    //参数值
                            type: "post",   //请求方式
                            beforeSend: function () {
                                //请求前的处理
                            },
                            success: function (req) {
                                comm.loading.hide();
                                // console.log(req)
                                //请求成功时处理
                                if (req.responseObject.responseStatus) {
                                    var tableQuMsgFull = container.find('.yd-tableQuMsgFull');
                                    tableQuMsgFull.find('img').attr('src', tableModuleItem);
                                    tableQuMsgFull.show();
                                    container.find('.yd-tableQuMsgBox').hide();
                                    container.find('.yd-tableErrorTips').addClass('hide');
                                    var tableQuMsgAdd = $('.ev-authList .yd-tableQuMsgAdd');
                                    var tableFull = $('.ev-authList .yd-tableQuMsgFull');
                                    for (var i = 0; i < tableQuMsgAdd.length; i++) {
                                        if (tableFull.eq(i).css('display') == 'none') {
                                            tableQuMsgAdd.eq(i).show();
                                        }
                                    }
                                }

                            },
                            complete: function () {
                                //请求完成的处理
                            },
                            error: function () {
                                //请求出错处理
                            }
                        });
                    } else {
                        container.find('.yd-tableErrorTips').eq(0).removeClass('hide');
                        container.find('.yd-tableErrorTips').eq(0).find('span').html('请上传证件照！')

                    }
                }
            })
            $(".yd-personalAdviceCancel").on('click', function (event) {
                event.preventDefault();
                $(this).siblings('.yd-personalAdviceSubmit').addClass('none')
                var container = $(this).parents('.yd-tableModuleItem');
                $(this).parents('.yd-tableQuMsgBox').hide();
                container.find('.yd-tableQuMsgAdd').show();
                container.find('input').val('');
                container.find('.yd-tableModuleUploadImg').css({
                    "background": "transparent url(/image/personal/list_photo_up@2x.png) center center no-repeat",
                });
                container.find('.yd-tableErrorTips').addClass('hide');
            });
        },
        // 证件照上传
        uploadImg: function () {
            $('.yd-tableModuleUploadImg').off('click').on('click', function () {
                var container = $(this);
                var contaneiLenght = container.parents('.yd-tableModuleItem').find('.yd-tableErrorTips').eq(1);
                $(this).find('.authenticationFile').unbind("change").bind("change", function () {
                    if (contaneiLenght.length > 0) {
                        contaneiLenght.addClass('hide');
                    } else {
                        container.parents('.yd-tableModuleItem').find('.yd-tableErrorTips').eq(0).addClass('hide')
                    }

                    var fileSize = this.files[0].size / 1048576;
                    var fileText = $(this).val().split('.')[1].toUpperCase();

                    if (fileSize < 5) {
                        if (fileText != ".BMP" && fileText != "PNG" && fileText != "GIF" && fileText != "JPG" && fileText != "JPEG") {
                            popup({
                                // "hasImg":false,
                                "text": "图片限于bmp,png,gif,jpg,jpeg格式"
                            });
                            // alert("图片限于bmp,png,gif,jpg格式");
                        } else {
                            container.parents('.yd-tableModuleItem').removeClass('.uploadFail');
                            container.parents('.yd-tableModuleItem').addClass('uploading');
                            var titleStyle = $('.authentication-Style2 .titleType').val();
                            var file = $('.authenticationFile').val();
                            var postData = {
                                "imageType": "2",
                                customerId: localStorage.getItem('userId'),
                                "visitSiteId": "13"
                            };
                            postData = {paramJson: $.toJSON(postData)};
                            $(this).parent().ajaxSubmit({
                                url: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/",
                                dataType: 'text',
                                data: postData,
                                type: "post",
                                clearForm: true,
                                success: function (data) {
                                    container.parents('.yd-tableModuleItem').removeClass('uploading');
                                    // console.log(data)
                                    var resultStr = $.parseJSON(data.replace(/<.*?>/ig, ""));
                                    // console.log(resultStr);
                                    if (resultStr.responseObject.responseStatus) {
                                        var imgSrc = resultStr.responseObject.responseMessage.url;
                                        // console.log(imgSrc);
                                        container.attr('attPath', resultStr.responseObject.responseMessage.path);
                                        container.css({
                                            "background": "transparent url(" + imgSrc + ") center center no-repeat",
                                            "background-size": "100% 100%"
                                        })
                                        // console.log(container)
                                        container.parents('.yd-detailedTableItem').find(".yd-personalAdviceSubmit").removeClass('none')
                                    } else {
                                        container.parents('.yd-tableModuleItem').addClass('.uploadFail');
                                    }
                                },
                                error: function () {
                                    // authentication.isImg=false;
                                    // $('.againPopup').show();
                                    // $('.authentication-Style2 .loginBtn').removeClass('activation');
                                }
                            });
                        }
                    } else {
                        popup({
                            // "hasImg":false,
                            "text": "图片不能大于5MB"
                        });
                        // alert("图片不能大于5MB。");
                    }

                });
            })

        }
    };

    var personalQualification = new PersonalQualification();
    personalQualification.init();
});
