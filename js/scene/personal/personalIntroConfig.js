/**
 * 功能描述：  个人资料编辑
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/17.
 */

$(function () {
    var PersonalIntroConfig = function () {
        var that = this;
        this.XHRList = {
            baseMsg: "//www.yi-ding.net.cn/call/yiding/web/user/getAbstractById/", //获取基本信息
            authMsg: "//www.yi-ding.net.cn/call/yiding/customer/auth/getMapById/",//获取认证信息
            fixBaseMsg: '//www.yi-ding.net.cn/call/yiding/customer/baseinfo/saveBasicInfo/', //修改基本信息
            noAuthFixBaseMsg: "//www.yi-ding.net.cn/call/yiding/customer/auth/createAuth/", //未认证用户修改个人信息
            introduce: "//www.yi-ding.net.cn/call/yiding/web/user/getAbstractById/", //获取个人简介
            fixIntroduce: "//www.yi-ding.net.cn/call/yiding/customer/baseinfo/saveFellowSummary/", //修改个人简介
            workExp: {
                get: "//www.yi-ding.net.cn/call/yiding/customer/occupation/json_list/", //获取工作经历
                save: "//www.yi-ding.net.cn/call/yiding/customer/occupation/create/", //保存工作经历
                update: "//www.yi-ding.net.cn/call/yiding/customer/occupation/update/", //更新工作经历
                cDelete: "//www.yi-ding.net.cn/call/yiding/customer/occupation/delete/", //删除工作经历
                info: "//www.yi-ding.net.cn/call/yiding/customer/occupation/info/" //获取已有工作经历
            },
            eduBackground: {
                get: "//www.yi-ding.net.cn/call/yiding/customer/education/json_list/", //获取教育背景
                save: "//www.yi-ding.net.cn/call/yiding/customer/education/create/", //保存教育背景
                update: "//www.yi-ding.net.cn/call/yiding/customer/education/update/", //更新教育背景
                cDelete: "//www.yi-ding.net.cn/call/yiding/customer/education/delete/", //删除教育背景
                info: "//www.yi-ding.net.cn/call/yiding/customer/education/info/" //获取已有教育背景
            },
            continueEdu: {
                get: "//www.yi-ding.net.cn/call/yiding/customer/continue/education/json_list/", //获取继续教育
                save: "//www.yi-ding.net.cn/call/yiding/customer/continue/education/create/", //保存继续教育
                update: "//www.yi-ding.net.cn/call/yiding/customer/continue/education/update/", //更新继续教育
                cDelete: "//www.yi-ding.net.cn/call/yiding/customer/continue/education/delete/", //删除继续教育
                info: "//www.yi-ding.net.cn/call/yiding/customer/continue/education/info/" //获取已有继续教育
            },
            award: {
                get: "//www.yi-ding.net.cn/call/yiding/customer/honor/json_list/", //获取荣誉
                save: "//www.yi-ding.net.cn/call/yiding/customer/honor/create/", //保存荣誉
                update: "//www.yi-ding.net.cn/call/yiding/customer/honor/update/", //更新荣誉
                cDelete: "//www.yi-ding.net.cn/call/yiding/customer/honor/delete/", //删除荣誉
                info: "//www.yi-ding.net.cn/call/yiding/customer/honor/info/" //获取已有荣誉
            },
            foud: {
                get: "//www.yi-ding.net.cn/call/yiding/customer/fund/json_list/", //获取科研基金
                save: "//www.yi-ding.net.cn/call/yiding/customer/fund/create/", //保存科研基金
                update: "//www.yi-ding.net.cn/call/yiding/customer/fund/update/", //更新科研基金
                cDelete: "//www.yi-ding.net.cn/call/yiding/customer/fund/delete/", //删除科研基金
                info: "//www.yi-ding.net.cn/call/yiding/customer/fund/info/" //获取已有科研基金
            },
            business: {
                get: "//www.yi-ding.net.cn/call/yiding/customer/social/json_list/", //获取社会任职
                save: "//www.yi-ding.net.cn/call/yiding/customer/social/create/", //保存社会任职
                update: "//www.yi-ding.net.cn/call/yiding/customer/social/update/", //更新社会任职
                cDelete: "//www.yi-ding.net.cn/call/yiding/customer/social/delete/", //删除社会任职
                info: "//www.yi-ding.net.cn/call/yiding/customer/social/info/" //获取已有社会任职 
            },
            treatise: {
                get: "//www.yi-ding.net.cn/call/yiding/customer/opus/json_list/", //获取学术专著
                save: "//www.yi-ding.net.cn/call/yiding/customer/opus/create/", //保存学术专著
                update: "//www.yi-ding.net.cn/call/yiding/customer/opus/update/", //更新学术专著
                cDelete: "//www.yi-ding.net.cn/call/yiding/customer/opus/delete/", //删除学术专著
                info: "//www.yi-ding.net.cn/call/yiding/customer/opus/info/" //获取已有学术专著 
            },
            invented: {
                get: "//www.yi-ding.net.cn/call/yiding/customer/patent/json_list/", //获取社会任职
                save: "//www.yi-ding.net.cn/call/yiding/customer/patent/create/", //保存社会任职
                update: "//www.yi-ding.net.cn/call/yiding/customer/patent/update/", //更新社会任职
                cDelete: "//www.yi-ding.net.cn/call/yiding/customer/patent/delete/", //删除社会任职
                info: "//www.yi-ding.net.cn/call/yiding/customer/patent/info/" //获取已有社会任职
            },
            medicalTitleList: "//www.yi-ding.net.cn/call/comm/data/baseinfo/getMedicalTitleList/", //职称列表
            hospitalList: "//www.yi-ding.net.cn/call/comm/data/baseinfo/getHospitalList/", //省市医院列表
            schoolList: "//www.yi-ding.net.cn/call/comm/data/baseinfo/getSchoolList/", //学校列表
            majorList: "//www.yi-ding.net.cn/call/comm/data/baseinfo/getMajorList/", //专业列表
            department: "//www.yi-ding.net.cn/call/comm/data/baseinfo/getDepartmentList/", //科室列表
        };
    };

    PersonalIntroConfig.prototype = {
        init: function () {
            commLog.createBrowse(51, '我的-个人简介编辑页', window.location.href);
            //commLog.creatEvent({"id":140,"url":window.location.href,"keyword":"个人资料编辑","browseType":"51"});
            //loginAbout.init({
            //    loginPass: function () {
            //        if (!loginAbout.approve.status().auState) {
            //            window.location = "personal_index.html";
            //        }
            //    },
            //    registerPass: function () {
            //        if (!loginAbout.approve.status().auState) {
            //            window.location = "personal_index.html";
            //        }
            //    }
            //
            //});
            // 认证状态
            // -1-无认证信息、0-二次提交认证、1-认证通过、2-运营确认、3-认证拒绝

            if(authentication.keyState().state=='-1'||authentication.keyState().state=='0'||authentication.keyState().state=='3'||authentication.keyState().state=='4'){
                window.location = "personal_index.html";
            }
            //if (!loginAbout.approve.status().auState) {
            //    window.location = "personal_index.html";
            //}

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
            this.getBaseMsg(); //基本信息
            this.getIntroduceContent(); //个人简介

            this.getSchoolList(); //学校列表
            this.getHospitalList(); //医院列表
            this.getDepartment(); //科室列表
            this.getMedicalTitleList(); //职称列表
            this.getMajorList(); //专业列表
            if (authentication.keyState().state=='1'||authentication.keyState().state=='2') {
                $(".Ev-personalMsgBox").show();
                $(".Ev-noAuthUser").hide();
                this.getAuthUserMsg();
                this.timeToToday();
                this.getWorkExp(); //工作经历
                this.getEduBackground(); //教育背景
                this.getContinueEdu(); //继续教育
                this.getAward(); //获得荣誉
                this.getFoud(); //科研基金
                this.getBusiness(); //社会任职
                this.getTreatise(); //学术专著
                this.getInvented(); //发明专利
            } else {
                $(".Ev-personalMsgBox").hide();
                $(".Ev-noAuthUser").show();
            }
        },

        // 获取学校列表
        getSchoolList: function () {
            $("#Ev-eduBackgroundSchool").lenovo({
                url: this.XHRList.schoolList,
                showName: "schoolName",
                extend: [{
                    id: "city",
                    hiddenId: "city",
                }, {
                    id: "cityId",
                    hiddenId: "cid",
                }, {
                    id: "id",
                    hiddenId: "uid"
                }],
                success: function () {
                    $("#Ev-eduBackgroundPlace").val($("#Ev-eduBackgroundSchool").attr("city"));
                },
                type: "s"
            });
        },
        // 获取专业列表
        getMajorList: function () {
            $.ajax({
                url: this.XHRList.majorList,
                type: 'get',
                dataType: 'json',
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {
                    var dataList = data.responseObject,
                        list = "";
                    $(dataList).each(function (index, el) {
                        list += '<span class="ev-medicalLiList" majorid="' + el.majorId + '">' + el.majorName + '</span>';
                    });
                    $(".Ev-majorBox .yd-tagSelectorList").append(list);
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });
        },
        // 获取医院列表
        getHospitalList: function () {
            $("#Ev-workExpCompany").lenovo({
                url: this.XHRList.hospitalList,
                showName: "hospitalName",
                extend: [{
                    id: "hospitalAddress",
                    hiddenId: "address",
                }],
                success: function () {
                    $("#Ev-workExpPlace").val($("#Ev-workExpCompany").attr("address"));
                },
                type: 'h'
            });
        },
        // 获取科室列表
        getDepartment: function () {
            $("#Ev-workExpDepartment").lenovo({
                url: this.XHRList.department,
                showName: "departmentName",
                type: 'k'
            });
        },
        // 获取职称列表
        getMedicalTitleList: function () {
            $.ajax({
                url: this.XHRList.medicalTitleList,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        pageIndex: 1,
                        pageSize: 100
                    })
                },
            })
                .done(function (data) {

                    var templateOne = "",
                        templateTwo = "",
                        templateThree = "";
                    if (!$.isEmptyObject(data.responseData)) {
                        var dataList = data.responseData.data_list;
                        $(dataList).each(function (index, el) {

                            if (el.medicalTitleId == 1) {
                                templateOne += '<span class="ev-medicalLiList" select-status="false" medicalid="' + el.id + '" medicalTitle="' + el.id + "_" + el.medicalTitle + '">' + el.medicalTitle + '</span>';
                            } else if (el.medicalTitleId == 2) {
                                templateTwo += '<span class="ev-medicalLiList" select-status="false" medicalid="' + el.id + '" medicalTitle="' + el.id + "_" + el.medicalTitle + '">' + el.medicalTitle + '</span>';
                            } else if (el.medicalTitleId == 3) {
                                templateThree += '<span class="ev-medicalLiList" select-status="false" medicalid="' + el.id + '" medicalTitle="' + el.id + "_" + el.medicalTitle + '">' + el.medicalTitle + '</span>';
                            }
                        });
                        $(".ev-medicalConList .ev-medicalConFirstList").append(templateOne);
                        $(".ev-medicalConList .ev-medicalConSecondList").append(templateTwo);
                        $(".ev-medicalConList .ev-medicalConThirdList").append(templateThree);
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                });
        },
        // 职称选择
        showMedicalSelector: function (eventEle) {
            eventEle.find(".Ev-medicalBox").show();
            eventEle.on('click', '.ev-medicalLiList', function (event) {
                event.stopPropagation();
                $(this).addClass('active').siblings().removeClass('active');
                if ($(this).attr('medicalid') == 3 || $(this).attr('medicalid') == 4 || $(this).parent().hasClass('ev-medicalConSecondList') || $(this).parent().hasClass('ev-medicalConThirdList')) {
                    $(".ev-medicalConSecondList,.ev-medicalConThirdList").show();
                } else {
                    $(".ev-medicalConSecondList,.ev-medicalConThirdList").hide();
                }
            });
            eventEle.on("click", ".Ev-medicalCancel", function (e) {
                e.stopPropagation();
                eventEle.find(".Ev-medicalBox").hide();
            });

            eventEle.on("click", ".Ev-medicalSure", function (e) {
                e.stopPropagation();
                var selectArr = [],
                    attrTitle = [];
                eventEle.find(".ev-medicalLiList.active").each(function (index, el) {
                    selectArr.push(el.innerHTML);
                    attrTitle.push($(el).attr("medicalTitle"));
                });
                $("#Ev-workExpMedicalTitle").attr("medicalTitle", attrTitle.join(",")).val(selectArr.join(','));
                eventEle.find(".Ev-medicalBox").hide();
            });
        },
        //时间选择至今
        timeToToday: function () {
            $(".yd-toNow").on('click', function () {
                if ($(this).hasClass('on')) {
                    $(this).removeClass("on");
                    $(this).parent().find(".yd-timeSelect").show();
                } else {
                    $(this).addClass('on');
                    $(this).parent().find(".yd-timeSelect").hide();
                }
            })
        },

        // 专业选择
        showMajorSelector: function (eventEle) {
            event.preventDefault();
            $(".Ev-majorBox").show();
            eventEle.on('click', ".ev-medicalLiList", function (event) {
                event.preventDefault();
                event.stopPropagation();
                $(".Ev-majorBox .ev-medicalLiList").removeClass('active');
                $(this).addClass('active');
            });
            eventEle.on('click', ".Ev-majorCancel", function (event) {
                event.preventDefault();
                eventEle.find(".Ev-majorBox").hide();
            });
            eventEle.on('click', ".Ev-majorSure", function (e) {
                e.stopPropagation();
                var selectArr = [],
                    attrId = $(".Ev-majorBox .ev-medicalLiList.active").attr("majorid");
                eventEle.find(".ev-medicalLiList.active").each(function (index, el) {
                    selectArr.push(el.innerHTML);
                });
                $("#Ev-eduBackgroundProfession").attr("majorid", attrId).val(selectArr.join(','));
                eventEle.find(".Ev-majorBox").hide();
            });
        },
        //获取认证用户信息
        getAuthUserMsg: function () {
            $(".Ev-authUserContent").show();
            $.ajax({
                url: this.XHRList.authMsg,
                type: 'POST',
                dataType: 'json',
                data: {
                    paramJson: $.toJSON({
                        customerId: localStorage.getItem("userId")
                    })
                },
            })
                .done(function (data) {
                    // console.log("success");
                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        var dataList = data.responseObject.responseData.data_list[0].customerAuth;
                        $(".yd-tableModuleItemInput.Ev-deparmentSelect span").text(comm.cutLine(dataList.areasExpertise, '_', ','));
                        $(".yd-tableModuleItemInput.Ev-medicalSelect span").text(comm.cutLine(dataList.medicalTitle, '_', ','));
                        $(".yd-tableModuleItemInput.Ev-hospitalSelect span").text(dataList.company);
                        $(".yd-tableModuleItemInput.Ev-baseSelect span").text(dataList.baseName);
                    }

                })
                .fail(function () {
                    // console.log("XHR error...");
                });
        },
        // 获取用户基本信息
        getBaseMsg: function () {
            var that = this;
            var data = {};

            ymd({
                year: $("#year"),
                month: $("#month"),
                day: $("#day"),
                defaultYear: "0",
                defaultMonth: '0',
                css: " "
            });
            if (authentication.keyState().state=='1'||authentication.keyState().state=='2') {
                $("#Ev-userNameInput").attr("readonly", "readonly");
                $("#Ev-userNameInput").css("border","none");
            }
            // 基本资料编辑
            $(".yd-tableSexSelector").unbind('click');
            $(".Ev-baseMsgConfig").on("click", function () {
                $("#Ev-userNameInput").removeAttr('disabled');
                //$("#Ev-userNameInput").css("border","block");
                $(".Ev-userBaseMsg .Ev-ensureBtnBox").show();
                $(".Ev-userBaseMsg select").removeAttr('disabled');
                $(".yd-timeSelect").removeClass('Ev-selectDisable');
                $(".yd-tableSexSelector").unbind('click');
                $(".yd-tableSexSelector").on('click', function () {
                    $(this).addClass('on').siblings().removeClass('on');
                });
                $(".Ev-userBaseMsg #base_cancel").on('click', function (event) {
                    event.preventDefault();
                    $(".Ev-userBaseMsg select").attr('disabled', 'disabled');
                    $("#Ev-userNameInput").attr('disabled', 'disabled');
                    $(".Ev-userBaseMsg .Ev-ensureBtnBox").hide();
                    $(".yd-timeSelect").addClass('Ev-selectDisable');
                    $(".yd-tableSexSelector").unbind('click');
                    fn();
                });
            });
            // 获得基本信息
            fn();
            function fn() {
                $.ajax({
                    url: that.XHRList.baseMsg,
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
                            if (data.responseObject.responseData.data_list.length !== 0) {
                                var msg = data.responseObject.responseData.data_list;
                                var template = "";
                                $(msg).each(function (index, el) {
                                    $('#Ev-userNameInput').val(el.customerName);
                                    if (el.sexId == '1') {
                                        $("#sex-man").addClass('on').siblings().removeClass('on');
                                    } else if (el.sexId == '2') {
                                        $("#sex-woman").addClass('on').siblings().removeClass('on');
                                    } else {
                                        $("#sex-man").addClass('on').siblings().removeClass('on');
                                    }
                                    ymd({
                                        year: $("#year"),
                                        month: $("#month"),
                                        day: $("#day"),
                                        defaultYear: el.birthday.substring(0, 4),
                                        defaultMonth: el.birthday.substring(5, 7),
                                        css: " "
                                    });
                                    $("#year").val(el.birthday.substring(0, 4)).addClass('selected');
                                    $("#month").val(el.birthday.substring(5, 7)).addClass('selected');
                                    $("#day").val(el.birthday.substring(8, 10)).addClass('selected');
                                    comm.loading.hide();
                                });

                            }
                        }
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            }


            // 编辑提交
            $(".Ev-userBaseMsg").on('click', '#base_save', function (event) {
                event.preventDefault();
                var data = {
                    sexId: $(".yd-tableSexSelector.on").attr("data-role"),
                    birthday: $("#year").val() + "-" + $("#month").val() + "-" + $("#day").val(),
                    customerId: localStorage.getItem("userId")
                };
                var obj = {
                    opflag: 1,
                    fullName: $("#Ev-userNameInput").val(),
                    sexId: $(".yd-tableSexSelector.on").attr("data-role"),
                    birthday: $("#year").val() + "-" + $("#month").val() + "-" + $("#day").val(),
                    customerId: localStorage.getItem("userId")
                };
                var selectD = new Date($("#year").val() + "/" + $("#month").val() + "/" + $("#day").val()).getTime();
                if (selectD > new Date().getTime()) {
                    that.errorMsg($(".Ev-baseTimeErrorTips"), "出生日期不可大于今天").addClass('showIb');
                    return false;
                } else {
                    that.errorMsg($(".Ev-baseTimeErrorTips"), "").removeClass('showIb');
                }
                $.ajax({
                    url: (authentication.keyState().state=='1'||authentication.keyState().state=='2') ? that.XHRList.fixBaseMsg : that.XHRList.noAuthFixBaseMsg ,
                    type: 'POST',
                    dataType: 'json',
                    data: (authentication.keyState().state=='1'||authentication.keyState().state=='2') ? data : obj,
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        if (data.rows && data.rows.responseStatus) {
                            $(".Ev-userBaseMsg select").attr('disabled', 'disabled');
                            $("#Ev-userNameInput").attr('disabled', 'disabled');
                            $(".Ev-userBaseMsg .Ev-ensureBtnBox").hide();
                            $(".yd-timeSelect").addClass('Ev-selectDisable');
                            $(".yd-tableSexSelector").unbind('click');
                            popup({
                                text: "保存成功!"
                            });
                        } else if (data.responseObject.responseStatus) {
                            $(".Ev-userBaseMsg select").attr('disabled', 'disabled');
                            $("#Ev-userNameInput").attr('disabled', 'disabled');
                            $(".Ev-userBaseMsg .Ev-ensureBtnBox").hide();
                            $(".yd-timeSelect").addClass('Ev-selectDisable');
                            $(".yd-tableSexSelector").unbind('click');
                            popup({
                                text: "保存成功!"
                            });
                        }
                        comm.loading.hide();
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });

            });
        },
        // 获取个人简介
        getIntroduceContent: function () {
            var that = this;
            var data = {};
            // 个人简介编辑


            var fn = function () {
                // 获取个人简介
                $.ajax({
                    url: that.XHRList.introduce,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            customerId: localStorage.getItem("userId")
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            if (data.responseObject.responseData.data_list.length !== 0) {
                                var msg = data.responseObject.responseData.data_list;
                                $(msg).each(function (index, el) {
                                    el.summary.length > 200 ? $(".yd-introduceOpen").show() : $(".yd-introduceOpen").hide();
                                    $(".Ev-introduceContent").text(el.summary.length > 200 ? el.summary.substring(0, 200) + "..." : el.summary);
                                    $(".yd-introduceOpen").off('click').on('click', function () {
                                        if ($(this).hasClass('open')) {
                                            $(".Ev-introduceContent").text(el.summary.substring(0, 200) + "...");
                                            $(this).removeClass('open');
                                            $(this).text('展开');
                                        } else {
                                            $(".Ev-introduceContent").text(el.summary)
                                            $(this).addClass('open');
                                            $(this).text('收起');
                                        }
                                    });
                                    $(".Ev-introduceConfig").on('click', function (event) {
                                        event.preventDefault();
                                        $(".Ev-userIntroduce #Ev-introduceTextarea").show().val(el.summary);
                                        $(".Ev-userIntroduce .Ev-ensureBtnBox").show();
                                        $(".Ev-userIntroduce .yd-introduceContent").hide();
                                        $(".yd-introduceOpen").hide();
                                        $(".Ev-userIntroduce #base_cancel").on('click', function (event) {
                                            event.preventDefault();
                                            $(".Ev-userIntroduce #Ev-introduceTextarea").hide();
                                            $(".Ev-userIntroduce .Ev-ensureBtnBox").hide();
                                            $(".Ev-userIntroduce .yd-introduceContent").show();
                                            if (el.summary.length > 200) {
                                                $(".yd-introduceOpen").show();
                                            }
                                        });
                                    });
                                    comm.loading.hide();
                                });

                            }
                        }
                        comm.loading.hide();
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            };
            fn();
            // 编辑提交
            $(".Ev-userIntroduce").on('click', '#it_base_save', function (event) {
                event.preventDefault();
                var data = {
                    summary: $("#Ev-introduceTextarea").val(),
                    customerId: localStorage.getItem("userId"),
                    resumeType: 2
                };
                if ($("#Ev-introduceTextarea").val().length===0){
                    popup({
                        text:"请输入简介内容保存！"
                    });
                    return false;
                }
                $.ajax({
                    url: that.XHRList.fixIntroduce,
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        if (data.rows.responseStatus) {
                            $(".Ev-userIntroduce #Ev-introduceTextarea").hide();
                            $(".Ev-userIntroduce .Ev-ensureBtnBox").hide();
                            $(".Ev-userIntroduce .yd-introduceContent").show();
                            $(".Ev-introduceContent").text($("#Ev-introduceTextarea").val());
                            popup({
                                text: "保存成功!"
                            });
                            // $("#Ev-introduceTextarea").val().length > 200 ?$(".yd-introduceOpen").show():$(".yd-introduceOpen").hide();
                            fn();
                        }
                        comm.loading.hide();
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });

            });
        },

        // 表单确认/关闭
        clickSaveOrCancelBtn: function (container, ensureCallback, cancelCallback) {
            container.find(".Ev-ensureBtnBox button").off('click').on('click', function (event) {
                event.preventDefault();
                switch (this.className) {
                    case 'yd-personalAdviceCancel':
                        $(this).parents('.Ev-personalDataConfig').hide();
                        $(this).parents('.Ev-personalMsgBox').find(".yd-personalContentAdd").show();
                        $(this).parents('.Ev-personalMsgBox').find(".yd-tableErrorTips").hide();
                        $(this).parents('.Ev-personalMsgBox').find(".yd-tableErrorTips").removeClass("showIb");
                        cancelCallback && cancelCallback();
                        break;
                    case 'yd-personalAdviceSubmit':
                        ensureCallback && ensureCallback();
                        if ($(this).attr("data-enable") === 'off') {
                            return false;
                        }
                        $(this).parents('.Ev-personalDataConfig').hide();
                        $(this).parents('.Ev-personalMsgBox').find('.yd-personalContentAdd').show();
                        break;
                }
            });
            container.find(".yd-tagSelectorBoxCloseBtn").off('click').on('click', function (event) {
                event.preventDefault();
                $(this).parent().parent(".yd-tagSelectorBox").hide();
            });
        },
        // 错误提示信息
        errorMsg: function (ele, text) {
            ele.find('span').text(text);
            return ele;
        },
        // 已有条目删除
        personalMsgItemDelete: function (url, ele) {
            var that = this;
            var id = ele.attr('data-id');
            var data = {
                id: id
            };
            comm.confirmBox({
                title: "删除资料",
                content: "确定要删除该项吗？",
                ensure: '确认',
                cancel: '取消',
                cancelCallback: function () {
                    return false;
                },
                ensureCallback: function () {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        data: {paramJson: $.toJSON(data)},
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {
                            if (data.responseObject.responseStatus) {
                                popup({
                                    text: "删除成功"
                                });
                                ele.remove();
                                comm.loading.hide();
                                return false;
                            } else {
                                popup({
                                    text: "删除失败"
                                });
                                comm.loading.hide();
                                return false;
                            }
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                        });
                }
            });

        },
        //验证开始结束时间
        validateDate: function (start, end, now) {
            var startYear = parseInt(start.split('-')[0]),
                startMonth = parseInt(start.split('-')[1]),
                endYear = parseInt(end.split('-')[0]),
                endMonth = parseInt(end.split('-')[1]);
            if (now.hasClass('on')) {
                return true;
            }
            if (startYear > endYear) {
                return false;
            } else if (startYear < endYear) {
                return true;
            } else {
                if (startMonth >= endMonth) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 获取/编辑工作经历
        getWorkExp: function () {
            var that = this;
            // 初始化年月日
            ymd({
                year: $("#Ev-workExpYear01"),
                month: $("#Ev-workExpMonth01"),
                default1: true,
                defaultYear: "0",
                defaultMonth: '0',
                css: " "
            });
            ymd({
                year: $("#Ev-workExpYear02"),
                month: $("#Ev-workExpMonth02"),
                default1: true,
                defaultYear: "0",
                defaultMonth: '0',
                css: " "
            });
            $("#Ev-workExpMedicalTitle").on("click", function () {
                that.showMedicalSelector($(".Ev-workExperienceTable"));
            });

            // 提交填写功能模块...
            // container可选，传则为编辑，不传为添加
            var workExpSubmit = function (container) {
                that.clickSaveOrCancelBtn($('.Ev-workExperience'), function () {
                    var flag = false;
                    var flag1 = false;
                    var flag2 = false;
                    var flag3 = false;
                    if($("#Ev-workExpPlace").val().length>50){
                        that.errorMsg($(".Ev-workExpPlaceErrorTips"), "最长50个中文或100个英文").addClass('showIb');
                        flag = false;
                    }else{
                        that.errorMsg($(".Ev-workExpPlaceErrorTips"), "").removeClass('showIb');
                        flag = true;
                    }
                    if ($("#Ev-workExpCompany").val().length === 0) {
                        that.errorMsg($(".Ev-workExpCompanyErrorTips"), "请输入单位").addClass('showIb');
                        flag2 = false;
                    } else {
                        if($("#Ev-workExpCompany").val().length > 100){
                            that.errorMsg($(".Ev-workExpCompanyErrorTips"), "最长100个中文或200个英文").addClass('showIb');
                            flag2 = false;
                        }else{
                            that.errorMsg($(".Ev-workExpCompanyErrorTips"), "").removeClass('showIb');
                            flag2 = true;
                        }
                    }
                    if ($("#Ev-workExpDepartment").val().length === 0) {
                        that.errorMsg($(".Ev-workExpDepartmentErrorTips"), "请选择科室或部门").addClass('showIb');
                        flag3 = false;
                    } else {
                        if($("#Ev-workExpDepartment").val().length > 25){
                            that.errorMsg($(".Ev-workExpDepartmentErrorTips"), "最长25个中文或50个英文").addClass('showIb');
                            flag3 = false;
                        }else{
                            that.errorMsg($(".Ev-workExpDepartmentErrorTips"), "").removeClass('showIb');
                            flag3 = true;
                        }
                    }
                    var flag2 = false;
                    if ($("#Ev-workExpMedicalTitle").val().length === 0) {
                        that.errorMsg($(".Ev-workExpMedicalTitleErrorTips"), "请选择职称").addClass('showIb');
                        flag2 = false;
                    } else {
                        that.errorMsg($(".Ev-workExpMedicalTitleErrorTips"), "").removeClass('showIb');
                        flag2 = true;
                    }
                    if (that.validateDate($("#Ev-workExpYear01").val() + "-" + $("#Ev-workExpMonth01").val(), $("#Ev-workExpYear02").val() + "-" + $("#Ev-workExpMonth02").val(), $("#Ev-workExpToNow"))) {
                        flag1 = true;
                        that.errorMsg($(".Ev-workExpTimeErrorTips"), "").removeClass('showIb');
                    } else {
                        flag1 = false;
                        that.errorMsg($(".Ev-workExpTimeErrorTips"), "开始时间不能大于结束时间").addClass('showIb');
                    }
                    if(flag&&flag1&&flag2&&flag3){
                        $("#we_base_save").attr('data-enable', 'on');
                    }else{
                        $("#we_base_save").attr('data-enable', 'off');
                        return;
                    }
                    // 编辑提交

                    var obj = {
                        "customerId": localStorage.getItem('userId'),
                        "unit": $("#Ev-workExpCompany").val(),
                        "department": $("#Ev-workExpDepartment").val(),
                        "medicalTitle": $("#Ev-workExpMedicalTitle").attr('medicaltitle'),
                        "address": $("#Ev-workExpPlace").val(),
                        "startTime": $("#Ev-workExpYear01").val() + "-" + $("#Ev-workExpMonth01").val(),
                        "endTime": $("#Ev-workExpYear02").val() + "-" + $("#Ev-workExpMonth02").val(),
                        "upNow": 0,
                        "languageFlag": 0
                    };
                    if (container) {
                        $.extend(true, obj, {
                            id: container.attr("data-id")
                        });
                    }

                    if ($("#Ev-workExpToNow").hasClass('on')) {
                        obj.endTime = "至今";
                        obj.upNow = "1";
                    } else {
                        obj.endTime = $("#Ev-workExpYear02").val() + "-" + $("#Ev-workExpMonth02").val();
                        obj.upNow = "0";
                    }


                    $.ajax({
                            url: container ? that.XHRList.workExp.update : that.XHRList.workExp.save,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                paramJson: $.toJSON(obj)
                            },
                            timeout: 10000,
                            beforeSend: function () {
                                comm.loading.show();
                            }
                        })
                        .done(function (data) {

                            comm.loading.hide();
                            // 有容器——编辑资料——内容入item
                            // 无容器——CreateElement——append
                            if (container) {
                                container.find("article>a").text(obj.place);
                                container.find('.category').text(obj.department);
                                container.find('.time').text(obj.medicalTitle);
                                container.find('.timeArea em').text($("#Ev-workExpYear01").val() + "." + $("#Ev-workExpMonth01").val() + "-" + $("#Ev-workExpYear02").val() + "-" + $("#Ev-workExpMonth02").val());
                                container.show();
                                popup({
                                    text: "修改成功!"
                                });
                            } else {
                                template = '<article class="yd-historyTimelineContentItem" data-id="' + data.responseObject.responsePk + '"><article>' +
                                    '<span class="timeArea"><em>' + obj.startTime.substring(0, 7).replace(/-/g, '.') + '-' + obj.endTime.substring(0, 7).replace(/-/g, '.') + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + obj.unit + '</a>' +
                                    '<p><span class="category">' + obj.department + '</span><i class="point"></i><span class="time">' + comm.cutLine(obj.medicalTitle, '_', '_') + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-workExperienceContent").append(template);
                                popup({
                                    text: "保存成功!"
                                });
                            }
                            $("#Ev-workExpCompany").val('');
                            $("#Ev-workExpDepartment").val('');
                            $("#Ev-workExpMedicalTitle").attr('medicaltitle', '');
                            $("#Ev-workExpMedicalTitle").val('');
                            $("#Ev-workExpPlace").val('');
                            $("#Ev-workExpYear01").val('');
                            $("#Ev-workExpMonth01").val('');
                            $('#Ev-workExpToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });


                }, function () {
                    if (container) {
                        container.show();
                    }
                });
                return false;
            };
            // 拉取现有资料...
            $.ajax({
                url: this.XHRList.workExp.get,
                type: 'POST',
                dataType: 'json',
                data: {
                    languageFlag: 0,
                    customerId: localStorage.getItem('userId')
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {

                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        if (data.responseObject.responseData.data_list.length !== 0) {
                            $(".Ev-noWorkExp").hide();
                            $(".Ev-workExperience").show();
                            var dataList = data.responseObject.responseData.data_list,
                                template = "";
                            $(dataList).each(function (index, el) {
                                template = '<article class="yd-historyTimelineContentItem" data-id="' + el.id + '"><article>' +
                                    '<span class="timeArea"><em>' + el.startTime.substring(0, 7).replace(/-/g, '.') + '-' +
                                    (el.upNow == 0 ? el.endTime.substring(0, 7).replace(/-/g, '.') : "至今") +
                                    '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + el.unit + '</a>' +
                                    '<p><span class="category">' + el.department + '</span><i class="point"></i><span class="time">' + comm.cutLine(el.medicalTitle, '_', '，') + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-workExperienceContent").append(template);

                                $("#Ev-workExpYear01,#Ev-workExpMonth01").css('color', "rgb(51, 51, 51)");
                                $("#Ev-workExpYear02,#Ev-workExpMonth02").css('color', "rgb(51, 51, 51)");
                            });
                            comm.loading.hide();

                        } else {
                            $(".Ev-noWorkExp").show();
                            $(".Ev-workExperience").hide();
                            comm.loading.hide();
                        }
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });


            // 添加新内容...
            $(".Ev-workExperienceAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(".Ev-workExperienceTable").show();
                $("#Ev-workExpCompany").val('');
                $("#Ev-workExpDepartment").val('');
                $("#Ev-workExpMedicalTitle").attr('medicaltitle', '');
                $("#Ev-workExpMedicalTitle").val('');
                $("#Ev-workExpPlace").val('');
                $("#Ev-workExpYear01").val('');
                $("#Ev-workExpMonth01").val('');
                $("#Ev-workExpYear02").val('');
                $("#Ev-workExpMonth02").val('');
                $('#Ev-workExpToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                workExpSubmit();
            });
            // 编辑已有内容....
            $(".Ev-workExperienceContent").on("click", '.yd-personalMsgConfig', function () {
                var container = $(this).parents('.yd-historyTimelineContentItem');
                var id = container.attr("data-id");
                container.hide();
                $(".Ev-workExperienceTable").show();
                $(".Ev-workExperienceAdd").hide();
                $.ajax({
                    url: that.XHRList.workExp.info,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            id: id,
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // 调取数据入表...

                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.bo_data;
                            $(dataList).each(function (index, el) {
                                $("#Ev-workExpPlace").val(el.address);
                                $("#Ev-workExpCompany").val(el.unit);
                                $("#Ev-workExpDepartment").val(el.department);
                                $("#Ev-workExpMedicalTitle").val(comm.cutLine(el.medicalTitle, '_', '，'));
                                $("#Ev-workExpYear01").val(el.startTime.substring(0, 4));
                                $("#Ev-workExpMonth01").val(el.startTime.substring(5, 7));
                                if (el.upNow == 0) {
                                    $('#Ev-workExpToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                                    $("#Ev-workExpYear02").val(el.endTime.substring(0, 4));
                                    $("#Ev-workExpMonth02").val(el.endTime.substring(5, 7));
                                } else {
                                    $('#Ev-workExpToNow').addClass('on').parent().find(".yd-timeSelect").hide();
                                }

                                workExpSubmit(container);
                                comm.loading.hide();
                            });
                        }
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });


            $(".Ev-workExperience").on('click', '.yd-personalMsgDelete', function (event) {
                that.personalMsgItemDelete(that.XHRList.workExp.cDelete, $(this).parents(".yd-historyTimelineContentItem"));
            });
        },

        // 获取教育背景
        getEduBackground: function () {
            var that = this;
            // 初始化年月日
            ymd({
                year: $("#Ev-eduBackgroundYear01"),
                month: $("#Ev-eduBackgroundMonth01"),
                default1: true,
                defaultYear: "0",
                defaultMonth: '0',
                css: " "
            });
            ymd({
                year: $("#Ev-eduBackgroundYear02"),
                month: $("#Ev-eduBackgroundMonth02"),
                default1: true,
                defaultYear: "0",
                defaultMonth: '0',
                css: " "
            });

            $("#Ev-eduBackgroundProfession").on('click', function (event) {
                that.showMajorSelector($(".Ev-eduBackgroundTable"));
            });
            // 提交填写功能模块...
            // container可选，传则为编辑，不传为添加
            var eduBackgroundSubmit = function (container) {
                that.clickSaveOrCancelBtn($('.Ev-eduBackground'), function () {
                    var flag = true;
                    var flag1 = false;
                    var flage2 = false;
                    var flage3 = false;
                    if($("#Ev-eduBackgroundPlace").val().length>50){
                        that.errorMsg($(".Ev-eduBackgroundPlaceErrorTips"), "最长50个中文100个英文！").addClass('showIb');
                        flag = false;
                    }else{
                        that.errorMsg($(".Ev-eduBackgroundPlaceErrorTips"), "").removeClass('showIb');
                        flag = true;
                    }
                    //if ($("#Ev-eduBackgroundPlace").val().length === 0) {
                    //    that.errorMsg($(".Ev-eduBackgroundPlaceErrorTips"), "请输入城市").addClass('showIb');
                    //    flag = false;
                    //} else {
                    //    that.errorMsg($(".Ev-eduBackgroundPlaceErrorTips"), "").removeClass('showIb');
                    //    flag = true;
                    //}
                    if ($("#Ev-eduBackgroundSchool").val().length === 0) {
                        that.errorMsg($(".Ev-eduBackgroundSchoolErrorTips"), "请输入学校").addClass('showIb');
                        flag2 = false;
                    } else {
                        if($("#Ev-eduBackgroundSchool").val().length>50){
                            that.errorMsg($(".Ev-eduBackgroundSchoolErrorTips"), "最长50个中文或100个英文").addClass('showIb');
                            flag2 = false;
                        }else{
                            that.errorMsg($(".Ev-eduBackgroundSchoolErrorTips"), "").removeClass('showIb');
                            flag2 = true;
                        }
                    }
                    if ($("#Ev-eduBackgroundProfession").val().length === 0) {
                        that.errorMsg($(".Ev-eduBackgroundProfessionErrorTips"), "请选择专业").addClass('showIb');
                        flag3 = false;
                    } else {
                        if($("#Ev-eduBackgroundProfession").val().length>25){
                            that.errorMsg($(".Ev-eduBackgroundProfessionErrorTips"), "最长25个中文或100个英文").addClass('showIb');
                            flag3 = false;
                        }else{
                            that.errorMsg($(".Ev-eduBackgroundProfessionErrorTips"), "").removeClass('showIb');
                            flag3 = true;
                        }
                    }

                    if (that.validateDate($("#Ev-eduBackgroundYear01").val() + "-" + $("#Ev-eduBackgroundMonth01").val(), $("#Ev-eduBackgroundYear02").val() + "-" + $("#Ev-eduBackgroundMonth02").val(), $("#Ev-eduBackgroundToNow"))) {
                        flag1 = true;
                        that.errorMsg($(".Ev-eduBackgroundTimeErrorTips"), "").removeClass('showIb');
                    } else {
                        flag1 = false;
                        that.errorMsg($(".Ev-eduBackgroundTimeErrorTips"), "开始时间不能大于结束时间").addClass('showIb');
                    }

                    if(flag&&flag1&&flag2&&flag3){
                        $("#eb_base_save").attr('data-enable', 'on');
                    }else{
                        $("#eb_base_save").attr('data-enable', 'off');
                        return;
                    }
                    // 编辑提交
                    var obj = {
                        "customerId": localStorage.getItem('userId'),
                        "city": $("#Ev-eduBackgroundPlace").val(),
                        "cityId": $("#Ev-eduBackgroundSchool").attr('cid'),
                        "universityId": $("#Ev-eduBackgroundSchool").attr('uid'),
                        "university": $("#Ev-eduBackgroundSchool").val(),
                        "major": $("#Ev-eduBackgroundProfession").val(),
                        "majorId": $("#Ev-eduBackgroundProfession").attr('marjorid'),
                        "education": $("#Ev-eduBackgroundQualifications option:selected").text(),
                        "educationId": $("#Ev-eduBackgroundQualifications").val(),
                        "startTime": $("#Ev-eduBackgroundYear01").val() + "-" + $("#Ev-eduBackgroundMonth01").val(),
                        "endTime": $("#Ev-eduBackgroundYear02").val() + "-" + $("#Ev-eduBackgroundMonth02").val(),
                        "upNow": 0,
                        "languageFlag": 0
                    };

                    if (container) {
                        $.extend(true, obj, {
                            id: container.attr("data-id")
                        });
                    }

                    if ($("#Ev-eduBackgroundToNow").hasClass('on')) {
                        obj.endTime = "至今";
                        obj.upNow = "1";
                    } else {
                        obj.endTime = $("#Ev-eduBackgroundYear02").val() + "-" + $("#Ev-eduBackgroundMonth02").val();
                        obj.upNow = "0";
                    }
                    $.ajax({
                        url: container ? that.XHRList.eduBackground.update : that.XHRList.eduBackground.save,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON(obj)
                        },

                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {

                            comm.loading.hide();
                            // 有容器——编辑资料——内容入item
                            // 无容器——CreateElement——append
                            if (container) {
                                container.find("article>a").text(data.city);
                                container.find('.category').text(data.major);
                                container.find('.time').text(data.education);
                                container.find('.timeArea em').text($("#Ev-eduBackgroundYear01").val() + "." + $("#Ev-eduBackgroundMonth01").val() + "-" + $("#Ev-eduBackgroundYear02").val() + "-" + $("#Ev-eduBackgroundMonth02").val());
                                container.show();
                                popup({
                                    text: "修改成功!"
                                });
                            } else {
                                var template = '<article class="yd-historyTimelineContentItem" data-id="' + data.responseObject.responsePk + '"><article>' +
                                    '<span class="timeArea"><em>' + obj.startTime.substring(0, 7).replace(/-/g, '.') + '-' + obj.endTime.substring(0, 7).replace(/-/g, '.') + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + obj.city + '<span style="padding-left:10px">' + obj.university + '</span></a>' +
                                    '<p><span class="category">' + obj.major + '</span><i class="point"></i><span class="time">' + obj.education + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-eduBackgroundContent").append(template);
                                popup({
                                    text: "保存成功!"
                                });
                            }
                            $("#Ev-eduBackgroundPlace").val('');
                            $("#Ev-eduBackgroundSchool").attr('cid', '');
                            $("#Ev-eduBackgroundSchool").attr('uid', '');
                            $("#Ev-eduBackgroundSchool").val('');
                            $("#Ev-eduBackgroundProfession").val('');
                            $("#Ev-eduBackgroundProfession").attr('marjorid', '');
                            $("#Ev-eduBackgroundYear01").val('');
                            $("#Ev-eduBackgroundMonth01").val('');
                            $("#Ev-eduBackgroundYear02").val('');
                            $("#Ev-eduBackgroundMonth02").val('');
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });

                }, function () {
                    if (container) {
                        container.show();
                    }
                });
                return false;
            };
            // 拉取现有资料...
            $.ajax({
                url: this.XHRList.eduBackground.get,
                type: 'POST',
                dataType: 'json',
                data: {
                    languageFlag: 0,
                    customerId: localStorage.getItem('userId')
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {

                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        if (data.responseObject.responseData.data_list.length !== 0) {
                            $(".Ev-noEduBackground").hide();
                            $(".Ev-eduBackground").show();
                            var dataList = data.responseObject.responseData.data_list,
                                template = "";
                            $(dataList).each(function (index, el) {
                                template = '<article class="yd-historyTimelineContentItem"  data-id="' + el.id + '"><article>' +
                                    '<span class="timeArea"><em>' + el.startTime.substring(0, 7).replace(/-/g, '.') + '-' +
                                    (el.upNow == 0 ? el.endTime.substring(0, 7).replace(/-/g, '.') : "至今") +
                                    '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + el.city + '<span style="padding-left:10px">' + el.university + '</span></a>' +
                                    '<p><span class="category">' + el.major + '</span><i class="point"></i><span class="time">' + el.education + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-eduBackgroundContent").append(template);
                            });
                            comm.loading.hide();
                        } else {
                            $(".Ev-noEduBackground").show();
                            $(".Ev-eduBackground").hide();
                            comm.loading.hide();
                        }
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });


            // 添加新内容...
            $(".Ev-eduBackgroundAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(".Ev-eduBackgroundTable").show();
                $("#Ev-eduBackgroundPlace").val('');
                $("#Ev-eduBackgroundSchool").attr('cid', '');
                $("#Ev-eduBackgroundSchool").attr('uid', '');
                $("#Ev-eduBackgroundSchool").val('');
                $("#Ev-eduBackgroundProfession").val('');
                $("#Ev-eduBackgroundProfession").attr('marjorid', '');
                $("#Ev-eduBackgroundYear01").val('');
                $("#Ev-eduBackgroundMonth01").val('');
                $("#Ev-eduBackgroundYear02").val('');
                $("#Ev-eduBackgroundMonth02").val('');
                $('#Ev-eduBackgroundToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                eduBackgroundSubmit();

            });
            // 编辑已有内容....
            $(".Ev-eduBackgroundContent").on("click", '.yd-personalMsgConfig', function () {
                var container = $(this).parents('.yd-historyTimelineContentItem');
                var id = container.attr("data-id");
                container.hide();
                $(".Ev-eduBackgroundTable").show();
                $(".Ev-eduBackgroundAdd").hide();
                $.ajax({
                    url: that.XHRList.eduBackground.info,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            id: id,
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // 调取数据入表...
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.bo_data;
                            $(dataList).each(function (index, el) {
                                $("#Ev-eduBackgroundPlace").val(el.city);
                                $("#Ev-eduBackgroundSchool").val(el.university);
                                $("#Ev-eduBackgroundProfession").val(el.major);
                                $("#Ev-eduBackgroundQualifications").val(el.education);
                                $("#Ev-eduBackgroundYear01").addClass('selected').val(el.startTime.substring(0, 4));
                                $("#Ev-eduBackgroundMonth01").addClass('selected').val(el.startTime.substring(5, 7));
                                if (el.upNow == 0) {
                                    $('#Ev-eduBackgroundToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                                    $("#Ev-eduBackgroundYear02").addClass('selected').val(el.endTime.substring(0, 4));
                                    $("#Ev-eduBackgroundMonth02").addClass('selected').val(el.endTime.substring(5, 7));
                                } else {
                                    $('#Ev-eduBackgroundToNow').addClass('on').parent().find(".yd-timeSelect").hide();
                                }
                                $("#Ev-eduBackgroundYear02").addClass('selected').val(el.endTime.substring(0, 4));
                                $("#Ev-eduBackgroundMonth02").addClass('selected').val(el.endTime.substring(5, 7));
                                eduBackgroundSubmit(container);
                                comm.loading.hide();
                            });
                        }

                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });

            $(".Ev-eduBackground").on('click', '.yd-personalMsgDelete', function (event) {
                that.personalMsgItemDelete(that.XHRList.eduBackground.cDelete, $(this).parents(".yd-historyTimelineContentItem"));
            });
        },
        // 获得继续教育
        getContinueEdu: function () {
            var that = this;
            // 初始化年月日
            ymd({
                year: $("#Ev-continueEduYear01"),
                month: $("#Ev-continueEduMonth01"),
                day: $("#Ev-continueEduDay01"),
                default1: true,
                defaultYear: "0",
                defaultMonth: '0',
                defaultDay: '0',
                css: " "
            });
            ymd({
                year: $("#Ev-continueEduYear02"),
                month: $("#Ev-continueEduMonth02"),
                day: $("#Ev-continueEduDay02"),
                default1: true,
                defaultYear: "0",
                defaultMonth: '0',
                defaultDay: '0',
                css: " "
            });

            // 提交填写功能模块...
            // container可选，传则为编辑，不传为添加
            var continueEduSubmit = function (container) {
                that.clickSaveOrCancelBtn($('.Ev-continueEdu'), function () {
                    var flag = true;
                    var flag1 = false;
                    var flag2 = false;
                    var flag3 = false;
                    if($("#Ev-continueEduContentText").val().length>50){
                        that.errorMsg($(".Ev-continueEduContentTextErrorTips"), "最长50个中文或100个英文！").addClass('showIb');
                        flag = false;
                    }else{
                        that.errorMsg($(".Ev-continueEduContentTextErrorTips"), "").removeClass('showIb');
                        flag = true;
                    }
                    //if ($("#Ev-continueEduContentText").val().length === 0) {
                    //    that.errorMsg($(".Ev-continueEduContentTextErrorTips"), "请输入培训内容").addClass('showIb');
                    //    flag = false;
                    //} else {
                    //    that.errorMsg($(".Ev-continueEduContentTextErrorTips"), "").removeClass('showIb');
                    //    flag = true;
                    //}
                    if ($("#Ev-continueEduCompany").val().length === 0) {
                        that.errorMsg($(".Ev-continueEduCompanyErrorTips"), "请输入机构名称").addClass('showIb');
                        flag2 = false;
                    } else {
                        if($("#Ev-continueEduCompany").val().length>50){
                            that.errorMsg($(".Ev-continueEduCompanyErrorTips"), "最大为50个中文或100个英文").addClass('showIb');
                            flag2 = false;
                        }else{
                            that.errorMsg($(".Ev-continueEduCompanyErrorTips"), "").removeClass('showIb');
                            flag2 = true;
                        }
                    }
                    if ($("#Ev-continueEduDiploma").val().length === 0) {
                        that.errorMsg($(".Ev-continueEduDiplomaErrorTips"), "请输入证书名称").addClass('showIb');
                        flag3 = false;
                    } else {
                        if($("#Ev-continueEduDiploma").val().length>50){
                            that.errorMsg($(".Ev-continueEduDiplomaErrorTips"), "最大为50个中文或100个英文").addClass('showIb');
                            flag3 = false;
                        }else{
                            that.errorMsg($(".Ev-continueEduDiplomaErrorTips"), "").removeClass('showIb');
                            flag3 = true;
                        }
                    }

                    if (that.validateDate($("#Ev-continueEduYear01").val() + "-" + $("#Ev-continueEduMonth01").val(), $("#Ev-continueEduYear02").val() + "-" + $("#Ev-continueEduMonth02").val(), $("#Ev-continueEduToNow"))) {
                        flag1 = true;
                        that.errorMsg($(".Ev-continueEduTimeErrorTips"), "").removeClass('showIb');
                    } else {
                        flag1 = false;
                        that.errorMsg($(".Ev-continueEduTimeErrorTips"), "开始时间不能大于结束时间").addClass('showIb');
                    }

                    if(flag&&flag1&&flag2&&flag3){
                        $("#ce_base_save").attr('data-enable', 'on');
                    }else{
                        $("#ce_base_save").attr('data-enable', 'off');
                        return;
                    }
                    // 编辑提交


                    var obj = {
                        "customerId": localStorage.getItem('userId'),
                        "organization": $("#Ev-continueEduCompany").val(),
                        "cmeDesc": $("#Ev-continueEduContentText").val(),
                        "certificate": $("#Ev-continueEduDiploma").val(),
                        "startTime": $("#Ev-continueEduYear01").val() + "-" + $("#Ev-continueEduMonth01").val()+"-01",
                        "endTime": $("#Ev-continueEduYear02").val() + "-" + $("#Ev-continueEduMonth02").val()+"-01",
                        "upNow": 0,
                        "languageFlag": 0
                    };
                    if (container) {
                        $.extend(true, obj, {
                            id: container.attr("data-id")
                        });
                    }


                    $.ajax({
                        url: container ? that.XHRList.continueEdu.update : that.XHRList.continueEdu.save,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON(obj)
                        },
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {

                            comm.loading.hide();
                            // 有容器——编辑资料——内容入item
                            // 无容器——CreateElement——append
                            if (container) {
                                container.find("article>a").text(obj.organization);
                                container.find('.category').text(obj.cmeDesc);
                                container.find('.time').text(obj.certificate);
                                container.find('.timeArea em').text(obj.startTime.substring(0, 10).replace(/-/g, '.') + "-" + obj.endTime.substring(0, 10).replace(/-/g, '.'));
                                container.show();
                                popup({
                                    text: "修改成功!"
                                });
                            } else {
                                var template = '<article class="yd-historyTimelineContentItem" data-id="' + data.responseObject.responsePk + '"><article>' +
                                    '<span class="timeArea"><em>' + obj.startTime.substring(0, 10).replace(/-/g, '.') + "-" +
                                    obj.endTime.substring(0, 10).replace(/-/g, '.')  +
                                    '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + obj.organization + '</a>' +
                                    '<p><span class="category">' + obj.cmeDesc + '</span><i class="point"></i><span class="time">' + obj.certificate + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-continueEduContent").append(template);
                                popup({
                                    text: "保存成功!"
                                });
                            }
                            $("#Ev-continueEduCompany").val('');
                            $("#Ev-continueEduContentText").val('');
                            $("#Ev-continueEduDiploma").val('');
                            $("#Ev-continueEduYear01").val('');
                            $("#Ev-continueEduMonth01").val('');
                            $("#Ev-continueEduDay01").val('');
                            $("#Ev-continueEduYear02").val('');
                            $("#Ev-continueEduMonth02").val('');
                            $("#Ev-continueEduDay02").val('');
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });

                }, function () {
                    if (container) {
                        container.show();
                    }
                });
                return false;
            };
            // 拉取现有资料...
            $.ajax({
                url: this.XHRList.continueEdu.get,
                type: 'POST',
                dataType: 'json',
                data: {
                    languageFlag: 0,
                    customerId: localStorage.getItem('userId')
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {

                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        if (data.responseObject.responseData.data_list.length !== 0) {
                            $(".Ev-noContinueEdu").hide();
                            $(".Ev-continueEdu").show();
                            var dataList = data.responseObject.responseData.data_list,
                                template = "";
                            $(dataList).each(function (index, el) {
                                template = '<article class="yd-historyTimelineContentItem" data-id="' + el.id + '"><article>' +
                                    '<span class="timeArea"><em>' + el.startTime.substring(0, 10).replace(/-/g, '.') + '-' +
                                   el.endTime.substring(0, 10).replace(/-/g, '.') +
                                    '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + el.organization + '</a>' +
                                    '<p><span class="category">' + el.cmeDesc + '</span><i class="point"></i><span class="time">' + el.certificate + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-continueEduContent").append(template);
                            });
                            comm.loading.hide();
                        } else {
                            $(".Ev-noContinueEdu").show();
                            $(".Ev-continueEdu").hide();
                            comm.loading.hide();
                        }
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });


            // 添加新内容...
            $(".Ev-continueEduAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(".Ev-continueEduTable").show();
                $("#Ev-continueEduCompany").val('');
                $("#Ev-continueEduContentText").val('');
                $("#Ev-continueEduDiploma").val('');
                $("#Ev-continueEduYear01").val('');
                $("#Ev-continueEduMonth01").val('');
                $("#Ev-continueEduDay01").val('');
                $("#Ev-continueEduYear02").val('');
                $("#Ev-continueEduMonth02").val('');
                $("#Ev-continueEduDay02").val('');
                $('#Ev-continueEduToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                continueEduSubmit();

            });
            // 编辑已有内容....
            $(".Ev-continueEduContent").on("click", '.yd-personalMsgConfig', function () {
                var container = $(this).parents('.yd-historyTimelineContentItem');
                var id = container.attr("data-id");
                container.hide();
                $(".Ev-continueEduTable").show();
                $(".Ev-continueEduAdd").hide();
                $.ajax({
                    url: that.XHRList.continueEdu.info,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            id: id,
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // 调取数据入表...
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.bo_data;
                            $(dataList).each(function (index, el) {
                                $("#Ev-continueEduCompany").val(el.organization);
                                $("#Ev-continueEduContentText").val(el.cmeDesc);
                                $("#Ev-continueEduDiploma").val(el.certificate);
                                $("#Ev-continueEduYear01").addClass('selected').val(el.startTime.substring(0, 4));
                                $("#Ev-continueEduMonth01").addClass('selected').val(el.startTime.substring(5, 7));
                                $("#Ev-continueEduDay01").addClass('selected').val(el.startTime.substring(8, 10));
                                $('#Ev-continueEduToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                                $("#Ev-continueEduYear02").addClass('selected').val(el.endTime.substring(0, 4));
                                $("#Ev-continueEduMonth02").addClass('selected').val(el.endTime.substring(5, 7));
                                $("#Ev-continueEduDay02").addClass('selected').val(el.startTime.substring(8, 10));


                                continueEduSubmit(container);
                                comm.loading.hide();
                            });
                        }


                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });
            $(".Ev-continueEdu").on('click', '.yd-personalMsgDelete', function (event) {
                that.personalMsgItemDelete(that.XHRList.continueEdu.cDelete, $(this).parents(".yd-historyTimelineContentItem"));
            });
        },
        // 获取获得荣誉
        getAward: function () {
            var that = this;
            // 初始化年月日
            ymd({
                year: $("#Ev-awardYear01"),
                default1: true,
                defaultYear: "0",
                css: " "
            });

            // 提交填写功能模块...
            // container可选，传则为编辑，不传为添加
            var awardSubmit = function (container) {
                that.clickSaveOrCancelBtn($('.Ev-award'), function () {
                    var flag = true;
                    var flag1 = false;
                    if ($("#Ev-awardName").val().length === 0) {
                        that.errorMsg($(".Ev-awardNameErrorTips"), "请输入荣誉名称").addClass('showIb');
                        flag = false;
                    } else {
                        if($("#Ev-awardName").val().length>50){
                            that.errorMsg($(".Ev-awardNameErrorTips"), "最长50个中文100个英文!").addClass('showIb');
                            flag = false;
                        }else{
                            that.errorMsg($(".Ev-awardNameErrorTips"), "").removeClass('showIb');
                            flag = true;
                        }
                    }
                    if ($("#Ev-awardCompany").val().length === 0) {
                        that.errorMsg($(".Ev-awardCompanyErrorTips"), "请输入颁发机构").addClass('showIb');
                        flag1 = false;
                    } else {
                        if($("#Ev-awardCompany").val().length>50){
                            that.errorMsg($(".Ev-awardCompanyErrorTips"), "最长50个中文100个英文!").addClass('showIb');
                            flag1 = false;
                        }else{
                            that.errorMsg($(".Ev-awardCompanyErrorTips"), "").removeClass('showIb');
                            flag1 = true;
                        }
                    }
                    if(flag&&flag1){
                        $("#ac_base_save").attr('data-enable', 'on');
                    }else{
                        $("#ac_base_save").attr('data-enable', 'off');
                        return;
                    }
                    // 编辑提交
                    var obj = {
                        "customerId": localStorage.getItem("userId"),
                        "honorName": $("#Ev-awardName").val(),
                        "awardDepartment": $("#Ev-awardCompany").val(),
                        "awardYear": $("#Ev-awardYear01").val(),
                        "upNow": 0,
                        "languageFlag": 0
                    };
                    if (container) {
                        $.extend(true, obj, {
                            id: container.attr("data-id")
                        });
                    }
                    $.ajax({
                        url: container ? that.XHRList.award.update : that.XHRList.award.save,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON(obj)
                        },
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {

                            comm.loading.hide();
                            // 有容器——编辑资料——内容入item
                            // 无容器——CreateElement——append
                            if (container) {
                                container.find("article>a").text(obj.honorName);
                                container.find('.category').text(obj.awardDepartment);
                                container.find('.timeArea em').text(obj.awardYear);
                                container.show();
                                popup({
                                    text: "修改成功!"
                                });

                            } else {
                                var template = '<article class="yd-historyTimelineContentItem" data-id="' + data.responseObject.responsePk + '"><article>' +
                                    '<span class="timeArea"><em>' + obj.awardYear + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + obj.honorName + '</a>' +
                                    '<p><span class="category">' + obj.awardDepartment + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-awardContent").append(template);
                                popup({
                                    text: "保存成功!"
                                });
                            }
                            $("#Ev-awardName").val('');
                            $("#Ev-awardCompany").val('');
                            $("#Ev-awardYear01").val('');
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });

                }, function () {
                    if (container) {
                        container.show();
                    }
                });
                return false;
            };
            // 拉取现有资料...
            $.ajax({
                url: this.XHRList.award.get,
                type: 'POST',
                dataType: 'json',
                data: {
                    languageFlag: 0,
                    customerId: localStorage.getItem('userId')

                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {

                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        if (data.responseObject.responseData.data_list.length !== 0) {
                            $(".Ev-noaward").hide();
                            $(".Ev-award").show();
                            var dataList = data.responseObject.responseData.data_list,
                                template = "";
                            $(dataList).each(function (index, el) {
                                template = '<article class="yd-historyTimelineContentItem" data-id="' + el.id + '"><article>' +
                                    '<span class="timeArea"><em>' + el.awardYear + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + el.honorName + '</a>' +
                                    '<p><span class="category">' + el.awardDepartment + '</p>' +
                                    '</article></article>';
                                $(".Ev-awardContent").append(template);
                            });
                            comm.loading.hide();
                        } else {
                            $(".Ev-noaward").show();
                            $(".Ev-award").hide();
                            comm.loading.hide();
                        }
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });


            // 添加新内容...
            $(".Ev-awardContentAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(".Ev-awardTable").show();
                $("#Ev-awardName").val('');
                $("#Ev-awardCompany").val('');
                $("#Ev-awardYear01").val('');
                awardSubmit();

            });
            // 编辑已有内容....
            $(".Ev-awardContent").on("click", '.yd-personalMsgConfig', function () {
                var container = $(this).parents('.yd-historyTimelineContentItem');
                var id = container.attr("data-id");
                container.hide();
                $(".Ev-awardTable").show();
                $(".Ev-awardAdd").hide();
                $.ajax({
                    url: that.XHRList.award.info,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            id: id,
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // 调取数据入表...
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.bo_data;
                            $(dataList).each(function (index, el) {
                                $("#Ev-awardName").val(el.honorName);
                                $("#Ev-awardCompany").val(el.awardDepartment);
                                $("#Ev-awardYear01").addClass('selected').val(el.awardYear);
                                awardSubmit(container);
                                comm.loading.hide();
                            });
                        }

                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });

            $(".Ev-award").on('click', '.yd-personalMsgDelete', function (event) {
                that.personalMsgItemDelete(that.XHRList.award.cDelete, $(this).parents(".yd-historyTimelineContentItem"));
            });
        },
        // 获取科研基金
        getFoud: function () {
            var that = this;
            // 初始化年月日
            ymd({
                year: $("#Ev-foudYear01"),
                default1: true,
                defaultYear: "0",
                css: " "
            });

            // 提交填写功能模块...
            // container可选，传则为编辑，不传为添加
            var foudSubmit = function (container) {
                that.clickSaveOrCancelBtn($('.Ev-foud'), function () {
                    var flag = true;
                    var flag1 = false;
                    if ($("#Ev-foudName").val().length === 0) {
                        that.errorMsg($(".Ev-foudNameErrorTips"), "请输入荣誉名称").addClass('showIb');
                        flag = false;
                    } else {
                        if($("#Ev-foudName").val().length>50){
                            that.errorMsg($(".Ev-foudNameErrorTips"), "最长50个中文100个英文!").addClass('showIb');
                            flag = false;
                        }else{
                            that.errorMsg($(".Ev-foudNameErrorTips"), "").removeClass('showIb');
                            flag = true;
                        }
                    }
                    if ($("#Ev-foudNumber").val().length === 0) {
                        that.errorMsg($(".Ev-foudNumberErrorTips"), "请输入项目编号").addClass('showIb');
                        flag1 = false;
                    } else {
                        if($("#Ev-foudNumber").val().length>50){
                            that.errorMsg($(".Ev-foudNumberErrorTips"), "最长50个中文100个英文!").addClass('showIb');
                            flag1 = false;
                        }else{
                            that.errorMsg($(".Ev-foudNumberErrorTips"), "").removeClass('showIb');
                            flag1 = true;
                        }
                    }
                    if(flag&&flag1){
                        $("#ac_base_save").attr('data-enable', 'on');
                    }else{
                        $("#ac_base_save").attr('data-enable', 'off');
                        return;
                    }
                    // 编辑提交

                    var data = {
                        place: $("#Ev-foud").val(),
                        company: $("#Ev-foudSchool").val(),
                        department: $("#Ev-foudProfession").val(),
                        medicalTitle: $("#Ev-foudEduTitle").val(),
                        startTime: $("#Ev-foudYear01").val() + $("#Ev-foudMonth01").val(),
                        endTime: $("#Ev-foudYear02").val() + $("#Ev-foudMonth02").val(),
                    };
                    var obj = {
                        "customerId": localStorage.getItem('userId'),
                        "fundName": $("#Ev-foudName").val(),
                        "fundCode": $("#Ev-foudNumber").val(),
                        "approvalTime": $("#Ev-foudYear01").val(),
                        "upNow": 0,
                        "languageFlag": 0
                    };
                    if (container) {
                        $.extend(true, obj, {
                            id: container.attr("data-id")
                        });
                    }
                    $.ajax({
                        url: container ? that.XHRList.foud.update : that.XHRList.foud.save,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON(obj)
                        },
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {

                            comm.loading.hide();
                            // 有容器——编辑资料——内容入item
                            // 无容器——CreateElement——append
                            if (container) {
                                container.find("article>a").text(obj.fundName);
                                container.find('.time').text(obj.foudNumber);
                                container.find('.timeArea <em></em>').text(obj.approvalTime);
                                container.show();
                                popup({
                                    text: "修改成功!"
                                });

                            } else {
                                var template = '<article class="yd-historyTimelineContentItem" data-id="' + data.responseObject.responsePk + '"><article>' +
                                    '<span class="timeArea"><em>' + obj.approvalTime + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + obj.fundName + '</a>' +
                                    '<p><span class="category">编号</span><i class="point"></i><span class="time">' + obj.fundCode + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-foudContent").append(template);

                                popup({
                                    text: "保存成功!"
                                });
                            }
                            $(".Ev-foudTable").hide();
                            $(".Ev-foudAdd").show();
                            $("#Ev-foudName").val('');
                            $("#Ev-foudNumber").val('');
                            $("#Ev-foudYear01").val('');
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });

                }, function () {
                    if (container) {
                        container.show();
                    }
                });
                return false;
            };
            // 拉取现有资料...
            $.ajax({
                url: this.XHRList.foud.get,
                type: 'POST',
                dataType: 'json',
                data: {
                    languageFlag: 0,
                    customerId: localStorage.getItem('userId')

                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {

                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        if (data.responseObject.responseData.data_list.length !== 0) {
                            $(".Ev-nofoud").hide();
                            $(".Ev-foud").show();
                            var dataList = data.responseObject.responseData.data_list,
                                template = "";
                            $(dataList).each(function (index, el) {
                                template = '<article class="yd-historyTimelineContentItem" data-id="' + el.id + '"><article>' +
                                    '<span class="timeArea"><em>' + el.approvalTime.substring(0, 4).replace(/-/g, '.') + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + el.fundName + '</a>' +
                                    '<p><span class="category">编号</span><i class="point"></i><span class="time">' + el.fundCode + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-foudContent").append(template);
                            });
                            comm.loading.hide();
                        } else {
                            $(".Ev-nofoud").show();
                            $(".Ev-foud").hide();
                            comm.loading.hide();
                        }
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });


            // 添加新内容...
            $(".Ev-foudAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(".Ev-foudTable").show();
                $("#Ev-foudName").val('');
                $("#Ev-foudNumber").val('');
                $("#Ev-foudYear01").val('');
                foudSubmit();

            });
            // 编辑已有内容....
            $(".Ev-foudContent").on("click", '.yd-personalMsgConfig', function () {
                var container = $(this).parents('.yd-historyTimelineContentItem');
                var id = container.attr("data-id");
                container.hide();

                $(".Ev-foudTable").show();
                $(".Ev-foudAdd").hide();
                $.ajax({
                    url: that.XHRList.foud.info,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            id: id,
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // 调取数据入表...
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.bo_data;
                            $(dataList).each(function (index, el) {
                                $("#Ev-foudName").val(el.fundName);
                                $("#Ev-foudNumber").val(el.fundCode);
                                $("#Ev-foudYear01").addClass('selected').val(el.approvalTime.substring(0, 4));
                                foudSubmit(container);
                                comm.loading.hide();
                            });
                        }
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });
            $(".Ev-foud").on('click', '.yd-personalMsgDelete', function (event) {
                that.personalMsgItemDelete(that.XHRList.foud.cDelete, $(this).parents(".yd-historyTimelineContentItem"));
            });
        },
        // 获取社会任职
        getBusiness: function () {
            var that = this;
            // 初始化年月日
            ymd({
                year: $("#Ev-businessYear01"),
                month: $("#Ev-businessMonth01"),
                default1: true,
                defaultYear: "0",
                defaultMonth: "0",
                css: " "
            });
            ymd({
                year: $("#Ev-businessYear02"),
                month: $("#Ev-businessMonth02"),
                default1: true,
                defaultYear: "0",
                defaultMonth: "0",
                css: " "
            });
            // 提交填写功能模块...
            // container可选，传则为编辑，不传为添加
            var businessSubmit = function (container) {
                that.clickSaveOrCancelBtn($('.Ev-business'), function () {
                    var flag = true;
                    var flag1 = false;
                    var flag2 = false;
                    if ($("#Ev-businessCompany").val().length === 0) {
                        that.errorMsg($(".Ev-businessCompanyErrorTips"), "请输入机构名称").addClass('showIb');
                        flag = false;
                    } else {
                        if($("#Ev-businessCompany").val().length>100){
                            that.errorMsg($(".Ev-businessCompanyErrorTips"), "最长100个中文或200个英文！").addClass('showIb');
                            flag = false;
                        }else{
                            that.errorMsg($(".Ev-businessCompanyErrorTips"), "").hide();
                            flag = true;
                        }
                    }
                    if ($("#Ev-businessName").val().length === 0) {
                        that.errorMsg($(".Ev-businessNameErrorTips"), "请输入职位名称").addClass('showIb');
                        flag2 = false;
                    } else {
                        if($("#Ev-businessName").val().length>100){
                            that.errorMsg($(".Ev-businessNameErrorTips"), "最长100个中文200个英文！").addClass('showIb');
                            flag2 = false;
                        }else{
                            that.errorMsg($(".Ev-businessNameErrorTips"), "").hide();
                            flag2 = true;
                        }
                    }
                    if (that.validateDate($("#Ev-businessYear01").val() + '-' + $("#Ev-businessMonth01").val(), $("#Ev-businessYear02").val() + '-' + $("#Ev-businessMonth02").val(), $("#Ev-businessToNow"))) {
                        flag1 = true;
                        that.errorMsg($(".Ev-businessTimeErrorTips"), "").removeClass('showIb');
                    } else {
                        flag1 = false;
                        that.errorMsg($(".Ev-businessTimeErrorTips"), "开始时间不能大于结束时间").addClass('showIb');
                    }
                    if(flag&&flag1&&flag2){
                        $("#bs_base_save").attr('data-enable', 'on');
                    }else{
                        $("#bs_base_save").attr('data-enable', 'off');
                        return;
                    }
                    // 编辑提交


                    var obj = {
                        "customerId": localStorage.getItem('userId'),
                        "organization": $("#Ev-businessCompany").val(),
                        "socialTitle": $("#Ev-businessName").val(),
                        "startTime": $("#Ev-businessYear01").val() + '-' + $("#Ev-businessMonth01").val(),
                        "endTime": $("#Ev-businessYear02").val() + '-' + $("#Ev-businessMonth02").val(),
                        "languageFlag": 0,
                        "upNow": 0
                    };
                    if (container) {
                        $.extend(true, obj, {
                            id: container.attr("data-id")
                        });
                    }
                    if ($("#Ev-businessToNow").hasClass('on')) {
                        obj.endTime = "至今";
                        obj.upNow = "1";
                    } else {
                        obj.endTime = $("#Ev-businessYear02").val() + "-" + $("#Ev-businessMonth02").val();
                        obj.upNow = "0";
                    }
                    $.ajax({
                        url: container ? that.XHRList.business.update : that.XHRList.business.save,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON(obj)
                        },
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {

                            comm.loading.hide();
                            // 有容器——编辑资料——内容入item
                            // 无容器——CreateElement——append
                            if (container) {
                                container.find("article>a").text(obj.place);
                                container.find('.category').text(obj.department);
                                container.find('.time').text(obj.medicalTitle);
                                container.find('.timeArea em').text(obj.startTime + obj.endTime);
                                container.show();
                                popup({
                                    text: "修改成功!"
                                });

                            } else {
                                var template = '<article class="yd-historyTimelineContentItem" data-id="' + data.responseObject.responsePk + '"><article>' +
                                    '<span class="timeArea"><em>' + obj.startTime.substring(0, 10).replace(/-/g, '.') + '-' +
                                    (obj.upNow == 0 ? obj.endTime.substring(0, 7).replace(/-/g, '.') : "至今") +
                                    '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + obj.organization + '</a>' +
                                    '<p><span class="category">' + obj.socialTitle + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-businessContent").append(template);

                                popup({
                                    text: "保存成功!"
                                });
                            }

                            $("#Ev-businessCompany").val('');
                            $("#Ev-businessName").val('');
                            $("#Ev-businessYear01").val('');
                            $("#Ev-businessMonth01").val('');
                            $("#Ev-businessYear02").val('');
                            $("#Ev-businessMonth02").val('');
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });

                }, function () {
                    if (container) {
                        container.show();
                    }
                });
                return false;
            };
            // 拉取现有资料...
            $.ajax({
                url: this.XHRList.business.get,
                type: 'POST',
                dataType: 'json',
                data: {
                    languageFlag: 0,
                    customerId: localStorage.getItem('userId')

                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {

                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        if (data.responseObject.responseData.data_list.length !== 0) {
                            $(".Ev-nobusiness").hide();
                            $(".Ev-business").show();
                            var dataList = data.responseObject.responseData.data_list,
                                template = "";
                            $(dataList).each(function (index, el) {
                                template = '<article class="yd-historyTimelineContentItem" data-id="' + el.id + '"><article>' +
                                    '<span class="timeArea"><em>' + el.startTime.substring(0, 7).replace(/-/g, '.') + '-' +
                                    (el.upNow == 0 ? el.endTime.substring(0, 7).replace(/-/g, '.') : "至今") +
                                    '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + el.organization + '</a>' +
                                    '<p><span class="category">' + el.socialTitle + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-businessContent").append(template);
                            });
                            comm.loading.hide();
                        } else {
                            $(".Ev-nobusiness").show();
                            $(".Ev-business").hide();
                            comm.loading.hide();
                        }
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });


            // 添加新内容...
            $(".Ev-businessAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(".Ev-businessTable").show();
                $("#Ev-businessCompany").val('');
                $("#Ev-businessName").val('');
                $("#Ev-businessYear01").val('');
                $("#Ev-businessMonth01").val('');
                $("#Ev-businessYear02").val('');
                $("#Ev-businessMonth02").val('');
                $('#Ev-businessToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                businessSubmit();

            });
            // 编辑已有内容....
            $(".Ev-businessContent").on("click", '.yd-personalMsgConfig', function () {
                var container = $(this).parents('.yd-historyTimelineContentItem');
                var id = container.attr("data-id");
                container.hide();
                $(".Ev-businessTable").show();
                $(".Ev-businessAdd").hide();
                $.ajax({
                    url: that.XHRList.business.info,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            id: id,
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // 调取数据入表...
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.bo_data;
                            $(dataList).each(function (index, el) {
                                $("#Ev-businessCompany").val(el.organization);
                                $("#Ev-businessName").val(el.socialTitle);
                                $("#Ev-businessYear01").val(el.startTime.substring(0, 4)).addClass('selected');
                                $("#Ev-businessMonth01").val(el.startTime.substring(5, 7)).addClass('selected');
                                if (el.upNow == 0) {
                                    $('#Ev-businessToNow').removeClass('on').parent().find(".yd-timeSelect").show();
                                    $("#Ev-businessYear02").val(el.endTime.substring(0, 4)).addClass('selected');
                                    $("#Ev-businessMonth02").val(el.endTime.substring(5, 7)).addClass('selected');
                                } else {
                                    $('#Ev-businessToNow').addClass('on').parent().find(".yd-timeSelect").hide();
                                }
                                businessSubmit(container);
                                comm.loading.hide();
                            });
                        }
                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });
            $(".Ev-business").on('click', '.yd-personalMsgDelete', function (event) {
                that.personalMsgItemDelete(that.XHRList.business.cDelete, $(this).parents(".yd-historyTimelineContentItem"));
            });
        },
        // 获取学术专著
        getTreatise: function () {
            var that = this;
            // 初始化年月日
            ymd({
                year: $("#Ev-treatiseYear01"),
                month: $("#Ev-treatiseMonth01"),
                day: $("#Ev-treatiseDay01"),
                defaultYear: '',
                defaultMonth: ''
            });

            // 提交填写功能模块...
            // container可选，传则为编辑，不传为添加
            var treatiseSubmit = function (container) {
                that.clickSaveOrCancelBtn($('.Ev-treatise'), function () {
                    var flag = true;
                    var flag1 = false;
                    var flag2 = false;
                    var flag3 = false;
                    if ($("#Ev-treatiseCapacity").val().length === 0) {
                        that.errorMsg($(".Ev-treatiseCapacityErrorTips"), "请输入作者身份").addClass('showIb');
                        flag = false;
                    } else {
                        that.errorMsg($(".Ev-treatiseCapacityErrorTips"), "").removeClass('showIb');
                        flag = true;
                    }
                    if($("#Ev-treatiseMsg").val().length>2000){
                        that.errorMsg($(".Ev-treatiseMsgErrorTips"), "最长2000个中文！").addClass('showIb');
                        flag2 = false;
                    }else{
                        that.errorMsg($(".Ev-treatiseMsgErrorTips"), "").removeClass('showIb');
                        flag2 = true;
                    }
                    if ($("#Ev-treatiseTitle").val().length === 0) {
                        that.errorMsg($(".Ev-treatiseTitleErrorTips"), "请输入学术标题").addClass('showIb');
                        flag3 = false;
                    } else {
                        if($("#Ev-treatiseTitle").val().length>100){
                            that.errorMsg($(".Ev-treatiseTitleErrorTips"), "最长100个中文或200个英文！").addClass('showIb');
                            flag3 = false;
                        }else{
                            that.errorMsg($(".Ev-treatiseTitleErrorTips"), "").removeClass('showIb');
                            flag3 = true;
                        }
                    }
                    if ($("#Ev-treatiseCompany").val().length === 0) {
                        that.errorMsg($(".Ev-treatiseCompanyErrorTips"), "请输入出版机构").addClass('showIb');
                        flag1 = false;
                    } else {
                        if($("#Ev-treatiseCompany").val().length>100){
                            that.errorMsg($(".Ev-treatiseCompanyErrorTips"), "最长100个中文或200个英文！").addClass('showIb');
                            flag1 = false;
                        }else{
                            that.errorMsg($(".Ev-treatiseCompanyErrorTips"), "").removeClass('showIb');
                            flag1 = true;
                        }
                    }
                    if(flag&&flag1&&flag2&&flag3){
                        $("#tr_base_save").attr('data-enable', 'on');
                    }else{
                        $("#tr_base_save").attr('data-enable', 'off');
                        return;
                    }
                    // 编辑提交


                    var obj = {
                        "customerId": localStorage.getItem("userId"),
                        "opusName": $("#Ev-treatiseTitle").val(),
                        "publisher": $("#Ev-treatiseCompany").val(),
                        "information": $("#Ev-treatiseMsg").val(),
                        "authorType": $("#Ev-treatiseCapacity").val(),
                        "publicationTime": $("#Ev-treatiseYear01").val() + "-" + $("#Ev-treatiseMonth01").val()+"-01" ,
                        "languageFlag": 0,
                    };

                    if (container) {
                        $.extend(true, obj, {
                            id: container.attr("data-id")
                        });
                    }
                    $.ajax({
                        url: container ? that.XHRList.treatise.update : that.XHRList.treatise.save,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON(obj)
                        },
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {

                            comm.loading.hide();
                            // 有容器——编辑资料——内容入item
                            // 无容器——CreateElement——append
                            if (container) {
                                container.find("article>a").text(obj.place);
                                container.find('.category').text(obj.department);
                                container.find('.time').text(obj.medicalTitle);
                                container.find('.timeArea em').text($("#Ev-treatiseYear01").val() + "." + $("#Ev-treatiseMonth01").val());
                                container.show();
                                popup({
                                    text: "修改成功!"
                                });
                            } else {
                                var template = '<article class="yd-historyTimelineContentItem" data-id="' + data.responseObject.responsePk + '"><article>' +
                                    '<span class="timeArea"><em>' + $("#Ev-treatiseYear01").val() + "." + $("#Ev-treatiseMonth01").val() + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + obj.opusName + '</a>' +
                                    '<p><span class="category">' +
                                    (function (authorType) {
                                        var result = "";
                                        switch (parseInt(authorType)) {
                                            case 1:
                                                result = "第一作者";
                                                break;
                                            case 2:
                                                result = "第一译者";
                                                break;
                                            case 3:
                                                result = "联合作者";
                                                break;
                                            case 4:
                                                result = "联合译者";
                                                break;
                                        }
                                        return result;
                                    })(obj.authorType) +
                                    '</span><i class="point"></i><span class="time">' + obj.publisher + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-treatiseContent").append(template);

                                popup({
                                    text: "保存成功!"
                                });
                            }
                            $("#Ev-treatiseTitle").val('');
                            $("#Ev-treatiseCompany").val('');
                            $("#Ev-treatiseMsg").val('');
                            $("#Ev-treatiseCapacity").val('');
                            $("#Ev-treatiseYear01").val('');
                            $("#Ev-treatiseMonth01").val('');
                            $("#Ev-treatiseDay01").val('');
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });

                }, function () {
                    if (container) {
                        container.show();
                    }
                });
                return false;
            };
            // 拉取现有资料...

            $.ajax({
                url: this.XHRList.treatise.get,
                type: 'POST',
                dataType: 'json',
                data: {
                    languageFlag: 0,
                    customerId: localStorage.getItem('userId')

                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {

                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        if (data.responseObject.responseData.data_list.length !== 0) {
                            $(".Ev-notreatise").hide();
                            $(".Ev-treatise").show();
                            var dataList = data.responseObject.responseData.data_list,
                                template = "";
                            $(dataList).each(function (index, el) {
                                template = '<article class="yd-historyTimelineContentItem" data-id="' + el.id + '"><article>' +
                                    '<span class="timeArea"><em>' + el.publicationTime.substring(0, 7).replace(/-/g, '.') + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + el.opusName + '</a>' +
                                    '<p><span class="category">' +
                                    (function (authorType) {
                                        var result = "";
                                        switch (parseInt(authorType)) {
                                            case 1:
                                                result = "第一作者";
                                                break;
                                            case 2:
                                                result = "第一译者";
                                                break;
                                            case 3:
                                                result = "联合作者";
                                                break;
                                            case 4:
                                                result = "联合译者";
                                                break;
                                        }
                                        return result;
                                    })(el.authorType) +
                                    '</span><i class="point"></i><span class="time">' + el.publisher + '</span></p>' +
                                    '<p style="margin-top: 0.5rem;">' + el.information + '</p>' +
                                    '</article></article>';
                                $(".Ev-treatiseContent").append(template);
                            });
                            comm.loading.hide();

                        } else {
                            $(".Ev-notreatise").show();
                            $(".Ev-treatise").hide();
                            comm.loading.hide();
                        }
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });


            // 添加新内容...
            $(".Ev-treatiseAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(".Ev-treatiseTable").show();
                $("#Ev-treatiseTitle").val('');
                $("#Ev-treatiseCompany").val('');
                $("#Ev-treatiseMsg").val('');
                $("#Ev-treatiseCapacity").val('');
                $("#Ev-treatiseYear01").val('');
                $("#Ev-treatiseMonth01").val('');
                $("#Ev-treatiseDay01").val('');
                treatiseSubmit();

            });
            // 编辑已有内容....
            $(".Ev-treatiseContent").on("click", '.yd-personalMsgConfig', function () {
                var container = $(this).parents('.yd-historyTimelineContentItem');
                var id = container.attr("data-id");
                container.hide();
                $(".Ev-treatiseTable").show();
                $(".Ev-treatiseAdd").hide();
                $.ajax({
                    url: that.XHRList.treatise.info,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            id: id,
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // 调取数据入表...
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.bo_data;
                            $(dataList).each(function (index, el) {
                                $("#Ev-treatiseTitle").val(el.opusName);
                                $("#Ev-treatiseCapacity").addClass('selected').val(el.authorType);
                                $("#Ev-treatiseCompany").val(el.publisher);
                                $("#Ev-treatiseYear01").addClass('selected').val(el.publicationTime.substring(0, 4));
                                $("#Ev-treatiseMonth01").addClass('selected').val(el.publicationTime.substring(5, 7));
                                $("#Ev-treatiseDay01").addClass('selected').val(el.publicationTime.substring(8, 10));
                                $("#Ev-treatiseMsg").val(el.information);
                                treatiseSubmit(container);
                                comm.loading.hide();
                            });
                        }

                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });
            $(".Ev-treatise").on('click', '.yd-personalMsgDelete', function (event) {
                that.personalMsgItemDelete(that.XHRList.treatise.cDelete, $(this).parents(".yd-historyTimelineContentItem"));
            });
        },
        // 获取发明专利
        getInvented: function () {
            var that = this;
            // 初始化年月日
            ymd({
                year: $("#Ev-inventedYear01"),
                month: $("#Ev-inventedMonth01"),
                defaultYear: '',
                defaultMonth: ''
            });

            // 提交填写功能模块...
            // container可选，传则为编辑，不传为添加
            var inventedSubmit = function (container) {
                that.clickSaveOrCancelBtn($('.Ev-invented'), function () {
                    var flag = true;
                    var flag1 = false;
                    var flag2 = false;
                    if ($("#Ev-inventedCountry").val().length === 0) {
                        that.errorMsg($(".Ev-inventedCountryErrorTips"), "请输入注册国家").addClass('showIb');
                        flag = false;
                    } else {
                        that.errorMsg($(".Ev-inventedCountryErrorTips"), "").removeClass('showIb');
                        flag = true;
                    }
                    if ($("#Ev-inventedName").val().length === 0) {
                        that.errorMsg($(".Ev-inventedNameErrorTips"), "请输入专利名称").addClass('showIb');
                        flag1 = false;
                    } else {
                        if($("#Ev-inventedName").val().length>100){
                            that.errorMsg($(".Ev-inventedNameErrorTips"), "最长100个中文或200个英文！").addClass('showIb');
                            flag1 = false;
                        }else{
                            that.errorMsg($(".Ev-inventedNameErrorTips"), "").removeClass('showIb');
                            flag1 = true;
                        }
                    }
                    if ($("#Ev-inventedNumber").val().length === 0) {
                        that.errorMsg($(".Ev-inventedNumberErrorTips"), "请输入专利编号").addClass('showIb');
                        flag2 = false;
                    } else {
                        if($("#Ev-inventedNumber").val().length>100){
                            that.errorMsg($(".Ev-inventedNumberErrorTips"), "最长200个字符！").addClass('showIb');
                            flag2 = false;
                        }else{
                            that.errorMsg($(".Ev-inventedNumberErrorTips"), "").removeClass('showIb');
                            flag2 = true;
                        }
                    }
                    if(flag&&flag1&&flag2){
                        $("#tr_base_save").attr('data-enable', 'on');
                    }else{
                        $("#tr_base_save").attr('data-enable', 'off');
                        return;
                    }
                    // 编辑提交


                    var obj = {
                        "customerId": localStorage.getItem("userId"),
                        "patentName": $("#Ev-inventedName").val(),
                        "patentCode": $("#Ev-inventedNumber").val(),
                        "country": $("#Ev-inventedCountry").val(),
                        "patentTime": $("#Ev-inventedYear01").val() + "-" + $("#Ev-inventedMonth01").val(),
                        "languageFlag": 0,
                        "upNow": 0
                    };
                    if (container) {
                        $.extend(true, obj, {
                            id: container.attr("data-id")
                        });
                    }
                    $.ajax({
                        url: container ? that.XHRList.invented.update : that.XHRList.invented.save,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            paramJson: $.toJSON(obj)
                        },
                        timeout: 10000,
                        beforeSend: function () {
                            comm.loading.show();
                        }
                    })
                        .done(function (data) {

                            comm.loading.hide();
                            // 有容器——编辑资料——内容入item
                            // 无容器——CreateElement——append
                            if (container) {
                                container.find("article>a").text(obj.patentName);
                                container.find('.category').text(obj.patentCode);
                                container.find('.time').text(obj.country);
                                container.find('.timeArea em').text($("#Ev-inventedYear01").val() + "." + $("#Ev-inventedMonth01").val());
                                container.show();
                                popup({
                                    text: "修改成功!"
                                });
                            } else {
                                var template = '<article class="yd-historyTimelineContentItem" data-id="' + data.responseObject.responsePk + '"><article>' +
                                    '<span class="timeArea"><em>' + $("#Ev-inventedYear01").val() + "." + $("#Ev-inventedMonth01").val() + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + obj.patentName + '</a>' +
                                    '<p><span class="category">' + obj.country + '</span><i class="point"></i><span class="time">' + obj.patentCode + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-inventedContent").append(template);
                                popup({
                                    text: "保存成功!"
                                });
                            }
                            $(".Ev-inventedAdd").show();
                            $(".Ev-inventedTable").hide();
                            $("#Ev-inventedName").val('');
                            $("#Ev-inventedNumber").val('');
                            $("#Ev-inventedCountry").val('');
                            $("#Ev-inventedYear01").val('');
                            $("#Ev-inventedMonth01").val('');
                        })
                        .fail(function () {
                            // console.log("XHR error...");
                            comm.loading.hide();
                        });

                }, function () {
                    if (container) {
                        container.show();
                    }
                });
                return false;
            };
            // 拉取现有资料...
            $.ajax({
                url: this.XHRList.invented.get,
                type: 'POST',
                dataType: 'json',
                data: {
                    languageFlag: 0,
                    customerId: localStorage.getItem('userId')
                },
                timeout: 10000,
                beforeSend: function () {
                    comm.loading.show();
                }
            })
                .done(function (data) {

                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        if (data.responseObject.responseData.data_list.length !== 0) {
                            $(".Ev-noinvented").hide();
                            $(".Ev-invented").show();
                            var dataList = data.responseObject.responseData.data_list,
                                template = "";
                            $(dataList).each(function (index, el) {
                                template = '<article class="yd-historyTimelineContentItem" data-id="' + el.id + '"><article>' +
                                    '<span class="timeArea"><em>' + el.patentTime.substring(0, 7).replace(/-/g, '.') + '</em><article><p class="yd-personalMsgConfig"><i class="icon-msgConfig"></i>编辑</p><p class="yd-personalMsgDelete">删除</p></article></span>' +
                                    '<a href="javascript:void(0)">' + el.patentName + '</a>' +
                                    '<p><span class="category">' + el.country + '</span><i class="point"></i><span class="time">' + el.patentCode + '</span></p>' +
                                    '</article></article>';
                                $(".Ev-inventedContent").append(template);
                            });
                            comm.loading.hide();
                        } else {
                            $(".Ev-noinvented").show();
                            $(".Ev-invented").hide();
                            comm.loading.hide();
                        }
                    }
                })
                .fail(function () {
                    // console.log("XHR error...");
                    comm.loading.hide();
                });

            // 添加新内容...
            $(".Ev-inventedAdd").on('click', function (event) {
                event.preventDefault();
                $(this).hide();
                $(".Ev-inventedTable").show();
                $("#Ev-inventedName").val('');
                $("#Ev-inventedNumber").val('');
                $("#Ev-inventedCountry").val('');
                $("#Ev-inventedYear01").val('');
                $("#Ev-inventedMonth01").val('');
                inventedSubmit();

            });
            // 编辑已有内容....
            $(".Ev-inventedContent").on("click", '.yd-personalMsgConfig', function () {
                var container = $(this).parents('.yd-historyTimelineContentItem');
                var id = container.attr("data-id");
                container.hide();
                $(".Ev-inventedTable").show();
                $(".Ev-inventedAdd").hide();
                $.ajax({
                    url: that.XHRList.invented.info,
                    type: 'get',
                    dataType: 'json',
                    data: {
                        paramJson: $.toJSON({
                            id: id,
                        })
                    },
                    timeout: 10000,
                    beforeSend: function () {
                        comm.loading.show();
                    }
                })
                    .done(function (data) {
                        // 调取数据入表...
                        if (!$.isEmptyObject(data.responseObject.responseData)) {
                            var dataList = data.responseObject.responseData.bo_data;
                            $(dataList).each(function (index, el) {
                                $("#Ev-inventedName").val(el.patentName);
                                $("#Ev-inventedNumber").val(el.patentCode);
                                $("#Ev-inventedCountry").val(el.country);
                                $("#Ev-inventedYear01").addClass('selected').val(el.patentTime.substring(0, 4));
                                $("#Ev-inventedMonth01").addClass('selected').val(el.patentTime.substring(5, 7));
                                inventedSubmit(container);
                                comm.loading.hide();
                            });
                        }

                    })
                    .fail(function () {
                        // console.log("XHR error...");
                        comm.loading.hide();
                    });
            });
            $(".Ev-invented").on('click', '.yd-personalMsgDelete', function (event) {
                that.personalMsgItemDelete(that.XHRList.invented.cDelete, $(this).parents(".yd-historyTimelineContentItem"));
            });
        },
    };
    var personalIntroConfig = new PersonalIntroConfig();
    personalIntroConfig.init();
});
