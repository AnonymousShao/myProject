/**
 * @name:
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/1/16
 * @author: qiangkailiang
 */

$(function () {
    $.ajax({
        url: "//www.yi-ding.net.cn/call/yiding/web/user/getAbstractById/",
        type: 'POST',
        dataType: 'json',
        data: {
            paramJson: $.toJSON({
                customerId:comm.getpara().customerId
            })
        },
        timeout: 10000,
        beforeSend: function () {
            comm.loading.show();
        }
    })
        .done(function (data) {
            // console.log("success");
            comm.loading.hide();
            $("#emailAdd").text(data.responseObject.responseData.data_list[0].email)
        })
        .fail(function () {
            // console.log("XHR error...");
            comm.loading.hide();
        });
});