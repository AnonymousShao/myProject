/**
 * 功能描述：  错题本
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by QiangKaiLiang on 2016/11/11.
 */

$(function () {
    var PersonalWrongList = function () {
        var that = this;

        this.XHRList = {
            dataList: "//www.yi-ding.net.cn/call/customer/exercises/getCustomerErrorMapList/"
        };

    };

    PersonalWrongList.prototype = {
        init: function () {
            var lastUrl = "";
            if((document.referrer).length>0){
                lastUrl = document.referrer;
            }else{
                lastUrl ="//www.yi-ding.net.cn/pages/category/question.html";
            }
            $(".yd-pageBackBtn").attr("href",lastUrl );
            this.classRateData();
            //loginAbout.init({
            //    loginPass: function () {
            //        window.location = "personal_wrongList.html";
            //    },
            //    registerPass: function () {
            //        window.location = "personal_wrongList.html";
            //    }
            //});
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
            $(".yd-wrongExerciseContent").on("click", ".yd-wrongExerciseContentItem>article", function () {
                var ele = $(this).parent();
                if (ele.hasClass('open')) {
                    $(this).parent().removeClass('open');
                    commLog.creatEvent({"id":192,"url":window.location.href,"keyword":"错题本-收起","browseType":"33"});
                } else {
                    $(this).parent().addClass('open');
                    commLog.creatEvent({"id":193,"url":window.location.href,"keyword":"错题本-展开","browseType":"33"});
                }

            });
            commLog.createBrowse(33,'习题-错题本列表页',window.location.href);
            $('.yd-exercisesGetRadio .will').off('click').on('click',function () {
                commLog.creatEvent({"id":189,"url":window.location.href,"keyword":"错题本-将掌握","browseType":"33"});
            })
            $('.yd-exercisesGetRadio .wrong').off('click').on('click',function () {
                commLog.creatEvent({"id":190,"url":window.location.href,"keyword":"错题本-未掌握","browseType":"33"});
            })
            $('.yd-exercisesGetRadio .get').off('click').on('click',function () {
                commLog.creatEvent({"id":191,"url":window.location.href,"keyword":"错题本-已掌握","browseType":"33"});
            })
        },
        template: {
            classRate: function (dataArr) {
                return '<article class="yd-wrongExerciseContentItem">' +
                    '<article>' + dataArr.seriesDirTitle + ((dataArr.exercisesNum) ? '<span>(共' + dataArr.exercisesNum + '题)</span>' : '') +
                    '<figure>' +
                    '<a href="//www.yi-ding.net.cn/pages/exercises/exercise_error_status.html?&type=project&gateId='+ dataArr.seriesDirId+'&restart=1&treeLevel=0&sourceType=33" class="btn-normal">答题</a>' +
                    '<i class="icon-downArrow"></i>' +
                    '</figure>' +
                    '</article>' +
                    (function (sDataArr) {
                        var secondClass = '';
                        $(sDataArr).each(function (index, el) {
                            secondClass += '<section class="yd-wrongExerciseContentSecondItem">' +
                                '<article>' +
                                '<h2>' + el.seriesDirTitle + '<span>(共' + el.exercisesNum + '题)</span></h2>' +
                                '<figure>' +
                                '<a href="//www.yi-ding.net.cn/pages/exercises/exercise_error_status.html?&type=project&gateId='+ el.seriesDirId+'&restart=1&treeLevel=1&sourceType=33" class="btn-normal">答题</a>' +
                                '</figure>' +
                                '</article>' +
                                '</section>';
                        });
                        return secondClass;
                    })(dataArr.child_map) +
                    '</article>';

            },

        },
        // 精品课程
        classRateData: function () {
            var that = this;
            $.ajax({
                url: this.XHRList.dataList,
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
                    // console.log("success");
                    if (!$.isEmptyObject(data.responseObject.responseData)) {
                        var classRate = data.responseObject.responseData.data_list;
                        var widthDegree = data.responseObject.responseData.collect_list;
                        var widthObj={};
                        $(classRate).each(function (index, el) {
                            $('#Ev-wrongListContent').append(that.template.classRate(el));
                            $('.yd-wrongExerciseContentSecondItem .btn-normal').off('click').on('click',function () {
                                commLog.creatEvent({"id":195,"url":window.location.href,"keyword":"错题本-章节回答","browseType":"33"});
                            })
                            $('.yd-wrongExerciseContentItem>article .btn-normal').off('click').on('click',function () {
                                commLog.creatEvent({"id":194,"url":window.location.href,"keyword":"错题本-系列课回答","browseType":"33"});
                            })
                        });
                        $(widthDegree).each(function (index,el) {
                            switch (parseInt(widthDegree[index].errorStatus)){
                                case 1:
                                    widthObj.will=widthDegree[index].errorNum;
                                    break;
                                case 2:
                                    widthObj.wrong=widthDegree[index].errorNum;
                                    break;
                                case 3:
                                    widthObj.get=widthDegree[index].errorNum;
                                    break;
                            }
                        });
                        that.setDegreeItemsWidth(widthObj);
                    } else {
                        $(".yd-noContentTips").show();
                        $(".contentItemHeader").hide();
                        $("#Ev-wrongListContent").hide();
                        $("#Ev-wrong a").attr('href', "javascript:void(0)");
                        $("#Ev-will a").attr('href', "javascript:void(0)");
                        $("#Ev-get a").attr('href', "javascript:void(0)");
                    }
                    comm.loading.hide();
                })
                .fail(function () {
                    // console.log("XHR Error...");
                    comm.loading.hide();
                });
        },

        // 计算宽度比例
        // 按比例分割，最大不可超过53.153%，最小不超过23.423%
        setDegreeItemsWidth: function (dataArr) {
            var total = parseInt(dataArr.wrong) + parseInt(dataArr.will) + parseInt(dataArr.get),
                ratio = [
                    parseInt(dataArr.wrong),
                    parseInt(dataArr.will),
                    parseInt(dataArr.get)
                ],
                min = 0.16517,
                max = 0.66966;

            var minNum = Math.min(dataArr.wrong, dataArr.will, dataArr.get);
            var minNumIndex = ratio.indexOf(minNum);
            var wArr = ['', '', ''];
            $(ratio).each(function (index, el) {

                if (index === minNumIndex) {
                    if (minNum / total * 690 < 100) {
                        wArr[index] = 100;
                    } else {
                        wArr[index] = 690 * (ratio[index] / total);
                    }
                } else {
                    if (minNum / total * 690 < 100) {
                        wArr[index] = 580 * (ratio[index] / (total - minNum));
                    } else {
                        wArr[index] = 690 * (ratio[index] / total);
                    }
                }
            });
            $("#Ev-wrong").css('width', wArr[0] + "px").find("h3").text(dataArr.wrong);
            dataArr.wrong == 0 ? $("#Ev-wrong a").attr('href', "javascript:void(0)") : "";
            $("#Ev-will").css('width', wArr[1] + "px").find("h3").text(dataArr.will);
            dataArr.will == 0 ? $("#Ev-will a").attr('href', "javascript:void(0)") : "";
            $("#Ev-get").css('width', wArr[2] + "px").find("h3").text(dataArr.get);
            dataArr.get == 0 ? $("#Ev-get a").attr('href', "javascript:void(0)") : "";

            if (!comm.isPC()){
                $("#Ev-wrong").css('width', wArr[0]/35 + "rem").find("h3").text(dataArr.wrong);
                $("#Ev-will").css('width', wArr[1]/35 + "rem").find("h3").text(dataArr.will);
                $("#Ev-get").css('width', wArr[2]/35 + "rem").find("h3").text(dataArr.get);
            }
        }
    };
    var personalWrongList = new PersonalWrongList();
    personalWrongList.init();
});
